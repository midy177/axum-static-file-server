use axum::{
    Router,
};

use std::net::SocketAddr;
use axum::http::StatusCode;

use tower_http::{
    services::{ServeDir, ServeFile},
    trace::TraceLayer,
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use clap::Parser;
use colored::Colorize;
use tower_http::set_status::SetStatus;

/// Simple program to greet a person
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
   /// Level of the log print,etc: info debug warn error
   #[arg(short, long, default_value = "debug")]
   level: String,

   /// Port of Listening
   #[arg(short, long, default_value_t = 3000)]
   port: u16,
}

#[tokio::main]
async fn main() {
   let args = Args::parse();
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| format!("static_file_server={},tower_http={}",args.level, args.level).into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();
    tokio::join!(
        serve(using_serve_dir_with_assets_fallback(), args.port.into()),
    );
}

fn using_serve_dir_with_assets_fallback() -> Router {
    // `ServeDir` allows setting a fallback if an asset is not found
    // so with this `GET /assets/doesnt-exist.jpg` will return `index.html`
    // rather than a 404
    // let serve_dir = ServeDir::new("assets").
    //     not_found_service(ServeFile::new("assets/index.html"));
    // rewrite 404 to 200
    let serve_dir = ServeDir::new("assets").
        fallback(SetStatus::new(ServeFile::new("assets/index.html"), StatusCode::OK));

    Router::new()
        // .route("/foo", get(|| async { "Hi from /foo" }))
        .nest_service("/", serve_dir.clone())
        .fallback_service(serve_dir)
}

async fn serve(app: Router, port: u16) {
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    print!("{} {}\n", "server listening on".italic().yellow(),addr.to_string().italic().green());
    axum::Server::bind(&addr)
        .serve(app.layer(TraceLayer::new_for_http()).into_make_service())
        .await
        .unwrap();
}
