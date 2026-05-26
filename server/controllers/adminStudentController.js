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







const AdminStudent = require('../models/AdminStudent');
const Student = require('../models/Student');
const { asyncHandler } = require('../middleware/error');

// GET /api/admin/students
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await AdminStudent.find()
    .populate('assignedRoute', 'routeId name stops')
    .sort({ createdAt: -1 });
  res.json({ success: true, count: students.length, students });
});

// POST /api/admin/students
const createStudent = asyncHandler(async (req, res) => {
  const { name, email, rollNo, className, parentContact, assignedRoute, pickupStop, status } = req.body;

  if (!name || !email || !rollNo)
    return res.status(400).json({ success: false, message: 'Name, email, and roll number are required.' });

  // Check for duplicate email
  const existingEmail = await AdminStudent.findOne({ email: email.toLowerCase() });
  if (existingEmail)
    return res.status(400).json({ success: false, message: 'A student with this email already exists.' });

  // Check for duplicate roll number
  const existingRoll = await AdminStudent.findOne({ rollNo: rollNo.toUpperCase() });
  if (existingRoll)
    return res.status(400).json({ success: false, message: 'A student with this roll number already exists.' });

  // Link to existing auth account if student already signed up
  const authAccount = await Student.findOne({ email: email.toLowerCase() });

  const student = await AdminStudent.create({
    name,
    email: email.toLowerCase(),
    rollNo: rollNo.toUpperCase(),
    className,
    parentContact,
    assignedRoute: assignedRoute || null,
    pickupStop,
    status: status || 'active',
    authAccount: authAccount?._id || null,
  });

  await student.populate('assignedRoute', 'routeId name stops');
  res.status(201).json({ success: true, student });
});

// PUT /api/admin/students/:id
const updateStudent = asyncHandler(async (req, res) => {
  // If email is being updated, re-link auth account
  if (req.body.email) {
    const authAccount = await Student.findOne({ email: req.body.email.toLowerCase() });
    req.body.authAccount = authAccount?._id || null;
  }

  const student = await AdminStudent.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('assignedRoute', 'routeId name stops');

  if (!student)
    return res.status(404).json({ success: false, message: 'Student not found.' });

  res.json({ success: true, student });
});

// DELETE /api/admin/students/:id
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await AdminStudent.findByIdAndDelete(req.params.id);
  if (!student)
    return res.status(404).json({ success: false, message: 'Student not found.' });
  res.json({ success: true, message: 'Student removed.' });
});

// GET /api/student/my-info — student sees their own admin record
const getMyStudentInfo = asyncHandler(async (req, res) => {
  const record = await AdminStudent.findOne({ email: req.student.email })
    .populate('assignedRoute', 'routeId name stops');
  if (!record)
    return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });
  res.json({ success: true, student: record });
});

module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent, getMyStudentInfo };