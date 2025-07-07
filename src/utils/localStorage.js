export const getUserId = () => {
  const username = localStorage.getItem('username');
  return username ? `user-${username.toLowerCase().trim()}` : 'user-guest';
};

export const loadTasks = () => {
  const userId = getUserId();
  const data = localStorage.getItem(`tasks-${userId}`);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks) => {
  const userId = getUserId();
  localStorage.setItem(`tasks-${userId}`, JSON.stringify(tasks));
};
