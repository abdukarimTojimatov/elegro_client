#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting deployment in development mode..."

# Step 1: Pull the latest code
echo "Pulling the latest changes from Git..."
git checkout master
git reset --hard
git pull origin master

# Step 2: Ensure dependencies are installed
echo "Installing dependencies..."
npm install

# Step 3: Check and install Vite globally (if necessary)
if ! command -v vite &> /dev/null; then
  echo "Vite is not installed globally. Installing..."
  npm install -g vite
fi

# Step 4: Build the project (Optional if not used in dev mode)
echo "Building the project..."
npm run build

# Step 5: Start the project with PM2 in development mode
echo "Starting the application with PM2 in development mode..."
pm2 delete elegroClient || true  # Ensure old process is removed
pm2 start "npm run dev" --name=elegroClient

# Step 6: Synchronize PM2 process list
echo "Saving PM2 process list..."
pm2 save

echo "Deployment complete! The application is now running in development mode."
