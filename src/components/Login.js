import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      localStorage.setItem('username', username.trim());
      localStorage.setItem('password', password.trim());
      navigate('/dashboard');
    } else {
      alert("Please enter both username and password!");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">🔐 Secure Task Login</h1>
      <p className="login-sub">Use your credentials to access your tasks</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">💫 Enter</button>
    </div>
  );
}

export default Login;
