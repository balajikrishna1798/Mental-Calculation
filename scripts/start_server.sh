#!/bin/bash
# Add npm global binaries to the PATH
export PATH=$PATH:/usr/local/bin

# Start the application
cd /home/ec2-user/react-app

# Verify the build directory exists
if [ ! -d "build" ]; then
    echo "Build directory not found. Cannot start server."
    exit 1
fi

# Install serve globally and run it in the background on port 3000
sudo npm install -g serve
nohup serve -s build -l 3000 > /home/ec2-user/react-app/serve.log 2>&1 &

# Ensure the app is running
sleep 5
if ! pgrep -f "serve -s build -l 3000" > /dev/null; then
    echo "Serve failed to start"
    exit 1
fi
