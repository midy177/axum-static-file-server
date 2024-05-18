use axum::{
    handler::HandlerWithoutStateExt, http::StatusCode, routing::get, Router,
};

use std::net::SocketAddr;
use axum::http::{header, HeaderMap, HeaderName, HeaderValue};
use axum::response::Html;

use tower_http::{services::{ServeDir, ServeFile}, trace, trace::TraceLayer};

use clap::Parser;
use colored::Colorize;
use tokio::fs;
use tracing::Level;

/// Simple program to greet a person
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
   /// Port of Listening
   #[arg(short, long, default_value_t = 3000)]
   port: u16,
}

#[tokio::main]
async fn main() {
   let args = Args::parse();
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();
    serve(using_serve_dir_with_handler_as_service(), args.port.into()).await;
    // tokio::join!(
    //     serve(using_serve_dir_with_assets_fallback(), args.port.into()),
    // );
}

fn using_serve_dir_with_handler_as_service() -> Router {
    async fn handle_404() -> (StatusCode,HeaderMap, String) {
        let mut headers = HeaderMap::new();
        headers.insert(
            header::CONTENT_TYPE,
            HeaderValue::from_static(mime::TEXT_HTML_UTF_8.as_ref()),
        );
        (StatusCode::OK, headers,fs::read_to_string("assets/index.html").await.unwrap())
    }

    // you can convert handler function to service
    let service = handle_404.into_service();

    let serve_dir = ServeDir::new("assets").fallback(service);

    Router::new()
        .nest_service("",serve_dir)
}

async fn serve(app: Router, port: u16) {
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    print!("{} {}\n", "server listening on".italic().yellow(),addr.to_string().italic().green());
    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    let tl=TraceLayer::new_for_http()
        .make_span_with(trace::DefaultMakeSpan::new().level(Level::INFO))
        .on_response(trace::DefaultOnResponse::new().level(Level::INFO));
    axum::serve(listener, app.layer(tl)).await.unwrap();
}
