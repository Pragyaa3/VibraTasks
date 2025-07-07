import React from 'react';

function TaskFilter({ filter, setFilter, tasks }) {
  const count = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="filter">
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
        All ({count.all})
      </button>
      <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
        Completed ({count.completed})
      </button>
      <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>
        Pending ({count.pending})
      </button>
    </div>
  );
}

export default TaskFilter;
