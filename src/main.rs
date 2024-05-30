mod logx;

use std::convert::Infallible;
use clap::{ArgAction};
use axum::{handler::HandlerWithoutStateExt, http::StatusCode, middleware, Router};

use std::net::SocketAddr;
use std::path::PathBuf;
use std::str::FromStr;
use axum::body::Body;

use axum::http::{header, HeaderMap, HeaderName, HeaderValue, Request, Response};
use axum::middleware::Next;

use tower_http::{services::ServeDir, trace::TraceLayer};

use clap::Parser;
use colored::Colorize;
use log::{error, info};
use tokio::fs;
use once_cell::sync::OnceCell;

#[derive(Parser, Debug)]
#[command(name = "axum static file server", version = "1.0",
author = "Wuly <1228022817@qq.com>",
about = "a static file server base on axum",long_about=None)]
struct Args {
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
    /// A list of base_headers in the format key:value
    /// example: -b "headerKey:headerValue" -b "headerKey:headerValue"
    #[arg(short, long, action = ArgAction::Append)]
    base_headers: Vec<String>,
    /// A list of html5_headers in the format key:value
    /// example: -i "headerKey:headerValue" -i "headerKey:headerValue"
    #[arg(short, long, action = ArgAction::Append)]
    index_headers: Vec<String>,
    #[arg(skip)]
    base_header_map: HeaderMap,
    #[arg(skip)]
    index_header_map: HeaderMap,
}
// 创建全局的 Args 变量
static ARGS: OnceCell<Args> = OnceCell::new();
#[tokio::main]
async fn main() {
    logx::init_logger();
    let mut args= Args::parse();
    args.index_header_map = prepare_index_headers(
        PathBuf::from(&args.root).join(&args.index),
        &args.index_headers,
    );
    args.base_header_map = parse_headers(&args.base_headers);
    ARGS.set(args).expect("Failed to set global Args");
    let args = ARGS.get().unwrap();
    println!("CLI {:?}",args);

    let addr = SocketAddr::from(([0, 0, 0, 0], args.port));

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();

    print!("{} {}\n", "server listening on".italic().yellow(),addr.to_string().italic().green());

    let app =using_serve_dir_with_try_file_as_service()
        .layer(
            TraceLayer::new_for_http()
            .make_span_with(logx::make_span_x)
            .on_response(logx::on_response_x)
        ).layer(middleware::from_fn(fix_header_middleware));
    axum::serve(listener, app).await.unwrap();
}

async fn try_file() -> (StatusCode, HeaderMap, String) {
    let args = ARGS.get().unwrap();
    let path  = PathBuf::from(&args.root).join(&args.index);
    let mut headers = args.index_header_map.clone();
    let str = fs::read_to_string(&path).await.unwrap_or_else(|err| err.to_string());
    headers.insert(
        header::CONTENT_LENGTH,
        HeaderValue::from(str.len()),
    );
    (StatusCode::OK, headers,str)
}


fn using_serve_dir_with_try_file_as_service() -> Router {
    let args = ARGS.get().unwrap();
    let try_file_service  = try_file.into_service();
    let serve_dir = ServeDir::new(&args.root).fallback(try_file_service);
    Router::new()
        .nest_service("",serve_dir)
}

fn prepare_index_headers(path:PathBuf,header_strs:&Vec<String>)->HeaderMap {
    let guess = mime_guess::from_path(&path);
    let mime_value = guess.first_raw()
        .map(HeaderValue::from_static)
        .unwrap_or_else(|| {
            HeaderValue::from_str(mime::APPLICATION_OCTET_STREAM.as_ref()).unwrap()
        });
    let mut index_headers=parse_headers(header_strs);
    if !index_headers.contains_key(header::CACHE_CONTROL) {
        index_headers.insert(
            header::CACHE_CONTROL,
            HeaderValue::from_static("no-cache"),
        );
    }
    if !index_headers.contains_key(header::CONTENT_TYPE) {
        index_headers.insert(
            header::CONTENT_TYPE,
            mime_value,
        );
    }

    index_headers
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
                    info!("Parsed number: {}", num);
                    headers.insert(header_name, HeaderValue::from(num));
                } else {
                    info!("Failed to parse number");
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
    headers
}

///自定义中间件方法
async fn fix_header_middleware(
    request: Request<Body>,
    next: Next,
) -> Result<Response<Body>, Infallible> {
    let uri = request.uri().clone();
    let mut response = next.run(request).await;
    let args = ARGS.get().unwrap();
    let mut_resp_headers = response.headers_mut();
    for (name, value) in args.base_header_map.iter() {
        if !mut_resp_headers.contains_key(header::CACHE_CONTROL) {
            mut_resp_headers.insert(name.clone(), value.clone());
        }
    }
    if uri.eq("/") {
        info!("{}",uri);
        for (name, value) in args.index_header_map.iter() {
            if !mut_resp_headers.contains_key(header::CACHE_CONTROL) {
                mut_resp_headers.insert(name.clone(), value.clone());
            }
        }
    }
    Ok(response)
}