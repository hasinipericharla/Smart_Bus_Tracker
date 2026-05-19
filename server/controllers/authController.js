const Admin = require('../models/Admin');
const { sendEmail } = require('../utils/email');
const { sendTokenResponse } = require('../utils/jwt');
const { asyncHandler } = require('../middleware/error');

// ─────────────────────────────────────────────
// @route  POST /api/admin/auth/signup
// @desc   Register new admin → send verification OTP
// @access Public
// ─────────────────────────────────────────────
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Check if already registered and verified
  const existing = await Admin.findOne({ email });
  if (existing?.isVerified) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
  }

  // If unverified account exists, delete and re-register
  if (existing && !existing.isVerified) {
    await Admin.deleteOne({ email });
  }

  const admin = await Admin.create({ name, email, password });

  // Generate OTP and send email
  const otp = await admin.generateOTP('email_verification');
  await sendEmail({ to: email, type: 'verification', name, otp });

  res.status(201).json({
    success: true,
    message: `Verification OTP sent to ${email}. It expires in 10 minutes.`,
    email, // Return email so frontend can use it in the OTP step
  });
});

// ─────────────────────────────────────────────
// @route  POST /api/admin/auth/verify-email
// @desc   Verify OTP and activate admin account
// @access Public
// ─────────────────────────────────────────────
const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ success: false, message: 'No account found with this email.' });
  }

  if (admin.isVerified) {
    return res.status(400).json({ success: false, message: 'Email is already verified.' });
  }

  const result = await admin.verifyOTP(otp, 'email_verification');
  if (!result.valid) {
    return res.status(400).json({ success: false, message: result.message });
  }

  admin.isVerified = true;
  await admin.save({ validateBeforeSave: false });

  sendTokenResponse(admin, 200, res);
});

// ─────────────────────────────────────────────
// @route  POST /api/admin/auth/resend-otp
// @desc   Resend OTP (for verification or password reset)
// @access Public
// ─────────────────────────────────────────────
const resendOtp = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body; // purpose: 'email_verification' | 'password_reset'

  if (!email || !purpose) {
    return res.status(400).json({ success: false, message: 'Email and purpose are required.' });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ success: false, message: 'No account found with this email.' });
  }

  const emailType = purpose === 'password_reset' ? 'passwordReset' : 'verification';
  const otp = await admin.generateOTP(purpose);
  await sendEmail({ to: email, type: emailType, name: admin.name, otp });

  res.json({ success: true, message: `OTP resent to ${email}.` });
});

// ─────────────────────────────────────────────
// @route  POST /api/admin/auth/login
// @desc   Login admin with email + password
// @access Public
// ─────────────────────────────────────────────
const login = asyncHandler(async (req, res) => {
  const { email, password, remember } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password.' });
  }

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  if (!admin.isVerified) {
    // Resend OTP so they can verify
    const otp = await admin.generateOTP('email_verification');
    await sendEmail({ to: email, type: 'verification', name: admin.name, otp });

    return res.status(403).json({
      success: false,
      message: 'Email not verified. A new OTP has been sent to your email.',
      requiresVerification: true,
      email,
    });
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  sendTokenResponse(admin, 200, res);
});

// ─────────────────────────────────────────────
// @route  POST /api/admin/auth/forgot-password
// @desc   Send password reset OTP
// @access Public
// ─────────────────────────────────────────────
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide your email.' });
  }

  const admin = await Admin.findOne({ email });

  // Always return 200 to prevent email enumeration
  if (!admin) {
    return res.json({ success: true, message: `If this email is registered, an OTP will be sent.` });
  }

  const otp = await admin.generateOTP('password_reset');
  await sendEmail({ to: email, type: 'passwordReset', name: admin.name, otp });

  res.json({
    success: true,
    message: `Password reset OTP sent to ${email}. It expires in 10 minutes.`,
    email,
  });
});

// ─────────────────────────────────────────────
// @route  POST /api/admin/auth/verify-reset-otp
// @desc   Verify OTP for password reset (step 2)
// @access Public
// ─────────────────────────────────────────────
const verifyResetOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ success: false, message: 'No account found with this email.' });
  }

  const result = await admin.verifyOTP(otp, 'password_reset');
  if (!result.valid) {
    return res.status(400).json({ success: false, message: result.message });
  }

  // Issue a short-lived "reset token" so frontend can proceed to step 3 safely
  const { generateToken } = require('../utils/jwt');
  const resetToken = generateToken(admin._id); // reuse JWT with short context

  res.json({ success: true, message: 'OTP verified.', resetToken });
});

// ─────────────────────────────────────────────
// @route  POST /api/admin/auth/reset-password
// @desc   Set new password after OTP verified
// @access Public (requires resetToken from step 2)
// ─────────────────────────────────────────────
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword, confirmPassword } = req.body;

  if (!resetToken || !newPassword || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }

  // Decode reset token to get admin ID
  const jwt = require('jsonwebtoken');
  let decoded;
  try {
    decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ success: false, message: 'Reset token is invalid or expired.' });
  }

  const admin = await Admin.findById(decoded.id);
  if (!admin) {
    return res.status(404).json({ success: false, message: 'Admin not found.' });
  }

  admin.password = newPassword; // Will be hashed by pre-save hook
  await admin.save();

  res.json({ success: true, message: 'Password reset successfully. You can now log in.' });
});

// ─────────────────────────────────────────────
// @route  POST /api/admin/auth/logout
// @desc   Clear cookie
// @access Private
// ─────────────────────────────────────────────
const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie('token', { httpOnly: true, sameSite: 'strict' })
    .json({ success: true, message: 'Logged out successfully.' });
});

// ─────────────────────────────────────────────
// @route  GET /api/admin/auth/me
// @desc   Get current logged-in admin
// @access Private
// ─────────────────────────────────────────────
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = {
  signup,
  verifyEmail,
  resendOtp,
  login,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  logout,
  getMe,
};
