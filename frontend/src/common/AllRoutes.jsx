import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Home from '../pages/Home';
import { useAuth } from './AuthContext';

export default function AllRoutes() {
  const { user } = useAuth();
  return (
      <Routes>
        {user ? 
          <>
            <Route exact path='/' element={<Home />} />
          </>
        :
        <>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </>
        } 
        <Route path='*' element={<> Page not Found  </>} />

      </Routes>
  );
}
