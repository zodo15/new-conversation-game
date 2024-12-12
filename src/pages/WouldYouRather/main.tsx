import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FloatingBackground } from './components/FloatingBackground';
import './index.css';

const WouldYouRather: React.FC = () => {
  const handleBack = () => {
    // Handle back navigation
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-800 to-purple-900">
      <FloatingBackground />
      <div className="relative z-10">
        <App onBack={handleBack} />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WouldYouRather />
  </React.StrictMode>
);
