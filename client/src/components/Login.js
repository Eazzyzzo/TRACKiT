import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // To redirect after login

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to authenticate the user
            const response = await axios.post('/api/auth/login', { email: user.email, password: user.password });
            const token = response.data.token;

            // Store the JWT token in localStorage
            localStorage.setItem('token', token);

            // Redirect to dashboard after successful login
            navigate('/dashboard');
        } catch (err) {
            // Display error message if login fails
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
