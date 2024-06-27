#!/bin/bash
# Navigate to the project directory
cd /home/ec2-user/nextjs-app

# Install project dependencies
sudo npm install

# Build the Next.js application
sudo npm run build

# Verify the build directory is created
if [ ! -d "build" ]; then
    echo "Build directory not found. Build failed."
    exit 1
fi
