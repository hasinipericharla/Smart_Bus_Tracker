// models/ActivityLog.js
const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  admin:   { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  action:  { type: String, required: true },        // e.g. 'bus_created', 'driver_updated'
  message: { type: String, required: true },        // human-readable text shown in UI
  color:   { type: String, default: 'var(--blue2)' }, // dot color hint for frontend
}, { timestamps: true }); // createdAt acts as the "time"

module.exports = mongoose.model('ActivityLog', activityLogSchema);