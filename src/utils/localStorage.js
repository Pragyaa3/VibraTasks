export const saveTasks = (username, password, tasks) => {
  const key = `tasks_${username}_${password}`;
  localStorage.setItem(key, JSON.stringify(tasks));
};

export const loadTasks = (username, password) => {
  const key = `tasks_${username}_${password}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};
