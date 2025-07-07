import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username.trim());
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">🌈 Welcome Back!</h1>
      <p className="login-sub">Enter your username to start vibing 🌟</p>
      <input
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">💫 Enter</button>
    </div>
  );
}

export default Login;
