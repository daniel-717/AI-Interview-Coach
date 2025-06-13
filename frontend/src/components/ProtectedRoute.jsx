// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if a token exists in localStorage (indicating user is logged in)
  const isAuthenticated = localStorage.getItem('token');

  // If authenticated, render the child routes (Outlet), otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
