import DriverActivity from '../models/DriverActivity.js';

export const logDriverActivity = async (driverId, type, text, dot = '#16a34a') => {
  try {
    await DriverActivity.create({ driver: driverId, type, text, dot });
  } catch (err) {
    console.error('Failed to log driver activity:', err.message);
  }
};