### Lab Report
#### Lab Topic: Docker Containerization for React.js Application
##### Objective
The objective of this lab is to containerize a React.js application using Docker and Docker Compose. The lab demonstrates various containerization techniques including development containers, multi-stage builds, and container orchestration.
Tools & Technologies Used

- Docker
- Docker Compose
- Node.js
- React.js
- Git

## Steps Performed in Docker Containerization

### 1. Clone the Repository
Retrieve the sample project from the following repository:

```sh
git clone https://github.com/douglasswmcst/reactjs-subdevice
```

### 2. Switch to Development Branch
Navigate into the project directory and switch to the appropriate branch:

```sh
cd reactjs-subdevice
git checkout development
```

### 3. Install Dependencies
Install the necessary libraries using npm:

```sh
npm install
```
![alt text](<output_image/Screenshot from 2025-03-21 22-20-49.png>)

### 4. Run the Application Locally
Execute the application to verify that it operates correctly:

```sh
npm start
```

If there are compatibility issues with Node.js, switch to version 16:

```sh
nvm use 16
```

### 5. Create a Dockerfile for Testing
Define a `Dockerfile.test` in the root directory.

![alt text](<output_image/Screenshot from 2025-03-21 22-24-39.png>)

### 6. Build the Docker Image
Construct the Docker image using the following command:

```sh
docker build -f Dockerfile.test -t <your_username>/<image_name> .
```
![alt text](<output_image/Screenshot from 2025-03-21 22-32-58.png>)

### 7. Run the Docker Container
Start a container with volume mounting and port forwarding:

```sh
docker run -d -p 3000:3000 -v /app/node_modules -v $(pwd):/app <your_username>/<image_name>
```
![alt text](<output_image/Screenshot from 2025-03-21 22-36-02.png>)

![alt text](<output_image/Screenshot from 2025-03-21 22-37-08.png>)

Check active containers:

```sh
docker ps
```
![alt text](<output_image/Screenshot from 2025-03-21 22-51-30.png>)

To stop a running container:

```sh
docker stop <container_id>
```
![alt text](<output_image/Screenshot from 2025-03-21 22-52-25.png>)

### 8. Define a Docker Compose File
Create and configure `docker-compose.yml` to manage multiple services.

![alt text](<output_image/Screenshot from 2025-03-21 22-56-24.png>)

### 9. Deploy Containers Using Docker Compose
Launch the application using Docker Compose:

```sh
docker compose up -d --build
```
![alt text](<output_image/Screenshot from 2025-03-21 22-59-42.png>)

### 10. Execute Tests Inside the Container
List running containers:

```sh
docker ps
```

![alt text](<output_image/Screenshot from 2025-03-21 23-42-14.png>)

Access the application shell:

```sh
docker exec -it <web_container_id> sh
```

Run the test suite:

```sh
npm run test
```

![alt text](<output_image/Screenshot from 2025-03-21 23-05-53.png>)

Exit the container shell:

```sh
exit
```

### 11. Modify Docker Compose to Include a Test Service
Update `docker-compose.yml` to integrate a testing service, then save the modifications.

![alt text](<output_image/Screenshot from 2025-03-21 23-08-47.png>)

### 12. Stop Running Containers
Terminate the services:

```sh
docker compose stop
```
![alt text](<output_image/Screenshot from 2025-03-21 23-05-53.png>)

### 13. Implement a Multi-Stage Build Dockerfile
Create a new `Dockerfile` utilizing a multi-stage build approach to optimize the image size and performance.

![alt text](<output_image/Screenshot from 2025-03-21 23-12-14.png>)

### 14. Rebuild and Relaunch the Containers
Rebuild and restart the containers with the latest configuration:

```sh
docker compose up -d --build
```
![alt text](<output_image/Screenshot from 2025-03-21 23-35-14.png>)

Verify that the services are running:

```sh
docker ps
```
![alt text](<output_image/Screenshot from 2025-03-21 23-35-28.png>)

To halt execution:

```sh
docker compose stop
```
![alt text](<output_image/Screenshot from 2025-03-21 23-35-57.png>)

### 15. Perform a Multi-Stage Container Build
Construct the container using:

```sh
docker build .
```

![alt text](<output_image/Screenshot from 2025-03-21 23-38-40.png>)

Confirm the image creation:

```sh
docker images
```

### 16. Launch a Multi-Stage Container with Port Mapping
Deploy the container with specific ports:

```sh
docker run -d -p 8082:80 <image_ID>
```
![alt text](<output_image/Screenshot from 2025-03-21 23-41-57.png>)

Here, port 8082 on the host maps to port 80 within the container.

### 17. Validate the Running Application
Access the application via the browser:

```sh
http://localhost:8082
```

![alt text](<output_image/Screenshot from 2025-03-21 23-42-14.png>)

### Conclusion
This lab demonstrated the complete process of containerizing a React.js application from development to production. Docker containers provide consistency across different environments, eliminating the "it works on my machine" problem. The multi-stage build approach significantly reduced the final image size by excluding development dependencies and build tools from the production image. Docker Compose proved to be an efficient tool for managing multi-container setups, especially when dealing with different services like testing and development environments.
References

- Docker Documentation
- Docker Compose Documentation
- Node.js Documentation
- Nginx Documentation


Author: [Kuenzang Rabten]
Date: March 21, 2025