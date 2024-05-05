import axios from 'axios';

const api = axios.create({
	baseURL : "http://localhost:8000",
	timeout : 100000,
	withCredentials: true,
	headers : {
		'Content-Type'  : 'application/json',
		'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`,
	}
});

export default api;