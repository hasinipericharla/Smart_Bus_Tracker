const Notification = require('../models/Notification');
const { asyncHandler } = require('../middleware/error');

// POST /api/admin/notifications  — admin creates a notification
const createNotification = asyncHandler(async (req, res) => {
  const { title, message, type, targetRole, targetId } = req.body;
  if (!title || !message)
    return res.status(400).json({ success: false, message: 'Title and message are required.' });

  const notification = await Notification.create({
    title, message, type, targetRole, targetId,
    createdBy: req.admin._id,
  });
  res.status(201).json({ success: true, notification });
});

// GET /api/admin/notifications
const getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, notifications });
});

// DELETE /api/admin/notifications/:id
const deleteNotification = asyncHandler(async (req, res) => {
  const notif = await Notification.findByIdAndDelete(req.params.id);
  if (!notif)
    return res.status(404).json({ success: false, message: 'Notification not found.' });
  res.json({ success: true, message: 'Deleted.' });
});

// GET /api/student/notifications  — student fetches their notifications
const getStudentNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    targetRole: { $in: ['all', 'students'] },
  }).sort({ createdAt: -1 }).limit(30);

  // Mark unread status per student
  const result = notifications.map(n => ({
    ...n.toObject(),
    read: n.readBy.includes(req.student._id.toString()),
  }));
  res.json({ success: true, notifications: result });
});

// PATCH /api/student/notifications/:id/read
const markStudentNotifRead = asyncHandler(async (req, res) => {
  const notif = await Notification.findById(req.params.id);
  if (!notif)
    return res.status(404).json({ success: false, message: 'Not found.' });
  if (!notif.readBy.includes(req.student._id)) {
    notif.readBy.push(req.student._id);
    await notif.save();
  }
  res.json({ success: true });
});

// GET /api/driver/notifications
const getDriverNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    targetRole: { $in: ['all', 'drivers'] },
  }).sort({ createdAt: -1 }).limit(30);

  const result = notifications.map(n => ({
    ...n.toObject(),
    read: n.readBy.includes(req.driver._id.toString()),
  }));
  res.json({ success: true, notifications: result });
});

// PATCH /api/driver/notifications/:id/read
const markDriverNotifRead = asyncHandler(async (req, res) => {
  const notif = await Notification.findById(req.params.id);
  if (!notif)
    return res.status(404).json({ success: false, message: 'Not found.' });
  if (!notif.readBy.includes(req.driver._id)) {
    notif.readBy.push(req.driver._id);
    await notif.save();
  }
  res.json({ success: true });
});

module.exports = {
  createNotification, getAllNotifications, deleteNotification,
  getStudentNotifications, markStudentNotifRead,
  getDriverNotifications, markDriverNotifRead,
};