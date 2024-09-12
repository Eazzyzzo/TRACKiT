import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Assuming API login call is successful and returns a token
    localStorage.setItem('token', 'user-token');
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
