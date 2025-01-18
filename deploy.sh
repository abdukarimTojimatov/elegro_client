#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# PRODUCTION
git checkout master
git reset --hard
git pull origin master

# Ensure yarn is installed globally

npm install -g serve


# Build the project
npm run build

# Start the project with PM2
pm2 start "npm run dev:prod" --name=fabricClient

# Synchronize PM2 process list
pm2 save