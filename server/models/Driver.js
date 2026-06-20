const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const driverSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  driverId: { type: String, required: true, unique: true, trim: true },
  phone:    { type: String, required: true },
  password: { type: String, required: true, minlength: 6, select: false },
  isVerified: { type: Boolean, default: false },
  otp: {
    code:      { type: String, select: false },
    expiresAt: { type: Date, select: false },
    //purpose:   { type: String, enum: ['email_verification', 'password_reset'], select: false },
    purpose:   { type: String, enum: ['email_verification', 'password_reset', '2fa_toggle', 'login_2fa'], select: false },
  },
  lastLogin: { type: Date },
  twoFA: { type: Boolean, default: false },
  trustedDevices: [
    {
      deviceId: { type: String },
      expiresAt: { type: Date },
    },
  ],
}, { timestamps: true });

// Hash password before saving
driverSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

driverSchema.methods.comparePassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

driverSchema.methods.generateOTP = async function (purpose) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = {
    code: await bcrypt.hash(otp, 8),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    purpose,
  };
  await this.save({ validateBeforeSave: false });
  return otp;
};

driverSchema.methods.verifyOTP = async function (enteredOtp, purpose) {
  const driver = await this.constructor
    .findById(this._id)
    .select('+otp.code +otp.expiresAt +otp.purpose');
  if (!driver.otp?.code)             return { valid: false, message: 'No OTP found' };
  if (driver.otp.purpose !== purpose) return { valid: false, message: 'Invalid OTP purpose' };
  if (driver.otp.expiresAt < new Date()) return { valid: false, message: 'OTP has expired' };
  const isMatch = await bcrypt.compare(enteredOtp, driver.otp.code);
  if (!isMatch) return { valid: false, message: 'Invalid OTP' };
  driver.otp = undefined;
  await driver.save({ validateBeforeSave: false });
  return { valid: true };
};

module.exports = mongoose.model('Driver', driverSchema);