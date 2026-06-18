// const AdminStudent = require('../models/AdminStudent');
// const Student = require('../models/Student');
// const { asyncHandler } = require('../middleware/error');

// // GET /api/admin/students
// const getAllStudents = asyncHandler(async (req, res) => {
//   const students = await AdminStudent.find()
//     .populate('assignedRoute', 'routeId name stops')
//     .sort({ createdAt: -1 });
//   res.json({ success: true, count: students.length, students });
// });

// // POST /api/admin/students
// const createStudent = asyncHandler(async (req, res) => {
//   const { name, email, rollNo, className, parentContact, assignedRoute, pickupStop, status } = req.body;
//   if (!name || !email || !rollNo)
//     return res.status(400).json({ success: false, message: 'Name, email, and roll number are required.' });

//   // Try to link to existing auth account
//   const authAccount = await Student.findOne({ email: email.toLowerCase() });

//   const student = await AdminStudent.create({
//     name, email, rollNo, className, parentContact,
//     assignedRoute, pickupStop, status,
//     authAccount: authAccount?._id || null,
//   });
//   await student.populate('assignedRoute', 'routeId name stops');
//   res.status(201).json({ success: true, student });
// });

// // PUT /api/admin/students/:id
// const updateStudent = asyncHandler(async (req, res) => {
//   const student = await AdminStudent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//     .populate('assignedRoute', 'routeId name stops');
//   if (!student)
//     return res.status(404).json({ success: false, message: 'Student not found.' });
//   res.json({ success: true, student });
// });

// // DELETE /api/admin/students/:id
// const deleteStudent = asyncHandler(async (req, res) => {
//   const student = await AdminStudent.findByIdAndDelete(req.params.id);
//   if (!student)
//     return res.status(404).json({ success: false, message: 'Student not found.' });
//   res.json({ success: true, message: 'Student removed.' });
// });

// // GET /api/student/my-info  — student sees their own record
// const getMyStudentInfo = asyncHandler(async (req, res) => {
//   // req.student is set by protectStudent middleware
//   const record = await AdminStudent.findOne({ email: req.student.email })
//     .populate('assignedRoute', 'routeId name stops');
//   if (!record)
//     return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });
//   res.json({ success: true, student: record });
// });

// module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent, getMyStudentInfo };







// const AdminStudent = require('../models/AdminStudent');
// const Student = require('../models/Student');
// const { asyncHandler } = require('../middleware/error');

// // GET /api/admin/students
// // const getAllStudents = asyncHandler(async (req, res) => {
// //   const students = await AdminStudent.find()
// //     .populate('assignedRoute', 'routeId name stops')
// //     .sort({ createdAt: -1 });
// //   // res.json({ success: true, count: students.length, students });

// // });
// const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find()
//       .populate('assignedRoute', 'routeId name stops')
//       .sort({ createdAt: -1 });

//     res.json({ students });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // POST /api/admin/students
// // const createStudent = asyncHandler(async (req, res) => {
// //   const { name, email, rollNo, className, parentContact, assignedRoute, pickupStop, status } = req.body;

// //   if (!name || !email || !rollNo)
// //     return res.status(400).json({ success: false, message: 'Name, email, and roll number are required.' });

// //   // Check for duplicate email
// //   const existingEmail = await AdminStudent.findOne({ email: email.toLowerCase() });
// //   if (existingEmail)
// //     return res.status(400).json({ success: false, message: 'A student with this email already exists.' });

// //   // Check for duplicate roll number
// //   const existingRoll = await AdminStudent.findOne({ rollNo: rollNo.toUpperCase() });
// //   if (existingRoll)
// //     return res.status(400).json({ success: false, message: 'A student with this roll number already exists.' });

// //   // Link to existing auth account if student already signed up
// //   const authAccount = await Student.findOne({ email: email.toLowerCase() });

// //   const student = await AdminStudent.create({
// //     name,
// //     email: email.toLowerCase(),
// //     rollNo: rollNo.toUpperCase(),
// //     className,
// //     parentContact,
// //     assignedRoute: assignedRoute || null,
// //     pickupStop,
// //     status: status || 'active',
// //     authAccount: authAccount?._id || null,
// //   });

// //   await student.populate('assignedRoute', 'routeId name stops');
// //   res.status(201).json({ success: true, student });
// // });

// // ── GET all students ──────────────────────────────────────────
// const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find()
//       .populate('assignedRoute', 'routeId name stops')
//       .sort({ createdAt: -1 });

//     res.json({ students });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ── CREATE student ────────────────────────────────────────────
// const createStudent = async (req, res) => {
//   try {
//     const {
//       name, email, rollNo, className,
//       assignedRoute, pickupStop, parentContact, status,
//       tripType, morningPickupTime, eveningPickupTime,   // ← NEW
//     } = req.body;

//     if (!name || !email || !rollNo) {
//       return res.status(400).json({ message: 'Name, email and roll number are required.' });
//     }

//     // Check for duplicate email or rollNo
//     const conflict = await Student.findOne({ $or: [{ email }, { rollNo }] });
//     if (conflict) {
//       return res.status(409).json({
//         message: conflict.email === email
//           ? 'A student with this email already exists.'
//           : 'A student with this roll number already exists.',
//       });
//     }

//     const student = await Student.create({
//       name,
//       email,
//       rollNo,
//       className,
//       assignedRoute: assignedRoute || null,
//       pickupStop:    pickupStop    || '',
//       parentContact: parentContact || '',
//       status:        status        || 'active',
//       // ── NEW ──
//       tripType:          tripType          || 'both',
//       morningPickupTime: morningPickupTime || '',
//       eveningPickupTime: eveningPickupTime || '',
//     });

//     const populated = await student.populate('assignedRoute', 'routeId name stops');
//     res.status(201).json({ message: 'Student created successfully.', student: populated });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ── UPDATE student ────────────────────────────────────────────
// const updateStudent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name, email, rollNo, className,
//       assignedRoute, pickupStop, parentContact, status,
//       tripType, morningPickupTime, eveningPickupTime,   // ← NEW
//     } = req.body;

//     if (!name || !email || !rollNo) {
//       return res.status(400).json({ message: 'Name, email and roll number are required.' });
//     }

//     // Check duplicates excluding self
//     const conflict = await Student.findOne({
//       _id:  { $ne: id },
//       $or: [{ email }, { rollNo }],
//     });
//     if (conflict) {
//       return res.status(409).json({
//         message: conflict.email === email
//           ? 'Another student with this email already exists.'
//           : 'Another student with this roll number already exists.',
//       });
//     }

//     const student = await Student.findByIdAndUpdate(
//       id,
//       {
//         name,
//         email,
//         rollNo,
//         className,
//         assignedRoute: assignedRoute || null,
//         pickupStop:    pickupStop    || '',
//         parentContact: parentContact || '',
//         status,
//         // ── NEW ──
//         tripType:          tripType          || 'both',
//         morningPickupTime: morningPickupTime || '',
//         eveningPickupTime: eveningPickupTime || '',
//       },
//       { new: true, runValidators: true }
//     ).populate('assignedRoute', 'routeId name stops');

//     if (!student) return res.status(404).json({ message: 'Student not found.' });

//     res.json({ message: 'Student updated successfully.', student });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ── DELETE student ────────────────────────────────────────────
// const deleteStudent = async (req, res) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     if (!student) return res.status(404).json({ message: 'Student not found.' });
//     res.json({ message: 'Student deleted successfully.' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent };

// // PUT /api/admin/students/:id
// const updateStudent = asyncHandler(async (req, res) => {
//   // If email is being updated, re-link auth account
//   if (req.body.email) {
//     const authAccount = await Student.findOne({ email: req.body.email.toLowerCase() });
//     req.body.authAccount = authAccount?._id || null;
//   }

//   const student = await AdminStudent.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true, runValidators: true }
//   ).populate('assignedRoute', 'routeId name stops');

//   if (!student)
//     return res.status(404).json({ success: false, message: 'Student not found.' });

//   res.json({ success: true, student });
// });

// // DELETE /api/admin/students/:id
// const deleteStudent = asyncHandler(async (req, res) => {
//   const student = await AdminStudent.findByIdAndDelete(req.params.id);
//   if (!student)
//     return res.status(404).json({ success: false, message: 'Student not found.' });
//   res.json({ success: true, message: 'Student removed.' });
// });

// // GET /api/student/my-info — student sees their own admin record
// const getMyStudentInfo = asyncHandler(async (req, res) => {
//   const record = await AdminStudent.findOne({ email: req.student.email })
//     .populate('assignedRoute', 'routeId name stops');
//   if (!record)
//     return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });
//   res.json({ success: true, student: record });
// });

// module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent, getMyStudentInfo };

// const AdminStudent = require('../models/AdminStudent');
// const Student      = require('../models/Student');
// const Bus          = require('../models/Bus'); 
// const { asyncHandler } = require('../middleware/error');

// // ── GET all students ──────────────────────────────────────────
// const getAllStudents = asyncHandler(async (req, res) => {
//   const students = await AdminStudent.find()
//     .populate('assignedRoute', 'routeId name stops')
//     .sort({ createdAt: -1 });

//   res.json({ students });
// });

// // ── CREATE student ────────────────────────────────────────────
// const createStudent = asyncHandler(async (req, res) => {
//   const {
//     name, email, rollNo, className,
//     assignedRoute, pickupStop, parentContact, status,
//     tripType, morningPickupTime, eveningPickupTime,
//   } = req.body;

//   if (!name || !email || !rollNo)
//     return res.status(400).json({ message: 'Name, email and roll number are required.' });

//   // Check duplicates
//   const conflict = await AdminStudent.findOne({
//     $or: [{ email: email.toLowerCase() }, { rollNo }],
//   });
//   if (conflict)
//     return res.status(409).json({
//       message: conflict.email === email.toLowerCase()
//         ? 'A student with this email already exists.'
//         : 'A student with this roll number already exists.',
//     });

//   // Link to auth account if student already signed up
//   const authAccount = await Student.findOne({ email: email.toLowerCase() });

//   const student = await AdminStudent.create({
//     name,
//     email:         email.toLowerCase(),
//     rollNo,
//     className,
//     assignedRoute: assignedRoute || null,
//     pickupStop:    pickupStop    || '',
//     parentContact: parentContact || '',
//     status:        status        || 'active',
//     authAccount:   authAccount?._id || null,
//     // ── trip schedule ──
//     tripType:          tripType          || 'both',
//     morningPickupTime: morningPickupTime || '',
//     eveningPickupTime: eveningPickupTime || '',
//   });

//   await student.populate('assignedRoute', 'routeId name stops');
//   res.status(201).json({ message: 'Student created successfully.', student });
// });

// // ── UPDATE student ────────────────────────────────────────────
// const updateStudent = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const {
//     name, email, rollNo, className,
//     assignedRoute, pickupStop, parentContact, status,
//     tripType, morningPickupTime, eveningPickupTime,
//   } = req.body;

//   if (!name || !email || !rollNo)
//     return res.status(400).json({ message: 'Name, email and roll number are required.' });

//   // Check duplicates excluding self
//   const conflict = await AdminStudent.findOne({
//     _id: { $ne: id },
//     $or: [{ email: email.toLowerCase() }, { rollNo }],
//   });
//   if (conflict)
//     return res.status(409).json({
//       message: conflict.email === email.toLowerCase()
//         ? 'Another student with this email already exists.'
//         : 'Another student with this roll number already exists.',
//     });

//   // Re-link auth account if email changed
//   const authAccount = await Student.findOne({ email: email.toLowerCase() });

//   const student = await AdminStudent.findByIdAndUpdate(
//     id,
//     {
//       name,
//       email:         email.toLowerCase(),
//       rollNo,
//       className,
//       assignedRoute: assignedRoute || null,
//       pickupStop:    pickupStop    || '',
//       parentContact: parentContact || '',
//       status,
//       authAccount:   authAccount?._id || null,
//       // ── trip schedule ──
//       tripType:          tripType          || 'both',
//       morningPickupTime: morningPickupTime || '',
//       eveningPickupTime: eveningPickupTime || '',
//     },
//     { new: true, runValidators: true }
//   ).populate('assignedRoute', 'routeId name stops');

//   if (!student)
//     return res.status(404).json({ message: 'Student not found.' });

//   res.json({ message: 'Student updated successfully.', student });
// });

// // ── DELETE student ────────────────────────────────────────────
// const deleteStudent = asyncHandler(async (req, res) => {
//   const student = await AdminStudent.findByIdAndDelete(req.params.id);
//   if (!student)
//     return res.status(404).json({ message: 'Student not found.' });
//   res.json({ message: 'Student deleted successfully.' });
// });

// // ── GET student's own info (called by student app) ────────────
// // GET /api/student/my-info
// // const getMyStudentInfo = asyncHandler(async (req, res) => {
// //   const record = await AdminStudent.findOne({ email: req.student.email })
// //     .populate('assignedRoute', 'routeId name description stops');

// //   if (!record)
// //     return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });

// //   res.json({
// //     success: true,
// //     student: {
// //       _id:              record._id,
// //       name:             record.name,
// //       email:            record.email,
// //       rollNo:           record.rollNo,
// //       className:        record.className,
// //       assignedRoute:    record.assignedRoute,
// //       pickupStop:       record.pickupStop       || '—',
// //       parentContact:    record.parentContact     || '—',
// //       status:           record.status,
// //       // ── trip schedule ──
// //       tripType:          record.tripType          || 'both',
// //       morningPickupTime: record.morningPickupTime || '',
// //       eveningPickupTime: record.eveningPickupTime || '',
// //     },
// //   });
// // });
// // ── GET student's own info (called by student app) ────────────
// // GET /api/student/my-info
// // const getMyStudentInfo = asyncHandler(async (req, res) => {
// //   const record = await AdminStudent.findOne({ email: req.student.email })
// //     .populate('assignedRoute', 'routeId name description stops');

// //   if (!record)
// //     return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });

// //   let assignedRoute = record.assignedRoute;

// //   // Find the bus assigned to this student's route, and attach it
// //   // in the shape the frontend expects: assignedRoute.assignedBuses[0]
// //   if (assignedRoute) {
// //     const bus = await Bus.findOne({ assignedRoute: assignedRoute._id })
// //       .select('_id busNumber capacity status');

// //     assignedRoute = {
// //       ...assignedRoute.toObject(),
// //       assignedBuses: bus ? [bus] : [],
// //     };
// //   }

// //   res.json({
// //     success: true,
// //     student: {
// //       _id:              record._id,
// //       name:             record.name,
// //       email:            record.email,
// //       rollNo:           record.rollNo,
// //       className:        record.className,
// //       assignedRoute,   // ← now includes assignedBuses
// //       pickupStop:       record.pickupStop       || '—',
// //       parentContact:    record.parentContact     || '—',
// //       status:           record.status,
// //       tripType:          record.tripType          || 'both',
// //       morningPickupTime: record.morningPickupTime || '',
// //       eveningPickupTime: record.eveningPickupTime || '',
// //     },
// //   });
// // });
// const getMyStudentInfo = asyncHandler(async (req, res) => {
//   const record = await AdminStudent.findOne({ email: req.student.email })
//     .populate('assignedRoute', 'routeId name description stops');

//   if (!record)
//     return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });

//   let assignedRoute = record.assignedRoute;

//   if (assignedRoute) {
//     const bus = await Bus.findOne({ assignedRoute: assignedRoute._id })
//       .select('_id busNumber capacity status');

//     assignedRoute = {
//       ...assignedRoute.toObject(),
//       assignedBuses: bus ? [bus] : [],
//     };
//   }

//   res.json({
//     success: true,
//     student: {
//       _id:              record._id,
//       name:             record.name,
//       email:            record.email,
//       rollNo:           record.rollNo,
//       className:        record.className,
//       assignedRoute,
//       pickupStop:       record.pickupStop       || '—',
//       parentContact:    record.parentContact     || '—',
//       status:           record.status,
//       tripType:          record.tripType          || 'both',
//       morningPickupTime: record.morningPickupTime || '',
//       eveningPickupTime: record.eveningPickupTime || '',
//     },
//   });
// });

// module.exports = {
//   getAllStudents,
//   createStudent,
//   updateStudent,
//   deleteStudent,
//   getMyStudentInfo,
// };

const AdminStudent = require('../models/AdminStudent');
const Student      = require('../models/Student');
const Bus          = require('../models/Bus');
const { asyncHandler } = require('../middleware/error');
const logActivity = require('../utils/logActivity');

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await AdminStudent.find()
    .populate('assignedRoute', 'routeId name stops')
    .sort({ createdAt: -1 });
  res.json({ students });
});

const createStudent = asyncHandler(async (req, res) => {
  const {
    name, email, rollNo, className,
    assignedRoute, pickupStop, parentContact, status,
    tripType, morningPickupTime, eveningPickupTime,
  } = req.body;

  if (!name || !email || !rollNo)
    return res.status(400).json({ message: 'Name, email and roll number are required.' });

  const conflict = await AdminStudent.findOne({
    $or: [{ email: email.toLowerCase() }, { rollNo }],
  });
  if (conflict)
    return res.status(409).json({
      message: conflict.email === email.toLowerCase()
        ? 'A student with this email already exists.'
        : 'A student with this roll number already exists.',
    });

  const authAccount = await Student.findOne({ email: email.toLowerCase() });

  const student = await AdminStudent.create({
    name,
    email:         email.toLowerCase(),
    rollNo,
    className,
    assignedRoute: assignedRoute || null,
    pickupStop:    pickupStop    || '',
    parentContact: parentContact || '',
    status:        status        || 'active',
    authAccount:   authAccount?._id || null,
    tripType:          tripType          || 'both',
    morningPickupTime: morningPickupTime || '',
    eveningPickupTime: eveningPickupTime || '',
  });

  await student.populate('assignedRoute', 'routeId name stops');

  await logActivity(req.admin._id, 'student_created', `Enrolled student ${student.name} (${student.rollNo})`, 'var(--green)');
  res.status(201).json({ message: 'Student created successfully.', student });
});

const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name, email, rollNo, className,
    assignedRoute, pickupStop, parentContact, status,
    tripType, morningPickupTime, eveningPickupTime,
  } = req.body;

  if (!name || !email || !rollNo)
    return res.status(400).json({ message: 'Name, email and roll number are required.' });

  const conflict = await AdminStudent.findOne({
    _id: { $ne: id },
    $or: [{ email: email.toLowerCase() }, { rollNo }],
  });
  if (conflict)
    return res.status(409).json({
      message: conflict.email === email.toLowerCase()
        ? 'Another student with this email already exists.'
        : 'Another student with this roll number already exists.',
    });

  const authAccount = await Student.findOne({ email: email.toLowerCase() });

  const student = await AdminStudent.findByIdAndUpdate(
    id,
    {
      name,
      email:         email.toLowerCase(),
      rollNo,
      className,
      assignedRoute: assignedRoute || null,
      pickupStop:    pickupStop    || '',
      parentContact: parentContact || '',
      status,
      authAccount:   authAccount?._id || null,
      tripType:          tripType          || 'both',
      morningPickupTime: morningPickupTime || '',
      eveningPickupTime: eveningPickupTime || '',
    },
    { new: true, runValidators: true }
  ).populate('assignedRoute', 'routeId name stops');

  if (!student)
    return res.status(404).json({ message: 'Student not found.' });

  await logActivity(req.admin._id, 'student_updated', `Updated student ${student.name} (${student.rollNo})`, 'var(--amber)');
  res.json({ message: 'Student updated successfully.', student });
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await AdminStudent.findByIdAndDelete(req.params.id);
  if (!student)
    return res.status(404).json({ message: 'Student not found.' });

  await logActivity(req.admin._id, 'student_deleted', `Removed student ${student.name} (${student.rollNo})`, 'var(--red)');
  res.json({ message: 'Student deleted successfully.' });
});

const getMyStudentInfo = asyncHandler(async (req, res) => {
  const record = await AdminStudent.findOne({ email: req.student.email })
    .populate('assignedRoute', 'routeId name description stops');

  if (!record)
    return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });

  let assignedRoute = record.assignedRoute;

  if (assignedRoute) {
    const bus = await Bus.findOne({ assignedRoute: assignedRoute._id })
      .select('_id busNumber capacity status');
    assignedRoute = { ...assignedRoute.toObject(), assignedBuses: bus ? [bus] : [] };
  }

  res.json({
    success: true,
    student: {
      _id:              record._id,
      name:             record.name,
      email:            record.email,
      rollNo:           record.rollNo,
      className:        record.className,
      assignedRoute,
      pickupStop:       record.pickupStop    || '—',
      parentContact:    record.parentContact || '—',
      status:           record.status,
      tripType:          record.tripType          || 'both',
      morningPickupTime: record.morningPickupTime || '',
      eveningPickupTime: record.eveningPickupTime || '',
    },
  });
});

module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent, getMyStudentInfo };