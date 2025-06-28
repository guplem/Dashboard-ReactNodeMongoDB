# Use official Node.js image as a parent image
FROM node:22

# Install MongoDB Shell (mongosh) for replica set initiation
RUN apt-get update && apt-get install -y gnupg curl && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg && \
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list && \
    apt-get update && \
    apt-get install -y mongodb-mongosh && \
    rm -rf /var/lib/apt/lists/*

# Download wait-for-it.sh script to wait for MongoDB connection to be ready
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# This seems to be necessary lately to make NPM install not take forever: https://forums.docker.com/t/npm-install-in-docker-tutorial-is-taking-forever/139328/14
RUN npm config set strict-ssl false

# Install dependencies
RUN npm ci --loglevel verbose

# Copy the entrypoint script into the container
COPY entrypoint.sh ./entrypoint.sh

# Make sure the entrypoint script has executable permissions
RUN chmod +x ./entrypoint.sh

# Copy the rest of your application code into the container
COPY . .

# Expose the port that the API will run on
EXPOSE 8080

# Set the entrypoint to your custom entrypoint script
ENTRYPOINT ["bash", "./entrypoint.sh"]
