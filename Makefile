REPORTER = spec

test:
	@./node_modules/.bin/mocha -t 10000 -R $(REPORTER)

.PHONY: test