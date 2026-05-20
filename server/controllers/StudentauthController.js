// // controllers/studentAuthController.js  ←  drop alongside authController.js
// const Student = require('../models/Student');
// const { sendEmail }       = require('../utils/email');   // same util you already have
// const { sendTokenResponse, generateToken } = require('../utils/jwt'); // same util
// const { asyncHandler }    = require('../middleware/error');
// const jwt = require('jsonwebtoken');

// // ─────────────────────────────────────────────────────────────────────────────
// // POST /api/student/auth/signup
// // ─────────────────────────────────────────────────────────────────────────────
// const signup = asyncHandler(async (req, res) => {
//   const { name, email, studentId, password } = req.body;

//   if (!name || !email || !studentId || !password)
//     return res.status(400).json({ success: false, message: 'All fields are required.' });

//   // Block if verified account already exists for this email
//   const byEmail = await Student.findOne({ email });
//   if (byEmail?.isVerified)
//     return res.status(400).json({ success: false, message: 'An account with this email already exists.' });

//   // Block if verified account already uses this studentId
//   const byStudentId = await Student.findOne({ studentId: studentId.toUpperCase(), isVerified: true });
//   if (byStudentId)
//     return res.status(400).json({ success: false, message: 'This Student ID is already registered.' });

//   // Remove stale unverified account and re-register
//   if (byEmail && !byEmail.isVerified) await Student.deleteOne({ email });

//   const student = await Student.create({ name, email, studentId, password });
//   const otp = await student.generateOTP('email_verification');
//   await sendEmail({ to: email, type: 'verification', name, otp });

//   res.status(201).json({
//     success: true,
//     message: `Verification OTP sent to ${email}. It expires in 10 minutes.`,
//     email,
//   });
// });

// // ─────────────────────────────────────────────────────────────────────────────
// // POST /api/student/auth/verify-email
// // ─────────────────────────────────────────────────────────────────────────────
// const verifyEmail = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp)
//     return res.status(400).json({ success: false, message: 'Email and OTP are required.' });

//   const student = await Student.findOne({ email });
//   if (!student)
//     return res.status(404).json({ success: false, message: 'No account found with this email.' });
//   if (student.isVerified)
//     return res.status(400).json({ success: false, message: 'Email is already verified.' });

//   const result = await student.verifyOTP(otp, 'email_verification');
//   if (!result.valid)
//     return res.status(400).json({ success: false, message: result.message });

//   student.isVerified = true;
//   await student.save({ validateBeforeSave: false });

//   sendTokenResponse(student, 200, res);
// });

// // ─────────────────────────────────────────────────────────────────────────────
// // POST /api/student/auth/resend-otp
// // body: { email, purpose: 'email_verification' | 'password_reset' }
// // ─────────────────────────────────────────────────────────────────────────────
// const resendOtp = asyncHandler(async (req, res) => {
//   const { email, purpose } = req.body;

//   if (!email || !purpose)
//     return res.status(400).json({ success: false, message: 'Email and purpose are required.' });

//   const student = await Student.findOne({ email });
//   if (!student)
//     return res.status(404).json({ success: false, message: 'No account found with this email.' });

//   const emailType = purpose === 'password_reset' ? 'passwordReset' : 'verification';
//   const otp = await student.generateOTP(purpose);
//   await sendEmail({ to: email, type: emailType, name: student.name, otp });

//   res.json({ success: true, message: `OTP resent to ${email}.` });
// });

// // ─────────────────────────────────────────────────────────────────────────────
// // POST /api/student/auth/login
// // body: { identifier (studentId OR email), password, remember }
// // ─────────────────────────────────────────────────────────────────────────────
// const login = asyncHandler(async (req, res) => {
//   const { identifier, password, remember } = req.body;

//   if (!identifier || !password)
//     return res.status(400).json({ success: false, message: 'Please provide your Student ID / Email and password.' });

//   // Auto-detect: email contains @ otherwise treat as studentId
//   const isEmail = /\S+@\S+\.\S+/.test(identifier);
//   const query   = isEmail
//     ? { email: identifier.toLowerCase() }
//     : { studentId: identifier.toUpperCase() };

//   const student = await Student.findOne(query).select('+password');
//   if (!student)
//     return res.status(401).json({ success: false, message: 'Invalid credentials.' });

//   const isMatch = await student.comparePassword(password);
//   if (!isMatch)
//     return res.status(401).json({ success: false, message: 'Invalid credentials.' });

//   if (!student.isVerified) {
//     // Auto-resend OTP so user can verify
//     const otp = await student.generateOTP('email_verification');
//     await sendEmail({ to: student.email, type: 'verification', name: student.name, otp });
//     return res.status(403).json({
//       success: false,
//       message: 'Email not verified. A new OTP has been sent to your email.',
//       requiresVerification: true,
//       email: student.email,
//     });
//   }

//   student.lastLogin = new Date();
//   await student.save({ validateBeforeSave: false });

//   sendTokenResponse(student, 200, res);
// });

// // ─────────────────────────────────────────────────────────────────────────────
// // POST /api/student/auth/forgot-password
// // ─────────────────────────────────────────────────────────────────────────────
// const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   if (!email)
//     return res.status(400).json({ success: false, message: 'Please provide your email.' });

//   const student = await Student.findOne({ email });

//   // Always 200 – prevents email enumeration
//   if (!student)
//     return res.json({ success: true, message: 'If this email is registered, an OTP will be sent.' });

//   const otp = await student.generateOTP('password_reset');
//   await sendEmail({ to: email, type: 'passwordReset', name: student.name, otp });

//   res.json({
//     success: true,
//     message: `Password reset OTP sent to ${email}. It expires in 10 minutes.`,
//     email,
//   });
// });

// // ─────────────────────────────────────────────────────────────────────────────
// // POST /api/student/auth/verify-reset-otp
// // ─────────────────────────────────────────────────────────────────────────────
// const verifyResetOtp = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp)
//     return res.status(400).json({ success: false, message: 'Email and OTP are required.' });

//   const student = await Student.findOne({ email });
//   if (!student)
//     return res.status(404).json({ success: false, message: 'No account found with this email.' });

//   const result = await student.verifyOTP(otp, 'password_reset');
//   if (!result.valid)
//     return res.status(400).json({ success: false, message: result.message });

//   const resetToken = generateToken(student._id);
//   res.json({ success: true, message: 'OTP verified.', resetToken });
// });

// // ─────────────────────────────────────────────────────────────────────────────
// // POST /api/student/auth/reset-password
// // ─────────────────────────────────────────────────────────────────────────────
// const resetPassword = asyncHandler(async (req, res) => {
//   const { resetToken, newPassword, confirmPassword } = req.body;

//   if (!resetToken || !newPassword || !confirmPassword)
//     return res.status(400).json({ success: false, message: 'All fields are required.' });
//   if (newPassword !== confirmPassword)
//     return res.status(400).json({ success: false, message: 'Passwords do not match.' });
//   if (newPassword.length < 6)
//     return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });

//   let decoded;
//   try {
//     decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
//   } catch {
//     return res.status(401).json({ success: false, message: 'Reset token is invalid or expired.' });
//   }

//   const student = await Student.findById(decoded.id);
//   if (!student)
//     return res.status(404).json({ success: false, message: 'Student not found.' });

//   student.password = newPassword; // hashed by pre-save hook
//   await student.save();

//   res.json({ success: true, message: 'Password reset successfully. You can now log in.' });
// });

// // ─────────────────────────────────────────────────────────────────────────────
// // POST /api/student/auth/logout  (protected)
// // ─────────────────────────────────────────────────────────────────────────────
// const logout = asyncHandler(async (req, res) => {
//   res
//     .clearCookie('token', { httpOnly: true, sameSite: 'strict' })
//     .json({ success: true, message: 'Logged out successfully.' });
// });

// // ─────────────────────────────────────────────────────────────────────────────
// // GET /api/student/auth/me  (protected)
// // ─────────────────────────────────────────────────────────────────────────────
// const getMe = asyncHandler(async (req, res) => {
//   res.json({ success: true, student: req.student });
// });

// module.exports = { signup, verifyEmail, resendOtp, login, forgotPassword, verifyResetOtp, resetPassword, logout, getMe };

// controllers/studentAuthController.js
const Student = require('../models/Student');
const { sendEmail }                    = require('../utils/email');
const { sendTokenResponse, generateToken } = require('../utils/jwt');
const { asyncHandler }                 = require('../middleware/error');
const jwt                              = require('jsonwebtoken');

// POST /api/student/auth/signup
const signup = asyncHandler(async (req, res) => {
  const { name, email, studentId, password } = req.body;

  if (!name || !email || !studentId || !password)
    return res.status(400).json({ success: false, message: 'All fields are required.' });

  const byEmail = await Student.findOne({ email });
  if (byEmail?.isVerified)
    return res.status(400).json({ success: false, message: 'An account with this email already exists.' });

  const byStudentId = await Student.findOne({ studentId: studentId.toUpperCase(), isVerified: true });
  if (byStudentId)
    return res.status(400).json({ success: false, message: 'This Student ID is already registered.' });

  if (byEmail && !byEmail.isVerified) await Student.deleteOne({ email });

  const student = await Student.create({ name, email, studentId, password });
  const otp     = await student.generateOTP('email_verification');
  // ✅ uses 'studentVerification' key
  await sendEmail({ to: email, type: 'studentVerification', name, otp });

  res.status(201).json({
    success: true,
    message: `Verification OTP sent to ${email}. It expires in 10 minutes.`,
    email,
  });
});

// POST /api/student/auth/verify-email
const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });

  const student = await Student.findOne({ email });
  if (!student)
    return res.status(404).json({ success: false, message: 'No account found with this email.' });
  if (student.isVerified)
    return res.status(400).json({ success: false, message: 'Email is already verified.' });

  const result = await student.verifyOTP(otp, 'email_verification');
  if (!result.valid)
    return res.status(400).json({ success: false, message: result.message });

  student.isVerified = true;
  await student.save({ validateBeforeSave: false });

  sendTokenResponse(student, 200, res);
});

// POST /api/student/auth/resend-otp
const resendOtp = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body;

  if (!email || !purpose)
    return res.status(400).json({ success: false, message: 'Email and purpose are required.' });

  const student = await Student.findOne({ email });
  if (!student)
    return res.status(404).json({ success: false, message: 'No account found with this email.' });

  // ✅ correct keys: 'studentVerification' and 'studentPasswordReset'
  const emailType = purpose === 'password_reset' ? 'studentPasswordReset' : 'studentVerification';
  const otp       = await student.generateOTP(purpose);
  await sendEmail({ to: email, type: emailType, name: student.name, otp });

  res.json({ success: true, message: `OTP resent to ${email}.` });
});

// POST /api/student/auth/login
const login = asyncHandler(async (req, res) => {
  const { identifier, password, remember } = req.body;

  if (!identifier || !password)
    return res.status(400).json({ success: false, message: 'Please provide your Student ID / Email and password.' });

  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const query   = isEmail
    ? { email: identifier.toLowerCase() }
    : { studentId: identifier.toUpperCase() };

  const student = await Student.findOne(query).select('+password');
  if (!student)
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });

  const isMatch = await student.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });

  if (!student.isVerified) {
    const otp = await student.generateOTP('email_verification');
    // ✅ correct key
    await sendEmail({ to: student.email, type: 'studentVerification', name: student.name, otp });
    return res.status(403).json({
      success: false,
      message: 'Email not verified. A new OTP has been sent to your email.',
      requiresVerification: true,
      email: student.email,
    });
  }

  student.lastLogin = new Date();
  await student.save({ validateBeforeSave: false });

  sendTokenResponse(student, 200, res);
});

// POST /api/student/auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ success: false, message: 'Please provide your email.' });

  const student = await Student.findOne({ email });

  if (!student)
    return res.json({ success: true, message: 'If this email is registered, an OTP will be sent.' });

  const otp = await student.generateOTP('password_reset');
  // ✅ correct key
  await sendEmail({ to: email, type: 'studentPasswordReset', name: student.name, otp });

  res.json({
    success: true,
    message: `Password reset OTP sent to ${email}. It expires in 10 minutes.`,
    email,
  });
});

// POST /api/student/auth/verify-reset-otp
const verifyResetOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });

  const student = await Student.findOne({ email });
  if (!student)
    return res.status(404).json({ success: false, message: 'No account found with this email.' });

  const result = await student.verifyOTP(otp, 'password_reset');
  if (!result.valid)
    return res.status(400).json({ success: false, message: result.message });

  const resetToken = generateToken(student._id);
  res.json({ success: true, message: 'OTP verified.', resetToken });
});

// POST /api/student/auth/reset-password
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword, confirmPassword } = req.body;

  if (!resetToken || !newPassword || !confirmPassword)
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  if (newPassword !== confirmPassword)
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  if (newPassword.length < 6)
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });

  let decoded;
  try {
    decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ success: false, message: 'Reset token is invalid or expired.' });
  }

  const student = await Student.findById(decoded.id);
  if (!student)
    return res.status(404).json({ success: false, message: 'Student not found.' });

  student.password = newPassword;
  await student.save();

  res.json({ success: true, message: 'Password reset successfully. You can now log in.' });
});

// POST /api/student/auth/logout
const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie('token', { httpOnly: true, sameSite: 'strict' })
    .json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/student/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, student: req.student });
});

module.exports = { signup, verifyEmail, resendOtp, login, forgotPassword, verifyResetOtp, resetPassword, logout, getMe };