import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const onBack = () => {
  window.history.back();
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App onBack={onBack} />
  </StrictMode>
);
