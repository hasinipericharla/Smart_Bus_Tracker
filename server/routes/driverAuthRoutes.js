const express = require('express');
const router = express.Router();
// const {
//   signup, verifyEmail, resendOtp, login,
//   forgotPassword, verifyResetOtp, resetPassword, logout,
// } = require('../controllers/driverAuthController');
// const { protect } = require('../middleware/auth');

// router.post('/signup',           signup);
// router.post('/verify-email',     verifyEmail);
// router.post('/resend-otp',       resendOtp);
// router.post('/login',            login);
// router.post('/forgot-password',  forgotPassword);
// router.post('/verify-reset-otp', verifyResetOtp);
// router.post('/reset-password',   resetPassword);
// router.post('/logout',           protect, logout);

// module.exports = router;

const {
  signup, verifyEmail, resendOtp, login, verifyLoginOtp,
  forgotPassword, verifyResetOtp, resetPassword, logout,
} = require('../controllers/driverAuthController');
const { protect } = require('../middleware/auth');

router.post('/signup',            signup);
router.post('/verify-email',      verifyEmail);
router.post('/resend-otp',        resendOtp);
router.post('/login',             login);
router.post('/verify-login-otp',  verifyLoginOtp);
router.post('/forgot-password',   forgotPassword);
router.post('/verify-reset-otp',  verifyResetOtp);
router.post('/reset-password',    resetPassword);
router.post('/logout',            protect, logout);

module.exports = router;