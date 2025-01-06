import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To navigate after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare credentials
    const credentials = { email, password };

    // Call the reusable handleLogin function
    await handleLogin(credentials, navigate, setError);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

// Reusable login handler (import this function)
const handleLogin = async (credentials, navigate, setError) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
    const { token } = response.data;

    // Store the token in localStorage using a consistent key
    localStorage.setItem('authToken', token);

    console.log('Token stored successfully:', token);

    // Navigate to the dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);

    // Update error state if provided
    if (setError) {
      setError('Login failed. Please check your credentials.');
    }
  }
};
