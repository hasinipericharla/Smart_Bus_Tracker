// routes/studentAuth.js  ←  drop alongside your existing routes/auth.js
const express = require('express');
const router  = express.Router();
const {
  signup, verifyEmail, resendOtp, login,
  forgotPassword, verifyResetOtp, resetPassword,
  logout, getMe,
} = require('../controllers/studentAuthController');
const { protectStudent } = require('../middleware/studentAuth');

// Public
router.post('/signup',           signup);
router.post('/verify-email',     verifyEmail);
router.post('/resend-otp',       resendOtp);
router.post('/login',            login);
router.post('/forgot-password',  forgotPassword);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password',   resetPassword);

// Protected
router.post('/logout', protectStudent, logout);
router.get('/me',      protectStudent, getMe);

module.exports = router;