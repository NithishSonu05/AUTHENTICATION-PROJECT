const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Your secret key

// Middleware to check JWT token validity
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>" format

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next(); // Call next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
