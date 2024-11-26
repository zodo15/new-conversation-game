import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WouldYouRatherApp } from './App';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <WouldYouRatherApp />
  </StrictMode>
);
