import axios from 'axios';

const accessToken = JSON.parse(localStorage.getItem('user') || null);

console.log("this is from api ",accessToken?.token);

const api = axios.create({
	baseURL : "http://localhost:8000",
	timeout : 100000,
	withCredentials: true,
	headers : {
		'Content-Type'  : 'application/json',
		'Authorization' : `Bearer ${accessToken?.token}`,
	}
});

export default api;