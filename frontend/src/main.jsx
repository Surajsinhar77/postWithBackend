import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme="dark">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
