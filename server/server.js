const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ─────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── Routes ─────────────────────────────────────
app.use('/api/admin/auth', require('./routes/auth'));
app.use('/api/student/auth', require('./routes/studentAuth'));
// Add this line alongside your admin routes
app.use('/api/driver/auth', require('./routes/driverAuthRoutes'));

// Health check
app.get('/api/health', (req, res) =>
  res.json({ success: true, message: '🚍 BusNav API is running', timestamp: new Date().toISOString() })
);

// 404 handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` })
);

// Global error handler (must be last)
app.use(errorHandler);

// ── Start Server ────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚍 BusNav Backend running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health\n`);
});
