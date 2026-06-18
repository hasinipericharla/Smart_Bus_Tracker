// const Bus = require('../models/Bus');
// const { asyncHandler } = require('../middleware/error');
// const logActivity = require('../utils/logActivity');

// // GET /api/admin/buses
// const getAllBuses = asyncHandler(async (req, res) => {
//   const buses = await Bus.find()
//     .populate('assignedDriver', 'name email driverId phone')
//     .populate('assignedRoute', 'routeId name stops')
//     .sort({ createdAt: -1 });
//   res.json({ success: true, count: buses.length, buses });
// });

// // POST /api/admin/buses
// const createBus = asyncHandler(async (req, res) => {
//   const { busNumber, model, capacity, status, assignedDriver, assignedRoute } = req.body;
//   if (!busNumber || !capacity)
//     return res.status(400).json({ success: false, message: 'Bus number and capacity are required.' });

//   const bus = await Bus.create({ busNumber, model, capacity, status, assignedDriver, assignedRoute });
//   await bus.populate('assignedDriver', 'name email');
//   await bus.populate('assignedRoute', 'routeId name');
//   res.status(201).json({ success: true, bus });
// });

// // PUT /api/admin/buses/:id
// const updateBus = asyncHandler(async (req, res) => {
//   const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//     .populate('assignedDriver', 'name email')
//     .populate('assignedRoute', 'routeId name');
//   if (!bus)
//     return res.status(404).json({ success: false, message: 'Bus not found.' });
//   res.json({ success: true, bus });
// });

// // DELETE /api/admin/buses/:id
// const deleteBus = asyncHandler(async (req, res) => {
//   const bus = await Bus.findByIdAndDelete(req.params.id);
//   if (!bus)
//     return res.status(404).json({ success: false, message: 'Bus not found.' });
//   res.json({ success: true, message: 'Bus deleted.' });
// });

// module.exports = { getAllBuses, createBus, updateBus, deleteBus };

const Bus = require('../models/Bus');
const { asyncHandler } = require('../middleware/error');
const logActivity = require('../utils/logActivity');

const getAllBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find()
    .populate('assignedDriver', 'name email driverId phone')
    .populate('assignedRoute', 'routeId name stops')
    .sort({ createdAt: -1 });
  res.json({ success: true, count: buses.length, buses });
});

const createBus = asyncHandler(async (req, res) => {
  const { busNumber, model, capacity, status, assignedDriver, assignedRoute } = req.body;
  if (!busNumber || !capacity)
    return res.status(400).json({ success: false, message: 'Bus number and capacity are required.' });

  const bus = await Bus.create({ busNumber, model, capacity, status, assignedDriver, assignedRoute });
  await bus.populate('assignedDriver', 'name email');
  await bus.populate('assignedRoute', 'routeId name');

  await logActivity(req.admin._id, 'bus_created', `Added new bus ${bus.busNumber}`, 'var(--green)');
  res.status(201).json({ success: true, bus });
});

const updateBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .populate('assignedDriver', 'name email')
    .populate('assignedRoute', 'routeId name');
  if (!bus)
    return res.status(404).json({ success: false, message: 'Bus not found.' });

  await logActivity(req.admin._id, 'bus_updated', `Updated bus ${bus.busNumber}`, 'var(--amber)');
  res.json({ success: true, bus });
});

const deleteBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findByIdAndDelete(req.params.id);
  if (!bus)
    return res.status(404).json({ success: false, message: 'Bus not found.' });

  await logActivity(req.admin._id, 'bus_deleted', `Removed bus ${bus.busNumber}`, 'var(--red)');
  res.json({ success: true, message: 'Bus deleted.' });
});

module.exports = { getAllBuses, createBus, updateBus, deleteBus };