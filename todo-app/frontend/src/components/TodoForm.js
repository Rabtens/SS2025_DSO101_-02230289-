import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please add a task');
      return;
    }
    
    onAddTodo({ title });
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn">Add Task</button>
      </div>
    </form>
  );
};

export default TodoForm;