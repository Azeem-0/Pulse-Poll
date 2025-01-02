#!/bin/bash
# Use curl to validate the application is running on port 80
if curl --silent --fail http://localhost:3000; then
  echo "Application is running successfully."
  exit 0
else
  echo "Application is not responding."
  exit 1
fi
