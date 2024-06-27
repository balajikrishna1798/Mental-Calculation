#!/bin/bash
# Start the application
export PATH=$PATH:/usr/local/bin
cd /home/ec2-user/react-app
sudo npm install -g serve
sudo serve -s build -l 80
