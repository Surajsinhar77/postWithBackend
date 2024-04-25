import api from '../api/AuthApi';
import { toast } from 'react-toastify';
import { useAuth }  from '../AuthContext';
import {useNavigate} from 'react-router-dom'

const notify = (message) => {
    toast(message);
}



async function register(userDetail) {
    try {
        const response = await api.post(`/auth/signup`, { name: userDetail.name, email: userDetail.email, password: userDetail.password });
        notify(response.data.message);
        if(response?.data?.result){
            return response.data.result;
        }
        return null;
    }catch(err){
        console.log(err?.response?.data?.error);
        notify(err.response.data.message);
        return;
    }
}


async function logout(){
    try{
        const response = await api.get('/auth/logout');
        notify(response?.data?.result);
        return true;
    }catch(err){
        console.log("The error while logging out is this : ", err?.response?.data?.message);
        notify(err?.response?.data?.message);
        return null; 
    }
}

export { register, logout };