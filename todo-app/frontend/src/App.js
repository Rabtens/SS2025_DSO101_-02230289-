import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './index.css';

// Configure axios with base URL from environment variable
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get('/todos');
        setTodos(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        setLoading(false);
        console.error('Error fetching todos:', err);
      }
    };

    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async (todo) => {
    try {
      const res = await api.post('/todos', todo);
      setTodos([res.data.data, ...todos]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  // Update todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      const res = await api.put(`/todos/${id}`, updatedTodo);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? res.data.data : todo
        )
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Todo List</h1>
        <p>Manage your tasks efficiently</p>
      </div>

      <TodoForm onAddTodo={addTodo} />

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <TodoList
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;