import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

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

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both Admin ID and Password.');
      return;
    }
    setError('');
    navigate('/admin/dashboard');
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

        <div style={{
          background: '#E8EDF5', color: '#2D4A7A',
          borderRadius: '50px', padding: '6px 18px',
          fontSize: '12px', fontWeight: '800',
          letterSpacing: '0.05em', textTransform: 'uppercase',
          marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          🛠️ Admin Portal
        </div>

        <h2 style={{ fontSize: '21px', fontWeight: '800', color: '#1B2B4B', marginBottom: '0.3rem' }}>
          Welcome back, Admin
        </h2>
        <p style={{ fontSize: '13px', color: '#8898A9', fontWeight: '600', marginBottom: '1.8rem', textAlign: 'center' }}>
          Sign in to manage routes, drivers & settings
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Error */}
          {error && (
            <div style={{
              background: '#FFF0F0', border: '1.5px solid #F5C6C6',
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '13px', color: '#C0392B', fontWeight: '700'
            }}>⚠️ {error}</div>
          )}

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={labelStyle}>Admin ID / Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text" placeholder="admin@busnav.com"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
              <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: '#8898A9' }}>👤</span>
            </div>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'} placeholder="Enter your password"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
              <span onClick={() => setShowPassword(!showPassword)} style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)', fontSize: '15px',
                color: '#8898A9', cursor: 'pointer', userSelect: 'none'
              }}>{showPassword ? '🙈' : '👁️'}</span>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6B7E9B', fontWeight: '600', cursor: 'pointer' }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                style={{ accentColor: '#1B2B4B', width: '15px', height: '15px', cursor: 'pointer' }} />
              Keep me signed in
            </label>
            {/* <span style={{ fontSize: '12px', fontWeight: '700', color: '#F5A623', cursor: 'pointer' }}>
              Forgot password?
            </span> */}
            <span
                onClick={() => navigate('/admin/forgot-password')}
                style={{ fontSize: '12px', fontWeight: '700', color: '#F5A623', cursor: 'pointer' }}>
                Forgot password?
            </span>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
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
            Sign In as Admin
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.2rem 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
            <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>don't have an account?</span>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
          </div>

          {/* ✦ Create Admin Account → goes to /admin/signup */}
          <button
            onClick={() => navigate('/admin/signup')}
            onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#D8E2EE'; e.currentTarget.style.color = '#1B2B4B'; }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            style={{
              width: '100%', padding: '11px 0',
              background: 'transparent', color: '#1B2B4B',
              border: '1.5px solid #D8E2EE', borderRadius: '12px',
              fontSize: '13px', fontWeight: '700', fontFamily: "'Nunito', sans-serif",
              cursor: 'pointer', transition: 'all 0.18s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}>
            ✦ Create Admin Account
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.1rem 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
            <span style={{ fontSize: '11px', color: '#B8C8DA', fontWeight: '700' }}>or go back</span>
            <hr style={{ flex: 1, border: 'none', borderTop: '1.5px solid #E8EDF5' }} />
          </div>

          {/* Back to Role Selection */}
          <button
            onClick={() => navigate('/')}
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
            ← Back to Role Selection
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