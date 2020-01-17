#!/bin/sh

# run migrations
npm run migration:run

exec "$@"