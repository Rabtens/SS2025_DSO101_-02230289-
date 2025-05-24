import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask })
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTask('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.title);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditText('');
  };

  const updateTask = async (id) => {
    if (!editText.trim()) return;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editText })
      });
      const data = await response.json();
      setTasks(tasks.map(task => task.id === id ? data : task));
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });
      const data = await response.json();
      setTasks(tasks.map(task => task.id === id ? data : task));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      
      {/* Add Task Form */}
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      
      {/* Tasks List */}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {editingTask === task.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && updateTask(task.id)}
                />
                <button onClick={() => updateTask(task.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id, task.completed)}
                />
                <span>{task.title}</span>
                <div className="task-actions">
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;