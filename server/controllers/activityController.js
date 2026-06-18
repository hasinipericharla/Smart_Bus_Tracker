// controllers/activityController.js
const ActivityLog = require('../models/ActivityLog');

const getRecentActivity = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ admin: req.admin._id })
      .sort({ createdAt: -1 })
      .limit(10);

    const activities = logs.map(log => ({
      dot: log.color,
      text: log.message,
      time: log.createdAt,
    }));

    res.json({ success: true, activities });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch activity' });
  }
};

module.exports = { getRecentActivity };