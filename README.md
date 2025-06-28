# Full Stack Compliance Dashboard

This project is a full-stack application designed to monitor and track the conformity progress of multiple LLM-based systems, providing detailed evaluation results. It combines a React-based frontend, a Node.js/Express API backend, and a MongoDB database, all containerized for seamless deployment.

---

## Architecture & Technology Stack

### 1. **Frontend (React + TypeScript)**

- **React.js**: For building a dynamic and responsive interface.
- **React Admin**: Enables rapid development of admin dashboards.
- **Recharts**: Used for displaying visual data insights, such as pie and bar charts.

### 2. **Backend (Node.js/Express + TypeScript)**

- **Node.js**: Executes server-side logic.
- **Express**: Provides robust routing and API logic.
- **Prisma ORM**: Handles database interactions, migrations, and schema management.

### 3. **Database (MongoDB)**

- **MongoDB**: Stores system and evaluation data.
- **Prisma**: Ensures efficient and reliable database access. For Prisma to support all its features (like transactions for `upsert` operations), MongoDB must be run as a **replica set**.

### 4. **Containerization (Docker & Docker Compose)**

- **Docker**: Packages the frontend, API, and MongoDB database into isolated containers.
- **Docker Compose**: Manages the multi-container application, networking, and volumes for local development.

### 5. **Testing Tools**

> No testing has been coded, but the API project has been designed with testability in mind, adhering to principles of low coupling and high cohesion, enabling dependency injection and mocking for comprehensive testing.

- **Jest**: For unit and integration tests.
- **Testing Library**: For simulating real user interactions with React components.

### 6. **Code Quality Tools**

- **ESLint**: Detects potential issues in the code.
- **Prettier**: Ensures consistent formatting across the codebase.

---

## Front-end Dashboard Views

### Main (Dashboard's Home) View

The main dashboard view shows a list of the top 10 performing projects in a bar chart. The chart displays the conformity progress of each project, allowing users to compare the progress visually. Tapping on a project will navigate to the project's view.

> It also includes a link to the _API test_ view, which displays a simple _hello world_ message from the API if that service is running and accessible.

### Projects List View

A list of all projects is displayed in a table format, showing the project name, type and conformity progress. Users can click on a project to view detailed evaluation results for that project.

> The list can be exported to a CSV file by clicking on the export button. The items can be selected and deleted by clicking on the delete button.

### Project View

The page displays the project's name and type alongside a visual representation of the conformity progress with a pie chart with a needle pointing to the current progress. In addition, a list of the distinct evaluations performed on the project are displayed, sorted by score.

> Tapping on an evaluation will navigate to the evaluation's view.

### Evaluations List View

A list of all evaluations is displayed in a table format, showing the project they are related to, system, dataset, score, and other metrics (accuracy, relevancy, helpfulness, and toxicity).

> The list can be exported to a CSV file by clicking on the export button. The items can be selected and deleted by clicking on the delete button.

### Evaluation View

The page displays the evaluation's project, system, dataset, score, and other metrics alongside a visual representation of the distinct metrics in a radar chart.

### Edit views

From within the project list view, project view, evaluation list view, and evaluation view, users can edit the project and evaluation data by clicking on the edit button. This will open a form to edit the data.

> A delete button is also available to delete the project or evaluation.

### Create views

From within the project list view, and evaluation list view, users can create new projects and evaluations by clicking on the create button. This will open a form to create new data.

---

## Folder Structure Overview

```
Root/
 ├── api/
 │    ├── docker/
 │    ├── prisma/
 │    └── entrypoint.sh
 ├── dashboard/
 │    ├── docker/
 │    └── .env
 ├── database/
 └── docker-compose.yml
```

---

## Data Flow

The **frontend** communicates with the **backend** via RESTful APIs to fetch and update data.

- React Admin uses a **dataProvider** abstraction for API calls, mapping resources (e.g., projects, evaluations) to endpoints.
- Backend layers include:
  - **Router**: Handles HTTP requests and forwards them to services.
  - **Service**: Contains business logic for processing requests.
  - **Repository**: Interfaces with the Prisma ORM for database access.

---

## Docker Configuration

The project is containerized for both development and production.

### Development Configuration

- **Frontend**: Served on `http://localhost:3000`.
- **Backend**: Available at `http://localhost:3001`.
- **Database**: MongoDB accessible at `localhost:27017`.

#### Local Database: Single-Node Replica Set

For local development, we need to accommodate Prisma's requirements while keeping the setup simple.

-   **Why is this needed?** [Prisma's transactional features](https://www.prisma.io/docs/orm/reference/prisma-client-reference#transactions-in-mongodb), which are used for operations like `upsert` in the seeding script, require MongoDB to be configured as a **replica set**. A standalone instance is not sufficient. You can learn more about [MongoDB Replica Sets here](https://www.mongodb.com/docs/manual/replication/).

-   **How is it automated?**
    1.  **`docker-compose.yml`**: The `database` service is started with the `mongod --replSet rs0` command, instructing it to run as part of a replica set named `rs0`.
    2.  **`api/entrypoint.sh`**: When the `api` container starts, this script checks if the replica set has been initialized. If not, it automatically runs the `rs.initiate()` command to configure the single-node replica set.
    3.  **`api/.env`**: The `DATABASE_URL` connection string includes the `replicaSet=rs0` parameter, which tells the Prisma client to connect to the replica set.

This setup provides the transactional capabilities Prisma needs without requiring developers to manually configure a multi-node database cluster locally.

---

## Setup Instructions

Follow these steps to set up the project locally and run it using Docker Compose.

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Steps

1.  Clone the repository:
    ```bash
    git clone https://github.com/guplem/Dashboard-ReactNodeMongoDB.git
    cd Dashboard-ReactNodeMongoDB
    ``` 

2.  Build and start the containers:
    ```bash
    docker-compose up --build
    ```
    The `--build` flag is only necessary the first time or after changing Dockerfiles or dependencies.

3.  Access the application:
    -   Frontend: [http://localhost:3000](http://localhost:3000)
    -   Backend: [http://localhost:3001](http://localhost:3001)

4.  Stop and remove all containers:
    ```bash
    # Stop containers
    docker-compose down
    
    # Stop and remove the database volume if you need a clean slate
    docker-compose down -v
    ```

---

## Deployment to Google Cloud Platform (GCP)

The project is designed to be deployed using **GCP Cloud Run** for services and **MongoDB Atlas** for a scalable, managed database.

**Note:** Managed database services like MongoDB Atlas provide a replica set connection string by default. The automatic initialization in `entrypoint.sh` is for local development only and is not needed for a production environment pointing to Atlas. For production, you would use the full connection string from Atlas in your environment variables.

### Prerequisites

-   Install the **Google Cloud CLI**.
-   Authenticate with Docker: `gcloud auth configure-docker eu.gcr.io`

### API Deployment

1.  **Build the Docker image**:
    ```bash
    docker build -f api/docker/prod/Dockerfile -t dashboard-api .
    ```

2.  **Tag the image** for your GCP Artifact Registry:
    ```bash
    docker tag dashboard-api eu.gcr.io/YOUR_GCP_PROJECT_ID/dashboard-api:latest
    ```

3.  **Push the image**:
    ```bash
    docker push eu.gcr.io/YOUR_GCP_PROJECT_ID/dashboard-api:latest
    ```

4.  **Deploy in Cloud Run**:
    -   Open the Cloud Run console.
    -   Select `Edit and deploy new revision`.
    -   Choose the newly pushed image and configure necessary environment variables (like the production `DATABASE_URL`).

### Frontend Deployment

1.  **Build the Docker image**:
    ```bash
    docker build -f dashboard/docker/prod/Dockerfile -t dashboard-front .
    ```

2.  **Tag the image**:
    ```bash
    docker tag dashboard-front eu.gcr.io/YOUR_GCP_PROJECT_ID/dashboard-front:latest
    ```

3.  **Push the image**:
    ```bash
    docker push eu.gcr.io/YOUR_GCP_PROJECT_ID/dashboard-front:latest
    ```

4.  **Deploy in Cloud Run**, configuring the `REACT_APP_API_URL` environment variable to point to your deployed API's URL.
