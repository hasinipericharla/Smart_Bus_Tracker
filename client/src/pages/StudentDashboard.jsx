import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import { getMyInfo, requestStudent2FAToggle, verifyStudent2FA } from '../api/studentService';
//import { getMyInfo, requestStudent2FAToggle, verifyStudent2FA } from '../api/studentService';
import { getMyInfo, requestStudent2FAToggle, verifyStudent2FA, getNotifications, markNotifRead } from '../api/studentService';
import { clearStudentSession } from './StudentLogin';
import { getMyRoutes } from '../api/studentService';
import { changePassword } from '../api/studentService';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';


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
const NOTIF_TYPE_MAP = {
  info: { icon: '📍', color: 'blue' },
  warn: { icon: '⚠️', color: 'amber' },
  err:  { icon: '🛑', color: 'red' },
  ok:   { icon: '✅', color: 'green' },
};

function mapNotification(n) {
  const meta = NOTIF_TYPE_MAP[n.type] || NOTIF_TYPE_MAP.info;
  return {
    id: n._id,
    icon: meta.icon,
    color: meta.color,
    text: `<strong>${n.title}:</strong> ${n.message}`,
    time: new Date(n.createdAt).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    }),
    read: n.read,
  };
}

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const busIcon = L.divIcon({
  html: `<div style="
    background:#16a34a;
    width:36px;height:36px;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:18px;
    border:3px solid #fff;
    box-shadow:0 2px 8px rgba(0,0,0,.3);
  ">🚌</div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const myStopIcon = L.divIcon({
  html: `<div style="
    background:#2563eb;
    width:28px;height:28px;
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:13px;color:#fff;font-weight:800;
    border:3px solid #fff;
    box-shadow:0 2px 8px rgba(0,0,0,.3);
  ">📍</div>`,
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  return null;
}


//function PageHome({ showToast, setActivePage, onNameLoaded }) {


function PageHome({ showToast, setActivePage, onNameLoaded, notifs = [] }) {
  const [myInfo, setMyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Re-check the time every minute so the dashboard auto-switches between
  // Morning / Evening / "no active trip" without needing a page reload
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   getMyInfo()
  //     .then(d => setMyInfo(d.student))
  //     .catch(() => setMyInfo(null))
  //     .finally(() => setLoading(false));
  // }, []);
useEffect(() => {
    getMyInfo()
      .then(d => {
        setMyInfo(d.student);
        if (d.student?.name) onNameLoaded(d.student.name,d.student);
         // ← add this
      })
      .catch(() => setMyInfo(null))
    .finally(() => setLoading(false));
      // ...
  }, []);
  // Use real data if available, fall back to defaults
  

  const routeName   = myInfo?.assignedRoute?.name    || 'Not assigned';
  const routeId     = myInfo?.assignedRoute?.routeId || '—';
  const pickupStop  = myInfo?.pickupStop             || 'Not assigned';
  const studentName = myInfo?.name                   || 'Student';
  const rollNo      = myInfo?.rollNo                 || '—';
  const className   = myInfo?.className              || '—';
  const parentPhone = myInfo?.parentContact          || '—';
  //const tripType    = myInfo?.tripType               || 'both';
  const tripType    = myInfo?.tripType               || 'both';

  // Morning shows until 12:00 PM. Evening shows from 3:30 PM onward.
  // Between 12:00 PM and 3:30 PM, neither trip is "live" for the day.
  const minutesNow      = currentTime.getHours() * 60 + currentTime.getMinutes();
  const isMorningWindow = minutesNow < 12 * 60;        // before 12:00 PM
  const isEveningWindow = minutesNow >= 15 * 60 + 30;  // from 3:30 PM onward

  const showMorningCard = (tripType === 'morning' || tripType === 'both') && isMorningWindow;
  const showEveningCard = (tripType === 'evening' || tripType === 'both') && isEveningWindow;
  const noActiveTrip    = !showMorningCard && !showEveningCard;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">My Dashboard</div>
          <div className="page-subtitle">
            Welcome back, {studentName} · {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Profile banner */}
      {!loading && myInfo && (
        <div style={{
          background: 'linear-gradient(135deg,#1e293b,#334155)',
          borderRadius: 13, padding: '18px 24px',
          display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap'
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, color: '#1a1a1a', flexShrink: 0
          }}>
            {studentName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{studentName}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
              Roll: {rollNo} · Class: {className}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {[
              ['Route',       `${routeId} — ${routeName}`, 'var(--accent)'],
              ['Pickup Stop', pickupStop,                   'var(--green)'],
              ['Contact',     parentPhone,                  '#94a3b8'],
            ].map(([label, value, color]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Not enrolled message */}
      {!loading && !myInfo && (
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 13, padding: 24, textAlign: 'center'
        }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🎓</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Not enrolled yet</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
            Contact your admin to get assigned to a route.
          </div>
        </div>
      )}

      <div className="stat-grid">
        <div className="stat-card s-amber">
          <div className="stat-label">ETA to My Stop</div>
          <div className="stat-val amber">8 min</div>
          <div className="stat-sub">Bus arriving soon</div>
        </div>
        <div className="stat-card s-green">
          <div className="stat-label">Bus Status</div>
          <div className="stat-val green" style={{ fontSize: 18, marginTop: 4 }}>On Time</div>
          <div className="stat-sub">Route {routeId}</div>
        </div>
        <div className="stat-card s-blue">
          <div className="stat-label">My Stop</div>
          <div className="stat-val blue" style={{ fontSize: 16, marginTop: 4 }}>{pickupStop}</div>
          <div className="stat-sub">{routeName}</div>
        </div>

        <div className="stat-card s-purple">
          <div className="stat-label">Today's Trips</div>
          <div className="stat-val purple">{tripType === 'both' ? 2 : 1}</div>
          <div className="stat-sub">
            {tripType === 'both' ? 'Morning + Evening' : tripType === 'morning' ? 'Morning only' : 'Evening only'}
          </div>
        </div>
      </div>

      {/* Quick info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: (showMorningCard && showEveningCard) ? '1fr 1fr' : '1fr', gap: 14 }}>
        {showMorningCard && (
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🌅</span> Morning Trip
            </div>
            {[
              ['My Stop',     pickupStop],
              ['Route',       `${routeId} — ${routeName}`],
              ['Pickup Time', myInfo?.morningPickupTime || '—'],
              ['Status',      myInfo?.status || 'Active'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 6 }}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <button
              className="fab-btn fab-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              onClick={() => setActivePage('tracking')}
            >
              📍 Track Live
            </button>
          </div>
        )}

        {showEveningCard && (
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🌆</span> Evening Trip
            </div>
            {[
              ['My Stop',       pickupStop],
              ['Route',         `${routeId} — ${routeName}`],
              ['Drop-off Time', myInfo?.eveningPickupTime || '—'],
              ['Status',        myInfo?.status || 'Active'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 8, borderBottom: '1px solid var(--border)', marginBottom: 6 }}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <button
              className="fab-btn fab-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              onClick={() => setActivePage('tracking')}
            >
              📍 Track Live
            </button>
          </div>
        )}
        {noActiveTrip && (
          <div className="card" style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>⏳</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>No active trip right now</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6 }}>
              {tripType !== 'evening' && 'Morning tracking ends at 12:00 PM. '}
              {tripType !== 'morning' && 'Evening tracking starts at 3:30 PM.'}
            </div>
          </div>
        )}
      </div>
    

      {/* Recent Notifications preview */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Alerts</span>
          <div className="ch-right">
            <button
              className="fab-btn fab-secondary"
              style={{ fontSize: 11, padding: '5px 12px' }}
              onClick={() => setActivePage('notifications')}
            >
              View All
            </button>
          </div>
        </div>
        <div className="notif-list">
          {notifs.length === 0 ? (
            <div style={{ padding: '20px 18px', textAlign: 'center', color: 'var(--muted)', fontSize: 12.5 }}>
              No alerts yet.
            </div>
          ) : notifs.slice(0, 2).map((n) => (
            <div key={n.id} className={`notif-item${n.read ? '' : ' unread'}`}>
              <div className={`notif-icon ni-${n.color}`}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="notif-text" dangerouslySetInnerHTML={{ __html: n.text }} />
                <div className="notif-time">{n.time}</div>
              </div>
              {!n.read && <div className="unread-dot" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// // ─────────────────────────── PAGE TRACKING ───────────────────────────────────
// function PageTracking({ favs, toggleFav, showToast }) {
//   const [busPos, setBusPos] = useState(310);
//   const [tooltip, setTooltip] = useState(null);
//   useEffect(() => {
//     const t = setInterval(() => setBusPos(p => p >= 560 ? 60 : p + 2), 100);
//     return () => clearInterval(t);
//   }, []);
//   const reachedIdx = Math.floor((busPos - 60) / 62.5);
//   const stopPositions = STOPS.map((_, i) => ({ left: 60 + i * 75, top: 187 }));

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Live Tracking</div><div className="page-subtitle">Real-time bus position · KA-01-B</div></div>
//         <span className="status-pill sp-green" style={{fontSize:12,padding:'6px 14px'}}>● Bus is Live</span>
//       </div>

//       {/* ETA Banner */}
//       <div className="eta-banner">
//         <div>
//           <div style={{fontSize:12,color:'#94a3b8',marginBottom:4,fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px'}}>Bus Arriving At</div>
//           <div className="eta-bus-info">City Park · Stop 4</div>
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
//         <div style={{background:'rgba(255,255,255,.08)',borderRadius:10,padding:'12px 18px',textAlign:'center'}}>
//           <div style={{fontSize:11,color:'#94a3b8',marginBottom:4}}>Speed</div>
//           <div style={{fontSize:20,fontWeight:700,color:'var(--accent)',fontFamily:"'DM Mono',monospace"}}>42 km/h</div>
//         </div>
//       </div>

//       {/* Live Map */}
//       <div className="card">
//         <div className="card-header">
//           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
//           <span className="card-title">Live Bus Location</span>
//           <div className="ch-right"><span className="status-pill sp-green">● Live</span></div>
//         </div>
//         <div className="map-body" style={{height:320}}>
//           <div className="map-grid-bg"/>
//           <div className="map-road" style={{left:0,top:190,width:'100%',height:3,opacity:.5}}/>
//           <div className="map-road" style={{left:0,top:120,width:'100%',height:2,opacity:.2}}/>
//           <div className="map-road" style={{left:200,top:0,width:2,height:'100%',opacity:.3}}/>
//           <div className="map-road" style={{left:420,top:0,width:2,height:'100%',opacity:.2}}/>
//           <div className="route-line-map" style={{left:50,top:191,width:560,background:'rgba(59,139,212,.4)'}}/>
//           {stopPositions.map((pos, i) => (
//             <div key={i}
//               className={`stop-dot-map ${i < reachedIdx ? 'reached' : i === reachedIdx ? 'next' : 'upcoming'}`}
//               style={{left:pos.left, top:pos.top}}
//               onMouseEnter={() => setTooltip({...pos, name: STOPS[i].name, time: STOPS[i].mrnPickup})}
//               onMouseLeave={() => setTooltip(null)}
//             >
//               {i === MY_STOP_IDX && <div style={{position:'absolute',top:-18,left:'50%',transform:'translateX(-50%)',fontSize:9,fontWeight:800,color:'var(--blue)',whiteSpace:'nowrap',background:'rgba(37,99,235,.1)',padding:'1px 5px',borderRadius:4}}>MY STOP</div>}
//             </div>
//           ))}
//           {tooltip && (
//             <div className="stop-tooltip" style={{left:tooltip.left, top:tooltip.top}}>
//               {tooltip.name} · {tooltip.time}
//             </div>
//           )}
//           <div className="bus-dot-live" style={{left:busPos, top:179}}>🚌</div>
//           <div style={{position:'absolute',left:10,top:8,fontSize:10,color:'#94a3b8',fontFamily:"'DM Mono',monospace"}}>ROUTE A — NORTH LOOP</div>
//           <div style={{position:'absolute',left:busPos+2,top:163,fontSize:10,fontWeight:700,color:'var(--green)',fontFamily:"'DM Mono',monospace",whiteSpace:'nowrap'}}>KA-01-B</div>
//         </div>
//         <div className="map-legend">
//           <div className="legend-item"><div className="legend-dot" style={{background:'var(--green)'}}/> Reached</div>
//           <div className="legend-item"><div className="legend-dot" style={{background:'var(--accent)'}}/> Next Stop</div>
//           <div className="legend-item"><div className="legend-dot" style={{background:'#94a3b8'}}/> Upcoming</div>
//           <div className="legend-item"><div style={{fontSize:13}}>🚌</div> Bus</div>
//           <div className="legend-item" style={{marginLeft:'auto',color:'var(--blue)',fontWeight:600}}>📍 Your Stop = City Park</div>
//         </div>
//       </div>

//       {/* Route Stops */}
//       <div className="card">
//         <div className="card-header">
//           <span className="card-title">Route Stops</span>
//           <div className="ch-right"><span className="card-sub">8 stops</span></div>
//         </div>
//         <div className="stops-list">
//           {STOPS.map((stop, i) => {
//             const isReached = i < reachedIdx;
//             const isNext = i === reachedIdx;
//             const isMine = i === MY_STOP_IDX;
//             const isFav = favs.includes(stop.id);
//             return (
//               <div key={stop.id} className={`stop-item ${isNext ? 'active-stop' : ''} ${isReached ? 'reached-stop' : ''}`}>
//                 <div className={`stop-circle ${isReached ? 'sc-green' : isNext ? 'sc-amber' : 'sc-gray'}`}>
//                   {isReached ? '✓' : i+1}
//                 </div>
//                 <div>
//                   <div className="stop-name">{stop.name} {isMine && <span style={{fontSize:10,background:'rgba(37,99,235,.12)',color:'var(--blue)',padding:'1px 7px',borderRadius:5,marginLeft:4}}>MY STOP</span>}</div>
//                   <div className="stop-meta">{stop.mrnPickup} · {stop.dist}</div>
//                 </div>
//                 <div className="stop-right">
//                   {isNext && <span className="status-pill sp-amber">Next</span>}
//                   <button className="fav-btn" onClick={() => { toggleFav(stop.id); showToast(isFav ? 'Removed from favorites' : '❤️ Added to favorites'); }}>
//                     {isFav ? '❤️' : '🤍'}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


// function PageTracking({ favs, toggleFav, showToast, myInfo }) {
//   const busId      = myInfo?.assignedBus?._id;
//   const myStopName = myInfo?.pickupStop;
//   const routeStops = myInfo?.assignedRoute?.stops || STOPS;

//   const [busPosition, setBusPosition] = useState(null);
//   const [busSpeed, setBusSpeed]       = useState(0);
//   const [busStatus, setBusStatus]     = useState('idle');
//   const [currentStop, setCurrentStop] = useState(null);
//   const socketRef = useRef(null);

//   const defaultCenter = [15.8497, 74.4977]; // Belagavi

//   useEffect(() => {
//     socketRef.current = io('http://localhost:8000');

//     if (busId) {
//       // Live location updates
//       socketRef.current.on(`bus:${busId}:location`, ({ lat, lng, speed }) => {
//         setBusPosition([lat, lng]);
//         setBusSpeed(speed || 0);
//       });

//       // Trip started/ended
//       socketRef.current.on(`bus:${busId}:status`, ({ status }) => {
//         setBusStatus(status);
//       });

//       // Stop reached
//       socketRef.current.on(`bus:${busId}:stop`, ({ stopName, stopIndex }) => {
//         setCurrentStop({ name: stopName, index: stopIndex });
//       });
//     }

//     socketRef.current.emit('get:live:buses');

//     return () => socketRef.current?.disconnect();
//   }, [busId]);

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <div className="page-title">Live Tracking</div>
//           <div className="page-subtitle">
//             Real-time bus position · {myInfo?.assignedRoute?.name || 'Route'}
//           </div>
//         </div>
//         <span
//           className={`status-pill ${busStatus === 'live' ? 'sp-green' : 'sp-gray'}`}
//           style={{ fontSize: 12, padding: '6px 14px' }}
//         >
//           {busStatus === 'live' ? '● Bus is Live' : '○ Bus Idle'}
//         </span>
//       </div>

//       {/* ETA Banner */}
//       <div style={{
//         background: 'linear-gradient(135deg,#1e293b,#334155)',
//         borderRadius: 13, padding: '20px 24px',
//         display: 'flex', alignItems: 'center',
//         gap: 18, flexWrap: 'wrap', color: '#fff',
//       }}>
//         <div>
//           <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>
//             Bus Arriving At
//           </div>
//           <div style={{ fontSize: 15, fontWeight: 700 }}>
//             {myStopName || 'Your Stop'}
//           </div>
//           <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
//             {myInfo?.assignedRoute?.name || '—'}
//           </div>
//         </div>
   
//         {currentStop && (
//           <div style={{
//             background: 'rgba(255,255,255,.08)',
//             borderRadius: 10, padding: '12px 18px', textAlign: 'center',
//           }}>
//             <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>
//               Last Stop Reached
//             </div>
//             <div style={{ fontSize: 14, fontWeight: 700 }}>
//               {currentStop.name}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Leaflet Map */}
//       <div className="card">
//         <div className="card-header">
//           <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
//             stroke="var(--green)" strokeWidth="2">
//             <circle cx="12" cy="12" r="10"/>
//             <circle cx="12" cy="12" r="3"/>
//           </svg>
//           <span className="card-title">Live Bus Location</span>
//           <div className="ch-right">
//             <span className={`status-pill ${busStatus === 'live' ? 'sp-green' : 'sp-gray'}`}>
//               {busStatus === 'live' ? '● Live' : '○ Idle'}
//             </span>
//           </div>
//         </div>

//         <div style={{ height: 380, borderRadius: '0 0 13px 13px', overflow: 'hidden' }}>
//           <MapContainer
//             center={busPosition || defaultCenter}
//             zoom={14}
//             style={{ width: '100%', height: '100%' }}
//             zoomControl={true}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='© OpenStreetMap contributors'
//             />

//             {/* Auto-follow bus */}
//             {busPosition && <MapUpdater position={busPosition} />}

//             {/* Bus marker */}
//             {busPosition && (
//               <Marker position={busPosition} icon={busIcon}>
//                 <Popup>
//                   <b>🚌 Bus</b><br/>
//                   Speed: {busSpeed} km/h<br/>
//                   Status: {busStatus}
//                 </Popup>
//               </Marker>
//             )}

//             {/* My stop marker */}
//             {routeStops.map((stop, i) => {
//               if (!stop.lat || !stop.lng) return null;
//               const isMyStop =
//                 stop.name?.toLowerCase() === myStopName?.toLowerCase();
//               return (
//                 <Marker
//                   key={i}
//                   position={[stop.lat, stop.lng]}
//                   icon={isMyStop ? myStopIcon : L.divIcon({
//                     html: `<div style="
//                       background:${i < (currentStop?.index || 0) ? '#16a34a' : '#94a3b8'};
//                       width:20px;height:20px;border-radius:50%;
//                       border:2px solid #fff;
//                       display:flex;align-items:center;justify-content:center;
//                       font-size:9px;color:#fff;font-weight:800;
//                     ">${i + 1}</div>`,
//                     className: '',
//                     iconSize: [20, 20],
//                     iconAnchor: [10, 10],
//                   })}
//                 >
//                   <Popup>
//                     <b>Stop {i + 1}: {stop.name}</b>
//                     {isMyStop && <><br/><span style={{color:'#2563eb',fontWeight:600}}>📍 Your Stop</span></>}
//                   </Popup>
//                 </Marker>
//               );
//             })}
//           </MapContainer>
//         </div>

//         {busStatus !== 'live' && (
//           <div style={{
//             padding: '10px 18px',
//             background: 'rgba(245,166,35,.06)',
//             fontSize: 12,
//             color: 'var(--accent2)',
//             fontWeight: 600,
//             textAlign: 'center',
//           }}>
//             ⚠️ Bus has not started the trip yet.
//             Map will update automatically when driver starts.
//           </div>
//         )}
//       </div>

//       {/* Route Stops List */}
//       <div className="card">
//         <div className="card-header">
//           <span className="card-title">Route Stops</span>
//           <div className="ch-right">
//             <span className="card-sub">{routeStops.length} stops</span>
//           </div>
//         </div>
//         <div className="stops-list">
//           {routeStops.map((stop, i) => {
//             const isNext    = currentStop?.index === i;
//             const isReached = currentStop && i < currentStop.index;
//             const isMine    =
//               stop.name?.toLowerCase() === myStopName?.toLowerCase();
//             const isFav     =
//               favs.includes(stop.id || stop._id || stop.name);
//             return (
//               <div
//                 key={i}
//                 className={`stop-item ${isNext ? 'active-stop' : ''} ${isReached ? 'reached-stop' : ''}`}
//               >
//                 <div className={`stop-circle ${isReached ? 'sc-green' : isNext ? 'sc-amber' : 'sc-gray'}`}>
//                   {isReached ? '✓' : i + 1}
//                 </div>
//                 <div>
//                   <div className="stop-name">
//                     {stop.name}
//                     {isMine && (
//                       <span style={{
//                         fontSize: 10,
//                         background: 'rgba(37,99,235,.12)',
//                         color: 'var(--blue)',
//                         padding: '1px 7px',
//                         borderRadius: 5,
//                         marginLeft: 4,
//                       }}>MY STOP</span>
//                     )}
//                   </div>
//                   <div className="stop-meta">
//                     {stop.mrnPickup || stop.morningPickup || ''}
//                   </div>
//                 </div>
//                 <div className="stop-right">
//                   {isNext && (
//                     <span className="status-pill sp-amber">Next</span>
//                   )}
//                   <button
//                     className="fav-btn"
//                     onClick={() => {
//                       toggleFav(stop.id || stop.name);
//                       showToast(isFav ? 'Removed' : '❤️ Added to favorites');
//                     }}
//                   >
//                     {isFav ? '❤️' : '🤍'}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

function PageTracking({ favs, toggleFav, showToast, myInfo }) {
  const busId = myInfo?.assignedRoute?.assignedBuses?.[0]?._id
             || myInfo?.assignedBus?._id;

  const myStopName = myInfo?.pickupStop;
  const routeStops = (myInfo?.assignedRoute?.stops || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const [busPosition, setBusPosition] = useState(null);
  const [busSpeed, setBusSpeed]       = useState(0);
  const [busStatus, setBusStatus]     = useState('idle');
  const [currentStop, setCurrentStop] = useState(null);
  const socketRef = useRef(null);

  const defaultCenter = [15.8497, 74.4977];

  useEffect(() => {
    socketRef.current = io('http://localhost:8000');

    socketRef.current.emit('get:live:buses');
    socketRef.current.on('live:buses', (buses) => {
      if (busId && buses[busId]) {
        const b = buses[busId];
        if (b.lat && b.lng) setBusPosition([b.lat, b.lng]);
        if (b.speed !== undefined) setBusSpeed(b.speed);
        if (b.status) setBusStatus(b.status);
      }
    });

    if (busId) {
      socketRef.current.on(`bus:${busId}:location`, ({ lat, lng, speed }) => {
        setBusPosition([lat, lng]);
        setBusSpeed(speed || 0);
        setBusStatus('live');
      });

      socketRef.current.on(`bus:${busId}:status`, ({ status }) => {
        setBusStatus(status);
        if (status === 'idle') {
          setBusPosition(null);
          setCurrentStop(null);
        }
      });

      socketRef.current.on(`bus:${busId}:stop`, ({ stopName, stopIndex }) => {
        setCurrentStop({ name: stopName, index: stopIndex });
      });

      // Fallback in case only admin-style events fire
      socketRef.current.on('admin:bus:update', ({ busId: updBusId, lat, lng, speed }) => {
        if (updBusId === busId) {
          setBusPosition([lat, lng]);
          setBusSpeed(speed || 0);
          setBusStatus('live');
        }
      });
      socketRef.current.on('admin:trip:started', ({ busId: startedId }) => {
        if (startedId === busId) setBusStatus('live');
      });
      socketRef.current.on('admin:trip:ended', ({ busId: endedId }) => {
        if (endedId === busId) {
          setBusStatus('idle');
          setBusPosition(null);
          setCurrentStop(null);
        }
      });
    }

    return () => socketRef.current?.disconnect();
  }, [busId]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Live Tracking</div>
          <div className="page-subtitle">
            Real-time bus position · {myInfo?.assignedRoute?.name || 'Route'}
          </div>
        </div>
        <span
          className={`status-pill ${busStatus === 'live' ? 'sp-green' : 'sp-gray'}`}
          style={{ fontSize: 12, padding: '6px 14px' }}
        >
          {busStatus === 'live' ? '● Bus is Live' : '○ Bus Idle'}
        </span>
      </div>

      <div style={{
        background: 'linear-gradient(135deg,#1e293b,#334155)',
        borderRadius: 13, padding: '20px 24px',
        display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', color: '#fff',
      }}>
        <div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Bus Arriving At</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{myStopName || 'Your Stop'}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
            {myInfo?.assignedRoute?.name || '—'}
          </div>
        </div>

        {busStatus === 'live' && (
          <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: 10, padding: '12px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Speed</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)', fontFamily: "'DM Mono',monospace" }}>
              {busSpeed} km/h
            </div>
          </div>
        )}

        {currentStop && (
          <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: 10, padding: '12px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Last Stop Reached</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{currentStop.name}</div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
          </svg>
          <span className="card-title">Live Bus Location</span>
          <div className="ch-right">
            <span className={`status-pill ${busStatus === 'live' ? 'sp-green' : 'sp-gray'}`}>
              {busStatus === 'live' ? '● Live' : '○ Idle'}
            </span>
          </div>
        </div>

        <div style={{ height: 380, borderRadius: '0 0 13px 13px', overflow: 'hidden' }}>
          <MapContainer
            center={busPosition || defaultCenter}
            zoom={14}
            style={{ width: '100%', height: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© OpenStreetMap contributors'
            />

            {busPosition && <MapUpdater position={busPosition} />}

            {busPosition && busStatus === 'live' && (
              <Marker position={busPosition} icon={busIcon}>
                <Popup>
                  <b>🚌 Bus</b><br/>
                  Speed: {busSpeed} km/h<br/>
                  {currentStop && <>Last stop: {currentStop.name}</>}
                </Popup>
              </Marker>
            )}

            {routeStops.map((stop, i) => {
              if (!stop.lat || !stop.lng) return null;
              const isMyStop = stop.name?.toLowerCase() === myStopName?.toLowerCase();
              const isReached = currentStop && i <= currentStop.index;

              return (
                <Marker
                  key={i}
                  position={[stop.lat, stop.lng]}
                  icon={isMyStop ? myStopIcon : L.divIcon({
                    html: `<div style="
                      background:${isReached ? '#16a34a' : '#94a3b8'};
                      width:20px;height:20px;border-radius:50%;
                      border:2px solid #fff;
                      display:flex;align-items:center;justify-content:center;
                      font-size:9px;color:#fff;font-weight:800;
                    ">${isReached ? '✓' : i + 1}</div>`,
                    className: '',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                  })}
                >
                  <Popup>
                    <b>Stop {i + 1}: {stop.name}</b>
                    {isMyStop && <><br/><span style={{color:'#2563eb',fontWeight:600}}>📍 Your Stop</span></>}
                    {isReached && <><br/><span style={{color:'#16a34a',fontWeight:600}}>✓ Bus passed</span></>}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {busStatus !== 'live' && (
          <div style={{
            padding: '10px 18px', background: 'rgba(245,166,35,.06)',
            fontSize: 12, color: 'var(--accent2)', fontWeight: 600, textAlign: 'center',
          }}>
            ⚠️ Bus has not started the trip yet. Map will update automatically when driver starts.
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Route Stops</span>
          <div className="ch-right">
            <span className="card-sub">{routeStops.length} stops</span>
          </div>
        </div>
        <div className="stops-list">
          {routeStops.map((stop, i) => {
            const isNext    = currentStop?.index === i;
            const isReached = currentStop && i < currentStop.index;
            const isMine    = stop.name?.toLowerCase() === myStopName?.toLowerCase();
            const isFav     = favs.includes(stop.id || stop._id || stop.name);
            return (
              <div
                key={i}
                className={`stop-item ${isNext ? 'active-stop' : ''} ${isReached ? 'reached-stop' : ''}`}
              >
                <div className={`stop-circle ${isReached ? 'sc-green' : isNext ? 'sc-amber' : 'sc-gray'}`}>
                  {isReached ? '✓' : i + 1}
                </div>
                <div>
                  <div className="stop-name">
                    {stop.name}
                    {isMine && (
                      <span style={{
                        fontSize: 10, background: 'rgba(37,99,235,.12)',
                        color: 'var(--blue)', padding: '1px 7px',
                        borderRadius: 5, marginLeft: 4,
                      }}>MY STOP</span>
                    )}
                  </div>
                  <div className="stop-meta">
                    {stop.mrnPickup || stop.morningPickup || ''}
                  </div>
                </div>
                <div className="stop-right">
                  {isNext && <span className="status-pill sp-amber">Next</span>}
                  <button
                    className="fav-btn"
                    onClick={() => {
                      toggleFav(stop.id || stop.name);
                      showToast(isFav ? 'Removed' : '❤️ Added to favorites');
                    }}
                  >
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
// function PageRoutes({ favs, toggleFav, showToast }) {
//   const [tripType, setTripType] = useState('morning'); // 'morning' | 'evening'

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">My Route</div><div className="page-subtitle">Route A — North Loop · 8 stops</div></div>
//         <span className="status-pill sp-green" style={{fontSize:12,padding:'6px 14px'}}>Active Route</span>
//       </div>

//       {/* Trip Type Toggle */}
//       <div style={{display:'flex',gap:8}}>
//         {[['morning','🌅 Morning'],['evening','🌆 Evening']].map(([val,label]) => (
//           <button key={val} onClick={() => setTripType(val)}
//             style={{padding:'8px 20px',borderRadius:20,fontWeight:700,fontSize:13,cursor:'pointer',border:'none',fontFamily:'DM Sans,sans-serif',transition:'all .15s',
//               background: tripType===val ? 'var(--accent)' : '#f1f5f9',
//               color: tripType===val ? '#1a1a1a' : 'var(--muted)',
//             }}>{label}</button>
//         ))}
//       </div>

//       <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
//         {/* Route Details */}
//         <div className="card">
//           <div className="card-header"><span className="card-title">Route Details</span></div>
//           <div style={{padding:'16px 18px',display:'flex',flexDirection:'column',gap:10}}>
//             {[
//               ['Route','Route A — North Loop'],
//               ['Bus Number','KA-01-B'],
//               ['Driver','R. Kumar'],
//               ['Total Stops','8'],
//               ['Total Distance','8.9 km'],
//               ['Avg Duration','52 minutes'],
//               ['My Stop','City Park (Stop 4)'],
//               tripType === 'morning'
//                 ? ['Morning Pickup','07:22 AM']
//                 : ['Evening Drop','05:22 PM'],
//               tripType === 'morning'
//                 ? ['Morning Drop','07:52 AM (College)']
//                 : ['Evening Pickup','05:00 PM (College)'],
//             ].map(([k,v]) => (
//               <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:13,paddingBottom:8,borderBottom:'1px solid var(--border)'}}>
//                 <span style={{color:'var(--muted)'}}>{k}</span>
//                 <span style={{fontWeight:600}}>{v}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* All Stops with time slots */}
//         <div className="card">
//           <div className="card-header">
//             <span className="card-title">All Stops</span>
//             <div className="ch-right">
//               <span style={{fontSize:10,color:'var(--muted)',fontWeight:600}}>
//                 {tripType === 'morning' ? 'Pickup → Drop' : 'Pickup → Drop'}
//               </span>
//             </div>
//           </div>
//           <div className="stops-list" style={{padding:0}}>
//             {STOPS.map((stop, i) => {
//               const isMine = i === MY_STOP_IDX;
//               const isFav = favs.includes(stop.id);
//               const pickup = tripType === 'morning' ? stop.mrnPickup : stop.evnPickup;
//               const drop   = tripType === 'morning' ? stop.mrnDrop   : stop.evnDrop;
//               return (
//                 <div key={stop.id} className={`stop-item ${isMine ? 'active-stop' : ''}`} style={{gap:10,padding:'10px 14px'}}>
//                   <div className={`stop-circle ${isMine ? 'sc-amber' : i < MY_STOP_IDX ? 'sc-green' : 'sc-gray'}`} style={{width:24,height:24,fontSize:9}}>{i+1}</div>
//                   <div style={{flex:1,minWidth:0}}>
//                     <div className="stop-name" style={{fontSize:12}}>
//                       {stop.name}
//                       {isMine && <span style={{fontSize:9,background:'rgba(37,99,235,.12)',color:'var(--blue)',padding:'1px 6px',borderRadius:5,marginLeft:4}}>MY STOP</span>}
//                     </div>
//                     <div style={{display:'flex',gap:12,marginTop:3}}>
//                       <div className="time-slot">
//                         <span className="time-slot-label">Pickup</span>
//                         <span className="time-slot-val" style={{color:'var(--green)'}}>{pickup}</span>
//                       </div>
//                       <div style={{width:1,background:'var(--border)',margin:'2px 0'}}/>
//                       <div className="time-slot">
//                         <span className="time-slot-label">Drop</span>
//                         <span className="time-slot-val" style={{color:'var(--accent)'}}>{drop}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button className="fav-btn" style={{fontSize:13}} onClick={() => { toggleFav(stop.id); showToast(isFav ? 'Removed from favorites' : '❤️ Added to favorites'); }}>
//                     {isFav ? '❤️' : '🤍'}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// function PageRoutes({ favs, toggleFav, showToast }) {
//   const [tripType, setTripType] = useState('morning');
//   const [myInfo, setMyInfo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getMyInfo()
//       .then(d => setMyInfo(d.student))
//       .catch(() => setMyInfo(null))
//       .finally(() => setLoading(false));
//   }, []);

//   const route       = myInfo?.assignedRoute;
//   const pickupStop  = myInfo?.pickupStop || '—';
//   const stops       = route?.stops || [];

//   // Find the index of the student's pickup stop
//   const myStopIdx = stops.findIndex(
//     s => s.name?.toLowerCase() === pickupStop?.toLowerCase()
//   );

//   if (loading) {
//     return (
//       <div className="page">
//         <div className="page-header">
//           <div><div className="page-title">My Route</div></div>
//         </div>
//         <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
//           Loading route details…
//         </div>
//       </div>
//     );
//   }

//   if (!route) {
//     return (
//       <div className="page">
//         <div className="page-header">
//           <div>
//             <div className="page-title">My Route</div>
//             <div className="page-subtitle">No route assigned yet</div>
//           </div>
//         </div>
//         <div className="card" style={{ padding: 40, textAlign: 'center' }}>
//           <div style={{ fontSize: 32, marginBottom: 12 }}>🚌</div>
//           <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--muted)' }}>Not assigned to a route</div>
//           <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>
//             Contact your admin to get assigned to a bus route.
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <div className="page-title">My Route</div>
//           <div className="page-subtitle">
//             {route.routeId} — {route.name} · {stops.length} stops
//           </div>
//         </div>
//         <span className="status-pill sp-green" style={{ fontSize: 12, padding: '6px 14px' }}>
//           Active Route
//         </span>
//       </div>

//       {/* Trip Type Toggle */}
//       <div style={{ display: 'flex', gap: 8 }}>
//         {[['morning', '🌅 Morning'], ['evening', '🌆 Evening']].map(([val, label]) => (
//           <button key={val} onClick={() => setTripType(val)}
//             style={{
//               padding: '8px 20px', borderRadius: 20, fontWeight: 700, fontSize: 13,
//               cursor: 'pointer', border: 'none', fontFamily: 'DM Sans,sans-serif', transition: 'all .15s',
//               background: tripType === val ? 'var(--accent)' : '#f1f5f9',
//               color: tripType === val ? '#1a1a1a' : 'var(--muted)',
//             }}
//           >{label}</button>
//         ))}
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//         {/* Route Details */}
//         <div className="card">
//           <div className="card-header"><span className="card-title">Route Details</span></div>
//           <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
//             {[
//               ['Route ID',        route.routeId || '—'],
//               ['Route Name',      route.name    || '—'],
//               ['Description',     route.description || '—'],
//               ['Total Stops',     stops.length],
//               ['My Pickup Stop',  pickupStop],
//               ['My Stop No.',     myStopIdx >= 0 ? `Stop ${myStopIdx + 1}` : '—'],
//             ].map(([k, v]) => (
//               <div key={k} style={{
//                 display: 'flex', justifyContent: 'space-between', fontSize: 13,
//                 paddingBottom: 8, borderBottom: '1px solid var(--border)'
//               }}>
//                 <span style={{ color: 'var(--muted)' }}>{k}</span>
//                 <span style={{ fontWeight: 600 }}>{v}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* All Stops */}
//         <div className="card">
//           <div className="card-header">
//             <span className="card-title">All Stops</span>
//             <div className="ch-right">
//               <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>
//                 {stops.length} stops · ordered
//               </span>
//             </div>
//           </div>

//           {stops.length === 0 ? (
//             <div style={{ padding: '24px 18px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
//               No stops defined for this route yet.
//             </div>
//           ) : (
//             <div className="stops-list" style={{ padding: 0 }}>
//               {stops
//                 .slice()
//                 .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
//                 .map((stop, i) => {
//                   const isMine = stop.name?.toLowerCase() === pickupStop?.toLowerCase();
//                   const isFav  = favs.includes(stop._id || stop.name);
//                   const beforeMe = i < myStopIdx;
//                   return (
//                     <div
//                       key={i}
//                       className={`stop-item ${isMine ? 'active-stop' : ''}`}
//                       style={{ gap: 10, padding: '10px 14px' }}
//                     >
//                       <div
//                         className={`stop-circle ${isMine ? 'sc-amber' : beforeMe ? 'sc-green' : 'sc-gray'}`}
//                         style={{ width: 24, height: 24, fontSize: 9 }}
//                       >
//                         {stop.order ?? i + 1}
//                       </div>
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <div className="stop-name" style={{ fontSize: 12 }}>
//                           {stop.name}
//                           {isMine && (
//                             <span style={{
//                               fontSize: 9, background: 'rgba(37,99,235,.12)', color: 'var(--blue)',
//                               padding: '1px 6px', borderRadius: 5, marginLeft: 4
//                             }}>MY STOP</span>
//                           )}
//                         </div>
//                         <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
//                           Stop {stop.order ?? i + 1}
//                           {stop.distance ? ` · ${stop.distance}` : ''}
//                         </div>
//                       </div>
//                       <button
//                         className="fav-btn"
//                         style={{ fontSize: 13 }}
//                         onClick={() => {
//                           toggleFav(stop._id || stop.name);
//                           showToast(isFav ? 'Removed from favorites' : '❤️ Added to favorites');
//                         }}
//                       >
//                         {isFav ? '❤️' : '🤍'}
//                       </button>
//                     </div>
//                   );
//                 })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Route description card if present */}
//       {route.description && (
//         <div className="card" style={{ padding: '16px 20px' }}>
//           <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 6 }}>
//             Route Description
//           </div>
//           <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>
//             {route.description}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────── PAGE NOTIFICATIONS ───────────────────────────────
// function PageNotifications({ notifs, setNotifs }) {
//   const unread = notifs.filter(n => !n.read).length;
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Notifications</div><div className="page-subtitle">{unread} unread alerts</div></div>
//         <button className="fab-btn fab-secondary" onClick={() => setNotifs(ns => ns.map(n => ({...n, read:true})))}>✓ Mark all read</button>
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

function PageNotifications({ notifs, setNotifs }) {
  const unread = notifs.filter(n => !n.read).length;

  const handleMarkAllRead = async () => {
    const unreadIds = notifs.filter(n => !n.read).map(n => n.id);
    setNotifs(ns => ns.map(n => ({ ...n, read: true })));
    try {
      await Promise.all(unreadIds.map(id => markNotifRead(id)));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const handleItemClick = async (n) => {
    if (n.read) return;
    setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x));
    try {
      await markNotifRead(n.id);
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Notifications</div>
          <div className="page-subtitle">{unread} unread alerts</div>
        </div>
        <button className="fab-btn fab-secondary" onClick={handleMarkAllRead}>
          ✓ Mark all read
        </button>
      </div>
      <div className="card">
        <div className="notif-list">
          {notifs.length === 0 ? (
            <div style={{ padding: '32px 18px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              No notifications yet.
            </div>
          ) : notifs.map((n) => (
            <div
              key={n.id}
              className={`notif-item${n.read ? '' : ' unread'}`}
              onClick={() => handleItemClick(n)}
            >
              <div className={`notif-icon ni-${n.color}`}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="notif-text" dangerouslySetInnerHTML={{ __html: n.text }} />
                <div className="notif-time">{n.time}</div>
              </div>
              {!n.read && <div className="unread-dot" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 


function PageRoutes({ favs, toggleFav, showToast }) {
  const [tripType, setTripType] = useState('morning');
  const [myInfo, setMyInfo]     = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getMyInfo()
      .then(d => setMyInfo(d.student))
      .catch(() => setMyInfo(null))
      .finally(() => setLoading(false));
  }, []);

  const route      = myInfo?.assignedRoute;
  const pickupStop = myInfo?.pickupStop || '—';
  const stops      = route?.stops || [];

  // Trip schedule from admin-assigned fields
  const studentTripType    = myInfo?.tripType          || 'both';
  const morningPickupTime  = myInfo?.morningPickupTime || null;
  const eveningPickupTime  = myInfo?.eveningPickupTime || null;

  // Only show tabs the student is enrolled for
  const availableTrips = studentTripType === 'morning' ? ['morning']
                       : studentTripType === 'evening' ? ['evening']
                       : ['morning', 'evening'];

  // Auto-select the correct default tab
  useEffect(() => {
    if (studentTripType === 'evening') setTripType('evening');
  }, [studentTripType]);

  const myStopIdx = stops.findIndex(
    s => s.name?.toLowerCase() === pickupStop?.toLowerCase()
  );

  if (loading) return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">My Route</div></div></div>
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Loading route details…</div>
    </div>
  );

  if (!route) return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">My Route</div><div className="page-subtitle">No route assigned yet</div></div>
      </div>
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🚌</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--muted)' }}>Not assigned to a route</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Contact your admin to get assigned to a bus route.</div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">My Route</div>
          <div className="page-subtitle">{route.routeId} — {route.name} · {stops.length} stops</div>
        </div>
        <span className="status-pill sp-green" style={{ fontSize: 12, padding: '6px 14px' }}>Active Route</span>
      </div>

      {/* ── Trip Schedule Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg,#1e293b,#334155)',
        borderRadius: 13, padding: '18px 22px',
        display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap',
      }}>
        <div style={{ marginRight: 'auto' }}>
          <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 4 }}>
            My Pickup Stop
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>{pickupStop}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
            {route.routeId} — {route.name}
          </div>
        </div>

        {/* Morning block */}
        {(studentTripType === 'morning' || studentTripType === 'both') && (
          <div style={{
            background: 'rgba(245,166,35,.12)', border: '1px solid rgba(245,166,35,.25)',
            borderRadius: 10, padding: '12px 20px', textAlign: 'center', marginRight: 10,
          }}>
            <div style={{ fontSize: 9, color: '#e8951f', fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 6 }}>🌅 Morning Pickup</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#f5a623', fontFamily: "'DM Mono',monospace", lineHeight: 1 }}>
              {morningPickupTime || '—'}
            </div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>at {pickupStop}</div>
          </div>
        )}

        {/* Evening block */}
        {(studentTripType === 'evening' || studentTripType === 'both') && (
          <div style={{
            background: 'rgba(37,99,235,.1)', border: '1px solid rgba(37,99,235,.22)',
            borderRadius: 10, padding: '12px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 9, color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 6 }}>🌆 Evening Drop-off</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#3b8bd4', fontFamily: "'DM Mono',monospace", lineHeight: 1 }}>
              {eveningPickupTime || '—'}
            </div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>at {pickupStop}</div>
          </div>
        )}
      </div>

  

      {/* ── Only Morning enrolled ── */}
      {studentTripType === 'morning' && (
        <div style={{
          background: 'rgba(245,166,35,.06)', border: '1px solid rgba(245,166,35,.2)',
          borderRadius: 10, padding: '10px 16px',
          fontSize: 12.5, color: '#b86e0a', fontWeight: 600,
        }}>
          🌅 You are enrolled for <strong>Morning trips only</strong>. Contact admin to change.
        </div>
      )}

      {/* ── Only Evening enrolled ── */}
      {studentTripType === 'evening' && (
        <div style={{
          background: 'rgba(37,99,235,.06)', border: '1px solid rgba(37,99,235,.2)',
          borderRadius: 10, padding: '10px 16px',
          fontSize: 12.5, color: '#1d4ed8', fontWeight: 600,
        }}>
          🌆 You are enrolled for <strong>Evening trips only</strong>. Contact admin to change.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        {/* ── Route Details card ── */}
        <div className="card">
          <div className="card-header"><span className="card-title">Route Details</span></div>
          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Route ID',       route.routeId   || '—'],
              ['Route Name',     route.name      || '—'],
              ['Description',    route.description || '—'],
              ['Total Stops',    stops.length],
              ['My Pickup Stop', pickupStop],
              ['My Stop No.',    myStopIdx >= 0 ? `Stop ${myStopIdx + 1}` : '—'],
              ['Trip Schedule',  studentTripType === 'both' ? 'Morning + Evening'
                               : studentTripType === 'morning' ? 'Morning only'
                               : 'Evening only'],
              ...(studentTripType !== 'evening' ? [['Morning Pickup', morningPickupTime || '—']] : []),
              ...(studentTripType !== 'morning' ? [['Evening Drop-off', eveningPickupTime || '—']] : []),
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between', fontSize: 13,
                paddingBottom: 8, borderBottom: '1px solid var(--border)'
              }}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── All Stops with time indicators ── */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">All Stops</span>
            <div className="ch-right">
              <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>
                {stops.length} stops · {tripType === 'morning' ? '🌅 Morning' : '🌆 Evening'}
              </span>
            </div>
          </div>

          {stops.length === 0 ? (
            <div style={{ padding: '24px 18px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              No stops defined for this route yet.
            </div>
          ) : (
            <div className="stops-list" style={{ padding: 0 }}>
              {stops
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((stop, i) => {
                  const isMine    = stop.name?.toLowerCase() === pickupStop?.toLowerCase();
                  const isFav     = favs.includes(stop._id || stop.name);
                  const beforeMe  = i < myStopIdx;
                  const isAfterMe = i > myStopIdx;

                  return (
                    <div
                      key={i}
                      className={`stop-item ${isMine ? 'active-stop' : ''}`}
                      style={{ gap: 10, padding: '10px 14px' }}
                    >
                      <div
                        className={`stop-circle ${isMine ? 'sc-amber' : beforeMe ? 'sc-green' : 'sc-gray'}`}
                        style={{ width: 26, height: 26, fontSize: 9, flexShrink: 0 }}
                      >
                        {beforeMe ? '✓' : stop.order ?? i + 1}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                          {stop.name}
                          {isMine && (
                            <span style={{
                              fontSize: 9, background: 'rgba(37,99,235,.12)', color: 'var(--blue)',
                              padding: '1px 6px', borderRadius: 5,
                            }}>MY STOP</span>
                          )}
                        </div>

                        {/* Show pickup time only at the student's stop */}
                        {isMine && (
                          <div style={{ display: 'flex', gap: 12, marginTop: 5 }}>
                            {(studentTripType === 'morning' || studentTripType === 'both') && (
                              <div className="time-slot">
                                <span className="time-slot-label">🌅 Pickup</span>
                                <span className="time-slot-val" style={{ color: 'var(--accent2)' }}>
                                  {morningPickupTime || '—'}
                                </span>
                              </div>
                            )}
                            {studentTripType === 'both' && (
                              <div style={{ width: 1, background: 'var(--border)', margin: '2px 0' }} />
                            )}
                            {(studentTripType === 'evening' || studentTripType === 'both') && (
                              <div className="time-slot">
                                <span className="time-slot-label">🌆 Drop-off</span>
                                <span className="time-slot-val" style={{ color: 'var(--blue)' }}>
                                  {eveningPickupTime || '—'}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Other stops just show order */}
                        {!isMine && (
                          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                            Stop {stop.order ?? i + 1}
                            {isAfterMe ? ' · upcoming' : ' · passed'}
                          </div>
                        )}
                      </div>

                      <button
                        className="fav-btn"
                        style={{ fontSize: 13 }}
                        onClick={() => {
                          toggleFav(stop._id || stop.name);
                          showToast(isFav ? 'Removed from favorites' : '❤️ Added to favorites');
                        }}
                      >
                        {isFav ? '❤️' : '🤍'}
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {route.description && (
        <div className="card" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 6 }}>
            Route Description
          </div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{route.description}</div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────── PAGE FAVORITES ───────────────────────────────────
// function PageFavorites({ favs, toggleFav, showToast }) {
//   const [search, setSearch] = useState('');
//   const [showAdd, setShowAdd] = useState(false);

//   const favStops = STOPS.filter(s => favs.includes(s.id));
//   const nonFavStops = STOPS.filter(s => !favs.includes(s.id));
//   const filteredNonFav = nonFavStops.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Favorite Stops</div><div className="page-subtitle">{favStops.length} saved stops</div></div>
//         <button className="fab-btn fab-primary" onClick={() => setShowAdd(v => !v)}>
//           {showAdd ? '✕ Close' : '＋ Add Favorites'}
//         </button>
//       </div>

//       {/* Add Favorites Panel */}
//       {showAdd && (
//         <div className="card">
//           <div className="card-header">
//             <span className="card-title">Add a Stop to Favorites</span>
//           </div>
//           <div style={{padding:'12px 18px 6px'}}>
//             <div style={{position:'relative'}}>
//               <input className="search-input" placeholder="Search stops…" value={search} onChange={e => setSearch(e.target.value)} />
//               <span style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',fontSize:14,color:'var(--muted)'}}>🔍</span>
//             </div>
//           </div>
//           {filteredNonFav.length === 0 ? (
//             <div style={{padding:'16px 18px',fontSize:13,color:'var(--muted)',textAlign:'center'}}>
//               {search ? 'No stops match your search.' : 'All stops are already in favorites!'}
//             </div>
//           ) : (
//             filteredNonFav.map((stop, i) => (
//               <div key={stop.id} className="stop-item" style={{borderLeft:'none'}}>
//                 <div className="stop-circle sc-gray" style={{width:24,height:24,fontSize:9}}>{STOPS.indexOf(stop)+1}</div>
//                 <div>
//                   <div className="stop-name">{stop.name}</div>
//                   <div className="stop-meta">{stop.mrnPickup} pickup · {stop.dist}</div>
//                 </div>
//                 <div className="stop-right">
//                   <button className="fab-btn fab-primary" style={{fontSize:11,padding:'5px 12px'}} onClick={() => { toggleFav(stop.id); showToast('❤️ Added to favorites'); }}>＋ Add</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* Favorites List */}
//       {favStops.length === 0 ? (
//         <div className="card" style={{padding:'40px',textAlign:'center'}}>
//           <div style={{fontSize:32,marginBottom:12}}>🤍</div>
//           <div style={{fontSize:15,fontWeight:600,color:'var(--muted)'}}>No favorite stops yet</div>
//           <div style={{fontSize:13,color:'var(--muted)',marginTop:6}}>Click "Add Favorites" above to save stops</div>
//         </div>
//       ) : (
//         <div className="card">
//           <div className="card-header"><span className="card-title">Saved Stops</span></div>
//           {favStops.map(stop => (
//             <div key={stop.id} className="stop-item" style={{borderLeft:'none'}}>
//               <div className="stop-circle sc-fav">❤</div>
//               <div style={{flex:1}}>
//                 <div className="stop-name">{stop.name}</div>
//                 <div style={{display:'flex',gap:14,marginTop:3}}>
//                   <div className="time-slot">
//                     <span className="time-slot-label">Mrng Pickup</span>
//                     <span className="time-slot-val" style={{color:'var(--green)'}}>{stop.mrnPickup}</span>
//                   </div>
//                   <div style={{width:1,background:'var(--border)',margin:'2px 0'}}/>
//                   <div className="time-slot">
//                     <span className="time-slot-label">Evng Pickup</span>
//                     <span className="time-slot-val" style={{color:'var(--blue)'}}>{stop.evnPickup}</span>
//                   </div>
//                   <div style={{width:1,background:'var(--border)',margin:'2px 0'}}/>
//                   <div className="time-slot">
//                     <span className="time-slot-label">Distance</span>
//                     <span className="time-slot-val">{stop.dist}</span>
//                   </div>
//                 </div>
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


function PageFavorites({ favs, toggleFav, showToast, myInfo }) {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  // Use real route stops from student's assigned route
  const routeStops = (myInfo?.assignedRoute?.stops || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const favStops    = routeStops.filter(s => favs.includes(s._id || s.name));
  const nonFavStops = routeStops.filter(s => !favs.includes(s._id || s.name));
  const filteredNonFav = nonFavStops.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Favorite Stops</div>
          <div className="page-subtitle">{favStops.length} saved stops</div>
        </div>
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
          <div style={{ padding: '12px 18px 6px' }}>
            <div style={{ position: 'relative' }}>
              <input
                className="search-input"
                placeholder="Search stops…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--muted)' }}>🔍</span>
            </div>
          </div>

          {routeStops.length === 0 ? (
            <div style={{ padding: '16px 18px', fontSize: 13, color: 'var(--muted)', textAlign: 'center' }}>
              No route assigned yet. Contact your admin.
            </div>
          ) : filteredNonFav.length === 0 ? (
            <div style={{ padding: '16px 18px', fontSize: 13, color: 'var(--muted)', textAlign: 'center' }}>
              {search ? 'No stops match your search.' : 'All stops are already in favorites!'}
            </div>
          ) : (
            filteredNonFav.map((stop, i) => (
              <div key={stop._id || i} className="stop-item" style={{ borderLeft: 'none' }}>
                <div className="stop-circle sc-gray" style={{ width: 24, height: 24, fontSize: 9 }}>
                  {stop.order ?? i + 1}
                </div>
                <div>
                  <div className="stop-name">{stop.name}</div>
                  <div className="stop-meta">
                    {stop.morningPickup || stop.mrnPickup || `Stop ${stop.order ?? i + 1}`}
                  </div>
                </div>
                <div className="stop-right">
                  <button
                    className="fab-btn fab-primary"
                    style={{ fontSize: 11, padding: '5px 12px' }}
                    onClick={() => {
                      toggleFav(stop._id || stop.name);
                      showToast('❤️ Added to favorites');
                    }}
                  >＋ Add</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Saved Favorites List */}
      {favStops.length === 0 ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🤍</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--muted)' }}>No favorite stops yet</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>
            Click "Add Favorites" above to save stops
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header"><span className="card-title">Saved Stops</span></div>
          {favStops.map((stop, i) => (
            <div key={stop._id || i} className="stop-item" style={{ borderLeft: 'none' }}>
              <div className="stop-circle sc-fav">❤</div>
              <div style={{ flex: 1 }}>
                <div className="stop-name">{stop.name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>
                  Stop {stop.order ?? i + 1}
                  {stop.morningPickup || stop.mrnPickup
                    ? ` · ${stop.morningPickup || stop.mrnPickup}`
                    : ''}
                </div>
              </div>
              <div className="stop-right">
                <button
                  className="fab-btn fab-secondary"
                  style={{ fontSize: 11, padding: '5px 12px' }}
                  onClick={() => {
                    toggleFav(stop._id || stop.name);
                    showToast('Removed from favorites');
                  }}
                >Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



// ─────────────────────────── PAGE PROFILE ────────────────────────────────────
// function PageProfile({ navigate, studentName, myInfo }) {
//   const initials = typeof studentName === 'string' && studentName.trim()
//     ? studentName.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
//     : '??';

//   const route       = myInfo?.assignedRoute;
//   const pickupStop  = myInfo?.pickupStop    || '—';
//   const rollNo      = myInfo?.rollNo        || '—';
//   const className   = myInfo?.className     || '—';
//   const parentPhone = myInfo?.parentContact || '—';
//   return (
//     // <div className="page">
//     //   <div className="page-header">
//     //     <div><div className="page-title">My Profile</div><div className="page-subtitle">Student account details</div></div>
//     //   </div>
//     //   <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:14}}>
//     //     {/* Left: profile card */}
//     //     <div className="profile-card">
//     //       <div className="profile-avatar">AR</div>
//     //       <div className="profile-name">Aryan Reddy</div>
//     //       <div className="profile-id">STU2024001</div>
//     //       <span className="status-pill sp-green">Active</span>
//     //       {[['Class','10-A'],['Route','Route A'],['Pickup Stop','City Park'],['Bus','KA-01-B'],['Driver','R. Kumar'],['Parent Contact','+91 98765 43210']].map(([k,v]) => (
//     //         <div key={k} className="profile-row"><span className="profile-key">{k}</span><span className="profile-val">{v}</span></div>
//     //       ))}
//     //       <button className="fab-btn fab-secondary" style={{width:'100%',justifyContent:'center',marginTop:6}} onClick={() => { clearStudentSession(); navigate('/student/login'); }}>← Logout</button>
//     //     </div>
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">My Profile</div>
//         <div className="page-subtitle">Student account details</div></div>
//       </div>
//       <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:14}}>
//         <div className="profile-card">
//           <div className="profile-avatar">{initials}</div>
//           <div className="profile-name">{studentName || '—'}</div>
//           <div className="profile-id">{rollNo}</div>
//           <span className="status-pill sp-green">Active</span>
//           {/* {[
//             ['Class',          className],
//             ['Route',          route ? `${route.routeId} — ${route.name}` : '—'],
//             ['Pickup Stop',    pickupStop],
//             ['Parent Contact', parentPhone],
//           ].map(([k,v]) => (
//             <div key={k} className="profile-row">
//               <span className="profile-key">{k}</span>
//               <span className="profile-val">{v}</span>
//             </div>
//           ))} */}
//           {[
//   ['Class',          String(className   || '—')],
//   ['Route',          route ? `${route.routeId || '—'} — ${route.name || '—'}` : '—'],
//   ['Pickup Stop',    String(pickupStop  || '—')],
//   ['Parent Contact', String(parentPhone || '—')],
// ].map(([k, v]) => (
//   <div key={k} className="profile-row">
//     <span className="profile-key">{k}</span>
//     <span className="profile-val">{v}</span>
//   </div>
// ))}
//           <button className="fab-btn fab-secondary"
//             style={{width:'100%',justifyContent:'center',marginTop:6}}
//             onClick={() => { clearStudentSession(); navigate('/student/login'); }}>
//             ← Logout
//           </button>
//         </div>
//         {/* Right: week trips below details */}
//         <div style={{display:'flex',flexDirection:'column',gap:14}}>
//           <div className="card">
//             <div className="card-header"><span className="card-title">This Week's Trips</span></div>
//             <table className="data-table">
//               <thead><tr><th>Date</th><th>Route</th><th>Pickup</th><th>Status</th></tr></thead>
//               <tbody>
//                 {[['Apr 19','Route A','07:22 AM','sp-green','On Time'],
//                   ['Apr 18','Route A','07:25 AM','sp-amber','Delayed +3'],
//                   ['Apr 17','Route A','07:22 AM','sp-green','On Time'],
//                   ['Apr 16','Route A','07:20 AM','sp-green','On Time'],
//                   ['Apr 15','Route A','07:22 AM','sp-green','On Time']].map(([d,r,t,sc,st])=>(
//                   <tr key={d}><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{d}</td><td>{r}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{t}</td><td><span className={`status-pill ${sc}`}>{st}</span></td></tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function Modal2FAVerifyStudent({ action, email, onClose, onSuccess, showToast }) {
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (!otp || otp.length < 6) { setError('Please enter the 6-digit OTP.'); return; }
    setVerifying(true);
    setError('');
    try {
      const res = await verifyStudent2FA(otp);
      onSuccess(res.twoFA, res.message);
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP.');
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      await requestStudent2FAToggle();
      showToast('New OTP sent to your email.');
    } catch (err) {
      setError('Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: 28, width: 380,
        boxShadow: '0 20px 60px rgba(0,0,0,.2)', textAlign: 'center'
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: action === 'enable' ? 'rgba(22,163,74,.1)' : 'rgba(220,38,38,.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px', fontSize: 26,
        }}>
          {action === 'enable' ? '🔒' : '🔓'}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
          {action === 'enable' ? 'Enable' : 'Disable'} Two-Factor Authentication
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 20 }}>
          A 6-digit OTP has been sent to <strong>{email}</strong>.<br />
          Enter it below to confirm.
        </div>

        {error && (
          <div style={{
            background: '#fff0f0', border: '1px solid #fcc',
            borderRadius: 8, padding: '8px 12px',
            fontSize: 12.5, color: '#c00', marginBottom: 12, textAlign: 'left',
          }}>
            ⚠️ {error}
          </div>
        )}

        <input
          placeholder="123456"
          value={otp}
          onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          onKeyDown={e => e.key === 'Enter' && handleVerify()}
          style={{
            width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)',
            borderRadius: 9, fontSize: 22, fontWeight: 700, letterSpacing: 8,
            textAlign: 'center', marginBottom: 14, fontFamily: "'DM Sans',sans-serif",
            outline: 'none', boxSizing: 'border-box',
          }}
          maxLength={6}
          autoFocus
        />

        <div style={{ marginBottom: 16 }}>
          <button
            onClick={handleResend}
            disabled={resending}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--blue)', fontSize: 12.5, fontFamily: "'DM Sans',sans-serif",
              opacity: resending ? .6 : 1,
            }}
          >
            {resending ? 'Sending…' : "Didn't receive it? Resend OTP"}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="fab-btn fab-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose} disabled={verifying}>
            Cancel
          </button>
          <button
            className="fab-btn"
            style={{
              flex: 1.4, justifyContent: 'center',
              background: action === 'enable' ? 'var(--accent)' : 'var(--red)',
              color: action === 'enable' ? '#1a1a1a' : '#fff',
            }}
            onClick={handleVerify}
            disabled={verifying || otp.length < 6}
          >
            {verifying ? 'Verifying…' : `Confirm ${action === 'enable' ? 'Enable' : 'Disable'}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── PAGE PROFILE ────────────────────────────────────
function PageProfile({ navigate, studentName, myInfo }) {
  const [editMode, setEditMode] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  //const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  //const [togglingFA, setTogglingFA] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [pending2FAAction, setPending2FAAction] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    email: '',
    parentContact: '',
  });
  const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
  const [showPwd, setShowPwd] = useState({ current: false, newPwd: false, confirm: false });
  const [pwdError, setPwdError] = useState('');
  const [toast2, setToast2] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
  if (myInfo) {
    setEditForm({
      name: myInfo.name || '',
      phone: myInfo.phone || '',
      email: myInfo.email || '',
      parentContact: myInfo.parentContact || '',
    });
    setTwoFAEnabled(myInfo.twoFA || false);  // ← ADD THIS LINE
  }
}, [myInfo]);

  const showLocalToast = (msg) => {
    setToast2(msg);
    setTimeout(() => setToast2(''), 2500);
  };

  const initials = typeof studentName === 'string' && studentName.trim()
    ? studentName.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  const route       = myInfo?.assignedRoute;
  const pickupStop  = myInfo?.pickupStop    || '—';
  const rollNo      = myInfo?.rollNo        || '—';
  const className   = myInfo?.className     || '—';
  const parentPhone = myInfo?.parentContact || '—';

  const handleSaveProfile = () => {
    // In real app: call API to update profile
    setEditMode(false);
    showLocalToast('✅ Profile updated successfully');
  };

  // const handleChangePassword = () => {
  //   if (!pwdForm.current) { setPwdError('Enter your current password'); return; }
  //   if (pwdForm.newPwd.length < 6) { setPwdError('New password must be at least 6 characters'); return; }
  //   if (pwdForm.newPwd !== pwdForm.confirm) { setPwdError('Passwords do not match'); return; }
  //   setPwdError('');
  //   setShowPwdModal(false);
  //   setPwdForm({ current: '', newPwd: '', confirm: '' });
  //   showLocalToast('🔐 Password changed successfully');
  // };
  const handleChangePassword = async () => {
  if (!pwdForm.current)          { setPwdError('Enter your current password'); return; }
  if (pwdForm.newPwd.length < 6) { setPwdError('New password must be at least 6 characters'); return; }
  if (pwdForm.newPwd !== pwdForm.confirm) { setPwdError('Passwords do not match'); return; }

  setPwdLoading(true);  // add: const [pwdLoading, setPwdLoading] = useState(false);
  setPwdError('');

  try {
    await changePassword(pwdForm.current, pwdForm.newPwd);
    setShowPwdModal(false);
    setPwdForm({ current: '', newPwd: '', confirm: '' });
    showLocalToast('🔐 Password changed successfully');
  } catch (err) {
    setPwdError(err.message || 'Failed to change password');
  } finally {
    setPwdLoading(false);
  }
};

  const inputStyle = {
    width: '100%', padding: '9px 12px', border: '1.5px solid var(--border)',
    borderRadius: 9, fontSize: 13, fontFamily: "'DM Sans',sans-serif",
    color: 'var(--text)', background: editMode ? '#fff' : '#f8fafc',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color .15s',
    cursor: editMode ? 'text' : 'default',
  };

  return (
    <div className="page">
      {toast2 && (
        <div className="toast" style={{ background: 'var(--green)' }}>{toast2}</div>
      )}

      <div className="page-header">
        <div>
          <div className="page-title">My Profile</div>
          <div className="page-subtitle">Manage your account and preferences</div>
        </div>
        {!editMode ? (
          <button className="fab-btn fab-primary" onClick={() => setEditMode(true)}>
            ✏️ Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="fab-btn fab-secondary" onClick={() => setEditMode(false)}>✕ Cancel</button>
            <button className="fab-btn fab-primary" onClick={handleSaveProfile}>✓ Save Changes</button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 14 }}>
        {/* Left: profile card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="profile-card">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-name">{studentName || '—'}</div>
            <div className="profile-id">{rollNo}</div>
            <span className="status-pill sp-green">Active</span>
            {/* Stats row like admin */}
            <div style={{ display: 'flex', gap: 0, width: '100%', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', marginTop: 4 }}>
              {[['2', 'TRIPS / DAY'], ['5', 'DAYS / WK'], ['1', 'ROUTE']].map(([val, label], i) => (
                <div key={label} style={{
                  flex: 1, textAlign: 'center', padding: '10px 4px',
                  borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                  background: '#f8fafc'
                }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{val}</div>
                  <div style={{ fontSize: 9, color: 'var(--muted)', fontWeight: 700, letterSpacing: .5, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
            {/* Meta info */}
            <div style={{ width: '100%', fontSize: 12.5, color: 'var(--muted)' }}>
              {[
                ['Enrolled', 'Jan 2024'],
                ['Last Login', 'Today'],
                ['Sessions', 'Active'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
                  <span>{k}</span><span style={{ fontWeight: 600, color: 'var(--text)' }}>{v}</span>
                </div>
              ))}
            </div>
            <button className="fab-btn fab-secondary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}
              onClick={() => { clearStudentSession(); navigate('/student/login'); }}>
              ← Logout
            </button>
          </div>
        </div>

        {/* Right: details + security */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Personal Information */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Personal Information</span>
            </div>
            <div style={{ padding: '18px 20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  ['Full Name', 'name', editForm.name || studentName || ''],
                  ['Roll Number', null, rollNo],
                  ['Phone', 'phone', editForm.phone],
                  ['Class', null, className],
                  ['Parent Contact', 'parentContact', editForm.parentContact],
                  ['Route', null, route ? `${route.routeId} — ${route.name}` : '—'],
                  ['Pickup Stop', null, pickupStop],
                  ['Email', 'email', editForm.email],
                ].map(([label, field, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 6 }}>
                      {label}
                    </div>
                    {field && editMode ? (
                      <input
                        style={inputStyle}
                        value={editForm[field]}
                        onChange={e => setEditForm(f => ({ ...f, [field]: e.target.value }))}
                        placeholder={label}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    ) : (
                      <div style={{
                        padding: '9px 12px', background: '#f8fafc',
                        border: '1.5px solid var(--border)', borderRadius: 9,
                        fontSize: 13, fontWeight: field ? 400 : 600,
                        color: val && val !== '—' ? 'var(--text)' : 'var(--muted)'
                      }}>
                        {val || '—'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Security</span>
            </div>
            <div style={{ padding: '6px 0' }}>
              {/* Change Password Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>Password</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Last changed 3 months ago</div>
                </div>
                <button className="fab-btn fab-secondary" onClick={() => setShowPwdModal(true)}>
                  Change Password
                </button>
              </div>
              {/* 2FA Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Protect your account with 2FA</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    className={`status-pill ${twoFAEnabled ? 'sp-green' : 'sp-gray'}`}
                    style={{ fontSize: 10 }}
                  >
                    {twoFAEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <button
                    onClick={async () => {
                      try {
                        await requestStudent2FAToggle();
                        setPending2FAAction(twoFAEnabled ? 'disable' : 'enable');
                        setShow2FAModal(true);
                      } catch (err) {
                        showLocalToast('Failed to send OTP: ' + err.message);
                      }
                    }}
                    style={{
                      padding: '6px 16px', borderRadius: 20, fontSize: 12.5, fontWeight: 700,
                      cursor: 'pointer', border: 'none', fontFamily: "'DM Sans',sans-serif",
                      background: twoFAEnabled ? 'rgba(220,38,38,.12)' : 'rgba(22,163,74,.12)',
                      color: twoFAEnabled ? 'var(--red)' : 'var(--green)',
                      transition: 'all .2s',
                    }}
                  >
                    {twoFAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
              </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}

        </div>
      </div>

      {/* Change Password Modal */}
      {showPwdModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200
        }}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: 28, width: 400,
            boxShadow: '0 20px 60px rgba(0,0,0,.2)', animation: 'fadeIn .2s ease'
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>🔐 Change Password</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 20 }}>Enter your current and new password below.</div>
            {[['current', 'Current Password'], ['newPwd', 'New Password'], ['confirm', 'Confirm New Password']].map(([field, label]) => (
              <div key={field} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 5 }}>{label}</div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPwd[field] ? 'text' : 'password'}
                    style={{ ...inputStyle, background: '#f8fafc', cursor: 'text', paddingRight: 38 }}
                    value={pwdForm[field]}
                    onChange={e => setPwdForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={label}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                  <button type="button" onClick={() => setShowPwd(p => ({ ...p, [field]: !p[field] }))}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16 }}>
                    {showPwd[field] ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
            ))}
            {pwdError && <div style={{ fontSize: 12, color: 'var(--red)', marginBottom: 12, padding: '8px 12px', background: 'rgba(220,38,38,.08)', borderRadius: 8 }}>⚠️ {pwdError}</div>}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
              <button className="fab-btn fab-secondary" onClick={() => { setShowPwdModal(false); setPwdError(''); setPwdForm({ current: '', newPwd: '', confirm: '' }); }}>Cancel</button>
              {/* <button className="fab-btn fab-primary" onClick={handleChangePassword}>Update Password</button> */}
              <button
  className="fab-btn fab-primary"
  onClick={handleChangePassword}
  disabled={pwdLoading}
  style={{ opacity: pwdLoading ? .7 : 1 }}
>
  {pwdLoading ? 'Updating…' : 'Update Password'}
</button>
            </div>
          </div>
        </div>
      )}

      {show2FAModal && (
        <Modal2FAVerifyStudent
          action={pending2FAAction}
          email={editForm.email || myInfo?.email}
          onClose={() => setShow2FAModal(false)}
          onSuccess={(newVal, msg) => {
            setTwoFAEnabled(newVal);
            setShow2FAModal(false);
            showLocalToast(msg);
          }}
          showToast={showLocalToast}
        />
      )}
      
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
  const [studentName, setStudentName] = useState('');
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
  getMyInfo()
    .then(d => {
      if (d.student) {
        setStudentName(d.student.name || '');
        setStudentInfo(d.student);
      }
    })
    .catch(() => {});
}, []);

// Helper to get initials
// const getInitials = (name) =>
//   name ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '??';
const getInitials = (name) =>
  typeof name === 'string' && name.trim()
    ? name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  // const [notifs, setNotifs] = useState([
  //   {icon:'🚌',color:'amber',text:'<strong>Bus KA-01-B</strong> is arriving at City Park in 8 minutes',time:'09:14 AM',read:false},
  //   {icon:'⚠️',color:'red',text:'<strong>Route A</strong> delayed by 5 minutes due to traffic',time:'08:55 AM',read:false},
  //   {icon:'✅',color:'green',text:'<strong>Bus departed</strong> College Main Gate on time',time:'07:00 AM',read:true},
  //   {icon:'📍',color:'blue',text:'<strong>Stop update:</strong> North Bridge stop timing changed to 07:16 AM',time:'Yesterday',read:true},
  //   {icon:'🔔',color:'amber',text:"<strong>Reminder:</strong> Tomorrow's first bus departs at 07:00 AM",time:'Yesterday',read:true},
  // ]);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    getNotifications()
      .then(d => setNotifs((d.notifications || []).map(mapNotification)))
      .catch(() => setNotifs([]));
  }, []);

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

  // Live push: new notifications appear instantly without a refresh
  useEffect(() => {
    const notifSocket = io('http://localhost:8000');
    notifSocket.on('notification:new', (notif) => {
      setNotifs(ns => [mapNotification(notif), ...ns]);
      showToast(`🔔 ${notif.title}`);
    });
    return () => notifSocket.disconnect();
  }, []);

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
  
  const pageTitles = {
  home:          'Dashboard',
  tracking:      'Live Tracking',
  routes:        'My Route',
  favorites:     'Favorites',
  notifications: 'Notifications',
  profile:       'My Profile',
};

  const renderPage = () => {
    switch(activePage) {
      // case 'home':          return <PageHome showToast={showToast} setActivePage={setActivePage} onNameLoaded={setStudentName}/>;
      case 'home': return <PageHome 
        showToast={showToast} 
        setActivePage={setActivePage} 
        onNameLoaded={(name, info) => { setStudentName(name); setStudentInfo(info); }}
        notifs={notifs}
      />;
      case 'tracking':      return <PageTracking favs={favs} toggleFav={toggleFav} showToast={showToast} myInfo={studentInfo}/>;
      case 'routes':        return <PageRoutes favs={favs} toggleFav={toggleFav} showToast={showToast}/>;
      //case 'favorites':     return <PageFavorites favs={favs} toggleFav={toggleFav} showToast={showToast}/>;
      case 'favorites': return <PageFavorites favs={favs} toggleFav={toggleFav} showToast={showToast} myInfo={studentInfo}/>;
      case 'notifications': return <PageNotifications notifs={notifs} setNotifs={setNotifs}/>;
      // case 'profile':       return <PageProfile navigate={navigate}/>;
      case 'profile': return <PageProfile 
  navigate={navigate} 
  studentName={studentName} 
  myInfo={studentInfo}
/>;
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
          <div style={{
    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 13, fontWeight: 600, color: 'var(--muted)'
  }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
    {pageTitles[activePage] || 'Dashboard'}
  </div>
          <div className="spacer"/>
          <div className="topbar-right">
            <div className="topbar-time">{clock}</div>
            <div className="badge-notif" onClick={() => setActivePage('notifications')}><IconBellTop/>{unreadCount > 0 && <span className="dot"/>}</div>
            <div
              className="avatar"
              title="My Profile"
              onClick={() => setActivePage('profile')}
              style={{ cursor: 'pointer' }}
            >
              {getInitials(studentName)}
            </div>
            
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
              {/* <button className="nav-item" style={{color:'#64748b'}} onClick={() => navigate('/')}><IconLogout/> Logout</button> */}
              <button className="nav-item" style={{color:'#64748b'}} onClick={() => {
  clearStudentSession();
  navigate('/student/login');
}}><IconLogout/> Logout</button>
            </div>
          </div>
          <div className="main">{renderPage()}</div>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
