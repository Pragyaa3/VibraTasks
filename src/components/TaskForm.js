import React, { useEffect, useState } from 'react';

function TaskForm({ addTask, editingTask, updateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority || 'Medium');
      setDueDate(editingTask.dueDate || '');
      setCategory(editingTask.category || '');
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
      setCategory('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      description,
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
      priority,
      dueDate,
      category,
    };

    if (editingTask) updateTask(taskData);
    else addTask(taskData);

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setCategory('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">🟢 Low</option>
        <option value="Medium">🟡 Medium</option>
        <option value="High">🔴 High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category (e.g. Work, Personal)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">
        {editingTask ? '✏️ Update Task' : '➕ Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
