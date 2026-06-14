const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Protect routes — requires valid JWT
const protect = async (req, res, next) => {
  let token;

  // Check Authorization header first, then cookie
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin no longer exists.' });
    }

    if (!admin.isVerified) {
      return res.status(403).json({ success: false, message: 'Email not verified. Please verify your account.' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    // return res.status(401).json({ success: false, message: 'Token is invalid or expired.' });
    console.error("AUTH ERROR:", err);
  return res.status(401).json({
    success: false,
    message: 'Token is invalid or expired.'
  });
  }
};

module.exports = { protect };
