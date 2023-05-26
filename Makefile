ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
VENV_DIR = venv
PYTHON = python3
DOCKER = docker
DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = docker-compose.yml

include $(ROOT_DIR)/.env 

.PHONY: up down build

up: ## Start all or c=<name> containers in foreground
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up $(c)

down:
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

build:
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up --build $(c)
