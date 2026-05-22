// // const BASE_URL = 'http://localhost:8000/api/admin/auth';

// // export const login = async ({ email, password, remember }) => {
// //   const res = await fetch(`${BASE_URL}/login`, {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     credentials: 'include',
// //     body: JSON.stringify({ email, password, remember }),
// //   });
// //   const data = await res.json();
// //   if (!res.ok) throw new Error(data.message || 'Login failed');
// //   return data;
// // };

// const BASE_URL = 'http://localhost:8000/api/admin/auth';
// const DRIVER_URL = 'http://localhost:8000/api/driver/auth';

// const handleResponse = async (res) => {
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || 'Something went wrong');
//   return data;
// };

// export const login = async ({ email, password, remember }) => {
//   const res = await fetch(`${BASE_URL}/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//     body: JSON.stringify({ email, password, remember }),
//   });
//   return handleResponse(res);
// };

// // ✅ Add these below your existing login function

// export const signup = async ({ name, email, password }) => {
//   const res = await fetch(`${BASE_URL}/signup`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name, email, password }),
//   });
//   return handleResponse(res);
// };

// export const forgotPassword = async ({ email }) => {
//   const res = await fetch(`${BASE_URL}/forgot-password`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email }),
//   });
//   return handleResponse(res);
// };

// export const verifyResetOtp = async ({ email, otp }) => {
//   const res = await fetch(`${BASE_URL}/verify-reset-otp`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, otp }),
//   });
//   return handleResponse(res);
// };

// export const resetPassword = async ({ resetToken, newPassword, confirmPassword }) => {
//   const res = await fetch(`${BASE_URL}/reset-password`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ resetToken, newPassword, confirmPassword }),
//   });
//   return handleResponse(res);
// };

// export const resendOtp = async ({ email, purpose }) => {
//   const res = await fetch(`${BASE_URL}/resend-otp`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, purpose }),
//   });
//   return handleResponse(res);
// };


// export const driverSignup = async ({ name, email, driverId, phone, password }) => {
//   const res = await fetch(`${DRIVER_URL}/signup`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name, email, driverId, phone, password }),
//   });
//   return handleResponse(res);
// };

// export const driverVerifyEmail = async ({ email, otp }) => {
//   const res = await fetch(`${DRIVER_URL}/verify-email`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, otp }),
//   });
//   return handleResponse(res);
// };

// export const driverLogin = async ({ identifier, password, remember }) => {
//   const res = await fetch(`${DRIVER_URL}/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//     body: JSON.stringify({ identifier, password, remember }),
//   });
//   return handleResponse(res);
// };

// export const driverForgotPassword = async ({ email }) => {
//   const res = await fetch(`${DRIVER_URL}/forgot-password`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email }),
//   });
//   return handleResponse(res);
// };

// export const driverVerifyResetOtp = async ({ email, otp }) => {
//   const res = await fetch(`${DRIVER_URL}/verify-reset-otp`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, otp }),
//   });
//   return handleResponse(res);
// };

// export const driverResetPassword = async ({ resetToken, newPassword, confirmPassword }) => {
//   const res = await fetch(`${DRIVER_URL}/reset-password`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ resetToken, newPassword, confirmPassword }),
//   });
//   return handleResponse(res);
// };

// export const driverResendOtp = async ({ email, purpose }) => {
//   const res = await fetch(`${DRIVER_URL}/resend-otp`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, purpose }),
//   });
//   return handleResponse(res);
// };

const BASE_URL = 'http://localhost:8000/api/admin/auth';
const DRIVER_URL = 'http://localhost:8000/api/driver/auth';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// ── ADMIN ──────────────────────────────────────────────────────────────────

export const login = async ({ email, password, remember }) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password, remember }),
  });
  const data = await handleResponse(res);
  if (data.token) localStorage.setItem('adminToken', data.token);  // ← ADD
  return data;
};

export const signup = async ({ name, email, password }) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
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
  return handleResponse(res);
};

export const resetPassword = async ({ resetToken, newPassword, confirmPassword }) => {
  const res = await fetch(`${BASE_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetToken, newPassword, confirmPassword }),
  });
  return handleResponse(res);
};

export const resendOtp = async ({ email, purpose }) => {
  const res = await fetch(`${BASE_URL}/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, purpose }),
  });
  return handleResponse(res);
};

// ── DRIVER ─────────────────────────────────────────────────────────────────

export const driverSignup = async ({ name, email, driverId, phone, password }) => {
  const res = await fetch(`${DRIVER_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, driverId, phone, password }),
  });
  return handleResponse(res);
};

export const driverVerifyEmail = async ({ email, otp }) => {
  const res = await fetch(`${DRIVER_URL}/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  const data = await handleResponse(res);
  if (data.token) localStorage.setItem('driverToken', data.token);  // ← ADD
  return data;
};

export const driverLogin = async ({ identifier, password, remember }) => {
  const res = await fetch(`${DRIVER_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ identifier, password, remember }),
  });
  const data = await handleResponse(res);
  if (data.token) localStorage.setItem('driverToken', data.token);  // ← ADD
  return data;
};

export const driverForgotPassword = async ({ email }) => {
  const res = await fetch(`${DRIVER_URL}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
};

export const driverVerifyResetOtp = async ({ email, otp }) => {
  const res = await fetch(`${DRIVER_URL}/verify-reset-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(res);
};

export const driverResetPassword = async ({ resetToken, newPassword, confirmPassword }) => {
  const res = await fetch(`${DRIVER_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetToken, newPassword, confirmPassword }),
  });
  return handleResponse(res);
};

export const driverResendOtp = async ({ email, purpose }) => {
  const res = await fetch(`${DRIVER_URL}/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, purpose }),
  });
  return handleResponse(res);
};