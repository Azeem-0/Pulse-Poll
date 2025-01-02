#!/bin/bash
# Pull the latest Docker image from Docker Hub
docker pull azeemshaik025/client:latest

# Stop and remove any existing container
docker stop pulse-poll || true
docker rm pulse-poll || true

# Run the new container with the pulled image
docker run -d --name pulse-poll -p 3000:3000 azeemshaik025/client:latest
