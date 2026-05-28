// const express = require('express');
// const router = express.Router();
// const {
//   signup,
//   verifyEmail,
//   resendOtp,
//   login,
//   forgotPassword,
//   verifyResetOtp,
//   resetPassword,
//   logout,
//   getMe,
// } = require('../controllers/authController');
// const { protect } = require('../middleware/auth');

// // Public routes
// router.post('/signup', signup);
// router.post('/verify-email', verifyEmail);
// router.post('/resend-otp', resendOtp);
// router.post('/login', login);
// router.post('/forgot-password', forgotPassword);
// router.post('/verify-reset-otp', verifyResetOtp);
// router.post('/reset-password', resetPassword);

// // Protected routes
// router.post('/logout', protect, logout);
// router.get('/me', protect, getMe);


// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  signup,
  verifyEmail,
  resendOtp,
  login,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  logout,
  getMe,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const Admin = require('../models/Admin');

// Public routes
router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOtp);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

// ====== NEW PROFILE ENDPOINTS ======
// GET ADMIN PROFILE
router.get('/profile', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({
      success: true,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        department: admin.department,
        createdAt: admin.createdAt,
      },
    });
  } catch (err) {
    console.error('Error fetching admin profile:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

// UPDATE ADMIN PROFILE
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, phone, department } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    // Update admin
    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name, email, phone, department },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        department: admin.department,
      },
    });
  } catch (err) {
    console.error('Error updating admin profile:', err);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});
// ====== END OF NEW ENDPOINTS ======

module.exports = router;