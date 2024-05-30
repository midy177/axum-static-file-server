#/bin/bash
docker buildx build --platform linux/amd64,linux/arm64/v8 --rm --push \
-t dockerhub.milesight.cn/milesight/axum-static-file-server:v1.0.2 -f Dockerfile .
#docker run -it --rm rust:1.68.0 bash
#cargo install --path .
#cargo build --release