const express = require('express');
const { signup, login } = require('../controllers/userController'); // Import the signup controller function

const router = express.Router();

// Define the signup route
router.post('/auth/signup', signup);

router.post('/auth/login', login);

module.exports = router;
