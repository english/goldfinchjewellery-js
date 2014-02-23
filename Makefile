SUB_TEMPLATES = ruby -e 'puts STDIN.read.gsub("<!-- TEMPLATES -->", Dir["templates/*"].map(&File.method(:read)).join("\n"))'

all: dist

dist: dist/index.html dist/app.js dist/app.css

dist/app.js: src/app.js src/fn.js src/models.js src/views.js src/markdown.js
	cat src/fn.js src/markdown.js src/models.js src/views.js src/app.js > $@

dist/app.css: src/app.css
	cp $< $@

dist/index.html: src/index.html src/app.js src/app.css templates/*
	rm -rf dist/*
	cat src/index.html | $(SUB_TEMPLATES) | tidy -indent -quiet >$@

clean:
	rm -rf dist/*

test-files: test/tmp/index.html test/tmp/app.js

test/tmp/index.html: test/runner.html templates/*.html
	mkdir -p test/tmp
	cat test/runner.html | $(SUB_TEMPLATES) >$@

test/tmp/app.js: dist/app.js
	mkdir -p test/tmp
	cp $< $@

server:
	cd dist && python -m SimpleHTTPServer

api:
	node api.js

test:
	testem

deploy:
	curl -T dist/index.html ftp://$(USER):$(PASSWORD)@goldfinchjewellery.co.uk/web/index.html
	curl -T dist/app.css ftp://$(USER):$(PASSWORD)@goldfinchjewellery.co.uk/web/app.css
	curl -T dist/app.js ftp://$(USER):$(PASSWORD)@goldfinchjewellery.co.uk/web/app.js

.PHONY: all clean server test test-files
