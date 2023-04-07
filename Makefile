.DEFAULT_GOAL := help

include .env
export  $(shell sed 's/=.*//' .env)

# ---------------------------------------------------------- #
# LOCAL
# ---------------------------------------------------------- #

up:
	docker run -it --rm -p 3000:3000 -v ${PWD}:/app -w /app node:latest yarn dev

bash:
	docker run -it --rm -v ${PWD}:/app -w /app node:latest bash

help: ## Info Makefile Tags ~ Mode General
	@printf "\033[31m%-22s %-59s %s\033[0m\n" "Target" " Help"; \
	printf "\033[31m%-22s %-59s %s\033[0m\n"  "------" " ----"; \
	grep -hE '^\S+:.*## .*$$' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-22s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'
