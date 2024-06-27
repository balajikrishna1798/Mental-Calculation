#!/bin/bash
# Add npm global binaries to the PATH
export PATH=$PATH:/usr/local/bin

# Start the application
cd /home/ec2-user/react-app

# Install serve globally and run it in the background
sudo npm install -g serve
nohup serve -s build -l 80 > /dev/null 2>&1 &
