import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile'; // Import Profile component
import ActivityDetails from './components/Activity/ActivityDetails'; // Import ActivityDetails
import ActivitySummary from './components/Activity/ActivitySummary'; // Import ActivitySummary

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Activity Details and Summary (Protected) */}
        <Route
          path="/activities/:id"
          element={
            <ProtectedRoute>
              <ActivityDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activities/:id/summary"
          element={
            <ProtectedRoute>
              <ActivitySummary />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
