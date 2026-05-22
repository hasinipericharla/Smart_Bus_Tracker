const express = require('express');
const router  = express.Router();
const { protectDriver } = require('../middleware/driverAuth');
const { getMyDriverInfo } = require('../controllers/adminDriverController');
const { getAllRoutes }    = require('../controllers/routeController');
const {
  getDriverNotifications,
  markDriverNotifRead,
} = require('../controllers/notificationController');

router.use(protectDriver);

router.get('/my-info',           getMyDriverInfo);
router.get('/routes',            getAllRoutes);
router.get('/notifications',     getDriverNotifications);
router.patch('/notifications/:id/read', markDriverNotifRead);

module.exports = router;