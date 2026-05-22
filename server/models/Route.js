const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  morningPickup:{ type: String }, // e.g. "07:22 AM"
  eveningDrop:  { type: String },
  order:        { type: Number },
}, { _id: false });

const routeSchema = new mongoose.Schema({
  routeId:     { type: String, required: true, unique: true, uppercase: true, trim: true },
  name:        { type: String, required: true, trim: true },
  description: { type: String },
  stops:       [stopSchema],
  assignedBuses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }],
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);