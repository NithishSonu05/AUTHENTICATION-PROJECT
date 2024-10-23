const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model

const JWT_SECRET = process.env.JWT_SECRET; // Replace with your secret key

// POST /api/signup
const signup = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword, // Save hashed password
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the token in the response
    res.status(201).json({
      message: 'User signed up successfully!',
      token,
    });
  } catch (error) {
    // Handle any errors, e.g., unique email constraint
    if (error.code === 11000) {
      // Duplicate email
      return res.status(400).json({ message: 'Email is already in use.' });
    }
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// POST /api/login

const login = async (req, res) => {
  console.log('Received login request for email:', req.body.email); // Avoid logging sensitive info

  const { email, password } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the token and success message
    res.status(200).json({
      message: 'Login successful!',
      token,
    });
  } catch (error) {
    console.error('Login error:', error); // Log error details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
router.get('/validate-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
});



module.exports = { signup, login };
