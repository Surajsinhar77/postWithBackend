import axios from 'axios';
// import { useAuth } from '../AuthContext';

const api = axios.create({
	baseURL : "http://localhost:8000",
	timeout : 10000,
	withCredentials: true,
	headers : {
		'Content-Type'  : 'application/json',
		'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
	}
});

export default api;