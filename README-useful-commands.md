Useful commands:

# Docker

Run the docker:
```bash
docker-compose up
```

Run and build the docker:
```bash
docker-compose up --build
```

See all containers (running and stopped):
```bash
docker ps -a
```

Get inside a container:
> `container_id` is the *name* (reported by `docker ps -a`) of the container you want to get inside
```bash
docker exec -it <container_id> sh
```

Test API with curl:
```bash
curl http://api:3001/health/hello-world
```




# Deployment to Google Cloud:

> Prerequisite: Ensure you have the Google Cloud CLI installed.

> Ensure you are loged in with `docker login`.

Configure docker to upload to gcloud:
```
gcloud auth configure-docker eu.gcr.io
```

## API

1. Build the docker image:
```bash
docker build -f docker/prod/Dockerfile -t dashboard-api .
```

2. Tag the image:
```bash
docker tag dashboard-api eu.gcr.io/dashboard-reactnodemongo/dashboard-api:latest
```

> Latest can be replaced with a version number if desired. For example: `gillemp/dashboard-api:1.0.0` (This applies to the tag and upload)

3. Upload the image to Docker Hub:
```bash
docker push eu.gcr.io/dashboard-reactnodemongo/dashboard-api:latest
```

4. In the Cloud Run of the Google Cloud Console, select `Edit and deploy new revision`. And select the image you just uploaded.


## Dashboard

1. Build the docker image:
```bash
docker build -f docker/prod/Dockerfile -t dashboard-front .
```

2. Tag the image:
```bash
docker tag dashboard-front eu.gcr.io/dashboard-reactnodemongo/dashboard-front:latest
```

> Latest can be replaced with a version number if desired. For example: `gillemp/dashboard-api:1.0.0` (This applies to the tag and upload)

3. Upload the image to Docker Hub:
```bash
docker push eu.gcr.io/dashboard-reactnodemongo/dashboard-front:latest
```

4. In the Cloud Run of the Google Cloud Console, select `Edit and deploy new revision`. And select the image you just uploaded.



# Prisma

When using Prisma with MongoDB, you don't create SQL migration files. The workflow is to update the schema and regenerate the client.

1. Update the `api/prisma/schema.prisma` file with your desired changes.
2. From the `api` directory on your host machine, regenerate the Prisma Client:

   ```bash
   npx prisma generate
   ```

This command should also be run inside the `api` container if you are developing within it to ensure the client is up to date.
