import api from '../api/AuthApi';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import params from '../params.json';

const notify = (message, {type}) => {
    if(type) {
        toast.success(message);
    } else {
        toast.error(message);
    }
}

async function register(newform) {
    try {
        const response = await axios.post(`${params?.baseURL}/auth/signup`, newform,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        notify(response.data.message, {type: true});
        if (response?.data?.result) {
            return response.data.result;
        }
        return null;
    } catch (err) {
        console.log(err?.response?.data?.error);
        notify(err?.response?.data?.message , {type: false});
        return;
    }
}


async function logout() {
    try {
        const response = await axios.get(`${params?.baseURL}/auth/logout`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
            }
        });
        if(response?.status === 200) {
            notify(response?.data?.message,  {type : true} );
            return true;
        }   
        throw new Error(response?.data?.message);    
    } catch (err) {
        console.log("The error while logging out is this : ", err?.response?.data?.message);
        notify(err?.response?.data?.message,  {type: false} );
        return null;
    }
}

export { register, logout };