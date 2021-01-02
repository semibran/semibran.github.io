# GNU Make 3.8.2 and above

MAKEFLAGS += --no-print-directory

.EXPORT_ALL_VARIABLES:
.SILENT:

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: clean assets
	esbuild src/index.js --bundle --minify --outfile=dist/index.js
	postcss src/style.css -u autoprefixer -o dist/style.css -m
	cleancss dist/style.css -o dist/style.css --source-map --source-map-inline-sources
	html-minifier --collapse-whitespace src/index.html -o dist/index.html
	rm dist/*.map

watch: clean js css html assets
	chokidar "src/**/*.js" -c "make js" \
	& chokidar "src/*.css" -c "make css" \
	& chokidar "src/*.html" -c "make html" \
	& chokidar "src/assets/*" -c "make assets" \

clean:
	rm -rf dist
	mkdir -p dist/assets

html:
	cp src/index.html dist/index.html

css:
	cp src/style.css dist/style.css

js:
	esbuild src/index.js --bundle --sourcemap --outfile=dist/index.js

assets:
	cp src/assets/* dist/assets
