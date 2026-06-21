// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// const request = async (endpoint, options = {}) => {
//   const token = localStorage.getItem('adminToken');
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...options.headers,
//     },
//     credentials: 'include',
//     ...options,
//     body: options.body ? JSON.stringify(options.body) : undefined,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || 'Something went wrong.');
//   return data;
// };

// // ── BUSES ──────────────────────────────────────────────────
// export const getBuses   = ()       => request('/admin/buses');
// export const createBus  = (body)   => request('/admin/buses', { method: 'POST', body });
// export const updateBus  = (id, body) => request(`/admin/buses/${id}`, { method: 'PUT', body });
// export const deleteBus  = (id)     => request(`/admin/buses/${id}`, { method: 'DELETE' });

// // ── ROUTES ─────────────────────────────────────────────────
// export const getRoutes   = ()        => request('/admin/routes');
// export const createRoute = (body)    => request('/admin/routes', { method: 'POST', body });
// export const updateRoute = (id, body)=> request(`/admin/routes/${id}`, { method: 'PUT', body });
// export const deleteRoute = (id)      => request(`/admin/routes/${id}`, { method: 'DELETE' });

// // ── STUDENTS ───────────────────────────────────────────────
// export const getAdminStudents   = ()        => request('/admin/students');
// export const createAdminStudent = (body)    => request('/admin/students', { method: 'POST', body });
// export const updateAdminStudent = (id, body)=> request(`/admin/students/${id}`, { method: 'PUT', body });
// export const deleteAdminStudent = (id)      => request(`/admin/students/${id}`, { method: 'DELETE' });

// // ── DRIVERS ────────────────────────────────────────────────
// export const getAdminDrivers   = ()        => request('/admin/drivers');
// export const createAdminDriver = (body)    => request('/admin/drivers', { method: 'POST', body });
// export const updateAdminDriver = (id, body)=> request(`/admin/drivers/${id}`, { method: 'PUT', body });
// export const deleteAdminDriver = (id)      => request(`/admin/drivers/${id}`, { method: 'DELETE' });

// // ── NOTIFICATIONS ──────────────────────────────────────────
// export const getAdminNotifications   = ()     => request('/admin/notifications');
// export const createAdminNotification = (body) => request('/admin/notifications', { method: 'POST', body });
// export const deleteAdminNotification = (id)   => request(`/admin/notifications/${id}`, { method: 'DELETE' });

// // ── TRIPS ──────────────────────────────────────────────
// export const getTrips   = (date, busId) => {
//   const params = new URLSearchParams();
//   if (date)  params.append('date',  date);
//   if (busId) params.append('busId', busId);
//   return request(`/admin/trips?${params.toString()}`);
// };
// export const createTrip = (body)    => request('/admin/trips', { method: 'POST', body });
// export const updateTrip = (id, body)=> request(`/admin/trips/${id}`, { method: 'PUT', body });
// export const deleteTrip = (id)      => request(`/admin/trips/${id}`, { method: 'DELETE' });

// //export const getAdminProfile = () => request('/admin/profile');
// //export const updateAdminProfile = (body) => request('/admin/profile', { method: 'PUT', body });



// // GET ADMIN PROFILE
// export const getAdminProfile = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/auth/profile`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
//       },
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
//     return data;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// // UPDATE ADMIN PROFILE
// export const updateAdminProfile = async (body) => {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/auth/profile`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
//       },
//       body: JSON.stringify(body),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Failed to update profile');
//     return data;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// // CHANGE PASSWORD
// // export const changeAdminPassword = async (body) => {
// //   try {
// //     //const response = await fetch(`${BASE_URL}/admin/change-password`, {
// //     // CORRECT:
// //     const response = await fetch(`${BASE_URL}/admin/change-password`, {
// //       method: 'PUT',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
// //       },
// //       body: JSON.stringify(body),
// //     });
// //     const data = await response.json();
// //     if (!response.ok) throw new Error(data.message || 'Failed to change password');
// //     return data;
// //   } catch (err) {
// //     throw new Error(err.message);
// //   }
// // };

// // CHANGE PASSWORD
// export const changeAdminPassword = async (body) => {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/auth/change-password`, {  // ← /auth/ added
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
//       },
//       body: JSON.stringify(body),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || 'Failed to change password');
//     return data;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// adminService.js
import { getSession } from '../pages/AdminLogin'; // ← adjust path if needed

//const getSession = () => localStorage.getItem('adminToken');

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const request = async (endpoint, options = {}) => {
  const token = getSession(); // ← was localStorage.getItem('adminToken')
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: 'include',
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong.');
  return data;
};

// ── BUSES ──────────────────────────────────────────────────
export const getBuses   = ()         => request('/admin/buses');
export const createBus  = (body)     => request('/admin/buses', { method: 'POST', body });
export const updateBus  = (id, body) => request(`/admin/buses/${id}`, { method: 'PUT', body });
export const deleteBus  = (id)       => request(`/admin/buses/${id}`, { method: 'DELETE' });

// ── ROUTES ─────────────────────────────────────────────────
export const getRoutes   = ()         => request('/admin/routes');
export const createRoute = (body)     => request('/admin/routes', { method: 'POST', body });
export const updateRoute = (id, body) => request(`/admin/routes/${id}`, { method: 'PUT', body });
export const deleteRoute = (id)       => request(`/admin/routes/${id}`, { method: 'DELETE' });

// ── STUDENTS ───────────────────────────────────────────────
export const getAdminStudents   = ()         => request('/admin/students');
export const createAdminStudent = (body)     => request('/admin/students', { method: 'POST', body });
export const updateAdminStudent = (id, body) => request(`/admin/students/${id}`, { method: 'PUT', body });
export const deleteAdminStudent = (id)       => request(`/admin/students/${id}`, { method: 'DELETE' });

// ── DRIVERS ────────────────────────────────────────────────
export const getAdminDrivers   = ()         => request('/admin/drivers');
export const createAdminDriver = (body)     => request('/admin/drivers', { method: 'POST', body });
export const updateAdminDriver = (id, body) => request(`/admin/drivers/${id}`, { method: 'PUT', body });
export const deleteAdminDriver = (id)       => request(`/admin/drivers/${id}`, { method: 'DELETE' });

// ── NOTIFICATIONS ──────────────────────────────────────────
//export const getAdminNotifications   = ()     => request('/admin/notifications');
//export const createAdminNotification = (body) => request('/admin/notifications', { method: 'POST', body });
//export const deleteAdminNotification = (id)   => request(`/admin/notifications/${id}`, { method: 'DELETE' });

// ── NOTIFICATIONS ──────────────────────────────────────────
export const getAdminNotifications   = ()     => request('/admin/notifications');
export const createAdminNotification = (body) => request('/admin/notifications', { method: 'POST', body });
export const deleteAdminNotification = (id)   => request(`/admin/notifications/${id}`, { method: 'DELETE' });
export const markAdminNotifRead      = (id)   => request(`/admin/notifications/${id}/read`, { method: 'PATCH' });

// ── TRIPS ──────────────────────────────────────────────────
export const getTrips = (date, busId) => {
  const params = new URLSearchParams();
  if (date)  params.append('date',  date);
  if (busId) params.append('busId', busId);
  return request(`/admin/trips?${params.toString()}`);
};
export const createTrip = (body)     => request('/admin/trips', { method: 'POST', body });
export const updateTrip = (id, body) => request(`/admin/trips/${id}`, { method: 'PUT', body });
export const deleteTrip = (id)       => request(`/admin/trips/${id}`, { method: 'DELETE' });

// ── ANALYTICS ──────────────────────────────────────────────
export const getAdminAnalytics = () => request('/admin/analytics');

// ── ADMIN PROFILE ──────────────────────────────────────────
export const getAdminProfile = async () => {
  try {
    const response = await fetch(`${BASE_URL}/admin/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getSession()}`, // ← fixed
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateAdminProfile = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getSession()}`, // ← fixed
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update profile');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

// ── CHANGE PASSWORD ────────────────────────────────────────
export const changeAdminPassword = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getSession()}`, // ← fixed
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to change password');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const toggleAdmin2FA = () =>
  request('/admin/toggle-2fa', { method: 'PUT' });

// export const getRecentActivity = () =>
//   apiFetch('/admin/activity'); // adjust to however your other functions call the base API helper

// ── ACTIVITY ───────────────────────────────────────────────
export const getRecentActivity = () => request('/admin/activity');

// export const getAdminActivity = async () => {
//   const token = localStorage.getItem('adminToken'); // match whatever key you use
//   const res = await fetch('/api/admin/activity', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error('Failed to fetch activity');
//   return res.json();
// };
export const getAdminActivity = async () => {
  const token = localStorage.getItem('adminToken');
  const res = await fetch('http://localhost:8000/api/admin/activity', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch activity');
  return res.json();
};