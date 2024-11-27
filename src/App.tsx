import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { WouldYouRatherApp } from './pages/WouldYouRather/App';
import TruthOrDareApp from './pages/TruthOrDare/App';
import { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<WouldYouRatherApp />} />
        <Route path="/truth-or-dare" element={<TruthOrDareApp />} />
      </Routes>
    </div>
  );
};

export default App;
