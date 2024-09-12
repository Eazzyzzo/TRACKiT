import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Logic to send user registration data to backend
    // Assuming registration is successful, redirect to login
    navigate('/login');
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
