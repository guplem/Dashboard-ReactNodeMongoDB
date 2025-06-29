#!/bin/bash

# Set default values for MongoDB host and port if not set
MONGO_HOST=${MONGO_HOST:-database}
MONGO_PORT=${MONGO_PORT:-27017}

echo "🚧 Starting build process for the API server..."

# Wait for MongoDB to be ready
echo "⏳ Waiting for connection to MongoDB server at $MONGO_HOST:$MONGO_PORT to be ready..."
/usr/local/bin/wait-for-it.sh $MONGO_HOST:$MONGO_PORT --timeout=60 -- echo "✅ MongoDB connection is ready."

echo "ℹ️ Checking MongoDB replica set status..."
# If rs.status() fails, the exit code will be non-zero.
# We redirect stderr to /dev/null to suppress the expected error message on first run.
# The command is updated to connect without authentication.
if ! mongosh "mongodb://database:27017/admin" --eval "rs.status()" --quiet 2>/dev/null; then
  echo "🚀 Initiating MongoDB replica set..."
  mongosh "mongodb://database:27017/admin" --eval 'rs.initiate({_id: "rs0", members: [{_id: 0, host: "database:27017"}]})'
  # Wait for the replica set to elect a primary.
  echo "⏳ Waiting 10 seconds for replica set to elect a primary..."
  sleep 10
else
  echo "✅ MongoDB replica set already initiated."
fi

# Run Prisma generate to ensure the Prisma Client is generated
echo "🔄 Generating Prisma Client..."
npx prisma generate

# Seed the database with initial data
echo "🌱 Seeding the database with initial data..."
npx prisma db seed

# Run the API server with hot reloading in development mode
if [ "$NODE_ENV" = "development" ]; then
  echo "⚒️ Starting API server in development mode with hot reloading..."
  npm run dev
else
  echo "🏛️ Starting API server in production mode..."
  npm run start
fi
