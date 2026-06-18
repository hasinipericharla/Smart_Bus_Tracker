import {
  getAdminStudents, createAdminStudent, updateAdminStudent, deleteAdminStudent,
  getBuses, createBus, updateBus, deleteBus,
  getRoutes, createRoute, updateRoute, deleteRoute,
  getAdminDrivers, createAdminDriver, updateAdminDriver, deleteAdminDriver,
  getTrips, getAdminProfile, updateAdminProfile, changeAdminPassword, getAdminActivity
} from '../api/adminService';

import { getAdminAnalytics } from '../api/adminService'; 

import { useState, useEffect, useRef, useCallback } from "react";
import { clearSession } from './AdminLogin';
import { useNavigate } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --accent:#f5a623;--accent2:#e8951f;--blue:#3b8bd4;--blue2:#2563eb;
  --green:#16a34a;--red:#dc2626;--purple:#7c3aed;
  --text:#1e293b;--muted:#64748b;--border:#e2e8f0;
}
body{font-family:'DM Sans',sans-serif;background:#f1f5f9;color:var(--text)}
.layout{display:flex;min-height:100vh;flex-direction:column}
.topbar{height:58px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:12px;position:sticky;top:0;z-index:100;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.logo{display:flex;align-items:center;gap:9px;font-weight:700;font-size:15px;letter-spacing:-.2px;color:var(--text)}
.logo-icon{width:34px;height:34px;background:var(--accent);border-radius:9px;display:flex;align-items:center;justify-content:center}
.logo-icon svg{width:18px;height:18px;fill:#1a1a1a}
.topbar .spacer{flex:1}
.topbar-right{display:flex;align-items:center;gap:14px}
.badge-notif{position:relative;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#f8fafc;border:1px solid var(--border);transition:all .15s}
.badge-notif:hover{background:#f1f5f9;border-color:var(--accent)}
.badge-notif.active-bell{background:rgba(245,166,35,.12);border-color:var(--accent)}
.badge-notif .dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--red);border-radius:50%;border:2px solid #fff}
.avatar{width:32px;height:32px;background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#1a1a1a;cursor:pointer}
.topbar-time{font-size:12.5px;color:var(--muted);font-family:'DM Mono',monospace;background:#f8fafc;padding:4px 10px;border-radius:6px;border:1px solid var(--border)}
.breadcrumb{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px}
.breadcrumb span{color:var(--text);font-weight:500}
.body-wrap{display:flex;flex:1;overflow:hidden}

/* SIDEBAR */
.sidebar{width:230px;background:#1e293b;border-right:1px solid #334155;display:flex;flex-direction:column;padding:14px 0;flex-shrink:0;position:sticky;top:58px;height:calc(100vh - 58px);overflow-y:auto}
.nav-section{padding:0 10px;margin-bottom:6px}
.nav-label{font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1.2px;padding:8px 10px 5px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;cursor:pointer;font-size:13px;color:#94a3b8;transition:all .15s;margin-bottom:1px;user-select:none;position:relative;background:none;border:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif}
.nav-item:hover{background:rgba(255,255,255,.07);color:#e2e8f0}
.nav-item.active{background:rgba(245,166,35,.15);color:var(--accent);font-weight:600}
.nav-item.active::before{content:'';position:absolute;left:-10px;top:50%;transform:translateY(-50%);width:3px;height:20px;background:var(--accent);border-radius:0 3px 3px 0}
.nav-item .ni{width:15px;height:15px;opacity:.7;flex-shrink:0}
.nav-item.active .ni{opacity:1}
.nav-badge{margin-left:auto;background:var(--red);color:#fff;font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:10px;line-height:1.4}
.nav-badge.warn{background:rgba(245,166,35,.2);color:var(--accent);border:1px solid rgba(245,166,35,.3)}
.sidebar-bottom{margin-top:auto;padding:10px;border-top:1px solid #334155}

/* MAIN CONTENT AREA */
.main{flex:1;overflow-y:auto;background:#f1f5f9;min-width:0}
.page{padding:22px 26px;display:flex;flex-direction:column;gap:18px;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.page-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.page-title{font-size:20px;font-weight:700;letter-spacing:-.3px}
.page-subtitle{font-size:12.5px;color:var(--muted);margin-top:2px}
.fab-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.fab-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:'DM Sans',sans-serif}
.fab-primary{background:var(--accent);color:#1a1a1a}
.fab-primary:hover{background:var(--accent2);transform:translateY(-1px);box-shadow:0 4px 12px rgba(245,166,35,.35)}
.fab-secondary{background:#fff;color:var(--text);border:1px solid var(--border)}
.fab-secondary:hover{background:#f1f5f9}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.stat-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;position:relative;overflow:hidden;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.stat-card:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
.stat-card::after{content:'';position:absolute;top:-10px;right:-10px;width:70px;height:70px;border-radius:50%;opacity:.08}
.stat-card.s-green::after{background:var(--green)} .stat-card.s-amber::after{background:var(--accent)} .stat-card.s-blue::after{background:var(--blue)} .stat-card.s-purple::after{background:var(--purple)}
.stat-label{font-size:10.5px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
.stat-val{font-size:30px;font-weight:700;line-height:1;letter-spacing:-1px}
.stat-val.green{color:var(--green)} .stat-val.amber{color:var(--accent)} .stat-val.blue{color:var(--blue2)} .stat-val.purple{color:var(--purple)}
.stat-sub{font-size:11.5px;color:var(--muted);margin-top:8px;display:flex;align-items:center;gap:5px}
.stat-trend{font-size:10.5px;padding:2px 7px;border-radius:6px;font-weight:700}
.stat-trend.up{background:rgba(22,163,74,.1);color:var(--green)} .stat-trend.down{background:rgba(220,38,38,.1);color:var(--red)}
.map-card,.table-card,.route-card{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.card-header{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid var(--border);background:#f8fafc}
.card-title{font-size:13.5px;font-weight:600;color:var(--text)}
.card-sub{font-size:11.5px;color:var(--muted)}
.ch-right{margin-left:auto;display:flex;align-items:center;gap:8px}
.pill{font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid transparent;background:none;font-family:'DM Sans',sans-serif}
.pill.active{background:var(--accent);color:#1a1a1a;border-color:var(--accent)}
.pill.passive{background:#f1f5f9;color:var(--muted);border-color:var(--border)}
.pill.passive:hover{background:#e2e8f0;color:var(--text)}
.map-body{height:250px;background:#eef4fb;position:relative;overflow:hidden}
.map-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,139,212,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,139,212,.1) 1px,transparent 1px);background-size:36px 36px}
.map-road{position:absolute;background:rgba(148,163,184,.3);border-radius:2px}
.bus-dot{position:absolute;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:800;cursor:pointer;transition:transform .2s;z-index:2}
.bus-dot:hover{transform:scale(1.35)!important}
.bus-dot.on-time{background:var(--green);color:#fff;animation:pulseGreen 2s infinite}
.bus-dot.delayed{background:var(--accent);color:#1a1a1a;animation:pulseAmber 2s infinite}
.bus-dot.idle{background:#3a4a60;color:#94a3b8}
@keyframes pulseGreen{0%,100%{box-shadow:0 0 0 3px rgba(61,200,122,.25)}50%{box-shadow:0 0 0 8px rgba(61,200,122,.06)}}
@keyframes pulseAmber{0%,100%{box-shadow:0 0 0 3px rgba(245,166,35,.25)}50%{box-shadow:0 0 0 8px rgba(245,166,35,.06)}}
.stop-dot{position:absolute;width:7px;height:7px;background:#cbd5e1;border:2px solid #94a3b8;border-radius:50%;z-index:1}
.route-line-h{position:absolute;height:3px;border-radius:2px;z-index:0}
.map-legend{display:flex;align-items:center;gap:16px;padding:10px 18px;border-top:1px solid var(--border);background:#f8fafc}
.legend-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
.legend-dot{width:8px;height:8px;border-radius:50%}
.data-table{width:100%;border-collapse:collapse}
.data-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;padding:10px 16px;text-align:left;border-bottom:1px solid var(--border);background:#f8fafc}
.data-table td{padding:10px 16px;font-size:12.5px;border-bottom:1px solid var(--border);vertical-align:middle;color:var(--text)}
.data-table tr:last-child td{border-bottom:none}
.data-table tr:hover td{background:#f8fafc}
.status-pill{font-size:10px;padding:3px 9px;border-radius:8px;font-weight:700;display:inline-block}
.sp-green{background:rgba(61,200,122,.12);color:var(--green)} .sp-amber{background:rgba(245,166,35,.12);color:var(--accent)} .sp-gray{background:rgba(122,143,170,.1);color:var(--muted)} .sp-red{background:rgba(224,82,82,.12);color:var(--red)} .sp-blue{background:rgba(59,139,212,.12);color:var(--blue2)} .sp-purple{background:rgba(165,110,245,.12);color:var(--purple)}
.ava-sm{width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#fff;margin-right:6px;vertical-align:middle;flex-shrink:0}
.act-btn{background:#f8fafc;border:1px solid var(--border);color:var(--muted);border-radius:7px;padding:4px 10px;font-size:11px;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif}
.act-btn:hover{border-color:var(--accent);color:var(--accent2)}
.analytics-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.chart-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.chart-title{font-size:13px;font-weight:600;margin-bottom:14px;color:var(--text)}
.bar-chart{display:flex;align-items:flex-end;gap:8px;height:100px}
.bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px}
.bar-fill{width:100%;border-radius:4px 4px 0 0;transition:height .6s ease;min-height:3px}
.bar-label{font-size:9px;color:var(--muted);font-family:'DM Mono',monospace}
.donut-wrap{display:flex;align-items:center;justify-content:center;gap:18px}
.donut-legend{display:flex;flex-direction:column;gap:7px}
.donut-leg-item{display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--muted)}
.donut-leg-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.kpi-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:16px;display:flex;align-items:center;gap:14px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.kpi-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.kpi-val{font-size:22px;font-weight:700}
.kpi-lbl{font-size:11px;color:var(--muted);margin-top:2px}
.history-full{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.driver-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.driver-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;cursor:pointer;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.driver-card:hover{border-color:rgba(37,99,235,.3);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
.dc-header{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.dc-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff;flex-shrink:0}
.dc-name{font-size:14px;font-weight:600}
.dc-id{font-size:11px;color:var(--muted);margin-top:1px}
.dc-row{display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid var(--border)}
.dc-key{color:var(--muted)} .dc-val{font-weight:500;text-align:right}
.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:500;backdrop-filter:blur(3px);animation:fadeIn .2s ease}
.modal{background:#fff;border:1px solid var(--border);border-radius:16px;width:460px;max-width:95vw;max-height:90vh;overflow-y:auto;padding:26px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.15);animation:slideUp .2s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.modal h3{font-size:16px;font-weight:700;margin-bottom:20px;letter-spacing:-.2px;color:var(--text)}
.form-row{margin-bottom:14px}
.form-label{font-size:10.5px;color:var(--muted);margin-bottom:6px;display:block;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.form-input{width:100%;background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:10px 13px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .15s,background .15s}
.form-input:focus{border-color:var(--accent);background:#fffbf5}
.form-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.modal-actions{display:flex;gap:10px;margin-top:22px}
.btn-cancel{flex:1;padding:11px;border-radius:9px;border:1px solid var(--border);background:#f8fafc;color:var(--muted);font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.btn-cancel:hover{border-color:var(--muted);color:var(--text)}
.btn-save{flex:2;padding:11px;border-radius:9px;border:none;background:var(--accent);color:#1a1a1a;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.btn-save:hover{background:var(--accent2);transform:translateY(-1px)}
.close-btn{position:absolute;top:18px;right:18px;background:#f1f5f9;border:none;color:var(--muted);width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;transition:all .15s;flex-shrink:0}
.close-btn:hover{background:#e2e8f0;color:var(--text)}
.form-section-title{font-size:11px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.6px;padding:10px 0 4px;border-top:1px solid var(--border);margin-top:4px}
.route-stop-list{margin-top:8px;display:flex;flex-direction:column;gap:6px}
.stop-item{display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f8fafc;border-radius:7px;border:1px solid var(--border);font-size:12.5px;color:var(--text)}
.stop-num{width:20px;height:20px;border-radius:50%;background:rgba(245,166,35,.12);color:var(--accent2);font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.stop-name-txt{flex:1}
.remove-stop{background:transparent;border:none;color:var(--muted);cursor:pointer;font-size:16px;line-height:1;padding:0 2px;transition:color .15s}
.remove-stop:hover{color:var(--red)}
.add-stop-row{display:flex;gap:8px;margin-top:8px}
.add-stop-input{flex:1;background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text);font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .15s}
.add-stop-input:focus{border-color:var(--accent)}
.add-stop-btn{padding:8px 14px;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.25);border-radius:8px;color:var(--accent2);font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap;font-family:'DM Sans',sans-serif}
.add-stop-btn:hover{background:rgba(245,166,35,.2)}
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:var(--green);color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:slideUp .3s ease}
.search-bar{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;transition:border-color .15s}
.search-bar:focus-within{border-color:var(--accent)}
.search-bar input{background:transparent;border:none;outline:none;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;width:200px}
.search-bar input::placeholder{color:var(--muted)}
.filter-select{background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;color:var(--text);font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer}

/* ─── NOTIFICATIONS PAGE ──────────────────────────── */
.notif-page-card{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.notif-page-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--border);background:#f8fafc}
.notif-page-title{font-size:13.5px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:9px}
.notif-page-badge{background:var(--red);color:#fff;font-size:9.5px;font-weight:700;padding:2px 7px;border-radius:10px;line-height:1.4}
.notif-mark-all{font-size:11.5px;color:var(--blue2);cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif;font-weight:600}
.notif-mark-all:hover{text-decoration:underline}
.notif-list-wrap{display:flex;flex-direction:column}
.notif-row{display:flex;align-items:flex-start;gap:12px;padding:14px 18px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s;position:relative}
.notif-row:last-child{border-bottom:none}
.notif-row:hover{background:#f8fafc}
.notif-row.unread{background:rgba(245,166,35,.03)}
.notif-row.unread::before{content:'';position:absolute;left:7px;top:50%;transform:translateY(-50%);width:5px;height:5px;background:var(--accent);border-radius:50%}
.notif-icon-box{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;margin-top:1px}
.notif-icon-box.warn{background:rgba(245,166,35,.12);color:var(--accent2)}
.notif-icon-box.err{background:rgba(220,38,38,.1);color:var(--red)}
.notif-icon-box.ok{background:rgba(22,163,74,.1);color:var(--green)}
.notif-icon-box.info{background:rgba(37,99,235,.1);color:var(--blue2)}
.notif-content{flex:1;min-width:0}
.notif-title{font-size:12.5px;font-weight:600;color:var(--text);margin-bottom:2px}
.notif-desc{font-size:11.5px;color:var(--muted);line-height:1.5}
.notif-time{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:4px}
.unread-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);flex-shrink:0;margin-top:5px}
.notif-empty{padding:48px 18px;text-align:center;font-size:13px;color:var(--muted)}
.notif-empty-icon{font-size:32px;margin-bottom:10px;opacity:.4}

/* LIVE TRACKING */
.tracking-page{display:flex;flex-direction:column;height:calc(100vh - 58px);overflow:hidden;background:#e8f0e8;position:relative}
.tracking-topbar{position:absolute;top:12px;left:12px;right:12px;z-index:20;display:flex;gap:8px;align-items:center;pointer-events:none}
.tracking-topbar>*{pointer-events:all}
.gm-searchbox{height:40px;background:#fff;border-radius:24px;box-shadow:0 2px 8px rgba(0,0,0,.22);display:flex;align-items:center;padding:0 16px;gap:10px;min-width:220px;max-width:300px}
.gm-searchbox input{border:none;outline:none;font-size:13px;color:#202124;width:100%;background:transparent;font-family:'DM Sans',sans-serif}
.gm-searchbox input::placeholder{color:#80868b}
.route-chips{display:flex;gap:6px;flex-wrap:wrap}
.rchip{height:34px;padding:0 14px;border-radius:17px;background:#fff;box-shadow:0 1px 5px rgba(0,0,0,.2);font-size:12px;font-weight:600;cursor:pointer;border:none;display:flex;align-items:center;gap:6px;transition:all .15s;font-family:'DM Sans',sans-serif;color:#444}
.rchip.active{box-shadow:0 2px 8px rgba(0,0,0,.25)}
.rchip .rdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.live-badge-float{position:absolute;top:64px;right:12px;z-index:20;background:#fff;border-radius:20px;box-shadow:0 2px 8px rgba(0,0,0,.2);padding:6px 12px;display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:#202124}
.live-anim-dot{width:7px;height:7px;border-radius:50%;background:#0f9d58;animation:livePulse 1.8s infinite}
@keyframes livePulse{0%,100%{opacity:1}50%{opacity:.2}}
.gm-canvas-wrap{position:absolute;inset:0;cursor:grab}
.gm-canvas-wrap:active{cursor:grabbing}
.gm-canvas{display:block;width:100%;height:100%}
.gm-zoom-ctrl{position:absolute;right:12px;bottom:110px;z-index:20;display:flex;flex-direction:column;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.25)}
.gm-zoom-btn{width:36px;height:36px;background:#fff;border:none;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#444;border-bottom:0.5px solid #e0e0e0;transition:background .1s;line-height:1}
.gm-zoom-btn:last-child{border-bottom:none}
.gm-zoom-btn:hover{background:#f1f3f4}
.gm-compass{position:absolute;right:12px;bottom:170px;z-index:20;width:36px;height:36px;background:#fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#e8453c}
.bus-info-panel{position:absolute;left:12px;top:64px;z-index:30;background:#fff;border-radius:14px;box-shadow:0 4px 24px rgba(0,0,0,.2);width:270px;overflow:hidden;transition:opacity .2s,transform .2s}
.bus-info-panel.hidden{opacity:0;pointer-events:none;transform:translateY(-8px)}
.bip-header{padding:13px 14px 10px;border-bottom:1px solid #f1f3f4;display:flex;align-items:flex-start;gap:10px}
.bip-avatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
.bip-busid{font-size:15px;font-weight:700;color:#202124}
.bip-routename{font-size:11px;color:#5f6368;margin-top:1px}
.bip-close{margin-left:auto;background:none;border:none;cursor:pointer;color:#5f6368;font-size:20px;line-height:1;padding:0;flex-shrink:0}
.bip-body{padding:10px 14px}
.bip-row{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:0.5px solid #f1f3f4;font-size:12px}
.bip-row:last-child{border-bottom:none}
.bip-icon{width:15px;height:15px;flex-shrink:0;opacity:.6}
.bip-key{color:#5f6368;min-width:78px;font-size:11.5px}
.bip-val{color:#202124;font-weight:600;flex:1;text-align:right;font-size:12px}
.bip-progress{padding:8px 14px 14px;border-top:1px solid #f1f3f4}
.bip-prog-lbl{font-size:10.5px;color:#5f6368;margin-bottom:7px;font-weight:600;text-transform:uppercase;letter-spacing:.4px}
.bip-prog-track{height:4px;background:#e8eaed;border-radius:2px;margin-bottom:10px;position:relative}
.bip-prog-fill{height:100%;border-radius:2px;transition:width .6s ease}
.bip-stops-row{display:flex;justify-content:space-between;align-items:flex-start}
.bip-stop-node{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:52px}
.bip-stop-dot{width:9px;height:9px;border-radius:50%;border:2px solid #dadce0;background:#fff;flex-shrink:0}
.bip-stop-dot.done{background:#1a73e8;border-color:#1a73e8}
.bip-stop-dot.current{background:#fff;border-color:#1a73e8;box-shadow:0 0 0 3px rgba(26,115,232,.22)}
.bip-stop-label{font-size:9.5px;color:#5f6368;text-align:center;line-height:1.3;word-break:break-word}
.bip-stop-label.done-lbl{color:#1a73e8;font-weight:600}
.gm-attribution{position:absolute;bottom:56px;right:6px;font-size:10px;color:#666;background:rgba(255,255,255,.85);padding:2px 6px;border-radius:2px;z-index:10}
.bus-cards-bar{position:absolute;bottom:0;left:0;right:0;z-index:20}
.bcs-scroll{display:flex;gap:10px;padding:10px 12px 14px;overflow-x:auto;scrollbar-width:none}
.bcs-scroll::-webkit-scrollbar{display:none}
.bcard{min-width:188px;background:#fff;border-radius:13px;box-shadow:0 2px 10px rgba(0,0,0,.16);padding:10px 12px;cursor:pointer;border:2px solid transparent;transition:all .15s;flex-shrink:0}
.bcard:hover{box-shadow:0 4px 16px rgba(0,0,0,.2)}
.bcard.sel{border-color:#1a73e8;box-shadow:0 2px 16px rgba(26,115,232,.28)}
.bcard-top{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.bcard-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;flex-shrink:0}
.bcard-num{font-size:12.5px;font-weight:700;color:#202124}
.bcard-route{font-size:10px;color:#5f6368;margin-top:1px}
.bcard-spill{font-size:10px;font-weight:700;padding:2px 7px;border-radius:9px}
.bcs-green{background:#e6f4ea;color:#1e7e34}
.bcs-amber{background:#fef7e0;color:#9a6700}
.bcs-gray{background:#f1f3f4;color:#5f6368}
.bcs-red{background:#fce8e6;color:#c5221f}
.bcard-info{font-size:10.5px;color:#5f6368;line-height:1.6}
.bcard-info b{color:#202124;font-weight:600}
.bcard-info .hl{font-weight:600}

/* PROFILE PAGE */
.profile-grid{display:grid;grid-template-columns:300px 1fr;gap:18px}
.profile-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,.04);display:flex;flex-direction:column;align-items:center;gap:14px}
.profile-avatar-lg{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:#1a1a1a}
.profile-name{font-size:17px;font-weight:700;color:var(--text);text-align:center}
.profile-role{font-size:12px;color:var(--muted);text-align:center;margin-top:-8px}
.profile-stat-row{display:flex;gap:18px;margin-top:4px}
.profile-stat{text-align:center}
.profile-stat-val{font-size:18px;font-weight:700;color:var(--text)}
.profile-stat-lbl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px}
.profile-divider{width:100%;height:1px;background:var(--border)}
.profile-info-card{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.profile-section{padding:18px 22px}
.profile-section-title{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.7px;margin-bottom:16px}
.profile-field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.profile-field{display:flex;flex-direction:column;gap:5px}
.profile-field label{font-size:10.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.profile-field .field-val{font-size:13px;color:var(--text);background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:9px 13px}
.profile-field input{font-size:13px;color:var(--text);background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:9px 13px;outline:none;font-family:'DM Sans',sans-serif;transition:border-color .15s}
.profile-field input:focus{border-color:var(--accent);background:#fffbf5}
.activity-list{padding:0 22px 18px}
.activity-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)}
.activity-item:last-child{border-bottom:none}
.activity-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px}
.activity-text{font-size:12.5px;color:var(--text);line-height:1.5}
.activity-time{font-size:10.5px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:2px}

::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:#94a3b8}
`;

const DELETE_MODAL_CSS = `
.confirm-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;z-index:600;backdrop-filter:blur(4px);animation:fadeIn .18s ease}
.confirm-box{background:#fff;border-radius:18px;width:400px;max-width:92vw;padding:32px 28px 24px;box-shadow:0 24px 64px rgba(0,0,0,.18);animation:slideUp .22s ease;position:relative;text-align:center}
.confirm-icon{width:56px;height:56px;border-radius:50%;background:rgba(220,38,38,.1);display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.confirm-icon svg{width:26px;height:26px;stroke:var(--red);stroke-width:2;fill:none}
.confirm-title{font-size:17px;font-weight:700;color:var(--text);margin-bottom:8px;letter-spacing:-.2px}
.confirm-desc{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:24px}
.confirm-desc strong{color:var(--text);font-weight:600}
.confirm-actions{display:flex;gap:10px}
.confirm-cancel{flex:1;padding:11px;border-radius:10px;border:1.5px solid var(--border);background:#f8fafc;color:var(--muted);font-size:13.5px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.confirm-cancel:hover{border-color:#94a3b8;color:var(--text);background:#f1f5f9}
.confirm-delete{flex:1.4;padding:11px;border-radius:10px;border:none;background:var(--red);color:#fff;font-size:13.5px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;display:flex;align-items:center;justify-content:center;gap:7px}
.confirm-delete:hover{background:#b91c1c;transform:translateY(-1px);box-shadow:0 6px 18px rgba(220,38,38,.35)}
.confirm-delete:disabled{opacity:.65;cursor:not-allowed;transform:none;box-shadow:none}
.confirm-delete .spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0}
@keyframes spin{to{transform:rotate(360deg)}}
`;



function ConfirmDeleteModal({ config, onCancel }) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await config.onConfirm();
    } catch (err) {
      // error handled upstream
    } finally {
      setDeleting(false);
      onCancel();
    }
  };

  return (
    <>
      <style>{DELETE_MODAL_CSS}</style>
      <div className="confirm-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
        <div className="confirm-box">
          <div className="confirm-icon">
            <svg viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </div>
          <div className="confirm-title">{config.title}</div>
          <div className="confirm-desc">
            {config.description} <strong>"{config.itemName}"</strong>?
            <br />
            <span style={{ fontSize: 12 }}>This action cannot be undone.</span>
          </div>
          <div className="confirm-actions">
            <button className="confirm-cancel" onClick={onCancel} disabled={deleting}>
              Cancel
            </button>
            <button className="confirm-delete" onClick={handleConfirm} disabled={deleting}>
              {deleting
                ? <><span className="spinner" /> Deleting…</>
                : <>🗑 Delete</>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── ICONS ─────────────────────────────────────────────────────────── */
const IconDash   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>;
const IconClock  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconBus    = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const IconUser   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconRoute  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconPeople = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconBar    = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IconFile   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IconBell   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IconSearch = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconProfile= () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconLogout = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const BusLogo    = () => <svg viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 9h16v4H4V9z"/></svg>;

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function getDateString() {
  return new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

/* ─── TRACKING DATA ─────────────────────────────────────────────────── */
const ROUTE_CFG = {
  A: { color: '#1a73e8', label: 'Route A — North Loop',   short: 'North Loop'    },
  B: { color: '#0f9d58', label: 'Route B — East Connect', short: 'East Connect'  },
  C: { color: '#f9ab00', label: 'Route C — South Express',short: 'South Express' },
  D: { color: '#9334e6', label: 'Route D — West Campus',  short: 'West Campus'   },
};
const MAP_STOPS = {
  A:[{x:62,y:300,name:'Main Gate'},{x:116,y:264,name:'KHB Colony'},{x:172,y:228,name:'Market Circle'},{x:232,y:198,name:'City Park'},{x:292,y:183,name:'North Bridge'},{x:347,y:193,name:'Bus Stand'},{x:397,y:218,name:'Old Town'},{x:432,y:254,name:'Shahapur'},{x:452,y:294,name:'Civil Lines'},{x:436,y:334,name:'Station Rd'},{x:401,y:364,name:'Railway Stn'},{x:351,y:379,name:'Depot North'}],
  B:[{x:356,y:384,name:'Depot'},{x:421,y:414,name:'East Market'},{x:476,y:439,name:'Gandhi Ngr'},{x:521,y:419,name:'New Colony'},{x:556,y:389,name:'College Rd'},{x:571,y:354,name:'Hospital'},{x:556,y:314,name:'Rail Station'},{x:511,y:289,name:'Main Stop'}],
  C:[{x:71,y:430,name:'School Gate'},{x:131,y:459,name:'Tilakwadi'},{x:196,y:474,name:'Sadashiv Ngr'},{x:261,y:459,name:'Vidyanagar'},{x:321,y:444,name:'Camp'},{x:376,y:449,name:'Belgaum Fort'},{x:431,y:464,name:'Nehru Ngr'},{x:481,y:477,name:'Shivaji Ngr'},{x:531,y:467,name:'Angol'},{x:591,y:454,name:'Central Mkt'}],
  D:[{x:81,y:164,name:'Campus A'},{x:146,y:139,name:'Science Block'},{x:211,y:129,name:'Hostel'},{x:276,y:137,name:'Library'},{x:336,y:154,name:'Admin Block'},{x:386,y:169,name:'West Gate'}],
};
const INITIAL_BUSES = [
  {id:'KA-01-B',route:'A',label:'A1',t:0.08,speed:0.00055,status:'on-time',delay:0,driver:'R. Kumar',passengers:38,capacity:50},
  {id:'KA-02-B',route:'A',label:'A2',t:0.43,speed:0.00048,status:'on-time',delay:0,driver:'V. Patil',passengers:45,capacity:50},
  {id:'KA-03-C',route:'A',label:'A3',t:0.71,speed:0.00025,status:'delayed',delay:12,driver:'A. Baig',passengers:22,capacity:50},
  {id:'KA-04-D',route:'B',label:'B1',t:0.14,speed:0.00062,status:'on-time',delay:0,driver:'M. Rao',passengers:30,capacity:48},
  {id:'KA-05-E',route:'B',label:'B2',t:0.61,speed:0.00055,status:'on-time',delay:0,driver:'D. Nair',passengers:41,capacity:48},
  {id:'KA-06-F',route:'C',label:'C1',t:0.11,speed:0.00052,status:'on-time',delay:0,driver:'P. Sharma',passengers:28,capacity:52},
  {id:'KA-07-G',route:'C',label:'C2',t:0.54,speed:0.00043,status:'delayed',delay:7,driver:'K. Singh',passengers:35,capacity:52},
  {id:'KA-08-H',route:'D',label:'D1',t:0.26,speed:0.00068,status:'on-time',delay:0,driver:'S. Joshi',passengers:15,capacity:45},
  {id:'KA-09-I',route:'D',label:'D2',t:0.79,speed:0,status:'idle',delay:0,driver:'R. Desai',passengers:0,capacity:45},
];

/* ─── CANVAS HELPERS ─────────────────────────────────────────────────── */
function ptOnPath(stops,t){const n=stops.length-1;const seg=Math.min(Math.floor(t*n),n-1);const lt=(t*n)-seg;const a=stops[seg],b=stops[Math.min(seg+1,n)];return{x:a.x+(b.x-a.x)*lt,y:a.y+(b.y-a.y)*lt,seg};}
function drawMapFrame(ctx,W0,H0){ctx.fillStyle='#e8f0e8';ctx.fillRect(0,0,W0,H0);const blocks=[{x:20,y:20,w:118,h:78,c:'#d4e8d4'},{x:156,y:20,w:88,h:58,c:'#cce0cc'},{x:262,y:20,w:78,h:53,c:'#d0e4d0'},{x:228,y:152,w:53,h:108,c:'#cce0cc'},{x:438,y:20,w:98,h:88,c:'#d4e8d4'},{x:558,y:20,w:88,h:78,c:'#cce0cc'},{x:478,y:118,w:68,h:58,c:'#d0e4d0'},{x:578,y:168,w:78,h:58,c:'#cce0cc'},{x:20,y:338,w:98,h:78,c:'#d4e8d4'},{x:138,y:358,w:78,h:68,c:'#cce0cc'},{x:248,y:378,w:88,h:73,c:'#d0e4d0'},{x:458,y:348,w:83,h:78,c:'#d4e8d4'},{x:568,y:338,w:78,h:88,c:'#cce0cc'}];blocks.forEach(b=>{ctx.fillStyle=b.c;ctx.beginPath();ctx.roundRect(b.x,b.y,b.w,b.h,3);ctx.fill();});ctx.fillStyle='#b8d4a0';ctx.beginPath();ctx.roundRect(293,58,108,118,8);ctx.fill();ctx.fillStyle='#5a9e5a';ctx.font='bold 10px DM Sans, sans-serif';ctx.textAlign='center';ctx.fillText('City Park',347,122);ctx.fillStyle='#b8d4d8';ctx.beginPath();ctx.ellipse(590,288,52,33,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#4a8a9a';ctx.font='9px DM Sans, sans-serif';ctx.textAlign='center';ctx.fillText('Lake',590,292);const majorRoads=[[0,293,W0,293],[0,188,W0,188],[0,413,W0,413],[118,0,118,H0],[288,0,288,420],[478,0,478,H0],[0,498,W0,498]];majorRoads.forEach(([x1,y1,x2,y2])=>{ctx.beginPath();ctx.strokeStyle='#c4cfbf';ctx.lineWidth=9;ctx.lineCap='round';ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.beginPath();ctx.strokeStyle='#e8f0e8';ctx.lineWidth=1;ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();});const minorRoads=[[0,348,W0,348],[0,448,478,448],[53,0,53,H0],[198,0,198,H0],[378,0,378,498],[548,0,548,H0]];minorRoads.forEach(([x1,y1,x2,y2])=>{ctx.beginPath();ctx.strokeStyle='#d0d8cc';ctx.lineWidth=4;ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();});const streetNames=[{x:340,y:287,t:'MG Road'},{x:340,y:182,t:'Station Road'},{x:340,y:407,t:'College Road'},{x:112,y:198,t:'KHB Rd'},{x:472,y:198,t:'Camp Rd'},{x:282,y:198,t:'Market Rd'},{x:193,y:342,t:'Civil Lines Rd'},{x:490,y:342,t:'East Rd'}];ctx.font='8px DM Sans, sans-serif';ctx.fillStyle='#7a8f7a';streetNames.forEach(s=>{ctx.textAlign='center';ctx.fillText(s.t,s.x,s.y);});}
function drawRoutes(ctx,activeRoute){Object.entries(MAP_STOPS).forEach(([rk,stops])=>{const rc=ROUTE_CFG[rk];const visible=activeRoute==='ALL'||activeRoute===rk;ctx.globalAlpha=visible?1:0.1;ctx.beginPath();ctx.strokeStyle=rc.color;ctx.lineWidth=activeRoute===rk?5:3;ctx.lineJoin='round';ctx.lineCap='round';ctx.setLineDash([]);ctx.moveTo(stops[0].x,stops[0].y);stops.forEach(s=>ctx.lineTo(s.x,s.y));ctx.stroke();if(visible){stops.forEach((s,i)=>{const isTerm=i===0||i===stops.length-1;ctx.beginPath();ctx.arc(s.x,s.y,isTerm?6:4,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.strokeStyle=rc.color;ctx.lineWidth=isTerm?2.5:2;ctx.setLineDash([]);ctx.stroke();});if(activeRoute===rk){stops.forEach(s=>{ctx.font='bold 9px DM Sans, sans-serif';ctx.textAlign='center';const tw=ctx.measureText(s.name).width;ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.roundRect(s.x-tw/2-4,s.y-21,tw+8,13,2);ctx.fill();ctx.fillStyle='#202124';ctx.fillText(s.name,s.x,s.y-11);});}else if(activeRoute==='ALL'){const terminals=[stops[0],stops[stops.length-1]];terminals.forEach(s=>{ctx.font='bold 8px DM Sans, sans-serif';ctx.textAlign='center';const tw=ctx.measureText(s.name).width;ctx.fillStyle='rgba(255,255,255,.88)';ctx.beginPath();ctx.roundRect(s.x-tw/2-3,s.y-19,tw+6,12,2);ctx.fill();ctx.fillStyle='#333';ctx.fillText(s.name,s.x,s.y-10);});}}ctx.globalAlpha=1;});}
function drawBuses(ctx,busesRef,activeRoute,selectedBusId){busesRef.forEach(bus=>{if(activeRoute!=='ALL'&&bus.route!==activeRoute)return;const rc=ROUTE_CFG[bus.route];const stops=MAP_STOPS[bus.route];const{x,y}=ptOnPath(stops,bus.t);const isSel=selectedBusId===bus.id;const isIdle=bus.status==='idle';const isDelayed=bus.status==='delayed';const busColor=isIdle?'#9aa0a6':isDelayed?'#f9ab00':rc.color;if(isSel){ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.fillStyle=busColor+'26';ctx.fill();ctx.beginPath();ctx.arc(x,y,15,0,Math.PI*2);ctx.fillStyle=busColor+'44';ctx.fill();}ctx.beginPath();ctx.arc(x,y,isSel?13:10,0,Math.PI*2);ctx.fillStyle=busColor;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=isSel?3:2;ctx.setLineDash([]);ctx.stroke();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`bold ${isSel?9:8}px DM Sans, sans-serif`;ctx.fillText(bus.label,x,y);ctx.textBaseline='alphabetic';if(isDelayed){ctx.beginPath();ctx.arc(x+9,y-9,6,0,Math.PI*2);ctx.fillStyle='#ea4335';ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 8px DM Sans, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('!',x+9,y-9);ctx.textBaseline='alphabetic';}if(isSel||activeRoute===bus.route){ctx.font='500 9px DM Sans, sans-serif';ctx.textAlign='center';const tw=ctx.measureText(bus.id).width;ctx.fillStyle='rgba(255,255,255,.94)';ctx.strokeStyle=busColor+'70';ctx.lineWidth=0.5;ctx.beginPath();ctx.roundRect(x-tw/2-5,y+15,tw+10,13,3);ctx.fill();ctx.stroke();ctx.fillStyle='#202124';ctx.fillText(bus.id,x,y+24);}ctx.textAlign='left';});}

/* ─── NOTIFICATIONS DATA ─────────────────────────────────────────────── */
const INITIAL_NOTIFS = [
  {id:1,type:'err', icon:'!',title:'Bus E2 engine warning',       desc:'Driver A. Baig notified. Bus halted at Shahapur.',        time:'09:08 AM',read:false},
  {id:2,type:'warn',icon:'⚠',title:'Bus B3 delayed — 12 min',    desc:'Route B, stop 4. Heavy traffic near Rail Station.',       time:'09:14 AM',read:false},
  {id:3,type:'warn',icon:'⚠',title:'Route C traffic alert',       desc:'Heavy congestion near Main St. Expect 5–8 min delay.',   time:'08:55 AM',read:false},
  {id:4,type:'ok',  icon:'✓',title:'Bus A1 back on schedule',     desc:'Resumed normal route after earlier delay.',               time:'08:42 AM',read:true},
  {id:5,type:'info',icon:'i',title:'Driver R. Kumar checked in',  desc:'Checked in for morning shift. Bus KA-01-B assigned.',     time:'08:00 AM',read:true},
  {id:6,type:'ok',  icon:'✓',title:'Route A — all stops done',    desc:'Morning loop finished 2 min ahead of schedule.',         time:'07:38 AM',read:true},
];

/* ─── NOTIFICATIONS PAGE (student-style standalone page) ─────────────── */
function PageNotifications({ notifs, setNotifs }) {
  const unread = notifs.filter(n => !n.read).length;
  const markAll = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const markOne = (id) => setNotifs(prev => prev.map(x => x.id === id ? { ...x, read: true } : x));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Notifications</div>
          <div className="page-subtitle">{unread > 0 ? `${unread} unread alert${unread > 1 ? 's' : ''}` : 'All caught up'}</div>
        </div>
        {unread > 0 && (
          <button className="fab-btn fab-secondary" onClick={markAll}>✓ Mark all as read</button>
        )}
      </div>

      <div className="notif-page-card">
        <div className="notif-page-header">
          <div className="notif-page-title">
            <svg width="15" height="15" fill="none" stroke="var(--accent)" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            All Notifications
            {unread > 0 && <span className="notif-page-badge">{unread} new</span>}
          </div>
          {unread > 0 && (
            <button className="notif-mark-all" onClick={markAll}>Mark all as read</button>
          )}
        </div>

        <div className="notif-list-wrap">
          {notifs.length === 0 ? (
            <div className="notif-empty">
              <div className="notif-empty-icon">🔔</div>
              No notifications yet
            </div>
          ) : notifs.map(n => (
            <div
              key={n.id}
              className={`notif-row${n.read ? '' : ' unread'}`}
              onClick={() => markOne(n.id)}
            >
              <div className={`notif-icon-box ${n.type}`}>{n.icon}</div>
              <div className="notif-content">
                <div className="notif-title">{n.title}</div>
                <div className="notif-desc">{n.desc}</div>
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

/* ─── MODAL HELPERS ─────────────────────────────────────────────────── */
function AddStopList() {
  const [stops, setStops] = useState(["Main Gate", "Market Circle", "City Park"]);
  const [input, setInput] = useState("");
  const addStop = () => { const n = input.trim(); if (!n) return; setStops(s => [...s, n]); setInput(""); };
  const removeStop = (i) => setStops(s => s.filter((_, idx) => idx !== i));
  return (
    <>
      <div className="route-stop-list">
        {stops.map((s, i) => (
          <div className="stop-item" key={i}>
            <div className="stop-num">{i + 1}</div>
            <div className="stop-name-txt">{s}</div>
            <button className="remove-stop" onClick={() => removeStop(i)}>×</button>
          </div>
        ))}
      </div>
      <div className="add-stop-row">
        <input className="add-stop-input" placeholder="Add stop name..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addStop()} />
        <button className="add-stop-btn" onClick={addStop}>+ Add</button>
      </div>
    </>
  );
}


function ModalBus({ onClose, onSave, editData }) {
  const [busNumber, setBusNumber] = useState(editData?.busNumber || '');
  const [model, setModel]         = useState(editData?.model || '');
  const [capacity, setCapacity]   = useState(editData?.capacity || 50);
  const [status, setStatus]       = useState(editData?.status || 'active');
  // const [assignedDriver, setAssignedDriver] = useState(editData?.assignedDriver?._id || '');
  const [assignedRoute, setAssignedRoute]   = useState(editData?.assignedRoute?._id || '');
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes]   = useState([]);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

  // Fetch drivers and routes when modal opens
  useEffect(() => {
    getAdminDrivers().then(d => setDrivers(d.drivers || [])).catch(() => {});
    getRoutes().then(r => setRoutes(r.routes || [])).catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!busNumber || !capacity) {
      setError('Bus number and capacity are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        busNumber,
        model,
        capacity: Number(capacity),
        status,
        // assignedDriver: assignedDriver || null,
        assignedRoute:  assignedRoute  || null,
      };
      if (editData?._id) {
        await updateBus(editData._id, payload);
        onSave('Bus updated successfully!');
      } else {
        await createBus(payload);
        onSave('Bus saved successfully!');
      }
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>{editData ? 'Edit Bus' : 'Add Bus'}</h3>

      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #fcc', borderRadius: 8, padding: '8px 12px', fontSize: 12.5, color: '#c00', marginBottom: 12 }}>
          ⚠️ {error}
        </div>
      )}

      <div className="form-row2">
        <div className="form-row">
          <label className="form-label">Bus Number</label>
          <input className="form-input" placeholder="KA-XX-X" value={busNumber} onChange={e => setBusNumber(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="form-label">Model</label>
          <input className="form-input" placeholder="Tata Starbus" value={model} onChange={e => setModel(e.target.value)} />
        </div>
      </div>


      <div className="form-row">
        <label className="form-label">Assign Route</label>
        <select className="form-input" value={assignedRoute} onChange={e => setAssignedRoute(e.target.value)}>
          <option value="">— Select route —</option>
          {routes.map(r => (
            <option key={r._id} value={r._id}>{r.routeId} — {r.name}</option>
          ))}
        </select>
      </div>

      <div className="form-row2">
        <div className="form-row">
          <label className="form-label">Capacity</label>
          <input className="form-input" placeholder="50" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="form-label">Status</label>
          <select className="form-input" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="idle">Idle</option>
          </select>
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : editData ? 'Update Bus' : 'Save Bus'}
        </button>
      </div>
    </div>
  );
}


function ModalDriver({ onClose, onSave, editData }) {
  const [name, setName]             = useState(editData?.name || '');
  const [email, setEmail]           = useState(editData?.email || '');
  const [licenseNo, setLicenseNo]   = useState(editData?.licenseNo || '');
  const [experience, setExperience] = useState(editData?.experience || '');
  const [phone, setPhone]           = useState(editData?.phone || '');
  const [status, setStatus]         = useState(editData?.status || 'active');
  const [assignedBus, setAssignedBus]     = useState(editData?.assignedBus?._id || '');
  // const [assignedRoute, setAssignedRoute] = useState(editData?.assignedRoute?._id || '');
  const [buses, setBuses]   = useState([]);
  // const [routes, setRoutes] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  // Fetch buses and routes when modal opens
  useEffect(() => {
    getBuses().then(d => setBuses(d.buses || [])).catch(() => {});
  //   // getRoutes().then(r => setRoutes(r.routes || [])).catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        name,
        email,
        licenseNo,
        experience: Number(experience) || 0,
        phone,
        status,
        assignedBus:   assignedBus   || null,
        // assignedRoute: assignedRoute || null,
      };
      if (editData?._id) {
        await updateAdminDriver(editData._id, payload);
        onSave('Driver updated successfully!');
      } else {
        await createAdminDriver(payload);
        onSave('Driver saved successfully!');
      }
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>{editData ? 'Edit Driver' : 'Add Driver'}</h3>

      {error && (
        <div style={{
          background: '#fff0f0', border: '1px solid #fcc',
          borderRadius: 8, padding: '8px 12px',
          fontSize: 12.5, color: '#c00', marginBottom: 12
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className="form-row">
        <label className="form-label">Full Name</label>
        <input
          className="form-input"
          placeholder="Driver full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label className="form-label">Email</label>
        <input
          className="form-input"
          placeholder="driver@busnav.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="form-row2">
        <div className="form-row">
          <label className="form-label">License No.</label>
          <input
            className="form-input"
            placeholder="DL-XXXX-XXXX"
            value={licenseNo}
            onChange={e => setLicenseNo(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label className="form-label">Experience (yrs)</label>
          <input
            className="form-input"
            placeholder="5"
            type="number"
            value={experience}
            onChange={e => setExperience(e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Phone</label>
        <input
          className="form-input"
          placeholder="+91 9XXXXXXXXX"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label className="form-label">Assign Bus</label>
        <select
          className="form-input"
          value={assignedBus}
          onChange={e => setAssignedBus(e.target.value)}
        >
          <option value="">— Select bus —</option>
          {buses.map(b => (
            <option key={b._id} value={b._id}>
              {b.busNumber} {b.model ? `· ${b.model}` : ''}
            </option>
          ))}
        </select>
      </div>


      <div className="form-row">
        <label className="form-label">Status</label>
        <select
          className="form-input"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on_leave">On Leave</option>
        </select>
      </div>

      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : editData ? 'Update Driver' : 'Save Driver'}
        </button>
      </div>
    </div>
  );
}


function ModalRoute({ onClose, onSave, editData }) {
  const [routeId, setRouteId]       = useState(editData?.routeId || '');
  const [name, setName]             = useState(editData?.name || '');
  const [description, setDescription] = useState(editData?.description || '');
  const [stops, setStops]           = useState(editData?.stops?.map(s => s.name) || []);
  const [stopInput, setStopInput]   = useState('');
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');

  const addStop = () => {
    const s = stopInput.trim();
    if (!s) return;
    setStops(prev => [...prev, s]);
    setStopInput('');
  };
  const removeStop = (i) => setStops(prev => prev.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    if (!routeId || !name) {
      setError('Route ID and name are required.');
      return;
    }
    setSaving(true);
    setError('');
    const stopsData = stops.map((s, i) => ({ name: s, order: i + 1 }));
    try {
      if (editData?._id) {
        await updateRoute(editData._id, { routeId, name, description, stops: stopsData });
        onSave('Route updated successfully!');
      } else {
        await createRoute({ routeId, name, description, stops: stopsData });
        onSave('Route created successfully!');
      }
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>{editData ? 'Edit Route' : 'Create Route'}</h3>

      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #fcc', borderRadius: 8, padding: '8px 12px', fontSize: 12.5, color: '#c00', marginBottom: 12 }}>
          ⚠️ {error}
        </div>
      )}

      <div className="form-row2">
        <div className="form-row">
          <label className="form-label">Route ID</label>
          <input className="form-input" placeholder="e.g. A" value={routeId} onChange={e => setRouteId(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="form-label">Route Name</label>
          <input className="form-input" placeholder="North Loop" value={name} onChange={e => setName(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <label className="form-label">Description</label>
        <input className="form-input" placeholder="Short description..." value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div className="form-section-title">Stops</div>
      <div className="route-stop-list">
        {stops.map((s, i) => (
          <div className="stop-item" key={i}>
            <div className="stop-num">{i + 1}</div>
            <div className="stop-name-txt">{s}</div>
            <button className="remove-stop" onClick={() => removeStop(i)}>×</button>
          </div>
        ))}
      </div>
      <div className="add-stop-row">
        <input
          className="add-stop-input"
          placeholder="Add stop name..."
          value={stopInput}
          onChange={e => setStopInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addStop()}
        />
        <button className="add-stop-btn" onClick={addStop}>+ Add</button>
      </div>

      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : editData ? 'Update Route' : 'Create Route'}
        </button>
      </div>
    </div>
  );
}



// function ModalStudent({ onClose, onSave, editData }) {
//   const [name, setName]                   = useState(editData?.name || '');
//   const [email, setEmail]                 = useState(editData?.email || '');
//   const [rollNo, setRollNo]               = useState(editData?.rollNo || '');
//   const [className, setClassName]         = useState(editData?.className || '');
//   const [route, setRoute]                 = useState(editData?.assignedRoute?._id || '');
//   const [pickupStop, setPickupStop]       = useState(editData?.pickupStop || '');
//   const [parentContact, setParentContact] = useState(editData?.parentContact || '');
//   const [status, setStatus]               = useState(editData?.status || 'active');
//   const [routes, setRoutes]               = useState([]);
//   const [stops, setStops]                 = useState([]);
//   const [saving, setSaving]               = useState(false);
//   const [error, setError]                 = useState('');

//   // Fetch routes when modal opens
//   useEffect(() => {
//     getRoutes().then(r => setRoutes(r.routes || [])).catch(() => {});
//   }, []);

//   // When route changes, load its stops
//   useEffect(() => {
//     if (!route) { setStops([]); return; }
//     const selected = routes.find(r => r._id === route);
//     setStops(selected?.stops || []);
//   }, [route, routes]);

//   const handleSave = async () => {
//     if (!name || !email || !rollNo) {
//       setError('Name, email and roll number are required.');
//       return;
//     }
//     setSaving(true);
//     setError('');
//     try {
//       const payload = {
//         name,
//         email,
//         rollNo,
//         className,
//         assignedRoute:  route         || null,
//         pickupStop,
//         parentContact,
//         status,
//       };
//       if (editData?._id) {
//         await updateAdminStudent(editData._id, payload);
//         onSave('Student updated successfully!');
//       } else {
//         await createAdminStudent(payload);
//         onSave('Student added successfully!');
//       }
//     } catch (err) {
//       setError(err.message);
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="modal">
//       <button className="close-btn" onClick={onClose}>×</button>
//       <h3>{editData ? 'Edit Student' : 'Add Student'}</h3>

//       {error && (
//         <div style={{
//           background: '#fff0f0', border: '1px solid #fcc',
//           borderRadius: 8, padding: '8px 12px',
//           fontSize: 12.5, color: '#c00', marginBottom: 12
//         }}>
//           ⚠️ {error}
//         </div>
//       )}

//       <div className="form-row">
//         <label className="form-label">Full Name</label>
//         <input
//           className="form-input"
//           placeholder="Student full name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />
//       </div>

//       <div className="form-row">
//         <label className="form-label">Email</label>
//         <input
//           className="form-input"
//           placeholder="student@college.edu"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//         />
//       </div>

//       <div className="form-row2">
//         <div className="form-row">
//           <label className="form-label">Roll No.</label>
//           <input
//             className="form-input"
//             placeholder="2024-XXX"
//             value={rollNo}
//             onChange={e => setRollNo(e.target.value)}
//           />
//         </div>
//         <div className="form-row">
//           <label className="form-label">Class / Section</label>
//           <input
//             className="form-input"
//             placeholder="10-A"
//             value={className}
//             onChange={e => setClassName(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="form-row">
//         <label className="form-label">Assign Route</label>
//         <select
//           className="form-input"
//           value={route}
//           onChange={e => setRoute(e.target.value)}
//         >
//           <option value="">— Select route —</option>
//           {routes.map(r => (
//             <option key={r._id} value={r._id}>
//               {r.routeId} — {r.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="form-row">
//         <label className="form-label">Pickup Stop</label>
//         {stops.length > 0 ? (
//           <select
//             className="form-input"
//             value={pickupStop}
//             onChange={e => setPickupStop(e.target.value)}
//           >
//             <option value="">— Select stop —</option>
//             {stops.map((s, i) => (
//               <option key={i} value={s.name}>{s.name}</option>
//             ))}
//           </select>
//         ) : (
//           <input
//             className="form-input"
//             placeholder="Select a route first or type stop name"
//             value={pickupStop}
//             onChange={e => setPickupStop(e.target.value)}
//           />
//         )}
//       </div>

//       <div className="form-row">
//         <label className="form-label">Parent Contact</label>
//         <input
//           className="form-input"
//           placeholder="+91 9XXXXXXXXX"
//           value={parentContact}
//           onChange={e => setParentContact(e.target.value)}
//         />
//       </div>

//       <div className="form-row">
//         <label className="form-label">Status</label>
//         <select
//           className="form-input"
//           value={status}
//           onChange={e => setStatus(e.target.value)}
//         >
//           <option value="active">Active</option>
//           <option value="pending">Pending</option>
//           <option value="inactive">Inactive</option>
//         </select>
//       </div>

//       <div className="modal-actions">
//         <button className="btn-cancel" onClick={onClose}>Cancel</button>
//         <button className="btn-save" onClick={handleSave} disabled={saving}>
//           {saving ? 'Saving...' : editData ? 'Update Student' : 'Save Student'}
//         </button>
//       </div>
//     </div>
//   );
// }
function ModalStudent({ onClose, onSave, editData }) {
  const [name, setName]                   = useState(editData?.name || '');
  const [email, setEmail]                 = useState(editData?.email || '');
  const [rollNo, setRollNo]               = useState(editData?.rollNo || '');
  const [className, setClassName]         = useState(editData?.className || '');
  const [route, setRoute]                 = useState(editData?.assignedRoute?._id || '');
  const [pickupStop, setPickupStop]       = useState(editData?.pickupStop || '');
  const [parentContact, setParentContact] = useState(editData?.parentContact || '');
  const [status, setStatus]               = useState(editData?.status || 'active');

  // ── NEW FIELDS ──
  const [tripType, setTripType]           = useState(editData?.tripType || 'both');        // morning | evening | both
  const [morningPickupTime, setMorningPickupTime] = useState(editData?.morningPickupTime || '');
  const [eveningPickupTime, setEveningPickupTime] = useState(editData?.eveningPickupTime || '');

  const [routes, setRoutes]   = useState([]);
  const [stops, setStops]     = useState([]);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    getRoutes().then(r => setRoutes(r.routes || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (!route) { setStops([]); return; }
    const selected = routes.find(r => r._id === route);
    setStops(selected?.stops || []);
  }, [route, routes]);

  const handleSave = async () => {
    if (!name || !email || !rollNo) {
      setError('Name, email and roll number are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        name,
        email,
        rollNo,
        className,
        assignedRoute:  route || null,
        pickupStop,
        parentContact,
        status,
        // ── NEW ──
        tripType,
        morningPickupTime: (tripType === 'morning' || tripType === 'both') ? morningPickupTime : '',
        eveningPickupTime: (tripType === 'evening' || tripType === 'both') ? eveningPickupTime : '',
      };
      if (editData?._id) {
        await updateAdminStudent(editData._id, payload);
        onSave('Student updated successfully!');
      } else {
        await createAdminStudent(payload);
        onSave('Student added successfully!');
      }
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const showMorning = tripType === 'morning' || tripType === 'both';
  const showEvening = tripType === 'evening' || tripType === 'both';

  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>{editData ? 'Edit Student' : 'Add Student'}</h3>

      {error && (
        <div style={{
          background: '#fff0f0', border: '1px solid #fcc',
          borderRadius: 8, padding: '8px 12px',
          fontSize: 12.5, color: '#c00', marginBottom: 12
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* ── existing fields unchanged ── */}
      <div className="form-row">
        <label className="form-label">Full Name</label>
        <input className="form-input" placeholder="Student full name" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className="form-row">
        <label className="form-label">Email</label>
        <input className="form-input" placeholder="student@college.edu" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="form-row2">
        <div className="form-row">
          <label className="form-label">Roll No.</label>
          <input className="form-input" placeholder="2024-XXX" value={rollNo} onChange={e => setRollNo(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="form-label">Class / Section</label>
          <input className="form-input" placeholder="10-A" value={className} onChange={e => setClassName(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Assign Route</label>
        <select className="form-input" value={route} onChange={e => setRoute(e.target.value)}>
          <option value="">— Select route —</option>
          {routes.map(r => (
            <option key={r._id} value={r._id}>{r.routeId} — {r.name}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label className="form-label">Pickup Stop</label>
        {stops.length > 0 ? (
          <select className="form-input" value={pickupStop} onChange={e => setPickupStop(e.target.value)}>
            <option value="">— Select stop —</option>
            {stops.map((s, i) => (
              <option key={i} value={s.name}>{s.name}</option>
            ))}
          </select>
        ) : (
          <input className="form-input" placeholder="Select a route first or type stop name" value={pickupStop} onChange={e => setPickupStop(e.target.value)} />
        )}
      </div>

      {/* ── NEW: Trip Type ── */}
      <div className="form-section-title" style={{ marginTop: 6 }}>Trip Schedule</div>

      <div className="form-row">
        <label className="form-label">Trip Type</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { val: 'morning', label: '🌅 Morning only' },
            { val: 'evening', label: '🌆 Evening only' },
            { val: 'both',    label: '🔄 Both' },
          ].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => setTripType(opt.val)}
              style={{
                flex: 1,
                padding: '9px 6px',
                borderRadius: 9,
                border: `1.5px solid ${tripType === opt.val ? 'var(--accent)' : 'var(--border)'}`,
                background: tripType === opt.val ? 'rgba(245,166,35,.1)' : '#f8fafc',
                color: tripType === opt.val ? 'var(--accent2)' : 'var(--muted)',
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 12,
                fontWeight: tripType === opt.val ? 700 : 500,
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Morning stop + time ── */}
      {showMorning && (
        <div style={{
          background: 'rgba(245,166,35,.05)',
          border: '1px solid rgba(245,166,35,.2)',
          borderRadius: 10,
          padding: '12px 14px',
          marginBottom: 12,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent2)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 10 }}>
            🌅 Morning Trip
          </div>
          <div className="form-row2">
            <div className="form-row" style={{ marginBottom: 0 }}>
              <label className="form-label">Pickup Stop</label>
              {stops.length > 0 ? (
                <select className="form-input" value={pickupStop} onChange={e => setPickupStop(e.target.value)}>
                  <option value="">— Select stop —</option>
                  {stops.map((s, i) => (
                    <option key={i} value={s.name}>{s.name}</option>
                  ))}
                </select>
              ) : (
                <input className="form-input" placeholder="Stop name" value={pickupStop} onChange={e => setPickupStop(e.target.value)} />
              )}
            </div>
            <div className="form-row" style={{ marginBottom: 0 }}>
              <label className="form-label">Pickup Time</label>
              <input
                className="form-input"
                type="time"
                value={morningPickupTime}
                onChange={e => setMorningPickupTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Evening stop + time ── */}
      {showEvening && (
        <div style={{
          background: 'rgba(59,139,212,.05)',
          border: '1px solid rgba(59,139,212,.2)',
          borderRadius: 10,
          padding: '12px 14px',
          marginBottom: 12,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue2)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 10 }}>
            🌆 Evening Trip
          </div>
          <div className="form-row2">
            <div className="form-row" style={{ marginBottom: 0 }}>
              <label className="form-label">Drop-off Stop</label>
              {stops.length > 0 ? (
                <select className="form-input" value={pickupStop} onChange={e => setPickupStop(e.target.value)}>
                  <option value="">— Select stop —</option>
                  {stops.map((s, i) => (
                    <option key={i} value={s.name}>{s.name}</option>
                  ))}
                </select>
              ) : (
                <input className="form-input" placeholder="Stop name" value={pickupStop} onChange={e => setPickupStop(e.target.value)} />
              )}
            </div>
            <div className="form-row" style={{ marginBottom: 0 }}>
              <label className="form-label">Drop-off Time</label>
              <input
                className="form-input"
                type="time"
                value={eveningPickupTime}
                onChange={e => setEveningPickupTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="form-row">
        <label className="form-label">Parent Contact</label>
        <input className="form-input" placeholder="+91 9XXXXXXXXX" value={parentContact} onChange={e => setParentContact(e.target.value)} />
      </div>

      <div className="form-row">
        <label className="form-label">Status</label>
        <select className="form-input" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : editData ? 'Update Student' : 'Save Student'}
        </button>
      </div>
    </div>
  );
}

/* ─── PAGES ─────────────────────────────────────────────────────────── */

// function PageDashboard({ showModal, unreadCount, onBellClick, onNavigate }) {
//   // const [buses, setBuses] = useState([]);
// //   useEffect(() => {
// //   fetch("http://localhost:8000/api/admin/buses")
// //     .then((res) => res.json())
// //     .then((data) => setBuses(data.buses))
// //     .catch((err) => console.error(err));
// // }, []);
//   //const [activePill, setActivePill] = useState("All");
//   //const pills = ["All", "Route A", "Route B", "Route C"];
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <div className="page-title">Dashboard</div>
//           <div className="page-subtitle">{getGreeting()} — {getDateString()}</div>
//         </div>
         
//       </div>
//       <div className="stat-grid">
//         <div className="stat-card s-green"><div className="stat-label">Active Buses</div><div className="stat-val green">18</div><div className="stat-sub"><span className="stat-trend up">+2</span> vs yesterday</div></div>
//         <div className="stat-card s-amber"><div className="stat-label">Delayed Buses</div><div className="stat-val amber">3</div><div className="stat-sub"><span className="stat-trend down">▲ 1</span> alert active</div></div>
//         <div className="stat-card s-blue"><div className="stat-label">Drivers on Duty</div><div className="stat-val blue">21</div><div className="stat-sub"><span className="stat-trend up">100%</span> assigned</div></div>
//         <div className="stat-card s-purple"><div className="stat-label">Students Today</div><div className="stat-val purple">1,248</div><div className="stat-sub"><span className="stat-trend up">+34</span> this week</div></div>
//       </div>
//       <div className="map-card">
//         <div className="card-header">
//           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
//           <span className="card-title">Live Map</span>
//           <span className="card-sub">— all buses</span>
//         </div>
//         <div style={{
//           padding: '28px 24px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           gap: 20,
//         }}>
//           <div>
//             <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 5 }}>
//               Real-time bus tracking
//             </div>
//             <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
//               Monitor all active buses, routes, and live locations across the fleet.
//             </div>
//             <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
//                 <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
//                 <span style={{ color: 'var(--muted)' }}>On time (18)</span>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
//                 <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
//                 <span style={{ color: 'var(--muted)' }}>Delayed (3)</span>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
//                 <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3a4a60' }} />
//                 <span style={{ color: 'var(--muted)' }}>Idle (2)</span>
//               </div>
//             </div>
//           </div>
//           <button
//             //onClick={() => showModal === undefined ? null : setActivePage('tracking')}
//             onClick={() => onNavigate('tracking')}
//             style={{
//               background: 'var(--accent)',
//               color: '#1a1a1a',
//               border: 'none',
//               borderRadius: 10,
//               padding: '13px 32px',
//               fontSize: 14,
//               fontWeight: 700,
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               gap: 8,
//               fontFamily: "'DM Sans',sans-serif",
//               whiteSpace: 'nowrap',
//               flexShrink: 0,
//               transition: 'all .15s',
//               boxShadow: '0 4px 14px rgba(245,166,35,.35)',
//             }}
//             onMouseEnter={e => e.currentTarget.style.background = 'var(--accent2)'}
//             onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
//           >
//             📍 Track Live
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

function PageDashboard({ showModal, unreadCount, onBellClick, onNavigate }) {
  const [stats, setStats] = useState({
    activeBuses: 0,
    delayedBuses: 0,
    idleBuses: 0,
    driversOnDuty: 0,
    totalDrivers: 0,
    studentsTotal: 0,
    studentsActive: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        const [busData, driverData, studentData] = await Promise.all([
          getBuses(),
          getAdminDrivers(),
          getAdminStudents(),
        ]);

        const buses   = busData.buses     || [];
        const drivers = driverData.drivers || [];
        const students = studentData.students || [];

        const activeBuses  = buses.filter(b => b.status === 'active').length;
        const idleBuses    = buses.filter(b => b.status === 'idle').length;
        // "Delayed" buses = buses whose assigned driver is on_leave or inactive
        // Since trips are real-time, we derive delayed from non-active non-idle
        const delayedBuses = buses.filter(
          b => b.status !== 'active' && b.status !== 'idle'
        ).length;

        const driversOnDuty = drivers.filter(d => d.status === 'active').length;

        const studentsActive = students.filter(s => s.status === 'active').length;

        setStats({
          activeBuses,
          delayedBuses,
          idleBuses,
          driversOnDuty,
          totalDrivers: drivers.length,
          studentsTotal: students.length,
          studentsActive,
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const driverPct = stats.totalDrivers > 0
    ? Math.round((stats.driversOnDuty / stats.totalDrivers) * 100)
    : 0;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-subtitle">{getGreeting()} — {getDateString()}</div>
        </div>
      </div>

      <div className="stat-grid">
        {/* Active Buses */}
        <div className="stat-card s-green">
          <div className="stat-label">Active Buses</div>
          <div className="stat-val green">
            {loading ? '—' : stats.activeBuses}
          </div>
          <div className="stat-sub">
            <span className="stat-trend up">
              {loading ? '—' : stats.idleBuses}
            </span>
            idle in fleet
          </div>
        </div>

        {/* Delayed / Maintenance Buses */}
        <div className="stat-card s-amber">
          <div className="stat-label">Delayed Buses</div>
          <div className="stat-val amber">
            {loading ? '—' : stats.delayedBuses}
          </div>
          <div className="stat-sub">
            <span className="stat-trend down">
              {loading ? '—' : `▲ ${stats.delayedBuses}`}
            </span>
            {stats.delayedBuses === 1 ? 'alert' : 'alerts'} active
          </div>
        </div>

        {/* Drivers on Duty */}
        <div className="stat-card s-blue">
          <div className="stat-label">Drivers on Duty</div>
          <div className="stat-val blue">
            {loading ? '—' : stats.driversOnDuty}
          </div>
          <div className="stat-sub">
            <span className="stat-trend up">
              {loading ? '—' : `${driverPct}%`}
            </span>
            assigned
          </div>
        </div>

        {/* Students */}
        <div className="stat-card s-purple">
          <div className="stat-label">Students Enrolled</div>
          <div className="stat-val purple">
            {loading ? '—' : stats.studentsTotal.toLocaleString()}
          </div>
          <div className="stat-sub">
            <span className="stat-trend up">
              {loading ? '—' : stats.studentsActive}
            </span>
            active
          </div>
        </div>
      </div>

      {/* Live Map card — unchanged */}
      <div className="map-card">
        <div className="card-header">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="var(--accent)" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
          </svg>
          <span className="card-title">Live Map</span>
          <span className="card-sub">— all buses</span>
        </div>
        <div style={{
          padding: '28px 24px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 20,
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 5 }}>
              Real-time bus tracking
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
              Monitor all active buses, routes, and live locations across the fleet.
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }}/>
                <span style={{ color: 'var(--muted)' }}>
                  Active ({loading ? '…' : stats.activeBuses})
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }}/>
                <span style={{ color: 'var(--muted)' }}>
                  Delayed ({loading ? '…' : stats.delayedBuses})
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3a4a60' }}/>
                <span style={{ color: 'var(--muted)' }}>
                  Idle ({loading ? '…' : stats.idleBuses})
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('tracking')}
            style={{
              background: 'var(--accent)', color: '#1a1a1a',
              border: 'none', borderRadius: 10,
              padding: '13px 32px', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              gap: 8, fontFamily: "'DM Sans',sans-serif",
              whiteSpace: 'nowrap', flexShrink: 0, transition: 'all .15s',
              boxShadow: '0 4px 14px rgba(245,166,35,.35)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            📍 Track Live
          </button>
        </div>
      </div>
    </div>
  );
}

// Bus icon for admin map
const makeBusIcon = (color) => L.divIcon({
  html: `<div style="
    background:${color};
    width:40px;height:40px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:20px;border:3px solid #fff;
    box-shadow:0 2px 10px rgba(0,0,0,.35);
  ">🚌</div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const ROUTE_COLORS = {
  A: '#1a73e8',
  B: '#0f9d58',
  C: '#f9ab00',
  D: '#9334e6',
};

// function PageTracking({ showToast }) {
//   const canvasRef = useRef(null);
//   const busesRef = useRef(INITIAL_BUSES.map(b => ({ ...b })));
//   const rafRef = useRef(null);
//   const panRef = useRef({ x: 0, y: 0 });
//   const dragRef = useRef({ active: false, sx: 0, sy: 0 });
//   const zoomRef = useRef(1);
//   const W0 = 680, H0 = 560;
//   const [activeRoute, setActiveRoute] = useState('ALL');
//   const [selectedBus, setSelectedBus] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const activeRouteRef = useRef('ALL');
//   const selectedBusRef = useRef(null);
//   const redraw = useCallback(() => {
//     const cv = canvasRef.current; if (!cv) return;
//     const ctx = cv.getContext('2d');
//     const dpr = window.devicePixelRatio || 1;
//     const cw = cv.width / dpr, ch = cv.height / dpr;
//     ctx.clearRect(0, 0, cv.width, cv.height);
//     ctx.save(); ctx.scale(dpr, dpr);
//     const cx = cw / 2, cy = ch / 2;
//     const z = zoomRef.current; const pan = panRef.current;
//     ctx.save();
//     ctx.translate(cx + pan.x, cy + pan.y); ctx.scale(z, z); ctx.translate(-W0 / 2, -H0 / 2);
//     drawMapFrame(ctx, W0, H0); drawRoutes(ctx, activeRouteRef.current); drawBuses(ctx, busesRef.current, activeRouteRef.current, selectedBusRef.current);
//     ctx.restore(); ctx.restore();
//   }, []);
//   useEffect(() => {
//     const cv = canvasRef.current; if (!cv) return;
//     const resize = () => { const dpr = window.devicePixelRatio || 1; const rect = cv.parentElement.getBoundingClientRect(); cv.width = rect.width * dpr; cv.height = rect.height * dpr; cv.style.width = rect.width + 'px'; cv.style.height = rect.height + 'px'; };
//     resize(); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize);
//   }, []);
//   useEffect(() => {
//     const tick = () => { busesRef.current.forEach(b => { if (b.status === 'idle') return; b.t += b.speed; if (b.t >= 1) b.t = 0; }); redraw(); rafRef.current = requestAnimationFrame(tick); };
//     rafRef.current = requestAnimationFrame(tick); return () => cancelAnimationFrame(rafRef.current);
//   }, [redraw]);
//   const doZoom = (f) => { zoomRef.current = Math.min(3, Math.max(0.4, zoomRef.current * f)); };
//   const handleCanvasClick = (e) => {
//     if (dragRef.current.moved) return;
//     const cv = canvasRef.current; const rect = cv.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
//     const mx = e.clientX - rect.left; const my = e.clientY - rect.top;
//     const cw = cv.width / dpr, ch = cv.height / dpr; const z = zoomRef.current; const pan = panRef.current;
//     const wx = (mx - cw / 2 - pan.x) / z + W0 / 2; const wy = (my - ch / 2 - pan.y) / z + H0 / 2;
//     let hit = null, minD = 16;
//     busesRef.current.forEach(bus => { if (activeRouteRef.current !== 'ALL' && bus.route !== activeRouteRef.current) return; const stops = MAP_STOPS[bus.route]; const { x, y } = ptOnPath(stops, bus.t); const d = Math.hypot(wx - x, wy - y); if (d < minD) { minD = d; hit = bus; } });
//     if (hit) { selectedBusRef.current = hit.id; setSelectedBus(hit.id); } else { selectedBusRef.current = null; setSelectedBus(null); }
//   };
//   const handleMouseDown = (e) => { dragRef.current = { active: true, moved: false, sx: e.clientX - panRef.current.x, sy: e.clientY - panRef.current.y }; };
//   const handleMouseMove = (e) => { if (!dragRef.current.active) return; dragRef.current.moved = true; panRef.current = { x: e.clientX - dragRef.current.sx, y: e.clientY - dragRef.current.sy }; };
//   const handleMouseUp = () => { dragRef.current.active = false; };
//   const handleWheel = (e) => { e.preventDefault(); doZoom(e.deltaY < 0 ? 1.12 : 0.9); };
//   const selectRoute = (r) => { activeRouteRef.current = r; setActiveRoute(r); selectedBusRef.current = null; setSelectedBus(null); };
//   const selectBus = (busId) => { selectedBusRef.current = busId; setSelectedBus(busId); };
//   const closePanel = () => { selectedBusRef.current = null; setSelectedBus(null); };
//   const selBusData = busesRef.current.find(b => b.id === selectedBus) || null;
//   const getNextStop = (bus) => { const stops = MAP_STOPS[bus.route]; const n = stops.length - 1; const seg = Math.min(Math.floor(bus.t * n) + 1, n); return stops[seg].name; };
//   const getCurrentArea = (bus) => { const stops = MAP_STOPS[bus.route]; const n = stops.length - 1; return stops[Math.min(Math.floor(bus.t * n), n)].name; };
//   const getETA = (bus) => { if (bus.status === 'idle') return '—'; const stops = MAP_STOPS[bus.route]; const n = stops.length - 1; const seg = Math.floor(bus.t * n); const rem = (seg + 1) / n - bus.t; return Math.max(1, Math.round(rem * n / (bus.speed * 3600 * 0.016))) + ' min'; };
//   const routeChips = [{ r: 'ALL', label: 'All routes', color: '#1a73e8', dot: '#1a73e8' },{ r: 'A', label: 'Route A', color: '#1a73e8', dot: '#1a73e8' },{ r: 'B', label: 'Route B', color: '#0f9d58', dot: '#0f9d58' },{ r: 'C', label: 'Route C', color: '#f9ab00', dot: '#f9ab00' },{ r: 'D', label: 'Route D', color: '#9334e6', dot: '#9334e6' }];
//   const statusCls = s => s === 'on-time' ? 'bcs-green' : s === 'delayed' ? 'bcs-amber' : s === 'idle' ? 'bcs-gray' : 'bcs-red';
//   const statusText = s => s === 'on-time' ? 'On time' : s === 'delayed' ? 'Delayed' : 'Idle';
//   const visibleBuses = busesRef.current.filter(b => { if (activeRoute !== 'ALL' && b.route !== activeRoute) return false; const q = searchQuery.toLowerCase(); if (q && !b.id.toLowerCase().includes(q) && !b.driver.toLowerCase().includes(q) && !b.route.toLowerCase().includes(q)) return false; return true; });
//   const progKeyStops = (bus) => { const stops = MAP_STOPS[bus.route]; const n = stops.length; const indices = [0, Math.floor(n / 3), Math.floor(2 * n / 3), n - 1]; const curSeg = Math.min(Math.floor(bus.t * (n - 1)), n - 2); return indices.map(i => ({ name: stops[i].name, done: i <= curSeg, cur: i === curSeg || i === curSeg + 1 })); };
//   return (
//     <div className="tracking-page">
//       <div className="gm-canvas-wrap" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} onClick={handleCanvasClick}>
//         <canvas className="gm-canvas" ref={canvasRef} />
//       </div>
//       <div className="tracking-topbar">
//         <div className="gm-searchbox">
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//           <input placeholder="Search bus, driver or route…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
//         </div>
//         <div className="route-chips">
//           {routeChips.map(chip => (
//             <button key={chip.r} className={`rchip${activeRoute === chip.r ? ' active' : ''}`}
//               style={activeRoute === chip.r ? { background: chip.color, color: '#fff' } : {}}
//               onClick={() => selectRoute(chip.r)}>
//               <span className="rdot" style={{ background: activeRoute === chip.r ? '#fff' : chip.dot }} />
//               {chip.label}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="live-badge-float"><div className="live-anim-dot" /> Live updates</div>
//       <div className={`bus-info-panel${selBusData ? '' : ' hidden'}`}>
//         {selBusData && (() => {
//           const rc = ROUTE_CFG[selBusData.route];
//           const pct = Math.round(selBusData.passengers / selBusData.capacity * 100);
//           const progPct = Math.round(selBusData.t * 100);
//           const nodes = progKeyStops(selBusData);
//           return (
//             <>
//               <div className="bip-header">
//                 <div className="bip-avatar" style={{ background: selBusData.status === 'idle' ? '#9aa0a6' : rc.color }}>{selBusData.label}</div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <div className="bip-busid">{selBusData.id}</div>
//                     <span className={`bcard-spill ${statusCls(selBusData.status)}`}>{selBusData.status === 'delayed' ? `+${selBusData.delay}m` : statusText(selBusData.status)}</span>
//                   </div>
//                   <div className="bip-routename">{rc.label}</div>
//                 </div>
//                 <button className="bip-close" onClick={closePanel}>×</button>
//               </div>
//               <div className="bip-body">
//                 <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg><span className="bip-key">Near</span><span className="bip-val">{getCurrentArea(selBusData)}</span></div>
//                 <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg><span className="bip-key">Next stop</span><span className="bip-val" style={{ color: rc.color }}>{getNextStop(selBusData)}</span></div>
//                 <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span className="bip-key">ETA next stop</span><span className="bip-val">{getETA(selBusData)}</span></div>
//                 <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span className="bip-key">Driver</span><span className="bip-val">{selBusData.driver}</span></div>
//                 <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg><span className="bip-key">Passengers</span><span className="bip-val">{selBusData.passengers}/{selBusData.capacity} ({pct}%)</span></div>
//                 <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg><span className="bip-key">Speed</span><span className="bip-val">{selBusData.status === 'idle' ? '0 km/h' : `${Math.round(28 + (selBusData.t * 100) % 15)} km/h`}</span></div>
//               </div>
//               <div className="bip-progress">
//                 <div className="bip-prog-lbl">Route progress — {progPct}%</div>
//                 <div className="bip-prog-track"><div className="bip-prog-fill" style={{ width: `${progPct}%`, background: rc.color }} /></div>
//                 <div className="bip-stops-row">
//                   {nodes.map((n, i) => (
//                     <div className="bip-stop-node" key={i}>
//                       <div className={`bip-stop-dot${n.done ? ' done' : ''}${n.cur ? ' current' : ''}`} />
//                       <div className={`bip-stop-label${n.done ? ' done-lbl' : ''}`} style={n.done ? { color: rc.color } : {}}>{n.name}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           );
//         })()}
//       </div>
//       <div className="gm-zoom-ctrl">
//         <button className="gm-zoom-btn" onClick={() => doZoom(1.25)}>+</button>
//         <button className="gm-zoom-btn" onClick={() => doZoom(0.8)}>−</button>
//       </div>
//       <div className="gm-compass">N</div>
//       <div className="gm-attribution">Map data © BusNav 2026</div>
//       <div className="bus-cards-bar">
//         <div className="bcs-scroll">
//           {visibleBuses.map(bus => {
//             const rc = ROUTE_CFG[bus.route];
//             return (
//               <div key={bus.id} className={`bcard${selectedBus === bus.id ? ' sel' : ''}`} onClick={() => selectBus(bus.id)}>
//                 <div className="bcard-top">
//                   <div className="bcard-av" style={{ background: bus.status === 'idle' ? '#9aa0a6' : rc.color }}>{bus.label}</div>
//                   <div style={{ flex: 1 }}><div className="bcard-num">{bus.id}</div><div className="bcard-route">{rc.short}</div></div>
//                   <span className={`bcard-spill ${statusCls(bus.status)}`}>{bus.status === 'delayed' ? `+${bus.delay}m` : statusText(bus.status)}</span>
//                 </div>
//                 <div className="bcard-info">
//                   <span style={{ color: '#5f6368' }}>Near: </span><b>{getCurrentArea(bus)}</b><br />
//                   <span style={{ color: '#5f6368' }}>Next: </span><span className="hl" style={{ color: rc.color }}>{getNextStop(bus)}</span>
//                   <span style={{ color: '#9aa0a6' }}> · {getETA(bus)}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }



// function PageTracking({ showToast }) {
//   const [liveBuses, setLiveBuses]     = useState({});
//   const [selectedBus, setSelectedBus] = useState(null);
//   const [activeRoute, setActiveRoute] = useState('ALL');
//   const socketRef = useRef(null);



//   const defaultCenter = [15.8497, 74.4977];

//   useEffect(() => {
//     socketRef.current = io('http://localhost:8000');

//     // Get current live buses
//     socketRef.current.emit('get:live:buses');
//     socketRef.current.on('live:buses', (buses) => {
//       setLiveBuses(buses);
//     });

//     // Real-time location update
//     socketRef.current.on('admin:bus:update',
//       ({ busId, lat, lng, speed, busNumber }) => {
//         setLiveBuses(prev => ({
//           ...prev,
//           [busId]: { ...prev[busId], lat, lng, speed, busNumber },
//         }));
//       }
//     );

//     // Trip started
//     socketRef.current.on('admin:trip:started',
//       ({ busId, routeId, busNumber }) => {
//         setLiveBuses(prev => ({
//           ...prev,
//           [busId]: { ...prev[busId], status: 'live', routeId, busNumber },
//         }));
//       }
//     );

//     // Trip ended
//     socketRef.current.on('admin:trip:ended', ({ busId }) => {
//       setLiveBuses(prev => {
//         const updated = { ...prev };
//         delete updated[busId];
//         return updated;
//       });
//       if (selectedBus?.id === busId) setSelectedBus(null);
//     });

//     return () => socketRef.current?.disconnect();
//   }, []);

//   const liveBusArray = Object.entries(liveBuses)
//     .map(([id, data]) => ({ id, ...data }))
//     .filter(b => activeRoute === 'ALL' || b.routeId === activeRoute);

//   return (
//     <div style={{
//       display: 'flex', flexDirection: 'column',
//       height: 'calc(100vh - 58px)', overflow: 'hidden',
//     }}>

//       {/* Top bar */}
//       <div style={{
//         padding: '10px 16px', background: '#fff',
//         borderBottom: '1px solid var(--border)',
//         display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap',
//       }}>
//         <span style={{ fontWeight: 700, fontSize: 14 }}>Live Tracking</span>
//         <span style={{ fontSize: 12, color: 'var(--muted)' }}>
//           {liveBusArray.length} buses live
//         </span>

//         {/* Route filter chips */}
//         <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', flexWrap: 'wrap' }}>
//           {['ALL', 'A', 'B', 'C', 'D'].map(r => (
//             <button key={r}
//               onClick={() => setActiveRoute(r)}
//               style={{
//                 padding: '5px 14px', borderRadius: 16,
//                 fontSize: 12, fontWeight: 600,
//                 cursor: 'pointer', border: 'none',
//                 fontFamily: "'DM Sans',sans-serif",
//                 background: activeRoute === r ? 'var(--accent)' : '#f1f5f9',
//                 color:      activeRoute === r ? '#1a1a1a'        : 'var(--muted)',
//               }}
//             >
//               {r === 'ALL' ? 'All Routes' : `Route ${r}`}
//             </button>
//           ))}
//         </div>

//         {/* Live indicator */}
//         <div style={{
//           display: 'flex', alignItems: 'center',
//           gap: 6, fontSize: 12, color: '#0f9d58', fontWeight: 600,
//         }}>
//           <div style={{
//             width: 7, height: 7, borderRadius: '50%',
//             background: '#0f9d58', animation: 'livePulse 1.8s infinite',
//           }}/>
//           Live updates
//         </div>
//       </div>

//       {/* Map */}
//       <div style={{ flex: 1, position: 'relative' }}>
//         <MapContainer
//           center={defaultCenter}
//           zoom={13}
//           style={{ width: '100%', height: '100%' }}
//           zoomControl={true}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='© OpenStreetMap contributors'
//           />

//           {liveBusArray.map(bus => {
//             if (!bus.lat || !bus.lng) return null;
//             const color = ROUTE_COLORS[bus.routeId] || '#1a73e8';
//             return (
//               <Marker
//                 key={bus.id}
//                 position={[bus.lat, bus.lng]}
//                 icon={makeBusIcon(color)}
//                 eventHandlers={{ click: () => setSelectedBus(bus) }}
//               >
//                 <Popup>
//                   <div style={{ minWidth: 160 }}>
//                     <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
//                       🚌 {bus.busNumber || bus.id}
//                     </div>
//                     <div style={{ fontSize: 12, color: '#5f6368' }}>
//                       Route: <b>{bus.routeId || '—'}</b>
//                     </div>
//                     <div style={{ fontSize: 12, color: '#5f6368' }}>
//                       Speed: <b>{bus.speed || 0} km/h</b>
//                     </div>
//                     <div style={{ fontSize: 12, color: '#0f9d58', fontWeight: 600 }}>
//                       ● Live
//                     </div>
//                   </div>
//                 </Popup>
//               </Marker>
//             );
//           })}
//         </MapContainer>

//         {/* Selected bus info panel */}
//         {selectedBus && (
//           <div style={{
//             position: 'absolute', top: 12, left: 12,
//             background: '#fff', borderRadius: 14,
//             boxShadow: '0 4px 24px rgba(0,0,0,.2)',
//             width: 240, zIndex: 1000, overflow: 'hidden',
//           }}>
//             <div style={{
//               padding: '12px 14px',
//               borderBottom: '1px solid #f1f3f4',
//               display: 'flex', alignItems: 'center', gap: 10,
//             }}>
//               <div style={{
//                 width: 36, height: 36, borderRadius: '50%',
//                 background: ROUTE_COLORS[selectedBus.routeId] || '#1a73e8',
//                 display: 'flex', alignItems: 'center',
//                 justifyContent: 'center', fontSize: 16,
//               }}>🚌</div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontWeight: 700, fontSize: 14 }}>
//                   {selectedBus.busNumber || selectedBus.id}
//                 </div>
//                 <div style={{ fontSize: 11, color: '#5f6368' }}>
//                   Route {selectedBus.routeId || '—'}
//                 </div>
//               </div>
//               <button
//                 onClick={() => setSelectedBus(null)}
//                 style={{
//                   background: 'none', border: 'none',
//                   cursor: 'pointer', fontSize: 20, color: '#5f6368',
//                 }}
//               >×</button>
//             </div>
//             <div style={{ padding: '10px 14px' }}>
//               {[
//                 ['Speed',   `${selectedBus.speed || 0} km/h`],
//                 ['Status',  '● Live'],
//                 ['Lat',     selectedBus.lat?.toFixed(5) || '—'],
//                 ['Lng',     selectedBus.lng?.toFixed(5) || '—'],
//               ].map(([k, v]) => (
//                 <div key={k} style={{
//                   display: 'flex', justifyContent: 'space-between',
//                   fontSize: 12, padding: '5px 0',
//                   borderBottom: '0.5px solid #f1f3f4',
//                 }}>
//                   <span style={{ color: '#5f6368' }}>{k}</span>
//                   <span style={{ fontWeight: 600 }}>{v}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Bottom bus cards */}
//       <div style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
//         <div style={{
//           display: 'flex', gap: 10,
//           padding: '10px 12px', overflowX: 'auto',
//         }}>
//           {liveBusArray.length === 0 ? (
//             <div style={{
//               padding: '12px 16px',
//               fontSize: 13, color: 'var(--muted)',
//             }}>
//               No buses live yet. Waiting for drivers to start trips…
//             </div>
//           ) : liveBusArray.map(bus => (
//             <div
//               key={bus.id}
//               onClick={() => setSelectedBus(bus)}
//               style={{
//                 minWidth: 180, flexShrink: 0,
//                 background: selectedBus?.id === bus.id ? '#e8f0fe' : '#f8fafc',
//                 border: `2px solid ${selectedBus?.id === bus.id
//                   ? '#1a73e8' : 'var(--border)'}`,
//                 borderRadius: 13, padding: '10px 12px',
//                 cursor: 'pointer', transition: 'all .15s',
//               }}
//             >
//               <div style={{
//                 display: 'flex', alignItems: 'center',
//                 gap: 8, marginBottom: 6,
//               }}>
//                 <div style={{
//                   width: 28, height: 28, borderRadius: '50%',
//                   background: ROUTE_COLORS[bus.routeId] || '#1a73e8',
//                   display: 'flex', alignItems: 'center',
//                   justifyContent: 'center', fontSize: 14,
//                 }}>🚌</div>
//                 <div>
//                   <div style={{ fontSize: 12.5, fontWeight: 700 }}>
//                     {bus.busNumber || bus.id}
//                   </div>
//                   <div style={{ fontSize: 10, color: 'var(--muted)' }}>
//                     Route {bus.routeId || '—'}
//                   </div>
//                 </div>
//                 <span style={{
//                   marginLeft: 'auto', fontSize: 10,
//                   padding: '2px 7px', borderRadius: 9,
//                   background: '#e6f4ea', color: '#1e7e34', fontWeight: 700,
//                 }}>Live</span>
//               </div>
//               <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>
//                 Speed: <b style={{ color: 'var(--text)' }}>
//                   {bus.speed || 0} km/h
//                 </b>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function PageTracking({ showToast }) {
//   const [liveBuses, setLiveBuses]     = useState({});
//   const [selectedBus, setSelectedBus] = useState(null);
//   const [activeRoute, setActiveRoute] = useState('ALL');
//   const [dbRoutes, setDbRoutes]       = useState([]);
//   const [showRouteSearch, setShowRouteSearch] = useState(false);
//   const [routeSearchQuery, setRouteSearchQuery] = useState('');
//   const socketRef = useRef(null);

//   const defaultCenter = [15.8497, 74.4977];

//   // Fetch real routes from DB
//   useEffect(() => {
//     getRoutes()
//       .then(data => setDbRoutes(data.routes || []))
//       .catch(() => {});
//   }, []);

//   useEffect(() => {
//     socketRef.current = io('http://localhost:8000');
//     socketRef.current.emit('get:live:buses');
//     socketRef.current.on('live:buses', (buses) => { setLiveBuses(buses); });
//     socketRef.current.on('admin:bus:update', ({ busId, lat, lng, speed, busNumber }) => {
//       setLiveBuses(prev => ({ ...prev, [busId]: { ...prev[busId], lat, lng, speed, busNumber } }));
//     });
//     socketRef.current.on('admin:trip:started', ({ busId, routeId, busNumber }) => {
//       setLiveBuses(prev => ({ ...prev, [busId]: { ...prev[busId], status: 'live', routeId, busNumber } }));
//     });
//     // socketRef.current.on('admin:trip:ended', ({ busId }) => {
//     //   setLiveBuses(prev => { const updated = { ...prev }; delete updated[busId]; return updated; });
//     //   if (selectedBus?.id === busId) setSelectedBus(null);
//     // });
//     socketRef.current.on('admin:trip:ended', ({ busId }) => {
//   setLiveBuses(prev => { const updated = { ...prev }; delete updated[busId]; return updated; });
//   setSelectedBus(prev => (prev?.id === busId ? null : prev));
// });
//     return () => socketRef.current?.disconnect();
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     if (!showRouteSearch) return;
//     const handler = (e) => {
//       if (!e.target.closest('[data-route-search]')) setShowRouteSearch(false);
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, [showRouteSearch]);

//   const liveBusArray = Object.entries(liveBuses)
//     .map(([id, data]) => ({ id, ...data }))
//     .filter(b => activeRoute === 'ALL' || b.routeId === activeRoute);

//   const visibleChipRoutes   = dbRoutes.slice(0, 2);
//   const remainingRoutes     = dbRoutes.slice(2);
//   const allSearchableRoutes = dbRoutes;


//   // const filteredRemaining = remainingRoutes.filter(r =>
//   //   !routeSearchQuery ||
//   //   r.name?.toLowerCase().includes(routeSearchQuery.toLowerCase()) ||
//   //   r.routeId?.toLowerCase().includes(routeSearchQuery.toLowerCase())
//   // );

//   const filteredRemaining = allSearchableRoutes.filter(r =>
//     !routeSearchQuery ||
//     r.name?.toLowerCase().includes(routeSearchQuery.toLowerCase()) ||
//     r.routeId?.toLowerCase().includes(routeSearchQuery.toLowerCase())
//   );

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 58px)', overflow: 'hidden' }}>

//       {/* ── Top bar ── */}
//       <div style={{
//         padding: '10px 16px', background: '#fff',
//         borderBottom: '1px solid var(--border)',
//         display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap',
//       }}>
//         <span style={{ fontWeight: 700, fontSize: 14 }}>Live Tracking</span>
//         <span style={{ fontSize: 12, color: 'var(--muted)' }}>
//           {liveBusArray.length} buses live
//         </span>

//         {/* ── Route chips + search ── */}
//         <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', alignItems: 'center', flexWrap: 'wrap' }}>

//           {/* All Routes chip */}
//           <button
//             onClick={() => setActiveRoute('ALL')}
//             style={{
//               padding: '5px 14px', borderRadius: 16, fontSize: 12, fontWeight: 600,
//               cursor: 'pointer', border: 'none', fontFamily: "'DM Sans',sans-serif",
//               background: activeRoute === 'ALL' ? 'var(--accent)' : '#f1f5f9',
//               color:      activeRoute === 'ALL' ? '#1a1a1a'       : 'var(--muted)',
//               transition: 'all .15s',
//             }}
//           >
//             All Routes
//           </button>

//           {/* First 2 routes from DB */}
//           {visibleChipRoutes.map(r => (
//             <button key={r._id}
//               onClick={() => setActiveRoute(r.routeId)}
//               style={{
//                 padding: '5px 14px', borderRadius: 16, fontSize: 12, fontWeight: 600,
//                 cursor: 'pointer', border: 'none', fontFamily: "'DM Sans',sans-serif",
//                 background: activeRoute === r.routeId ? 'var(--accent)' : '#f1f5f9',
//                 color:      activeRoute === r.routeId ? '#1a1a1a'       : 'var(--muted)',
//                 transition: 'all .15s',
//               }}
//             >
//               {r.routeId} — {r.name}
//             </button>
//           ))}

//           {/* Search button for remaining routes */}
          
//           {dbRoutes.length > 0 && (
//             <div data-route-search style={{ position: 'relative' }}>
//               <button
//                 onClick={() => setShowRouteSearch(p => !p)}
//                 style={{
//                   padding: '5px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600,
//                   cursor: 'pointer', fontFamily: "'DM Sans',sans-serif",
//                   border: `1.5px solid ${showRouteSearch ? 'var(--accent)' : 'var(--border)'}`,
//                   background: showRouteSearch ? 'rgba(245,166,35,.08)' : '#fff',
//                   color: showRouteSearch ? 'var(--accent2)' : 'var(--text)',
//                   display: 'flex', alignItems: 'center', gap: 5, transition: 'all .15s',
//                 }}
//               >
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
//                   stroke="currentColor" strokeWidth="2.5">
//                   <circle cx="11" cy="11" r="8"/>
//                   <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//                 </svg>
//                 Search Routes
//                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
//                   stroke="currentColor" strokeWidth="2.5"
//                   style={{ transform: showRouteSearch ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
//                   <polyline points="6 9 12 15 18 9"/>
//                 </svg>
//               </button>

//               {/* Dropdown */}
//               {showRouteSearch && (
//                 <div style={{
//                   position: 'absolute', top: 38, right: 0, zIndex: 300,
//                   background: '#fff', border: '1px solid var(--border)',
//                   borderRadius: 12, boxShadow: '0 8px 28px rgba(0,0,0,.14)',
//                   minWidth: 240, overflow: 'hidden',
//                 }}>
//                   {/* Search input */}
//                   <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
//                     <div style={{
//                       display: 'flex', alignItems: 'center', gap: 7,
//                       background: '#f8fafc', borderRadius: 8,
//                       border: '1px solid var(--border)', padding: '7px 10px',
//                     }}>
//                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
//                         stroke="var(--muted)" strokeWidth="2.5">
//                         <circle cx="11" cy="11" r="8"/>
//                         <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//                       </svg>
//                       <input
//                         autoFocus
//                         placeholder="Search route..."
//                         value={routeSearchQuery}
//                         onChange={e => setRouteSearchQuery(e.target.value)}
//                         style={{
//                           border: 'none', outline: 'none', background: 'transparent',
//                           fontSize: 12.5, color: 'var(--text)', width: '100%',
//                           fontFamily: "'DM Sans',sans-serif",
//                         }}
//                       />
//                       {routeSearchQuery && (
//                         <button onClick={() => setRouteSearchQuery('')}
//                           style={{ background: 'none', border: 'none', cursor: 'pointer',
//                             color: 'var(--muted)', fontSize: 15, lineHeight: 1, padding: 0 }}>
//                           ×
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Route list */}
//                   <div style={{ maxHeight: 220, overflowY: 'auto' }}>
//                     {filteredRemaining.length === 0 ? (
//                       <div style={{ padding: '16px 14px', color: 'var(--muted)',
//                         fontSize: 12.5, textAlign: 'center' }}>
//                         No routes found
//                       </div>
//                     ) : filteredRemaining.map((r, idx) => (
//                       <div key={r._id}
//                         onClick={() => {
//                           setActiveRoute(r.routeId);
//                           setShowRouteSearch(false);
//                           setRouteSearchQuery('');
//                         }}
//                         style={{
//                           padding: '10px 14px', cursor: 'pointer', fontSize: 13,
//                           color: activeRoute === r.routeId ? 'var(--accent2)' : 'var(--text)',
//                           background: activeRoute === r.routeId
//                             ? 'rgba(245,166,35,.08)' : 'transparent',
//                           fontWeight: activeRoute === r.routeId ? 700 : 400,
//                           borderBottom: idx < filteredRemaining.length - 1
//                             ? '1px solid var(--border)' : 'none',
//                           display: 'flex', alignItems: 'center', gap: 8,
//                           transition: 'background .12s',
//                         }}
//                         onMouseEnter={e => {
//                           if (activeRoute !== r.routeId)
//                             e.currentTarget.style.background = '#f8fafc';
//                         }}
//                         onMouseLeave={e => {
//                           if (activeRoute !== r.routeId)
//                             e.currentTarget.style.background = 'transparent';
//                         }}
//                       >
//                         <span style={{
//                           fontSize: 10, fontWeight: 700, padding: '2px 7px',
//                           borderRadius: 8, background: 'rgba(37,99,235,.1)',
//                           color: 'var(--blue2)', flexShrink: 0,
//                         }}>
//                           {r.routeId}
//                         </span>
//                         {r.name}
//                         {activeRoute === r.routeId && (
//                           <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: 14 }}>✓</span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Live indicator */}
//         <div style={{
//           display: 'flex', alignItems: 'center',
//           gap: 6, fontSize: 12, color: '#0f9d58', fontWeight: 600,
//         }}>
//           <div style={{
//             width: 7, height: 7, borderRadius: '50%',
//             background: '#0f9d58', animation: 'livePulse 1.8s infinite',
//           }}/>
//           Live updates
//         </div>
//       </div>

//       {/* ── Map ── */}
//       <div style={{ flex: 1, position: 'relative' }}>
//         <MapContainer
//           center={defaultCenter} zoom={13}
//           style={{ width: '100%', height: '100%' }}
//           zoomControl={true}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='© OpenStreetMap contributors'
//           />
//           {liveBusArray.map(bus => {
//             if (!bus.lat || !bus.lng) return null;
//             const color = ROUTE_COLORS[bus.routeId] || '#1a73e8';
//             return (
//               <Marker key={bus.id} position={[bus.lat, bus.lng]}
//                 icon={makeBusIcon(color)}
//                 eventHandlers={{ click: () => setSelectedBus(bus) }}
//               >
//                 <Popup>
//                   <div style={{ minWidth: 160 }}>
//                     <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
//                       🚌 {bus.busNumber || bus.id}
//                     </div>
//                     <div style={{ fontSize: 12, color: '#5f6368' }}>Route: <b>{bus.routeId || '—'}</b></div>
//                     <div style={{ fontSize: 12, color: '#5f6368' }}>Speed: <b>{bus.speed || 0} km/h</b></div>
//                     <div style={{ fontSize: 12, color: '#0f9d58', fontWeight: 600 }}>● Live</div>
//                   </div>
//                 </Popup>
//               </Marker>
//             );
//           })}
//         </MapContainer>

//         {/* Selected bus panel */}
//         {selectedBus && (
//           <div style={{
//             position: 'absolute', top: 12, left: 12,
//             background: '#fff', borderRadius: 14,
//             boxShadow: '0 4px 24px rgba(0,0,0,.2)',
//             width: 240, zIndex: 1000, overflow: 'hidden',
//           }}>
//             <div style={{
//               padding: '12px 14px', borderBottom: '1px solid #f1f3f4',
//               display: 'flex', alignItems: 'center', gap: 10,
//             }}>
//               <div style={{
//                 width: 36, height: 36, borderRadius: '50%',
//                 background: ROUTE_COLORS[selectedBus.routeId] || '#1a73e8',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
//               }}>🚌</div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontWeight: 700, fontSize: 14 }}>{selectedBus.busNumber || selectedBus.id}</div>
//                 <div style={{ fontSize: 11, color: '#5f6368' }}>Route {selectedBus.routeId || '—'}</div>
//               </div>
//               <button onClick={() => setSelectedBus(null)}
//                 style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#5f6368' }}>
//                 ×
//               </button>
//             </div>
//             <div style={{ padding: '10px 14px' }}>
//               {[
//                 ['Speed',  `${selectedBus.speed || 0} km/h`],
//                 ['Status', '● Live'],
//                 ['Lat',    selectedBus.lat?.toFixed(5) || '—'],
//                 ['Lng',    selectedBus.lng?.toFixed(5) || '—'],
//               ].map(([k, v]) => (
//                 <div key={k} style={{
//                   display: 'flex', justifyContent: 'space-between',
//                   fontSize: 12, padding: '5px 0', borderBottom: '0.5px solid #f1f3f4',
//                 }}>
//                   <span style={{ color: '#5f6368' }}>{k}</span>
//                   <span style={{ fontWeight: 600 }}>{v}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── Bottom bus cards ── */}
//       <div style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
//         <div style={{ display: 'flex', gap: 10, padding: '10px 12px', overflowX: 'auto' }}>
//           {liveBusArray.length === 0 ? (
//             <div style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>
//               No buses live yet. Waiting for drivers to start trips…
//             </div>
//           ) : liveBusArray.map(bus => (
//             <div key={bus.id} onClick={() => setSelectedBus(bus)}
//               style={{
//                 minWidth: 180, flexShrink: 0,
//                 background: selectedBus?.id === bus.id ? '#e8f0fe' : '#f8fafc',
//                 border: `2px solid ${selectedBus?.id === bus.id ? '#1a73e8' : 'var(--border)'}`,
//                 borderRadius: 13, padding: '10px 12px', cursor: 'pointer', transition: 'all .15s',
//               }}
//             >
//               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
//                 <div style={{
//                   width: 28, height: 28, borderRadius: '50%',
//                   background: ROUTE_COLORS[bus.routeId] || '#1a73e8',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
//                 }}>🚌</div>
//                 <div>
//                   <div style={{ fontSize: 12.5, fontWeight: 700 }}>{bus.busNumber || bus.id}</div>
//                   <div style={{ fontSize: 10, color: 'var(--muted)' }}>Route {bus.routeId || '—'}</div>
//                 </div>
//                 <span style={{
//                   marginLeft: 'auto', fontSize: 10, padding: '2px 7px', borderRadius: 9,
//                   background: '#e6f4ea', color: '#1e7e34', fontWeight: 700,
//                 }}>Live</span>
//               </div>
//               <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>
//                 Speed: <b style={{ color: 'var(--text)' }}>{bus.speed || 0} km/h</b>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// ── Drop-in replacement for PageTracking in AdminDashboard.jsx ──────────
// Key fixes:
//  1. admin:trip:started now also stores busId into liveBuses entry
//  2. admin:bus:update merges busId so the card panel always has it
//  3. selectedBus closure bug fixed (functional updater)
//  4. No other logic changed

// Add this component above PageTracking
function AdminMapUpdater({ buses }) {
  const map = useMap();
  useEffect(() => {
    const liveBus = buses.find(b => b.lat && b.lng);
    if (liveBus) {
      map.setView([liveBus.lat, liveBus.lng], map.getZoom());
    }
  }, [buses, map]);
  return null;
}

function PageTracking({ showToast }) {
  const [liveBuses, setLiveBuses]     = useState({});
  const [selectedBus, setSelectedBus] = useState(null);
  const [activeRoute, setActiveRoute] = useState('ALL');
  const [dbRoutes, setDbRoutes]       = useState([]);
  const [showRouteSearch, setShowRouteSearch] = useState(false);
  const [routeSearchQuery, setRouteSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const socketRef = useRef(null);

  const defaultCenter = [15.8497, 74.4977];

  useEffect(() => {
    getRoutes()
      .then(data => setDbRoutes(data.routes || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    socketRef.current = io('http://localhost:8000');

    // ── Request current snapshot on connect ──
    socketRef.current.on('connect', () => {
      socketRef.current.emit('get:live:buses');
    });
    // Also emit immediately in case we connected before the listener was set
    socketRef.current.emit('get:live:buses');

    socketRef.current.on('live:buses', (buses) => {
      // buses is { [busId]: { lat, lng, speed, busNumber, routeId, ... } }
      // Normalise so every entry has its own busId key
      const normalised = {};
      Object.entries(buses).forEach(([id, data]) => {
        normalised[id] = { ...data, id };
      });
      setLiveBuses(normalised);
    });

    // ── Real-time location update ──
    socketRef.current.on('admin:bus:update', ({ busId, lat, lng, speed, busNumber }) => {
      setLiveBuses(prev => ({
        ...prev,
        [busId]: { ...prev[busId], id: busId, lat, lng, speed, busNumber },
      }));
      // Keep selectedBus panel in sync
      setSelectedBus(prev =>
        prev && prev.id === busId
          ? { ...prev, lat, lng, speed, busNumber }
          : prev
      );
    });

    // ── Trip started ──
    socketRef.current.on('admin:trip:started', ({ busId, routeId, busNumber, driverId }) => {
      setLiveBuses(prev => ({
        ...prev,
        [busId]: {
          ...prev[busId],
          id: busId,
          status: 'live',
          routeId,
          busNumber,
          driverId,
        },
      }));
    });

    // ── Trip ended ──
    socketRef.current.on('admin:trip:ended', ({ busId }) => {
      setLiveBuses(prev => {
        const updated = { ...prev };
        delete updated[busId];
        return updated;
      });
      setSelectedBus(prev => (prev?.id === busId ? null : prev));
    });

    return () => socketRef.current?.disconnect();
  }, []);

  // Close route-search dropdown on outside click
  useEffect(() => {
    if (!showRouteSearch) return;
    const handler = (e) => {
      if (!e.target.closest('[data-route-search]')) setShowRouteSearch(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showRouteSearch]);

  // const liveBusArray = Object.values(liveBuses).filter(
  //   b => activeRoute === 'ALL' || b.routeId === activeRoute
  // );
  const liveBusArray = Object.values(liveBuses).filter(b => {
  const matchRoute = activeRoute === 'ALL' || b.routeId === activeRoute;

  const q = searchQuery.toLowerCase().trim();
  const matchSearch =
    !q ||
    b.busNumber?.toLowerCase().includes(q) ||
    b.routeId?.toLowerCase().includes(q) ||
    b.driverId?.toLowerCase().includes(q);

  return matchRoute && matchSearch;
});

  const visibleChipRoutes = dbRoutes.slice(0, 2);

  const filteredRemaining = dbRoutes.filter(r =>
    !routeSearchQuery ||
    r.name?.toLowerCase().includes(routeSearchQuery.toLowerCase()) ||
    r.routeId?.toLowerCase().includes(routeSearchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 58px)', overflow: 'hidden' }}>

      {/* ── Top bar ── */}
      <div style={{
        padding: '10px 16px', background: '#fff',
        borderBottom: '1px solid var(--border)',
        display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap',
      }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>Live Tracking</span>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          {liveBusArray.length} bus{liveBusArray.length !== 1 ? 'es' : ''} live
        </span>

        {/* Route chips */}
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveRoute('ALL')}
            style={{
              padding: '5px 14px', borderRadius: 16, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', border: 'none', fontFamily: "'DM Sans',sans-serif",
              background: activeRoute === 'ALL' ? 'var(--accent)' : '#f1f5f9',
              color:      activeRoute === 'ALL' ? '#1a1a1a'       : 'var(--muted)',
              transition: 'all .15s',
            }}
          >All Routes</button>

          {visibleChipRoutes.map(r => (
            <button key={r._id}
              onClick={() => setActiveRoute(r.routeId)}
              style={{
                padding: '5px 14px', borderRadius: 16, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', border: 'none', fontFamily: "'DM Sans',sans-serif",
                background: activeRoute === r.routeId ? 'var(--accent)' : '#f1f5f9',
                color:      activeRoute === r.routeId ? '#1a1a1a'       : 'var(--muted)',
                transition: 'all .15s',
              }}
            >{r.routeId} — {r.name}</button>
          ))}

          {dbRoutes.length > 0 && (
            <div data-route-search style={{ position: 'relative' }}>
              <button
                onClick={() => setShowRouteSearch(p => !p)}
                style={{
                  padding: '5px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', fontFamily: "'DM Sans',sans-serif",
                  border: `1.5px solid ${showRouteSearch ? 'var(--accent)' : 'var(--border)'}`,
                  background: showRouteSearch ? 'rgba(245,166,35,.08)' : '#fff',
                  color: showRouteSearch ? 'var(--accent2)' : 'var(--text)',
                  display: 'flex', alignItems: 'center', gap: 5, transition: 'all .15s',
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Search Routes
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: showRouteSearch ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {showRouteSearch && (
                <div style={{
                  position: 'absolute', top: 38, right: 0, zIndex: 300,
                  background: '#fff', border: '1px solid var(--border)',
                  borderRadius: 12, boxShadow: '0 8px 28px rgba(0,0,0,.14)',
                  minWidth: 240, overflow: 'hidden',
                }}>
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      background: '#f8fafc', borderRadius: 8,
                      border: '1px solid var(--border)', padding: '7px 10px',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <input
                        autoFocus
                        placeholder="Search route..."
                        value={routeSearchQuery}
                        onChange={e => setRouteSearchQuery(e.target.value)}
                        style={{
                          border: 'none', outline: 'none', background: 'transparent',
                          fontSize: 12.5, color: 'var(--text)', width: '100%',
                          fontFamily: "'DM Sans',sans-serif",
                        }}
                      />
                      {routeSearchQuery && (
                        <button onClick={() => setRouteSearchQuery('')}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 15, lineHeight: 1, padding: 0 }}>
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                  <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                    {filteredRemaining.length === 0 ? (
                      <div style={{ padding: '16px 14px', color: 'var(--muted)', fontSize: 12.5, textAlign: 'center' }}>
                        No routes found
                      </div>
                    ) : filteredRemaining.map((r, idx) => (
                      <div key={r._id}
                        onClick={() => { setActiveRoute(r.routeId); setShowRouteSearch(false); setRouteSearchQuery(''); }}
                        style={{
                          padding: '10px 14px', cursor: 'pointer', fontSize: 13,
                          color: activeRoute === r.routeId ? 'var(--accent2)' : 'var(--text)',
                          background: activeRoute === r.routeId ? 'rgba(245,166,35,.08)' : 'transparent',
                          fontWeight: activeRoute === r.routeId ? 700 : 400,
                          borderBottom: idx < filteredRemaining.length - 1 ? '1px solid var(--border)' : 'none',
                          display: 'flex', alignItems: 'center', gap: 8, transition: 'background .12s',
                        }}
                      >
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 7px',
                          borderRadius: 8, background: 'rgba(37,99,235,.1)', color: 'var(--blue2)', flexShrink: 0,
                        }}>{r.routeId}</span>
                        {r.name}
                        {activeRoute === r.routeId && (
                          <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: 14 }}>✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#0f9d58', fontWeight: 600 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0f9d58', animation: 'livePulse 1.8s infinite' }}/>
          Live updates
        </div>
      </div>

      {/* ── Map ── */}
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={defaultCenter} zoom={13} style={{ width: '100%', height: '100%' }} zoomControl>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <AdminMapUpdater buses={liveBusArray} />
          {liveBusArray.map(bus => {
            if (!bus.lat || !bus.lng) return null;
            const color = ROUTE_COLORS[bus.routeId] || '#1a73e8';
            return (
              <Marker key={bus.id} position={[bus.lat, bus.lng]}
                icon={makeBusIcon(color)}
                eventHandlers={{ click: () => setSelectedBus(bus) }}
              >
                <Popup>
                  <div style={{ minWidth: 160 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                      🚌 {bus.busNumber || bus.id}
                    </div>
                    <div style={{ fontSize: 12, color: '#5f6368' }}>Route: <b>{bus.routeId || '—'}</b></div>
                    <div style={{ fontSize: 12, color: '#5f6368' }}>Speed: <b>{bus.speed || 0} km/h</b></div>
                    <div style={{ fontSize: 12, color: '#0f9d58', fontWeight: 600 }}>● Live</div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Selected bus panel */}
        {selectedBus && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: '#fff', borderRadius: 14,
            boxShadow: '0 4px 24px rgba(0,0,0,.2)',
            width: 240, zIndex: 1000, overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 14px', borderBottom: '1px solid #f1f3f4',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: ROUTE_COLORS[selectedBus.routeId] || '#1a73e8',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              }}>🚌</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{selectedBus.busNumber || selectedBus.id}</div>
                <div style={{ fontSize: 11, color: '#5f6368' }}>Route {selectedBus.routeId || '—'}</div>
              </div>
              <button onClick={() => setSelectedBus(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#5f6368' }}>
                ×
              </button>
            </div>
            <div style={{ padding: '10px 14px' }}>
              {[
                ['Speed',  `${selectedBus.speed || 0} km/h`],
                ['Status', '● Live'],
                ['Lat',    selectedBus.lat?.toFixed(5) || '—'],
                ['Lng',    selectedBus.lng?.toFixed(5) || '—'],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 12, padding: '5px 0', borderBottom: '0.5px solid #f1f3f4',
                }}>
                  <span style={{ color: '#5f6368' }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom bus cards ── */}
      <div style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 10, padding: '10px 12px', overflowX: 'auto' }}>
          {liveBusArray.length === 0 ? (
            <div style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>
              No buses live yet. Waiting for drivers to start trips…
            </div>
          ) : liveBusArray.map(bus => (
            <div key={bus.id} onClick={() => setSelectedBus(bus)}
              style={{
                minWidth: 180, flexShrink: 0,
                background: selectedBus?.id === bus.id ? '#e8f0fe' : '#f8fafc',
                border: `2px solid ${selectedBus?.id === bus.id ? '#1a73e8' : 'var(--border)'}`,
                borderRadius: 13, padding: '10px 12px', cursor: 'pointer', transition: 'all .15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: ROUTE_COLORS[bus.routeId] || '#1a73e8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                }}>🚌</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{bus.busNumber || bus.id}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Route {bus.routeId || '—'}</div>
                </div>
                <span style={{
                  marginLeft: 'auto', fontSize: 10, padding: '2px 7px', borderRadius: 9,
                  background: '#e6f4ea', color: '#1e7e34', fontWeight: 700,
                }}>Live</span>
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>
                Speed: <b style={{ color: 'var(--text)' }}>{bus.speed || 0} km/h</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageBuses({ showModal, showToast, requestConfirm }) {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  
  const fetchBuses = async () => {
    try {
      setLoading(true);
      const data = await getBuses();
      setBuses(data.buses || []);
    } catch (err) {
      showToast('Failed to load buses: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => { fetchBuses(); }, []);
 
  const filtered = buses.filter(b => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      b.busNumber?.toLowerCase().includes(q) ||
      b.model?.toLowerCase().includes(q) ||
      b.assignedDriver?.name?.toLowerCase().includes(q) ||
      b.assignedRoute?.name?.toLowerCase().includes(q) ||
      b.assignedRoute?.routeId?.toLowerCase().includes(q) ||
      b.status?.toLowerCase().includes(q);
 
    const matchRoute =
      !routeFilter ||
      b.assignedRoute?.routeId === routeFilter ||
      b.assignedRoute?.name?.toLowerCase().includes(routeFilter.toLowerCase());
 
    const matchStatus = !statusFilter || b.status === statusFilter;
 
    return matchSearch && matchRoute && matchStatus;
  });
 
  const statusClass = s =>
    s === 'active' ? 'sp-green' : s === 'maintenance' ? 'sp-amber' : 'sp-gray';
 
  // Collect unique routes from loaded buses for the filter dropdown
  const uniqueRoutes = [];
  const seenRoutes = new Set();
  buses.forEach(b => {
    if (b.assignedRoute && !seenRoutes.has(b.assignedRoute._id)) {
      seenRoutes.add(b.assignedRoute._id);
      uniqueRoutes.push(b.assignedRoute);
    }
  });


const handleDelete = (b) => {
    requestConfirm({
      title: 'Delete Bus',
      description: 'Are you sure you want to permanently delete bus',
      itemName: b.busNumber,
      onConfirm: async () => {
        await deleteBus(b._id);
        fetchBuses();
        showToast(`Bus ${b.busNumber} deleted.`);
      },
    });
  };
return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Buses</div>
          <div className="page-subtitle">
            Manage fleet — {buses.length} buses registered
            {filtered.length !== buses.length && ` · ${filtered.length} shown`}
          </div>
        </div>
        <div className="fab-row">
          <div className="search-bar">
            <IconSearch />
            <input
              placeholder="Search by number, model, driver…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16, lineHeight: 1, padding: 0 }}
              >×</button>
            )}
          </div>
          <select
            className="filter-select"
            value={routeFilter}
            onChange={e => setRouteFilter(e.target.value)}
          >
            <option value="">All Routes</option>
            {uniqueRoutes.map(r => (
              <option key={r._id} value={r.routeId}>{r.routeId} — {r.name}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="idle">Idle</option>
          </select>
          <button className="fab-btn fab-primary" onClick={() => showModal('bus', null, fetchBuses)}>
            ＋ Add Bus
          </button>
        </div>
      </div>
 
      <div className="table-card">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Loading buses…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
            {search || routeFilter || statusFilter
              ? <>No buses match your filters. <button onClick={() => { setSearch(''); setRouteFilter(''); setStatusFilter(''); }} style={{ background: 'none', border: 'none', color: 'var(--blue2)', cursor: 'pointer', fontWeight: 600 }}>Clear filters</button></>
              : 'No buses yet. Click + Add Bus.'}
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Bus No.</th>
                <th>Model</th>
                <th>Driver</th>
                <th>Route</th>
                <th>Capacity</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b._id}>
                  <td><strong>{b.busNumber}</strong></td>
                  <td>{b.model || '—'}</td>
                  <td>
                    {b.assignedDriver
                      ? b.assignedDriver.name
                      : <span style={{ color: 'var(--muted)' }}>Unassigned</span>}
                  </td>
                  <td>
                    {b.assignedRoute
                      ? <span className="status-pill sp-blue">{b.assignedRoute.name || b.assignedRoute.routeId}</span>
                      : <span style={{ color: 'var(--muted)' }}>—</span>}
                  </td>
                  <td>{b.capacity}</td>
                  <td>
                    <span className={`status-pill ${statusClass(b.status)}`}>
                      {b.status ? b.status.charAt(0).toUpperCase() + b.status.slice(1) : 'Active'}
                    </span>
                  </td>
                  <td>
                    {/* <button className="act-btn" onClick={() => showModal('bus', b, fetchBuses)}>Edit</button>
                    <button
                      className="act-btn"
                      style={{ marginLeft: 6, color: 'var(--red)', borderColor: 'rgba(220,38,38,.2)' }}
                      onClick={async () => {
                        if (!window.confirm(`Delete bus ${b.busNumber}?`)) return;
                        try { await deleteBus(b._id); fetchBuses(); showToast('Bus deleted.'); }
                        catch (err) { showToast('Delete failed: ' + err.message); }
                      }}
                    >Delete</button> */}
                    <button
  className="act-btn"
  style={{ marginLeft: 6, color: 'var(--red)', borderColor: 'rgba(220,38,38,.2)' }}
  onClick={() => requestConfirm({
    title: 'Delete Bus',
    description: 'Are you sure you want to permanently delete bus',
    itemName: b.busNumber,
    onConfirm: async () => {
      await deleteBus(b._id);
      fetchBuses();
      showToast(`Bus ${b.busNumber} deleted.`);
    },
  })}
>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function PageDrivers({ showModal, showToast,requestConfirm }) {
  const [drivers, setDrivers]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('');
 
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await getAdminDrivers();
      setDrivers(data.drivers || []);
    } catch (err) {
      showToast('Failed to load drivers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => { fetchDrivers(); }, []);
 
  const filtered = drivers.filter(d => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      d.name?.toLowerCase().includes(q) ||
      d.email?.toLowerCase().includes(q) ||
      d.phone?.toLowerCase().includes(q) ||
      d.licenseNo?.toLowerCase().includes(q) ||
      d.assignedBus?.busNumber?.toLowerCase().includes(q) ||
      d.assignedRoute?.name?.toLowerCase().includes(q) ||
      d.status?.toLowerCase().includes(q);
 
    const matchStatus = !statusFilter || d.status === statusFilter;
 
    return matchSearch && matchStatus;
  });
 
  const statusClass = s =>
    s === 'active' ? 'sp-green' : s === 'on_leave' ? 'sp-amber' : 'sp-gray';
 
  const avatarColors = ['#3b8bd4','#8b5cf6','#3dc87a','#e05252','#f5a623','#0ea5e9','#14b8a6'];
  const getColor  = (name = '') => avatarColors[name.charCodeAt(0) % avatarColors.length];
  const initials  = (name = '') => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
 
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Drivers</div>
          <div className="page-subtitle">
            {drivers.length} drivers registered
            {filtered.length !== drivers.length && ` · ${filtered.length} shown`}
          </div>
        </div>
        <div className="fab-row">
          <div className="search-bar">
            <IconSearch />
            <input
              placeholder="Search by name, license, bus…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16, lineHeight: 1, padding: 0 }}
              >×</button>
            )}
          </div>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
          </select>
          <button className="fab-btn fab-primary" onClick={() => showModal('driver', null, fetchDrivers)}>
            ＋ Add Driver
          </button>
        </div>
      </div>
 
      <div className="driver-cards">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', gridColumn: '1/-1' }}>
            Loading drivers…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', gridColumn: '1/-1' }}>
            {search || statusFilter
              ? <>No drivers match your filters. <button onClick={() => { setSearch(''); setStatusFilter(''); }} style={{ background: 'none', border: 'none', color: 'var(--blue2)', cursor: 'pointer', fontWeight: 600 }}>Clear filters</button></>
              : 'No drivers yet. Click + Add Driver.'}
          </div>
        ) : filtered.map(d => (
          <div className="driver-card" key={d._id}>
            <div className="dc-header">
              <div className="dc-avatar" style={{ background: getColor(d.name) }}>{initials(d.name)}</div>
              <div>
                <div className="dc-name">{d.name}</div>
                <div className="dc-id">{d.licenseNo || 'No license'} · {d.experience || 0} yrs</div>
              </div>
              <span className={`status-pill ${statusClass(d.status)}`} style={{ marginLeft: 'auto' }}>
                {d.status === 'on_leave' ? 'On Leave' : d.status ? d.status.charAt(0).toUpperCase() + d.status.slice(1) : 'Active'}
              </span>
            </div>
            {[
              ['Assigned Bus',   d.assignedBus   ? d.assignedBus.busNumber   : 'Unassigned'],
              ['Route',          d.assignedRoute ? d.assignedRoute.name       : 'Unassigned'],
              ['Phone',          d.phone         || '—'],
              ['Email',          d.email         || '—'],
            ].map(([k, v]) => (
              <div className="dc-row" key={k}>
                <span className="dc-key">{k}</span>
                <span className="dc-val">{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 10, textAlign: 'right', display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
              <button className="act-btn" onClick={() => showModal('driver', d, fetchDrivers)}>Edit</button>
              <button
                className="act-btn"
                style={{ color: 'var(--red)', borderColor: 'rgba(220,38,38,.2)' }}
                // onClick={async () => {
                //   if (!window.confirm(`Delete driver ${d.name}?`)) return;
                //   try { await deleteAdminDriver(d._id); fetchDrivers(); showToast('Driver deleted.'); }
                //   catch (err) { showToast('Delete failed: ' + err.message); }
                // }}
                onClick={() => requestConfirm({
  title: 'Delete Driver',
  description: 'Are you sure you want to permanently delete driver',
  itemName: d.name,
  onConfirm: async () => {
    await deleteAdminDriver(d._id);
    fetchDrivers();
    showToast('Driver deleted.');
  },
})}
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function PageRoutes({ showModal, showToast, requestConfirm }) {
  const [routes, setRoutes]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
 
  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const data = await getRoutes();
      setRoutes(data.routes || []);
    } catch (err) {
      showToast('Failed to load routes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => { fetchRoutes(); }, []);
 
  const filtered = routes.filter(r => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      r.routeId?.toLowerCase().includes(q) ||
      r.name?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.stops?.some(s => s.name?.toLowerCase().includes(q))
    );
  });
 
  const colors = {
    0: { col: 'var(--blue2)',  bg: 'rgba(37,99,235,.12)',  bd: 'rgba(37,99,235,.2)'  },
    1: { col: 'var(--green)',  bg: 'rgba(22,163,74,.1)',   bd: 'rgba(22,163,74,.2)'  },
    2: { col: 'var(--accent)', bg: 'rgba(245,166,35,.1)',  bd: 'rgba(245,166,35,.2)' },
    3: { col: '#b07ef7',       bg: 'rgba(165,110,245,.1)', bd: 'rgba(165,110,245,.2)'},
  };
 
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Routes</div>
          <div className="page-subtitle">
            {routes.length} active routes
            {filtered.length !== routes.length && ` · ${filtered.length} shown`}
          </div>
        </div>
        {/* ← Search bar added here */}
        <div className="fab-row">
          <div className="search-bar">
            <IconSearch />
            <input
              placeholder="Search by route, stop name…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16, lineHeight: 1, padding: 0 }}
              >×</button>
            )}
          </div>
          <button className="fab-btn fab-primary" onClick={() => showModal('route', null, fetchRoutes)}>
            ＋ Create Route
          </button>
        </div>
      </div>
 
      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Loading routes…</div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
          {search
            ? <>No routes match "<strong>{search}</strong>". <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'var(--blue2)', cursor: 'pointer', fontWeight: 600 }}>Clear</button></>
            : 'No routes yet. Click + Create Route.'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {filtered.map((r, ri) => {
            const c = colors[ri % 4];
            // Highlight matching stops when searching
            const highlightStop = (stopName) => {
              const q = search.toLowerCase().trim();
              if (!q || !stopName.toLowerCase().includes(q)) return stopName;
              return <strong style={{ background: 'rgba(245,166,35,.25)', borderRadius: 3, padding: '0 2px' }}>{stopName}</strong>;
            };
            return (
              <div className="table-card" key={r._id}>
                <div className="card-header">
                  <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, background: c.bg, color: c.col }}>
                    {r.routeId}
                  </div>
                  <span className="card-title">{r.name}</span>
                  <div className="ch-right">
                    <span className="status-pill sp-green">{r.stops?.length || 0} stops</span>
                    <button className="act-btn" onClick={() => showModal('route', r, fetchRoutes)}>Edit</button>
                    <button
                      className="act-btn"
                      style={{ color: 'var(--red)', borderColor: 'rgba(220,38,38,.2)' }}
                      // onClick={async () => {
                      //   if (!window.confirm(`Delete route "${r.name}"?`)) return;
                      //   try { await deleteRoute(r._id); fetchRoutes(); showToast('Route deleted.'); }
                      //   catch (err) { showToast('Delete failed: ' + err.message); }
                      // }}
                      onClick={() => requestConfirm({
  title: 'Delete Route',
  description: 'Are you sure you want to permanently delete route',
  itemName: r.name,
  onConfirm: async () => {
    await deleteRoute(r._id);
    fetchRoutes();
    showToast('Route deleted.');
  },
})}
                    >Delete</button>
                  </div>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                    <div><div className="stat-label">Stops</div><div style={{ fontSize: 18, fontWeight: 700 }}>{r.stops?.length || 0}</div></div>
                    <div><div className="stat-label">Buses</div><div style={{ fontSize: 18, fontWeight: 700, color: 'var(--blue2)' }}>{r.assignedBuses?.length || 0}</div></div>
                  </div>
                  {r.description && (
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>{r.description}</div>
                  )}
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>
                    Stop Sequence
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(r.stops || []).slice(0, 4).map((s, i) => (
                      <span key={i} style={{ fontSize: 11.5, padding: '3px 9px', background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 6, color: c.col }}>
                        {highlightStop(s.name)}
                      </span>
                    ))}
                    {r.stops?.length > 4 && (
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>→ +{r.stops.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


function PageStudents({ showModal, showToast,requestConfirm }) {
  const [students, setStudents]     = useState([]);
  const [routes, setRoutes]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
 
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const [studData, routeData] = await Promise.all([
        getAdminStudents(),
        getRoutes(),
      ]);
      setStudents(studData.students || []);
      setRoutes(routeData.routes   || []);
    } catch (err) {
      showToast('Failed to load students: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => { fetchStudents(); }, []);
 
  const filtered = students.filter(s => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      s.name?.toLowerCase().includes(q) ||
      s.rollNo?.toLowerCase().includes(q) ||
      s.className?.toLowerCase().includes(q) ||
      s.pickupStop?.toLowerCase().includes(q) ||
      s.assignedRoute?.name?.toLowerCase().includes(q) ||
      s.assignedRoute?.routeId?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.parentContact?.toLowerCase().includes(q);
 
    // routeFilter holds the route _id — compare against assignedRoute._id
    const matchRoute =
      !routeFilter ||
      s.assignedRoute?._id === routeFilter;
 
    const matchStatus = !statusFilter || s.status === statusFilter;
 
    return matchSearch && matchRoute && matchStatus;
  });
 
  const statusClass = st =>
    st === 'active' ? 'sp-green' : st === 'pending' ? 'sp-amber' : 'sp-gray';
 
  const avatarColors = ['#3b8bd4','#e05252','#f5a623','#8b5cf6','#14b8a6','#ec4899','#3dc87a'];
  const getColor = (name = '') => avatarColors[name.charCodeAt(0) % avatarColors.length];
  const initials = (name = '') => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
 
  const hasFilters = search || routeFilter || statusFilter;
 
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Students</div>
          <div className="page-subtitle">
            {students.length} students enrolled in bus service
            {filtered.length !== students.length && ` · ${filtered.length} shown`}
          </div>
        </div>
        <div className="fab-row">
          <div className="search-bar">
            <IconSearch />
            <input
              placeholder="Search by name, roll no, stop…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16, lineHeight: 1, padding: 0 }}
              >×</button>
            )}
          </div>
          {/* Route filter built from real API data → no more brittle name matching */}
          <select
            className="filter-select"
            value={routeFilter}
            onChange={e => setRouteFilter(e.target.value)}
          >
            <option value="">All Routes</option>
            {routes.map(r => (
              <option key={r._id} value={r._id}>{r.routeId} — {r.name}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            className="fab-btn fab-primary"
            onClick={() => showModal('student', null, fetchStudents)}
          >
            ＋ Add Student
          </button>
        </div>
      </div>
 
      <div className="table-card">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
            Loading students…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
            {hasFilters
              ? <>No students match your filters. <button onClick={() => { setSearch(''); setRouteFilter(''); setStatusFilter(''); }} style={{ background: 'none', border: 'none', color: 'var(--blue2)', cursor: 'pointer', fontWeight: 600 }}>Clear all</button></>
              : 'No students yet. Click + Add Student.'}
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Class</th>
                <th>Route</th>
                <th>Pickup Stop</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s._id}>
                  <td>
                    <span className="ava-sm" style={{ background: getColor(s.name) }}>
                      {initials(s.name)}
                    </span>
                    <strong>{s.name}</strong>
                  </td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 11 }}>{s.rollNo}</td>
                  <td>{s.className || '—'}</td>
                  <td>
                    {s.assignedRoute
                      ? <span className="status-pill sp-blue">{s.assignedRoute.name || s.assignedRoute.routeId}</span>
                      : <span style={{ color: 'var(--muted)' }}>—</span>}
                  </td>
                  <td>{s.pickupStop || '—'}</td>
                  <td>
                    <span className={`status-pill ${statusClass(s.status)}`}>
                      {s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1) : 'Active'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="act-btn"
                      onClick={() => showModal('student', s, fetchStudents)}
                    >Edit</button>
                    <button
                      className="act-btn"
                      style={{ marginLeft: 6, color: 'var(--red)', borderColor: 'rgba(220,38,38,.2)' }}
                      // onClick={async () => {
                      //   if (!window.confirm(`Delete student ${s.name}?`)) return;
                      //   try { await deleteAdminStudent(s._id); fetchStudents(); showToast('Student deleted.'); }
                      //   catch (err) { showToast('Delete failed: ' + err.message); }
                      // }}
                      onClick={() => requestConfirm({
  title: 'Delete Student',
  description: 'Are you sure you want to permanently delete student',
  itemName: s.name,
  onConfirm: async () => {
    await deleteAdminStudent(s._id);
    fetchStudents();
    showToast('Student deleted.');
  },
})}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}



function PageHistory({ showToast }) {
  const [trips, setTrips]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [busFilter, setBusFilter]   = useState('all');
  const [buses, setBuses]       = useState([]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await getTrips(dateFilter, busFilter);
      setTrips(data.trips || []);
    } catch (err) {
      showToast('Failed to load trips: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBuses().then(d => setBuses(d.buses || [])).catch(() => {});
  }, []);

  useEffect(() => { fetchTrips(); }, [dateFilter, busFilter]);

  const filtered = trips.filter(t => {
    const q = search.toLowerCase();
    return !q
      || t.bus?.busNumber?.toLowerCase().includes(q)
      || t.route?.name?.toLowerCase().includes(q)
      || t.driver?.name?.toLowerCase().includes(q);
  });

  const statusClass = s => {
    if (s === 'completed')   return 'sp-green';
    if (s === 'delayed')     return 'sp-red';
    if (s === 'minor_delay') return 'sp-amber';
    if (s === 'incident')    return 'sp-red';
    if (s === 'in_progress') return 'sp-blue';
    return 'sp-gray';
  };

  const statusLabel = s => {
    if (s === 'completed')   return 'Completed';
    if (s === 'delayed')     return 'Delayed';
    if (s === 'minor_delay') return 'Minor Delay';
    if (s === 'incident')    return '⚠ Incident';
    if (s === 'in_progress') return 'In Progress';
    return s;
  };

  const formatTime = d => d ? new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—';
  const formatDelay = (mins, reason) => {
    if (reason) return reason;
    if (!mins)  return '0 min';
    return `+${mins} min`;
  };
  const delayColor = (mins, reason) => {
    if (reason) return 'var(--red)';
    if (!mins)  return 'var(--green)';
    return 'var(--accent)';
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Bus History</div>
          <div className="page-subtitle">Trip logs and journey history</div>
        </div>
        <div className="fab-row">
          <div className="search-bar">
            <IconSearch />
            <input
              placeholder="Search by bus or route..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <input
            type="date"
            className="filter-select"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          />
          <select
            className="filter-select"
            value={busFilter}
            onChange={e => setBusFilter(e.target.value)}
          >
            <option value="all">All Buses</option>
            {buses.map(b => (
              <option key={b._id} value={b._id}>{b.busNumber}</option>
            ))}
          </select>
          <button
            className="fab-btn fab-secondary"
            onClick={() => {
              const csv = [
                ['Bus','Route','Driver','Trip Start','Trip End','Stops','Delay','Status'],
                ...filtered.map(t => [
                  t.bus?.busNumber,
                  t.route?.name,
                  t.driver?.name,
                  formatTime(t.tripStart),
                  formatTime(t.tripEnd),
                  `${t.stopsCompleted}/${t.totalStops}`,
                  formatDelay(t.delayMinutes, t.delayReason),
                  statusLabel(t.status),
                ])
              ].map(r => r.join(',')).join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url  = URL.createObjectURL(blob);
              const a    = document.createElement('a');
              a.href     = url;
              a.download = 'bus_history.csv';
              a.click();
            }}
          >
            ↓ Export CSV
          </button>
        </div>
      </div>

      <div className="history-full">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
            Loading trips...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
            No trip records found.
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Bus</th>
                <th>Route</th>
                <th>Driver</th>
                <th>Trip Start</th>
                <th>Trip End</th>
                <th>Stops Completed</th>
                <th>Delay</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t._id}>
                  <td><strong>{t.bus?.busNumber || '—'}</strong></td>
                  <td>{t.route?.name || '—'}</td>
                  <td>{t.driver?.name || '—'}</td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 11 }}>
                    {formatTime(t.tripStart)}
                  </td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 11 }}>
                    {t.status === 'in_progress' ? 'In Progress' : formatTime(t.tripEnd)}
                  </td>
                  <td>{t.stopsCompleted} / {t.totalStops}</td>
                  <td style={{ color: delayColor(t.delayMinutes, t.delayReason) }}>
                    {formatDelay(t.delayMinutes, t.delayReason)}
                  </td>
                  <td>
                    <span className={`status-pill ${statusClass(t.status)}`}>
                      {statusLabel(t.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


// function PageAnalytics() {
//   const [busData, setBusData] = useState(null);
//   const [routeData, setRouteData] = useState(null);
//   const [studentData, setStudentData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch buses data
//         const busRes = await fetch('http://localhost:8000/api/admin/buses');
//         const busesData = await busRes.json();
        
//         // Fetch routes data
//         const routeRes = await fetch('http://localhost:8000/api/admin/routes');
//         const routesData = await routeRes.json();
        
//         // Fetch students data
//         const studentRes = await fetch('http://localhost:8000/api/admin/students');
//         const studentsData = await studentRes.json();

//         // Process bus data
//         const buses = busesData.buses || [];
//         const activeBuses = buses.filter(b => b.status === 'active').length;
//         const maintenanceBuses = buses.filter(b => b.status === 'maintenance').length;
//         const idleBuses = buses.filter(b => b.status === 'idle').length;

//         setBusData({
//           total: buses.length,
//           active: activeBuses,
//           maintenance: maintenanceBuses,
//           idle: idleBuses,
//           utilization: buses.length > 0 ? Math.round((activeBuses / buses.length) * 100) : 0,
//         });

//         // Process route data
//         const routes = routesData.routes || [];
//         setRouteData({
//           total: routes.length,
//           busesPerRoute: routes.map(r => ({
//             name: r.name,
//             buses: r.assignedBuses?.length || 0,
//           })),
//           avgStopsPerRoute: routes.length > 0 
//             ? Math.round(routes.reduce((sum, r) => sum + (r.stops?.length || 0), 0) / routes.length)
//             : 0,
//         });

//         // Process student data
//         const students = studentsData.students || [];
//         const activeStudents = students.filter(s => s.status === 'active').length;
//         const pendingStudents = students.filter(s => s.status === 'pending').length;

//         setStudentData({
//           total: students.length,
//           active: activeStudents,
//           pending: pendingStudents,
//           inactive: students.length - activeStudents - pendingStudents,
//         });

//         setLoading(false);
//       } catch (err) {
//         console.error('Failed to load analytics:', err);
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   if (loading) {
//     return (
//       <div className="page">
//         <div className="page-header">
//           <div>
//             <div className="page-title">Analytics</div>
//             <div className="page-subtitle">Fleet and operations analytics</div>
//           </div>
//         </div>
//         <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
//           Loading analytics...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <div className="page-title">Analytics</div>
//           <div className="page-subtitle">Fleet and operations overview</div>
//         </div>
//       </div>

//       {/* BUS ANALYTICS */}
//       <div style={{ marginBottom: 20 }}>
//         <div className="page-title" style={{ fontSize: 16, marginBottom: 14 }}>🚌 Bus Fleet Analytics</div>
//         <div className="stat-grid">
//           <div className="stat-card s-blue">
//             <div className="stat-label">Total Buses</div>
//             <div className="stat-val blue">{busData?.total || 0}</div>
//             <div className="stat-sub">Fleet size</div>
//           </div>
//           <div className="stat-card s-green">
//             <div className="stat-label">Active Buses</div>
//             <div className="stat-val green">{busData?.active || 0}</div>
//             <div className="stat-sub">
//               <span className="stat-trend up">{busData?.utilization || 0}%</span> utilization
//             </div>
//           </div>
//           <div className="stat-card s-amber">
//             <div className="stat-label">In Maintenance</div>
//             <div className="stat-val amber">{busData?.maintenance || 0}</div>
//             <div className="stat-sub">Unavailable</div>
//           </div>
//           <div className="stat-card s-purple">
//             <div className="stat-label">Idle Buses</div>
//             <div className="stat-val purple">{busData?.idle || 0}</div>
//             <div className="stat-sub">Not in use</div>
//           </div>
//         </div>
//       </div>

//       {/* ROUTE ANALYTICS */}
//       <div style={{ marginBottom: 20 }}>
//         <div className="page-title" style={{ fontSize: 16, marginBottom: 14 }}>🗺️ Route Analytics</div>
//         <div className="stat-grid">
//           <div className="stat-card s-blue">
//             <div className="stat-label">Total Routes</div>
//             <div className="stat-val blue">{routeData?.total || 0}</div>
//             <div className="stat-sub">Active routes</div>
//           </div>
//           <div className="stat-card s-green">
//             <div className="stat-label">Avg Stops Per Route</div>
//             <div className="stat-val green">{routeData?.avgStopsPerRoute || 0}</div>
//             <div className="stat-sub">Coverage</div>
//           </div>
//         </div>

//         {routeData?.busesPerRoute && routeData.busesPerRoute.length > 0 && (
//           <div className="table-card" style={{ marginTop: 14 }}>
//             <div className="card-header">
//               <span className="card-title">Buses per Route</span>
//             </div>
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Route Name</th>
//                   <th>Assigned Buses</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {routeData.busesPerRoute.map((route, idx) => (
//                   <tr key={idx}>
//                     <td><strong>{route.name}</strong></td>
//                     <td>
//                       <span className="status-pill sp-blue">{route.buses} buses</span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* STUDENT ANALYTICS */}
//       <div>
//         <div className="page-title" style={{ fontSize: 16, marginBottom: 14 }}>👥 Student Analytics</div>
//         <div className="stat-grid">
//           <div className="stat-card s-purple">
//             <div className="stat-label">Total Students</div>
//             <div className="stat-val purple">{studentData?.total || 0}</div>
//             <div className="stat-sub">Enrolled</div>
//           </div>
//           <div className="stat-card s-green">
//             <div className="stat-label">Active Students</div>
//             <div className="stat-val green">{studentData?.active || 0}</div>
//             <div className="stat-sub">Using service</div>
//           </div>
//           <div className="stat-card s-amber">
//             <div className="stat-label">Pending Approval</div>
//             <div className="stat-val amber">{studentData?.pending || 0}</div>
//             <div className="stat-sub">Awaiting verification</div>
//           </div>
//           <div className="stat-card s-blue">
//             <div className="stat-label">Inactive</div>
//             <div className="stat-val blue">{studentData?.inactive || 0}</div>
//             <div className="stat-sub">Not active</div>
//           </div>
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="table-card" style={{ marginTop: 20 }}>
//         <div className="card-header">
//           <span className="card-title">📊 Quick Summary</span>
//         </div>
//         <div style={{ padding: '18px' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13 }}>
//             <div>
//               <div style={{ color: 'var(--muted)', marginBottom: 4 }}>Fleet Efficiency</div>
//               <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--green)' }}>
//                 {busData?.utilization || 0}%
//               </div>
//               <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
//                 Active buses out of total fleet
//               </div>
//             </div>
//             <div>
//               <div style={{ color: 'var(--muted)', marginBottom: 4 }}>Student Coverage</div>
//               <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue2)' }}>
//                 {studentData?.total || 0}
//               </div>
//               <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
//                 Students enrolled in bus service
//               </div>
//             </div>
//             <div>
//               <div style={{ color: 'var(--muted)', marginBottom: 4 }}>Network Reach</div>
//               <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>
//                 {routeData?.total || 0} Routes
//               </div>
//               <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
//                 Covering {routeData?.avgStopsPerRoute || 0} stops average
//               </div>
//             </div>
//             <div>
//               <div style={{ color: 'var(--muted)', marginBottom: 4 }}>Maintenance Status</div>
//               <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--red)' }}>
//                 {busData?.maintenance || 0}
//               </div>
//               <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
//                 Buses in maintenance
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



function PageAnalytics() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await getAdminAnalytics();
        setData(res);
      } catch (err) {
        setError(err.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <div className="page-title">Analytics</div>
            <div className="page-subtitle">Fleet and operations analytics</div>
          </div>
        </div>
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
          Loading analytics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <div className="page-title">Analytics</div>
            <div className="page-subtitle">Fleet and operations analytics</div>
          </div>
        </div>
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--red)' }}>
          ⚠️ {error}
        </div>
      </div>
    );
  }

  const { buses, routes, students, drivers } = data;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Analytics</div>
          <div className="page-subtitle">Fleet and operations overview</div>
        </div>
      </div>

      {/* BUS ANALYTICS */}
      <div style={{ marginBottom: 20 }}>
        <div className="page-title" style={{ fontSize: 16, marginBottom: 14 }}>🚌 Bus Fleet Analytics</div>
        <div className="stat-grid">
          <div className="stat-card s-blue">
            <div className="stat-label">Total Buses</div>
            <div className="stat-val blue">{buses.total}</div>
            <div className="stat-sub">Fleet size</div>
          </div>
          <div className="stat-card s-green">
            <div className="stat-label">Active Buses</div>
            <div className="stat-val green">{buses.active}</div>
            <div className="stat-sub"><span className="stat-trend up">{buses.utilization}%</span> utilization</div>
          </div>
          <div className="stat-card s-amber">
            <div className="stat-label">In Maintenance</div>
            <div className="stat-val amber">{buses.maintenance}</div>
            <div className="stat-sub">Unavailable</div>
          </div>
          <div className="stat-card s-purple">
            <div className="stat-label">Idle Buses</div>
            <div className="stat-val purple">{buses.idle}</div>
            <div className="stat-sub">Not in use</div>
          </div>
        </div>
      </div>

      {/* ROUTE ANALYTICS */}
      <div style={{ marginBottom: 20 }}>
        <div className="page-title" style={{ fontSize: 16, marginBottom: 14 }}>🗺️ Route Analytics</div>
        <div className="stat-grid">
          <div className="stat-card s-blue">
            <div className="stat-label">Total Routes</div>
            <div className="stat-val blue">{routes.total}</div>
            <div className="stat-sub">Active routes</div>
          </div>
          <div className="stat-card s-green">
            <div className="stat-label">Avg Stops Per Route</div>
            <div className="stat-val green">{routes.avgStopsPerRoute}</div>
            <div className="stat-sub">Coverage</div>
          </div>
        </div>

        {routes.busesPerRoute.length > 0 && (
          <div className="table-card" style={{ marginTop: 14 }}>
            <div className="card-header"><span className="card-title">Buses per Route</span></div>
            <table className="data-table">
              <thead><tr><th>Route Name</th><th>Assigned Buses</th></tr></thead>
              <tbody>
                {routes.busesPerRoute.map((route, idx) => (
                  <tr key={idx}>
                    <td><strong>{route.routeId} — {route.name}</strong></td>
                    <td><span className="status-pill sp-blue">{route.buses} buses</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STUDENT ANALYTICS */}
      <div style={{ marginBottom: 20 }}>
        <div className="page-title" style={{ fontSize: 16, marginBottom: 14 }}>👥 Student Analytics</div>
        <div className="stat-grid">
          <div className="stat-card s-purple"><div className="stat-label">Total Students</div><div className="stat-val purple">{students.total}</div><div className="stat-sub">Enrolled</div></div>
          <div className="stat-card s-green"><div className="stat-label">Active Students</div><div className="stat-val green">{students.active}</div><div className="stat-sub">Using service</div></div>
          <div className="stat-card s-amber"><div className="stat-label">Pending Approval</div><div className="stat-val amber">{students.pending}</div><div className="stat-sub">Awaiting verification</div></div>
          <div className="stat-card s-blue"><div className="stat-label">Inactive</div><div className="stat-val blue">{students.inactive}</div><div className="stat-sub">Not active</div></div>
        </div>
      </div>

      {/* DRIVER ANALYTICS — new, now that the data's already in the same call */}
      <div style={{ marginBottom: 20 }}>
        <div className="page-title" style={{ fontSize: 16, marginBottom: 14 }}>🧑‍✈️ Driver Analytics</div>
        <div className="stat-grid">
          <div className="stat-card s-blue"><div className="stat-label">Total Drivers</div><div className="stat-val blue">{drivers.total}</div><div className="stat-sub">Registered</div></div>
          <div className="stat-card s-green"><div className="stat-label">Active Drivers</div><div className="stat-val green">{drivers.active}</div><div className="stat-sub">On duty</div></div>
          <div className="stat-card s-amber"><div className="stat-label">On Leave</div><div className="stat-val amber">{drivers.onLeave}</div><div className="stat-sub">Temporarily out</div></div>
          <div className="stat-card s-purple"><div className="stat-label">Inactive</div><div className="stat-val purple">{drivers.inactive}</div><div className="stat-sub">Not assigned</div></div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="table-card" style={{ marginTop: 20 }}>
        <div className="card-header"><span className="card-title">📊 Quick Summary</span></div>
        <div style={{ padding: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13 }}>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: 4 }}>Fleet Efficiency</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--green)' }}>{buses.utilization}%</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Active buses out of total fleet</div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: 4 }}>Student Coverage</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue2)' }}>{students.total}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Students enrolled in bus service</div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: 4 }}>Network Reach</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>{routes.total} Routes</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Covering {routes.avgStopsPerRoute} stops average</div>
            </div>
            <div>
              <div style={{ color: 'var(--muted)', marginBottom: 4 }}>Maintenance Status</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--red)' }}>{buses.maintenance}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Buses in maintenance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// function PageProfile({ showToast }) {
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState("Admin User");
//   const [email, setEmail] = useState("admin@school.edu");
//   const [phone, setPhone] = useState("+91 98765 00001");
//   const [dept, setDept] = useState("Transport Management");
//   const handleSave = () => { setEditing(false); showToast("Profile updated successfully!"); };
//   const activities = [
//     { dot:"var(--green)",  text:"Added new bus KA-09-I to Route D",           time:"Today, 09:22 AM" },
//     { dot:"var(--accent)", text:"Updated driver P. Sharma's route assignment",  time:"Today, 08:45 AM" },
//     { dot:"var(--blue2)",  text:"Generated April analytics report",             time:"Yesterday, 05:10 PM" },
//     { dot:"var(--purple)", text:"Created Route E — East Extension",             time:"Apr 19, 03:40 PM" },
//     { dot:"var(--red)",    text:"Resolved bus KA-05-E engine warning",          time:"Apr 19, 11:15 AM" },
//     { dot:"var(--green)",  text:"Added 12 new students to Route B",             time:"Apr 18, 02:30 PM" },
//   ];
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">My Profile</div><div className="page-subtitle">Manage your account and preferences</div></div>
//         {!editing
//           ? <button className="fab-btn fab-secondary" onClick={() => setEditing(true)}>✎ Edit Profile</button>
//           : <div className="fab-row"><button className="fab-btn fab-secondary" onClick={() => setEditing(false)}>Cancel</button><button className="fab-btn fab-primary" onClick={handleSave}>Save Changes</button></div>
//         }
//       </div>
//       <div className="profile-grid">
//         <div className="profile-card">
//           <div className="profile-avatar-lg">AD</div>
//           <div className="profile-name">{name}</div>
//           <div className="profile-role"><span className="status-pill sp-amber">Super Admin</span></div>
//           <div className="profile-divider" />
//           <div className="profile-stat-row">
//             <div className="profile-stat"><div className="profile-stat-val">23</div><div className="profile-stat-lbl">Buses</div></div>
//             <div className="profile-stat"><div className="profile-stat-val">21</div><div className="profile-stat-lbl">Drivers</div></div>
//             <div className="profile-stat"><div className="profile-stat-val">4</div><div className="profile-stat-lbl">Routes</div></div>
//           </div>
//           <div className="profile-divider" />
//           <div style={{ width: "100%", fontSize: 12, color: "var(--muted)", lineHeight: 1.8 }}>
//             <div style={{ display: "flex", justifyContent: "space-between" }}><span>Member since</span><span style={{ color: "var(--text)", fontWeight: 600 }}>Jan 2024</span></div>
//             <div style={{ display: "flex", justifyContent: "space-between" }}><span>Last login</span><span style={{ color: "var(--text)", fontWeight: 600 }}>Today, 08:02 AM</span></div>
//             <div style={{ display: "flex", justifyContent: "space-between" }}><span>Sessions</span><span style={{ color: "var(--text)", fontWeight: 600 }}>Active</span></div>
//           </div>
//         </div>
//         <div className="profile-info-card">
//           <div className="profile-section">
//             <div className="profile-section-title">Personal Information</div>
//             <div className="profile-field-row">
//               <div className="profile-field"><label>Full Name</label>{editing ? <input value={name} onChange={e => setName(e.target.value)} /> : <div className="field-val">{name}</div>}</div>
//               <div className="profile-field"><label>Email</label>{editing ? <input value={email} onChange={e => setEmail(e.target.value)} /> : <div className="field-val">{email}</div>}</div>
//               <div className="profile-field"><label>Phone</label>{editing ? <input value={phone} onChange={e => setPhone(e.target.value)} /> : <div className="field-val">{phone}</div>}</div>
//               <div className="profile-field"><label>Department</label>{editing ? <input value={dept} onChange={e => setDept(e.target.value)} /> : <div className="field-val">{dept}</div>}</div>
//             </div>
//           </div>
//           <div className="profile-section" style={{ borderTop: "1px solid var(--border)" }}>
//             <div className="profile-section-title">Security</div>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
//               <div><div style={{ fontSize: 13, fontWeight: 600 }}>Password</div><div style={{ fontSize: 11.5, color: "var(--muted)" }}>Last changed 3 months ago</div></div>
//               <button className="fab-btn fab-secondary" style={{ padding: "6px 14px", fontSize: 12 }}>Change Password</button>
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
//               <div><div style={{ fontSize: 13, fontWeight: 600 }}>Two-Factor Authentication</div><div style={{ fontSize: 11.5, color: "var(--muted)" }}>Protect your account with 2FA</div></div>
//               <span className="status-pill sp-green" style={{ fontSize: 10 }}>Enabled</span>
//             </div>
//           </div>
//           <div className="profile-section" style={{ borderTop: "1px solid var(--border)", paddingBottom: 0 }}>
//             <div className="profile-section-title">Recent Activity</div>
//           </div>
//           <div className="activity-list">
//             {activities.map((a, i) => (
//               <div className="activity-item" key={i}>
//                 <div className="activity-dot" style={{ background: a.dot }} />
//                 <div><div className="activity-text">{a.text}</div><div className="activity-time">{a.time}</div></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function ModalChangePassword({ onClose, showToast }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [showCurrent, setShowCurrent] = useState(false);   // ← add
  const [showNew, setShowNew]         = useState(false);   // ← add
  const [showConfirm, setShowConfirm] = useState(false);   // ← add
  
  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.'); return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.'); return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.'); return;
    }
    setSaving(true); setError('');
    try {
      await changeAdminPassword({ currentPassword, newPassword, confirmPassword });
      showToast('Password changed successfully!');
      onClose();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>🔒 Change Password</h3>
        <p style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 18 }}>
          Enter your current and new password below.
        </p>

        {error && (
          <div style={{ background: '#fff0f0', border: '1px solid #fcc', borderRadius: 8, padding: '8px 12px', fontSize: 12.5, color: '#c00', marginBottom: 12 }}>
            ⚠️ {error}
          </div>
        )}
        <div className="form-row">
          <label className="form-label">Current Password</label>
          <div style={{ position: 'relative' }}>
            <input className="form-input" type={showCurrent ? 'text' : 'password'}
              placeholder="Current Password" value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              style={{ paddingRight: 38 }} />
            <button type="button" onClick={() => setShowCurrent(p => !p)}
              style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                background:'none', border:'none', cursor:'pointer', color:'var(--muted)', fontSize:16 }}>
              {showCurrent ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">New Password</label>
          <div style={{ position: 'relative' }}>
            <input className="form-input" type={showNew ? 'text' : 'password'}
              placeholder="New Password" value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              style={{ paddingRight: 38 }} />
            <button type="button" onClick={() => setShowNew(p => !p)}
              style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                background:'none', border:'none', cursor:'pointer', color:'var(--muted)', fontSize:16 }}>
              {showNew ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Confirm New Password</label>
          <div style={{ position: 'relative' }}>
            <input className="form-input" type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm New Password" value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              style={{ paddingRight: 38 }} />
            <button type="button" onClick={() => setShowConfirm(p => !p)}
              style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                background:'none', border:'none', cursor:'pointer', color:'var(--muted)', fontSize:16 }}>
              {showConfirm ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="btn-save" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Updating…' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  );
}

function PageProfile({ showToast }) {
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [adminId, setAdminId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activities, setActivities] = useState([]);

//   const getRecentActivity = async () => {
//   try {
//     const res = await fetch('/api/admin/activity', {
//       headers: { Authorization: `Bearer ${token}` }, // use however you pass your token
//     });
//     const data = await res.json();
//     if (data.success) setActivities(data.activities);
//   } catch (err) {
//     console.error('Failed to fetch activity:', err);
//   }
// };

// // REPLACE with this (matches your adminService pattern):
// const getRecentActivity = async () => {
//   try {
//     const data = await getAdminAnalytics(); // temporary, see note below
//   } catch (err) {
//     console.error('Failed to fetch activity:', err);
//   }
// };
// const getRecentActivity = async () => {
//   try {
//     const data = await getAdminActivity();
//     if (data.success) setActivities(data.activities || []);
//   } catch (err) {
//     console.error('Failed to fetch activity:', err);
//   }
// };
const getRecentActivity = async () => {
  try {
    const data = await getAdminActivity();
    if (data.success) setActivities(data.activities || []);
  } catch (err) {
    console.warn('Activity fetch skipped:', err.message);
    setActivities([]); // fail silently, show empty list
  }
};
  // Fetch admin profile on mount
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        setLoading(true);
        const data = await getAdminProfile();
        
        if (data.admin) {
          setAdminId(data.admin._id);
          setName(data.admin.name || "");
          setEmail(data.admin.email || "");
          //setPhone(data.admin.phone || "");
          //setDept(data.admin.department || "");
        }
      } catch (err) {
        console.error('Failed to load admin profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

//   useEffect(() => {
//   getRecentActivity()
//     .then(res => setActivities(res.activities || []))
//     .catch(() => {});
// }, []);

useEffect(() => {
  getRecentActivity();
}, []);

  // Save profile changes
  const handleSave = async () => {
    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    setSaving(true);
    setError("");
    
    try {
      await updateAdminProfile({
        name,
        email,
        //phone,
        //department: dept,
      });
      
      setEditing(false);
      showToast("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <div className="page-title">My Profile</div>
            <div className="page-subtitle">Loading...</div>
          </div>
        </div>
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
          Loading your profile...
        </div>
      </div>
    );
  }

  // const activities = [
  //   { dot:"var(--green)",  text:"Added new bus KA-09-I to Route D",           time:"Today, 09:22 AM" },
  //   { dot:"var(--accent)", text:"Updated driver P. Sharma's route assignment",  time:"Today, 08:45 AM" },
  //   { dot:"var(--blue2)",  text:"Generated April analytics report",             time:"Yesterday, 05:10 PM" },
  //   { dot:"var(--purple)", text:"Created Route E — East Extension",             time:"Apr 19, 03:40 PM" },
  //   { dot:"var(--red)",    text:"Resolved bus KA-05-E engine warning",          time:"Apr 19, 11:15 AM" },
  //   { dot:"var(--green)",  text:"Added 12 new students to Route B",             time:"Apr 18, 02:30 PM" },
  // ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">My Profile</div>
          <div className="page-subtitle">Manage your account and preferences</div>
        </div>
        {!editing
          ? <button className="fab-btn fab-secondary" onClick={() => setEditing(true)}>✎ Edit Profile</button>
          : <div className="fab-row">
              <button className="fab-btn fab-secondary" onClick={() => setEditing(false)} disabled={saving}>Cancel</button>
              <button className="fab-btn fab-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
        }
      </div>

      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #fcc', borderRadius: 8, padding: '12px 16px', fontSize: 12.5, color: '#c00', marginBottom: 16 }}>
          ⚠️ {error}
        </div>
      )}

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-avatar-lg">{name.slice(0, 2).toUpperCase() || 'AD'}</div>
          <div className="profile-name">{name || 'Admin User'}</div>
          <div className="profile-role"><span className="status-pill sp-amber">Super Admin</span></div>
          <div className="profile-divider" />
          <div className="profile-stat-row">
            <div className="profile-stat"><div className="profile-stat-val">23</div><div className="profile-stat-lbl">Buses</div></div>
            <div className="profile-stat"><div className="profile-stat-val">21</div><div className="profile-stat-lbl">Drivers</div></div>
            <div className="profile-stat"><div className="profile-stat-val">4</div><div className="profile-stat-lbl">Routes</div></div>
          </div>
          <div className="profile-divider" />
          <div style={{ width: "100%", fontSize: 12, color: "var(--muted)", lineHeight: 1.8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Member since</span><span style={{ color: "var(--text)", fontWeight: 600 }}>Jan 2024</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Last login</span><span style={{ color: "var(--text)", fontWeight: 600 }}>Today, 08:02 AM</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Sessions</span><span style={{ color: "var(--text)", fontWeight: 600 }}>Active</span></div>
          </div>
        </div>
        <div className="profile-info-card">
          <div className="profile-section">
            <div className="profile-section-title">Personal Information</div>
            <div className="profile-field-row">
              <div className="profile-field">
                <label>Full Name</label>
                {editing ? (
                  <input 
                    className="form-input"
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                  />
                ) : (
                  <div className="field-val">{name || '—'}</div>
                )}
              </div>
              <div className="profile-field">
                <label>Email</label>
                {editing ? (
                  <input 
                    className="form-input"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                  />
                ) : (
                  <div className="field-val">{email || '—'}</div>
                )}
              </div>
            </div>
          </div>
          <div className="profile-section" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="profile-section-title">Security</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>Password</div><div style={{ fontSize: 11.5, color: "var(--muted)" }}>Last changed 3 months ago</div></div>
              <button className="fab-btn fab-secondary" style={{ padding: "6px 14px", fontSize: 12 }}
                onClick={() => setShowChangePwd(true)}>
                Change Password
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>Two-Factor Authentication</div><div style={{ fontSize: 11.5, color: "var(--muted)" }}>Protect your account with 2FA</div></div>
              <span className="status-pill sp-green" style={{ fontSize: 10 }}>Enabled</span>
            </div>
          </div>
          <div className="profile-section" style={{ borderTop: "1px solid var(--border)", paddingBottom: 0 }}>
            <div className="profile-section-title">Recent Activity</div>
          </div>
          <div className="activity-list">
            {activities.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-dot" style={{ background: a.dot }} />
                <div><div className="activity-text">{a.text}</div><div className="activity-time">
  {new Date(a.time).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
        {showChangePwd && (
          <ModalChangePassword
            onClose={() => setShowChangePwd(false)}
            showToast={showToast}
          />
        )}
    </div>
  );
}


/* ─── MAIN APP ─────────────────────────────────────────────────────────── */
export default function BusNavDashboard() {
  
  const navigate = useNavigate(); 
  const [activePage, setActivePage] = useState("dashboard");
  //const [modal, setModal] = useState(null);
  const [modal, setModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalRefresh, setModalRefresh] = useState(null);
  const [toast, setToast] = useState(null);
  const [clock, setClock] = useState("");
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const toastTimer = useRef(null);
  //const [confirmConfig, setConfirmConfig] = useState(null);
  //const requestConfirm = (config) => setConfirmConfig(config);

  const [adminName, setAdminName] = useState("");
  const [confirmConfig, setConfirmConfig] = useState(null);
  const requestConfirm = (config) => setConfirmConfig(config);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    tick(); const t = setInterval(tick, 1000); return () => clearInterval(t);
  }, []);

  useEffect(() => {
  getAdminProfile()
    .then(data => {
      if (data && data.admin && data.admin.name) {
        setAdminName(data.admin.name);
      }
    })
    .catch(() => {});
}, []);

  const showToast = (msg) => { setToast(msg); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(null), 2800); };
  //const showModal = (type) => setModal(type);
  //const hideModal = () => setModal(null);
  //const saveAndClose = (msg) => { hideModal(); showToast(msg); };
  const showModal = (type, data = null, refreshFn = null) => {
    setModal(type);
    setModalData(data);
    setModalRefresh(() => refreshFn);
  };
  const hideModal = () => {
    setModal(null);
    setModalData(null);
    setModalRefresh(null);
  };
  const saveAndClose = (msg) => {
    hideModal();
    showToast(msg);
    if (modalRefresh) modalRefresh();
  };
  const unreadCount = notifs.filter(n => !n.read).length;

  // Bell click → always navigate to notifications page
  const handleBellNav = () => setActivePage("notifications");

  const navSections = [
    { label: "Overview", items: [
      { id: "dashboard", icon: <IconDash />,   label: "Dashboard" },
      { id: "tracking",  icon: <IconClock />,  label: "Live Tracking", badge: "3", warn: true },
    ]},
    { label: "Management", items: [
      { id: "buses",    icon: <IconBus />,    label: "Buses" },
      { id: "drivers",  icon: <IconUser />,   label: "Drivers" },
      { id: "routes",   icon: <IconRoute />,  label: "Routes" },
      { id: "students", icon: <IconPeople />, label: "Students" },
    ]},
    { label: "Analytics", items: [
      { id: "analytics",     icon: <IconBar />,  label: "Analytics" },
      { id: "history",       icon: <IconFile />, label: "Bus History" },
      // ← Notifications now lives here as a proper page, just like the student app
      { id: "notifications", icon: <IconBell />, label: "Notifications", badge: unreadCount > 0 ? String(unreadCount) : null },
    ]},
    { label: "Account", items: [
      { id: "profile", icon: <IconProfile />, label: "My Profile" },
    ]},
  ];

  const pageLabels = {
    dashboard:"Dashboard", tracking:"Live Tracking", buses:"Buses", drivers:"Drivers",
    routes:"Routes", students:"Students", analytics:"Analytics", history:"Bus History",
    notifications:"Notifications", profile:"My Profile"
  };

  // const handleLogout = () => { showToast("Logged out successfully!"); setTimeout(() => setActivePage("dashboard"), 1200); };
  const handleLogout = () => {
  clearSession();                          // clears the saved token
  showToast("Logged out successfully!");
  setTimeout(() => {
    navigate('/admin/login');              // redirect to login
  }, 1200);
};

  const renderPage = () => {
    switch (activePage) {
      //case "dashboard":     return <PageDashboard showModal={showModal} unreadCount={unreadCount} onBellClick={handleBellNav} />;
      case "dashboard":     return <PageDashboard showModal={showModal} unreadCount={unreadCount} onBellClick={handleBellNav} onNavigate={setActivePage} />;
      case "tracking":      return <PageTracking showToast={showToast} />;
      //case "buses":         return <PageBuses showModal={showModal} />;
      //case "drivers":       return <PageDrivers showModal={showModal} />;
      //case "routes":        return <PageRoutes showModal={showModal} />;
      //case "students":      return <PageStudents showModal={showModal} />;
      case "buses":         return <PageBuses showModal={showModal} showToast={showToast} requestConfirm={requestConfirm}/>;
      case "drivers":       return <PageDrivers showModal={showModal} showToast={showToast} requestConfirm={requestConfirm}/>;
      case "routes":        return <PageRoutes showModal={showModal} showToast={showToast} requestConfirm={requestConfirm}/>;
      case "students":      return <PageStudents showModal={showModal} showToast={showToast} requestConfirm={requestConfirm}/>;
      case "analytics":     return <PageAnalytics />;
      //case "history":       return <PageHistory />;
      case "history": return <PageHistory showToast={showToast} />;
      case "notifications": return <PageNotifications notifs={notifs} setNotifs={setNotifs} />;
      case "profile":       return <PageProfile showToast={showToast} />;
      default:              return <PageDashboard showModal={showModal} unreadCount={unreadCount} onBellClick={handleBellNav} />;
    }
  };


  const renderModal = () => {
    if (!modal) return null;
    const props = { onClose: hideModal, onSave: saveAndClose, editData: modalData };
    const map = {
      bus:     <ModalBus     {...props} />,
      driver:  <ModalDriver  {...props} />,
      route:   <ModalRoute   {...props} />,
      student: <ModalStudent {...props} />,
    };
    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && hideModal()}>
        {map[modal]}
      </div>
    );
  };
  return (
    <>
      <style>{css}</style>
      <div className="layout">
        {/* TOPBAR */}
        <div className="topbar">
          <div className="logo">
            <div className="logo-icon"><BusLogo /></div>
            BusNav Admin
          </div>
          <div className="spacer" />
          <div className="breadcrumb">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
            <span>{pageLabels[activePage]}</span>
          </div>
          <div className="spacer" />
          <div className="topbar-right">
            <div className="topbar-time">{clock}</div>
            <div
              className={`badge-notif${activePage === 'notifications' ? ' active-bell' : ''}`}
              title={`${unreadCount} unread notifications`}
              onClick={handleBellNav}
            >
              <svg width="15" height="15" fill="none" stroke="var(--muted)" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {unreadCount > 0 && <span className="dot" />}
            </div>
            

            <div 
              className="avatar" 
              title="My Profile" 
              onClick={() => setActivePage("profile")}
              style={{ cursor: 'pointer' }}
            >
              {adminName ? adminName.charAt(0).toUpperCase() : 'AD'}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="body-wrap">
          {/* LEFT SIDEBAR NAV */}
          <div className="sidebar">
            {navSections.map(s => (
              <div className="nav-section" key={s.label}>
                <div className="nav-label">{s.label}</div>
                {s.items.map(it => (
                  <button
                    key={it.id}
                    className={`nav-item${activePage === it.id ? " active" : ""}`}
                    onClick={() => setActivePage(it.id)}
                  >
                    {it.icon} {it.label}
                    {it.badge && (
                      <span className={`nav-badge${it.warn ? " warn" : ""}`}>{it.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
            <div className="sidebar-bottom">
              <button className="nav-item" style={{ color: "#64748b" }} onClick={handleLogout}>
                <IconLogout /> Logout
              </button>
            </div>
            {/* <div className="sidebar-bottom">
              <button className="nav-item" style={{color:'#64748b'}} onClick={() => navigate('/')}><IconLogout/> Logout</button>
            </div> */}
          </div>

          {/* MAIN PAGE CONTENT */}
          <div className="main">
            {renderPage()}
          </div>
        </div>
      </div>

      {renderModal()}
      {confirmConfig && (
  <ConfirmDeleteModal
    config={confirmConfig}
    onCancel={() => setConfirmConfig(null)}
  />
)}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}