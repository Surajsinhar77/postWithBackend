import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Button, Typography, Avatar } from "@material-tailwind/react";
import { register } from '../common/api/ApiHandler';
import { useAuth } from "../common/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfilePicUploader from '../components/ProfilePicUploader';
import { toast } from "react-toastify";

export default function RegisterPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [userDetail, SetUserDetail] = useState('');
    const { login } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onInputChange = (e) => {
        const { name, value } = e.target;
        SetUserDetail({ ...userDetail, [name]: value });
    }

    const handleRegister = async () => {
        // Handle registration logic here
        setLoading(true);
        try {
            if (!userDetail.name || !userDetail.email || !userDetail.password || !selectedFile) {
                if (!userDetail.name) {
                    toast.error("Please enter the name");
                } else if (!userDetail.email) {
                    toast.error("Please enter the email");
                } else if (!userDetail.password) {
                    toast.error("Please enter the password");
                } else if (!selectedFile) {
                    toast.error("Please select the profile picture");
                } else {
                    toast.error("Please fill all the fields");
                }
                setLoading(false);
                return;
            }

            const newform = new FormData();
            newform.append('name', userDetail.name);
            newform.append('email', userDetail.email);
            newform.append('password', userDetail.password);
            newform.append('file', selectedFile);

            const response = await register(newform)
            if (response) {
                login(response);
                navigate('/');
            }
            setLoading(false);
            return;
        }catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    function OnClose() {
        setOpen(false);
    }

    function OnOpen() {
        setOpen(true);
    }

    return (
        <div className=" flex flex-col items-center justify-center h-screen gap-3">
            <h1 className="text-3xl font-bold ">SignUp</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80 border flex flex-col items-center gap-5">
                <div className="avaterDiv border-2 rounded-full border-blue-500 p-1">
                    {/* <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" /> */}
                    <ProfilePicUploader
                        isOpen={open}
                        onClose={OnClose}
                        onOpen={OnOpen}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />
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
                        loading={loading}
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