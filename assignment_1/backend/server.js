require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', require('./routes/todoRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Todo API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
  console.log(`Server running in development mode on port ${PORT}`)
);