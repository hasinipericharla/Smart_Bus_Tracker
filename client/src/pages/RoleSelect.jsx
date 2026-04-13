import { useNavigate } from 'react-router-dom';

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleRole = (role) => {
    localStorage.setItem('role', role);
    navigate(`/${role.toLowerCase()}/dashboard`);
  };

  const roles = [
    {
      name: 'Admin',
      icon: '🛠️',
      desc: 'Manage routes, drivers & system settings',
      color: '#E8EDF5',
      iconColor: '#2D4A7A'
    },
    {
      name: 'Student',
      icon: '🎓',
      desc: 'Track your bus, view schedules & routes',
      color: '#FFF4E0',
      iconColor: '#F5A623'
    },
    {
      name: 'Driver',
      icon: '🚌',
      desc: 'Manage your trips, passengers & bus status',
      color: '#E3F5EE',
      iconColor: '#27A86E'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#EEF2F7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Nunito', sans-serif",
      padding: '2rem'
    }}>

      {/* Logo */}
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'0.5rem'}}>
        <div style={{
          width:'52px',height:'52px',background:'#1B2B4B',
          borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px'
        }}>🚍</div>
        <div style={{fontSize:'28px',fontWeight:'900',color:'#1B2B4B'}}>
          Bus<span style={{color:'#F5A623'}}>Nav</span>
        </div>
      </div>

      {/* Tagline */}
      <p style={{
        fontSize:'12px',color:'#6B7E9B',letterSpacing:'0.08em',
        textTransform:'uppercase',fontWeight:'700',marginBottom:'2.5rem'
      }}>
        Smart Transit · Real-time Tracking
      </p>

      {/* Heading */}
      <h2 style={{fontSize:'22px',fontWeight:'800',color:'#1B2B4B',marginBottom:'0.4rem'}}>
        Welcome! Who are you?
      </h2>
      <p style={{fontSize:'14px',color:'#6B7E9B',fontWeight:'600',marginBottom:'2rem'}}>
        Select your role to continue
      </p>

      {/* Cards */}
      <div style={{display:'flex',gap:'20px',flexWrap:'wrap',justifyContent:'center'}}>
        {roles.map((role) => (
          <div key={role.name}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(27,43,75,0.12)';
              e.currentTarget.style.borderColor = '#F5A623';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(27,43,75,0.06)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            style={{
              background:'#fff',borderRadius:'20px',padding:'2rem 1.5rem',
              width:'200px',display:'flex',flexDirection:'column',alignItems:'center',
              cursor:'pointer',transition:'all 0.2s',border:'2px solid transparent',
              boxShadow:'0 4px 20px rgba(27,43,75,0.06)'
            }}>

            {/* Icon */}
            <div style={{
              width:'72px',height:'72px',borderRadius:'50%',
              background:role.color,display:'flex',alignItems:'center',
              justifyContent:'center',fontSize:'32px',marginBottom:'1.2rem'
            }}>
              {role.icon}
            </div>

            <div style={{fontSize:'17px',fontWeight:'800',color:'#1B2B4B',marginBottom:'0.4rem'}}>
              {role.name}
            </div>
            <div style={{
              fontSize:'12px',color:'#8898A9',textAlign:'center',
              fontWeight:'600',lineHeight:'1.5',marginBottom:'1.4rem'
            }}>
              {role.desc}
            </div>

            <button onClick={() => handleRole(role.name)}
              onMouseEnter={e => e.currentTarget.style.background = '#F5A623'}
              onMouseLeave={e => e.currentTarget.style.background = '#1B2B4B'}
              style={{
                background:'#1B2B4B',color:'#fff',border:'none',
                borderRadius:'10px',padding:'10px 0',fontSize:'13px',
                fontWeight:'700',cursor:'pointer',width:'100%',
                transition:'background 0.2s',fontFamily:"'Nunito',sans-serif"
              }}>
              Enter as {role.name}
            </button>
          </div>
        ))}
      </div>

      {/* Footer dots */}
      <div style={{display:'flex',gap:'8px',marginTop:'2.5rem'}}>
        {['#1B2B4B','#4D7BA3','#F5A623','#B8C8DA'].map((c,i) => (
          <div key={i} style={{width:'8px',height:'8px',borderRadius:'50%',background:c}}></div>
        ))}
      </div>
    </div>
  );
}