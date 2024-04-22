import { Link } from "react-router-dom";
import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = () => {
        // Handle registration logic here
    };

    return (
        <div className=" flex flex-col items-center justify-center h-screen gap-3">
            <h1 className="text-4xl font-bold uppercase">Signup</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80">
                <div className="mb-4">
                
                    <Input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                </div>
                <div className="mb-4">
                    
                    <Input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    
                    <Input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 items-center justify-between">
                    <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <Link
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        to="/login"
                    >
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}