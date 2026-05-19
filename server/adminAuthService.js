// src/services/adminAuthService.js
// Drop this file in your React project's src/services/ folder
// const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
// ── Helper ───────────────────────────────────────
const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include', // Send cookies with every request
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  return data;
};

// Save token to localStorage (if not using cookie-only auth)
const saveToken = (token) => token && localStorage.setItem('adminToken', token);
const getToken = () => localStorage.getItem('adminToken');
const clearToken = () => localStorage.removeItem('adminToken');

// ── Auth Headers (for Bearer token fallback) ─────
const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ────────────────────────────────────────────────────────────────
// SIGN UP  →  POST /api/admin/auth/signup
// ────────────────────────────────────────────────────────────────
export const signup = async ({ name, email, password }) => {
  const data = await request('/admin/auth/signup', {
    method: 'POST',
    body: { name, email, password },
  });
  return data; // { success, message, email }
};

// ────────────────────────────────────────────────────────────────
// VERIFY EMAIL OTP  →  POST /api/admin/auth/verify-email
// ────────────────────────────────────────────────────────────────
export const verifyEmail = async ({ email, otp }) => {
  const data = await request('/admin/auth/verify-email', {
    method: 'POST',
    body: { email, otp },
  });
  saveToken(data.token);
  return data; // { success, token, admin }
};

// ────────────────────────────────────────────────────────────────
// RESEND OTP  →  POST /api/admin/auth/resend-otp
// purpose: 'email_verification' | 'password_reset'
// ────────────────────────────────────────────────────────────────
export const resendOtp = async ({ email, purpose }) => {
  return await request('/admin/auth/resend-otp', {
    method: 'POST',
    body: { email, purpose },
  });
};

// ────────────────────────────────────────────────────────────────
// LOGIN  →  POST /api/admin/auth/login
// ────────────────────────────────────────────────────────────────
export const login = async ({ email, password, remember }) => {
  const data = await request('/admin/auth/login', {
    method: 'POST',
    body: { email, password, remember },
  });
  saveToken(data.token);
  return data; // { success, token, admin } OR { requiresVerification: true, email }
};

// ────────────────────────────────────────────────────────────────
// FORGOT PASSWORD  →  POST /api/admin/auth/forgot-password
// ────────────────────────────────────────────────────────────────
export const forgotPassword = async ({ email }) => {
  return await request('/admin/auth/forgot-password', {
    method: 'POST',
    body: { email },
  });
};

// ────────────────────────────────────────────────────────────────
// VERIFY RESET OTP  →  POST /api/admin/auth/verify-reset-otp
// ────────────────────────────────────────────────────────────────
export const verifyResetOtp = async ({ email, otp }) => {
  const data = await request('/admin/auth/verify-reset-otp', {
    method: 'POST',
    body: { email, otp },
  });
  // Store resetToken temporarily for the password reset step
  if (data.resetToken) sessionStorage.setItem('resetToken', data.resetToken);
  return data;
};

// ────────────────────────────────────────────────────────────────
// RESET PASSWORD  →  POST /api/admin/auth/reset-password
// ────────────────────────────────────────────────────────────────
export const resetPassword = async ({ newPassword, confirmPassword }) => {
  const resetToken = sessionStorage.getItem('resetToken');
  if (!resetToken) throw new Error('Reset session expired. Please start over.');

  const data = await request('/admin/auth/reset-password', {
    method: 'POST',
    body: { resetToken, newPassword, confirmPassword },
  });

  sessionStorage.removeItem('resetToken');
  return data;
};

// ────────────────────────────────────────────────────────────────
// LOGOUT  →  POST /api/admin/auth/logout
// ────────────────────────────────────────────────────────────────
export const logout = async () => {
  try {
    await request('/admin/auth/logout', {
      method: 'POST',
      headers: authHeaders(),
    });
  } finally {
    clearToken();
  }
};

// ────────────────────────────────────────────────────────────────
// GET ME  →  GET /api/admin/auth/me
// ────────────────────────────────────────────────────────────────
export const getMe = async () => {
  return await request('/admin/auth/me', {
    headers: authHeaders(),
  });
};

export { getToken, clearToken };
