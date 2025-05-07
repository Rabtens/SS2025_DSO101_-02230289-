# Todo App - CI/CD Assignment

**Name:** [Kuenzang Rabten]  
**Student ID:** [02230289]  
**Course:** DSO101 - Continuous Integration & Deployment  

---

## Step 0: Building the Todo App Locally

### What We Did
We built a simple Todo List web application with:

- **Frontend (React.js)** – User interface for adding, editing, and deleting tasks  
- **Backend (Node.js/Express)** – API to handle task operations  
- **Database (PostgreSQL)** – Storage for persistent task data  

---

## Steps Followed

### 1. Backend Setup
- Created a Node.js server using Express
- Implemented API endpoints:
  - `GET /tasks` – Retrieve all tasks
  - `POST /tasks` – Create new task
  - `PUT /tasks/:id` – Update existing task
  - `DELETE /tasks/:id` – Remove task
- Configured environment variables in `.env` file for database connection

### 2. Frontend Setup
- Developed React application with:
  - Task input field
  - Task display list
  - Edit and delete functionality
- Connected to backend API using `REACT_APP_API_URL` environment variable

### 3. Database Setup
- Implemented PostgreSQL database with a `tasks` table containing:
  - `id` (Primary key)
  - `title` (Task description)
  - `completed` (Completion status)
  - `created_at` (Timestamp)

### 4. Local Testing
- Verified backend running on `http://localhost:5000`
- Confirmed frontend working on `http://localhost:3000`
- Validated database persistence of tasks

---

## Part A: Deploying with Docker and Render

### What We Did
We containerized the application using Docker and deployed it to Render's cloud platform.

---

## Steps Followed

### 1. Docker Containerization
- Created Dockerfiles for both frontend and backend services
- Built Docker images:
  ```bash
  docker build -t rabtens/be-todo:02190108 .
  docker build -t rabtens/fe-todo:02190108 .
  ```

![alt text](<Screenshot from 2025-05-02 22-43-39.png>)

![alt text](<Screenshot from 2025-05-02 22-45-17.png>)

![alt text](<Screenshot from 2025-05-02 22-49-19.png>)

![alt text](<Screenshot from 2025-05-02 22-50-32.png>)

## 2. Render Deployment

### Backend Service:
- Deployed Docker image: `yourdockerhub/be-todo:02190108`
- Configured environment variables (`DB_HOST`, `DB_USER`, `PORT`, etc.)
- Accessible at: [https://be-todo.onrender.com](https://be-todo.onrender.com)

### Frontend Service:
- Deployed Docker image: `yourdockerhub/fe-todo:02190108`
- Set `REACT_APP_API_URL` to backend service URL
- Accessible at: [https://fe-todo.onrender.com](https://fe-todo.onrender.com)

---

## 3. Database Configuration
- Provisioned PostgreSQL database through Render
- Established connection between backend service and database

---

## Testing the Deployment
- Frontend accessible at provided URL  
- Backend API endpoints functional  
- Database operations working as expected  

---

## Screenshots
- Local development environment  
- Docker Hub repository with images  
- Render service dashboard  
- Live application interface  

![alt text](<Screenshot from 2025-05-02 23-04-12.png>)

![alt text](<Screenshot from 2025-05-02 23-04-27.png>)

---

## Next Steps
- Implement automated deployments (Part B)  
- Add user authentication features  
- Enhance application interface  

---

## Render link

https://fe-todo-02190108.onrender.com





