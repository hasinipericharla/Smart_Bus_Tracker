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


// const Student = require('../models/Student');

// router.put('/toggle-2fa', async (req, res) => {
//   try {
//     const student = await Student.findById(req.student._id);
//     if (!student) return res.status(404).json({ success: false, message: 'Not found.' });
//     student.twoFA = !student.twoFA;
//     await student.save();
//     res.json({ success: true, twoFA: student.twoFA,
//       message: `2FA ${student.twoFA ? 'enabled' : 'disabled'}.` });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Failed to toggle 2FA.' });
//   }
// });

const { requestToggle2FA, verifyToggle2FA } = require('../controllers/StudentauthController');

router.put('/toggle-2fa', requestToggle2FA);
router.post('/verify-2fa', verifyToggle2FA);

module.exports = router;