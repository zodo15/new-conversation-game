import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      }>
        <Toaster position="top-center" />
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);