const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  const mongoURI = process.env.NODE_ENV === 'production' 
    ? process.env.MONGODB_URI_PROD 
    : process.env.MONGODB_URI_DEV;

  // Check if the mongoURI is defined
  if (!mongoURI) {
    console.error('MongoDB URI is not defined. Please check your environment variables.');
    process.exit(1); // Exit process with failure
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    console.log(`Connected to MongoDB in ${process.env.NODE_ENV} mode at URI: ${mongoURI}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB at ${mongoURI}:`, error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

