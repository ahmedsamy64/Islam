import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { LanguageProvider } from "./context"

const root = ReactDOM.createRoot(document.getElementById('root'));
/* For local production use Hashrouter, and for live production use browserrouter */
root.render(
  <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>
);

