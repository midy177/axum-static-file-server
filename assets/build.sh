#/bin/bash
docker run -it --rm rust:1.68.0 bash
cargo install --path .
cargo build --release