// const AdminDriver = require('../models/AdminDriver');
// const Driver = require('../models/Driver');
// const Bus = require('../models/Bus'); 
// const { asyncHandler } = require('../middleware/error');

// // GET /api/admin/drivers
// const getAllDrivers = asyncHandler(async (req, res) => {
//   const drivers = await AdminDriver.find()
//     .populate('assignedBus', 'busNumber model capacity status')
//     .populate('assignedRoute', 'routeId name')
//     .sort({ createdAt: -1 });
//   res.json({ success: true, count: drivers.length, drivers });
// });

// // POST /api/admin/drivers
// const createDriver = asyncHandler(async (req, res) => {
//   const { name, email, licenseNo, experience, phone, assignedBus, assignedRoute, status } = req.body;
//   if (!name || !email)
//     return res.status(400).json({ success: false, message: 'Name and email are required.' });

//   const authAccount = await Driver.findOne({ email: email.toLowerCase() });


//   // ✅ Get the route from the assigned bus automatically
//   let assignedRoute = null;
//   if (assignedBus) {
//     const busDoc = await Bus.findById(assignedBus);
//     if (busDoc?.assignedRoute) assignedRoute = busDoc.assignedRoute;
//   }
//   const driver = await AdminDriver.create({
//     name, email, licenseNo, experience, phone,
//     // assignedBus, assignedRoute, status,
//     // authAccount: authAccount?._id || null,
//     assignedBus: assignedBus || null,
//     assignedRoute,
//     status,
//     authAccount: authAccount?._id || null,
//   });

//   if (assignedBus) {
//     await Bus.findByIdAndUpdate(assignedBus, {
//       assignedDriver: driver._id,
//       //assignedRoute: assignedRoute || null,
//     });
//   }
//   await driver.populate('assignedBus', 'busNumber');
//   await driver.populate('assignedRoute', 'routeId name');
//   res.status(201).json({ success: true, driver });
// });

// // PUT /api/admin/drivers/:id
// const updateDriver = asyncHandler(async (req, res) => {
//   // Get the old driver to detect bus change
//   const oldDriver = await AdminDriver.findById(req.params.id);

//     // ✅ Auto-fill route from the newly assigned bus
//   let updateData = { ...req.body };
//   if (req.body.assignedBus) {
//     const busDoc = await Bus.findById(req.body.assignedBus);
//     if (busDoc?.assignedRoute) {
//       updateData.assignedRoute = busDoc.assignedRoute;
//     }
//   }

//   const driver = await AdminDriver.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//     .populate('assignedBus', 'busNumber')
//     .populate('assignedRoute', 'routeId name');
//   if (!driver)
//     return res.status(404).json({ success: false, message: 'Driver not found.' });
  
//   const newBusId = req.body.assignedBus;
//   const oldBusId = oldDriver.assignedBus?.toString();

//   if (oldBusId && oldBusId !== newBusId) {
//     // Clear driver from old bus
//     await Bus.findByIdAndUpdate(oldBusId, { assignedDriver: null });
//   }
//   if (newBusId) {
//     // Set driver on new bus
//     await Bus.findByIdAndUpdate(newBusId, {
//       assignedDriver: driver._id,
//       //assignedRoute: req.body.assignedRoute || null,
//     });
//   }
//   res.json({ success: true, driver });
// });

// // DELETE /api/admin/drivers/:id
// const deleteDriver = asyncHandler(async (req, res) => {
//   const driver = await AdminDriver.findByIdAndDelete(req.params.id);
//   if (!driver)
//     return res.status(404).json({ success: false, message: 'Driver not found.' });
//   res.json({ success: true, message: 'Driver removed.' });
// });

// // GET /api/driver/my-info  — driver sees their own record
// const getMyDriverInfo = asyncHandler(async (req, res) => {
//   const record = await AdminDriver.findOne({ email: req.driver.email })
//     .populate('assignedBus', 'busNumber model capacity')
//     .populate('assignedRoute', 'routeId name stops');
//   if (!record)
//     return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });
//   res.json({ success: true, driver: record });
// });

// module.exports = { getAllDrivers, createDriver, updateDriver, deleteDriver, getMyDriverInfo };

const AdminDriver = require('../models/AdminDriver');
const Driver = require('../models/Driver');
const Bus = require('../models/Bus');
const { asyncHandler } = require('../middleware/error');

// GET /api/admin/drivers
const getAllDrivers = asyncHandler(async (req, res) => {
  const drivers = await AdminDriver.find()
    .populate('assignedBus', 'busNumber model capacity status')
    .populate('assignedRoute', 'routeId name')
    .sort({ createdAt: -1 });
  res.json({ success: true, count: drivers.length, drivers });
});

// POST /api/admin/drivers
const createDriver = asyncHandler(async (req, res) => {
  // ✅ Don't destructure assignedRoute from body — we auto-fill it from the bus
  const { name, email, licenseNo, experience, phone, assignedBus, status } = req.body;

  if (!name || !email)
    return res.status(400).json({ success: false, message: 'Name and email are required.' });

  const authAccount = await Driver.findOne({ email: email.toLowerCase() });

  // ✅ Auto-fill route from the assigned bus
  let assignedRoute = null;
  if (assignedBus) {
    const busDoc = await Bus.findById(assignedBus);
    if (busDoc?.assignedRoute) assignedRoute = busDoc.assignedRoute;
  }

  const driver = await AdminDriver.create({
    name,
    email,
    licenseNo,
    experience,
    phone,
    assignedBus: assignedBus || null,
    assignedRoute,
    status,
    authAccount: authAccount?._id || null,
  });

  // ✅ Sync: update Bus document with this driver
  if (assignedBus) {
    await Bus.findByIdAndUpdate(assignedBus, { assignedDriver: driver._id });
  }

  await driver.populate('assignedBus', 'busNumber');
  await driver.populate('assignedRoute', 'routeId name');
  res.status(201).json({ success: true, driver });
});

// PUT /api/admin/drivers/:id
// const updateDriver = asyncHandler(async (req, res) => {
//   const oldDriver = await AdminDriver.findById(req.params.id);

//   // ✅ Auto-fill route from the newly assigned bus
//   let updateData = { ...req.body };
//   if (req.body.assignedBus) {
//     const busDoc = await Bus.findById(req.body.assignedBus);
//     if (busDoc?.assignedRoute) {
//       updateData.assignedRoute = busDoc.assignedRoute;
//     }
//   }

//   // ✅ Use updateData (not req.body) so the route gets saved
//   const driver = await AdminDriver.findByIdAndUpdate(
//     req.params.id,
//     updateData,
//     { new: true, runValidators: true }
//   )
//     .populate('assignedBus', 'busNumber')
//     .populate('assignedRoute', 'routeId name');

//   if (!driver)
//     return res.status(404).json({ success: false, message: 'Driver not found.' });

//   const newBusId = req.body.assignedBus;
//   const oldBusId = oldDriver.assignedBus?.toString();

//   // Clear driver from old bus if bus changed
//   if (oldBusId && oldBusId !== newBusId) {
//     await Bus.findByIdAndUpdate(oldBusId, { assignedDriver: null });
//   }

//   // Set driver on new bus
//   if (newBusId) {
//     await Bus.findByIdAndUpdate(newBusId, { assignedDriver: driver._id });
//   }

//   res.json({ success: true, driver });
// });

const updateDriver = asyncHandler(async (req, res) => {
  const oldDriver = await AdminDriver.findById(req.params.id);

  let updateData = { ...req.body };
  
  // ✅ Convert empty string to null
  if (!updateData.assignedBus) updateData.assignedBus = null;

  // ✅ Auto-fill route from the newly assigned bus
  if (updateData.assignedBus) {
    const busDoc = await Bus.findById(updateData.assignedBus);
    if (busDoc?.assignedRoute) {
      updateData.assignedRoute = busDoc.assignedRoute;
    }
  } else {
    // If no bus assigned, clear route too
    updateData.assignedRoute = null;
  }

  const driver = await AdminDriver.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  )
    .populate('assignedBus', 'busNumber')
    .populate('assignedRoute', 'routeId name');

  if (!driver)
    return res.status(404).json({ success: false, message: 'Driver not found.' });

  const newBusId = updateData.assignedBus?.toString();
  const oldBusId = oldDriver.assignedBus?.toString();

  if (oldBusId && oldBusId !== newBusId) {
    await Bus.findByIdAndUpdate(oldBusId, { assignedDriver: null });
  }
  if (newBusId) {
    await Bus.findByIdAndUpdate(newBusId, { assignedDriver: driver._id });
  }

  res.json({ success: true, driver });
});

// DELETE /api/admin/drivers/:id
const deleteDriver = asyncHandler(async (req, res) => {
  const driver = await AdminDriver.findByIdAndDelete(req.params.id);
  if (!driver)
    return res.status(404).json({ success: false, message: 'Driver not found.' });

  // ✅ Also clear the driver from the bus when deleted
  if (driver.assignedBus) {
    await Bus.findByIdAndUpdate(driver.assignedBus, { assignedDriver: null });
  }

  res.json({ success: true, message: 'Driver removed.' });
});

// GET /api/driver/my-info — driver sees their own record
const getMyDriverInfo = asyncHandler(async (req, res) => {
  const record = await AdminDriver.findOne({ email: req.driver.email })
    .populate('assignedBus', 'busNumber model capacity')
    .populate('assignedRoute', 'routeId name stops');
  if (!record)
    return res.status(404).json({ success: false, message: 'No profile found. Contact admin.' });
  res.json({ success: true, driver: record });
});

module.exports = { getAllDrivers, createDriver, updateDriver, deleteDriver, getMyDriverInfo };