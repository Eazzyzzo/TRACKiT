import axios from 'axios';

const API_URL = "http://localhost:3000/api";

// Register a new user
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
};

// Login a user
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

// Get user profile (example protected route)
export const getUserProfile = async (token) => {
    const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
