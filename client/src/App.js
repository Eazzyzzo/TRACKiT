import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home'; // Import the Home component

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Protected route */}
                <Route path="/profile" element={<ProtectedRoute component={Profile} />} />

                {/* Home route */}
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
