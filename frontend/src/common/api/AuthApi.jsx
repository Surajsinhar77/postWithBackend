import axios from 'axios';

const accessToken = JSON.parse(localStorage.getItem('accessToken') || null);
console.log("This is the accessToken in the api instance of axios : ", accessToken);

const api = axios.create({
	baseURL : "http://localhost:8000",
	timeout : 100000,
	withCredentials: true,
	headers : {
		'Content-Type'  : 'application/json',
		'Authorization' : `Bearer ${accessToken}`,
	}
});

export default api;