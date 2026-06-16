// const express = require('express');
// const router  = express.Router();
// const { protectDriver } = require('../middleware/driverAuth');
// const { getMyDriverInfo } = require('../controllers/adminDriverController');
// const { getAllRoutes }    = require('../controllers/routeController');
// const {
//   getDriverNotifications,
//   markDriverNotifRead,
// } = require('../controllers/notificationController');
// const { changeDriverPassword } = require('../controllers/driverAuthController');
// router.use(protectDriver);

// router.get('/my-info',           getMyDriverInfo);
// router.get('/routes',            getAllRoutes);
// router.get('/notifications',     getDriverNotifications);
// router.patch('/notifications/:id/read', markDriverNotifRead);
// router.patch('/change-password',        changeDriverPassword); 

// module.exports = router;
const express = require('express');
const router  = express.Router();
const { protectDriver } = require('../middleware/driverAuth');
const { getMyDriverInfo } = require('../controllers/adminDriverController');
const { getAllRoutes }    = require('../controllers/routeController');
const {
  getDriverNotifications,
  markDriverNotifRead,
} = require('../controllers/notificationController');

const { changeDriverPassword, getStopPassengerCounts } = require('../controllers/driverAuthController');

router.use(protectDriver);

router.get('/my-info',                  getMyDriverInfo);
router.get('/routes',                   getAllRoutes);
router.get('/notifications',            getDriverNotifications);
router.patch('/notifications/:id/read', markDriverNotifRead);
router.patch('/change-password',        changeDriverPassword); // ← confirm this line exists

//router.get('/trip/stop-counts/:routeId', protect, getStopPassengerCounts);
router.get('/trip/stop-counts/:routeId', getStopPassengerCounts);

const { startTrip, endTrip, updateLocation, completeStop } = require('../controllers/tripController');

router.post('/trip/start',      startTrip);
router.post('/trip/end',        endTrip);
router.patch('/trip/location',  updateLocation);
router.patch('/trip/stop',      completeStop); 

module.exports = router;