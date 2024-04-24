import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './common/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme="dark">
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
)
