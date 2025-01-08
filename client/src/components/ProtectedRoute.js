import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track auth status

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken) {
        // If no access token, user is not authenticated
        setIsAuthenticated(false);
        return;
      }

      // Check if the token is expired
      try {
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1])); // Decode JWT payload
        const currentTime = Date.now() / 1000;

        if (tokenPayload.exp < currentTime) {
          // If access token is expired, attempt to refresh it
          if (!refreshToken) {
            setIsAuthenticated(false); // No refresh token available
            return;
          }

          try {
            const response = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
            localStorage.setItem('accessToken', response.data.accessToken);
            setIsAuthenticated(true); // Successfully refreshed
          } catch (error) {
            console.error('Failed to refresh token:', error);
            setIsAuthenticated(false); // Refresh failed
          }
        } else {
          // Token is valid
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false); // Invalid token
      }
    };

    checkToken();
  }, []);

  // Show a loading state while token verification is in progress
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Allow access to the protected route if authenticated
  return children;
};

export default ProtectedRoute;
