const BASE_URL = 'http://localhost:8000/api/student/auth';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

export const signup = async ({ name, email, studentId, password }) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, studentId, password }),
  });
  return handleResponse(res);
};

export const verifyEmail = async ({ email, otp }) => {
  const res = await fetch(`${BASE_URL}/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(res);
};

// export const login = async ({ identifier, password, remember }) => {
//   const res = await fetch(`${BASE_URL}/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//     body: JSON.stringify({ identifier, password, remember }),
//   });
//   return handleResponse(res);
// };

export function getStudentDeviceId() {
  return localStorage.getItem('student_device_id') || null;
}
export function setStudentDeviceId(id) {
  localStorage.setItem('student_device_id', id);
}

export const login = async ({ identifier, password, remember }) => {
  const deviceId = getStudentDeviceId();
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ identifier, password, remember, deviceId }),
  });
  return handleResponse(res);
};

export const verifyLoginOtp = async ({ email, otp }) => {
  const deviceId = getStudentDeviceId();
  const res = await fetch(`${BASE_URL}/verify-login-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, otp, deviceId }),
  });
  const data = await handleResponse(res);
  if (data.deviceId) setStudentDeviceId(data.deviceId);
  return data;
};

export const forgotPassword = async ({ email }) => {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
};

export const verifyResetOtp = async ({ email, otp }) => {
  const res = await fetch(`${BASE_URL}/verify-reset-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  const data = await handleResponse(res);
  if (data.resetToken) sessionStorage.setItem('studentResetToken', data.resetToken);
  return data;
};

export const resetPassword = async ({ newPassword, confirmPassword }) => {
  const resetToken = sessionStorage.getItem('studentResetToken');
  if (!resetToken) throw new Error('Reset session expired. Please start over.');
  const res = await fetch(`${BASE_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetToken, newPassword, confirmPassword }),
  });
  const data = await handleResponse(res);
  sessionStorage.removeItem('studentResetToken');
  return data;
};

export const resendOtp = async ({ email, purpose }) => {
  const res = await fetch(`${BASE_URL}/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, purpose }),
  });
  return handleResponse(res);
};