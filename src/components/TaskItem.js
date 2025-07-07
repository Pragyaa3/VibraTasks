import React from 'react';
import { motion } from 'framer-motion';

function TaskItem({ task, deleteTask, toggleComplete, setEditingTask }) {
  return (
    <motion.div
      className={`task-item ${task.completed ? 'completed' : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
          {task.priority && <span className="badge priority">{task.priority}</span>}
          {task.dueDate && <span className="badge due">Due: {task.dueDate}</span>}
          {task.category && <span className="badge category">{task.category}</span>}
        </div>
      </div>
      <div>
        <button onClick={() => toggleComplete(task.id)}>
          {task.completed ? '☑️' : '⬜'}
        </button>
        <button onClick={() => setEditingTask(task)}>✏️</button>
        <button onClick={() => deleteTask(task.id)}>🗑️</button>
      </div>
    </motion.div>
  );
}

export default TaskItem;
