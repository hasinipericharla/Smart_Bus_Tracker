import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

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
    if (!email) { setError('Please enter your email address.'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address.'); return; }
    setError('');
    setSuccess(`OTP sent to ${email}`);
    setTimeout(() => setSuccess(''), 3000);
    startResendTimer();
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join('').length < 6) { setError('Please enter the complete 6-digit OTP.'); return; }
    setError('');
    setStep(3);
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) { setError('Please fill in both fields.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError('');
    setSuccess('Password reset successfully! Redirecting to login...');
    setTimeout(() => navigate('/admin/login'), 2000);
  };

  const stepTitles = ['Reset Password', 'Verify OTP', 'New Password'];
  const stepSubs = [
    "Enter your admin email to receive an OTP",
    `Enter the 6-digit code sent to ${email}`,
    "Set your new admin password"
  ];

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
          <div style={{
            width: '46px', height: '46px', background: '#1B2B4B',
            borderRadius: '13px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '22px'
          }}>🚍</div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#1B2B4B' }}>
            Bus<span style={{ color: '#F5A623' }}>Nav</span>
          </div>
        </div>

        <p style={{
          fontSize: '11px', color: '#6B7E9B', letterSpacing: '0.08em',
          textTransform: 'uppercase', fontWeight: '700', marginBottom: '1.6rem'
        }}>Smart Transit · Real-time Tracking</p>

        {/* Badge */}
        <div style={{
          background: '#E8EDF5', color: '#2D4A7A', borderRadius: '50px',
          padding: '6px 18px', fontSize: '12px', fontWeight: '800',
          letterSpacing: '0.05em', textTransform: 'uppercase',
          marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px'
        }}>🔐 Password Recovery</div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '1.8rem', width: '100%', maxWidth: '260px' }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: step >= s ? '#1B2B4B' : '#E8EDF5',
                color: step >= s ? '#fff' : '#8898A9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: '800', flexShrink: 0,
                border: step === s ? '2px solid #F5A623' : '2px solid transparent',
                transition: 'all 0.3s'
              }}>{step > s ? '✓' : s}</div>
              {i < 2 && (
                <div style={{
                  flex: 1, height: '2px', margin: '0 4px',
                  background: step > s ? '#1B2B4B' : '#E8EDF5',
                  transition: 'background 0.3s'
                }} />
              )}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>
          {stepTitles[step - 1]}
        </h2>
        <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.8rem', textAlign: 'center' }}>
          {stepSubs[step - 1]}
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {error && (
            <div style={{
              background: '#FFF0F0', border: '1.5px solid #F5C6C6',
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '13px', color: '#C0392B', fontWeight: '700'
            }}>⚠️ {error}</div>
          )}
          {success && (
            <div style={{
              background: '#E3F5EE', border: '1.5px solid #A8DFC8',
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '13px', color: '#1A7A50', fontWeight: '700'
            }}>✅ {success}</div>
          )}

          {/* Step 1 — Email */}
          {step === 1 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={labelStyle}>Admin Email</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email" placeholder="admin@busnav.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>📧</span>
                </div>
              </div>
              <button
                onClick={handleSendOtp}
                onMouseEnter={e => e.currentTarget.style.background = '#F5A623'}
                onMouseLeave={e => e.currentTarget.style.background = '#1B2B4B'}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                style={{
                  width: '100%', padding: '13px 0',
                  background: '#1B2B4B', color: '#fff', border: 'none',
                  borderRadius: '12px', fontSize: '15px', fontWeight: '800',
                  fontFamily: "'Nunito', sans-serif", cursor: 'pointer',
                  transition: 'background 0.18s, transform 0.12s'
                }}>Send OTP</button>
            </>
          )}

          {/* Step 2 — OTP */}
          {step === 2 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>Enter OTP</label>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      style={{
                        width: '48px', height: '54px',
                        textAlign: 'center', fontSize: '22px', fontWeight: '800',
                        border: `1.5px solid ${digit ? '#1B2B4B' : '#D8E2EE'}`,
                        borderRadius: '12px', background: digit ? '#EEF2F7' : '#F7FAFD',
                        color: '#1B2B4B', outline: 'none',
                        fontFamily: "'Nunito', sans-serif",
                        transition: 'all 0.15s'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#F5A623';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245,166,35,0.12)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = digit ? '#1B2B4B' : '#D8E2EE';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '4px' }}>
                  {resendTimer > 0 ? (
                    <span style={{ fontSize: '12px', color: '#8898A9', fontWeight: '600' }}>
                      Resend OTP in <span style={{ color: '#F5A623', fontWeight: '800' }}>{resendTimer}s</span>
                    </span>
                  ) : (
                    <span
                      onClick={() => { startResendTimer(); setSuccess('OTP resent!'); setTimeout(() => setSuccess(''), 2000); }}
                      style={{ fontSize: '12px', color: '#F5A623', fontWeight: '700', cursor: 'pointer' }}>
                      Resend OTP
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleVerifyOtp}
                onMouseEnter={e => e.currentTarget.style.background = '#F5A623'}
                onMouseLeave={e => e.currentTarget.style.background = '#1B2B4B'}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                style={{
                  width: '100%', padding: '13px 0',
                  background: '#1B2B4B', color: '#fff', border: 'none',
                  borderRadius: '12px', fontSize: '15px', fontWeight: '800',
                  fontFamily: "'Nunito', sans-serif", cursor: 'pointer',
                  transition: 'background 0.18s, transform 0.12s'
                }}>Verify OTP</button>
              <button
                onClick={() => { setStep(1); setOtp(['', '', '', '', '', '']); setError(''); }}
                style={{
                  background: 'none', border: 'none', color: '#8898A9',
                  fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                  fontFamily: "'Nunito', sans-serif", textAlign: 'center'
                }}>← Change Email</button>
            </>
          )}

          {/* Step 3 — New Password */}
          {step === 3 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={labelStyle}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNew ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                  />
                  <span onClick={() => setShowNew(!showNew)} style={{
                    position: 'absolute', right: '12px', top: '50%',
                    transform: 'translateY(-50%)', fontSize: '14px',
                    color: '#8898A9', cursor: 'pointer', userSelect: 'none'
                  }}>{showNew ? '🙈' : '👁️'}</span>
                </div>
              </div>

              {/* Password strength */}
              {newPassword && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '-6px' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                      flex: 1, height: '4px', borderRadius: '4px',
                      background: newPassword.length >= i * 3
                        ? (newPassword.length >= 10 ? '#27A86E' : newPassword.length >= 6 ? '#F5A623' : '#E74C3C')
                        : '#E8EDF5',
                      transition: 'background 0.2s'
                    }} />
                  ))}
                  <span style={{
                    fontSize: '11px', fontWeight: '700',
                    color: newPassword.length >= 10 ? '#27A86E' : newPassword.length >= 6 ? '#F5A623' : '#E74C3C'
                  }}>
                    {newPassword.length >= 10 ? 'Strong' : newPassword.length >= 6 ? 'Fair' : 'Weak'}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={labelStyle}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'} placeholder="Re-enter new password"
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                  />
                  <span onClick={() => setShowConfirm(!showConfirm)} style={{
                    position: 'absolute', right: '12px', top: '50%',
                    transform: 'translateY(-50%)', fontSize: '14px',
                    color: '#8898A9', cursor: 'pointer', userSelect: 'none'
                  }}>{showConfirm ? '🙈' : '👁️'}</span>
                </div>
                {confirmPassword && (
                  <span style={{
                    fontSize: '11px', fontWeight: '700',
                    color: newPassword === confirmPassword ? '#27A86E' : '#E74C3C'
                  }}>
                    {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </span>
                )}
              </div>

              <button
                onClick={handleResetPassword}
                onMouseEnter={e => e.currentTarget.style.background = '#F5A623'}
                onMouseLeave={e => e.currentTarget.style.background = '#1B2B4B'}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                style={{
                  width: '100%', padding: '13px 0',
                  background: '#1B2B4B', color: '#fff', border: 'none',
                  borderRadius: '12px', fontSize: '15px', fontWeight: '800',
                  fontFamily: "'Nunito', sans-serif", cursor: 'pointer',
                  transition: 'background 0.18s, transform 0.12s'
                }}>Reset Password</button>
            </>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.1rem 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
            <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>or go back</span>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
          </div>

          <button
            onClick={() => navigate('/admin/login')}
            onMouseEnter={e => { e.currentTarget.style.background = '#EEF2F7'; e.currentTarget.style.borderColor = '#1B2B4B'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; }}
            style={{
              width: '100%', padding: '11px 0',
              background: 'transparent', color: '#1B2B4B',
              border: '1.5px solid #D8E2EE', borderRadius: '12px',
              fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif",
              cursor: 'pointer', transition: 'all 0.18s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}>← Back to Sign In</button>
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