#!/bin/bash

docker-compose -f ./session-api/docker-compose.yaml down --rmi all -v        
docker-compose -f ./session-web/docker-compose.yaml down --rmi all -v        

docker network rm session-network