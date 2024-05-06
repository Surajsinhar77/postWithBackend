import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import api from '../common/api/AuthApi';
import { toast } from 'react-toastify';
import { useAuth } from "../common/AuthContext";
import axios from "axios";
import params from "../common/params";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userDeatil, setUserDetail] = useState('');
  const { login } = useAuth();


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({ ...userDeatil, [name]: value });
  }

  const notify = (message) => {
    toast(message);
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${params?.baseURL}/auth/login`, { email: userDeatil.email, password: userDeatil.password }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
        }
      });
      if (response.status === 200) {
        notify(response.data.message);
        login(response?.data?.result);
        navigate('/');
        return;
      }
      navigate('/login');
    } catch (err) {
      console.log("This is the main Error Here ", err);
      notify(err.message);
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <Typography className="text-3xl font-normal">Login</Typography>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80 border flex flex-col items-center gap-5">
        <div className="avaterDiv border-2 rounded-full border-blue-500 p-1">
          <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
        </div>
        <div className="">

          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            label="Email"
            name="email"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-6">

          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            label="Password"
            name="password"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="flex flex-col items-center justify-between gap-2">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Link
            className="inline-block align-baseline font-bold text-xs text-center text-gray-500 hover:text-blue-800"
            to="/register"
          >
            <Typography >Don't have an account? Register</Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}



