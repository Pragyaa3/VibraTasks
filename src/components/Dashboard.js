// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { loadTasks, saveTasks } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [editingTask, setEditingTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');


    const username = localStorage.getItem('username');

    useEffect(() => {
        if (!username) navigate('/login');
        setTasks(loadTasks());
    }, [navigate, username]);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        setEditingTask(null);
    };

    const deleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const filteredTasks = tasks
        .filter(task =>
            filter === 'all' ? true :
                filter === 'completed' ? task.completed : !task.completed
        )
        .filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );


    return (
        <div className="dashboard">
            <h1 className="dash-title">📋 Your Tasks, {username}!</h1>
            <button className="dark-toggle" onClick={() => {
                document.body.classList.toggle('dark-mode');
            }}>
                🌙 Toggle Dark Mode
            </button>

            <input
                type="text"
                placeholder="🔍 Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="task-search"
            />

            <TaskForm addTask={addTask} editingTask={editingTask} updateTask={updateTask} />
            <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
            <TaskList
                tasks={filteredTasks}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                setEditingTask={setEditingTask}
            />
        </div>
    );
}

export default Dashboard;