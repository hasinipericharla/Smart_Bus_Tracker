// const Driver = require('../models/Driver');
// const { sendEmail } = require('../utils/email');
// const { sendTokenResponse } = require('../utils/jwt');
// const { asyncHandler } = require('../middleware/error');

// // POST /api/driver/auth/signup
// const signup = asyncHandler(async (req, res) => {
//   const { name, email, driverId, phone, password } = req.body;
//   if (!name || !email || !driverId || !phone || !password)
//     return res.status(400).json({ success: false, message: 'All fields are required.' });

//   const existingEmail = await Driver.findOne({ email });
//   if (existingEmail?.isVerified)
//     return res.status(400).json({ success: false, message: 'Email already registered.' });
//   if (existingEmail && !existingEmail.isVerified)
//     await Driver.deleteOne({ email });

//   const existingId = await Driver.findOne({ driverId });
//   if (existingId)
//     return res.status(400).json({ success: false, message: 'Driver ID already taken.' });

//   const driver = await Driver.create({ name, email, driverId, phone, password });
//   const otp = await driver.generateOTP('email_verification');
//   await sendEmail({ to: email, type: 'verification', name, otp });

//   res.status(201).json({
//     success: true,
//     message: `Verification OTP sent to ${email}. Expires in 10 minutes.`,
//     email,
//   });
// });

// // POST /api/driver/auth/verify-email
// const verifyEmail = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;
//   const driver = await Driver.findOne({ email });
//   if (!driver)
//     return res.status(404).json({ success: false, message: 'No account found.' });
//   if (driver.isVerified)
//     return res.status(400).json({ success: false, message: 'Email already verified.' });

//   const result = await driver.verifyOTP(otp, 'email_verification');
//   if (!result.valid)
//     return res.status(400).json({ success: false, message: result.message });

//   driver.isVerified = true;
//   await driver.save({ validateBeforeSave: false });
//   sendTokenResponse(driver, 200, res);
// });

// // POST /api/driver/auth/resend-otp
// const resendOtp = asyncHandler(async (req, res) => {
//   const { email, purpose } = req.body;
//   const driver = await Driver.findOne({ email });
//   if (!driver)
//     return res.status(404).json({ success: false, message: 'No account found.' });

//   const emailType = purpose === 'password_reset' ? 'passwordReset' : 'verification';
//   const otp = await driver.generateOTP(purpose);
//   await sendEmail({ to: email, type: emailType, name: driver.name, otp });
//   res.json({ success: true, message: `OTP resent to ${email}.` });
// });

// // POST /api/driver/auth/login
// const login = asyncHandler(async (req, res) => {
//   const { identifier, password, remember } = req.body;
//   if (!identifier || !password)
//     return res.status(400).json({ success: false, message: 'Please provide credentials.' });

//   // Allow login by email OR driverId
//   const driver = await Driver.findOne({
//     $or: [{ email: identifier.toLowerCase() }, { driverId: identifier }]
//   }).select('+password');

//   if (!driver)
//     return res.status(401).json({ success: false, message: 'Invalid credentials.' });

//   const isMatch = await driver.comparePassword(password);
//   if (!isMatch)
//     return res.status(401).json({ success: false, message: 'Invalid credentials.' });

//   if (!driver.isVerified) {
//     const otp = await driver.generateOTP('email_verification');
//     await sendEmail({ to: driver.email, type: 'verification', name: driver.name, otp });
//     return res.status(403).json({
//       success: false,
//       message: 'Email not verified. A new OTP has been sent.',
//       requiresVerification: true,
//       email: driver.email,
//     });
//   }

//   driver.lastLogin = new Date();
//   await driver.save({ validateBeforeSave: false });
//   sendTokenResponse(driver, 200, res);
// });

// // POST /api/driver/auth/forgot-password
// const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const driver = await Driver.findOne({ email });
//   if (!driver)
//     return res.json({ success: true, message: 'If this email is registered, an OTP will be sent.' });

//   const otp = await driver.generateOTP('password_reset');
//   await sendEmail({ to: email, type: 'passwordReset', name: driver.name, otp });
//   res.json({ success: true, message: `OTP sent to ${email}.`, email });
// });

// // POST /api/driver/auth/verify-reset-otp
// const verifyResetOtp = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;
//   const driver = await Driver.findOne({ email });
//   if (!driver)
//     return res.status(404).json({ success: false, message: 'No account found.' });

//   const result = await driver.verifyOTP(otp, 'password_reset');
//   if (!result.valid)
//     return res.status(400).json({ success: false, message: result.message });

//   const { generateToken } = require('../utils/jwt');
//   const resetToken = generateToken(driver._id);
//   res.json({ success: true, message: 'OTP verified.', resetToken });
// });

// // POST /api/driver/auth/reset-password
// const resetPassword = asyncHandler(async (req, res) => {
//   const { resetToken, newPassword, confirmPassword } = req.body;
//   if (newPassword !== confirmPassword)
//     return res.status(400).json({ success: false, message: 'Passwords do not match.' });

//   const jwt = require('jsonwebtoken');
//   let decoded;
//   try { decoded = jwt.verify(resetToken, process.env.JWT_SECRET); }
//   catch { return res.status(401).json({ success: false, message: 'Reset token invalid or expired.' }); }

//   const driver = await Driver.findById(decoded.id);
//   if (!driver)
//     return res.status(404).json({ success: false, message: 'Driver not found.' });

//   driver.password = newPassword;
//   await driver.save();
//   res.json({ success: true, message: 'Password reset successfully.' });
// });

// // POST /api/driver/auth/logout
// const logout = asyncHandler(async (req, res) => {
//   res.clearCookie('token', { httpOnly: true, sameSite: 'strict' })
//      .json({ success: true, message: 'Logged out.' });
// });

// module.exports = { signup, verifyEmail, resendOtp, login, forgotPassword, verifyResetOtp, resetPassword, logout };







const Driver = require('../models/Driver');
const AdminDriver = require('../models/AdminDriver');
const { sendEmail } = require('../utils/email');
const { sendTokenResponse, generateToken } = require('../utils/jwt');
const { asyncHandler } = require('../middleware/error');
const jwt = require('jsonwebtoken');

// POST /api/driver/auth/signup
const signup = asyncHandler(async (req, res) => {
  const { name, email, driverId, phone, password } = req.body;

  if (!name || !email || !driverId || !phone || !password)
    return res.status(400).json({ success: false, message: 'All fields are required.' });

  // ── ENROLLMENT CHECK ──────────────────────────────────────
  const adminRecord = await AdminDriver.findOne({ email: email.toLowerCase() });
  if (!adminRecord) {
    return res.status(403).json({
      success: false,
      message: 'You are not registered. Please contact your admin to get added first.',
    });
  }
  // ─────────────────────────────────────────────────────────

  const existingEmail = await Driver.findOne({ email });
  if (existingEmail?.isVerified)
    return res.status(400).json({ success: false, message: 'Email already registered.' });
  if (existingEmail && !existingEmail.isVerified)
    await Driver.deleteOne({ email });

  const existingId = await Driver.findOne({ driverId });
  if (existingId)
    return res.status(400).json({ success: false, message: 'Driver ID already taken.' });

  const driver = await Driver.create({ name, email, driverId, phone, password });
  const otp = await driver.generateOTP('email_verification');
  await sendEmail({ to: email, type: 'verification', name, otp });

  // Link auth account to admin record
  adminRecord.authAccount = driver._id;
  await adminRecord.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    message: `Verification OTP sent to ${email}. Expires in 10 minutes.`,
    email,
  });
});

// POST /api/driver/auth/verify-email
const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const driver = await Driver.findOne({ email });
  if (!driver)
    return res.status(404).json({ success: false, message: 'No account found.' });
  if (driver.isVerified)
    return res.status(400).json({ success: false, message: 'Email already verified.' });

  const result = await driver.verifyOTP(otp, 'email_verification');
  if (!result.valid)
    return res.status(400).json({ success: false, message: result.message });

  driver.isVerified = true;
  await driver.save({ validateBeforeSave: false });
  sendTokenResponse(driver, 200, res);
});

// POST /api/driver/auth/resend-otp
const resendOtp = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body;

  const driver = await Driver.findOne({ email });
  if (!driver)
    return res.status(404).json({ success: false, message: 'No account found.' });

  const emailType = purpose === 'password_reset' ? 'passwordReset' : 'verification';
  const otp = await driver.generateOTP(purpose);
  await sendEmail({ to: email, type: emailType, name: driver.name, otp });
  res.json({ success: true, message: `OTP resent to ${email}.` });
});

// POST /api/driver/auth/login
const login = asyncHandler(async (req, res) => {
  const { identifier, password, remember } = req.body;

  if (!identifier || !password)
    return res.status(400).json({ success: false, message: 'Please provide credentials.' });

  const driver = await Driver.findOne({
    $or: [{ email: identifier.toLowerCase() }, { driverId: identifier }],
  }).select('+password');

  if (!driver)
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });

  // ── ENROLLMENT CHECK ──────────────────────────────────────
  const adminRecord = await AdminDriver.findOne({ email: driver.email });
  if (!adminRecord) {
    return res.status(403).json({
      success: false,
      message: 'You are not registered. Please contact your admin.',
    });
  }
  // ─────────────────────────────────────────────────────────

  const isMatch = await driver.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });

  if (!driver.isVerified) {
    const otp = await driver.generateOTP('email_verification');
    await sendEmail({ to: driver.email, type: 'verification', name: driver.name, otp });
    return res.status(403).json({
      success: false,
      message: 'Email not verified. A new OTP has been sent.',
      requiresVerification: true,
      email: driver.email,
    });
  }

  driver.lastLogin = new Date();
  await driver.save({ validateBeforeSave: false });
  sendTokenResponse(driver, 200, res);
});

// POST /api/driver/auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // ── ENROLLMENT CHECK ──────────────────────────────────────
  const adminRecord = await AdminDriver.findOne({ email: email?.toLowerCase() });
  if (!adminRecord) {
    return res.status(403).json({
      success: false,
      message: 'You are not registered. Please contact your admin.',
    });
  }
  // ─────────────────────────────────────────────────────────

  const driver = await Driver.findOne({ email });
  if (!driver)
    return res.json({ success: true, message: 'If this email is registered, an OTP will be sent.' });

  const otp = await driver.generateOTP('password_reset');
  await sendEmail({ to: email, type: 'passwordReset', name: driver.name, otp });
  res.json({ success: true, message: `OTP sent to ${email}.`, email });
});

// POST /api/driver/auth/verify-reset-otp
const verifyResetOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const driver = await Driver.findOne({ email });
  if (!driver)
    return res.status(404).json({ success: false, message: 'No account found.' });

  const result = await driver.verifyOTP(otp, 'password_reset');
  if (!result.valid)
    return res.status(400).json({ success: false, message: result.message });

  const resetToken = generateToken(driver._id);
  res.json({ success: true, message: 'OTP verified.', resetToken });
});

// POST /api/driver/auth/reset-password
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword)
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });

  let decoded;
  try {
    decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ success: false, message: 'Reset token invalid or expired.' });
  }

  const driver = await Driver.findById(decoded.id);
  if (!driver)
    return res.status(404).json({ success: false, message: 'Driver not found.' });

  driver.password = newPassword;
  await driver.save();
  res.json({ success: true, message: 'Password reset successfully.' });
});

// POST /api/driver/auth/logout
const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie('token', { httpOnly: true, sameSite: 'strict' })
    .json({ success: true, message: 'Logged out.' });
});

module.exports = {
  signup, verifyEmail, resendOtp, login,
  forgotPassword, verifyResetOtp, resetPassword, logout,
};