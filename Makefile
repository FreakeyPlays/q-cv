# Develop

build-dev:
	cd client && MAKE build-dev
	cd server && MAKE build

run-dev:
	docker-compose -f docker-compose.dev.yml up

start-dev:
	docker-compose -f docker-compose.dev.yml start

stop-dev:
	docker-compose -f docker-compose.dev.yml stop

remove-dev:
	docker-compose -f docker-compose.dev.yml down

# Production

build-production:
	cd client && MAKE build-production
	cd server && MAKE build

run-production:
	docker-compose -f docker-compose.production.yml up

start-production:
	docker-compose -f docker-compose.production.yml start

stop-production:
	docker-compose -f docker-compose.production.yml stop

remove-production:
	docker-compose -f docker-compose.production.yml down