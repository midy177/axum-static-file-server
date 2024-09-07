use std::fs::File;
use std::io::{Read, Write};
use std::net::SocketAddr;
use std::os::macos::raw::stat;
use std::path::{Path, PathBuf};
use std::str::FromStr;
use std::sync::Arc;
use std::thread;
use std::thread::spawn;

use axum::{
    extract::State,
    middleware::map_response_with_state,
    response::Response,
    Router,
};
use axum::http::{header, HeaderMap, HeaderName, HeaderValue};
use brotli::CompressorWriter;
use clap::ArgAction;
use clap::Parser;
use colored::Colorize;
use log::{error, info, warn};
use mime_guess::mime;
use tower_http::services::ServeDir;
use tower_http::services::ServeFile;
use tower_http::trace::TraceLayer;
use walkdir::WalkDir;

mod logx;

#[derive(Clone)]
struct AppState {
    root: PathBuf,
    index: String,
    headers: HeaderMap,
    br: bool,
}

async fn fix_response_headers_middleware<B>(
    State(state): State<Arc<AppState>>,
    mut response: Response<B>,
) -> Response<B> {
    let mut_resp_headers = response.headers_mut();
    if let Some(content_type) = mut_resp_headers.get(header::CONTENT_TYPE) {
        if let Ok(content_type_str) = content_type.to_str() {
            if content_type_str.starts_with("text/html") {
                if let Some(cache_control) = mut_resp_headers.get(header::CACHE_CONTROL) {
                    if let Ok(cache_control_str) = cache_control.to_str() {
                        // 检查是否已经包含 no-cache
                        if !cache_control_str.contains("no-cache") {
                            // 如果没有 no-cache，则设置为 no-cache
                            mut_resp_headers.insert(
                                header::CACHE_CONTROL,
                                HeaderValue::from_static("no-cache")
                            );
                        }
                    }
                } else {
                    // 如果没有 CACHE_CONTROL 头部，则添加一个 no-cache 头部
                    mut_resp_headers.insert(
                        header::CACHE_CONTROL,
                        HeaderValue::from_static("no-cache")
                    );
                }
            };
        }
    }

    for (name, value) in state.headers.iter() {
            mut_resp_headers.insert(name.clone(), value.clone());
    }
    // do something with `state` and `response`...
    response
}

pub fn static_file(
    state: Arc<AppState>
) -> Router {
    let root_dir = state.root.clone();
    let root_index_file = root_dir.join(state.index.clone());

    let mut server_dir = ServeDir::new(root_dir)
        .append_index_html_on_directories(true);
    let mut fallback_service = ServeFile::new(root_index_file);
    // 判断是否开启br压缩
    if state.br {
        server_dir = server_dir.precompressed_br();
        fallback_service = fallback_service.precompressed_br();
    }
    Router::new().nest_service(
        "/",
        server_dir.fallback(fallback_service)
    ).route_layer(map_response_with_state(state, fix_response_headers_middleware))
}
fn parse_headers(header_strs:&Vec<String>)->HeaderMap{
    let mut headers = HeaderMap::new();
    for header_str in header_strs {
        let parts: Vec<&str> = header_str.splitn(2, ':').collect();
        if parts.len() == 2 {
            let key = parts[0].trim();
            let value = parts[1].trim().to_string();

            if let Ok(header_name) = HeaderName::from_str(key) {
                if let Ok(num) = value.parse::<u64>() {
                    // info!("Parsed number: {}", num);
                    headers.insert(header_name, HeaderValue::from(num));
                } else {
                    // info!("Failed to parse number");
                    if let Ok(header_value) = HeaderValue::from_str(&value) {
                        headers.insert(header_name, header_value);
                    }else {
                        error!("Invalid str header value: '{}'", value);
                    }
                }
            } else {
                error!("Invalid header name: '{}'", key);
            }
        } else {
            error!("Invalid header format: '{}'", header_str);
        }
    }
    println!("{}\n {:#?}", "header map:".italic().bright_green(), headers);
    headers
}

fn compress_file_to_brotli(src_path: &Path, dest_path: &Path) -> std::io::Result<()> {
    let mut input_file = File::open(src_path)?;
    let mut output_file = CompressorWriter::new(File::create(dest_path)?, 4096, 5, 20);
    let mut buffer = Vec::new();

    input_file.read_to_end(&mut buffer)?;
    output_file.write_all(&buffer)?;
    Ok(())
}
fn has_brotli_extension(path: &Path) -> bool {
    if let Some(extension) = path.extension() {
        if let Some(extension_str) = extension.to_str() {
            return extension_str.eq_ignore_ascii_case("br");
        }
    }
    false
}
fn compress_directory_to_brotli(dir: &str) -> std::io::Result<()> {
    for entry in WalkDir::new(dir).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();

        // 跳过文件夹，只处理文件
        if path.is_file() {
            // 跳过已经以 .br 结尾的文件
            if has_brotli_extension(path) {
                continue;
            }
            // 获取文件名并追加 .br 后缀
            if let Some(file_name) = path.file_name() {
                let mut compressed_file_name = file_name.to_os_string();
                compressed_file_name.push(".br");

                // 构建压缩文件的完整路径，保持相同目录结构
                let compressed_file_path = path.with_file_name(compressed_file_name);

                // 判断压缩文件是否已经存在
                if !compressed_file_path.exists() {
                    info!("{} {} -> {}",
                        "Compressing:".italic().bright_blue(),
                        path.to_str().unwrap_or("None").italic().bright_blue(),
                        compressed_file_path.to_str().unwrap_or("None").italic().bright_blue());
                    compress_file_to_brotli(path, &compressed_file_path)?;
                } else {
                    warn!("{} {}",
                        "Compressed (.br)file already exists: ".italic().bright_yellow(),
                        compressed_file_path.to_str().unwrap_or("none").italic().bright_yellow());
                }
            }
        }
    }
    Ok(())
}

#[derive(Parser, Debug)]
#[command(name = "axum static file server", version = "1.0",
author = "Wuly <1228022817@qq.com>",
about = "a static file server base on axum",long_about=None)]
struct Flags {
    /// Root directory from where the static content is served.
    /// Optional.
    #[arg(short, long, default_value = "assets")]
    root: String,
    /// Index file for serving a directory.
    /// Optional.
    #[arg(long, default_value = "index.html")]
    index: String,
    /// Port of Listening.
    /// Optional.
    #[arg(short, long, default_value_t = 3000)]
    port: u16,
    /// A list of headers in the format key:value
    /// example: -b "headerKey:headerValue" -b "headerKey:headerValue"
    #[arg(short, long, action = ArgAction::Append)]
    base_headers: Vec<String>,
    /// Compress with brotli.
    /// Optional.
    #[arg(long, default_value_t = true)]
    br: bool,
}

#[tokio::main]
async fn main() {
    logx::init_logger();
    let args = Flags::parse();
    println!("{} {}\n{} {}\n{} {}\n{} {}",
             "root dir:".italic().bright_green(),
             args.root,
             "index file:".italic().bright_green(),
             args.index,
             "listen port:".italic().bright_green(),
             args.port,
             "use br: ".italic().bright_green(),
             args.br,
    );
    let state = Arc::new(AppState {
        root: PathBuf::from(&args.root.clone()),
        index: args.index.clone(),
        headers: parse_headers(&args.base_headers),
        br: args.br.clone(),
    });

    let app = Router::new().nest("/",static_file(state.clone()))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(logx::make_span_x)
                .on_response(logx::on_response_x)
        );

    let addr = SocketAddr::from(([0, 0, 0, 0], args.port));

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    // 提前压缩文件
    if args.br {
        spawn(move|| {
            compress_directory_to_brotli(args.root.as_str()).unwrap();
            info!("{}","compress_directory_to_brotli success!".italic().green());
        });
    }
    println!("\n{} {}\n",
             "server listening on:".italic().yellow(),
             addr.to_string().italic().bright_green());
    axum::serve(listener, app).await.unwrap();
}