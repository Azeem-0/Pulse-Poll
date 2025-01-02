#!/bin/bash
# Stop the running container if it exists
docker stop pulse-poll || true
docker rm pulse-poll || true
