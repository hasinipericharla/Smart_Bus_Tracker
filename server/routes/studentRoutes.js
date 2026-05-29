// const express = require('express');
// const router  = express.Router();
// const { protectStudent } = require('../middleware/studentAuth');
// const { getMyStudentInfo } = require('../controllers/adminStudentController');
// const { getAllRoutes }     = require('../controllers/routeController');
// const {
//   getStudentNotifications,
//   markStudentNotifRead,
// } = require('../controllers/notificationController');

// router.use(protectStudent);

// router.get('/my-info',           getMyStudentInfo);
// router.get('/routes',            getAllRoutes);
// router.get('/notifications',     getStudentNotifications);
// router.patch('/notifications/:id/read', markStudentNotifRead);

// module.exports = router;
const express = require('express');
const router  = express.Router();
const { protectStudent } = require('../middleware/studentAuth');
const { getMyStudentInfo } = require('../controllers/adminStudentController');
const { getAllRoutes }     = require('../controllers/routeController');
const {
  getStudentNotifications,
  markStudentNotifRead,
} = require('../controllers/notificationController');
const { changePassword } = require('../controllers/StudentauthController'); // ← add

router.use(protectStudent);

router.get('/my-info',                   getMyStudentInfo);
router.get('/routes',                    getAllRoutes);
router.get('/notifications',             getStudentNotifications);
router.patch('/notifications/:id/read',  markStudentNotifRead);
router.patch('/change-password',         changePassword); // ← add

module.exports = router;