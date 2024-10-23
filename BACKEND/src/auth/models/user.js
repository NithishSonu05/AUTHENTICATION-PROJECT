const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
    validate: {
      validator: function (value) {
        // Alphanumeric regex validation
        return /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value); 
      },
      message: 'Password must be alphanumeric (contain both letters and numbers)',
    },
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it's new or modified
  if (!user.isModified('password')) {
    return next();
  }

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method (to be used later in authentication)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
