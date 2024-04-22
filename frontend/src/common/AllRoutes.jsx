import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Home from '../pages/Home';

export default function AllRoutes() {
  return (
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
  );
}
