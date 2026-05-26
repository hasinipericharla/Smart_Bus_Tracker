const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  bus:    { type: mongoose.Schema.Types.ObjectId, ref: 'Bus',         required: true },
  route:  { type: mongoose.Schema.Types.ObjectId, ref: 'Route',       required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminDriver', required: true },

  tripStart:      { type: Date },
  tripEnd:        { type: Date },
  stopsCompleted: { type: Number, default: 0 },
  totalStops:     { type: Number, default: 0 },
  delayMinutes:   { type: Number, default: 0 },
  delayReason:    { type: String },

  status: {
    type: String,
    enum: ['in_progress', 'completed', 'delayed', 'incident', 'minor_delay'],
    default: 'in_progress',
  },

  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);