#Makefile

install:
	npm ci
	npm link

publish:
	npm publish --dry-run --unsafe-perm

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage
