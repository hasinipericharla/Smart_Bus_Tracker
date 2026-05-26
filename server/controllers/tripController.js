const Trip = require('../models/Trip');
const { asyncHandler } = require('../middleware/error');

// GET /api/admin/trips
// Supports ?date=2026-04-21 and ?busId=xxx
const getAllTrips = asyncHandler(async (req, res) => {
  const filter = {};

  // Filter by date
  if (req.query.date) {
    const start = new Date(req.query.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(req.query.date);
    end.setHours(23, 59, 59, 999);
    filter.date = { $gte: start, $lte: end };
  }

  // Filter by bus
  if (req.query.busId && req.query.busId !== 'all') {
    filter.bus = req.query.busId;
  }

  const trips = await Trip.find(filter)
    .populate('bus',    'busNumber model')
    .populate('route',  'routeId name')
    .populate('driver', 'name phone')
    .sort({ tripStart: -1 });

  res.json({ success: true, count: trips.length, trips });
});

// POST /api/admin/trips  — create a trip log
const createTrip = asyncHandler(async (req, res) => {
  const {
    bus, route, driver,
    tripStart, tripEnd,
    stopsCompleted, totalStops,
    delayMinutes, delayReason, status, date,
  } = req.body;

  if (!bus || !route || !driver)
    return res.status(400).json({ success: false, message: 'Bus, route and driver are required.' });

  const trip = await Trip.create({
    bus, route, driver,
    tripStart, tripEnd,
    stopsCompleted, totalStops,
    delayMinutes, delayReason, status, date,
  });

  await trip.populate('bus',    'busNumber model');
  await trip.populate('route',  'routeId name');
  await trip.populate('driver', 'name phone');

  res.status(201).json({ success: true, trip });
});

// PUT /api/admin/trips/:id  — update a trip (e.g. mark complete)
const updateTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )
    .populate('bus',    'busNumber model')
    .populate('route',  'routeId name')
    .populate('driver', 'name phone');

  if (!trip)
    return res.status(404).json({ success: false, message: 'Trip not found.' });

  res.json({ success: true, trip });
});

// DELETE /api/admin/trips/:id
const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findByIdAndDelete(req.params.id);
  if (!trip)
    return res.status(404).json({ success: false, message: 'Trip not found.' });
  res.json({ success: true, message: 'Trip deleted.' });
});

module.exports = { getAllTrips, createTrip, updateTrip, deleteTrip };