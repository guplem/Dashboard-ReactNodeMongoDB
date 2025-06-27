#!/bin/bash

echo "🚧 Starting build process for the API server..."

# Wait for MongoDB to be ready
echo "⏳ Waiting for connection to MongoDB server at $MONGO_HOST:$MONGO_PORT to be ready..."
/usr/local/bin/wait-for-it.sh $MONGO_HOST:$MONGO_PORT --timeout=60 -- echo "✅ MongoDB connection is ready."

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
