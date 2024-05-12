use axum::{
    Router,
};

use std::net::SocketAddr;

use tower_http::{services::{ServeDir, ServeFile}, trace, trace::TraceLayer};
use tracing_subscriber::{util::SubscriberInitExt};

use clap::Parser;
use colored::Colorize;
use tracing::Level;

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
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();
    tokio::join!(
        serve(using_serve_dir_with_assets_fallback(), args.port.into()),
    );
}

fn using_serve_dir_with_assets_fallback() -> Router {
    // `ServeDir` allows setting a fallback if an asset is not found
    // so with this `GET /assets/doesnt-exist.jpg` will return `index.html`
    // rather than a 404
    let serve_dir = ServeDir::new("assets").
        fallback(ServeFile::new("assets/index.html"));
    // let serve_dir = ServeDir::new("assets").fallback( {
    //     SetStatus::new(ServeFile::new("assets/index.html"), StatusCode::OK)
    // });

    Router::new()
        .nest_service("/", serve_dir.clone())
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
