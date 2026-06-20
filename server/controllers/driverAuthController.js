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
// POST /api/driver/auth/login
const login = asyncHandler(async (req, res) => {
  const { identifier, password, remember, deviceId } = req.body;

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

  // ── 2FA check ──────────────────────────────────────────────
  if (driver.twoFA) {
    const now = new Date();
    const isTrusted =
      deviceId &&
      driver.trustedDevices?.some(
        (d) => d.deviceId === deviceId && d.expiresAt > now
      );

    if (!isTrusted) {
      const otp = await driver.generateOTP('login_2fa');
      await sendEmail({ to: driver.email, type: 'driverLoginOtp', name: driver.name, otp });

      return res.status(200).json({
        success: true,
        requiresOtp: true,
        message: `OTP sent to ${driver.email}. Enter it to complete sign-in.`,
        email: driver.email,
      });
    }
  }
  // ─────────────────────────────────────────────────────────

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

// ── Change Password (authenticated) ─────────────────────────────────────────
const changeDriverPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword)
    return res.status(400).json({ success: false, message: 'Current and new password are required.' });
  if (newPassword.length < 6)
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
  if (currentPassword === newPassword)
    return res.status(400).json({ success: false, message: 'New password must be different from current password.' });

  const driver = await Driver.findById(req.driver._id).select('+password');
  if (!driver)
    return res.status(404).json({ success: false, message: 'Driver not found.' });

  const isMatch = await driver.comparePassword(currentPassword);
  if (!isMatch)
    return res.status(401).json({ success: false, message: 'Current password is incorrect.' });

  driver.password = newPassword;
  await driver.save();

  res.status(200).json({ success: true, message: 'Password changed successfully.' });
});

// GET /api/driver/trip/stop-counts/:routeId
// const Student = require('../models/Student');

// const getStopPassengerCounts = asyncHandler(async (req, res) => {
//   const { routeId } = req.params;

//   const students = await Student.find({
//     assignedRoute: routeId,
//     status: 'active',
//   }).select('pickupStop');

const AdminStudent = require('../models/AdminStudent');

const getStopPassengerCounts = asyncHandler(async (req, res) => {
  const { routeId } = req.params;

  const students = await AdminStudent.find({
    assignedRoute: routeId,
    status: 'active',
  }).select('pickupStop');

  // Build map: { "temple": 5, "busstand": 8 }
  const counts = {};
  students.forEach(s => {
    if (!s.pickupStop) return;
    const key = s.pickupStop.trim().toLowerCase();
    counts[key] = (counts[key] || 0) + 1;
  });

  res.json({ success: true, counts });
});

// ─────────────────────────────────────────────
// POST /api/driver/auth/verify-login-otp
// @desc   Verify OTP after password step when 2FA is on
//         → issues session token + trusts this device for 90 days
// ─────────────────────────────────────────────
const verifyLoginOtp = asyncHandler(async (req, res) => {
  const { email, otp, deviceId } = req.body;

  if (!email || !otp)
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });

  const driver = await Driver.findOne({ email });
  if (!driver)
    return res.status(404).json({ success: false, message: 'No account found with this email.' });

  const result = await driver.verifyOTP(otp, 'login_2fa');
  if (!result.valid)
    return res.status(400).json({ success: false, message: result.message });

  const crypto = require('crypto');
  const newDeviceId = deviceId || crypto.randomBytes(24).toString('hex');
  const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  const freshDriver = await Driver.findById(driver._id);
  freshDriver.trustedDevices = freshDriver.trustedDevices || [];
  freshDriver.trustedDevices.push({ deviceId: newDeviceId, expiresAt });
  freshDriver.lastLogin = new Date();
  await freshDriver.save({ validateBeforeSave: false });

  const { generateToken } = require('../utils/jwt');
  const token = generateToken(freshDriver._id);

  res
    .status(200)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      token,
      deviceId: newDeviceId,
      driver: {
        id: freshDriver._id,
        name: freshDriver.name,
        email: freshDriver.email,
        isVerified: freshDriver.isVerified,
      },
    });
});

// ─────────────────────────────────────────────
// PUT /api/driver/toggle-2fa  (step 1 — send OTP)
// ─────────────────────────────────────────────
const requestToggle2FA = asyncHandler(async (req, res) => {
  const driver = await Driver.findById(req.driver._id);
  if (!driver) return res.status(404).json({ success: false, message: 'Driver not found.' });

  const otp = await driver.generateOTP('2fa_toggle');
  const action = driver.twoFA ? 'disable' : 'enable';

  await sendEmail({
    to: driver.email,
    type: 'driver2FAOtp',
    name: driver.name,
    otp,
    action,
  });

  res.json({
    success: true,
    requiresOtp: true,
    message: `OTP sent to ${driver.email}. Enter it to ${action} 2FA.`,
  });
});

// ─────────────────────────────────────────────
// POST /api/driver/verify-2fa  (step 2 — confirm OTP, flip flag)
// ─────────────────────────────────────────────
const verifyToggle2FA = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  if (!otp) return res.status(400).json({ success: false, message: 'OTP is required.' });

  const driver = await Driver.findById(req.driver._id);
  if (!driver) return res.status(404).json({ success: false, message: 'Driver not found.' });

  const result = await driver.verifyOTP(otp, '2fa_toggle');
  if (!result.valid) {
    return res.status(400).json({ success: false, message: result.message });
  }

  driver.twoFA = !driver.twoFA;
  await driver.save({ validateBeforeSave: false });

  res.json({
    success: true,
    twoFA: driver.twoFA,
    message: `2FA ${driver.twoFA ? 'enabled' : 'disabled'} successfully.`,
  });
});

// module.exports = {
//   signup, verifyEmail, resendOtp, login,
//   forgotPassword, verifyResetOtp, resetPassword, logout, changeDriverPassword, getStopPassengerCounts,  
// };
module.exports = {
  signup, verifyEmail, resendOtp, login, verifyLoginOtp,
  forgotPassword, verifyResetOtp, resetPassword, logout, changeDriverPassword, getStopPassengerCounts,
  requestToggle2FA, verifyToggle2FA,
};