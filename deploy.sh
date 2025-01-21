#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting deployment..."

# Step 1: Pull the latest code
echo "Pulling the latest changes from Git..."
git checkout master
git reset --hard
git pull origin master

# Step 2: Ensure dependencies are installed
echo "Installing dependencies..."
npm install

# Step 3: Ensure Vite is installed globally (if necessary)
if ! command -v vite &> /dev/null; then
  echo "Vite is not installed globally. Installing..."
  npm install -g vite
fi

# Step 4: Build the project
echo "Building the project..."
if npm run build; then
  echo "Build successful!"
else
  echo "Build failed, attempting with npx vite build..."
  npx vite build
fi

# Step 5: Start the project with PM2
echo "Starting the application with PM2..."
pm2 delete fabricClient || true  # Ensure old process is removed
pm2 start "npm run dev" --name=elegroClient

# Step 6: Synchronize PM2 process list
echo "Saving PM2 process list..."
pm2 save

echo "Deployment complete!"
