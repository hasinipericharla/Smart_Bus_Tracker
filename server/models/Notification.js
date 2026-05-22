const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  message: { type: String, required: true },
  type:    { type: String, enum: ['info', 'warn', 'err', 'ok'], default: 'info' },

  // Who to send to
  targetRole: {
    type: String,
    enum: ['all', 'students', 'drivers', 'specific_student', 'specific_driver'],
    default: 'all',
  },
  targetId: { type: mongoose.Schema.Types.ObjectId, default: null }, // for specific targets

  // Who has read it (array of user IDs)
  readBy: [{ type: mongoose.Schema.Types.ObjectId }],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);