import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after login

  const handleLogin = async (credentials) => {
    try {
      // Make the login request to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        credentials,
        { withCredentials: true } // Ensure cookies are sent with the request
      );

      const { accessToken } = response.data;

      // Store the access token in localStorage
      localStorage.setItem('accessToken', accessToken);

      // Navigate to the dashboard or another protected route
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);

      // Update error state for UI feedback
      setError(
        error.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare credentials
    const credentials = { email, password };

    // Call the login handler
    await handleLogin(credentials);
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
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
