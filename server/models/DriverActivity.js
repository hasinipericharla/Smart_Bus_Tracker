import mongoose from 'mongoose';

const driverActivitySchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  type:   { type: String, enum: ['trip_start', 'trip_end', 'stop_reached', 'status_change', 'login'], required: true },
  text:   { type: String, required: true },
  dot:    { type: String, default: '#16a34a' }, // color for the UI dot
}, { timestamps: true });

export default mongoose.model('DriverActivity', driverActivitySchema);