#!/bin/bash
# Navigate to the project directory
cd /home/ec2-user/your-nextjs-app

# Install project dependencies and log output
npm install > /home/ec2-user/your-nextjs-app/npm-install.log 2>&1

# Build the Next.js application and log output
npm run build > /home/ec2-user/your-nextjs-app/npm-build.log 2>&1

# Verify the build directory is created
if [ ! -d ".next" ]; then
    echo "Build directory not found. Build failed."
    cat /home/ec2-user/your-nextjs-app/npm-build.log
    exit 1
fi
