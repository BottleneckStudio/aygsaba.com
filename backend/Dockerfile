# =============================================================================
#  Multi-stage Dockerfile Example
# =============================================================================
#  This is a simple Dockerfile that will build an image of scratch-base image.
#  Usage:
#    docker build -t simple:local . && docker run --rm simple:local
# =============================================================================

# -----------------------------------------------------------------------------
#  Build Stage: Stage 1
# -----------------------------------------------------------------------------
FROM golang:alpine AS build
RUN mkdir -p /go/src/aygsaba.com
WORKDIR /go/src/aygsaba.com
RUN apk add --no-cache \
    git \
    # Important: required for go-sqlite3
    gcc \
    # Required for Alpine
    musl-dev \
    make cmake \
    ca-certificates

# Download the static build of Litestream directly into the path & make it executable.
# This is done in the builder and copied as the chmod doubles the size.
ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz

ENV GO111MODULE=on
# go-sqlite3 needs CGO, so yeahh...
ENV CGO_ENABLED=1

COPY . .
RUN go mod verify
RUN go mod tidy
RUN go mod download
RUN go install github.com/pressly/goose/v3/cmd/goose@latest
RUN make migrate
RUN make build

# Stage 2: Minimize the binary using https://github.com/upx/upx
FROM alpine:latest AS compress
WORKDIR /
RUN apk update && \
    apk add xz bash
ADD https://github.com/upx/upx/releases/download/v3.96/upx-3.96-amd64_linux.tar.xz /usr/local
RUN xz -d -c /usr/local/upx-3.96-amd64_linux.tar.xz | \
    tar -xOf - upx-3.96-amd64_linux/upx > /bin/upx && \
    chmod a+x /bin/upx

COPY --from=build /usr/local/bin/litestream /usr/local/bin/litestream
COPY --from=build /go/src/aygsaba.com/config/local.yaml /config/local.yaml
COPY --from=build /go/src/aygsaba.com/.build/api /usr/local/bin/api
RUN upx /usr/local/bin/api

# Copy Litestream configuration file & startup script.
COPY database/litestream.yml /etc/litestream.yml
COPY scripts/run.sh /scripts/run.sh

EXPOSE 3000
CMD [ "/scripts/run.sh" ]
