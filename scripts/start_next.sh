#!/bin/bash
cd /var/www/html
npm install -g pm2
pm2 start npm --name "next-app" -- start
