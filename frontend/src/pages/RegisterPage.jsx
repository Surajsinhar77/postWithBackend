import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import { Input, Button, Typography, Avatar } from "@material-tailwind/react";
import { register } from '../common/api/ApiHandler';
import { useAuth } from "../common/AuthContext";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
    const [userDetail, SetUserDetail] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const onInputChange = (e) => {
        const { name, value } = e.target;
        SetUserDetail({ ...userDetail, [name]: value });
    }

    const handleRegister = async() => {
        // Handle registration logic here
        const response = await register(userDetail)
        console.log("this is on the resgiste use page ", response);
        if(response){
            login(response);
            navigate('/');
        }
    };


    return (
        <div className=" flex flex-col items-center justify-center h-screen gap-3">
            <h1 className="text-3xl font-bold ">SignUp</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80 border flex flex-col items-center gap-5">
                <div className="avaterDiv border-2 rounded-full border-blue-500 p-1">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                </div>
                <div >

                    <Input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        label="Name"
                        name="name"
                        onChange={(e) => onInputChange(e)}
                    />

                </div>
                <div>

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
                <div className="flex flex-col gap-2 items-center justify-between">
                    <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <Link
                        className="inline-block align-baseline font-bold text-xm text-center text-blue-500 hover:text-blue-800"
                        to="/login"
                    >
                        <Typography>Already have an account? Login</Typography>
                    </Link>
                </div>
            </div>
        </div>
    );
}