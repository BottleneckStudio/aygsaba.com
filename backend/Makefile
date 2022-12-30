.PHONY: run docker migrate test cover sqlc

run: test migrate docker
	docker run -it \
		-p 3001:3000 \
		-v ${PWD}/data:/data \
		-v ${PWD}/etc/litestream.yml:/etc/litestream.yml \
		-e REPLICA_URL=s3://aygsaba-litestream/db \
		-e LITESTREAM_ACCESS_KEY_ID \
		-e LITESTREAM_SECRET_ACCESS_KEY \
		api.aygsaba.com:rc07

docker:
	make migrate
	docker build -f Dockerfile -t api.aygsaba.com:rc07 ./

migrate:
	goose -dir=data/migrations/ sqlite3 ./data/db status
	goose -dir=data/migrations/ sqlite3 ./data/db up

test:
	GO111MODULE=on go test -race -v -coverprofile=cover.out ./...

cover:test
	go tool cover -html=cover.out

sqlc:
	sqlc generate -f configs/sqlc.yaml
