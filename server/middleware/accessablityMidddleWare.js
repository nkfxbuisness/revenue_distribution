// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const Admin = require("../models/adminModel")

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Decode the token and retrieve the roles from the payload
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, roles } = decoded; // Assuming the token payload contains id and roles

    // Determine the correct model to query based on the roles
    let user;

    if (roles.includes('user')) {
      user = await User.findById(id);
    } else {
      user = await Admin.findById(id);
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    req.user = user;
    console.log("Authenticated as", roles);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles || [req.user.role]; // Handle both User and Admin roles

    const hasRole = allowedRoles.some(role => userRoles.includes(role));

    if (!hasRole) {
      console.log("unauthorized")
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    console.log(`authorized ${userRoles[0]}`)
    next();
  };
};

module.exports = {authenticate,authorizeRoles}