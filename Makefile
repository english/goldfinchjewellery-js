IMAGE_FILES = $(shell find images -type f)
SUB_TEMPLATES = ruby -e 'puts STDIN.read.gsub("<!-- TEMPLATES -->", Dir["templates/*"].map(&File.method(:read)).join("\n"))'
SUB_TESTS     = ruby -e 'puts STDIN.read.gsub("<!-- TESTS -->", File.read("test/test.html"))'
SUB_JS        = ruby -e 'puts STDIN.read.gsub("<!-- JS -->", "<script>\n" + File.read("app.js") + "\n</script>")'
SUB_CSS       = ruby -e 'puts STDIN.read.gsub("<!-- CSS -->", "<style>\n" + File.read("app.css") + "\n</style>")'

all: dist/index.html $(patsubst %, dist/%, $(IMAGE_FILES))

dist/index.html: index.html app.js app.css templates/*
	@cat index.html | $(SUB_TEMPLATES) | $(SUB_JS) | $(SUB_CSS) >$@
	@echo 'built index.html'

dist/images/%: images/%
	@mkdir -p $(@D)
	cp $< $@

clean:
	rm -rf dist/*

test/index.html: index.html test/test.html templates/*.html
	@cat index.html | $(SUB_TEMPLATES) | $(SUB_TESTS) | $(SUB_JS) | $(SUB_CSS) >$@

server:
	cd dist && python -m SimpleHTTPServer

test:
	testem

.PHONY: all clean server test
