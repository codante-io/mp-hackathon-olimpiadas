MS_VERSION=1.1.0
MS_NAME=ms-olympic-games

TZ=UTC
NODE_ENV=development
GRAPHQL_PORT=4000
GRPC_PORT=50051
REST_PORT=3000
OLYMPIC_GAMES_URL=https://apis.codante.io/olympic-games/

start-http:
	TZ=$(TZ) \
	MS_NAME=$(MS_NAME) \
	NODE_ENV=$(NODE_ENV) \
	GRAPHQL_PORT=$(GRAPHQL_PORT) \
	REST_PORT=$(REST_PORT) \
	GRPC_PORT=$(GRPC_PORT) \
	OLYMPIC_GAMES_URL=$(OLYMPIC_GAMES_URL) \
	npm run start:dev:http

install:
	npm install

build:
	npm run build

run-tests:
	TZ=$(TZ) npm test

docker-build: install build
	sudo docker build -t $(MS_NAME):$(MS_VERSION) .

docker-run:
	sudo docker run \
		--env TZ=$(TZ) \
		--env NODE_ENV=$(NODE_ENV) \
		--env GRAPHQL_PORT=$(GRAPHQL_PORT) \
		--env GRPC_PORT=$(GRPC_PORT) \
		-p $(GRAPHQL_PORT):$(GRAPHQL_PORT) \
		-p $(GRPC_PORT):$(GRPC_PORT) \
		$(MS_NAME):$(MS_VERSION)

run-sonar:
	$(SONARQUBE_BIN_PATH) \
		-Dsonar.host.url=$(SONARQUBE_URL) \
		-Dsonar.login=$(SONARQUBE_LOGIN)