# Develop

build-dev:
	cd client && MAKE build-dev
	cd server && MAKE build

run-dev:
	docker-compose -f docker-compose.dev.yml up

# Production

build-production:
	cd client && MAKE build-production
	cd server && MAKE build

run-production:
	docker-compose -f docker-compose.production.yml up