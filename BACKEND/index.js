require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbconfig');
const userRoutes = require('../BACKEND/src/auth/routes/userRoutes'); // Import the user routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the user routes
app.use('/api', userRoutes); // All user-related routes will be prefixed with /api

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
