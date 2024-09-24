import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // Access the environment variable
});

// Automatically add Authorization header if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');  // Get the token from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;  // Add token to Authorization header
  }
  return req;
});

export default API;
