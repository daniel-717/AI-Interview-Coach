// src/pages/Login.js

import React, { useState, useEffect } from 'react'; // Added useEffect for debugging
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  // Added useEffect for debugging useNavigate context
  useEffect(() => {
    console.log("Login component mounted. useNavigate hook is available.");
    // This log helps confirm if the component is even reaching this point within a Router context.
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      console.log("Attempting login with email:", email);
      // Make a POST request to the backend login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Store the JWT token in localStorage upon successful login
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', response.data.email); // Store email if useful
      localStorage.setItem('userName', response.data.name); // Store name if useful
      console.log("Login successful, token stored. Navigating to dashboard.");
      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      // Handle login errors (e.g., incorrect credentials)
      console.error('Login error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
      console.log("Login attempt finished. isLoading set to false.");
    }
  };

  // Debugging log for what is rendered inside the button
  const buttonContent = isLoading ? (
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
  ) : (
    'Login'
  );
  console.log("Button content to render:", buttonContent);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-indigo-300 mb-6">Login</h2>
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center"
            disabled={isLoading}
          >
            {buttonContent} {/* Render the pre-determined content */}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-400 hover:text-indigo-300 font-medium focus:outline-none"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
