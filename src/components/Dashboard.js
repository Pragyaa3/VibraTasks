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
    const password = localStorage.getItem('password');

    useEffect(() => {
        if (!username || !password) {
            navigate('/login');
        } else {
            setTasks(loadTasks(username, password));
        }
    }, [navigate, username, password]);

    useEffect(() => {
        if (username && password) {
            saveTasks(username, password, tasks);
        }
    }, [tasks, username, password]);


    const addTask = (task) => {
        const userTask = { ...task, username };
        setTasks([...tasks, userTask]);
    };

    const updateTask = (updatedTask) => {
        setTasks(prev =>
            prev.map(task => (task.id === updatedTask.id ? { ...updatedTask, username } : task))
        );
        setEditingTask(null);
    };

    const deleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task => task.id === id
            ? { ...task, completed: !task.completed }
            : task));
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

    const handleDarkToggle = () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    };

    useEffect(() => {
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
    }, []);

    return (
        <div className="dashboard dashboard-page">
            <h1 className="dash-title">📋 Your Tasks, {username}!</h1>
            <button className="dark-toggle" onClick={handleDarkToggle}>
                🌙 Toggle Dark Mode
            </button>

            <button className="logout-button" onClick={() => {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                navigate('/login');
            }}>
                🚪 Logout
            </button>


            <input
                type="text"
                placeholder="🔍 Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="task-search"
            />

            <TaskForm
                addTask={addTask}
                editingTask={editingTask}
                updateTask={updateTask}
            />

            <TaskFilter
                filter={filter}
                setFilter={setFilter}
                tasks={tasks}
            />

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
