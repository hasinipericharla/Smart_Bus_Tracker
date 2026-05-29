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
const { changeDriverPassword } = require('../controllers/driverAuthController'); // ← confirm this line exists

router.use(protectDriver);

router.get('/my-info',                  getMyDriverInfo);
router.get('/routes',                   getAllRoutes);
router.get('/notifications',            getDriverNotifications);
router.patch('/notifications/:id/read', markDriverNotifRead);
router.patch('/change-password',        changeDriverPassword); // ← confirm this line exists

module.exports = router;