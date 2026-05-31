const mongoose = require('mongoose');

const adminStudentSchema = new mongoose.Schema({
  // Link to auth account (optional - student may not have signed up yet)
  authAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: null },

  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  rollNo:       { type: String, required: true, unique: true, trim: true, uppercase: true },
  className:    { type: String, trim: true }, // e.g. "10-A"
  parentContact:{ type: String },

  assignedRoute: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', default: null },
  pickupStop:    { type: String },

  // models/AdminStudent.js — add these fields to your existing schema

tripType:          { type: String, enum: ['morning', 'evening', 'both'], default: 'both' },
morningPickupTime: { type: String, default: '' },
eveningPickupTime: { type: String, default: '' },

  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active',
  },
}, { timestamps: true });

module.exports = mongoose.model('AdminStudent', adminStudentSchema);