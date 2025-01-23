import React from 'react';
import { BrowserRouter as Router, Routes, Route, /*Link*/ } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import ActivityDetails from './components/Activity/ActivityDetails';
import ActivitySummary from './components/Activity/ActivitySummary';

const App = () => {
  return (
    <Router>
      <div>
	  {/*<nav>
          <Link to="/">Home</Link>
        </nav>*/}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
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
      </div>
    </Router>
  );
};

export default App;
