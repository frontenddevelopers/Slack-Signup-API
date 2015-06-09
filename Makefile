all: npm tests server

npm:
	npm install

server:
	node bin/www

tests:
	npm test
