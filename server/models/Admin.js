const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    phone: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      code: { type: String, select: false },
      expiresAt: { type: Date, select: false },
      purpose: {
        type: String,
        enum: ['email_verification', 'password_reset'],
        select: false,
      },
    },
    lastLogin: {
      type: Date,
    },

    // ADD after: lastLogin: { type: Date },
    twoFA: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// // Hash password before saving
// adminSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });
// ✅ CORRECT - use regular function
adminSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare entered password with hashed
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate a 6-digit OTP and store hashed version
adminSchema.methods.generateOTP = async function (purpose) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = {
    code: await bcrypt.hash(otp, 8),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    purpose,
  };
  await this.save({ validateBeforeSave: false });
  return otp; // Return plain OTP to send via email
};

// Verify OTP
adminSchema.methods.verifyOTP = async function (enteredOtp, purpose) {
  // Re-fetch with OTP fields (they're hidden by default)
  const admin = await this.constructor
    .findById(this._id)
    .select('+otp.code +otp.expiresAt +otp.purpose');

  if (!admin.otp?.code) return { valid: false, message: 'No OTP found' };
  if (admin.otp.purpose !== purpose) return { valid: false, message: 'Invalid OTP purpose' };
  if (admin.otp.expiresAt < new Date()) return { valid: false, message: 'OTP has expired' };

  const isMatch = await bcrypt.compare(enteredOtp, admin.otp.code);
  if (!isMatch) return { valid: false, message: 'Invalid OTP' };

  // Clear OTP after successful verification
  admin.otp = undefined;
  await admin.save({ validateBeforeSave: false });

  return { valid: true };
};

module.exports = mongoose.model('Admin', adminSchema);
