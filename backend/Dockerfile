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
FROM golang:alpine as builder
COPY . /go/src/api.aygsaba.com
WORKDIR /go/src/api.aygsaba.com
RUN apk update && \
    apk add --no-cache \
    xz \
    bash \
    git \
    # Important: required for go-sqlite3
    gcc \
    musl-dev \
    make cmake \
    ca-certificates

ENV GO111MODULE=on
# go-sqlite3 needs CGO, so yeahh...
ENV CGO_ENABLED=1

RUN go mod verify
RUN go mod tidy

RUN --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg \
    go build -ldflags '-s -w -extldflags "-static"' -installsuffix -a -tags osusergo,netgo,sqlite_omit_load_extension -o /usr/local/bin/api .

# Download the static build of Litestream directly into the path & make it executable.
# This is done in the builder and copied as the chmod doubles the size.
ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz

ADD https://github.com/upx/upx/releases/download/v3.96/upx-3.96-amd64_linux.tar.xz /usr/local
RUN xz -d -c /usr/local/upx-3.96-amd64_linux.tar.xz | \
    tar -xOf - upx-3.96-amd64_linux/upx > /bin/upx && \
    chmod a+x /bin/upx

# minimize binary using https://github.com/upx/upx
RUN upx /usr/local/bin/api

FROM alpine:latest as final
# Optional: directly embed replica URL value.
# ENV REPLICA_URL=s3://BUCKETNAME/db

COPY --from=builder /usr/local/bin/api /usr/local/bin/api
COPY --from=builder /usr/local/bin/litestream /usr/local/bin/litestream

RUN apk add bash

# Create data directory (although this will likely be mounted too)
RUN mkdir -p /data

# Notify Docker that the container wants to expose a port.
EXPOSE 3000

# Copy Litestream configuration file & startup script.
COPY etc/litestream.yml /etc/litestream.yml
COPY scripts/run.sh /scripts/run.sh

CMD [ "/scripts/run.sh" ]
