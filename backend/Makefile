VERSION=v0.0.0
TODAY = $(shell date +"%Y%m%d_%H%M%S")
SHA = $(shell git rev-parse --short HEAD)

# since we are using sqlite3 as our primary datastore, use this as our ldflags.
LDFLAGS=-ldflags='-X api.version=${VERSION}.build.${TODAY}:${SHA} -s -w -extldflags "-static"'

NAME=api
OUT=.build/api
MAIN=cmd/${NAME}/api.go

build:
	GOOS=linux GOARCH=amd64 go build -installsuffix -a -tags netgo ${LDFLAGS} -o ${OUT} ${MAIN}	

docker-local: migrate
	docker build -f docker/Dockerfile.local -t api:${SHA} ./