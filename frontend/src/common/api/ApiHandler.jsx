import api from '../api/AuthApi';
import { toast } from 'react-toastify';

const notify = (message) => {
    toast(message);
}


async function register(userDetail) {
    try {
        const response = await api.post(`/auth/signup`, { name: userDetail.name, email: userDetail.email, password: userDetail.password });
        console.log(response.data);
        notify(response.data.message);
        if(response?.data?.result){
            return response.data.result;
        }
        return null;
    }catch(err){
        console.log(err.response.data.error);
        notify(err.response.data.message);
        return;
    }
}


export default register;