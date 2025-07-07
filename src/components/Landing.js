import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="landing-content">
        <h1 className="landing-title">✨ VibraTasks ✨</h1>
        <p className="landing-subtitle">Turn boring todos into vibes!</p>
        <button className="landing-btn" onClick={() => navigate('/login')}>
          🚀 Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;
