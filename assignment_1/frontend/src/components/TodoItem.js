import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Task cannot be empty');
      return;
    }
    
    onUpdateTodo(todo._id, { title });
    setIsEditing(false);
  };

  const toggleCompleted = () => {
    onUpdateTodo(todo._id, { completed: !todo.completed });
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleUpdate}>
          <input
            type="text"
            className="edit-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="save-btn">Save</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => {
              setIsEditing(false);
              setTitle(todo.title);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={toggleCompleted}
            />
            <span className="todo-text">{todo.title}</span>
          </div>
          <div className="todo-actions">
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              disabled={todo.completed}
            >
              Edit
            </button>
            <button 
              className="delete-btn"
              onClick={() => onDeleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;