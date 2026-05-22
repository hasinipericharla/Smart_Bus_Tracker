const Route = require('../models/Route');
const { asyncHandler } = require('../middleware/error');

// GET /api/admin/routes  (also accessible to students/drivers)
const getAllRoutes = asyncHandler(async (req, res) => {
  const routes = await Route.find({ isActive: true })
    .populate('assignedBuses', 'busNumber model capacity status')
    .sort({ routeId: 1 });
  res.json({ success: true, count: routes.length, routes });
});

// POST /api/admin/routes
const createRoute = asyncHandler(async (req, res) => {
  const { routeId, name, description, stops, assignedBuses } = req.body;
  if (!routeId || !name)
    return res.status(400).json({ success: false, message: 'Route ID and name are required.' });

  const route = await Route.create({ routeId, name, description, stops: stops || [], assignedBuses: assignedBuses || [] });
  res.status(201).json({ success: true, route });
});

// PUT /api/admin/routes/:id
const updateRoute = asyncHandler(async (req, res) => {
  const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!route)
    return res.status(404).json({ success: false, message: 'Route not found.' });
  res.json({ success: true, route });
});

// DELETE /api/admin/routes/:id
const deleteRoute = asyncHandler(async (req, res) => {
  const route = await Route.findByIdAndDelete(req.params.id);
  if (!route)
    return res.status(404).json({ success: false, message: 'Route not found.' });
  res.json({ success: true, message: 'Route deleted.' });
});

module.exports = { getAllRoutes, createRoute, updateRoute, deleteRoute };