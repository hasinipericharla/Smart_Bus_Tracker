const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber:  { type: String, required: true, unique: true, trim: true, uppercase: true },
  model:      { type: String, trim: true },
  capacity:   { type: Number, required: true, default: 50 },
  status:     { type: String, enum: ['active', 'maintenance', 'idle'], default: 'active' },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminDriver', default: null },
  assignedRoute:  { type: mongoose.Schema.Types.ObjectId, ref: 'Route', default: null },
  lastActive: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);