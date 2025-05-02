require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(bodyParser.json());

// In-memory database with sample structure
let tasks = [
  {
    id: 1,
    title: 'Learn about CI/CD',
    completed: false,
    createdAt: new Date()
  },
  {
    id: 2,
    title: 'Complete assignment',
    completed: true,
    createdAt: new Date()
  }
];

// Helper function to generate IDs
let nextId = 3;
const generateId = () => nextId++;

// GET all tasks
app.get('/tasks', (req, res) => {
  // Sort by creation date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt);
  res.json(sortedTasks);
});

// POST new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Task title is required and must be a string' });
  }

  const newTask = {
    id: generateId(),
    title,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET single task
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// PUT update task (full update)
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Task title is required and must be a string' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title,
    updatedAt: new Date()
  };

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// PATCH update task (partial update - for completion status)
app.patch('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { completed } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed status must be a boolean' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    completed,
    updatedAt: new Date()
  };

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const initialLength = tasks.length;
  
  tasks = tasks.filter(t => t.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(204).end();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Sample tasks loaded:');
  console.log(tasks);
});