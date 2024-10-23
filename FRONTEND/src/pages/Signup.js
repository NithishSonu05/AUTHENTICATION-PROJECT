import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form refresh on submit

    // Basic validation for empty fields
    if (!email || !password) {
      toast.error('Please fill in both fields'); // Show error toast if fields are empty
      return;
    }

    try {
      // Make a POST request to the backend API for user signup
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });

      // Show success toast on successful signup
      toast.success(response.data.message);

      // Clear the form fields
      setEmail('');
      setPassword('');
    } catch (error) {
      // If there's an error, show error toast with the appropriate message
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Show specific error from the backend
      } else {
        toast.error('Something went wrong. Please try again.'); // Show generic error
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Signup</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSignup}>
            {/* Email Input Field */}
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input Field */}
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Signup
            </button>
          </form>
        </div>
      </div>

      {/* Toastify component that will show toasts on the page */}
      <ToastContainer 
        position="top-right" // Position of the toast
        autoClose={3000} // Auto close the toast after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default Signup;
