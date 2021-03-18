#Makefile

install:
	npm install

publish:
	npm publish --dry-run --unsafe-perm

lint:
	npx eslint .
