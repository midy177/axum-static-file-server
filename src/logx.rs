use axum::http::{Request, Response};
use std::time::Duration;
use tracing::{Level, Span};
use tracing_subscriber::fmt;
pub(crate) fn init_logger() {
    let format = fmt::format()
        .with_level(true) // don't include levels in formatted output
        .with_target(false) // don't include targets
        .with_thread_ids(false) // include the thread ID of the current thread
        .with_thread_names(false) // include the name of the current thread
        .compact(); // use the `Compact` formatting style.
    // Create a `fmt` subscriber that uses our custom event format, and set it
    // as the default.
    tracing_subscriber::fmt()
        .event_format(format)
        .init();
    let _ = env_logger::builder()
        // Include all events in tests
        .filter_level(log::LevelFilter::Info)
        // Ensure events are captured by `cargo test`
        .is_test(false)
        .format_timestamp_millis()
        .format_target(false)
        // Ignore errors initializing the logger if tests race to configure it
        .try_init();
}


pub(crate) fn make_span_x<B>(request: &Request<B>) -> Span {
    tracing::info_span!(
        "request->response",
        method = request.method().to_string(),
        uri = request.uri().to_string(),
    )
}

pub(crate) fn on_response_x<B>(response: &Response<B>, latency: Duration, _: &Span) {
    tracing::event!(
        Level::INFO,
        latency = duration_to_string(latency),
        status = response.status().to_string(),
    );
}

// duration转人类可读性string
fn duration_to_string(duration: Duration) -> String {
    let secs = duration.as_secs();
    let micros = duration.subsec_micros();
    let hours = secs / 3600;
    let minutes = (secs % 3600) / 60;
    let seconds = secs % 60;
    let millis = micros / 1000;
    let remaining_micros = micros % 1000;

    match (hours, minutes, seconds, millis) {
        (h, m, s, ms) if h > 0 => format!("{}h{}m{}s{}ms{}µs", h, m, s, ms, remaining_micros),
        (_, m, s, ms) if m > 0 => format!("{}m{}s{}ms{}µs", m, s, ms, remaining_micros),
        (_, _, s, ms) if s > 0 => format!("{}s{}ms{}µs", s, ms, remaining_micros),
        (_, _, _, ms) if ms > 0 => format!("{}ms{}µs", ms, remaining_micros),
        _ => format!("{}µs", remaining_micros),
    }
}