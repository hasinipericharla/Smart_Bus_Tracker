// // models/Student.js  ←  drop this alongside your existing models/Admin.js
// const mongoose = require('mongoose');
// const bcrypt   = require('bcryptjs');

// const studentSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//       minlength: [2, 'Name must be at least 2 characters'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
//     },
//     studentId: {
//       type: String,
//       required: [true, 'Student ID is required'],
//       unique: true,
//       trim: true,
//       uppercase: true,
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: [6, 'Password must be at least 6 characters'],
//       select: false,
//     },
//     tripType:          { type: String, enum: ['morning', 'evening', 'both'], default: 'both' },
// morningPickupTime: { type: String, default: '' },   // e.g. "07:30"
// eveningPickupTime: { type: String, default: '' },   // e.g. "17:00"
//     isVerified: { type: Boolean, default: false },
//     otp: {
//       code:      { type: String, select: false },
//       expiresAt: { type: Date,   select: false },
//       purpose: {
//         type: String,
//         enum: ['email_verification', 'password_reset'],
//         select: false,
//       },
//     },
//     lastLogin: { type: Date },
//   },
//   { timestamps: true }
// );

// // ── Hash password before saving ──────────────────────────────────────────────
// studentSchema.pre('save', async function () {
//   if (!this.isModified('password')) return;
//   this.password = await bcrypt.hash(this.password, 10);
// });

// // ── Compare password ─────────────────────────────────────────────────────────
// studentSchema.methods.comparePassword = async function (entered) {
//   return bcrypt.compare(entered, this.password);
// };

// // ── Generate 6-digit OTP (stored hashed) ────────────────────────────────────
// studentSchema.methods.generateOTP = async function (purpose) {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   this.otp = {
//     code:      await bcrypt.hash(otp, 8),
//     expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
//     purpose,
//   };
//   await this.save({ validateBeforeSave: false });
//   return otp;
// };

// // ── Verify OTP ───────────────────────────────────────────────────────────────
// studentSchema.methods.verifyOTP = async function (enteredOtp, purpose) {
//   const doc = await this.constructor
//     .findById(this._id)
//     .select('+otp.code +otp.expiresAt +otp.purpose');

//   if (!doc.otp?.code)               return { valid: false, message: 'No OTP found. Please request a new one.' };
//   if (doc.otp.purpose !== purpose)  return { valid: false, message: 'Invalid OTP purpose.' };
//   if (doc.otp.expiresAt < new Date()) return { valid: false, message: 'OTP has expired. Please request a new one.' };

//   const isMatch = await bcrypt.compare(enteredOtp, doc.otp.code);
//   if (!isMatch) return { valid: false, message: 'Incorrect OTP. Please try again.' };

//   doc.otp = undefined;
//   await doc.save({ validateBeforeSave: false });
//   return { valid: true };
// };

// module.exports = mongoose.model('Student', studentSchema);
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    isVerified: { type: Boolean, default: false },
    otp: {
      code:      { type: String, select: false },
      expiresAt: { type: Date,   select: false },
      purpose: {
        type: String,
        enum: ['email_verification', 'password_reset'],
        select: false,
      },
    },
    lastLogin: { type: Date },

    // ── Admin-managed fields ──────────────────────────
    rollNo:        { type: String, unique: true, sparse: true, trim: true },
    className:     { type: String, trim: true },
    assignedRoute: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
    pickupStop:    { type: String, trim: true },
    parentContact: { type: String, trim: true },
    status:        { type: String, enum: ['active', 'pending', 'inactive'], default: 'active' },

    // ── Trip schedule ─────────────────────────────────
    tripType:          { type: String, enum: ['morning', 'evening', 'both'], default: 'both' },
    morningPickupTime: { type: String, default: '' },
    eveningPickupTime: { type: String, default: '' },
  },
  { timestamps: true }
);

// ── Hash password before saving ──────────────────────────────
studentSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

studentSchema.methods.comparePassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

studentSchema.methods.generateOTP = async function (purpose) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = {
    code:      await bcrypt.hash(otp, 8),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    purpose,
  };
  await this.save({ validateBeforeSave: false });
  return otp;
};

studentSchema.methods.verifyOTP = async function (enteredOtp, purpose) {
  const doc = await this.constructor
    .findById(this._id)
    .select('+otp.code +otp.expiresAt +otp.purpose');

  if (!doc.otp?.code)                return { valid: false, message: 'No OTP found. Please request a new one.' };
  if (doc.otp.purpose !== purpose)   return { valid: false, message: 'Invalid OTP purpose.' };
  if (doc.otp.expiresAt < new Date()) return { valid: false, message: 'OTP has expired. Please request a new one.' };

  const isMatch = await bcrypt.compare(enteredOtp, doc.otp.code);
  if (!isMatch) return { valid: false, message: 'Incorrect OTP. Please try again.' };

  doc.otp = undefined;
  await doc.save({ validateBeforeSave: false });
  return { valid: true };
};

module.exports = mongoose.model('Student', studentSchema);