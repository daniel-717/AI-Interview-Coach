// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'; // Updated to .jsx
import Signup from './pages/Signup.jsx'; // Updated to .jsx
import Dashboard from './pages/Dashboard.jsx'; // Updated to .jsx
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Updated to .jsx

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} /> {/* Default route */}

          {/* Protected Routes */}
          {/* Outlet in ProtectedRoute renders the child component if authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other protected routes here if needed */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
