// middleware/studentAuth.js  ←  drop alongside your existing middleware/auth.js
const jwt     = require('jsonwebtoken');
const Student = require('../models/Student');

const protectStudent = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer '))
    token = req.headers.authorization.split(' ')[1];
  else if (req.cookies?.token)
    token = req.cookies.token;

  if (!token)
    return res.status(401).json({ success: false, message: 'Not authorized. Please log in.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);

    if (!student)
      return res.status(401).json({ success: false, message: 'Student account no longer exists.' });
    if (!student.isVerified)
      return res.status(403).json({ success: false, message: 'Email not verified.' });

    req.student = student;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token is invalid or expired.' });
  }
};

module.exports = { protectStudent };