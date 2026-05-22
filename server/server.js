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
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚍 BusNav Backend running on port ${PORT}`);
});