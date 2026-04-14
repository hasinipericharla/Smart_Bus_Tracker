import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ── shared styles ────────────────────────────────────────────────────────────
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

// ── helper ───────────────────────────────────────────────────────────────────
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const OTP_EXPIRY_SECONDS = 300; // 5 minutes
const RESEND_COOLDOWN = 30;

export default function StudentSignUp() {
  const navigate = useNavigate();

  // ── form state ──────────────────────────────────────────────────────────
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  // ── OTP state ───────────────────────────────────────────────────────────
  const [step, setStep]             = useState('form');   // 'form' | 'otp' | 'done'
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpDigits, setOtpDigits]   = useState(['', '', '', '', '', '']);
  const [otpExpiry, setOtpExpiry]   = useState(null);
  const [timeLeft, setTimeLeft]     = useState(OTP_EXPIRY_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpRefs = useRef([]);

  // ── feedback state ──────────────────────────────────────────────────────
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // ── OTP countdown timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (step !== 'otp') return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, otpExpiry]);

  // ── resend cooldown ─────────────────────────────────────────────────────
  useEffect(() => {
    if (resendCooldown === 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // ── format mm:ss ────────────────────────────────────────────────────────
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  // ── validate & send OTP ─────────────────────────────────────────────────
  const handleSendOtp = () => {
    if (!name || !email || !studentId || !password || !confirm) {
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
    setOtpDigits(['', '', '', '', '', '']);
    setError('');

    // ── DEV MODE: log OTP to console ──────────────────────────────────────
    // When you add a backend, replace this console.log with your API call:
    //   await fetch('/api/send-otp', { method:'POST', body: JSON.stringify({ email, otp }) })
    console.log(`%c[DEV] OTP for ${email}: ${otp}`, 'color: #F5A623; font-size: 16px; font-weight: bold;');

    setLoading(false);
    setStep('otp');
    setResendCooldown(RESEND_COOLDOWN);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  // ── OTP digit input handler ─────────────────────────────────────────────
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

  // ── verify OTP ──────────────────────────────────────────────────────────
  const handleVerifyOtp = () => {
    if (timeLeft === 0) { setError('OTP has expired. Please resend.'); return; }
    const entered = otpDigits.join('');
    if (entered.length < 6) { setError('Please enter the full 6-digit code.'); return; }
    if (entered !== generatedOtp) { setError('Incorrect OTP. Please try again.'); return; }

    setError('');
    setStep('done');
    setSuccess('Email verified! Account created successfully.');
    // ── When backend is ready, save the user here ─────────────────────────
    // await fetch('/api/register', { method:'POST', body: JSON.stringify({ name, email, studentId, password }) })
    setTimeout(() => navigate('/student/login'), 2000);
  };

  // ── resend OTP ──────────────────────────────────────────────────────────
  const handleResend = () => {
    if (resendCooldown > 0) return;
    const otp = generateOTP();
    setGeneratedOtp(otp);
    setOtpExpiry(Date.now() + OTP_EXPIRY_SECONDS * 1000);
    setTimeLeft(OTP_EXPIRY_SECONDS);
    setOtpDigits(['', '', '', '', '', '']);
    setError('');
    setResendCooldown(RESEND_COOLDOWN);
    console.log(`%c[DEV] Resent OTP for ${email}: ${otp}`, 'color: #F5A623; font-size: 16px; font-weight: bold;');
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  // ── password strength ───────────────────────────────────────────────────
  const strengthLevel = password.length >= 10 ? 3 : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0;
  const strengthColors = ['#E8EDF5', '#E74C3C', '#F5A623', '#27A86E'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  // ── RENDER ───────────────────────────────────────────────────────────────
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
          <div style={{
            width: '46px', height: '46px', background: '#1B2B4B',
            borderRadius: '13px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '22px',
          }}>🚍</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#1B2B4B' }}>
            Bus<span style={{ color: '#F5A623' }}>Nav</span>
          </div>
        </div>

        <p style={{
          fontSize: '11px', color: '#6B7E9B', letterSpacing: '0.08em',
          textTransform: 'uppercase', fontWeight: '700', marginBottom: '1.6rem',
        }}>Smart Transit · Real-time Tracking</p>

        {/* Badge */}
        <div style={{
          background: '#FFF4E0', color: '#B87A00',
          borderRadius: '50px', padding: '6px 18px',
          fontSize: '12px', fontWeight: '800',
          letterSpacing: '0.05em', textTransform: 'uppercase',
          marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px',
        }}>🎓 Student Registration</div>

        {/* ── STEP: FORM ─────────────────────────────────────────────────── */}
        {step === 'form' && (
          <>
            <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>
              Create Student Account
            </h2>
            <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.8rem', textAlign: 'center' }}>
              Register to start tracking your bus
            </p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {error && <ErrorBanner message={error} />}

              <Field label="Full Name" htmlFor="fullName">
                <input id="fullName" type="text" placeholder="Your full name"
                  value={name} onChange={e => setName(e.target.value)}
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                <Icon>🪪</Icon>
              </Field>

              <Field label="Email Address" htmlFor="email">
                <input id="email" type="email" placeholder="student@college.edu"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                <Icon>📧</Icon>
              </Field>

              <Field label="Student ID" htmlFor="studentId">
                <input id="studentId" type="text" placeholder="e.g. STU2024001"
                  value={studentId} onChange={e => setStudentId(e.target.value)}
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                <Icon>🎓</Icon>
              </Field>

              <Field label="Password" htmlFor="password">
                <input id="password" type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={password} onChange={e => setPassword(e.target.value)}
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                <ToggleIcon show={showPassword} onToggle={() => setShowPassword(v => !v)} />
              </Field>

              {/* Password strength */}
              {password && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '-6px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{
                      flex: 1, height: '4px', borderRadius: '4px',
                      background: i <= strengthLevel ? strengthColors[strengthLevel] : '#E8EDF5',
                      transition: 'background 0.2s',
                    }} />
                  ))}
                  <span style={{ fontSize: '11px', fontWeight: '700', color: strengthColors[strengthLevel] }}>
                    {strengthLabels[strengthLevel]}
                  </span>
                </div>
              )}

              <Field label="Confirm Password" htmlFor="confirm">
                <input id="confirm" type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirm} onChange={e => setConfirm(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                <ToggleIcon show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
              </Field>

              <PrimaryButton onClick={handleSendOtp} loading={loading} color="#F5A623" hoverColor="#e09400">
                {loading ? 'Sending OTP…' : 'Send Verification OTP'}
              </PrimaryButton>

              <Divider label="already have an account?" />

              <OutlineButton onClick={() => navigate('/student/login')}>
                ← Back to Sign In
              </OutlineButton>
            </div>
          </>
        )}

        {/* ── STEP: OTP ──────────────────────────────────────────────────── */}
        {step === 'otp' && (
          <>
            <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>
              Verify Your Email
            </h2>
            <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'center' }}>
              We sent a 6-digit code to
            </p>
            <p style={{ fontSize: '13px', fontWeight: '800', color: '#1B2B4B', marginBottom: '1.8rem' }}>
              {email}
            </p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {error && <ErrorBanner message={error} />}

              {/* OTP digit boxes */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }} onPaste={handleOtpPaste}>
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => otpRefs.current[i] = el}
                    type="text" inputMode="numeric" maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    style={{
                      width: '46px', height: '54px', textAlign: 'center',
                      fontSize: '22px', fontWeight: '800', fontFamily: "'Nunito', sans-serif",
                      border: `2px solid ${digit ? '#F5A623' : '#D8E2EE'}`,
                      borderRadius: '12px', outline: 'none',
                      color: '#1B2B4B', background: digit ? '#FFF9EE' : '#F7FAFD',
                      transition: 'all 0.15s',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#F5A623'; e.target.style.boxShadow = '0 0 0 3px rgba(245,166,35,0.15)'; }}
                    onBlur={e => { e.target.style.boxShadow = 'none'; if (!digit) e.target.style.borderColor = '#D8E2EE'; }}
                  />
                ))}
              </div>

              {/* Expiry timer */}
              <div style={{ textAlign: 'center' }}>
                {timeLeft > 0 ? (
                  <span style={{ fontSize: '13px', color: timeLeft < 60 ? '#E74C3C' : '#8898A9', fontWeight: '700' }}>
                    Code expires in {formatTime(timeLeft)}
                  </span>
                ) : (
                  <span style={{ fontSize: '13px', color: '#E74C3C', fontWeight: '700' }}>
                    Code expired
                  </span>
                )}
              </div>

              <PrimaryButton onClick={handleVerifyOtp} color="#F5A623" hoverColor="#e09400">
                Verify & Create Account
              </PrimaryButton>

              {/* Resend */}
              <div style={{ textAlign: 'center' }}>
                {resendCooldown > 0 ? (
                  <span style={{ fontSize: '13px', color: '#B8C8DA', fontWeight: '600' }}>
                    Resend in {resendCooldown}s
                  </span>
                ) : (
                  <span
                    onClick={handleResend}
                    style={{ fontSize: '13px', color: '#1B2B4B', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
                    Resend OTP
                  </span>
                )}
              </div>

              <OutlineButton onClick={() => { setStep('form'); setError(''); }}>
                ← Change Email
              </OutlineButton>
            </div>
          </>
        )}

        {/* ── STEP: DONE ─────────────────────────────────────────────────── */}
        {step === 'done' && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.5rem' }}>
              Account Created!
            </h2>
            <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600' }}>
              Redirecting you to login…
            </p>
          </div>
        )}

        {/* Footer dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '1.8rem' }}>
          {['#1B2B4B', '#4D7BA3', '#F5A623', '#B8C8DA'].map((c, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── small reusable pieces ────────────────────────────────────────────────────
function Field({ label, htmlFor, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label htmlFor={htmlFor} style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

function Icon({ children }) {
  return (
    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9', pointerEvents: 'none' }}>
      {children}
    </span>
  );
}

function ToggleIcon({ show, onToggle }) {
  return (
    <span onClick={onToggle} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9', cursor: 'pointer', userSelect: 'none' }}>
      {show ? '🙈' : '👁️'}
    </span>
  );
}

function ErrorBanner({ message }) {
  return (
    <div style={{ background: '#FFF0F0', border: '1.5px solid #F5C6C6', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#C0392B', fontWeight: '700' }}>
      ⚠️ {message}
    </div>
  );
}

function PrimaryButton({ onClick, children, loading, color = '#1B2B4B', hoverColor = '#F5A623' }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      onMouseEnter={e => e.currentTarget.style.background = hoverColor}
      onMouseLeave={e => e.currentTarget.style.background = color}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      style={{
        width: '100%', padding: '13px 0', marginTop: '4px',
        background: color, color: '#fff', border: 'none',
        borderRadius: '12px', fontSize: '15px', fontWeight: '800',
        fontFamily: "'Nunito', sans-serif", cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background 0.18s, transform 0.12s', opacity: loading ? 0.7 : 1,
      }}>
      {children}
    </button>
  );
}

function OutlineButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.background = '#EEF2F7'; e.currentTarget.style.borderColor = '#1B2B4B'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; }}
      style={{
        width: '100%', padding: '11px 0',
        background: 'transparent', color: '#1B2B4B',
        border: '1.5px solid #D8E2EE', borderRadius: '12px',
        fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif",
        cursor: 'pointer', transition: 'all 0.18s',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
      }}>
      {children}
    </button>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
      <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>{label}</span>
      <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
    </div>
  );
}
