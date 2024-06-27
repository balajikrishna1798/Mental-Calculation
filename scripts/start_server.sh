#!/bin/bash
# Start the application
cd /home/ec2-user/react-app
npm install -g serve
serve -s build -l 80
