// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const css = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Mono:wght@400;500&display=swap');
// *{box-sizing:border-box;margin:0;padding:0}
// :root{--accent:#f5a623;--accent2:#e8951f;--blue:#2563eb;--green:#16a34a;--red:#dc2626;--text:#1e293b;--muted:#64748b;--border:#e2e8f0;}
// body{font-family:'DM Sans',sans-serif;background:#f1f5f9;color:var(--text)}
// .layout{display:flex;min-height:100vh;flex-direction:column}
// .topbar{height:58px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:12px;position:sticky;top:0;z-index:100;box-shadow:0 1px 3px rgba(0,0,0,.06)}
// .logo{display:flex;align-items:center;gap:9px;font-weight:700;font-size:15px;color:var(--text)}
// .logo-icon{width:34px;height:34px;background:var(--accent);border-radius:9px;display:flex;align-items:center;justify-content:center}
// .topbar .spacer{flex:1}
// .topbar-right{display:flex;align-items:center;gap:14px}
// .badge-notif{position:relative;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#f8fafc;border:1px solid var(--border)}
// .badge-notif .dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--red);border-radius:50%;border:2px solid #fff}
// .avatar{width:32px;height:32px;background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#1a1a1a;cursor:pointer}
// .topbar-time{font-size:12.5px;color:var(--muted);font-family:'DM Mono',monospace;background:#f8fafc;padding:4px 10px;border-radius:6px;border:1px solid var(--border)}
// .body-wrap{display:flex;flex:1}
// .sidebar{width:220px;background:#1e293b;border-right:1px solid #334155;display:flex;flex-direction:column;padding:14px 0;flex-shrink:0;position:sticky;top:58px;height:calc(100vh - 58px);overflow-y:auto}
// .nav-section{padding:0 10px;margin-bottom:6px}
// .nav-label{font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1.2px;padding:8px 10px 5px}
// .nav-item{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;cursor:pointer;font-size:13px;color:#94a3b8;transition:all .15s;margin-bottom:1px;position:relative;background:none;border:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif}
// .nav-item:hover{background:rgba(255,255,255,.07);color:#e2e8f0}
// .nav-item.active{background:rgba(245,166,35,.15);color:var(--accent);font-weight:600}
// .nav-item.active::before{content:'';position:absolute;left:-10px;top:50%;transform:translateY(-50%);width:3px;height:20px;background:var(--accent);border-radius:0 3px 3px 0}
// .nav-item .ni{width:15px;height:15px;opacity:.7;flex-shrink:0}
// .nav-item.active .ni{opacity:1}
// .sidebar-bottom{margin-top:auto;padding:10px;border-top:1px solid #334155}
// .main{flex:1;overflow-y:auto;background:#f1f5f9}
// .page{padding:22px 26px;display:flex;flex-direction:column;gap:18px;animation:fadeIn .2s ease}
// @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
// .page-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
// .page-title{font-size:20px;font-weight:700;letter-spacing:-.3px}
// .page-subtitle{font-size:12.5px;color:var(--muted);margin-top:2px}
// .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
// .stat-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;position:relative;overflow:hidden;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .stat-card:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px)}
// .stat-card::after{content:'';position:absolute;top:-10px;right:-10px;width:70px;height:70px;border-radius:50%;opacity:.08}
// .stat-card.s-green::after{background:#16a34a}
// .stat-card.s-amber::after{background:var(--accent)}
// .stat-card.s-blue::after{background:#2563eb}
// .stat-card.s-purple::after{background:#7c3aed}
// .stat-label{font-size:10.5px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
// .stat-val{font-size:28px;font-weight:700;line-height:1;letter-spacing:-1px}
// .stat-val.green{color:var(--green)} .stat-val.amber{color:var(--accent)} .stat-val.blue{color:var(--blue)} .stat-val.purple{color:#7c3aed}
// .stat-sub{font-size:11.5px;color:var(--muted);margin-top:8px}
// .card{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .card-header{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid var(--border);background:#f8fafc}
// .card-title{font-size:13.5px;font-weight:600;color:var(--text)}
// .card-sub{font-size:11.5px;color:var(--muted)}
// .ch-right{margin-left:auto;display:flex;align-items:center;gap:8px}
// .mid-row{display:grid;grid-template-columns:1fr 300px;gap:14px}
// .map-body{height:280px;background:#eef4fb;position:relative;overflow:hidden}
// .map-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,139,212,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,139,212,.1) 1px,transparent 1px);background-size:36px 36px}
// .map-road{position:absolute;background:rgba(148,163,184,.3);border-radius:2px}
// .bus-dot-live{position:absolute;width:26px;height:26px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;animation:pulseLive 2s infinite;cursor:pointer;z-index:3}
// @keyframes pulseLive{0%,100%{box-shadow:0 0 0 4px rgba(22,163,74,.25)}50%{box-shadow:0 0 0 10px rgba(22,163,74,.06)}}
// .stop-dot-map{position:absolute;width:9px;height:9px;border-radius:50%;z-index:2;cursor:pointer}
// .stop-dot-map.reached{background:var(--green);border:2px solid #fff;box-shadow:0 0 0 2px var(--green)}
// .stop-dot-map.next{background:var(--accent);border:2px solid #fff;box-shadow:0 0 0 2px var(--accent);animation:pulseStop 1.5s infinite}
// .stop-dot-map.upcoming{background:#cbd5e1;border:2px solid #94a3b8}
// @keyframes pulseStop{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}
// .route-line-map{position:absolute;height:4px;border-radius:2px;z-index:1}
// .map-legend{display:flex;align-items:center;gap:16px;padding:10px 18px;border-top:1px solid var(--border);background:#f8fafc}
// .legend-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
// .legend-dot{width:8px;height:8px;border-radius:50%}
// .stop-tooltip{position:absolute;background:#1e293b;color:#fff;font-size:11px;font-weight:600;padding:4px 9px;border-radius:6px;white-space:nowrap;z-index:10;pointer-events:none;transform:translate(-50%,-120%)}
// .stop-tooltip::after{content:'';position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:#1e293b;border-bottom:none}
// .eta-banner{background:linear-gradient(135deg,#1e293b,#334155);color:#fff;border-radius:13px;padding:20px 22px;display:flex;align-items:center;gap:18px}
// .eta-mins{font-size:42px;font-weight:800;color:var(--accent);line-height:1;font-family:'DM Mono',monospace}
// .eta-label{font-size:12px;color:#94a3b8;margin-top:4px}
// .eta-bus-info{font-size:13px;font-weight:600;color:#e2e8f0}
// .eta-stop{font-size:11.5px;color:#94a3b8;margin-top:3px}
// .stops-list{padding:8px 0}
// .stop-item{display:flex;align-items:center;gap:12px;padding:10px 18px;cursor:pointer;transition:background .15s;border-left:3px solid transparent}
// .stop-item:hover{background:#f8fafc}
// .stop-item.active-stop{background:rgba(245,166,35,.06);border-left-color:var(--accent)}
// .stop-item.reached-stop{opacity:.55}
// .stop-circle{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0}
// .sc-green{background:rgba(22,163,74,.12);color:var(--green)}
// .sc-amber{background:rgba(245,166,35,.15);color:var(--accent2)}
// .sc-gray{background:#f1f5f9;color:#94a3b8}
// .sc-fav{background:rgba(220,38,38,.1);color:var(--red)}
// .stop-name{font-size:13px;font-weight:600;color:var(--text)}
// .stop-meta{font-size:11px;color:var(--muted);margin-top:1px}
// .stop-right{margin-left:auto;display:flex;align-items:center;gap:8px}
// .fav-btn{background:none;border:none;cursor:pointer;font-size:14px;transition:transform .15s;padding:2px}
// .fav-btn:hover{transform:scale(1.3)}
// .notif-list{padding:6px 0}
// .notif-item{display:flex;align-items:flex-start;gap:10px;padding:11px 18px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s}
// .notif-item:last-child{border-bottom:none}
// .notif-item:hover{background:#f8fafc}
// .notif-item.unread{background:rgba(245,166,35,.04)}
// .notif-icon{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;margin-top:1px}
// .ni-amber{background:rgba(245,166,35,.12)}
// .ni-green{background:rgba(22,163,74,.1)}
// .ni-blue{background:rgba(37,99,235,.1)}
// .ni-red{background:rgba(220,38,38,.1)}
// .notif-text{font-size:12.5px;color:var(--text);line-height:1.5}
// .notif-text strong{font-weight:600}
// .notif-time{font-size:10.5px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:3px}
// .unread-dot{width:7px;height:7px;background:var(--accent);border-radius:50%;margin-top:4px;flex-shrink:0}
// .status-pill{font-size:10px;padding:3px 9px;border-radius:8px;font-weight:700;display:inline-block}
// .sp-green{background:rgba(22,163,74,.12);color:var(--green)}
// .sp-amber{background:rgba(245,166,35,.12);color:var(--accent)}
// .sp-gray{background:rgba(122,143,170,.1);color:var(--muted)}
// .sp-red{background:rgba(220,38,38,.12);color:var(--red)}
// .sp-blue{background:rgba(37,99,235,.12);color:var(--blue)}
// .pill{font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid transparent;background:none;font-family:'DM Sans',sans-serif}
// .pill.active{background:var(--accent);color:#1a1a1a}
// .pill.passive{background:#f1f5f9;color:var(--muted);border-color:var(--border)}
// .pill.passive:hover{background:#e2e8f0}
// .fab-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:'DM Sans',sans-serif}
// .fab-primary{background:var(--accent);color:#1a1a1a}
// .fab-primary:hover{background:var(--accent2)}
// .fab-secondary{background:#fff;color:var(--text);border:1px solid var(--border)}
// .fab-secondary:hover{background:#f1f5f9}
// .data-table{width:100%;border-collapse:collapse}
// .data-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;padding:10px 16px;text-align:left;border-bottom:1px solid var(--border);background:#f8fafc}
// .data-table td{padding:10px 16px;font-size:12.5px;border-bottom:1px solid var(--border);vertical-align:middle}
// .data-table tr:last-child td{border-bottom:none}
// .data-table tr:hover td{background:#f8fafc}
// .progress-bar-bg{height:6px;background:#e2e8f0;border-radius:6px;overflow:hidden;width:80px}
// .progress-bar-fill{height:100%;border-radius:6px;transition:width .4s}
// .profile-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .profile-avatar{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#e8951f);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#1a1a1a}
// .profile-name{font-size:16px;font-weight:700}
// .profile-id{font-size:12px;color:var(--muted);font-family:'DM Mono',monospace}
// .profile-row{width:100%;display:flex;justify-content:space-between;font-size:12.5px;padding:6px 0;border-bottom:1px solid var(--border)}
// .profile-key{color:var(--muted)}
// .profile-val{font-weight:600}
// .toast{position:fixed;bottom:28px;right:28px;background:var(--green);color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:fadeIn .3s ease}
// ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
// `;

// const IconHome   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
// const IconMap    = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>;
// const IconBell   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
// const IconUser   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
// const IconRoute  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
// const IconLogout = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
// const IconBellTop= () => <svg width="15" height="15" fill="none" stroke="var(--muted)" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
// const BusLogo    = () => <svg viewBox="0 0 24 24" fill="#1a1a1a"><path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 9h16v4H4V9z"/></svg>;

// const STOPS = [
//   { id:1, name:"College Main Gate", dist:"0 km", time:"07:00 AM" },
//   { id:2, name:"Market Circle",     dist:"1.2 km", time:"07:08 AM" },
//   { id:3, name:"North Bridge",      dist:"2.5 km", time:"07:15 AM" },
//   { id:4, name:"City Park",         dist:"3.8 km", time:"07:22 AM" },
//   { id:5, name:"East Market",       dist:"5.1 km", time:"07:30 AM" },
//   { id:6, name:"Rail Station",      dist:"6.4 km", time:"07:38 AM" },
//   { id:7, name:"Sadashiv Nagar",    dist:"7.6 km", time:"07:45 AM" },
//   { id:8, name:"Tilakwadi",         dist:"8.9 km", time:"07:52 AM" },
// ];

// const MY_STOP_IDX = 4;

// function PageHome({ favs, toggleFav, showToast }) {
//   const [tooltip, setTooltip] = useState(null);
//   const busPos = { left: 310, top: 148 };
//   const stopPositions = [
//     { left:60,  top:193 }, { left:130, top:193 }, { left:200, top:193 },
//     { left:270, top:193 }, { left:340, top:193 }, { left:410, top:193 },
//     { left:480, top:193 }, { left:550, top:193 },
//   ];
//   const reachedIdx = 3;

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <div className="page-title">My Dashboard</div>
//           <div className="page-subtitle">Welcome back, Aryan Reddy · Sunday, April 19, 2026</div>
//         </div>
//       </div>

//       <div className="stat-grid">
//         <div className="stat-card s-amber">
//           <div className="stat-label">ETA to My Stop</div>
//           <div className="stat-val amber">8 min</div>
//           <div className="stat-sub">Bus arriving soon</div>
//         </div>
//         <div className="stat-card s-green">
//           <div className="stat-label">Bus Status</div>
//           <div className="stat-val green" style={{fontSize:18,marginTop:4}}>On Time</div>
//           <div className="stat-sub">KA-01-B · Route A</div>
//         </div>
//         <div className="stat-card s-blue">
//           <div className="stat-label">Stops Remaining</div>
//           <div className="stat-val blue">4</div>
//           <div className="stat-sub">Until your stop</div>
//         </div>
//         <div className="stat-card s-purple">
//           <div className="stat-label">Today's Trips</div>
//           <div className="stat-val purple">2</div>
//           <div className="stat-sub">Morning + Evening</div>
//         </div>
//       </div>

//       {/* ETA Banner */}
//       <div className="eta-banner">
//         <div>
//           <div style={{fontSize:12,color:'#94a3b8',marginBottom:4,fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px'}}>Bus Arriving At</div>
//           <div className="eta-bus-info">City Park · Stop 5</div>
//           <div className="eta-stop">KA-01-B · Route A — North Loop</div>
//         </div>
//         <div style={{marginLeft:'auto',textAlign:'center'}}>
//           <div className="eta-mins">8</div>
//           <div className="eta-label">minutes</div>
//         </div>
//         <div style={{background:'rgba(255,255,255,.08)',borderRadius:10,padding:'12px 18px',textAlign:'center'}}>
//           <div style={{fontSize:11,color:'#94a3b8',marginBottom:4}}>Scheduled</div>
//           <div style={{fontSize:18,fontWeight:700,fontFamily:"'DM Mono',monospace",color:'#fff'}}>07:22 AM</div>
//           <span className="status-pill sp-green" style={{marginTop:6,display:'inline-block'}}>On Time</span>
//         </div>
//       </div>

//       <div className="mid-row">
//         {/* Live Map */}
//         <div className="card">
//           <div className="card-header">
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
//             <span className="card-title">Live Bus Location</span>
//             <div className="ch-right"><span className="status-pill sp-green">● Live</span></div>
//           </div>
//           <div className="map-body">
//             <div className="map-grid-bg"/>
//             <div className="map-road" style={{left:0,top:190,width:'100%',height:3,opacity:.5}}/>
//             <div className="map-road" style={{left:0,top:120,width:'100%',height:2,opacity:.2}}/>
//             <div className="map-road" style={{left:200,top:0,width:2,height:'100%',opacity:.3}}/>
//             <div className="map-road" style={{left:420,top:0,width:2,height:'100%',opacity:.2}}/>
//             <div className="route-line-map" style={{left:50,top:191,width:520,background:'rgba(59,139,212,.4)'}}/>
//             {stopPositions.map((pos, i) => (
//               <div key={i}
//                 className={`stop-dot-map ${i < reachedIdx ? 'reached' : i === reachedIdx ? 'next' : 'upcoming'}`}
//                 style={{left:pos.left, top:pos.top}}
//                 onMouseEnter={() => setTooltip({...pos, name: STOPS[i].name, time: STOPS[i].time})}
//                 onMouseLeave={() => setTooltip(null)}
//               />
//             ))}
//             {tooltip && (
//               <div className="stop-tooltip" style={{left:tooltip.left, top:tooltip.top}}>
//                 {tooltip.name} · {tooltip.time}
//               </div>
//             )}
//             <div className="bus-dot-live" style={{left:busPos.left, top:busPos.top}} title="KA-01-B">🚌</div>
//             <div style={{position:'absolute',left:10,top:8,fontSize:10,color:'#94a3b8',fontFamily:"'DM Mono',monospace"}}>ROUTE A — NORTH LOOP</div>
//             <div style={{position:'absolute',left:10,top:178,fontSize:9,color:'rgba(37,99,235,.7)',fontFamily:"'DM Mono',monospace"}}>Route A</div>
//             <div style={{position:'absolute',left:busPos.left+2,top:busPos.top-18,fontSize:10,fontWeight:700,color:'var(--green)',fontFamily:"'DM Mono',monospace"}}>KA-01-B</div>
//           </div>
//           <div className="map-legend">
//             <div className="legend-item"><div className="legend-dot" style={{background:'var(--green)'}}/> Reached</div>
//             <div className="legend-item"><div className="legend-dot" style={{background:'var(--accent)'}}/> Next Stop</div>
//             <div className="legend-item"><div className="legend-dot" style={{background:'#94a3b8'}}/> Upcoming</div>
//             <div className="legend-item"><div style={{fontSize:13}}>🚌</div> Bus</div>
//           </div>
//         </div>

//         {/* Route Stops */}
//         <div className="card">
//           <div className="card-header">
//             <span className="card-title">Route Stops</span>
//             <div className="ch-right"><span className="card-sub">8 stops</span></div>
//           </div>
//           <div className="stops-list">
//             {STOPS.map((stop, i) => {
//               const isReached = i < reachedIdx;
//               const isNext = i === reachedIdx;
//               const isMine = i === MY_STOP_IDX;
//               const isFav = favs.includes(stop.id);
//               return (
//                 <div key={stop.id}
//                   className={`stop-item ${isNext ? 'active-stop' : ''} ${isReached ? 'reached-stop' : ''}`}>
//                   <div className={`stop-circle ${isReached ? 'sc-green' : isNext ? 'sc-amber' : 'sc-gray'}`}>
//                     {isReached ? '✓' : i+1}
//                   </div>
//                   <div>
//                     <div className="stop-name">{stop.name} {isMine && <span style={{fontSize:10,background:'rgba(37,99,235,.12)',color:'var(--blue)',padding:'1px 7px',borderRadius:5,marginLeft:4}}>MY STOP</span>}</div>
//                     <div className="stop-meta">{stop.time} · {stop.dist}</div>
//                   </div>
//                   <div className="stop-right">
//                     {isNext && <span className="status-pill sp-amber">Next</span>}
//                     <button className="fav-btn" onClick={() => { toggleFav(stop.id); showToast(isFav ? 'Removed from favorites' : '❤️ Added to favorites'); }} title={isFav ? 'Remove favorite' : 'Add favorite'}>
//                       {isFav ? '❤️' : '🤍'}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PageTracking({ favs, toggleFav, showToast }) {
//   const [busPos, setBusPos] = useState(310);
//   useEffect(() => {
//     const t = setInterval(() => setBusPos(p => p >= 560 ? 60 : p + 2), 100);
//     return () => clearInterval(t);
//   }, []);
//   const reachedIdx = Math.floor((busPos - 60) / 62.5);

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Live Tracking</div><div className="page-subtitle">Real-time bus position · KA-01-B</div></div>
//         <span className="status-pill sp-green" style={{fontSize:12,padding:'6px 14px'}}>● Bus is Live</span>
//       </div>
//       <div className="eta-banner">
//         <div>
//           <div style={{fontSize:11,color:'#94a3b8',marginBottom:4,fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px'}}>Next Stop</div>
//           <div style={{fontSize:15,fontWeight:700,color:'#fff'}}>City Park</div>
//           <div style={{fontSize:11.5,color:'#94a3b8',marginTop:2}}>Stop 5 of 8 · Route A</div>
//         </div>
//         <div style={{marginLeft:'auto',textAlign:'center'}}>
//           <div className="eta-mins">8</div>
//           <div className="eta-label">min ETA</div>
//         </div>
//         <div style={{background:'rgba(255,255,255,.08)',borderRadius:10,padding:'12px 18px'}}>
//           <div style={{fontSize:11,color:'#94a3b8',marginBottom:4}}>Bus Speed</div>
//           <div style={{fontSize:20,fontWeight:700,color:'var(--accent)',fontFamily:"'DM Mono',monospace"}}>42 km/h</div>
//         </div>
//         <div style={{background:'rgba(255,255,255,.08)',borderRadius:10,padding:'12px 18px'}}>
//           <div style={{fontSize:11,color:'#94a3b8',marginBottom:4}}>Passengers</div>
//           <div style={{fontSize:20,fontWeight:700,color:'#fff',fontFamily:"'DM Mono',monospace"}}>34/50</div>
//         </div>
//       </div>
//       <div className="card">
//         <div className="card-header"><span className="card-title">Live Map — Animated Bus</span><div className="ch-right"><span style={{fontSize:11,color:'var(--muted)'}}>Auto-updating</span></div></div>
//         <div className="map-body" style={{height:320}}>
//           <div className="map-grid-bg"/>
//           <div className="map-road" style={{left:0,top:190,width:'100%',height:3,opacity:.5}}/>
//           <div className="map-road" style={{left:0,top:120,width:'100%',height:2,opacity:.2}}/>
//           <div className="map-road" style={{left:200,top:0,width:2,height:'100%',opacity:.3}}/>
//           <div className="route-line-map" style={{left:50,top:191,width:560,background:'rgba(59,139,212,.4)'}}/>
//           {STOPS.map((stop, i) => {
//             const pos = { left: 60 + i * 75, top: 187 };
//             const isReached = i < reachedIdx;
//             const isNext = i === reachedIdx;
//             return (
//               <div key={i} className={`stop-dot-map ${isReached ? 'reached' : isNext ? 'next' : 'upcoming'}`}
//                 style={{left:pos.left, top:pos.top}}>
//                 {i === MY_STOP_IDX && <div style={{position:'absolute',top:-18,left:'50%',transform:'translateX(-50%)',fontSize:9,fontWeight:800,color:'var(--blue)',whiteSpace:'nowrap',background:'rgba(37,99,235,.1)',padding:'1px 5px',borderRadius:4}}>MY STOP</div>}
//               </div>
//             );
//           })}
//           <div className="bus-dot-live" style={{left:busPos, top:179}}>🚌</div>
//           <div style={{position:'absolute',left:busPos+2,top:163,fontSize:10,fontWeight:700,color:'var(--green)',fontFamily:"'DM Mono',monospace",whiteSpace:'nowrap'}}>KA-01-B</div>
//         </div>
//         <div className="map-legend">
//           <div className="legend-item"><div className="legend-dot" style={{background:'var(--green)'}}/> Reached</div>
//           <div className="legend-item"><div className="legend-dot" style={{background:'var(--accent)'}}/> Next</div>
//           <div className="legend-item"><div className="legend-dot" style={{background:'#94a3b8'}}/> Upcoming</div>
//           <div className="legend-item" style={{marginLeft:'auto',color:'var(--blue)',fontWeight:600}}>📍 Your Stop = City Park</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PageRoutes() {
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">My Route</div><div className="page-subtitle">Route A — North Loop · 8 stops</div></div>
//         <span className="status-pill sp-green" style={{fontSize:12,padding:'6px 14px'}}>Active Route</span>
//       </div>
//       <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
//         <div className="card">
//           <div className="card-header"><span className="card-title">Route Details</span></div>
//           <div style={{padding:'16px 18px',display:'flex',flexDirection:'column',gap:10}}>
//             {[['Route','Route A — North Loop'],['Bus Number','KA-01-B'],['Driver','R. Kumar'],['Total Stops','8'],['Total Distance','8.9 km'],['Avg Duration','52 minutes'],['My Stop','City Park (Stop 5)'],['Pickup Time','07:22 AM']].map(([k,v]) => (
//               <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:13,paddingBottom:8,borderBottom:'1px solid var(--border)'}}>
//                 <span style={{color:'var(--muted)'}}>{k}</span>
//                 <span style={{fontWeight:600}}>{v}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="card">
//           <div className="card-header"><span className="card-title">All Stops</span></div>
//           <div className="stops-list">
//             {STOPS.map((stop, i) => (
//               <div key={stop.id} className={`stop-item ${i === MY_STOP_IDX ? 'active-stop' : ''}`}>
//                 <div className={`stop-circle ${i === MY_STOP_IDX ? 'sc-amber' : i < MY_STOP_IDX ? 'sc-green' : 'sc-gray'}`}>{i+1}</div>
//                 <div>
//                   <div className="stop-name">{stop.name} {i === MY_STOP_IDX && <span style={{fontSize:10,background:'rgba(37,99,235,.12)',color:'var(--blue)',padding:'1px 7px',borderRadius:5,marginLeft:4}}>MY STOP</span>}</div>
//                   <div className="stop-meta">{stop.time} · {stop.dist}</div>
//                 </div>
//                 <div style={{marginLeft:'auto'}}>
//                   <div style={{fontSize:11,color:'var(--muted)',fontFamily:"'DM Mono',monospace"}}>{stop.time}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PageNotifications({ notifs, setNotifs }) {
//   const unread = notifs.filter(n => !n.read).length;
//   const markAll = () => setNotifs(ns => ns.map(n => ({...n, read:true})));
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Notifications</div><div className="page-subtitle">{unread} unread alerts</div></div>
//         <button className="fab-btn fab-secondary" onClick={markAll}>✓ Mark all read</button>
//       </div>
//       <div className="card">
//         <div className="notif-list">
//           {notifs.map((n, i) => (
//             <div key={i} className={`notif-item${n.read ? '' : ' unread'}`} onClick={() => setNotifs(ns => ns.map((x,j) => j===i ? {...x,read:true} : x))}>
//               <div className={`notif-icon ni-${n.color}`}>{n.icon}</div>
//               <div style={{flex:1}}>
//                 <div className="notif-text" dangerouslySetInnerHTML={{__html:n.text}}/>
//                 <div className="notif-time">{n.time}</div>
//               </div>
//               {!n.read && <div className="unread-dot"/>}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function PageFavorites({ favs, toggleFav, showToast }) {
//   const favStops = STOPS.filter(s => favs.includes(s.id));
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Favorite Stops</div><div className="page-subtitle">{favStops.length} saved stops</div></div>
//       </div>
//       {favStops.length === 0 ? (
//         <div className="card" style={{padding:'40px',textAlign:'center'}}>
//           <div style={{fontSize:32,marginBottom:12}}>🤍</div>
//           <div style={{fontSize:15,fontWeight:600,color:'var(--muted)'}}>No favorite stops yet</div>
//           <div style={{fontSize:13,color:'var(--muted)',marginTop:6}}>Go to the Route page and tap the heart icon to save stops</div>
//         </div>
//       ) : (
//         <div className="card">
//           {favStops.map((stop, i) => (
//             <div key={stop.id} className="stop-item">
//               <div className="stop-circle sc-fav">❤</div>
//               <div>
//                 <div className="stop-name">{stop.name}</div>
//                 <div className="stop-meta">{stop.time} · {stop.dist} from college</div>
//               </div>
//               <div className="stop-right">
//                 <button className="fab-btn fab-secondary" style={{fontSize:11,padding:'5px 12px'}} onClick={() => { toggleFav(stop.id); showToast('Removed from favorites'); }}>Remove</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function PageProfile({ navigate }) {
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">My Profile</div><div className="page-subtitle">Student account details</div></div>
//       </div>
//       <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:14}}>
//         <div className="profile-card">
//           <div className="profile-avatar">AR</div>
//           <div className="profile-name">Aryan Reddy</div>
//           <div className="profile-id">STU2024001</div>
//           <span className="status-pill sp-green">Active</span>
//           {[['Class','10-A'],['Route','Route A'],['Pickup Stop','City Park'],['Bus','KA-01-B'],['Driver','R. Kumar'],['Parent Contact','+91 98765 43210']].map(([k,v]) => (
//             <div key={k} className="profile-row"><span className="profile-key">{k}</span><span className="profile-val">{v}</span></div>
//           ))}
//           <button className="fab-btn fab-secondary" style={{width:'100%',justifyContent:'center',marginTop:6}} onClick={() => navigate('/')}>← Logout</button>
//         </div>
//         <div style={{display:'flex',flexDirection:'column',gap:14}}>
//           <div className="card">
//             <div className="card-header"><span className="card-title">This Week's Trips</span></div>
//             <table className="data-table">
//               <thead><tr><th>Date</th><th>Route</th><th>Pickup</th><th>Status</th></tr></thead>
//               <tbody>
//                 {[['Apr 19','Route A','07:22 AM','sp-green','On Time'],['Apr 18','Route A','07:25 AM','sp-amber','Delayed +3'],['Apr 17','Route A','07:22 AM','sp-green','On Time'],['Apr 16','Route A','07:20 AM','sp-green','On Time'],['Apr 15','Route A','07:22 AM','sp-green','On Time']].map(([d,r,t,sc,st])=>(
//                   <tr key={d}><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{d}</td><td>{r}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{t}</td><td><span className={`status-pill ${sc}`}>{st}</span></td></tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="card" style={{padding:18}}>
//             <div style={{fontWeight:600,fontSize:14,marginBottom:14}}>On-Time Performance</div>
//             <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
//               {[['94%','On-Time Rate','var(--green)'],['6 min','Avg Delay','var(--accent)'],['42','Trips This Month','var(--blue)'],['2','Missed','var(--red)']].map(([v,l,c])=>(
//                 <div key={l} style={{flex:1,minWidth:100,background:'#f8fafc',borderRadius:10,padding:'14px',border:'1px solid var(--border)'}}>
//                   <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
//                   <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{l}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function StudentDashboard() {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState('home');
//   const [favs, setFavs] = useState([4]);
//   const [toast, setToast] = useState(null);
//   const [clock, setClock] = useState('');
//   const toastRef = useRef(null);

//   const [notifs, setNotifs] = useState([
//     {icon:'🚌',color:'amber',text:'<strong>Bus KA-01-B</strong> is arriving at City Park in 8 minutes',time:'09:14 AM',read:false},
//     {icon:'⚠️',color:'red',text:'<strong>Route A</strong> delayed by 5 minutes due to traffic',time:'08:55 AM',read:false},
//     {icon:'✅',color:'green',text:'<strong>Bus departed</strong> College Main Gate on time',time:'07:00 AM',read:true},
//     {icon:'📍',color:'blue',text:'<strong>Stop update:</strong> North Bridge stop timing changed to 07:16 AM',time:'Yesterday',read:true},
//     {icon:'🔔',color:'amber',text:'<strong>Reminder:</strong> Tomorrow\'s first bus departs at 07:00 AM',time:'Yesterday',read:true},
//   ]);

//   useEffect(() => {
//     const tick = () => setClock(new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}));
//     tick();
//     const t = setInterval(tick, 1000);
//     return () => clearInterval(t);
//   }, []);

//   const showToast = (msg) => {
//     setToast(msg);
//     clearTimeout(toastRef.current);
//     toastRef.current = setTimeout(() => setToast(null), 2500);
//   };

//   const toggleFav = (id) => setFavs(f => f.includes(id) ? f.filter(x=>x!==id) : [...f, id]);

//   const unreadCount = notifs.filter(n => !n.read).length;

//   const navSections = [
//     {label:'Overview',items:[
//       {id:'home',icon:<IconHome/>,label:'Dashboard'},
//       {id:'tracking',icon:<IconMap/>,label:'Live Tracking'},
//     ]},
//     {label:'My Bus',items:[
//       {id:'routes',icon:<IconRoute/>,label:'My Route'},
//       {id:'favorites',icon:<span className="ni" style={{fontSize:14}}>❤️</span>,label:'Favorites'},
//     ]},
//     {label:'Account',items:[
//       {id:'notifications',icon:<IconBell/>,label:'Notifications',badge:unreadCount||null},
//       {id:'profile',icon:<IconUser/>,label:'My Profile'},
//     ]},
//   ];

//   const renderPage = () => {
//     switch(activePage) {
//       case 'home': return <PageHome favs={favs} toggleFav={toggleFav} showToast={showToast}/>;
//       case 'tracking': return <PageTracking favs={favs} toggleFav={toggleFav} showToast={showToast}/>;
//       case 'routes': return <PageRoutes/>;
//       case 'favorites': return <PageFavorites favs={favs} toggleFav={toggleFav} showToast={showToast}/>;
//       case 'notifications': return <PageNotifications notifs={notifs} setNotifs={setNotifs}/>;
//       case 'profile': return <PageProfile navigate={navigate}/>;
//       default: return <PageHome favs={favs} toggleFav={toggleFav} showToast={showToast}/>;
//     }
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <div className="layout">
//         <div className="topbar">
//           <div className="logo">
//             <div className="logo-icon"><BusLogo/></div>
//             BusNav Student
//           </div>
//           <div className="spacer"/>
//           <div className="topbar-right">
//             <div className="topbar-time">{clock}</div>
//             <div className="badge-notif" onClick={() => setActivePage('notifications')}><IconBellTop/>{unreadCount > 0 && <span className="dot"/>}</div>
//             <div className="avatar">AR</div>
//           </div>
//         </div>
//         <div className="body-wrap">
//           <div className="sidebar">
//             {navSections.map(s => (
//               <div className="nav-section" key={s.label}>
//                 <div className="nav-label">{s.label}</div>
//                 {s.items.map(it => (
//                   <button key={it.id} className={`nav-item${activePage===it.id?' active':''}`} onClick={() => setActivePage(it.id)}>
//                     {it.icon} {it.label}
//                     {it.badge ? <span style={{marginLeft:'auto',background:'var(--red)',color:'#fff',fontSize:'9.5px',fontWeight:700,padding:'2px 6px',borderRadius:10}}>{it.badge}</span> : null}
//                   </button>
//                 ))}
//               </div>
//             ))}
//             <div className="sidebar-bottom">
//               <button className="nav-item" style={{color:'#64748b'}} onClick={() => navigate('/')}><IconLogout/> Logout</button>
//             </div>
//           </div>
//           <div className="main">{renderPage()}</div>
//         </div>
//       </div>
//       {toast && <div className="toast">{toast}</div>}
//     </>
//   );
// }
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
.badge-notif{position:relative;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#f8fafc;border:1px solid var(--border)}
.badge-notif .dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--red);border-radius:50%;border:2px solid #fff}
.avatar{width:32px;height:32px;background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#1a1a1a;cursor:pointer}
.topbar-time{font-size:12.5px;color:var(--muted);font-family:'DM Mono',monospace;background:#f8fafc;padding:4px 10px;border-radius:6px;border:1px solid var(--border)}
.body-wrap{display:flex;flex:1}
.sidebar{width:220px;background:#1e293b;border-right:1px solid #334155;display:flex;flex-direction:column;padding:14px 0;flex-shrink:0;position:sticky;top:58px;height:calc(100vh - 58px);overflow-y:auto}
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
.stat-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;position:relative;overflow:hidden;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.stat-card:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px)}
.stat-card::after{content:'';position:absolute;top:-10px;right:-10px;width:70px;height:70px;border-radius:50%;opacity:.08}
.stat-card.s-green::after{background:#16a34a}
.stat-card.s-amber::after{background:var(--accent)}
.stat-card.s-blue::after{background:#2563eb}
.stat-card.s-purple::after{background:#7c3aed}
.stat-label{font-size:10.5px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
.stat-val{font-size:28px;font-weight:700;line-height:1;letter-spacing:-1px}
.stat-val.green{color:var(--green)} .stat-val.amber{color:var(--accent)} .stat-val.blue{color:var(--blue)} .stat-val.purple{color:#7c3aed}
.stat-sub{font-size:11.5px;color:var(--muted);margin-top:8px}
.card{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.card-header{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid var(--border);background:#f8fafc}
.card-title{font-size:13.5px;font-weight:600;color:var(--text)}
.card-sub{font-size:11.5px;color:var(--muted)}
.ch-right{margin-left:auto;display:flex;align-items:center;gap:8px}
.mid-row{display:grid;grid-template-columns:1fr 300px;gap:14px}
.map-body{height:280px;background:#eef4fb;position:relative;overflow:hidden}
.map-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,139,212,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,139,212,.1) 1px,transparent 1px);background-size:36px 36px}
.map-road{position:absolute;background:rgba(148,163,184,.3);border-radius:2px}
.bus-dot-live{position:absolute;width:26px;height:26px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;animation:pulseLive 2s infinite;cursor:pointer;z-index:3}
@keyframes pulseLive{0%,100%{box-shadow:0 0 0 4px rgba(22,163,74,.25)}50%{box-shadow:0 0 0 10px rgba(22,163,74,.06)}}
.stop-dot-map{position:absolute;width:9px;height:9px;border-radius:50%;z-index:2;cursor:pointer}
.stop-dot-map.reached{background:var(--green);border:2px solid #fff;box-shadow:0 0 0 2px var(--green)}
.stop-dot-map.next{background:var(--accent);border:2px solid #fff;box-shadow:0 0 0 2px var(--accent);animation:pulseStop 1.5s infinite}
.stop-dot-map.upcoming{background:#cbd5e1;border:2px solid #94a3b8}
@keyframes pulseStop{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}
.route-line-map{position:absolute;height:4px;border-radius:2px;z-index:1}
.map-legend{display:flex;align-items:center;gap:16px;padding:10px 18px;border-top:1px solid var(--border);background:#f8fafc}
.legend-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
.legend-dot{width:8px;height:8px;border-radius:50%}
.stop-tooltip{position:absolute;background:#1e293b;color:#fff;font-size:11px;font-weight:600;padding:4px 9px;border-radius:6px;white-space:nowrap;z-index:10;pointer-events:none;transform:translate(-50%,-120%)}
.stop-tooltip::after{content:'';position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:#1e293b;border-bottom:none}
.eta-banner{background:linear-gradient(135deg,#1e293b,#334155);color:#fff;border-radius:13px;padding:20px 22px;display:flex;align-items:center;gap:18px}
.eta-mins{font-size:42px;font-weight:800;color:var(--accent);line-height:1;font-family:'DM Mono',monospace}
.eta-label{font-size:12px;color:#94a3b8;margin-top:4px}
.eta-bus-info{font-size:13px;font-weight:600;color:#e2e8f0}
.eta-stop{font-size:11.5px;color:#94a3b8;margin-top:3px}
.stops-list{padding:8px 0}
.stop-item{display:flex;align-items:center;gap:12px;padding:10px 18px;cursor:pointer;transition:background .15s;border-left:3px solid transparent}
.stop-item:hover{background:#f8fafc}
.stop-item.active-stop{background:rgba(245,166,35,.06);border-left-color:var(--accent)}
.stop-item.reached-stop{opacity:.55}
.stop-circle{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0}
.sc-green{background:rgba(22,163,74,.12);color:var(--green)}
.sc-amber{background:rgba(245,166,35,.15);color:var(--accent2)}
.sc-gray{background:#f1f5f9;color:#94a3b8}
.sc-fav{background:rgba(220,38,38,.1);color:var(--red)}
.stop-name{font-size:13px;font-weight:600;color:var(--text)}
.stop-meta{font-size:11px;color:var(--muted);margin-top:1px}
.stop-right{margin-left:auto;display:flex;align-items:center;gap:8px}
.fav-btn{background:none;border:none;cursor:pointer;font-size:14px;transition:transform .15s;padding:2px}
.fav-btn:hover{transform:scale(1.3)}
.notif-list{padding:6px 0}
.notif-item{display:flex;align-items:flex-start;gap:10px;padding:11px 18px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s}
.notif-item:last-child{border-bottom:none}
.notif-item:hover{background:#f8fafc}
.notif-item.unread{background:rgba(245,166,35,.04)}
.notif-icon{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;margin-top:1px}
.ni-amber{background:rgba(245,166,35,.12)}
.ni-green{background:rgba(22,163,74,.1)}
.ni-blue{background:rgba(37,99,235,.1)}
.ni-red{background:rgba(220,38,38,.1)}
.notif-text{font-size:12.5px;color:var(--text);line-height:1.5}
.notif-text strong{font-weight:600}
.notif-time{font-size:10.5px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:3px}
.unread-dot{width:7px;height:7px;background:var(--accent);border-radius:50%;margin-top:4px;flex-shrink:0}
.status-pill{font-size:10px;padding:3px 9px;border-radius:8px;font-weight:700;display:inline-block}
.sp-green{background:rgba(22,163,74,.12);color:var(--green)}
.sp-amber{background:rgba(245,166,35,.12);color:var(--accent)}
.sp-gray{background:rgba(122,143,170,.1);color:var(--muted)}
.sp-red{background:rgba(220,38,38,.12);color:var(--red)}
.sp-blue{background:rgba(37,99,235,.12);color:var(--blue)}
.fab-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:'DM Sans',sans-serif}
.fab-primary{background:var(--accent);color:#1a1a1a}
.fab-primary:hover{background:var(--accent2)}
.fab-secondary{background:#fff;color:var(--text);border:1px solid var(--border)}
.fab-secondary:hover{background:#f1f5f9}
.data-table{width:100%;border-collapse:collapse}
.data-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;padding:10px 16px;text-align:left;border-bottom:1px solid var(--border);background:#f8fafc}
.data-table td{padding:10px 16px;font-size:12.5px;border-bottom:1px solid var(--border);vertical-align:middle}
.data-table tr:last-child td{border-bottom:none}
.data-table tr:hover td{background:#f8fafc}
.profile-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.profile-avatar{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#e8951f);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#1a1a1a}
.profile-name{font-size:16px;font-weight:700}
.profile-id{font-size:12px;color:var(--muted);font-family:'DM Mono',monospace}
.profile-row{width:100%;display:flex;justify-content:space-between;font-size:12.5px;padding:6px 0;border-bottom:1px solid var(--border)}
.profile-key{color:var(--muted)}
.profile-val{font-weight:600}
.toast{position:fixed;bottom:28px;right:28px;background:var(--green);color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:fadeIn .3s ease}
.search-input{width:100%;padding:9px 36px 9px 14px;border:1.5px solid var(--border);border-radius:9px;font-size:13px;font-family:'DM Sans',sans-serif;color:var(--text);background:#f8fafc;outline:none;transition:all .15s}
.search-input:focus{border-color:var(--accent);background:#fff;box-shadow:0 0 0 3px rgba(245,166,35,.1)}
.time-slot{display:flex;flex-direction:column;gap:3px}
.time-slot-label{font-size:9.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.time-slot-val{font-size:12px;font-weight:700;font-family:'DM Mono',monospace;color:var(--text)}
::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
`;

const IconHome   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconMap    = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>;
const IconBell   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IconUser   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconRoute  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconLogout = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconBellTop= () => <svg width="15" height="15" fill="none" stroke="var(--muted)" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const BusLogo    = () => <svg viewBox="0 0 24 24" fill="#1a1a1a"><path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 9h16v4H4V9z"/></svg>;

const STOPS = [
  { id:1, name:"College Main Gate", dist:"0 km",   mrnPickup:"07:00 AM", mrnDrop:"07:52 AM", evnPickup:"05:00 PM", evnDrop:"05:52 PM" },
  { id:2, name:"Market Circle",     dist:"1.2 km", mrnPickup:"07:08 AM", mrnDrop:"07:44 AM", evnPickup:"05:08 PM", evnDrop:"05:44 PM" },
  { id:3, name:"North Bridge",      dist:"2.5 km", mrnPickup:"07:15 AM", mrnDrop:"07:37 AM", evnPickup:"05:15 PM", evnDrop:"05:37 PM" },
  { id:4, name:"City Park",         dist:"3.8 km", mrnPickup:"07:22 AM", mrnDrop:"07:30 AM", evnPickup:"05:22 PM", evnDrop:"05:30 PM" },
  { id:5, name:"East Market",       dist:"5.1 km", mrnPickup:"07:30 AM", mrnDrop:"07:22 AM", evnPickup:"05:30 PM", evnDrop:"05:22 PM" },
  { id:6, name:"Rail Station",      dist:"6.4 km", mrnPickup:"07:38 AM", mrnDrop:"07:15 AM", evnPickup:"05:38 PM", evnDrop:"05:15 PM" },
  { id:7, name:"Sadashiv Nagar",    dist:"7.6 km", mrnPickup:"07:45 AM", mrnDrop:"07:08 AM", evnPickup:"05:45 PM", evnDrop:"05:08 PM" },
  { id:8, name:"Tilakwadi",         dist:"8.9 km", mrnPickup:"07:52 AM", mrnDrop:"07:00 AM", evnPickup:"05:52 PM", evnDrop:"05:00 PM" },
];

const MY_STOP_IDX = 3; // City Park

// ─────────────────────────── PAGE HOME ───────────────────────────────────────
function PageHome({ showToast, setActivePage }) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">My Dashboard</div>
          <div className="page-subtitle">Welcome back, Aryan Reddy · Sunday, April 19, 2026</div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card s-amber">
          <div className="stat-label">ETA to My Stop</div>
          <div className="stat-val amber">8 min</div>
          <div className="stat-sub">Bus arriving soon</div>
        </div>
        <div className="stat-card s-green">
          <div className="stat-label">Bus Status</div>
          <div className="stat-val green" style={{fontSize:18,marginTop:4}}>On Time</div>
          <div className="stat-sub">KA-01-B · Route A</div>
        </div>
        <div className="stat-card s-blue">
          <div className="stat-label">Stops Remaining</div>
          <div className="stat-val blue">4</div>
          <div className="stat-sub">Until your stop</div>
        </div>
        <div className="stat-card s-purple">
          <div className="stat-label">Today's Trips</div>
          <div className="stat-val purple">2</div>
          <div className="stat-sub">Morning + Evening</div>
        </div>
      </div>

      {/* Quick info cards */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div className="card" style={{padding:20}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:14,display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:18}}>🌅</span> Morning Trip
          </div>
          {[['My Stop','City Park'],['Pickup Time','07:22 AM'],['Bus','KA-01-B'],['Driver','R. Kumar'],['Route','Route A — North Loop']].map(([k,v])=>(
            <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:13,paddingBottom:8,borderBottom:'1px solid var(--border)',marginBottom:6}}>
              <span style={{color:'var(--muted)'}}>{k}</span><span style={{fontWeight:600}}>{v}</span>
            </div>
          ))}
          <button className="fab-btn fab-primary" style={{width:'100%',justifyContent:'center',marginTop:8}} onClick={() => setActivePage('tracking')}>
            📍 Track Live
          </button>
        </div>
        <div className="card" style={{padding:20}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:14,display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:18}}>🌆</span> Evening Trip
          </div>
          {[['My Stop','City Park'],['Drop Time','05:22 PM'],['Bus','KA-01-B'],['Driver','R. Kumar'],['Route','Route A — South Return']].map(([k,v])=>(
            <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:13,paddingBottom:8,borderBottom:'1px solid var(--border)',marginBottom:6}}>
              <span style={{color:'var(--muted)'}}>{k}</span><span style={{fontWeight:600}}>{v}</span>
            </div>
          ))}
          <div style={{marginTop:8,padding:'10px 14px',background:'rgba(100,116,139,.06)',borderRadius:9,fontSize:12,color:'var(--muted)',fontWeight:600,textAlign:'center'}}>
            ⏰ Departs at 05:00 PM
          </div>
        </div>
      </div>

      {/* Recent Notifications preview */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Alerts</span>
          <div className="ch-right">
            <button className="fab-btn fab-secondary" style={{fontSize:11,padding:'5px 12px'}} onClick={() => setActivePage('notifications')}>View All</button>
          </div>
        </div>
        <div className="notif-list">
          {[
            {icon:'🚌',color:'amber',text:'<strong>Bus KA-01-B</strong> is arriving at City Park in 8 minutes',time:'09:14 AM',read:false},
            {icon:'⚠️',color:'red',text:'<strong>Route A</strong> delayed by 5 minutes due to traffic',time:'08:55 AM',read:false},
            {icon:'✅',color:'green',text:'<strong>Bus departed</strong> College Main Gate on time',time:'07:00 AM',read:true},
          ].map((n, i) => (
            <div key={i} className={`notif-item${n.read ? '' : ' unread'}`}>
              <div className={`notif-icon ni-${n.color}`}>{n.icon}</div>
              <div style={{flex:1}}>
                <div className="notif-text" dangerouslySetInnerHTML={{__html:n.text}}/>
                <div className="notif-time">{n.time}</div>
              </div>
              {!n.read && <div className="unread-dot"/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── PAGE TRACKING ───────────────────────────────────
function PageTracking({ favs, toggleFav, showToast }) {
  const [busPos, setBusPos] = useState(310);
  const [tooltip, setTooltip] = useState(null);
  useEffect(() => {
    const t = setInterval(() => setBusPos(p => p >= 560 ? 60 : p + 2), 100);
    return () => clearInterval(t);
  }, []);
  const reachedIdx = Math.floor((busPos - 60) / 62.5);
  const stopPositions = STOPS.map((_, i) => ({ left: 60 + i * 75, top: 187 }));

  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Live Tracking</div><div className="page-subtitle">Real-time bus position · KA-01-B</div></div>
        <span className="status-pill sp-green" style={{fontSize:12,padding:'6px 14px'}}>● Bus is Live</span>
      </div>

      {/* ETA Banner */}
      <div className="eta-banner">
        <div>
          <div style={{fontSize:12,color:'#94a3b8',marginBottom:4,fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px'}}>Bus Arriving At</div>
          <div className="eta-bus-info">City Park · Stop 4</div>
          <div className="eta-stop">KA-01-B · Route A — North Loop</div>
        </div>
        <div style={{marginLeft:'auto',textAlign:'center'}}>
          <div className="eta-mins">8</div>
          <div className="eta-label">minutes</div>
        </div>
        <div style={{background:'rgba(255,255,255,.08)',borderRadius:10,padding:'12px 18px',textAlign:'center'}}>
          <div style={{fontSize:11,color:'#94a3b8',marginBottom:4}}>Scheduled</div>
          <div style={{fontSize:18,fontWeight:700,fontFamily:"'DM Mono',monospace",color:'#fff'}}>07:22 AM</div>
          <span className="status-pill sp-green" style={{marginTop:6,display:'inline-block'}}>On Time</span>
        </div>
        <div style={{background:'rgba(255,255,255,.08)',borderRadius:10,padding:'12px 18px',textAlign:'center'}}>
          <div style={{fontSize:11,color:'#94a3b8',marginBottom:4}}>Speed</div>
          <div style={{fontSize:20,fontWeight:700,color:'var(--accent)',fontFamily:"'DM Mono',monospace"}}>42 km/h</div>
        </div>
      </div>

      {/* Live Map */}
      <div className="card">
        <div className="card-header">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
          <span className="card-title">Live Bus Location</span>
          <div className="ch-right"><span className="status-pill sp-green">● Live</span></div>
        </div>
        <div className="map-body" style={{height:320}}>
          <div className="map-grid-bg"/>
          <div className="map-road" style={{left:0,top:190,width:'100%',height:3,opacity:.5}}/>
          <div className="map-road" style={{left:0,top:120,width:'100%',height:2,opacity:.2}}/>
          <div className="map-road" style={{left:200,top:0,width:2,height:'100%',opacity:.3}}/>
          <div className="map-road" style={{left:420,top:0,width:2,height:'100%',opacity:.2}}/>
          <div className="route-line-map" style={{left:50,top:191,width:560,background:'rgba(59,139,212,.4)'}}/>
          {stopPositions.map((pos, i) => (
            <div key={i}
              className={`stop-dot-map ${i < reachedIdx ? 'reached' : i === reachedIdx ? 'next' : 'upcoming'}`}
              style={{left:pos.left, top:pos.top}}
              onMouseEnter={() => setTooltip({...pos, name: STOPS[i].name, time: STOPS[i].mrnPickup})}
              onMouseLeave={() => setTooltip(null)}
            >
              {i === MY_STOP_IDX && <div style={{position:'absolute',top:-18,left:'50%',transform:'translateX(-50%)',fontSize:9,fontWeight:800,color:'var(--blue)',whiteSpace:'nowrap',background:'rgba(37,99,235,.1)',padding:'1px 5px',borderRadius:4}}>MY STOP</div>}
            </div>
          ))}
          {tooltip && (
            <div className="stop-tooltip" style={{left:tooltip.left, top:tooltip.top}}>
              {tooltip.name} · {tooltip.time}
            </div>
          )}
          <div className="bus-dot-live" style={{left:busPos, top:179}}>🚌</div>
          <div style={{position:'absolute',left:10,top:8,fontSize:10,color:'#94a3b8',fontFamily:"'DM Mono',monospace"}}>ROUTE A — NORTH LOOP</div>
          <div style={{position:'absolute',left:busPos+2,top:163,fontSize:10,fontWeight:700,color:'var(--green)',fontFamily:"'DM Mono',monospace",whiteSpace:'nowrap'}}>KA-01-B</div>
        </div>
        <div className="map-legend">
          <div className="legend-item"><div className="legend-dot" style={{background:'var(--green)'}}/> Reached</div>
          <div className="legend-item"><div className="legend-dot" style={{background:'var(--accent)'}}/> Next Stop</div>
          <div className="legend-item"><div className="legend-dot" style={{background:'#94a3b8'}}/> Upcoming</div>
          <div className="legend-item"><div style={{fontSize:13}}>🚌</div> Bus</div>
          <div className="legend-item" style={{marginLeft:'auto',color:'var(--blue)',fontWeight:600}}>📍 Your Stop = City Park</div>
        </div>
      </div>

      {/* Route Stops */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Route Stops</span>
          <div className="ch-right"><span className="card-sub">8 stops</span></div>
        </div>
        <div className="stops-list">
          {STOPS.map((stop, i) => {
            const isReached = i < reachedIdx;
            const isNext = i === reachedIdx;
            const isMine = i === MY_STOP_IDX;
            const isFav = favs.includes(stop.id);
            return (
              <div key={stop.id} className={`stop-item ${isNext ? 'active-stop' : ''} ${isReached ? 'reached-stop' : ''}`}>
                <div className={`stop-circle ${isReached ? 'sc-green' : isNext ? 'sc-amber' : 'sc-gray'}`}>
                  {isReached ? '✓' : i+1}
                </div>
                <div>
                  <div className="stop-name">{stop.name} {isMine && <span style={{fontSize:10,background:'rgba(37,99,235,.12)',color:'var(--blue)',padding:'1px 7px',borderRadius:5,marginLeft:4}}>MY STOP</span>}</div>
                  <div className="stop-meta">{stop.mrnPickup} · {stop.dist}</div>
                </div>
                <div className="stop-right">
                  {isNext && <span className="status-pill sp-amber">Next</span>}
                  <button className="fav-btn" onClick={() => { toggleFav(stop.id); showToast(isFav ? 'Removed from favorites' : '❤️ Added to favorites'); }}>
                    {isFav ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── PAGE ROUTES ─────────────────────────────────────
function PageRoutes({ favs, toggleFav, showToast }) {
  const [tripType, setTripType] = useState('morning'); // 'morning' | 'evening'

  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">My Route</div><div className="page-subtitle">Route A — North Loop · 8 stops</div></div>
        <span className="status-pill sp-green" style={{fontSize:12,padding:'6px 14px'}}>Active Route</span>
      </div>

      {/* Trip Type Toggle */}
      <div style={{display:'flex',gap:8}}>
        {[['morning','🌅 Morning'],['evening','🌆 Evening']].map(([val,label]) => (
          <button key={val} onClick={() => setTripType(val)}
            style={{padding:'8px 20px',borderRadius:20,fontWeight:700,fontSize:13,cursor:'pointer',border:'none',fontFamily:'DM Sans,sans-serif',transition:'all .15s',
              background: tripType===val ? 'var(--accent)' : '#f1f5f9',
              color: tripType===val ? '#1a1a1a' : 'var(--muted)',
            }}>{label}</button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        {/* Route Details */}
        <div className="card">
          <div className="card-header"><span className="card-title">Route Details</span></div>
          <div style={{padding:'16px 18px',display:'flex',flexDirection:'column',gap:10}}>
            {[
              ['Route','Route A — North Loop'],
              ['Bus Number','KA-01-B'],
              ['Driver','R. Kumar'],
              ['Total Stops','8'],
              ['Total Distance','8.9 km'],
              ['Avg Duration','52 minutes'],
              ['My Stop','City Park (Stop 4)'],
              tripType === 'morning'
                ? ['Morning Pickup','07:22 AM']
                : ['Evening Drop','05:22 PM'],
              tripType === 'morning'
                ? ['Morning Drop','07:52 AM (College)']
                : ['Evening Pickup','05:00 PM (College)'],
            ].map(([k,v]) => (
              <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:13,paddingBottom:8,borderBottom:'1px solid var(--border)'}}>
                <span style={{color:'var(--muted)'}}>{k}</span>
                <span style={{fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All Stops with time slots */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">All Stops</span>
            <div className="ch-right">
              <span style={{fontSize:10,color:'var(--muted)',fontWeight:600}}>
                {tripType === 'morning' ? 'Pickup → Drop' : 'Pickup → Drop'}
              </span>
            </div>
          </div>
          <div className="stops-list" style={{padding:0}}>
            {STOPS.map((stop, i) => {
              const isMine = i === MY_STOP_IDX;
              const isFav = favs.includes(stop.id);
              const pickup = tripType === 'morning' ? stop.mrnPickup : stop.evnPickup;
              const drop   = tripType === 'morning' ? stop.mrnDrop   : stop.evnDrop;
              return (
                <div key={stop.id} className={`stop-item ${isMine ? 'active-stop' : ''}`} style={{gap:10,padding:'10px 14px'}}>
                  <div className={`stop-circle ${isMine ? 'sc-amber' : i < MY_STOP_IDX ? 'sc-green' : 'sc-gray'}`} style={{width:24,height:24,fontSize:9}}>{i+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="stop-name" style={{fontSize:12}}>
                      {stop.name}
                      {isMine && <span style={{fontSize:9,background:'rgba(37,99,235,.12)',color:'var(--blue)',padding:'1px 6px',borderRadius:5,marginLeft:4}}>MY STOP</span>}
                    </div>
                    <div style={{display:'flex',gap:12,marginTop:3}}>
                      <div className="time-slot">
                        <span className="time-slot-label">Pickup</span>
                        <span className="time-slot-val" style={{color:'var(--green)'}}>{pickup}</span>
                      </div>
                      <div style={{width:1,background:'var(--border)',margin:'2px 0'}}/>
                      <div className="time-slot">
                        <span className="time-slot-label">Drop</span>
                        <span className="time-slot-val" style={{color:'var(--accent)'}}>{drop}</span>
                      </div>
                    </div>
                  </div>
                  <button className="fav-btn" style={{fontSize:13}} onClick={() => { toggleFav(stop.id); showToast(isFav ? 'Removed from favorites' : '❤️ Added to favorites'); }}>
                    {isFav ? '❤️' : '🤍'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── PAGE NOTIFICATIONS ───────────────────────────────
function PageNotifications({ notifs, setNotifs }) {
  const unread = notifs.filter(n => !n.read).length;
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Notifications</div><div className="page-subtitle">{unread} unread alerts</div></div>
        <button className="fab-btn fab-secondary" onClick={() => setNotifs(ns => ns.map(n => ({...n, read:true})))}>✓ Mark all read</button>
      </div>
      <div className="card">
        <div className="notif-list">
          {notifs.map((n, i) => (
            <div key={i} className={`notif-item${n.read ? '' : ' unread'}`} onClick={() => setNotifs(ns => ns.map((x,j) => j===i ? {...x,read:true} : x))}>
              <div className={`notif-icon ni-${n.color}`}>{n.icon}</div>
              <div style={{flex:1}}>
                <div className="notif-text" dangerouslySetInnerHTML={{__html:n.text}}/>
                <div className="notif-time">{n.time}</div>
              </div>
              {!n.read && <div className="unread-dot"/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── PAGE FAVORITES ───────────────────────────────────
function PageFavorites({ favs, toggleFav, showToast }) {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const favStops = STOPS.filter(s => favs.includes(s.id));
  const nonFavStops = STOPS.filter(s => !favs.includes(s.id));
  const filteredNonFav = nonFavStops.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Favorite Stops</div><div className="page-subtitle">{favStops.length} saved stops</div></div>
        <button className="fab-btn fab-primary" onClick={() => setShowAdd(v => !v)}>
          {showAdd ? '✕ Close' : '＋ Add Favorites'}
        </button>
      </div>

      {/* Add Favorites Panel */}
      {showAdd && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Add a Stop to Favorites</span>
          </div>
          <div style={{padding:'12px 18px 6px'}}>
            <div style={{position:'relative'}}>
              <input className="search-input" placeholder="Search stops…" value={search} onChange={e => setSearch(e.target.value)} />
              <span style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',fontSize:14,color:'var(--muted)'}}>🔍</span>
            </div>
          </div>
          {filteredNonFav.length === 0 ? (
            <div style={{padding:'16px 18px',fontSize:13,color:'var(--muted)',textAlign:'center'}}>
              {search ? 'No stops match your search.' : 'All stops are already in favorites!'}
            </div>
          ) : (
            filteredNonFav.map((stop, i) => (
              <div key={stop.id} className="stop-item" style={{borderLeft:'none'}}>
                <div className="stop-circle sc-gray" style={{width:24,height:24,fontSize:9}}>{STOPS.indexOf(stop)+1}</div>
                <div>
                  <div className="stop-name">{stop.name}</div>
                  <div className="stop-meta">{stop.mrnPickup} pickup · {stop.dist}</div>
                </div>
                <div className="stop-right">
                  <button className="fab-btn fab-primary" style={{fontSize:11,padding:'5px 12px'}} onClick={() => { toggleFav(stop.id); showToast('❤️ Added to favorites'); }}>＋ Add</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Favorites List */}
      {favStops.length === 0 ? (
        <div className="card" style={{padding:'40px',textAlign:'center'}}>
          <div style={{fontSize:32,marginBottom:12}}>🤍</div>
          <div style={{fontSize:15,fontWeight:600,color:'var(--muted)'}}>No favorite stops yet</div>
          <div style={{fontSize:13,color:'var(--muted)',marginTop:6}}>Click "Add Favorites" above to save stops</div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header"><span className="card-title">Saved Stops</span></div>
          {favStops.map(stop => (
            <div key={stop.id} className="stop-item" style={{borderLeft:'none'}}>
              <div className="stop-circle sc-fav">❤</div>
              <div style={{flex:1}}>
                <div className="stop-name">{stop.name}</div>
                <div style={{display:'flex',gap:14,marginTop:3}}>
                  <div className="time-slot">
                    <span className="time-slot-label">Mrng Pickup</span>
                    <span className="time-slot-val" style={{color:'var(--green)'}}>{stop.mrnPickup}</span>
                  </div>
                  <div style={{width:1,background:'var(--border)',margin:'2px 0'}}/>
                  <div className="time-slot">
                    <span className="time-slot-label">Evng Pickup</span>
                    <span className="time-slot-val" style={{color:'var(--blue)'}}>{stop.evnPickup}</span>
                  </div>
                  <div style={{width:1,background:'var(--border)',margin:'2px 0'}}/>
                  <div className="time-slot">
                    <span className="time-slot-label">Distance</span>
                    <span className="time-slot-val">{stop.dist}</span>
                  </div>
                </div>
              </div>
              <div className="stop-right">
                <button className="fab-btn fab-secondary" style={{fontSize:11,padding:'5px 12px'}} onClick={() => { toggleFav(stop.id); showToast('Removed from favorites'); }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── PAGE PROFILE ────────────────────────────────────
function PageProfile({ navigate }) {
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">My Profile</div><div className="page-subtitle">Student account details</div></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:14}}>
        {/* Left: profile card */}
        <div className="profile-card">
          <div className="profile-avatar">AR</div>
          <div className="profile-name">Aryan Reddy</div>
          <div className="profile-id">STU2024001</div>
          <span className="status-pill sp-green">Active</span>
          {[['Class','10-A'],['Route','Route A'],['Pickup Stop','City Park'],['Bus','KA-01-B'],['Driver','R. Kumar'],['Parent Contact','+91 98765 43210']].map(([k,v]) => (
            <div key={k} className="profile-row"><span className="profile-key">{k}</span><span className="profile-val">{v}</span></div>
          ))}
          <button className="fab-btn fab-secondary" style={{width:'100%',justifyContent:'center',marginTop:6}} onClick={() => navigate('/')}>← Logout</button>
        </div>

        {/* Right: week trips below details */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card">
            <div className="card-header"><span className="card-title">This Week's Trips</span></div>
            <table className="data-table">
              <thead><tr><th>Date</th><th>Route</th><th>Pickup</th><th>Status</th></tr></thead>
              <tbody>
                {[['Apr 19','Route A','07:22 AM','sp-green','On Time'],
                  ['Apr 18','Route A','07:25 AM','sp-amber','Delayed +3'],
                  ['Apr 17','Route A','07:22 AM','sp-green','On Time'],
                  ['Apr 16','Route A','07:20 AM','sp-green','On Time'],
                  ['Apr 15','Route A','07:22 AM','sp-green','On Time']].map(([d,r,t,sc,st])=>(
                  <tr key={d}><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{d}</td><td>{r}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{t}</td><td><span className={`status-pill ${sc}`}>{st}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── MAIN COMPONENT ──────────────────────────────────
export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('home');
  const [favs, setFavs] = useState([4]);
  const [toast, setToast] = useState(null);
  const [clock, setClock] = useState('');
  const toastRef = useRef(null);

  const [notifs, setNotifs] = useState([
    {icon:'🚌',color:'amber',text:'<strong>Bus KA-01-B</strong> is arriving at City Park in 8 minutes',time:'09:14 AM',read:false},
    {icon:'⚠️',color:'red',text:'<strong>Route A</strong> delayed by 5 minutes due to traffic',time:'08:55 AM',read:false},
    {icon:'✅',color:'green',text:'<strong>Bus departed</strong> College Main Gate on time',time:'07:00 AM',read:true},
    {icon:'📍',color:'blue',text:'<strong>Stop update:</strong> North Bridge stop timing changed to 07:16 AM',time:'Yesterday',read:true},
    {icon:'🔔',color:'amber',text:"<strong>Reminder:</strong> Tomorrow's first bus departs at 07:00 AM",time:'Yesterday',read:true},
  ]);

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

  const toggleFav = (id) => setFavs(f => f.includes(id) ? f.filter(x=>x!==id) : [...f, id]);
  const unreadCount = notifs.filter(n => !n.read).length;

  const navSections = [
    {label:'Overview',items:[
      {id:'home',icon:<IconHome/>,label:'Dashboard'},
      {id:'tracking',icon:<IconMap/>,label:'Live Tracking'},
    ]},
    {label:'My Bus',items:[
      {id:'routes',icon:<IconRoute/>,label:'My Route'},
      {id:'favorites',icon:<span className="ni" style={{fontSize:14}}>❤️</span>,label:'Favorites'},
    ]},
    {label:'Account',items:[
      {id:'notifications',icon:<IconBell/>,label:'Notifications',badge:unreadCount||null},
      {id:'profile',icon:<IconUser/>,label:'My Profile'},
    ]},
  ];

  const renderPage = () => {
    switch(activePage) {
      case 'home':          return <PageHome showToast={showToast} setActivePage={setActivePage}/>;
      case 'tracking':      return <PageTracking favs={favs} toggleFav={toggleFav} showToast={showToast}/>;
      case 'routes':        return <PageRoutes favs={favs} toggleFav={toggleFav} showToast={showToast}/>;
      case 'favorites':     return <PageFavorites favs={favs} toggleFav={toggleFav} showToast={showToast}/>;
      case 'notifications': return <PageNotifications notifs={notifs} setNotifs={setNotifs}/>;
      case 'profile':       return <PageProfile navigate={navigate}/>;
      default:              return <PageHome showToast={showToast} setActivePage={setActivePage}/>;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="layout">
        <div className="topbar">
          <div className="logo">
            <div className="logo-icon"><BusLogo/></div>
            BusNav Student
          </div>
          <div className="spacer"/>
          <div className="topbar-right">
            <div className="topbar-time">{clock}</div>
            <div className="badge-notif" onClick={() => setActivePage('notifications')}><IconBellTop/>{unreadCount > 0 && <span className="dot"/>}</div>
            <div className="avatar">AR</div>
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
                    {it.badge ? <span style={{marginLeft:'auto',background:'var(--red)',color:'#fff',fontSize:'9.5px',fontWeight:700,padding:'2px 6px',borderRadius:10}}>{it.badge}</span> : null}
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
