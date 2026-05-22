const AdminDriver = require('../models/AdminDriver');
const Driver = require('../models/Driver');
const { asyncHandler } = require('../middleware/error');

// GET /api/admin/drivers
const getAllDrivers = asyncHandler(async (req, res) => {
  const drivers = await AdminDriver.find()
    .populate('assignedBus', 'busNumber model capacity status')
    .populate('assignedRoute', 'routeId name')
    .sort({ createdAt: -1 });
  res.json({ success: true, count: drivers.length, drivers });
});

// POST /api/admin/drivers
const createDriver = asyncHandler(async (req, res) => {
  const { name, email, licenseNo, experience, phone, assignedBus, assignedRoute, status } = req.body;
  if (!name || !email)
    return res.status(400).json({ success: false, message: 'Name and email are required.' });

  const authAccount = await Driver.findOne({ email: email.toLowerCase() });

  const driver = await AdminDriver.create({
    name, email, licenseNo, experience, phone,
    assignedBus, assignedRoute, status,
    authAccount: authAccount?._id || null,
  });
  await driver.populate('assignedBus', 'busNumber');
  await driver.populate('assignedRoute', 'routeId name');
  res.status(201).json({ success: true, driver });
});

// PUT /api/admin/drivers/:id
const updateDriver = asyncHandler(async (req, res) => {
  const driver = await AdminDriver.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .populate('assignedBus', 'busNumber')
    .populate('assignedRoute', 'routeId name');
  if (!driver)
    return res.status(404).json({ success: false, message: 'Driver not found.' });
  res.json({ success: true, driver });
});

// DELETE /api/admin/drivers/:id
const deleteDriver = asyncHandler(async (req, res) => {
  const driver = await AdminDriver.findByIdAndDelete(req.params.id);
  if (!driver)
    return res.status(404).json({ success: false, message: 'Driver not found.' });
  res.json({ success: true, message: 'Driver removed.' });
});

// GET /api/driver/my-info  — driver sees their own record
const getMyDriverInfo = asyncHandler(async (req, res) => {
  const record = await AdminDriver.findOne({ email: req.driver.email })
    .populate('assignedBus', 'busNumber model capacity')
    .populate('assignedRoute', 'routeId name stops');
  if (!record)
    return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });
  res.json({ success: true, driver: record });
});

module.exports = { getAllDrivers, createDriver, updateDriver, deleteDriver, getMyDriverInfo };