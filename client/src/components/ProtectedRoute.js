import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    return (
        <Route 
            {...rest}
            element={token ? <Component {...rest} /> : <Navigate to="/login" />}
        />
    );
};

export default ProtectedRoute;
