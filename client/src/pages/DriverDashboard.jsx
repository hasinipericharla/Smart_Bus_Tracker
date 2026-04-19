import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{--accent:#f5a623;--accent2:#e8951f;--blue:#2563eb;--green:#16a34a;--red:#dc2626;--text:#1e293b;--muted:#64748b;--border:#e2e8f0;}
body{font-family:'DM Sans',sans-serif;background:#f1f5f9;color:var(--text)}
.layout{display:flex;min-height:100vh;flex-direction:column}
.topbar{height:58px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:12px;position:sticky;top:0;z-index:100;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.logo{display:flex;align-items:center;gap:9px;font-weight:700;font-size:15px;color:var(--text)}
.logo-icon{width:34px;height:34px;background:var(--accent);border-radius:9px;display:flex;align-items:center;justify-content:center}
.topbar .spacer{flex:1}
.topbar-right{display:flex;align-items:center;gap:14px}
.avatar{width:32px;height:32px;background:linear-gradient(135deg,#16a34a,#15803d);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;cursor:pointer}
.topbar-time{font-size:12.5px;color:var(--muted);font-family:'DM Mono',monospace;background:#f8fafc;padding:4px 10px;border-radius:6px;border:1px solid var(--border)}
.body-wrap{display:flex;flex:1}
.sidebar{width:220px;background:#1e293b;display:flex;flex-direction:column;padding:14px 0;flex-shrink:0;position:sticky;top:58px;height:calc(100vh - 58px);overflow-y:auto}
.nav-section{padding:0 10px;margin-bottom:6px}
.nav-label{font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1.2px;padding:8px 10px 5px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;cursor:pointer;font-size:13px;color:#94a3b8;transition:all .15s;margin-bottom:1px;position:relative;background:none;border:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif}
.nav-item:hover{background:rgba(255,255,255,.07);color:#e2e8f0}
.nav-item.active{background:rgba(245,166,35,.15);color:var(--accent);font-weight:600}
.nav-item.active::before{content:'';position:absolute;left:-10px;top:50%;transform:translateY(-50%);width:3px;height:20px;background:var(--accent);border-radius:0 3px 3px 0}
.nav-item .ni{width:15px;height:15px;opacity:.7;flex-shrink:0}
.nav-item.active .ni{opacity:1}
.sidebar-bottom{margin-top:auto;padding:10px;border-top:1px solid #334155}
.main{flex:1;overflow-y:auto;background:#f1f5f9}
.page{padding:22px 26px;display:flex;flex-direction:column;gap:18px;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.page-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.page-title{font-size:20px;font-weight:700;letter-spacing:-.3px}
.page-subtitle{font-size:12.5px;color:var(--muted);margin-top:2px}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.stat-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;position:relative;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04);transition:transform .15s}
.stat-card:hover{transform:translateY(-2px)}
.stat-card::after{content:'';position:absolute;top:-10px;right:-10px;width:70px;height:70px;border-radius:50%;opacity:.08}
.stat-card.s-green::after{background:#16a34a} .stat-card.s-amber::after{background:var(--accent)} .stat-card.s-blue::after{background:#2563eb} .stat-card.s-red::after{background:var(--red)}
.stat-label{font-size:10.5px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
.stat-val{font-size:28px;font-weight:700;line-height:1;letter-spacing:-1px}
.stat-val.green{color:var(--green)} .stat-val.amber{color:var(--accent)} .stat-val.blue{color:var(--blue)} .stat-val.red{color:var(--red)}
.stat-sub{font-size:11.5px;color:var(--muted);margin-top:8px}
.card{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.card-header{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid var(--border);background:#f8fafc}
.card-title{font-size:13.5px;font-weight:600;color:var(--text)}
.card-sub{font-size:11.5px;color:var(--muted)}
.ch-right{margin-left:auto;display:flex;align-items:center;gap:8px}
.fab-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:'DM Sans',sans-serif}
.fab-primary{background:var(--accent);color:#1a1a1a}
.fab-primary:hover{background:var(--accent2);transform:translateY(-1px)}
.fab-secondary{background:#fff;color:var(--text);border:1px solid var(--border)}
.fab-secondary:hover{background:#f1f5f9}
.fab-green{background:var(--green);color:#fff}
.fab-green:hover{background:#15803d}
.fab-red{background:var(--red);color:#fff}
.fab-red:hover{background:#b91c1c}
.status-pill{font-size:10px;padding:3px 9px;border-radius:8px;font-weight:700;display:inline-block}
.sp-green{background:rgba(22,163,74,.12);color:var(--green)}
.sp-amber{background:rgba(245,166,35,.12);color:var(--accent)}
.sp-gray{background:rgba(122,143,170,.1);color:var(--muted)}
.sp-red{background:rgba(220,38,38,.12);color:var(--red)}
.sp-blue{background:rgba(37,99,235,.12);color:var(--blue)}
.trip-banner{border-radius:13px;padding:20px 24px;display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.trip-banner.idle{background:linear-gradient(135deg,#1e293b,#334155)}
.trip-banner.active{background:linear-gradient(135deg,#14532d,#166534)}
.stop-row{display:flex;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid var(--border);transition:background .15s;cursor:pointer}
.stop-row:last-child{border-bottom:none}
.stop-row:hover{background:#f8fafc}
.stop-row.reached{opacity:.5}
.stop-row.current-stop{background:rgba(245,166,35,.06);border-left:3px solid var(--accent)}
.stop-circle{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0}
.sc-green{background:rgba(22,163,74,.12);color:var(--green)}
.sc-amber{background:rgba(245,166,35,.15);color:var(--accent2)}
.sc-gray{background:#f1f5f9;color:#94a3b8}
.stop-name{font-size:13px;font-weight:600}
.stop-meta{font-size:11px;color:var(--muted);margin-top:1px}
.map-body{height:280px;background:#eef4fb;position:relative;overflow:hidden}
.map-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,139,212,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,139,212,.1) 1px,transparent 1px);background-size:36px 36px}
.map-road{position:absolute;background:rgba(148,163,184,.3);border-radius:2px}
.bus-dot-drv{position:absolute;width:28px;height:28px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;z-index:3;animation:pulseDrv 2s infinite}
@keyframes pulseDrv{0%,100%{box-shadow:0 0 0 4px rgba(22,163,74,.3)}50%{box-shadow:0 0 0 12px rgba(22,163,74,.05)}}
.route-line-map{position:absolute;height:4px;border-radius:2px;z-index:1}
.stop-dot-map{position:absolute;width:9px;height:9px;border-radius:50%;z-index:2}
.stop-dot-map.reached{background:var(--green);border:2px solid #fff}
.stop-dot-map.current{background:var(--accent);border:2px solid #fff;animation:pulseStop 1.5s infinite}
.stop-dot-map.upcoming{background:#cbd5e1;border:2px solid #94a3b8}
@keyframes pulseStop{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}
.map-legend{display:flex;align-items:center;gap:16px;padding:10px 18px;border-top:1px solid var(--border);background:#f8fafc}
.legend-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
.legend-dot{width:8px;height:8px;border-radius:50%}
.data-table{width:100%;border-collapse:collapse}
.data-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;padding:10px 16px;text-align:left;border-bottom:1px solid var(--border);background:#f8fafc}
.data-table td{padding:10px 16px;font-size:12.5px;border-bottom:1px solid var(--border);vertical-align:middle}
.data-table tr:last-child td{border-bottom:none}
.data-table tr:hover td{background:#f8fafc}
.profile-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px}
.profile-avatar{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--green),#15803d);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#fff}
.profile-name{font-size:16px;font-weight:700}
.profile-id{font-size:12px;color:var(--muted);font-family:'DM Mono',monospace}
.profile-row{width:100%;display:flex;justify-content:space-between;font-size:12.5px;padding:6px 0;border-bottom:1px solid var(--border)}
.profile-key{color:var(--muted)}
.profile-val{font-weight:600}
.toast{position:fixed;bottom:28px;right:28px;background:var(--green);color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:fadeIn .3s ease}
.status-toggle{display:flex;gap:8px;flex-wrap:wrap}
.status-chip{padding:8px 18px;border-radius:20px;font-size:12.5px;font-weight:700;cursor:pointer;border:2px solid transparent;transition:all .2s;font-family:'DM Sans',sans-serif}
.status-chip.sel-ontime{background:rgba(22,163,74,.12);color:var(--green);border-color:var(--green)}
.status-chip.sel-delayed{background:rgba(245,166,35,.12);color:var(--accent2);border-color:var(--accent)}
.status-chip.unsel{background:#f1f5f9;color:var(--muted);border-color:var(--border)}
.status-chip:hover{opacity:.85}
::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
`;

const IconHome   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconMap    = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>;
const IconRoute  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconUser   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconFile   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const IconLogout = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const BusLogo    = () => <svg viewBox="0 0 24 24" fill="#1a1a1a"><path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 9h16v4H4V9z"/></svg>;

const ROUTE_STOPS = [
  {id:1,name:'College Main Gate',time:'07:00 AM'},
  {id:2,name:'Market Circle',    time:'07:08 AM'},
  {id:3,name:'North Bridge',     time:'07:15 AM'},
  {id:4,name:'City Park',        time:'07:22 AM'},
  {id:5,name:'East Market',      time:'07:30 AM'},
  {id:6,name:'Rail Station',     time:'07:38 AM'},
  {id:7,name:'Sadashiv Nagar',   time:'07:45 AM'},
  {id:8,name:'Tilakwadi',        time:'07:52 AM'},
];

function PageHome({ tripActive, currentStop, totalPassengers, setActivePage, startTrip, endTrip, markStop, driverStatus, setDriverStatus, showToast }) {
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Driver Dashboard</div><div className="page-subtitle">R. Kumar · KA-01-B · Route A — North Loop</div></div>
        <div style={{display:'flex',gap:8}}>
          {!tripActive
            ? <button className="fab-btn fab-green" onClick={startTrip}>▶ Start Trip</button>
            : <button className="fab-btn fab-red" onClick={endTrip}>⏹ End Trip</button>
          }
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card s-green">
          <div className="stat-label">Trip Status</div>
          <div className="stat-val green" style={{fontSize:16,marginTop:4}}>{tripActive ? '● Active' : '○ Idle'}</div>
          <div className="stat-sub">{tripActive ? `Stop ${currentStop+1} of ${ROUTE_STOPS.length}` : 'Start your trip'}</div>
        </div>
        <div className="stat-card s-amber">
          <div className="stat-label">Passengers</div>
          <div className="stat-val amber">{totalPassengers}</div>
          <div className="stat-sub">of 50 capacity</div>
        </div>
        <div className="stat-card s-blue">
          <div className="stat-label">Stops Done</div>
          <div className="stat-val blue">{currentStop}</div>
          <div className="stat-sub">of {ROUTE_STOPS.length} total</div>
        </div>
        <div className="stat-card s-red">
          <div className="stat-label">Current Status</div>
          <div className="stat-val" style={{fontSize:14,marginTop:6,color: driverStatus==='On Time' ? 'var(--green)' : 'var(--accent)'}}>{driverStatus}</div>
          <div className="stat-sub">Route A</div>
        </div>
      </div>

      {/* Trip Banner */}
      <div className={`trip-banner ${tripActive ? 'active' : 'idle'}`}>
        <div style={{fontSize:36}}>{tripActive ? '🚌' : '🅿️'}</div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:'#e2e8f0'}}>{tripActive ? `Currently at: ${ROUTE_STOPS[currentStop]?.name || 'Trip Complete'}` : 'Ready to start your trip'}</div>
          <div style={{fontSize:11.5,color:'#94a3b8',marginTop:4}}>
            {tripActive ? `Next: ${ROUTE_STOPS[currentStop+1]?.name || 'Last stop'}` : 'KA-01-B · Route A — North Loop · 8 stops'}
          </div>
        </div>
        {tripActive && currentStop < ROUTE_STOPS.length && (
          <button className="fab-btn fab-primary" style={{marginLeft:'auto'}} onClick={markStop}>
            🛑 Mark Stop Reached
          </button>
        )}
        {!tripActive && (
          <button className="fab-btn fab-green" style={{marginLeft:'auto'}} onClick={startTrip}>▶ Start Trip Now</button>
        )}
      </div>

      {/* Status Update */}
      <div className="card" style={{padding:18}}>
        <div style={{fontWeight:600,fontSize:14,marginBottom:12}}>Update Trip Status</div>
        <div className="status-toggle">
          {['On Time','Delayed'].map(s => (
            <button key={s} className={`status-chip ${driverStatus===s ? (s==='On Time' ? 'sel-ontime' : 'sel-delayed') : 'unsel'}`}
              onClick={() => { setDriverStatus(s); showToast(`Status updated: ${s}`); }}>
              {s === 'On Time' ? '✅' : '⚠️'} {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stops List */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Stop Progress</span>
          <div className="ch-right"><span className="card-sub">{currentStop}/{ROUTE_STOPS.length} completed</span></div>
        </div>
        {ROUTE_STOPS.map((stop, i) => (
          <div key={stop.id} className={`stop-row ${i < currentStop ? 'reached' : i === currentStop ? 'current-stop' : ''}`}>
            <div className={`stop-circle ${i < currentStop ? 'sc-green' : i === currentStop ? 'sc-amber' : 'sc-gray'}`}>
              {i < currentStop ? '✓' : i+1}
            </div>
            <div style={{flex:1}}>
              <div className="stop-name">{stop.name}</div>
              <div className="stop-meta">{stop.time}</div>
            </div>
            {i === currentStop && tripActive && <span className="status-pill sp-amber">Current</span>}
            {i < currentStop && <span className="status-pill sp-green">Done</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function PageLiveMap({ tripActive, currentStop }) {
  const [busPos, setBusPos] = useState(60);
  useEffect(() => {
    if (!tripActive) return;
    const t = setInterval(() => setBusPos(p => p >= 560 ? 60 : p + 1), 80);
    return () => clearInterval(t);
  }, [tripActive]);

  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Live Map</div><div className="page-subtitle">Your current location · Route A</div></div>
        <span className="status-pill sp-green" style={{fontSize:12,padding:'6px 14px'}}>📍 Location Sharing {tripActive ? 'Active' : 'Paused'}</span>
      </div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">KA-01-B Live Position</span>
          <div className="ch-right"><span style={{fontSize:11,color:'var(--muted)'}}>{tripActive ? 'Auto-updating' : 'Trip not started'}</span></div>
        </div>
        <div className="map-body" style={{height:380}}>
          <div className="map-grid-bg"/>
          <div className="map-road" style={{left:0,top:200,width:'100%',height:3,opacity:.5}}/>
          <div className="map-road" style={{left:0,top:120,width:'100%',height:2,opacity:.2}}/>
          <div className="map-road" style={{left:200,top:0,width:2,height:'100%',opacity:.3}}/>
          <div className="route-line-map" style={{left:50,top:201,width:560,background:'rgba(59,139,212,.4)'}}/>
          {ROUTE_STOPS.map((stop, i) => {
            const pos = { left: 60 + i*75, top: 197 };
            const isReached = i < currentStop;
            const isCurrent = i === currentStop;
            return (
              <div key={i} className={`stop-dot-map ${isReached ? 'reached' : isCurrent ? 'current' : 'upcoming'}`}
                style={{left:pos.left, top:pos.top}}>
              </div>
            );
          })}
          <div className="bus-dot-drv" style={{left: tripActive ? busPos : 60, top:190}}>🚌</div>
          <div style={{position:'absolute',left:10,top:8,fontSize:10,color:'#94a3b8',fontFamily:"'DM Mono',monospace"}}>ROUTE A — NORTH LOOP · BELAGAVI</div>
          <div style={{position:'absolute',left:(tripActive ? busPos : 60)+2,top:174,fontSize:10,fontWeight:700,color:'var(--green)',fontFamily:"'DM Mono',monospace",whiteSpace:'nowrap'}}>KA-01-B {tripActive ? '42 km/h' : ''}</div>
        </div>
        <div className="map-legend">
          <div className="legend-item"><div className="legend-dot" style={{background:'var(--green)'}}/> Stop Reached</div>
          <div className="legend-item"><div className="legend-dot" style={{background:'var(--accent)'}}/> Current</div>
          <div className="legend-item"><div className="legend-dot" style={{background:'#94a3b8'}}/> Upcoming</div>
          {!tripActive && <div style={{marginLeft:'auto',fontSize:11,color:'var(--red)',fontWeight:600}}>⚠️ Start trip to share live location</div>}
        </div>
      </div>
    </div>
  );
}

function PageRoute() {
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">My Route</div><div className="page-subtitle">Route A — North Loop · 8 stops</div></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div className="card">
          <div className="card-header"><span className="card-title">Route Details</span></div>
          <div style={{padding:'16px 18px',display:'flex',flexDirection:'column',gap:10}}>
            {[['Route','Route A — North Loop'],['Bus','KA-01-B'],['Capacity','50 passengers'],['Total Stops','8'],['Total Distance','8.9 km'],['Avg Trip Time','52 minutes'],['First Trip','07:00 AM'],['Last Trip','05:00 PM']].map(([k,v]) => (
              <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:13,paddingBottom:8,borderBottom:'1px solid var(--border)'}}>
                <span style={{color:'var(--muted)'}}>{k}</span>
                <span style={{fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">All Stops</span></div>
          {ROUTE_STOPS.map((stop, i) => (
            <div key={stop.id} className="stop-row">
              <div className="stop-circle sc-gray">{i+1}</div>
              <div><div className="stop-name">{stop.name}</div><div className="stop-meta">{stop.time}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageHistory() {
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Trip History</div><div className="page-subtitle">Your completed trips</div></div>
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Date</th><th>Route</th><th>Departure</th><th>Arrival</th><th>Stops</th><th>Passengers</th><th>Status</th></tr></thead>
          <tbody>
            {[['Apr 19','Route A','07:00 AM','07:52 AM','8/8',46,'sp-green','Completed'],
              ['Apr 18','Route A','07:00 AM','08:02 AM','8/8',42,'sp-amber','Minor Delay'],
              ['Apr 17','Route A','07:00 AM','07:52 AM','8/8',48,'sp-green','Completed'],
              ['Apr 16','Route A','07:00 AM','07:52 AM','8/8',44,'sp-green','Completed'],
              ['Apr 15','Route A','07:00 AM','08:10 AM','6/8',40,'sp-red','Delayed'],
              ['Apr 14','Route A','07:00 AM','07:52 AM','8/8',50,'sp-green','Completed'],
            ].map(([d,r,dep,arr,stops,pax,sc,st])=>(
              <tr key={d}><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{d}</td><td>{r}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{dep}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{arr}</td><td>{stops}</td><td>{pax}</td><td><span className={`status-pill ${sc}`}>{st}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageProfile({ navigate }) {
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">My Profile</div><div className="page-subtitle">Driver account details</div></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:14}}>
        <div className="profile-card">
          <div className="profile-avatar">RK</div>
          <div className="profile-name">R. Kumar</div>
          <div className="profile-id">DRV-5201-2019</div>
          <span className="status-pill sp-green">Active</span>
          {[['Bus','KA-01-B'],['Route','Route A'],['License','DL-5201-2019'],['Experience','8 years'],['Phone','+91 98765 43210'],['Trips Today','6 / 6']].map(([k,v]) => (
            <div key={k} className="profile-row"><span className="profile-key">{k}</span><span className="profile-val">{v}</span></div>
          ))}
          <button className="fab-btn fab-secondary" style={{width:'100%',justifyContent:'center',marginTop:6}} onClick={() => navigate('/')}>← Logout</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card" style={{padding:18}}>
            <div style={{fontWeight:600,fontSize:14,marginBottom:14}}>Performance This Month</div>
            <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
              {[['96%','On-Time Rate','var(--green)'],['4 min','Avg Delay','var(--accent)'],['124','Total Trips','var(--blue)'],['3','Incidents','var(--red)']].map(([v,l,c])=>(
                <div key={l} style={{flex:1,minWidth:100,background:'#f8fafc',borderRadius:10,padding:'14px',border:'1px solid var(--border)'}}>
                  <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
                  <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">Recent Trips</span></div>
            <table className="data-table">
              <thead><tr><th>Date</th><th>Departure</th><th>Stops</th><th>Status</th></tr></thead>
              <tbody>
                {[['Apr 19','07:00 AM','8/8','sp-green','Completed'],['Apr 18','07:00 AM','8/8','sp-amber','Delayed'],['Apr 17','07:00 AM','8/8','sp-green','Completed']].map(([d,t,s,sc,st])=>(
                  <tr key={d}><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{d}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{t}</td><td>{s}</td><td><span className={`status-pill ${sc}`}>{st}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('home');
  const [tripActive, setTripActive] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(34);
  const [driverStatus, setDriverStatus] = useState('On Time');
  const [toast, setToast] = useState(null);
  const [clock, setClock] = useState('');
  const toastRef = useRef(null);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 2500);
  };

  const startTrip = () => { setTripActive(true); setCurrentStop(0); showToast('✅ Trip started! Location sharing active'); };
  const endTrip   = () => { setTripActive(false); showToast('🏁 Trip ended successfully!'); };
  const markStop  = () => {
    if (currentStop < ROUTE_STOPS.length - 1) {
      setCurrentStop(c => c + 1);
      setTotalPassengers(p => Math.min(50, p + Math.floor(Math.random()*5)));
      showToast(`✅ Stop ${currentStop+1} marked: ${ROUTE_STOPS[currentStop].name}`);
    } else {
      endTrip();
    }
  };

  const navSections = [
    {label:'Overview',items:[
      {id:'home',icon:<IconHome/>,label:'Dashboard'},
      {id:'map',icon:<IconMap/>,label:'Live Map'},
    ]},
    {label:'Trip',items:[
      {id:'route',icon:<IconRoute/>,label:'My Route'},
      {id:'history',icon:<IconFile/>,label:'Trip History'},
    ]},
    {label:'Account',items:[
      {id:'profile',icon:<IconUser/>,label:'My Profile'},
    ]},
  ];

  const renderPage = () => {
    const props = { tripActive, currentStop, totalPassengers, setActivePage, startTrip, endTrip, markStop, driverStatus, setDriverStatus, showToast };
    switch(activePage) {
      case 'home':    return <PageHome {...props}/>;
      case 'map':     return <PageLiveMap tripActive={tripActive} currentStop={currentStop}/>;
      case 'route':   return <PageRoute/>;
      case 'history': return <PageHistory/>;
      case 'profile': return <PageProfile navigate={navigate}/>;
      default:        return <PageHome {...props}/>;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="layout">
        <div className="topbar">
          <div className="logo">
            <div className="logo-icon"><BusLogo/></div>
            BusNav Driver
          </div>
          <div className="spacer"/>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span className="status-pill" style={{fontSize:11,padding:'5px 12px', background: tripActive ? 'rgba(22,163,74,.12)' : 'rgba(100,116,139,.1)', color: tripActive ? 'var(--green)' : 'var(--muted)'}}>
              {tripActive ? '● Trip Active' : '○ Idle'}
            </span>
          </div>
          <div className="spacer"/>
          <div className="topbar-right">
            <div className="topbar-time">{clock}</div>
            <div className="avatar">RK</div>
          </div>
        </div>
        <div className="body-wrap">
          <div className="sidebar">
            {navSections.map(s => (
              <div className="nav-section" key={s.label}>
                <div className="nav-label">{s.label}</div>
                {s.items.map(it => (
                  <button key={it.id} className={`nav-item${activePage===it.id?' active':''}`} onClick={() => setActivePage(it.id)}>
                    {it.icon} {it.label}
                  </button>
                ))}
              </div>
            ))}
            <div className="sidebar-bottom">
              <button className="nav-item" style={{color:'#64748b'}} onClick={() => navigate('/')}><IconLogout/> Logout</button>
            </div>
          </div>
          <div className="main">{renderPage()}</div>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}