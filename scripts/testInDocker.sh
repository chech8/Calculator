#!/bin/bash

# Build docker image
sudo docker build -t calculator .

# Start the container with options:
# -rm will delete container after it's stopped
# -i Keep STDIN open even if not attached
# -t Allocate a pseudo-TTY
# -d detached mode
# -p 3000:3000 link docker host port 3000 to container port 3000
# Container name is calculator-app, image name calculator
sudo docker run --rm --name calculator-app -itd -p 3000:3000 calculator
