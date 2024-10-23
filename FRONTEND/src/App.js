import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Ensure Home component exists in src/pages/Home.js
import Signup from './pages/Signup'; // Ensure Signup component exists in src/pages/Signup.js
import About from './pages/About'; // Ensure About component exists in src/pages/About.js
import NotFound from './pages/NotFound'; // Ensure NotFound component exists for 404
import Login from './pages/Login'; // Ensure Login component exists in src/pages/Login.js
import ProtectedRoute from './auth/protectedroute'; // Ensure ProtectedRoute exists
import Navbar from './components/Navbar'; // Ensure correct import with proper case sensitivity

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar /> {/* Ensure it's "Navbar" */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* Protected Route */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          {/* Fallback Route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
