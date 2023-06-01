# Use the Node.js 16 Alpine base image
FROM node:16-alpine3.15

# Set the working directory inside the container
WORKDIR /var/www/ui

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock /var/www/ui/

# Install dependencies
RUN yarn install

# Copy the entire project to the working directory
COPY . /var/www/ui

# Build the SPA
RUN yarn run build

# Specify the command to start the SPA
CMD yarn start
