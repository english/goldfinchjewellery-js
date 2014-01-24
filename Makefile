IMAGE_FILES = $(shell find images -type f)

all: dist/index.html dist/app.js dist/app.css $(patsubst %, dist/%, $(IMAGE_FILES))

dist/app.js: app.js
dist/app.css: app.css
dist/index.html: index.html templates/*
	@ruby -e 'puts File.read("index.html") \
			   .gsub("{{TEMPLATES}}", \
			     Dir["templates/*"].map(&File.method(:read)) \
			                       .join("\n")) \
			   .gsub("{{TESTS}}", "")' >dist/index.html
	@echo 'compiled templates'

dist/images/%: images/%
	@mkdir -p $(@D)
	cp $< $@

dist/%:
	cp $< $@

clean:
	rm -rf dist/*

test/index.html: index.html test/test.html templates/*.html
	@ruby -e 'puts File.read("index.html") \
			   .gsub("{{TEMPLATES}}", \
			     Dir["templates/*"].map(&File.method(:read)) \
			                       .join("\n")) \
			   .gsub("{{TESTS}}", File.read("test/test.html"))' >$@

server:
	cd dist && python -m SimpleHTTPServer

.PHONY: dist clean server
