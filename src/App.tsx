import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const Dashboard = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #7c3aed, #2563eb)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '56rem',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '3.75rem',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Conversation Games
        </h1>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #7c3aed, #2563eb)'
    }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;