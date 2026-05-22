const jwt    = require('jsonwebtoken');
const Driver = require('../models/Driver');

const protectDriver = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer '))
    token = req.headers.authorization.split(' ')[1];
  else if (req.cookies?.token)
    token = req.cookies.token;

  if (!token)
    return res.status(401).json({ success: false, message: 'Not authorized. Please log in.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const driver  = await Driver.findById(decoded.id);
    if (!driver)
      return res.status(401).json({ success: false, message: 'Driver account no longer exists.' });
    if (!driver.isVerified)
      return res.status(403).json({ success: false, message: 'Email not verified.' });
    req.driver = driver;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token is invalid or expired.' });
  }
};

module.exports = { protectDriver };