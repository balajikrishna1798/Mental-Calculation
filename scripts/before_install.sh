#!/bin/bash
# Update the instance and install Node.js, npm, and Git
yum update -y
curl -sL https://rpm.nodesource.com/setup_16.x | bash -
yum install -y nodejs git
