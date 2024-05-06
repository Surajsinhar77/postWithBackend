import api from '../api/AuthApi';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const params = require('../api/params.json');

const notify = (message) => {
    toast(message);
}



async function register({ newform }) {
    try {

        const response = await axios.post(`${params?.baseURL}/auth/signup`, { name: newform.name, email: newform.email, password: newform.password, file: newform.file },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
                }
            }

        );
        notify(response.data.message);
        if (response?.data?.result) {
            return response.data.result;
        }
        return null;
    } catch (err) {
        console.log(err?.response?.data?.error);
        notify(err.response.data.message);
        return;
    }
}


async function logout() {
    try {
        const response = await axios.get('/auth/logout', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
            }
        });
        notify(response?.data?.result);
        return true;
    } catch (err) {
        console.log("The error while logging out is this : ", err?.response?.data?.message);
        notify(err?.response?.data?.message);
        return null;
    }
}

export { register, logout };