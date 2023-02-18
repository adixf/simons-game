import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline/>
    <div className="App">
      <header className="App-header">
        <App />
      </header>
    </div>
  </React.StrictMode>
);
