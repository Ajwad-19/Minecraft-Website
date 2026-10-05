import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { restoreSoundPreference } from './utils/sound';
import './index.css';

restoreSoundPreference();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
