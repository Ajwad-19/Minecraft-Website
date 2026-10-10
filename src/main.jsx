import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { restoreSoundPreference } from './utils/sound';
import '@fontsource-variable/geist';
import '@fontsource/pixelify-sans/400.css';
import '@fontsource/pixelify-sans/600.css';
import '@fontsource/pixelify-sans/700.css';
import '@fontsource/press-start-2p';
import './index.css';

restoreSoundPreference();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
