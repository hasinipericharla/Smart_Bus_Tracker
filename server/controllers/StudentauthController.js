
const Student = require('../models/Student');
const AdminStudent = require('../models/AdminStudent');
const { sendEmail } = require('../utils/email');
const { sendTokenResponse, generateToken } = require('../utils/jwt');
const { asyncHandler } = require('../middleware/error');
const jwt = require('jsonwebtoken');

// POST /api/student/auth/signup
const signup = asyncHandler(async (req, res) => {
  const { name, email, studentId, password } = req.body;

  if (!name || !email || !studentId || !password)
    return res.status(400).json({ success: false, message: 'All fields are required.' });

  // ── ENROLLMENT CHECK ──────────────────────────────────────
  const adminRecord = await AdminStudent.findOne({ email: email.toLowerCase() });
  if (!adminRecord) {
    return res.status(403).json({
      success: false,
      message: 'You are not enrolled. Please contact your admin to get registered first.',
    });
  }
  // ─────────────────────────────────────────────────────────

  const byEmail = await Student.findOne({ email });
  if (byEmail?.isVerified)
    return res.status(400).json({ success: false, message: 'An account with this email already exists.' });

  const byStudentId = await Student.findOne({ studentId: studentId.toUpperCase(), isVerified: true });
  if (byStudentId)
    return res.status(400).json({ success: false, message: 'This Student ID is already registered.' });

  if (byEmail && !byEmail.isVerified) await Student.deleteOne({ email });

  const student = await Student.create({ name, email, studentId, password });
  const otp = await student.generateOTP('email_verification');
  await sendEmail({ to: email, type: 'studentVerification', name, otp });

  // Link auth account to admin record
  adminRecord.authAccount = student._id;
  await adminRecord.save({ validateBeforeSave: false });

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

  const emailType = purpose === 'password_reset' ? 'studentPasswordReset' : 'studentVerification';
  const otp = await student.generateOTP(purpose);
  await sendEmail({ to: email, type: emailType, name: student.name, otp });

  res.json({ success: true, message: `OTP resent to ${email}.` });
});

// POST /api/student/auth/login
const login = asyncHandler(async (req, res) => {
  const { identifier, password, remember } = req.body;

  if (!identifier || !password)
    return res.status(400).json({ success: false, message: 'Please provide your Student ID / Email and password.' });

  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const query = isEmail
    ? { email: identifier.toLowerCase() }
    : { studentId: identifier.toUpperCase() };

  const student = await Student.findOne(query).select('+password');
  if (!student)
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });

  // ── ENROLLMENT CHECK ──────────────────────────────────────
  const adminRecord = await AdminStudent.findOne({ email: student.email });
  if (!adminRecord) {
    return res.status(403).json({
      success: false,
      message: 'You are not enrolled. Please contact your admin.',
    });
  }
  // ─────────────────────────────────────────────────────────

  const isMatch = await student.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });

  if (!student.isVerified) {
    const otp = await student.generateOTP('email_verification');
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

  // ── ENROLLMENT CHECK ──────────────────────────────────────
  const adminRecord = await AdminStudent.findOne({ email: email.toLowerCase() });
  if (!adminRecord) {
    return res.status(403).json({
      success: false,
      message: 'You are not enrolled. Please contact your admin.',
    });
  }
  // ─────────────────────────────────────────────────────────

  const student = await Student.findOne({ email });
  if (!student)
    return res.json({ success: true, message: 'If this email is registered, an OTP will be sent.' });

  const otp = await student.generateOTP('password_reset');
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

// ── Change Password (authenticated) ─────────────────────────────────────────
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword)
    return res.status(400).json({ success: false, message: 'Current and new password are required.' });
  if (newPassword.length < 6)
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
  if (currentPassword === newPassword)
    return res.status(400).json({ success: false, message: 'New password must be different from current password.' });

  const student = await Student.findById(req.student._id).select('+password');
  if (!student)
    return res.status(404).json({ success: false, message: 'Student not found.' });

  const isMatch = await student.comparePassword(currentPassword);
  if (!isMatch)
    return res.status(401).json({ success: false, message: 'Current password is incorrect.' });

  student.password = newPassword;
  await student.save();

  res.status(200).json({ success: true, message: 'Password changed successfully.' });
});

// ✅ Single module.exports with changePassword added
module.exports = {
  signup, verifyEmail, resendOtp, login,
  forgotPassword, verifyResetOtp, resetPassword,
  logout, getMe, changePassword,  // ← added here
};

// module.exports = {
//   signup, verifyEmail, resendOtp, login,
//   forgotPassword, verifyResetOtp, resetPassword,
//   logout, getMe,
// };

// // ── Change Password (authenticated) ─────────────────────────────────────────
// exports.changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     // Validation
//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: 'Current and new password are required.' });
//     }
//     if (newPassword.length < 6) {
//       return res.status(400).json({ message: 'New password must be at least 6 characters.' });
//     }
//     if (currentPassword === newPassword) {
//       return res.status(400).json({ message: 'New password must be different from current password.' });
//     }

//     // Fetch student with password field (select: false by default)
//     const student = await Student.findById(req.student._id).select('+password');
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found.' });
//     }

//     // Verify current password
//     const isMatch = await student.comparePassword(currentPassword);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Current password is incorrect.' });
//     }

//     // Set new password — pre('save') hook will hash it automatically
//     student.password = newPassword;
//     await student.save();

//     res.status(200).json({ message: 'Password changed successfully.' });
//   } catch (err) {
//     console.error('changePassword error:', err);
//     res.status(500).json({ message: 'Server error. Please try again.' });
//   }
// };