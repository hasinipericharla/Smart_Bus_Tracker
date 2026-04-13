import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminSignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSignUp = () => {
    if (!name || !email || !password || !confirm || !adminCode) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    setSuccess('Account created successfully! Redirecting to login...');
    setTimeout(() => navigate('/admin/login'), 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#EEF2F7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Nunito', sans-serif",
      padding: '2rem'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 8px 40px rgba(27,43,75,0.10)',
        width: '100%',
        maxWidth: '420px',
        padding: '2.5rem 2.2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
        }}>
          Smart Transit · Real-time Tracking
        </p>

        {/* Badge */}
        <div style={{
          background: '#E8EDF5', color: '#2D4A7A',
          borderRadius: '50px', padding: '6px 18px',
          fontSize: '12px', fontWeight: '800',
          letterSpacing: '0.05em', textTransform: 'uppercase',
          marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          🛠️ Admin Registration
        </div>

        <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>
          Create Admin Account
        </h2>
        <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.8rem', textAlign: 'center' }}>
          Register to access the BusNav admin portal
        </p>

        {/* Form */}
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

          {/* Full Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={labelStyle}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text" placeholder="John Smith"
                value={name} onChange={e => setName(e.target.value)}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
              <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>🪪</span>
            </div>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={labelStyle}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email" placeholder="admin@busnav.com"
                value={email} onChange={e => setEmail(e.target.value)}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
              <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>📧</span>
            </div>
          </div>

          {/* Admin Access Code */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={labelStyle}>Admin Access Code</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text" placeholder="Enter your admin access code"
                value={adminCode} onChange={e => setAdminCode(e.target.value)}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
              <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8898A9' }}>🔑</span>
            </div>
            <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '600' }}>
              Contact your system administrator for this code
            </span>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
                value={password} onChange={e => setPassword(e.target.value)}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
              <span onClick={() => setShowPassword(!showPassword)} style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)', fontSize: '14px',
                color: '#8898A9', cursor: 'pointer', userSelect: 'none'
              }}>{showPassword ? '🙈' : '👁️'}</span>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'} placeholder="Re-enter your password"
                value={confirm} onChange={e => setConfirm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSignUp()}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
              <span onClick={() => setShowConfirm(!showConfirm)} style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)', fontSize: '14px',
                color: '#8898A9', cursor: 'pointer', userSelect: 'none'
              }}>{showConfirm ? '🙈' : '👁️'}</span>
            </div>
          </div>

          {/* Password strength hint */}
          {password && (
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '-6px' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  flex: 1, height: '4px', borderRadius: '4px',
                  background: password.length >= i * 3
                    ? (password.length >= 10 ? '#27A86E' : password.length >= 6 ? '#F5A623' : '#E74C3C')
                    : '#E8EDF5',
                  transition: 'background 0.2s'
                }} />
              ))}
              <span style={{
                fontSize: '11px', fontWeight: '700',
                color: password.length >= 10 ? '#27A86E' : password.length >= 6 ? '#F5A623' : '#E74C3C'
              }}>
                {password.length >= 10 ? 'Strong' : password.length >= 6 ? 'Fair' : 'Weak'}
              </span>
            </div>
          )}

          {/* Create Account Button */}
          <button
            onClick={handleSignUp}
            onMouseEnter={e => e.currentTarget.style.background = '#F5A623'}
            onMouseLeave={e => e.currentTarget.style.background = '#1B2B4B'}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            style={{
              width: '100%', padding: '13px 0', marginTop: '4px',
              background: '#1B2B4B', color: '#fff', border: 'none',
              borderRadius: '12px', fontSize: '15px', fontWeight: '800',
              fontFamily: "'Nunito', sans-serif", cursor: 'pointer',
              transition: 'background 0.18s, transform 0.12s'
            }}>
            Create Admin Account
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.1rem 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
            <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>already have an account?</span>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
          </div>

          {/* Back to Login */}
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
            }}>
            ← Back to Sign In
          </button>
        </div>

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