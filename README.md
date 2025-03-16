# SS2025_DSO101_-02230289-

### Practical Overview

This project is a simple Flask web application that uses Redis as a backend to count the number of times the application has been accessed. The application is containerized using Docker and managed using Docker Compose.

## Steps Performed

Step 1: Project Setup

- Created a new project directory named composetest.

- Created an app.py file containing a Flask application.

- Created a requirements.txt file listing the dependencies.

- Created a Dockerfile to containerize the application.

Step 2: Defining Services with Docker Compose

- Created a compose.yaml file.

- Defined two services: web (Flask app) and redis (Redis container).

- Configured ports so the application is accessible via http://localhost:8000/.

Step 3: Building and Running the Application

- Ran docker compose up to build and start the application.

- Verified the application by accessing http://localhost:8000/ in a web browser.

- Confirmed that the visit counter increments with each refresh.

Step 4: Enabling Live Updates with Compose Watch

- Edited compose.yaml to enable file watching and automatic updates.

- Used docker compose watch to keep the application updated as code changes.

- Modified app.py to test live updates without restarting the container.

Step 5: Splitting Services into Separate Files

- Created infra.yaml to separate Redis from the main compose.yaml file.

- Used the include directive to reference infra.yaml in compose.yaml.

- Verified modularized configuration by running docker compose up again.

Step 6: Running and Managing Services

- Used docker compose up -d to start services in the background.

- Checked running services using docker compose ps.

- Stopped services with docker compose stop and removed them with docker compose down.

### Conclusion

This practical demonstrates how to containerize a simple Flask application with Redis using Docker Compose. It also shows how to enable live updates and manage multiple services efficiently.

### Commands Summary

- docker compose up - Build and start the application.

- docker compose watch - Enable live code syncing.

- docker compose up -d - Start services in the background.

- docker compose ps - List running containers.

- docker compose stop - Stop running containers.

- docker compose down - Remove all containers.