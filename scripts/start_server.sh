#!/bin/bash
# Add npm global binaries to the PATH
export PATH=$PATH:/usr/local/bin

# Navigate to the project directory
cd /home/ec2-user/your-nextjs-app

# Verify the build directory exists
if [ ! -d ".next" ]; then
    echo "Build directory not found. Cannot start server."
    exit 1
fi

# Install PM2 globally
sudo npm install -g pm2

# Start the Next.js application using PM2
pm2 start npm --name "nextjs-app" -- run start -- -p 3000

# Ensure the app is running
sleep 5
if ! pgrep -f "pm2" > /dev/null; then
    echo "PM2 failed to start the application"
    exit 1
fi
