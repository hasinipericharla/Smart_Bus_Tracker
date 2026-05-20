// src/services/studentAuthService.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong.');
  return data;
};

const saveToken  = (t) => t && localStorage.setItem('studentToken', t);
const getToken   = ()  => localStorage.getItem('studentToken');
const clearToken = ()  => localStorage.removeItem('studentToken');
const authHeaders = () => { const t = getToken(); return t ? { Authorization: `Bearer ${t}` } : {}; };

// signup → { success, message, email }
export const signup = ({ name, email, studentId, password }) =>
  request('/student/auth/signup', { method: 'POST', body: { name, email, studentId, password } });

// verifyEmail → issues JWT cookie + { success, token, student }
export const verifyEmail = async ({ email, otp }) => {
  const data = await request('/student/auth/verify-email', { method: 'POST', body: { email, otp } });
  saveToken(data.token);
  return data;
};

// resendOtp → purpose: 'email_verification' | 'password_reset'
export const resendOtp = ({ email, purpose }) =>
  request('/student/auth/resend-otp', { method: 'POST', body: { email, purpose } });

// login → identifier = studentId OR email
export const login = async ({ identifier, password, remember }) => {
  const data = await request('/student/auth/login', { method: 'POST', body: { identifier, password, remember } });
  saveToken(data.token);
  return data;
};

export const forgotPassword = ({ email }) =>
  request('/student/auth/forgot-password', { method: 'POST', body: { email } });

export const verifyResetOtp = async ({ email, otp }) => {
  const data = await request('/student/auth/verify-reset-otp', { method: 'POST', body: { email, otp } });
  if (data.resetToken) sessionStorage.setItem('studentResetToken', data.resetToken);
  return data;
};

export const resetPassword = async ({ newPassword, confirmPassword }) => {
  const resetToken = sessionStorage.getItem('studentResetToken');
  if (!resetToken) throw new Error('Reset session expired. Please start over.');
  const data = await request('/student/auth/reset-password', {
    method: 'POST',
    body: { resetToken, newPassword, confirmPassword },
  });
  sessionStorage.removeItem('studentResetToken');
  return data;
};

export const logout = async () => {
  try { await request('/student/auth/logout', { method: 'POST', headers: authHeaders() }); }
  finally { clearToken(); }
};

export const getMe = () => request('/student/auth/me', { headers: authHeaders() });

export { getToken, clearToken };