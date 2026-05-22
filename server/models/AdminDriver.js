const mongoose = require('mongoose');

const adminDriverSchema = new mongoose.Schema({
  authAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },

  name:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  licenseNo:  { type: String, trim: true },
  experience: { type: Number, default: 0 }, // years
  phone:      { type: String },

  assignedBus:   { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', default: null },
  assignedRoute: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', default: null },

  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave'],
    default: 'active',
  },
}, { timestamps: true });

module.exports = mongoose.model('AdminDriver', adminDriverSchema);