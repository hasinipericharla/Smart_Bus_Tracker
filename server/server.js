// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const { errorHandler } = require('./middleware/error');

// // Load env vars
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // ── Middleware ─────────────────────────────────
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || 'http://localhost:3000',
//     credentials: true, // Allow cookies
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// // ── Routes ─────────────────────────────────────
// app.use('/api/admin/auth', require('./routes/auth'));
// app.use('/api/student/auth', require('./routes/studentAuth'));
// // Add this line alongside your admin routes
// app.use('/api/driver/auth', require('./routes/driverAuthRoutes'));

// // Health check
// app.get('/api/health', (req, res) =>
//   res.json({ success: true, message: '🚍 BusNav API is running', timestamp: new Date().toISOString() })
// );

// // 404 handler
// app.use((req, res) =>
//   res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` })
// );

// // Global error handler (must be last)
// app.use(errorHandler);

// // ── Start Server ────────────────────────────────
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`\n🚍 BusNav Backend running on port ${PORT}`);
//   console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`🌐 Health: http://localhost:${PORT}/api/health\n`);
// });







// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');

// const connectDB = require('./config/db');
// const { errorHandler } = require('./middleware/error');

// // Load env vars
// dotenv.config();

// // Connect Database
// connectDB();

// const app = express();

// // ─────────────────────────────────────────────
// // Middleware
// // ─────────────────────────────────────────────
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// // ─────────────────────────────────────────────
// // Auth Routes
// // ─────────────────────────────────────────────
// app.use('/api/admin/auth', require('./routes/auth'));
// app.use('/api/student/auth', require('./routes/studentAuth'));
// app.use('/api/driver/auth', require('./routes/driverAuthRoutes'));

// // ─────────────────────────────────────────────
// // Main App Routes
// // ─────────────────────────────────────────────
// app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/student', require('./routes/studentRoutes'));
// app.use('/api/driver', require('./routes/driverRoutes'));

// // ─────────────────────────────────────────────
// // Health Check
// // ─────────────────────────────────────────────
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: '🚍 BusNav API is running',
//     timestamp: new Date().toISOString(),
//   });
// });

// app.get('/hello-test', (req, res) => {
//   res.json({
//     success: true,
//     message: 'HELLO TEST WORKING'
//   });
// });
// // ─────────────────────────────────────────────
// // 404 Handler
// // ─────────────────────────────────────────────
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found.`,
//   });
// });

// // ─────────────────────────────────────────────
// // Global Error Handler
// // ─────────────────────────────────────────────
// app.use(errorHandler);

// // ─────────────────────────────────────────────
// // Start Server
// // ─────────────────────────────────────────────
// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//   console.log(`🚍 BusNav Backend running on port ${PORT}`);
//   console.log(`🌐 http://localhost:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');

dotenv.config();

// Connect Database
connectDB();

const app = express();

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─────────────────────────────────────────────
// Auth Routes
// ─────────────────────────────────────────────
app.use('/api/admin/auth', require('./routes/auth'));
app.use('/api/student/auth', require('./routes/studentAuth'));
app.use('/api/driver/auth', require('./routes/driverAuthRoutes'));

// ─────────────────────────────────────────────
// Main App Routes
// ─────────────────────────────────────────────
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/driver', require('./routes/driverRoutes'));

// ─────────────────────────────────────────────
// Test Route
// ─────────────────────────────────────────────
app.get('/hello-test', (req, res) => {
  res.json({
    success: true,
    message: 'HELLO TEST WORKING'
  });
});

// ─────────────────────────────────────────────
// Health Route
// ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🚍 BusNav API is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/debug/students', async (req, res) => {
  const AdminStudent = require('./models/AdminStudent');  // ← change this line
  const students = await AdminStudent.find({}).select('name pickupStop assignedRoute status');
  res.json(students);
});

// ─────────────────────────────────────────────
// 404 Handler
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

// ─────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────
app.use(errorHandler);

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//   console.log(`🚍 BusNav Backend running on port ${PORT}`);
// });
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }
});

// Store live bus locations in memory
const busLocations = {};

io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  // Driver starts trip
  socket.on('driver:trip:start', ({ busId, routeId, driverId, busNumber }) => {
    busLocations[busId] = { status: 'live', routeId, driverId, busNumber };
    io.emit(`bus:${busId}:status`, { status: 'live', routeId });
    io.emit('admin:trip:started', { busId, routeId, busNumber });
    console.log(`🚌 Trip started: ${busNumber}`);
  });

  // Driver sends GPS location
  socket.on('driver:location', ({ busId, lat, lng, speed, busNumber }) => {
    console.log('📍 location update:', busNumber, lat, lng);
    if (busLocations[busId]) {
      busLocations[busId] = { ...busLocations[busId], lat, lng, speed, updatedAt: Date.now() };
    }
    // Send to students watching this bus
    io.emit(`bus:${busId}:location`, { lat, lng, speed, busNumber });
    // Send to admin watching all buses
    io.emit('admin:bus:update', { busId, lat, lng, speed, busNumber });
  });

  // Driver marks a stop reached
  socket.on('driver:stop:reached', ({ busId, stopName, stopIndex }) => {
    io.emit(`bus:${busId}:stop`, { stopName, stopIndex });
    io.emit('admin:stop:update', { busId, stopName, stopIndex });
  });

  // Driver ends trip
  socket.on('driver:trip:end', ({ busId, busNumber }) => {
    delete busLocations[busId];
    io.emit(`bus:${busId}:status`, { status: 'idle' });
    io.emit('admin:trip:ended', { busId, busNumber });
    console.log(`🏁 Trip ended: ${busNumber}`);
  });

  // Anyone can request current live buses
  socket.on('get:live:buses', () => {
    socket.emit('live:buses', busLocations);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚍 BusNav Backend running on port ${PORT}`);
});

