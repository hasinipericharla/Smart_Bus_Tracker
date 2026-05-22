// // existing
// app.use('/api/admin/auth',   require('./routes/auth'));
// app.use('/api/student/auth', require('./routes/studentAuth'));
// app.use('/api/driver/auth',  require('./routes/driverAuthRoutes'));

// // ADD THESE THREE:
// app.use('/api/admin',   require('./routes/adminRoutes'));
// app.use('/api/student', require('./routes/studentRoutes'));
// app.use('/api/driver',  require('./routes/driverRoutes'));
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Auth routes ──────────────────────────────────
app.use('/api/admin/auth',   require('./routes/auth'));
app.use('/api/student/auth', require('./routes/studentAuth'));
app.use('/api/driver/auth',  require('./routes/driverAuthRoutes'));

// ── Management routes ────────────────────────────
app.use('/api/admin',   require('./routes/adminRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/driver',  require('./routes/driverRoutes'));

app.get('/api/health', (req, res) =>
  res.json({ success: true, message: '🚍 BusNav API is running' })
);

app.use((req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` })
);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚍 BusNav Backend running on port ${PORT}`);
});