# Practical 8: Complete CI/CD Workflow Using GitHub Actions

**Course:** DSO101 - Continuous Integration and Continuous Deployment  
**Submitted by:** Kuenzang Rabten  
**Date:** 28th May, 2025

---

## Overview

This practical focuses on implementing a complete CI/CD pipeline using GitHub Actions. The workflow involves:

- Building a Docker image on every Git push
- Pushing it to Docker Hub
- Deploying the application to Render.com

This practical also demonstrates how to handle a multi-service (frontend + backend) Node.js application with automated deployment.

---

## Prerequisites

Before starting, the following were set up:

- GitHub account for version control and GitHub Actions
- Docker Hub account for storing Docker images
- Render account for application deployment
- Docker and Node.js installed locally
- Basic understanding of Docker and YAML syntax

---

## Step 1: Created a Simple Node.js Application

Created a folder `my-cicd-app/` with the following structure:

```

my-cicd-app/
├── src/
│   ├── index.js
│   └── public/
│       ├── index.html
│       └── style.css
├── package.json
├── Dockerfile
├── .dockerignore
├── .gitignore
└── .github/
└── workflows/
└── ci-cd.yml

````

---

## Step 2: Wrote the Application Code

Implemented a basic Express.js server that serves static content and provides health check and API endpoints.

**src/index.js**
```javascript
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/info', (req, res) => {
  res.json({
    message: 'Hello from CI/CD Demo App!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
````

---

## Step 3: Dockerized the Application

**Dockerfile**

```Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Created a `.dockerignore` to exclude unnecessary files.

---

## Step 4: Configured GitHub Actions Workflow

**.github/workflows/ci-cd.yml**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: rabtens/my-cicd-app:latest

      - name: Trigger Render Deploy Hook
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK_URL }}
```

---

## Step 5: Set Secrets in GitHub

Configured the following GitHub repository secrets under **Settings → Secrets and variables → Actions**:

* `DOCKERHUB_USERNAME`
* `DOCKERHUB_TOKEN` (created from Docker Hub)
* `RENDER_DEPLOY_HOOK_URL` (from Render deploy settings)

---

## Step 6: Setup Render Deployment

On Render:

* Created a new **Web Service**
* Selected **Deploy from Docker Image**
* Linked DockerHub repository and image tag
* Configured the port to `3000` and selected region closest to the target users

---

## Challenge Completed: Automatic Deployment

Successfully triggered automatic Docker image builds and deployments on every push to the main branch.

**CI/CD Flow:**

1. Code push to GitHub
2. GitHub Actions builds Docker image and pushes to Docker Hub
3. GitHub Actions triggers deployment on Render

---

## Output and Screenshots

* GitHub Actions: Workflow completed successfully
* Docker Hub: Image `rabtens/my-cicd-app:latest` created
* Render: Application deployed and live with the latest changes

![alt text](<outputimages/Screenshot from 2025-05-31 09-43-30.png>)

![alt text](<outputimages/Screenshot from 2025-05-31 10-17-28.png>)

![alt text](<outputimages/Screenshot from 2025-05-31 10-26-39.png>)

![alt text](<outputimages/Screenshot from 2025-05-31 10-35-08.png>)

![alt text](<outputimages/Screenshot from 2025-05-31 10-37-19.png>)

![alt text](<outputimages/Screenshot from 2025-05-31 10-38-38.png>)

![alt text](<outputimages/Screenshot from 2025-05-31 10-38-53.png>)

---

## Key Learnings

* Automated Docker image creation and deployment using GitHub Actions
* Integrated CI/CD pipelines with Render for real-time deployment
* Managed secrets and environment variables securely
* Reinforced understanding of Docker, GitHub workflows, and deployment pipelines

---

## Conclusion

This practical emphasized the importance of automation in DevOps by building a complete CI/CD workflow with GitHub Actions, Docker, and Render. Automating build and deployment processes:

* Increases development speed
* Improves reliability
* Ensures consistent delivery of updates

This exercise demonstrates how CI/CD can seamlessly fit into modern web development workflows.


