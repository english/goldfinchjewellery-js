SUB_TEMPLATES = ruby -e 'puts STDIN.read.gsub("<!-- TEMPLATES -->", Dir["templates/*"].map(&File.method(:read)).join("\n"))'

all: dist

dist: dist/index.html dist/app.js dist/app.css

dist/app.js: app.js
	cp $< $@

dist/app.css: app.css
	cp $< $@

dist/index.html: index.html app.js app.css templates/*
	rm -rf dist/*
	@cat index.html | $(SUB_TEMPLATES) | tidy -indent -quiet >$@
	@echo 'built index.html'

clean:
	rm -rf dist/*

test-files: test/index.html test/app.js test/app.css

test/index.html: test/runner.html templates/*.html
	@cat test/runner.html | $(SUB_TEMPLATES) >$@

test/app.js: app.js
	cp $< $@

test/app.css: app.css
	cp $< $@

server:
	cd dist && python -m SimpleHTTPServer

test:
	testem

deploy:
	curl -T dist/index.html ftp://$(USER):$(PASSWORD)@goldfinchjewellery.co.uk/web/index.html
	curl -T dist/app.css ftp://$(USER):$(PASSWORD)@goldfinchjewellery.co.uk/web/app.css
	curl -T dist/app.js ftp://$(USER):$(PASSWORD)@goldfinchjewellery.co.uk/web/app.js

.PHONY: all clean server test test-files
