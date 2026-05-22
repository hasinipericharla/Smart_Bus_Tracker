// const express = require('express');
// const router  = express.Router();
// const { protect } = require('../middleware/auth');

// const { getAllBuses, createBus, updateBus, deleteBus } = require('../controllers/busController');
// const { getAllRoutes, createRoute, updateRoute, deleteRoute } = require('../controllers/routeController');
// const { getAllStudents, createStudent, updateStudent, deleteStudent } = require('../controllers/adminStudentController');
// const { getAllDrivers, createDriver, updateDriver, deleteDriver } = require('../controllers/adminDriverController');
// const { createNotification, getAllNotifications, deleteNotification } = require('../controllers/notificationController');

// // All routes require admin auth
// router.use(protect);

// // Buses
// router.get('/buses',        getAllBuses);
// router.post('/buses',       createBus);
// router.put('/buses/:id',    updateBus);
// router.delete('/buses/:id', deleteBus);

// // Routes
// router.get('/routes',        getAllRoutes);
// router.post('/routes',       createRoute);
// router.put('/routes/:id',    updateRoute);
// router.delete('/routes/:id', deleteRoute);

// // Students (admin-managed)
// router.get('/students',        getAllStudents);
// router.post('/students',       createStudent);
// router.put('/students/:id',    updateStudent);
// router.delete('/students/:id', deleteStudent);

// // Drivers (admin-managed)
// router.get('/drivers',        getAllDrivers);
// router.post('/drivers',       createDriver);
// router.put('/drivers/:id',    updateDriver);
// router.delete('/drivers/:id', deleteDriver);

// // Notifications
// router.get('/notifications',        getAllNotifications);
// router.post('/notifications',       createNotification);
// router.delete('/notifications/:id', deleteNotification);

// module.exports = router;

const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');

const { getAllBuses, createBus, updateBus, deleteBus } = require('../controllers/busController');
const { getAllRoutes, createRoute, updateRoute, deleteRoute } = require('../controllers/routeController');
const { getAllStudents, createStudent, updateStudent, deleteStudent } = require('../controllers/adminStudentController');
const { getAllDrivers, createDriver, updateDriver, deleteDriver } = require('../controllers/adminDriverController');
const { createNotification, getAllNotifications, deleteNotification } = require('../controllers/notificationController');

// All routes require admin auth
router.use(protect);

// Buses
router.get('/buses',        getAllBuses);
router.post('/buses',       createBus);
router.put('/buses/:id',    updateBus);
router.delete('/buses/:id', deleteBus);

// Routes
router.get('/routes',        getAllRoutes);
router.post('/routes',       createRoute);
router.put('/routes/:id',    updateRoute);
router.delete('/routes/:id', deleteRoute);

// Students
router.get('/students',        getAllStudents);
router.post('/students',       createStudent);
router.put('/students/:id',    updateStudent);
router.delete('/students/:id', deleteStudent);

// Drivers
router.get('/drivers',        getAllDrivers);
router.post('/drivers',       createDriver);
router.put('/drivers/:id',    updateDriver);
router.delete('/drivers/:id', deleteDriver);

// Notifications
router.get('/notifications',        getAllNotifications);
router.post('/notifications',       createNotification);
router.delete('/notifications/:id', deleteNotification);

module.exports = router;