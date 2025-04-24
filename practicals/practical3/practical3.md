### Lab Report

# Docker Containerization Lab Report

## Lab Topic: Docker Containerization for Portfolio Website

### Objective
The objective of this lab is to containerize a portfolio website using Docker, push the image to Docker Hub, and deploy it using Render.com. The lab demonstrates basic containerization techniques and deployment workflows.

### Tools & Technologies Used
- Docker
- Nginx
- GitHub
- Render.com
- HTML/CSS

## Steps Performed in Docker Containerization

### Part 1: Create and Push a Pre-built Docker Image

#### Step 1: Prepare the Application
For this practical, I used my personal portfolio website consisting of:
- `index.html`
- `style.css`
- Various images and assets

#### Step 2: Create a Dockerfile
Define a `Dockerfile` in the root directory:

```dockerfile
# Use official Nginx base image
FROM nginx:alpine

# Copy portfolio files into the default Nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
```

#### Step 3: Build the Docker Image
Construct the Docker image using the following command:

```sh
docker build -t rabtens/port .
```

![alt text](<../practical3/Screenshot from 2025-04-24 15-40-16.png>)

#### Step 4: Test the Docker Image Locally
Start a container with port forwarding:

```sh
docker run -d -p 8001:80 rabtens/port
```
![alt text](<../practical3/Screenshot from 2025-04-24 15-52-07.png>)

#### Step 5: Push Image to Docker Hub
Push the image to Docker Hub repository:

```sh
docker login
docker push rabtens/port
```

![alt text](<../practical3/Screenshot from 2025-04-24 15-56-52.png>)

### Part 2: Dockerfile + GitHub + Render Deployment

#### Step 1: GitHub Setup
- The same application was committed and pushed to a public GitHub repository
- The Dockerfile was placed in the root directory

![alt text](<../practical3/Screenshot from 2025-04-24 16-01-45.png>)

#### Step 2: Deploy to Render
- Created a new web service on Render.com
- Selected Docker as deployment method
- Connected to GitHub repo
- Set the Dockerfile path as Dockerfile
- Render automatically built and deployed the container

Successful deployment to Render. We can now view the image locally using the port `localhost:8001`

![alt text](<../practical3/Screenshot from 2025-04-24 15-58-53.png>)

## Conclusion
This Docker practical exercise provided hands-on experience in containerizing a web application and deploying it using different platforms. By creating a Dockerfile for a simple portfolio website and building a Docker image, I learned the fundamental steps of containerization. Testing the image locally ensured that the application worked as expected before pushing it to Docker Hub for public access.

The second part of the practical demonstrated the integration of Docker with GitHub and Render.com. By connecting a GitHub repository containing the Dockerfile to Render, the deployment process became automated.

## References
- Docker Documentation
- Nginx Documentation
- Render.com Documentation

*Author: [Kuenzang Rabten]*

*Date: April 24, 2025*