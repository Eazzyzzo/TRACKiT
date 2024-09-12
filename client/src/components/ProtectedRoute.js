import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token is available

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  return children; // Allow access if token exists
};

export default ProtectedRoute;
