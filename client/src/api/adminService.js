const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken');
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
export const getBuses   = ()       => request('/admin/buses');
export const createBus  = (body)   => request('/admin/buses', { method: 'POST', body });
export const updateBus  = (id, body) => request(`/admin/buses/${id}`, { method: 'PUT', body });
export const deleteBus  = (id)     => request(`/admin/buses/${id}`, { method: 'DELETE' });

// ── ROUTES ─────────────────────────────────────────────────
export const getRoutes   = ()        => request('/admin/routes');
export const createRoute = (body)    => request('/admin/routes', { method: 'POST', body });
export const updateRoute = (id, body)=> request(`/admin/routes/${id}`, { method: 'PUT', body });
export const deleteRoute = (id)      => request(`/admin/routes/${id}`, { method: 'DELETE' });

// ── STUDENTS ───────────────────────────────────────────────
export const getAdminStudents   = ()        => request('/admin/students');
export const createAdminStudent = (body)    => request('/admin/students', { method: 'POST', body });
export const updateAdminStudent = (id, body)=> request(`/admin/students/${id}`, { method: 'PUT', body });
export const deleteAdminStudent = (id)      => request(`/admin/students/${id}`, { method: 'DELETE' });

// ── DRIVERS ────────────────────────────────────────────────
export const getAdminDrivers   = ()        => request('/admin/drivers');
export const createAdminDriver = (body)    => request('/admin/drivers', { method: 'POST', body });
export const updateAdminDriver = (id, body)=> request(`/admin/drivers/${id}`, { method: 'PUT', body });
export const deleteAdminDriver = (id)      => request(`/admin/drivers/${id}`, { method: 'DELETE' });

// ── NOTIFICATIONS ──────────────────────────────────────────
export const getAdminNotifications   = ()     => request('/admin/notifications');
export const createAdminNotification = (body) => request('/admin/notifications', { method: 'POST', body });
export const deleteAdminNotification = (id)   => request(`/admin/notifications/${id}`, { method: 'DELETE' });

// ── TRIPS ──────────────────────────────────────────────
export const getTrips   = (date, busId) => {
  const params = new URLSearchParams();
  if (date)  params.append('date',  date);
  if (busId) params.append('busId', busId);
  return request(`/admin/trips?${params.toString()}`);
};
export const createTrip = (body)    => request('/admin/trips', { method: 'POST', body });
export const updateTrip = (id, body)=> request(`/admin/trips/${id}`, { method: 'PUT', body });
export const deleteTrip = (id)      => request(`/admin/trips/${id}`, { method: 'DELETE' });