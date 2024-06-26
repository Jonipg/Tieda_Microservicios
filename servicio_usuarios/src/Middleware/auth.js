const jwt = require('jsonwebtoken');
require('dotenv').config();



// Middleware to handle token authentication at entry points

// The token must be sent from the authorization header

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateJWT;