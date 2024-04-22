import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

export default function LoginPage() {
  const [userDeatil, setUserDetail] = useState('');

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({ ...userDeatil, [name]: value });
  }

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <Typography className="text-3xl font-bold uppercase">Login</Typography>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80">
        <div className="mb-4">
          
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
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
            value={password}
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
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/register"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}



