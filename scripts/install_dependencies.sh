#!/bin/bash
# Install application dependencies and build the React app
cd /home/ec2-user/react-app

# Ensure npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm could not be found"
    exit 1
fi

# Install dependencies
npm install

# Build the React application
npm run build

# Verify the build directory is created
if [ ! -d "build" ]; then
    echo "Build directory not found. Build failed."
    exit 1
fi
