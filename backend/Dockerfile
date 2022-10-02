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
ENV GO111MODULE=on
# go-sqlite3 needs CGO, so yeahh...
ENV CGO_ENABLED=1

COPY . .
RUN go mod verify
RUN go mod tidy
RUN go mod download
RUN make build

# Stage 2: Minimize the binary using https://github.com/upx/upx
FROM alpine:latest AS compress
WORKDIR /
RUN apk update && \
    apk add xz
ADD https://github.com/upx/upx/releases/download/v3.96/upx-3.96-amd64_linux.tar.xz /usr/local
RUN xz -d -c /usr/local/upx-3.96-amd64_linux.tar.xz | \
    tar -xOf - upx-3.96-amd64_linux/upx > /bin/upx && \
    chmod a+x /bin/upx
COPY --from=build /go/src/aygsaba.com/.build/api /api
COPY --from=build /go/src/app/aygsaba.com/local.yaml /config/local.yaml
RUN upx ./api

# Stage 3
FROM scratch
WORKDIR /
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=compress /config/local.yaml /config/local.yaml
COPY --from=compress /api /api
EXPOSE 14447
CMD ["./api", "--config", "config/local.toml"]