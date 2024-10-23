import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    // Basic validation before making API request
    if (!email || !password) {
      toast.error('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      // Log the input data to ensure it is being sent correctly
      console.log('Attempting to login with:', { email, password });

      // Make the API call to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim(), // Trim to avoid whitespace issues
        password: password.trim(),
      });

      // Show success toast and store token
      toast.success('Login successful!');
      console.log('Token:', response.data.token);
      localStorage.setItem('token', response.data.token);
      
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);

      // Display error message based on the response
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to login. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())} // Trim early when updating state
          required
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())} // Trim early when updating state
          required
          style={{ marginBottom: '20px', padding: '8px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
