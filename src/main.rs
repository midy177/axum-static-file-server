use axum::{Router};

use std::net::SocketAddr;
use axum::http::{ StatusCode };

use tower_http::{
    services::{ServeDir, ServeFile},
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use clap::Parser;
use colored::Colorize;
use tower_http::set_status::SetStatus;
use tower_http::trace::TraceLayer;

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
    // rewrite 404 to 200
    let serve_dir = ServeDir::new("assets").fallback( {
        SetStatus::new(ServeFile::new("assets/index.html"), StatusCode::OK)
    });
    Router::new()
        .nest_service("/", serve_dir.clone()).layer(TraceLayer::new_for_http())

}

async fn serve(app: Router, port: u16) {
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    print!("{} {}\n", "server listening on".italic().yellow(),addr.to_string().italic().green());
    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}