import React from 'react';
import ReactDOM from 'react-dom/client';
import { WouldYouRather } from './App';
import './index.css';

const handleBack = () => {
  window.history.back();
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WouldYouRather onBack={handleBack} />
  </React.StrictMode>
);
