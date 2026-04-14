import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const inputStyle = {
  width: '100%', padding: '11px 40px 11px 14px',
  border: '1.5px solid #D8E2EE', borderRadius: '10px',
  fontSize: '14px', fontFamily: "'Nunito', sans-serif",
  color: '#1B2B4B', background: '#F7FAFD', outline: 'none',
  boxSizing: 'border-box'
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
  letterSpacing: '0.04em', textTransform: 'uppercase'
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const OTP_EXPIRY_SECONDS = 300;
const RESEND_COOLDOWN = 30;

export default function DriverSignUp() {
  const navigate = useNavigate();

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [driverId, setDriverId] = useState('');
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  const [step, setStep]               = useState('form'); // 'form' | 'otp' | 'done'
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpDigits, setOtpDigits]     = useState(['','','','','','']);
  const [otpExpiry, setOtpExpiry]     = useState(null);
  const [timeLeft, setTimeLeft]       = useState(OTP_EXPIRY_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpRefs = useRef([]);

  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step !== 'otp') return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, otpExpiry]);

  useEffect(() => {
    if (resendCooldown === 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleSendOtp = () => {
    if (!name || !email || !driverId || !phone || !password || !confirm) {
      setError('All fields are required.'); return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.'); return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.'); return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.'); return;
    }
    setLoading(true);
    const otp = generateOTP();
    setGeneratedOtp(otp);
    setOtpExpiry(Date.now() + OTP_EXPIRY_SECONDS * 1000);
    setTimeLeft(OTP_EXPIRY_SECONDS);
    setOtpDigits(['','','','','','']);
    setError('');
    // replace with API call when backend is ready:
    // await fetch('/api/send-otp', { method: 'POST', body: JSON.stringify({ email, otp }) })
    console.log(`%c[DEV] OTP for ${email}: ${otp}`, 'color: #F5A623; font-size: 16px; font-weight: bold;');
    setLoading(false);
    setStep('otp');
    setResendCooldown(RESEND_COOLDOWN);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const digits = [...otpDigits];
    digits[index] = value.slice(-1);
    setOtpDigits(digits);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0)
      otpRefs.current[index - 1]?.focus();
  };
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const digits = pasted.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtpDigits(digits);
    const nextEmpty = digits.findIndex(d => d === '');
    otpRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const handleVerifyOtp = () => {
    if (timeLeft === 0) { setError('OTP has expired. Please resend.'); return; }
    const entered = otpDigits.join('');
    if (entered.length < 6) { setError('Please enter the full 6-digit code.'); return; }
    if (entered !== generatedOtp) { setError('Incorrect OTP. Please try again.'); return; }
    setError('');
    setStep('done');
    // replace with API call when backend is ready:
    // await fetch('/api/register', { method: 'POST', body: JSON.stringify({ name, email, driverId, phone, password }) })
    setTimeout(() => navigate('/driver/login'), 2000);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    const otp = generateOTP();
    setGeneratedOtp(otp);
    setOtpExpiry(Date.now() + OTP_EXPIRY_SECONDS * 1000);
    setTimeLeft(OTP_EXPIRY_SECONDS);
    setOtpDigits(['','','','','','']);
    setError('');
    setResendCooldown(RESEND_COOLDOWN);
    console.log(`%c[DEV] Resent OTP for ${email}: ${otp}`, 'color: #F5A623; font-size: 16px; font-weight: bold;');
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const strengthLevel = password.length >= 10 ? 3 : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0;
  const strengthColors = ['#E8EDF5', '#E74C3C', '#F5A623', '#27A86E'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div style={{
      minHeight: '100vh', background: '#EEF2F7',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Nunito', sans-serif", padding: '2rem'
    }}>
      <div style={{
        background: '#fff', borderRadius: '24px',
        boxShadow: '0 8px 40px rgba(27,43,75,0.10)',
        width: '100%', maxWidth: '420px',
        padding: '2.5rem 2.2rem 2rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.3rem' }}>
          <div style={{ width: '46px', height: '46px', background: '#1B2B4B', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🚍</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#1B2B4B' }}>Bus<span style={{ color: '#F5A623' }}>Nav</span></div>
        </div>
        <p style={{ fontSize: '11px', color: '#6B7E9B', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '1.6rem' }}>Smart Transit · Real-time Tracking</p>

        {/* Badge */}
        <div style={{ background: '#E8EDF5', color: '#2D4A7A', borderRadius: '50px', padding: '6px 18px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>🚌 Driver Registration</div>

        {/* ── STEP: FORM ── */}
        {step === 'form' && (
          <>
            <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>Create Driver Account</h2>
            <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.8rem', textAlign: 'center' }}>Register to manage your bus trips</p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {error && <ErrBanner msg={error} />}

              {/* Full Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="name" style={labelStyle}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input id="name" type="text" placeholder="Your full name"
                    value={name} onChange={e => setName(e.target.value)}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>🪪</span>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input id="email" type="email" placeholder="driver@busnav.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>📧</span>
                </div>
              </div>

              {/* Driver ID */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="driverId" style={labelStyle}>Driver ID</label>
                <div style={{ position: 'relative' }}>
                  <input id="driverId" type="text" placeholder="e.g. DRV2024001"
                    value={driverId} onChange={e => setDriverId(e.target.value)}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>🚌</span>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="phone" style={labelStyle}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <input id="phone" type="tel" placeholder="+91 9876543210"
                    value={phone} onChange={e => setPhone(e.target.value)}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>📱</span>
                </div>
              </div>

              {/* Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="password" style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input id="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={password} onChange={e => setPassword(e.target.value)}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                  <span onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9', cursor: 'pointer', userSelect: 'none' }}>
                    {showPassword ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>

              {/* Password strength */}
              {password && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '-6px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ flex: 1, height: '4px', borderRadius: '4px', background: i <= strengthLevel ? strengthColors[strengthLevel] : '#E8EDF5', transition: 'background 0.2s' }} />
                  ))}
                  <span style={{ fontSize: '11px', fontWeight: '700', color: strengthColors[strengthLevel] }}>{strengthLabels[strengthLevel]}</span>
                </div>
              )}

              {/* Confirm Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="confirm" style={labelStyle}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input id="confirm" type={showConfirm ? 'text' : 'password'} placeholder="Re-enter your password"
                    value={confirm} onChange={e => setConfirm(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                  <span onClick={() => setShowConfirm(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9', cursor: 'pointer', userSelect: 'none' }}>
                    {showConfirm ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button onClick={handleSendOtp} disabled={loading}
                onMouseEnter={e => e.currentTarget.style.background = '#e09400'}
                onMouseLeave={e => e.currentTarget.style.background = '#F5A623'}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                style={{ width: '100%', padding: '13px 0', marginTop: '4px', background: '#F5A623', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '800', fontFamily: "'Nunito', sans-serif", cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.18s, transform 0.12s', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Sending OTP…' : 'Send Verification OTP'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
                <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>already have an account?</span>
                <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
              </div>

              <button onClick={() => navigate('/driver/login')}
                onMouseEnter={e => { e.currentTarget.style.background = '#EEF2F7'; e.currentTarget.style.borderColor = '#1B2B4B'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; }}
                style={{ width: '100%', padding: '11px 0', background: 'transparent', color: '#1B2B4B', border: '1.5px solid #D8E2EE', borderRadius: '12px', fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'all 0.18s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                ← Back to Sign In
              </button>
            </div>
          </>
        )}

        {/* ── STEP: OTP ── */}
        {step === 'otp' && (
          <>
            <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>Verify Your Email</h2>
            <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'center' }}>We sent a 6-digit code to</p>
            <p style={{ fontSize: '13px', fontWeight: '800', color: '#1B2B4B', marginBottom: '1.8rem' }}>{email}</p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {error && <ErrBanner msg={error} />}

              {/* OTP boxes */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }} onPaste={handleOtpPaste}>
                {otpDigits.map((digit, i) => (
                  <input key={i} ref={el => otpRefs.current[i] = el}
                    type="text" inputMode="numeric" maxLength={1} value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    style={{
                      width: '46px', height: '54px', textAlign: 'center',
                      fontSize: '22px', fontWeight: '800', fontFamily: "'Nunito', sans-serif",
                      border: `2px solid ${digit ? '#F5A623' : '#D8E2EE'}`,
                      borderRadius: '12px', outline: 'none',
                      color: '#1B2B4B', background: digit ? '#FFF9EE' : '#F7FAFD',
                      transition: 'all 0.15s'
                    }}
                    onFocus={e => { e.target.style.borderColor = '#F5A623'; e.target.style.boxShadow = '0 0 0 3px rgba(245,166,35,0.15)'; }}
                    onBlur={e => { e.target.style.boxShadow = 'none'; if (!digit) e.target.style.borderColor = '#D8E2EE'; }}
                  />
                ))}
              </div>

              {/* Timer */}
              <div style={{ textAlign: 'center' }}>
                {timeLeft > 0
                  ? <span style={{ fontSize: '13px', color: timeLeft < 60 ? '#E74C3C' : '#8898A9', fontWeight: '700' }}>Code expires in {formatTime(timeLeft)}</span>
                  : <span style={{ fontSize: '13px', color: '#E74C3C', fontWeight: '700' }}>Code expired</span>}
              </div>

              <button onClick={handleVerifyOtp}
                onMouseEnter={e => e.currentTarget.style.background = '#e09400'}
                onMouseLeave={e => e.currentTarget.style.background = '#F5A623'}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                style={{ width: '100%', padding: '13px 0', marginTop: '4px', background: '#F5A623', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '800', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'background 0.18s, transform 0.12s' }}>
                Verify & Create Account
              </button>

              {/* Resend */}
              <div style={{ textAlign: 'center' }}>
                {resendCooldown > 0
                  ? <span style={{ fontSize: '13px', color: '#B8C8DA', fontWeight: '600' }}>Resend in {resendCooldown}s</span>
                  : <span onClick={handleResend} style={{ fontSize: '13px', color: '#1B2B4B', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>Resend OTP</span>}
              </div>

              <button onClick={() => { setStep('form'); setError(''); }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EEF2F7'; e.currentTarget.style.borderColor = '#1B2B4B'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; }}
                style={{ width: '100%', padding: '11px 0', background: 'transparent', color: '#1B2B4B', border: '1.5px solid #D8E2EE', borderRadius: '12px', fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif", cursor: 'pointer', transition: 'all 0.18s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                ← Change Email
              </button>
            </div>
          </>
        )}

        {/* ── STEP: DONE ── */}
        {step === 'done' && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.5rem' }}>Account Created!</h2>
            <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600' }}>Redirecting you to login…</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginTop: '1.8rem' }}>
          {['#1B2B4B', '#4D7BA3', '#F5A623', '#B8C8DA'].map((c, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrBanner({ msg }) {
  return (
    <div style={{ background: '#FFF0F0', border: '1.5px solid #F5C6C6', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#C0392B', fontWeight: '700' }}>
      ⚠️ {msg}
    </div>
  );
}
