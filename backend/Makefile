VERSION=v0.0.0
TODAY = $(shell date +"%Y%m%d_%H%M%S")
SHA = $(shell git rev-parse --short HEAD)

# since we are using sqlite3 as our primary datastore, use this as our ldflags.
LDFLAGS=-ldflags='-X api.version=${VERSION}.build.${TODAY}:${SHA} -s -w -extldflags "-static"'

NAME=app
OUT=.build/api
MAIN=cmd/${NAME}/api.go

build:
	go mod verify
	go mod tidy
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build ${LDFLAGS} -installsuffix -a -tags osusergo,netgo,sqlite_omit_load_extension -o ${OUT} ${MAIN}	

local: build
	# uses config/local.yaml as config file.
	./.build/api

	# alternatively, passing a config file
	# ./.build/api -config=config/dev.yaml

test:
	GO111MODULE=on go test -race -v -coverprofile=cover.out ./...

migrate:
	goose -dir=database/migrations/ sqlite3 ./database/app.sqlite3 status
	goose -dir=database/migrations/ sqlite3 ./database/app.sqlite3 up

docker-local: migrate
	docker build -f Dockerfile -t api:${SHA} ./

docker-run:
	docker run \
		-p 3001:3000 \
		-v ${PWD}/database/app.sqlite3:/data/db \
		-v ${PWD}/database/litestream.yml:/etc/litestream.yml \
		-e REPLICA_URL=s3://aygsaba-litestream/db \
		-e LITESTREAM_ACCESS_KEY_ID \
		-e LITESTREAM_SECRET_ACCESS_KEY \
		api:${SHA}
