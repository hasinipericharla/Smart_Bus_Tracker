const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('driverToken');
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong.');
  return data;
};

export const getMyDriverInfo  = ()   => request('/driver/my-info');
export const getMyRoutes      = ()   => request('/driver/routes');
export const getNotifications = ()   => request('/driver/notifications');
export const markNotifRead    = (id) =>
  request(`/driver/notifications/${id}/read`, { method: 'PATCH' });