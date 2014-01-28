SUB_TEMPLATES = ruby -e 'puts STDIN.read.gsub("<!-- TEMPLATES -->", Dir["templates/*"].map(&File.method(:read)).join("\n"))'
SUB_TESTS     = ruby -e 'puts STDIN.read.gsub("<!-- TESTS -->", File.read("test/test.html"))'
RM_TESTS      = ruby -e 'puts STDIN.read.gsub("<!-- TESTS -->", "")'

all: dist/index.html

dist/index.html: index.html app.js app.css templates/*
	rm -rf dist/*
	@cat index.html | $(SUB_TEMPLATES) | tidy -indent -quiet | $(RM_TESTS) >$@
	@echo 'built index.html'
	cp app.js dist/app.js
	cp app.css dist/app.css

clean:
	rm -rf dist/*

test-files: app.js index.html test/test.html templates/*.html
	@cat index.html | $(SUB_TEMPLATES) | $(SUB_TESTS) >test/index.html

test/index.html: test-files

server:
	cd dist && python -m SimpleHTTPServer

test:
	testem

deploy:
	curl -T dist/index.html ftp://$(USER):$(PASSWORD)@goldfinchjewellery.co.uk/web/index.html
	curl -T dist/app.css ftp://$(USER):$(PASSWORD)@goldfinchjewellery.co.uk/web/app.css
	curl -T dist/app.js ftp://$(USER):$(PASSWORD)@goldfinchjewellery.co.uk/web/app.js

.PHONY: all clean server test
