#!/bin/bash
# Remember as a koa project this needs harmony features available in node 0.11.x
unset MONGO_SERVICE_HOST
unset MONGO_SERVICE_PORT
unset MONGO_PORT
export NODE_PATH=modules

echo "Running NODE_ENV: $NODE_ENV"

APP=${1-""}

echo $APP

cd /app/qalorie-backend/app

if [ "$APP" == "console" ]; then
    node bootstrap.js console
else
    node_modules/.bin/nodemon -w config -w modules -w app.js -w bootstrap.js -w lib -w config/config.yaml -i modules/webserver/frontend/ -i modules/webserver/public/ bootstrap.js
fi
