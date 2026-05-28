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
const Admin = require('../models/Admin');

const { getAllBuses, createBus, updateBus, deleteBus } = require('../controllers/busController');
const { getAllRoutes, createRoute, updateRoute, deleteRoute } = require('../controllers/routeController');
const { getAllStudents, createStudent, updateStudent, deleteStudent } = require('../controllers/adminStudentController');
const { getAllDrivers, createDriver, updateDriver, deleteDriver } = require('../controllers/adminDriverController');
const { createNotification, getAllNotifications, deleteNotification } = require('../controllers/notificationController');
const { getAllTrips, createTrip, updateTrip, deleteTrip } = require('../controllers/tripController');

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



router.get('/trips',        getAllTrips);
router.post('/trips',       createTrip);
router.put('/trips/:id',    updateTrip);
router.delete('/trips/:id', deleteTrip);

// GET ADMIN PROFILE (Alternative route via adminRoutes)
router.get('/profile', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({
      success: true,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        department: admin.department,
        createdAt: admin.createdAt,
      },
    });
  } catch (err) {
    console.error('Error fetching admin profile:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

// UPDATE ADMIN PROFILE (Alternative route via adminRoutes)
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, phone, department } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    // Update admin
    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name, email, phone, department },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        department: admin.department,
      },
    });
  } catch (err) {
    console.error('Error updating admin profile:', err);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

module.exports = router;