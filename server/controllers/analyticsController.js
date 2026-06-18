const Bus          = require('../models/Bus');
const Route         = require('../models/Route');
const AdminStudent  = require('../models/AdminStudent');
const AdminDriver   = require('../models/AdminDriver');
const { asyncHandler } = require('../middleware/error');

const toStatusMap = (arr) =>
  arr.reduce((acc, cur) => {
    acc[cur._id || 'unknown'] = cur.count;
    return acc;
  }, {});

// GET /api/admin/analytics
const getAnalytics = asyncHandler(async (req, res) => {
//   const [
//     busStatusAgg,
//     totalBuses,
//     routes,
//     totalRoutes,
//     studentStatusAgg,
//     totalStudents,
//     driverStatusAgg,
//     totalDrivers,
//   ] = await Promise.all([
//     Bus.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
//     Bus.countDocuments(),
//     Route.find({ isActive: true })
//       .select('routeId name stops assignedBuses')
//       .populate('assignedBuses', 'busNumber'),
//     Route.countDocuments({ isActive: true }),
//     AdminStudent.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
//     AdminStudent.countDocuments(),
//     AdminDriver.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
//     AdminDriver.countDocuments(),
//   ]);

const [
  busStatusAgg,
  totalBuses,
  routes,
  totalRoutes,
  busCountByRoute,
  studentStatusAgg,
  totalStudents,
  driverStatusAgg,
  totalDrivers,
] = await Promise.all([
  Bus.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
  Bus.countDocuments(),
  Route.find({ isActive: true }).select('routeId name stops'),
  Route.countDocuments({ isActive: true }),
  Bus.aggregate([
    { $match: { assignedRoute: { $ne: null } } },
    { $group: { _id: '$assignedRoute', count: { $sum: 1 } } }
  ]),
  AdminStudent.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
  AdminStudent.countDocuments(),
  AdminDriver.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
  AdminDriver.countDocuments(),
]);

const busCountMap = {};
busCountByRoute.forEach(b => { busCountMap[b._id.toString()] = b.count; });

const busesPerRoute = routes.map(r => ({
  routeId: r.routeId,
  name: r.name,
  buses: busCountMap[r._id.toString()] || 0,
}));

  const busMap     = toStatusMap(busStatusAgg);
  const studentMap = toStatusMap(studentStatusAgg);
  const driverMap  = toStatusMap(driverStatusAgg);

  const activeBuses      = busMap.active      || 0;
  const maintenanceBuses = busMap.maintenance || 0;
  const idleBuses        = busMap.idle        || 0;

  const totalStops = routes.reduce((sum, r) => sum + (r.stops?.length || 0), 0);
  const avgStopsPerRoute = totalRoutes > 0 ? Math.round(totalStops / totalRoutes) : 0;
//   const busesPerRoute = routes.map(r => ({
//     routeId: r.routeId,
//     name: r.name,
//     buses: r.assignedBuses?.length || 0,
//   }));

  const activeStudents   = studentMap.active  || 0;
  const pendingStudents  = studentMap.pending || 0;
  const inactiveStudents = totalStudents - activeStudents - pendingStudents;

  const activeDrivers   = driverMap.active   || 0;
  const onLeaveDrivers  = driverMap.on_leave || 0;
  const inactiveDrivers = totalDrivers - activeDrivers - onLeaveDrivers;

  res.json({
    success: true,
    buses: {
      total: totalBuses,
      active: activeBuses,
      maintenance: maintenanceBuses,
      idle: idleBuses,
      utilization: totalBuses > 0 ? Math.round((activeBuses / totalBuses) * 100) : 0,
    },
    routes: {
      total: totalRoutes,
      avgStopsPerRoute,
      busesPerRoute,
    },
    students: {
      total: totalStudents,
      active: activeStudents,
      pending: pendingStudents,
      inactive: inactiveStudents,
    },
    drivers: {
      total: totalDrivers,
      active: activeDrivers,
      onLeave: onLeaveDrivers,
      inactive: inactiveDrivers,
    },
  });
});

module.exports = { getAnalytics };