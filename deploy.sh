#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# PRODUCTION
git checkout main
git reset --hard
git pull origin main

# Ensure yarn is installed globally
npm install -g yarn
npm global add serve

# Install dependencies
yarn install

# Build the project
npm run build

# Start the project with PM2
pm2 start "yarn run start:prod" --name=fabricClient

# Synchronize PM2 process list
pm2 save