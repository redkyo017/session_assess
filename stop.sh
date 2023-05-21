#!/bin/bash

docker-compose -f ./session-api/docker-compose.yaml down --rmi all -v        

docker network rm session-network