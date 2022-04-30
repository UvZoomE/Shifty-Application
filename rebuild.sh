#!/bin/bash

docker compose down

if [ "$1" = "app" ] || [ "$2" = "app" ]; then
  docker rmi shifty-application_shifty-app
fi

if [ "$1" = "api" ] || [ "$2" = "api" ]; then
  docker rmi shifty-application_shifty-server
fi

if (( $# == 0 )); then
    docker rmi shifty-application_shifty-app shifty-application_shifty-server
fi

docker compose up -d