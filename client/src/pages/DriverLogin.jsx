// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// const inputStyle = {
//   width: '100%', padding: '11px 40px 11px 14px',
//   border: '1.5px solid #D8E2EE', borderRadius: '10px',
//   fontSize: '14px', fontFamily: "'Nunito', sans-serif",
//   color: '#1B2B4B', background: '#F7FAFD', outline: 'none',
//   boxSizing: 'border-box'
// };
// const focusStyle = (e) => {
//   e.target.style.borderColor = '#1B2B4B';
//   e.target.style.boxShadow = '0 0 0 3px rgba(27,43,75,0.12)';
//   e.target.style.background = '#fff';
// };
// const blurStyle = (e) => {
//   e.target.style.borderColor = '#D8E2EE';
//   e.target.style.boxShadow = 'none';
//   e.target.style.background = '#F7FAFD';
// };
// const labelStyle = {
//   fontSize: '12px', fontWeight: '700', color: '#2D4A7A',
//   letterSpacing: '0.04em', textTransform: 'uppercase'
// };

// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
// const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// const OTP_EXPIRY = 300;
// const RESEND_WAIT = 30;

// export default function DriverLogin() {
//   const navigate = useNavigate();

//   const [driverId, setDriverId]       = useState('');
//   const [password, setPassword]       = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember]       = useState(false);
//   const [error, setError]             = useState('');

//   // forgot password modal
//   const [showForgot, setShowForgot]   = useState(false);
//   const [fpStep, setFpStep]           = useState('email'); // 'email' | 'otp' | 'reset' | 'done'
//   const [fpEmail, setFpEmail]         = useState('');
//   const [fpGenerated, setFpGenerated] = useState('');
//   const [fpExpiry, setFpExpiry]       = useState(null);
//   const [fpTimeLeft, setFpTimeLeft]   = useState(OTP_EXPIRY);
//   const [fpResend, setFpResend]       = useState(0);
//   const [fpOtpDigits, setFpOtpDigits] = useState(['','','','','','']);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNew, setConfirmNew]   = useState('');
//   const [showNew, setShowNew]         = useState(false);
//   const [showConfirmNew, setShowConfirmNew] = useState(false);
//   const [fpError, setFpError]         = useState('');
//   const fpOtpRefs = useRef([]);

//   // OTP countdown
//   useEffect(() => {
//     if (fpStep !== 'otp' || !fpExpiry) return;
//     const interval = setInterval(() => {
//       const left = Math.max(0, Math.floor((fpExpiry - Date.now()) / 1000));
//       setFpTimeLeft(left);
//       if (left === 0) clearInterval(interval);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [fpStep, fpExpiry]);

//   // resend cooldown
//   useEffect(() => {
//     if (fpResend === 0) return;
//     const t = setTimeout(() => setFpResend(c => c - 1), 1000);
//     return () => clearTimeout(t);
//   }, [fpResend]);

//   const formatTime = (s) =>
//     `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

//   const closeModal = () => {
//     setShowForgot(false);
//     setFpStep('email'); setFpEmail(''); setFpError('');
//     setFpOtpDigits(['','','','','','']);
//     setNewPassword(''); setConfirmNew('');
//   };

//   const handleFpSendOtp = () => {
//     if (!fpEmail) { setFpError('Please enter your email.'); return; }
//     if (!validateEmail(fpEmail)) { setFpError('Please enter a valid email address.'); return; }
//     const otp = generateOTP();
//     setFpGenerated(otp);
//     setFpExpiry(Date.now() + OTP_EXPIRY * 1000);
//     setFpTimeLeft(OTP_EXPIRY);
//     setFpOtpDigits(['','','','','','']);
//     setFpError('');
//     setFpResend(RESEND_WAIT);
//     // replace with API call when backend is ready:
//     // await fetch('/api/forgot-password', { method: 'POST', body: JSON.stringify({ email: fpEmail, otp }) })
//     console.log(`%c[DEV] Password reset OTP for ${fpEmail}: ${otp}`, 'color: #1B2B4B; font-size: 16px; font-weight: bold;');
//     setFpStep('otp');
//     setTimeout(() => fpOtpRefs.current[0]?.focus(), 100);
//   };

//   const handleFpOtpChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;
//     const digits = [...fpOtpDigits];
//     digits[index] = value.slice(-1);
//     setFpOtpDigits(digits);
//     if (value && index < 5) fpOtpRefs.current[index + 1]?.focus();
//   };
//   const handleFpOtpKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !fpOtpDigits[index] && index > 0)
//       fpOtpRefs.current[index - 1]?.focus();
//   };
//   const handleFpOtpPaste = (e) => {
//     e.preventDefault();
//     const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
//     const digits = pasted.split('').concat(Array(6).fill('')).slice(0, 6);
//     setFpOtpDigits(digits);
//     const nextEmpty = digits.findIndex(d => d === '');
//     fpOtpRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
//   };

//   const handleFpVerifyOtp = () => {
//     if (fpTimeLeft === 0) { setFpError('OTP expired. Please resend.'); return; }
//     const entered = fpOtpDigits.join('');
//     if (entered.length < 6) { setFpError('Please enter the full 6-digit code.'); return; }
//     if (entered !== fpGenerated) { setFpError('Incorrect OTP. Please try again.'); return; }
//     setFpError('');
//     setFpStep('reset');
//   };

//   const handleFpResend = () => {
//     if (fpResend > 0) return;
//     const otp = generateOTP();
//     setFpGenerated(otp);
//     setFpExpiry(Date.now() + OTP_EXPIRY * 1000);
//     setFpTimeLeft(OTP_EXPIRY);
//     setFpOtpDigits(['','','','','','']);
//     setFpError('');
//     setFpResend(RESEND_WAIT);
//     console.log(`%c[DEV] Resent reset OTP for ${fpEmail}: ${otp}`, 'color: #1B2B4B; font-size: 16px; font-weight: bold;');
//     setTimeout(() => fpOtpRefs.current[0]?.focus(), 100);
//   };

//   const handleFpReset = () => {
//     if (!newPassword || !confirmNew) { setFpError('Please fill in both fields.'); return; }
//     if (newPassword.length < 6) { setFpError('Password must be at least 6 characters.'); return; }
//     if (newPassword !== confirmNew) { setFpError('Passwords do not match.'); return; }
//     setFpError('');
//     // replace with API call when backend is ready:
//     // await fetch('/api/reset-password', { method: 'POST', body: JSON.stringify({ email: fpEmail, newPassword }) })
//     console.log(`%c[DEV] Password reset for ${fpEmail}`, 'color: #27A86E; font-size: 14px;');
//     setFpStep('done');
//     setTimeout(() => closeModal(), 2500);
//   };

//   const handleLogin = () => {
//     if (!driverId || !password) { setError('Please enter both Driver ID and Password.'); return; }
//     setError('');
//     navigate('/driver/dashboard');
//   };

//   return (
//     <>
//       {/* ── Forgot Password Modal ── */}
//       {showForgot && (
//         <div
//           onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
//           style={{
//             position: 'fixed', inset: 0, zIndex: 1000,
//             background: 'rgba(27,43,75,0.45)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             padding: '1rem', backdropFilter: 'blur(2px)'
//           }}>
//           <div style={{
//             background: '#fff', borderRadius: '20px',
//             boxShadow: '0 20px 60px rgba(27,43,75,0.18)',
//             width: '100%', maxWidth: '380px',
//             padding: '2rem 1.8rem',
//             display: 'flex', flexDirection: 'column', alignItems: 'center',
//             position: 'relative'
//           }}>
//             <button onClick={closeModal} style={{
//               position: 'absolute', top: '14px', right: '14px',
//               background: '#F0F4F8', border: 'none', borderRadius: '50%',
//               width: '30px', height: '30px', cursor: 'pointer',
//               fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
//               color: '#6B7E9B'
//             }}>✕</button>

//             {/* step: email */}
//             {fpStep === 'email' && (
//               <>
//                 <div style={{ fontSize: '32px', marginBottom: '0.8rem' }}>🔐</div>
//                 <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>Forgot Password?</h3>
//                 <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>
//                   Enter your registered email and we'll send a reset code
//                 </p>
//                 {fpError && <FpError msg={fpError} />}
//                 <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//                     <label htmlFor="fpEmail" style={labelStyle}>Email Address</label>
//                     <div style={{ position: 'relative' }}>
//                       <input id="fpEmail" type="email" placeholder="driver@busnav.com"
//                         value={fpEmail} onChange={e => setFpEmail(e.target.value)}
//                         onKeyDown={e => e.key === 'Enter' && handleFpSendOtp()}
//                         style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
//                       <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>📧</span>
//                     </div>
//                   </div>
//                   <ModalBtn onClick={handleFpSendOtp}>Send OTP</ModalBtn>
//                 </div>
//               </>
//             )}

//             {/* step: otp */}
//             {fpStep === 'otp' && (
//               <>
//                 <div style={{ fontSize: '32px', marginBottom: '0.8rem' }}>📬</div>
//                 <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>Check Your Email</h3>
//                 <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '0.3rem', textAlign: 'center' }}>We sent a reset code to</p>
//                 <p style={{ fontSize: '13px', fontWeight: '800', color: '#1B2B4B', marginBottom: '1.4rem' }}>{fpEmail}</p>
//                 {fpError && <FpError msg={fpError} />}
//                 <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                   <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }} onPaste={handleFpOtpPaste}>
//                     {fpOtpDigits.map((digit, i) => (
//                       <input key={i} ref={el => fpOtpRefs.current[i] = el}
//                         type="text" inputMode="numeric" maxLength={1} value={digit}
//                         onChange={e => handleFpOtpChange(i, e.target.value)}
//                         onKeyDown={e => handleFpOtpKeyDown(i, e)}
//                         style={{
//                           width: '42px', height: '50px', textAlign: 'center',
//                           fontSize: '20px', fontWeight: '800', fontFamily: "'Nunito', sans-serif",
//                           border: `2px solid ${digit ? '#1B2B4B' : '#D8E2EE'}`,
//                           borderRadius: '10px', outline: 'none',
//                           color: '#1B2B4B', background: digit ? '#F0F4FA' : '#F7FAFD',
//                           transition: 'all 0.15s'
//                         }}
//                         onFocus={e => { e.target.style.borderColor = '#1B2B4B'; e.target.style.boxShadow = '0 0 0 3px rgba(27,43,75,0.12)'; }}
//                         onBlur={e => { e.target.style.boxShadow = 'none'; if (!digit) e.target.style.borderColor = '#D8E2EE'; }}
//                       />
//                     ))}
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     {fpTimeLeft > 0
//                       ? <span style={{ fontSize: '12px', color: fpTimeLeft < 60 ? '#E74C3C' : '#8898A9', fontWeight: '700' }}>Expires in {formatTime(fpTimeLeft)}</span>
//                       : <span style={{ fontSize: '12px', color: '#E74C3C', fontWeight: '700' }}>Code expired</span>}
//                   </div>
//                   <ModalBtn onClick={handleFpVerifyOtp}>Verify Code</ModalBtn>
//                   <div style={{ textAlign: 'center' }}>
//                     {fpResend > 0
//                       ? <span style={{ fontSize: '12px', color: '#B8C8DA', fontWeight: '600' }}>Resend in {fpResend}s</span>
//                       : <span onClick={handleFpResend} style={{ fontSize: '12px', color: '#1B2B4B', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>Resend OTP</span>}
//                   </div>
//                   <button onClick={() => { setFpStep('email'); setFpError(''); }}
//                     style={{ background: 'none', border: 'none', fontSize: '12px', color: '#8898A9', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
//                     ← Use a different email
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* step: reset */}
//             {fpStep === 'reset' && (
//               <>
//                 <div style={{ fontSize: '32px', marginBottom: '0.8rem' }}>🔑</div>
//                 <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>Set New Password</h3>
//                 <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>
//                   Choose a strong password for your account
//                 </p>
//                 {fpError && <FpError msg={fpError} />}
//                 <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//                     <label htmlFor="newPass" style={labelStyle}>New Password</label>
//                     <div style={{ position: 'relative' }}>
//                       <input id="newPass" type={showNew ? 'text' : 'password'} placeholder="Min. 6 characters"
//                         value={newPassword} onChange={e => setNewPassword(e.target.value)}
//                         style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
//                       <span onClick={() => setShowNew(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9', cursor: 'pointer' }}>
//                         {showNew ? '🙈' : '👁️'}
//                       </span>
//                     </div>
//                   </div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//                     <label htmlFor="confirmNew" style={labelStyle}>Confirm Password</label>
//                     <div style={{ position: 'relative' }}>
//                       <input id="confirmNew" type={showConfirmNew ? 'text' : 'password'} placeholder="Re-enter password"
//                         value={confirmNew} onChange={e => setConfirmNew(e.target.value)}
//                         onKeyDown={e => e.key === 'Enter' && handleFpReset()}
//                         style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
//                       <span onClick={() => setShowConfirmNew(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9', cursor: 'pointer' }}>
//                         {showConfirmNew ? '🙈' : '👁️'}
//                       </span>
//                     </div>
//                   </div>
//                   <ModalBtn onClick={handleFpReset}>Reset Password</ModalBtn>
//                 </div>
//               </>
//             )}

//             {/* step: done */}
//             {fpStep === 'done' && (
//               <div style={{ textAlign: 'center', padding: '1rem 0' }}>
//                 <div style={{ fontSize: '40px', marginBottom: '0.8rem' }}>✅</div>
//                 <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.5rem' }}>Password Reset!</h3>
//                 <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600' }}>Your password has been updated. Closing…</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ── Driver Login Page ── */}
//       <div style={{
//         minHeight: '100vh', background: '#EEF2F7',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         fontFamily: "'Nunito', sans-serif", padding: '2rem'
//       }}>
//         <div style={{
//           background: '#fff', borderRadius: '24px',
//           boxShadow: '0 8px 40px rgba(27,43,75,0.10)',
//           width: '100%', maxWidth: '420px',
//           padding: '2.5rem 2.2rem 2rem',
//           display: 'flex', flexDirection: 'column', alignItems: 'center'
//         }}>
//           {/* Logo */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.3rem' }}>
//             <div style={{ width: '46px', height: '46px', background: '#1B2B4B', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🚍</div>
//             <div style={{ fontSize: '26px', fontWeight: '900', color: '#1B2B4B' }}>Bus<span style={{ color: '#F5A623' }}>Nav</span></div>
//           </div>

//           <p style={{ fontSize: '11px', color: '#6B7E9B', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '1.6rem' }}>Smart Transit · Real-time Tracking</p>

//           <div style={{ background: '#E8EDF5', color: '#2D4A7A', borderRadius: '50px', padding: '6px 18px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>🚌 Driver Portal</div>

//           <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>Welcome back, Driver</h2>
//           <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.8rem', textAlign: 'center' }}>Sign in to manage your trips & passengers</p>

//           <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
//             {error && (
//               <div style={{ background: '#FFF0F0', border: '1.5px solid #F5C6C6', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#C0392B', fontWeight: '700' }}>⚠️ {error}</div>
//             )}

//             {/* Driver ID */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//               <label htmlFor="driverId" style={labelStyle}>Driver ID</label>
//               <div style={{ position: 'relative' }}>
//                 <input id="driverId" type="text" placeholder="e.g. DRV2024001"
//                   value={driverId} onChange={e => setDriverId(e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && handleLogin()}
//                   style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
//                 <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: '#8898A9' }}>🚌</span>
//               </div>
//             </div>

//             {/* Password */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//               <label htmlFor="loginPassword" style={labelStyle}>Password</label>
//               <div style={{ position: 'relative' }}>
//                 <input id="loginPassword" type={showPassword ? 'text' : 'password'} placeholder="Enter your password"
//                   value={password} onChange={e => setPassword(e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && handleLogin()}
//                   style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
//                 <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: '#8898A9', cursor: 'pointer', userSelect: 'none' }}>
//                   {showPassword ? '🙈' : '👁️'}
//                 </span>
//               </div>
//             </div>

//             {/* Remember + Forgot */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-4px' }}>
//               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6B7E9B', fontWeight: '600', cursor: 'pointer' }}>
//                 <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
//                   style={{ accentColor: '#1B2B4B', width: '15px', height: '15px', cursor: 'pointer' }} />
//                 Keep me signed in
//               </label>
//               <span
//                 onClick={() => { setShowForgot(true); setFpStep('email'); setFpError(''); setFpEmail(''); }}
//                 style={{ fontSize: '12px', fontWeight: '700', color: '#1B2B4B', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
//                 Forgot password?
//               </span>
//             </div>

//             {/* Login Button */}
//             <button onClick={handleLogin}
//               onMouseEnter={e => e.currentTarget.style.background = '#F5A623'}
//               onMouseLeave={e => e.currentTarget.style.background = '#1B2B4B'}
//               onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
//               onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
//               style={{ width: '100%', padding: '13px 0', marginTop: '4px', background: '#1B2B4B', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '800', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'background 0.18s, transform 0.12s' }}>
//               Sign In as Driver
//             </button>

//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.2rem 0' }}>
//               <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
//               <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>don't have an account?</span>
//               <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
//             </div>

//             <button onClick={() => navigate('/driver/signup')}
//               onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.color = '#fff'; }}
//               onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; e.currentTarget.style.color = '#1B2B4B'; }}
//               onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
//               onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
//               style={{ width: '100%', padding: '11px 0', background: 'transparent', color: '#1B2B4B', border: '1.5px solid #D8E2EE', borderRadius: '12px', fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'all 0.18s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
//               ✦ Create Driver Account
//             </button>

//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.1rem 0' }}>
//               <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
//               <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>or go back</span>
//               <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
//             </div>

//             <button onClick={() => navigate('/')}
//               onMouseEnter={e => { e.currentTarget.style.background = '#EEF2F7'; e.currentTarget.style.borderColor = '#1B2B4B'; }}
//               onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; }}
//               style={{ width: '100%', padding: '11px 0', background: 'transparent', color: '#1B2B4B', border: '1.5px solid #D8E2EE', borderRadius: '12px', fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'all 0.18s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
//               ← Back to Role Selection
//             </button>
//           </div>

//           <div style={{ display: 'flex', gap: '8px', marginTop: '1.8rem' }}>
//             {['#1B2B4B', '#4D7BA3', '#F5A623', '#B8C8DA'].map((c, i) => (
//               <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function FpError({ msg }) {
//   return (
//     <div style={{ width: '100%', background: '#FFF0F0', border: '1.5px solid #F5C6C6', borderRadius: '10px', padding: '8px 12px', fontSize: '12px', color: '#C0392B', fontWeight: '700', marginBottom: '8px' }}>
//       ⚠️ {msg}
//     </div>
//   );
// }

// function ModalBtn({ onClick, children }) {
//   return (
//     <button onClick={onClick}
//       onMouseEnter={e => e.currentTarget.style.background = '#F5A623'}
//       onMouseLeave={e => e.currentTarget.style.background = '#1B2B4B'}
//       onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
//       onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
//       style={{ width: '100%', padding: '12px 0', background: '#1B2B4B', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '800', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'background 0.18s, transform 0.12s' }}>
//       {children}
//     </button>
//   );
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── shared styles ─────────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', padding: '11px 40px 11px 14px',
  border: '1.5px solid #D8E2EE', borderRadius: '10px',
  fontSize: '14px', fontFamily: "'Nunito', sans-serif",
  color: '#1B2B4B', background: '#F7FAFD', outline: 'none',
  boxSizing: 'border-box',
};
const focusStyle = (e) => {
  e.target.style.borderColor = '#F5A623';
  e.target.style.boxShadow = '0 0 0 3px rgba(245,166,35,0.12)';
  e.target.style.background = '#fff';
};
const blurStyle = (e) => {
  e.target.style.borderColor = '#D8E2EE';
  e.target.style.boxShadow = 'none';
  e.target.style.background = '#F7FAFD';
};
const labelStyle = {
  fontSize: '12px', fontWeight: '700', color: '#2D4A7A',
  letterSpacing: '0.04em', textTransform: 'uppercase',
};

export default function DriverLogin() {
  const navigate = useNavigate();

  // ── login state ──────────────────────────────────────────────────────────
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember]     = useState(false);
  const [error, setError]           = useState('');

  // ── forgot password state (admin-style full-page steps) ──────────────────
  const [showForgot, setShowForgot] = useState(false);
  const [step, setStep]             = useState(1); // 1:email 2:otp 3:newpass
  const [fpEmail, setFpEmail]       = useState('');
  const [otp, setOtp]               = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fpError, setFpError]       = useState('');
  const [fpSuccess, setFpSuccess]   = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    if (!fpEmail) { setFpError('Please enter your email address.'); return; }
    if (!/\S+@\S+\.\S+/.test(fpEmail)) { setFpError('Please enter a valid email address.'); return; }
    setFpError('');
    setFpSuccess(`OTP sent to ${fpEmail}`);
    setTimeout(() => setFpSuccess(''), 3000);
    startResendTimer();
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`dotp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0)
      document.getElementById(`dotp-${index - 1}`)?.focus();
  };

  const handleVerifyOtp = () => {
    if (otp.join('').length < 6) { setFpError('Please enter the complete 6-digit OTP.'); return; }
    setFpError('');
    setStep(3);
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) { setFpError('Please fill in both fields.'); return; }
    if (newPassword !== confirmPassword) { setFpError('Passwords do not match.'); return; }
    if (newPassword.length < 6) { setFpError('Password must be at least 6 characters.'); return; }
    setFpError('');
    setFpSuccess('Password reset successfully! Redirecting to login...');
    setTimeout(() => {
      setShowForgot(false);
      setStep(1); setFpEmail(''); setOtp(['','','','','','']);
      setNewPassword(''); setConfirmPassword(''); setFpSuccess('');
    }, 2000);
  };

  const openForgot = () => {
    setShowForgot(true);
    setStep(1); setFpEmail(''); setFpError(''); setFpSuccess('');
    setOtp(['','','','','','']); setNewPassword(''); setConfirmPassword('');
  };

  const handleLogin = () => {
    if (!identifier || !password) { setError('Please enter your Driver ID / Email and Password.'); return; }
    setError('');
    navigate('/driver/dashboard');
  };

  const stepTitles = ['Reset Password', 'Verify OTP', 'New Password'];
  const stepSubs = [
    'Enter your registered email to receive an OTP',
    `Enter the 6-digit code sent to ${fpEmail}`,
    'Set your new driver password',
  ];

  // ── FORGOT PASSWORD SCREEN ────────────────────────────────────────────────
  if (showForgot) {
    return (
      <div style={{
        minHeight: '100vh', background: '#EEF2F7',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Nunito', sans-serif", padding: '2rem',
      }}>
        <div style={{
          background: '#fff', borderRadius: '24px',
          boxShadow: '0 8px 40px rgba(27,43,75,0.10)',
          width: '100%', maxWidth: '420px',
          padding: '2.5rem 2.2rem 2rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.3rem' }}>
            <div style={{ width: '46px', height: '46px', background: '#1B2B4B', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🚍</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#1B2B4B' }}>Bus<span style={{ color: '#F5A623' }}>Nav</span></div>
          </div>
          <p style={{ fontSize: '11px', color: '#6B7E9B', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '1.6rem' }}>Smart Transit · Real-time Tracking</p>

          <div style={{ background: '#E8EDF5', color: '#2D4A7A', borderRadius: '50px', padding: '6px 18px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>🔐 Password Recovery</div>

          {/* Step Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.8rem', width: '100%', maxWidth: '260px' }}>
            {[1, 2, 3].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: step >= s ? '#1B2B4B' : '#E8EDF5',
                  color: step >= s ? '#fff' : '#8898A9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: '800', flexShrink: 0,
                  border: step === s ? '2px solid #F5A623' : '2px solid transparent',
                  transition: 'all 0.3s',
                }}>{step > s ? '✓' : s}</div>
                {i < 2 && <div style={{ flex: 1, height: '2px', margin: '0 4px', background: step > s ? '#1B2B4B' : '#E8EDF5', transition: 'background 0.3s' }} />}
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>{stepTitles[step - 1]}</h2>
          <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.8rem', textAlign: 'center' }}>{stepSubs[step - 1]}</p>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {fpError && <div style={{ background: '#FFF0F0', border: '1.5px solid #F5C6C6', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#C0392B', fontWeight: '700' }}>⚠️ {fpError}</div>}
            {fpSuccess && <div style={{ background: '#E3F5EE', border: '1.5px solid #A8DFC8', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#1A7A50', fontWeight: '700' }}>✅ {fpSuccess}</div>}

            {/* Step 1 — Email */}
            {step === 1 && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={labelStyle}>Driver Email</label>
                  <div style={{ position: 'relative' }}>
                    <input type="email" placeholder="driver@busnav.com"
                      value={fpEmail} onChange={e => setFpEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                      style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>📧</span>
                  </div>
                </div>
                <PrimaryBtn onClick={handleSendOtp}>Send OTP</PrimaryBtn>
              </>
            )}

            {/* Step 2 — OTP */}
            {step === 2 && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={labelStyle}>Enter OTP</label>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    {otp.map((digit, i) => (
                      <input key={i} id={`dotp-${i}`} type="text" inputMode="numeric" maxLength={1}
                        value={digit} onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                        style={{ width: '48px', height: '54px', textAlign: 'center', fontSize: '22px', fontWeight: '800', border: `1.5px solid ${digit ? '#1B2B4B' : '#D8E2EE'}`, borderRadius: '12px', background: digit ? '#EEF2F7' : '#F7FAFD', color: '#1B2B4B', outline: 'none', fontFamily: "'Nunito', sans-serif", transition: 'all 0.15s' }}
                        onFocus={e => { e.target.style.borderColor = '#F5A623'; e.target.style.boxShadow = '0 0 0 3px rgba(245,166,35,0.12)'; }}
                        onBlur={e => { e.target.style.borderColor = digit ? '#1B2B4B' : '#D8E2EE'; e.target.style.boxShadow = 'none'; }}
                      />
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '4px' }}>
                    {resendTimer > 0
                      ? <span style={{ fontSize: '12px', color: '#8898A9', fontWeight: '600' }}>Resend OTP in <span style={{ color: '#F5A623', fontWeight: '800' }}>{resendTimer}s</span></span>
                      : <span onClick={() => { startResendTimer(); setFpSuccess('OTP resent!'); setTimeout(() => setFpSuccess(''), 2000); }} style={{ fontSize: '12px', color: '#F5A623', fontWeight: '700', cursor: 'pointer' }}>Resend OTP</span>
                    }
                  </div>
                </div>
                <PrimaryBtn onClick={handleVerifyOtp}>Verify OTP</PrimaryBtn>
                <button onClick={() => { setStep(1); setOtp(['','','','','','']); setFpError(''); }} style={{ background: 'none', border: 'none', color: '#8898A9', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Nunito', sans-serif", textAlign: 'center' }}>← Change Email</button>
              </>
            )}

            {/* Step 3 — New Password */}
            {step === 3 && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={labelStyle}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showNew ? 'text' : 'password'} placeholder="Min. 6 characters"
                      value={newPassword} onChange={e => setNewPassword(e.target.value)}
                      style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    <span onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9', cursor: 'pointer', userSelect: 'none' }}>{showNew ? '🙈' : '👁️'}</span>
                  </div>
                </div>
                {newPassword && (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '-6px' }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{ flex: 1, height: '4px', borderRadius: '4px', background: newPassword.length >= i * 3 ? (newPassword.length >= 10 ? '#27A86E' : newPassword.length >= 6 ? '#F5A623' : '#E74C3C') : '#E8EDF5', transition: 'background 0.2s' }} />
                    ))}
                    <span style={{ fontSize: '11px', fontWeight: '700', color: newPassword.length >= 10 ? '#27A86E' : newPassword.length >= 6 ? '#F5A623' : '#E74C3C' }}>
                      {newPassword.length >= 10 ? 'Strong' : newPassword.length >= 6 ? 'Fair' : 'Weak'}
                    </span>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={labelStyle}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showConfirm ? 'text' : 'password'} placeholder="Re-enter new password"
                      value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
                      style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    <span onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9', cursor: 'pointer', userSelect: 'none' }}>{showConfirm ? '🙈' : '👁️'}</span>
                  </div>
                  {confirmPassword && (
                    <span style={{ fontSize: '11px', fontWeight: '700', color: newPassword === confirmPassword ? '#27A86E' : '#E74C3C' }}>
                      {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                    </span>
                  )}
                </div>
                <PrimaryBtn onClick={handleResetPassword}>Reset Password</PrimaryBtn>
              </>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.1rem 0' }}>
              <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
              <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>or go back</span>
              <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
            </div>
            <button onClick={() => setShowForgot(false)}
              onMouseEnter={e => { e.currentTarget.style.background = '#EEF2F7'; e.currentTarget.style.borderColor = '#1B2B4B'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; }}
              style={{ width: '100%', padding: '11px 0', background: 'transparent', color: '#1B2B4B', border: '1.5px solid #D8E2EE', borderRadius: '12px', fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'all 0.18s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              ← Back to Sign In
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '1.8rem' }}>
            {['#1B2B4B', '#4D7BA3', '#F5A623', '#B8C8DA'].map((c, i) => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── LOGIN PAGE ────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', background: '#EEF2F7',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Nunito', sans-serif", padding: '2rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: '24px',
        boxShadow: '0 8px 40px rgba(27,43,75,0.10)',
        width: '100%', maxWidth: '420px',
        padding: '2.5rem 2.2rem 2rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.3rem' }}>
          <div style={{ width: '46px', height: '46px', background: '#1B2B4B', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🚍</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#1B2B4B' }}>Bus<span style={{ color: '#F5A623' }}>Nav</span></div>
        </div>
        <p style={{ fontSize: '11px', color: '#6B7E9B', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '1.6rem' }}>Smart Transit · Real-time Tracking</p>
        <div style={{ background: '#E8EDF5', color: '#2D4A7A', borderRadius: '50px', padding: '6px 18px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>🚌 Driver Portal</div>
        <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>Welcome back, Driver</h2>
        <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.8rem', textAlign: 'center' }}>Sign in to manage your trips & passengers</p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {error && <div style={{ background: '#FFF0F0', border: '1.5px solid #F5C6C6', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#C0392B', fontWeight: '700' }}>⚠️ {error}</div>}

          {/* Driver ID / Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="identifier" style={labelStyle}>Driver ID / Email</label>
            <div style={{ position: 'relative' }}>
              <input id="identifier" type="text" placeholder="e.g. DRV2024001 or driver@busnav.com"
                value={identifier} onChange={e => setIdentifier(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: '#8898A9' }}>🚌</span>
            </div>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="loginPassword" style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input id="loginPassword" type={showPassword ? 'text' : 'password'} placeholder="Enter your password"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              <span onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: '#8898A9', cursor: 'pointer', userSelect: 'none' }}>{showPassword ? '🙈' : '👁️'}</span>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6B7E9B', fontWeight: '600', cursor: 'pointer' }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: '#1B2B4B', width: '15px', height: '15px', cursor: 'pointer' }} />
              Keep me signed in
            </label>
            <span onClick={openForgot} style={{ fontSize: '12px', fontWeight: '700', color: '#1B2B4B', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Forgot password?</span>
          </div>

          {/* Login button */}
          <button onClick={handleLogin}
            onMouseEnter={e => e.currentTarget.style.background = '#F5A623'}
            onMouseLeave={e => e.currentTarget.style.background = '#1B2B4B'}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            style={{ width: '100%', padding: '13px 0', marginTop: '4px', background: '#1B2B4B', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '800', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'background 0.18s, transform 0.12s' }}>
            Sign In as Driver
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.2rem 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
            <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>don't have an account?</span>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
          </div>

          <button onClick={() => navigate('/driver/signup')}
            onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; e.currentTarget.style.color = '#1B2B4B'; }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            style={{ width: '100%', padding: '11px 0', background: 'transparent', color: '#1B2B4B', border: '1.5px solid #D8E2EE', borderRadius: '12px', fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'all 0.18s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            ✦ Create Driver Account
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.1rem 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
            <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>or go back</span>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
          </div>

          <button onClick={() => navigate('/')}
            onMouseEnter={e => { e.currentTarget.style.background = '#EEF2F7'; e.currentTarget.style.borderColor = '#1B2B4B'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; }}
            style={{ width: '100%', padding: '11px 0', background: 'transparent', color: '#1B2B4B', border: '1.5px solid #D8E2EE', borderRadius: '12px', fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'all 0.18s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            ← Back to Role Selection
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '1.8rem' }}>
          {['#1B2B4B', '#4D7BA3', '#F5A623', '#B8C8DA'].map((c, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PrimaryBtn({ onClick, children }) {
  return (
    <button onClick={onClick}
      onMouseEnter={e => e.currentTarget.style.background = '#F5A623'}
      onMouseLeave={e => e.currentTarget.style.background = '#1B2B4B'}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      style={{ width: '100%', padding: '13px 0', background: '#1B2B4B', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '800', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'background 0.18s, transform 0.12s' }}>
      {children}
    </button>
  );
}
