// utils/logActivity.js
const ActivityLog = require('../models/ActivityLog');

const logActivity = async (adminId, action, message, color = 'var(--blue2)') => {
  try {
    await ActivityLog.create({ admin: adminId, action, message, color });
  } catch (err) {
    console.error('Failed to log activity:', err.message);
  }
};

module.exports = logActivity;