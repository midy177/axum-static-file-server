FROM rust:1.68.0 AS builder

WORKDIR /app

COPY . /app/
RUN cargo install --path . && \
    cargo build --release

FROM debian:stable

ENV TZ="Asia/Shanghai"
WORKDIR /app

COPY --from=builder /app/target/release/static-file-server /app/

RUN mkdir /app/assets/ && \
    ln -s /app/static-file-server /usr/local/bin/static-file-server

CMD ["static-file-server"]