#!/bin/bash

docker network rm session-network

docker network create session-network

docker-compose -f ./session-api/docker-compose.yaml up --build -d