# Lab Report 2

## Lab Topic: Multi-Container Application Deployment with Docker

## Objective
The objective of this lab is to set up and deploy a multi-container application using Docker and Docker Compose. The lab covers cloning a sample application, building container images, running containers, and simplifying deployment using Docker Compose.

## Lab Guide Reference
This lab follows the official guide for setting up a sample multi-container application consisting of Nginx, Node.js, and Redis. It covers:
- Cloning the sample repository
- Building Docker images
- Running multiple containers using Docker
- Managing deployment using Docker Compose

## Tools & Technologies Used
- Docker
- Docker Desktop
- Git

## Implementation Steps
### Step 1: Setup
1. Clone the sample application repository:
   ```bash
   git clone https://github.com/dockersamples/nginx-node-redis
   ```
2. Navigate into the project directory:
   ```bash
   cd nginx-node-redis
   ```
3. Install Docker Desktop.

### Step 2: Build the Images
1. Navigate into the `nginx` directory and build the image:
   ```bash
   cd nginx
   docker build -t nginx .
   ```
![alt text](<output_screenshot/Screenshot from 2025-03-21 09-25-36.png>)

2. Navigate into the `web` directory and build the first web image:
   ```bash
   cd ../web
   docker build -t web .
   ```
![alt text](<output_screenshot/Screenshot from 2025-03-21 09-26-09.png>)

### Step 3: Run the Containers
1. Create a network for communication:
   ```bash
   docker network create sample-app
   ```
2. Start the Redis container:
   ```bash
   docker run -d --name redis --network sample-app --network-alias redis redis
   ```
![alt text](<output_screenshot/Screenshot from 2025-03-21 09-27-42.png>)

3. Start the first web container:
   ```bash
   docker run -d --name web1 -h web1 --network sample-app --network-alias web1 web
   ```
![alt text](<output_screenshot/Screenshot from 2025-03-21 09-28-02.png>)

4. Start the second web container:
   ```bash
   docker run -d --name web2 -h web2 --network sample-app --network-alias web2 web
   ```
![alt text](<output_screenshot/Screenshot from 2025-03-21 09-28-13.png>)

5. Start the Nginx container:
   ```bash
   docker run -d --name nginx --network sample-app -p 80:80 nginx
   ```
![alt text](<output_screenshot/Screenshot from 2025-03-21 09-37-37.png>)

6. Verify the containers are running:
   ```bash
   docker ps
   ```
![alt text](<output_screenshot/Screenshot from 2025-03-21 09-37-53.png>)

### Step 4: Simplify Deployment Using Docker Compose
1. Navigate to the project root directory.
2. Use Docker Compose to start the application:
   ```bash
   docker compose up -d --build
   ```
![alt text](<output_screenshot/Screenshot from 2025-03-21 09-39-51.png>)

## Code Implementation
```yaml
version: '3'
services:
  nginx:
    build: ./nginx
    ports:
      - "80:80"
    networks:
      - app-network
  web1:
    build: ./web
    networks:
      - app-network
  web2:
    build: ./web
    networks:
      - app-network
  redis:
    image: redis
    networks:
      - app-network
networks:
  app-network:
    driver: bridge
```

## Output

![alt text](<output_screenshot/Screenshot from 2025-03-21 09-38-28.png>)

![alt text](<output_screenshot/Screenshot from 2025-03-21 09-38-39.png>)

## Observations & Results
- Successfully deployed a multi-container application using Docker and Docker Compose.
- Observed Nginx acting as a reverse proxy, distributing requests in a round-robin fashion between `web1` and `web2`.
- Verified running containers and accessed the application at `http://localhost`.

## Conclusion
This lab demonstrated the process of setting up a multi-container application using Docker. By using Docker Compose, deployment was simplified compared to running individual `docker run` commands.

## References
- [Docker Documentation](https://docs.docker.com/)

---

*Author: [Kuenzang Rabten]*  
*Date: [March 20, 2025]*
