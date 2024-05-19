# docker pull rust:alpine3.18
FROM rust:alpine3.19 AS builder

WORKDIR /app

# apk add musl-dev
COPY . /app/
RUN apk add musl-dev && \
    cargo clean && \
    cargo install --path . && \
    cargo build --release && \
    strip target/release/static-file-server
# 减小体积
# strip target/release/static-file-server

FROM alpine:3.19

ENV TZ="Asia/Shanghai"
WORKDIR /app

COPY --from=builder /app/target/release/static-file-server /app/

RUN mkdir /app/assets/ && \
    ln -s /app/static-file-server /usr/local/bin/static-file-server

CMD ["static-file-server"]
