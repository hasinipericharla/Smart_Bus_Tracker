// export default function AdminDashboard() {
//   return <h1 style={{textAlign:'center',marginTop:'40vh',color:'#1B2B4B'}}>Admin Dashboard — Coming Soon!</h1>
// }
import { useState, useEffect, useRef } from "react";

/* ─── CSS ─────────────────────────────────────────────────────────────── */
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
/* TOPBAR */
.topbar{height:58px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:12px;position:sticky;top:0;z-index:100;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.logo{display:flex;align-items:center;gap:9px;font-weight:700;font-size:15px;letter-spacing:-.2px;color:var(--text)}
.logo-icon{width:34px;height:34px;background:var(--accent);border-radius:9px;display:flex;align-items:center;justify-content:center}
.logo-icon svg{width:18px;height:18px;fill:#1a1a1a}
.topbar .spacer{flex:1}
.topbar-right{display:flex;align-items:center;gap:14px}
.badge-notif{position:relative;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#f8fafc;border:1px solid var(--border);transition:background .15s}
.badge-notif:hover{background:#f1f5f9}
.badge-notif .dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--red);border-radius:50%;border:2px solid #fff}
.avatar{width:32px;height:32px;background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#1a1a1a;cursor:pointer}
.topbar-time{font-size:12.5px;color:var(--muted);font-family:'DM Mono',monospace;background:#f8fafc;padding:4px 10px;border-radius:6px;border:1px solid var(--border)}
.breadcrumb{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px}
.breadcrumb span{color:var(--text);font-weight:500}
/* BODY */
.body-wrap{display:flex;flex:1}
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
/* MAIN */
.main{flex:1;overflow-y:auto;background:#f1f5f9}
.page{padding:22px 26px;display:flex;flex-direction:column;gap:18px;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
/* PAGE HEADER */
.page-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.page-title{font-size:20px;font-weight:700;letter-spacing:-.3px}
.page-subtitle{font-size:12.5px;color:var(--muted);margin-top:2px}
/* FAB */
.fab-row{display:flex;gap:8px;flex-wrap:wrap}
.fab-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:'DM Sans',sans-serif}
.fab-primary{background:var(--accent);color:#1a1a1a}
.fab-primary:hover{background:var(--accent2);transform:translateY(-1px);box-shadow:0 4px 12px rgba(245,166,35,.35)}
.fab-secondary{background:#fff;color:var(--text);border:1px solid var(--border)}
.fab-secondary:hover{background:#f1f5f9}
.fab-danger{background:rgba(220,38,38,.08);color:var(--red);border:1px solid rgba(220,38,38,.2)}
.fab-danger:hover{background:rgba(220,38,38,.14)}
/* STAT CARDS */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.stat-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;position:relative;overflow:hidden;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.stat-card:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
.stat-card::after{content:'';position:absolute;top:-10px;right:-10px;width:70px;height:70px;border-radius:50%;opacity:.08}
.stat-card.s-green::after{background:var(--green)}
.stat-card.s-amber::after{background:var(--accent)}
.stat-card.s-blue::after{background:var(--blue)}
.stat-card.s-purple::after{background:var(--purple)}
.stat-label{font-size:10.5px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
.stat-val{font-size:30px;font-weight:700;line-height:1;letter-spacing:-1px}
.stat-val.green{color:var(--green)} .stat-val.amber{color:var(--accent)} .stat-val.blue{color:var(--blue2)} .stat-val.purple{color:var(--purple)}
.stat-sub{font-size:11.5px;color:var(--muted);margin-top:8px;display:flex;align-items:center;gap:5px}
.stat-trend{font-size:10.5px;padding:2px 7px;border-radius:6px;font-weight:700}
.stat-trend.up{background:rgba(22,163,74,.1);color:var(--green)}
.stat-trend.down{background:rgba(220,38,38,.1);color:var(--red)}
/* CARDS */
.mid-row{display:grid;grid-template-columns:1fr 320px;gap:14px}
.map-card,.alerts-card,.table-card,.route-card{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.card-header{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid var(--border);background:#f8fafc}
.card-title{font-size:13.5px;font-weight:600;color:var(--text)}
.card-sub{font-size:11.5px;color:var(--muted)}
.ch-right{margin-left:auto;display:flex;align-items:center;gap:8px}
.pill{font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid transparent;background:none;font-family:'DM Sans',sans-serif}
.pill.active{background:var(--accent);color:#1a1a1a;border-color:var(--accent)}
.pill.passive{background:#f1f5f9;color:var(--muted);border-color:var(--border)}
.pill.passive:hover{background:#e2e8f0;color:var(--text)}
/* MAP */
.map-body{height:250px;background:#eef4fb;position:relative;overflow:hidden}
.map-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,139,212,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,139,212,.1) 1px,transparent 1px);background-size:36px 36px}
.map-road{position:absolute;background:rgba(148,163,184,.3);border-radius:2px}
.bus-dot{position:absolute;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:800;cursor:pointer;transition:transform .2s;z-index:2}
.bus-dot:hover{transform:scale(1.35)!important}
.bus-dot.on-time{background:var(--green);color:#fff;animation:pulseGreen 2s infinite}
.bus-dot.delayed{background:var(--accent);color:#1a1a1a;animation:pulseAmber 2s infinite}
.bus-dot.idle{background:#3a4a60;color:#94a3b8;box-shadow:0 0 0 4px rgba(58,74,96,.3)}
@keyframes pulseGreen{0%,100%{box-shadow:0 0 0 3px rgba(61,200,122,.25)}50%{box-shadow:0 0 0 8px rgba(61,200,122,.06)}}
@keyframes pulseAmber{0%,100%{box-shadow:0 0 0 3px rgba(245,166,35,.25)}50%{box-shadow:0 0 0 8px rgba(245,166,35,.06)}}
.stop-dot{position:absolute;width:7px;height:7px;background:#cbd5e1;border:2px solid #94a3b8;border-radius:50%;z-index:1}
.route-line-h{position:absolute;height:3px;border-radius:2px;z-index:0}
.map-legend{display:flex;align-items:center;gap:16px;padding:10px 18px;border-top:1px solid var(--border);background:#f8fafc}
.legend-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
.legend-dot{width:8px;height:8px;border-radius:50%}
/* ALERTS */
.alerts-card{display:flex;flex-direction:column}
.alert-item{display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s}
.alert-item:last-child{border-bottom:none}
.alert-item:hover{background:#f8fafc}
.alert-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;margin-top:1px}
.alert-icon.warn{background:rgba(245,166,35,.12);color:var(--accent2)}
.alert-icon.err{background:rgba(220,38,38,.1);color:var(--red)}
.alert-icon.ok{background:rgba(22,163,74,.1);color:var(--green)}
.alert-text{font-size:12px;line-height:1.5;flex:1;color:var(--text)}
.alert-text strong{font-weight:600}
.alert-text span{color:var(--muted)}
.alert-time{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:2px}
/* BOTTOM ROW */
.bot-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.data-table{width:100%;border-collapse:collapse}
.data-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;padding:10px 16px;text-align:left;border-bottom:1px solid var(--border);background:#f8fafc}
.data-table td{padding:10px 16px;font-size:12.5px;border-bottom:1px solid var(--border);vertical-align:middle;color:var(--text)}
.data-table tr:last-child td{border-bottom:none}
.data-table tr:hover td{background:#f8fafc}
.status-pill{font-size:10px;padding:3px 9px;border-radius:8px;font-weight:700;display:inline-block}
.sp-green{background:rgba(61,200,122,.12);color:var(--green)}
.sp-amber{background:rgba(245,166,35,.12);color:var(--accent)}
.sp-gray{background:rgba(122,143,170,.1);color:var(--muted)}
.sp-red{background:rgba(224,82,82,.12);color:var(--red)}
.sp-blue{background:rgba(59,139,212,.12);color:var(--blue2)}
.sp-purple{background:rgba(165,110,245,.12);color:var(--purple)}
.ava-sm{width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#fff;margin-right:6px;vertical-align:middle;flex-shrink:0}
.act-btn{background:#f8fafc;border:1px solid var(--border);color:var(--muted);border-radius:7px;padding:4px 10px;font-size:11px;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif}
.act-btn:hover{border-color:var(--accent);color:var(--accent2)}
/* ROUTES */
.route-list{padding:6px 0}
.route-item{display:flex;align-items:center;gap:12px;padding:10px 18px;cursor:pointer;transition:background .15s;border-left:2px solid transparent}
.route-item:hover{background:#f8fafc}
.route-item.active-route{background:rgba(245,166,35,.06);border-left-color:var(--accent)}
.route-circle{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0}
.rc-a{background:rgba(37,99,235,.12);color:var(--blue2)}
.rc-b{background:rgba(22,163,74,.12);color:var(--green)}
.rc-c{background:rgba(245,166,35,.15);color:var(--accent2)}
.rc-d{background:rgba(124,58,237,.12);color:var(--purple)}
.route-info{flex:1}
.route-name{font-size:13px;font-weight:600;color:var(--text)}
.route-meta{font-size:11px;color:var(--muted);margin-top:1px}
.route-bar-wrap{width:80px}
.route-bar-bg{height:4px;background:#e2e8f0;border-radius:4px;overflow:hidden}
.route-bar-fill{height:100%;border-radius:4px;transition:width .4s ease}
.history-strip{border-top:1px solid var(--border);padding:14px 18px;background:#f8fafc}
.history-label{font-size:10.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:9px}
.history-bars{display:flex;gap:4px;align-items:flex-end;height:32px}
.history-bar{flex:1;border-radius:3px 3px 0 0}
.history-times{display:flex;justify-content:space-between;margin-top:5px;font-size:10px;color:var(--muted);font-family:'DM Mono',monospace}
/* TRACKING */
.tracking-grid{display:grid;grid-template-columns:1fr 300px;gap:14px}
.map-large{height:420px;background:#eef4fb;border-radius:13px;border:1px solid var(--border);position:relative;overflow:hidden}
.bus-detail-panel{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.bus-detail-item{padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s;display:flex;align-items:center;gap:10px;border-left:2px solid transparent}
.bus-detail-item:hover{background:#f8fafc}
.bus-detail-item.selected{background:rgba(245,166,35,.06);border-left-color:var(--accent)}
.bdi-num{font-size:13px;font-weight:700}
.bdi-route{font-size:11px;color:var(--muted)}
.bdi-status{margin-left:auto}
/* ANALYTICS */
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
/* HISTORY */
.history-full{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
/* STUDENTS */
.student-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.student-card{background:#fff;border:1px solid var(--border);border-radius:12px;padding:16px;cursor:pointer;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.student-card:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
.sc-avatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;margin-bottom:10px}
.sc-name{font-size:13px;font-weight:600}
.sc-meta{font-size:11px;color:var(--muted);margin-top:2px}
.sc-tag{margin-top:8px}
/* DRIVERS */
.driver-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.driver-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;cursor:pointer;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.driver-card:hover{border-color:rgba(37,99,235,.3);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
.dc-header{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.dc-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff;flex-shrink:0}
.dc-name{font-size:14px;font-weight:600}
.dc-id{font-size:11px;color:var(--muted);margin-top:1px}
.dc-row{display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid var(--border)}
.dc-key{color:var(--muted)}
.dc-val{font-weight:500;text-align:right}
/* ROLES */
.role-table-wrap{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.permission-matrix{display:grid;grid-template-columns:180px repeat(5,1fr);gap:0;font-size:12px}
.pm-header{padding:10px 14px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;background:#f8fafc;border-bottom:1px solid var(--border);text-align:center}
.pm-header:first-child{text-align:left}
.pm-cell{padding:11px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:center}
.pm-cell:first-child{justify-content:flex-start;font-weight:500;color:var(--text)}
.pm-check{width:18px;height:18px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;transition:all .15s;border:none;font-family:'DM Sans',sans-serif}
.pm-check.on{background:rgba(22,163,74,.12);color:var(--green)}
.pm-check.off{background:#f1f5f9;color:#cbd5e1;border:1px solid var(--border)}
.pm-check.on:hover{background:rgba(22,163,74,.2)}
.pm-check.off:hover{background:#e2e8f0;color:var(--muted)}
/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:500;backdrop-filter:blur(3px);animation:fadeIn .2s ease}
.modal{background:#fff;border:1px solid var(--border);border-radius:16px;width:460px;max-width:95vw;max-height:90vh;overflow-y:auto;padding:26px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.15);animation:slideUp .2s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.modal h3{font-size:16px;font-weight:700;margin-bottom:20px;letter-spacing:-.2px;color:var(--text)}
.form-row{margin-bottom:14px}
.form-label{font-size:10.5px;color:var(--muted);margin-bottom:6px;display:block;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.form-input{width:100%;background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:10px 13px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .15s,background .15s}
.form-input:focus{border-color:var(--accent);background:#fffbf5}
.form-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.form-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.modal-actions{display:flex;gap:10px;margin-top:22px}
.btn-cancel{flex:1;padding:11px;border-radius:9px;border:1px solid var(--border);background:#f8fafc;color:var(--muted);font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.btn-cancel:hover{border-color:var(--muted);color:var(--text)}
.btn-save{flex:2;padding:11px;border-radius:9px;border:none;background:var(--accent);color:#1a1a1a;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.btn-save:hover{background:var(--accent2);transform:translateY(-1px)}
.close-btn{position:absolute;top:18px;right:18px;background:#f1f5f9;border:none;color:var(--muted);width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;transition:all .15s;flex-shrink:0}
.close-btn:hover{background:#e2e8f0;color:var(--text)}
.role-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}
.role-chip{padding:5px 14px;border-radius:20px;font-size:11.5px;cursor:pointer;border:1px solid var(--border);color:var(--muted);transition:all .15s;user-select:none;background:none;font-family:'DM Sans',sans-serif}
.role-chip:hover{border-color:var(--muted);color:var(--text)}
.role-chip.sel{background:rgba(245,166,35,.1);border-color:var(--accent);color:var(--accent2)}
.perm-row{display:grid;gap:9px;margin-top:6px}
.perm-label{display:flex;align-items:center;gap:9px;font-size:12.5px;cursor:pointer;color:var(--text)}
.perm-label input[type=checkbox]{accent-color:var(--accent);width:14px;height:14px}
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
/* TOAST */
.toast{position:fixed;bottom:28px;right:28px;background:var(--green);color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:slideUp .3s ease}
/* SEARCH */
.search-bar{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;transition:border-color .15s}
.search-bar:focus-within{border-color:var(--accent)}
.search-bar input{background:transparent;border:none;outline:none;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;width:200px}
.search-bar input::placeholder{color:var(--muted)}
.filter-select{background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;color:var(--text);font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:#94a3b8}
`;

/* ─── SVG ICONS ───────────────────────────────────────────────────────── */
const IconDash  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>;
const IconClock = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconBus   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const IconUser  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconRoute = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconPeople= () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconBar   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IconFile  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IconLock  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconLogout= () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconSearch= () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconBell  = () => <svg width="15" height="15" fill="none" stroke="var(--muted)" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const BusLogo   = () => <svg viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 9h16v4H4V9z"/></svg>;

/* ─── MODAL COMPONENTS ────────────────────────────────────────────────── */
function AddStopList() {
  const [stops, setStops] = useState(["Main Gate","Market Circle","City Park"]);
  const [input, setInput] = useState("");
  const addStop = () => {
    const name = input.trim();
    if (!name) return;
    setStops(s => [...s, name]);
    setInput("");
  };
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

function PermCheck({ defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return <button className={`pm-check ${on ? "on" : "off"}`} onClick={() => setOn(o => !o)}>{on ? "✓" : "—"}</button>;
}

function RoleChip({ label, defaultSel }) {
  const [sel, setSel] = useState(defaultSel);
  return <button className={`role-chip${sel ? " sel" : ""}`} onClick={() => setSel(s => !s)}>{label}</button>;
}

/* ─── MODALS ──────────────────────────────────────────────────────────── */
function ModalBus({ onClose, onSave }) {
  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>Add / Edit Bus</h3>
      <div className="form-row2">
        <div className="form-row"><label className="form-label">Bus Number</label><input className="form-input" placeholder="KA-XX-X" /></div>
        <div className="form-row"><label className="form-label">Model</label><input className="form-input" placeholder="Tata Starbus" /></div>
      </div>
      <div className="form-row"><label className="form-label">Assign Driver</label>
        <select className="form-input"><option>— Select driver —</option><option>R. Kumar</option><option>P. Sharma</option><option>M. Rao</option><option>S. Joshi</option></select>
      </div>
      <div className="form-row"><label className="form-label">Assign Route</label>
        <select className="form-input"><option>— Select route —</option><option>Route A — North Loop</option><option>Route B — East Connect</option><option>Route C — South Express</option><option>Route D — West Campus</option></select>
      </div>
      <div className="form-row2">
        <div className="form-row"><label className="form-label">Capacity</label><input className="form-input" placeholder="50" type="number" /></div>
        <div className="form-row"><label className="form-label">Status</label>
          <select className="form-input"><option>Active</option><option>Maintenance</option><option>Idle</option></select>
        </div>
      </div>
      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={() => onSave("Bus saved successfully!")}>Save Bus</button>
      </div>
    </div>
  );
}

function ModalDriver({ onClose, onSave }) {
  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>Add / Edit Driver</h3>
      <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" placeholder="Driver full name" /></div>
      <div className="form-row2">
        <div className="form-row"><label className="form-label">License No.</label><input className="form-input" placeholder="DL-XXXX-XXXX" /></div>
        <div className="form-row"><label className="form-label">Experience (yrs)</label><input className="form-input" placeholder="5" type="number" /></div>
      </div>
      <div className="form-row"><label className="form-label">Phone</label><input className="form-input" placeholder="+91 9XXXXXXXXX" /></div>
      <div className="form-row"><label className="form-label">Assign Bus</label>
        <select className="form-input"><option>— Select bus —</option><option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option><option>KA-04-D</option></select>
      </div>
      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={() => onSave("Driver saved successfully!")}>Save Driver</button>
      </div>
    </div>
  );
}

function ModalRoute({ onClose, onSave }) {
  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>Create / Edit Route</h3>
      <div className="form-row2">
        <div className="form-row"><label className="form-label">Route ID</label><input className="form-input" placeholder="E (next available)" /></div>
        <div className="form-row"><label className="form-label">Route Name</label><input className="form-input" placeholder="North Loop" /></div>
      </div>
      <div className="form-row"><label className="form-label">Description</label><input className="form-input" placeholder="Short description..." /></div>
      <div className="form-section-title">Stops</div>
      <AddStopList />
      <div className="form-row" style={{marginTop:14}}><label className="form-label">Assign Buses</label>
        <select className="form-input" multiple style={{height:90}}>
          <option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option><option>KA-04-D</option><option>KA-05-E</option>
        </select>
        <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Hold Ctrl/Cmd to select multiple buses</div>
      </div>
      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={() => onSave("Route created successfully!")}>Create Route</button>
      </div>
    </div>
  );
}

function ModalStudent({ onClose, onSave }) {
  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>Add Student</h3>
      <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" placeholder="Student full name" /></div>
      <div className="form-row2">
        <div className="form-row"><label className="form-label">Roll No.</label><input className="form-input" placeholder="2024-XXX" /></div>
        <div className="form-row"><label className="form-label">Class / Section</label><input className="form-input" placeholder="10-A" /></div>
      </div>
      <div className="form-row"><label className="form-label">Assign Route</label>
        <select className="form-input"><option value="">— Select route —</option><option>Route A — North Loop</option><option>Route B — East Connect</option><option>Route C — South Express</option><option>Route D — West Campus</option></select>
      </div>
      <div className="form-row"><label className="form-label">Pickup Stop</label>
        <select className="form-input"><option value="">— Select stop —</option><option>Main Gate</option><option>Market Square</option><option>North Bridge</option><option>City Park</option><option>East Market</option><option>Rail Station</option><option>Tilakwadi</option><option>Sadashiv Nagar</option><option>Campus A</option><option>Science Block</option></select>
      </div>
      <div className="form-row"><label className="form-label">Parent Contact</label><input className="form-input" placeholder="+91 9XXXXXXXXX" /></div>
      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={() => onSave("Student added successfully!")}>Save Student</button>
      </div>
    </div>
  );
}

function ModalRole({ onClose, onSave }) {
  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>Add / Edit User Role</h3>
      <div className="form-row2">
        <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" placeholder="User full name" /></div>
        <div className="form-row"><label className="form-label">User Email</label><input className="form-input" placeholder="user@school.edu" /></div>
      </div>
      <div className="form-row"><label className="form-label">Assign Role</label>
        <div className="role-row">
          {["Super Admin","Admin","Dispatcher","Driver","Viewer"].map((r,i) => <RoleChip key={r} label={r} defaultSel={i===1} />)}
        </div>
      </div>
      <div className="form-row" style={{marginTop:4}}><label className="form-label">Permissions</label>
        <div className="perm-row">
          {["View live map & tracking","Manage buses & drivers","Edit routes & stops","Access analytics & reports","Manage students","System & role administration"].map((p,i) => (
            <label className="perm-label" key={p}><input type="checkbox" defaultChecked={i<2} style={{accentColor:"var(--accent)",width:14,height:14}} /> {p}</label>
          ))}
        </div>
      </div>
      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={() => onSave("User role updated!")}>Save User</button>
      </div>
    </div>
  );
}

/* ─── PAGES ───────────────────────────────────────────────────────────── */
function PageDashboard({ showModal }) {
  const [activePill, setActivePill] = useState("All");
  const [activeRoute, setActiveRoute] = useState(0);
  const pills = ["All","Route A","Route B","Route C"];
  const routes = [
    {cls:"rc-a",name:"Route A — North Loop",meta:"12 stops · 6 buses · 34 min",pct:92,color:"var(--green)"},
    {cls:"rc-b",name:"Route B — East Connect",meta:"8 stops · 4 buses · 28 min",pct:67,color:"var(--accent)"},
    {cls:"rc-c",name:"Route C — South Express",meta:"10 stops · 5 buses · 40 min",pct:88,color:"var(--green)"},
    {cls:"rc-d",name:"Route D — West Campus",meta:"6 stops · 3 buses · 22 min",pct:50,color:"var(--muted)"},
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Dashboard</div><div className="page-subtitle">Good morning — Sunday, April 19, 2026</div></div>
        <div className="fab-row">
          <button className="fab-btn fab-primary" onClick={() => showModal("bus")}>＋ Add Bus</button>
          <button className="fab-btn fab-secondary" onClick={() => showModal("driver")}>＋ Add Driver</button>
          <button className="fab-btn fab-secondary" onClick={() => showModal("route")}>＋ Create Route</button>
          <button className="fab-btn fab-secondary" onClick={() => showModal("student")}>＋ Add Student</button>
        </div>
      </div>
      <div className="stat-grid">
        <div className="stat-card s-green"><div className="stat-label">Active Buses</div><div className="stat-val green">18</div><div className="stat-sub"><span className="stat-trend up">+2</span> vs yesterday</div></div>
        <div className="stat-card s-amber"><div className="stat-label">Delayed Buses</div><div className="stat-val amber">3</div><div className="stat-sub"><span className="stat-trend down">▲ 1</span> alert active</div></div>
        <div className="stat-card s-blue"><div className="stat-label">Drivers on Duty</div><div className="stat-val blue">21</div><div className="stat-sub"><span className="stat-trend up">100%</span> assigned</div></div>
        <div className="stat-card s-purple"><div className="stat-label">Students Today</div><div className="stat-val purple">1,248</div><div className="stat-sub"><span className="stat-trend up">+34</span> this week</div></div>
      </div>
      <div className="mid-row">
        <div className="map-card">
          <div className="card-header">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
            <span className="card-title">Live Map</span><span className="card-sub">— all buses</span>
            <div className="ch-right">
              {pills.map(p => <button key={p} className={`pill ${activePill===p?"active":"passive"}`} onClick={()=>setActivePill(p)}>{p}</button>)}
            </div>
          </div>
          <div className="map-body">
            <div className="map-grid-bg"/>
            <div className="map-road" style={{left:0,top:118,width:"100%",height:3,opacity:.5}}/>
            <div className="map-road" style={{left:0,top:62,width:"100%",height:2,opacity:.25}}/>
            <div className="map-road" style={{left:0,top:185,width:"100%",height:2,opacity:.25}}/>
            <div className="map-road" style={{left:120,top:0,width:3,height:"100%",opacity:.4}}/>
            <div className="map-road" style={{left:280,top:0,width:2,height:"100%",opacity:.25}}/>
            <div className="map-road" style={{left:450,top:0,width:2,height:"100%",opacity:.25}}/>
            <div className="route-line-h" style={{left:80,top:109,width:240,background:"rgba(59,139,212,.35)"}}/>
            <div className="route-line-h" style={{left:60,top:176,width:300,background:"rgba(61,200,122,.3)"}}/>
            <div className="route-line-h" style={{left:300,top:63,width:200,background:"rgba(245,166,35,.25)"}}/>
            {[[76,114],[160,114],[240,114],[315,114],[56,171],[160,171],[320,171],[310,58],[420,58]].map(([l,t],i)=><div key={i} className="stop-dot" style={{left:l,top:t}}/>)}
            {[["on-time",130,108,"Bus A1 — On time","A1"],["on-time",200,108,"Bus A2 — On time","A2"],["delayed",268,108,"Bus B3 — Delayed 12 min","B3"],["on-time",100,165,"Bus C1 — On time","C1"],["on-time",240,165,"Bus C2 — On time","C2"],["on-time",390,108,"Bus D1 — On time","D1"],["delayed",370,53,"Bus E2 — Delayed","E2"],["idle",430,178,"Bus F1 — Idle","F1"]].map(([cls,l,t,title,lbl])=>(
              <div key={lbl} className={`bus-dot ${cls}`} style={{left:l,top:t}} title={title}>{lbl}</div>
            ))}
          </div>
          <div className="map-legend">
            <div className="legend-item"><div className="legend-dot" style={{background:"var(--green)"}}/> On time (18)</div>
            <div className="legend-item"><div className="legend-dot" style={{background:"var(--accent)"}}/> Delayed (3)</div>
            <div className="legend-item"><div className="legend-dot" style={{background:"#3a4a60"}}/> Idle (2)</div>
          </div>
        </div>
        <div className="alerts-card">
          <div className="card-header">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span className="card-title">Delay Alerts</span>
            <div className="ch-right"><button className="pill passive" style={{fontSize:10}}>Mark all read</button></div>
          </div>
          {[{t:"warn",icon:"⚠",txt:<><strong>Bus B3</strong> <span>is 12 min delayed on Route B — stop 4</span></>,time:"09:14 AM"},
            {t:"err",icon:"!",txt:<><strong>Bus E2</strong> <span>engine warning — driver notified</span></>,time:"09:08 AM"},
            {t:"warn",icon:"⚠",txt:<><strong>Route C</strong> <span>heavy traffic near Main St</span></>,time:"08:55 AM"},
            {t:"ok",icon:"✓",txt:<><strong>Bus A1</strong> <span>resumed schedule after delay</span></>,time:"08:42 AM"},
            {t:"ok",icon:"✓",txt:<><strong>Driver R. Kumar</strong> <span>checked in for morning shift</span></>,time:"08:00 AM"},
          ].map((a,i)=>(
            <div className="alert-item" key={i}>
              <div className={`alert-icon ${a.t}`}>{a.icon}</div>
              <div style={{flex:1}}><div className="alert-text">{a.txt}</div><div className="alert-time">{a.time}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bot-row">
        <div className="table-card">
          <div className="card-header">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--blue2)" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <span className="card-title">Buses</span>
            <div className="ch-right"><button className="fab-btn fab-primary" style={{padding:"5px 12px",fontSize:11}} onClick={()=>showModal("bus")}>＋ Add</button></div>
          </div>
          <table className="data-table">
            <thead><tr><th>Bus</th><th>Driver</th><th>Route</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {[["KA-01-B","#3b8bd4","RK","R. Kumar","Route A","sp-green","On Time"],
                ["KA-02-B","#8b5cf6","PS","P. Sharma","Route B","sp-amber","Delayed"],
                ["KA-03-C","#3dc87a","MR","M. Rao","Route C","sp-green","On Time"],
                ["KA-04-D","#e05252","SJ","S. Joshi","Route D","sp-gray","Idle"],
                ["KA-05-E","#f5a623","AB","A. Baig","Route A","sp-red","⚠ Warning"],
              ].map(([bus,bg,init,drv,route,sc,st])=>(
                <tr key={bus}><td><strong>{bus}</strong></td><td><span className="ava-sm" style={{background:bg}}>{init}</span>{drv}</td><td>{route}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn" onClick={()=>showModal("bus")}>Edit</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="route-card">
          <div className="card-header">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span className="card-title">Routes</span>
            <div className="ch-right"><button className="fab-btn fab-secondary" style={{padding:"5px 12px",fontSize:11}} onClick={()=>showModal("route")}>＋ New</button></div>
          </div>
          <div className="route-list">
            {routes.map((r,i)=>(
              <div key={i} className={`route-item${activeRoute===i?" active-route":""}`} onClick={()=>setActiveRoute(i)}>
                <div className={`route-circle ${r.cls}`}>{["A","B","C","D"][i]}</div>
                <div className="route-info"><div className="route-name">{r.name}</div><div className="route-meta">{r.meta}</div></div>
                <div className="route-bar-wrap">
                  <div style={{fontSize:10,color:r.color,marginBottom:3,textAlign:"right"}}>{r.pct}%</div>
                  <div className="route-bar-bg"><div className="route-bar-fill" style={{width:`${r.pct}%`,background:r.color}}/></div>
                </div>
              </div>
            ))}
          </div>
          <div className="history-strip">
            <div className="history-label">Bus History — KA-01-B today</div>
            <div className="history-bars">
              {[["var(--green)",.8,"60%"],["var(--green)",.9,"75%"],["var(--accent)",1,"90%"],["var(--green)",.85,"70%"],["var(--green)",.9,"80%"],["var(--green)",1,"65%"],["rgba(100,116,139,.15)",1,"40%"],["rgba(100,116,139,.15)",1,"40%"]].map(([bg,op,h],i)=>(
                <div key={i} className="history-bar" style={{background:bg,opacity:op,height:h}}/>
              ))}
            </div>
            <div className="history-times"><span>07:00</span><span>08:00</span><span>09:00</span><span>10:00</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageTracking({ showToast }) {
  const [selected, setSelected] = useState(0);
  const buses = [
    ["KA-01-B","Route A — R. Kumar","sp-green","On Time"],["KA-02-B","Route B — P. Sharma","sp-amber","+12 min"],
    ["KA-03-C","Route C — M. Rao","sp-green","On Time"],["KA-04-D","Route D — S. Joshi","sp-gray","Idle"],
    ["KA-05-E","Route A — A. Baig","sp-red","Warning"],["KA-06-F","Route B — V. Patil","sp-green","On Time"],
    ["KA-07-G","Route C — D. Nair","sp-green","On Time"],["KA-08-H","Route D — K. Singh","sp-amber","+5 min"],
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Live Tracking</div><div className="page-subtitle">Real-time positions of all active buses</div></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span className="status-pill sp-green" style={{fontSize:11,padding:"5px 12px"}}>● Live</span>
          <button className="fab-btn fab-secondary">⟳ Refresh</button>
        </div>
      </div>
      <div className="stat-grid">
        <div className="stat-card s-green"><div className="stat-label">On Time</div><div className="stat-val green">18</div><div className="stat-sub">buses running normally</div></div>
        <div className="stat-card s-amber"><div className="stat-label">Delayed</div><div className="stat-val amber">3</div><div className="stat-sub">avg 9 min delay</div></div>
        <div className="stat-card s-blue"><div className="stat-label">Idle</div><div className="stat-val blue">2</div><div className="stat-sub">at depot / maintenance</div></div>
        <div className="stat-card s-purple"><div className="stat-label">Coverage</div><div className="stat-val purple">96%</div><div className="stat-sub">route completion rate</div></div>
      </div>
      <div className="tracking-grid">
        <div className="map-large">
          <div className="map-grid-bg"/>
          <div className="map-road" style={{left:0,top:200,width:"100%",height:3,opacity:.5}}/>
          <div className="map-road" style={{left:0,top:100,width:"100%",height:2,opacity:.25}}/>
          <div className="map-road" style={{left:0,top:320,width:"100%",height:2,opacity:.25}}/>
          <div className="map-road" style={{left:200,top:0,width:3,height:"100%",opacity:.4}}/>
          <div className="map-road" style={{left:480,top:0,width:2,height:"100%",opacity:.25}}/>
          <div className="map-road" style={{left:720,top:0,width:2,height:"100%",opacity:.25}}/>
          <div className="route-line-h" style={{left:50,top:190,width:480,background:"rgba(59,139,212,.4)"}}/>
          <div className="route-line-h" style={{left:80,top:310,width:560,background:"rgba(61,200,122,.35)"}}/>
          <div className="route-line-h" style={{left:300,top:95,width:400,background:"rgba(245,166,35,.3)"}}/>
          <div className="route-line-h" style={{left:100,top:355,width:300,background:"rgba(165,110,245,.25)"}}/>
          {[[50,194],[180,194],[300,194],[420,194],[520,194],[80,305],[220,305],[380,305],[530,305],[300,90],[460,90],[620,90]].map(([l,t],i)=><div key={i} className="stop-dot" style={{left:l,top:t}}/>)}
          {[["on-time",160,183,"Bus A1","A1"],["on-time",340,183,"Bus A2","A2"],["delayed",490,183,"Bus B3 — 12 min late","B3"],["on-time",140,294,"Bus C1","C1"],["on-time",350,294,"Bus C2","C2"],["on-time",400,88,"Bus D1","D1"],["delayed",580,88,"Bus E2 — delayed","E2"],["idle",700,340,"Bus F1 — Idle","F1"]].map(([cls,l,t,title,lbl])=>(
            <div key={lbl} className={`bus-dot ${cls}`} style={{left:l,top:t}} title={title} onClick={()=>showToast(title)}>{lbl}</div>
          ))}
          <div style={{position:"absolute",left:10,top:6,fontSize:10,color:"#94a3b8",fontFamily:"'DM Mono',monospace"}}>BELAGAVI CITY</div>
          <div style={{position:"absolute",left:10,top:185,fontSize:9,color:"rgba(37,99,235,.7)",fontFamily:"'DM Mono',monospace"}}>Route A</div>
          <div style={{position:"absolute",left:10,top:300,fontSize:9,color:"rgba(22,163,74,.7)",fontFamily:"'DM Mono',monospace"}}>Route B</div>
          <div style={{position:"absolute",left:303,top:75,fontSize:9,color:"rgba(245,166,35,.8)",fontFamily:"'DM Mono',monospace"}}>Route C</div>
        </div>
        <div className="bus-detail-panel">
          <div className="card-header"><span className="card-title">All Buses</span><div className="ch-right"><span className="card-sub">23 total</span></div></div>
          <div style={{overflowY:"auto",flex:1}}>
            {buses.map(([num,route,sc,st],i)=>(
              <div key={i} className={`bus-detail-item${selected===i?" selected":""}`} onClick={()=>setSelected(i)}>
                <div><div className="bdi-num">{num}</div><div className="bdi-route">{route}</div></div>
                <div className="bdi-status"><span className={`status-pill ${sc}`}>{st}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageBuses({ showModal }) {
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Buses</div><div className="page-subtitle">Manage fleet — 23 buses registered</div></div>
        <div className="fab-row">
          <div className="search-bar"><IconSearch/><input placeholder="Search buses..."/></div>
          <select className="filter-select"><option>All Routes</option><option>Route A</option><option>Route B</option><option>Route C</option><option>Route D</option></select>
          <button className="fab-btn fab-primary" onClick={()=>showModal("bus")}>＋ Add Bus</button>
        </div>
      </div>
      <div className="table-card">
        <table className="data-table">
          <thead><tr><th>Bus No.</th><th>Model</th><th>Driver</th><th>Assigned Route</th><th>Capacity</th><th>Status</th><th>Last Active</th><th></th></tr></thead>
          <tbody>
            {[["KA-01-B","Tata Starbus","#3b8bd4","RK","R. Kumar","sp-blue","Route A",50,"sp-green","On Time","09:12"],
              ["KA-02-B","Ashok Leyland","#8b5cf6","PS","P. Sharma","sp-green","Route B",48,"sp-amber","Delayed","09:08"],
              ["KA-03-C","Tata Starbus","#3dc87a","MR","M. Rao","sp-amber","Route C",52,"sp-green","On Time","09:14"],
              ["KA-04-D","Eicher Bus","#e05252","SJ","S. Joshi","sp-purple","Route D",45,"sp-gray","Idle","07:30"],
              ["KA-05-E","Tata Starbus","#f5a623","AB","A. Baig","sp-blue","Route A",50,"sp-red","⚠ Warning","08:55"],
              ["KA-06-F","Ashok Leyland","#0ea5e9","VP","V. Patil","sp-green","Route B",48,"sp-green","On Time","09:10"],
              ["KA-07-G","Volvo 9400","#14b8a6","DN","D. Nair","sp-amber","Route C",55,"sp-green","On Time","09:13"],
            ].map(([bus,model,bg,init,drv,rsc,route,cap,sc,st,time])=>(
              <tr key={bus}><td><strong>{bus}</strong></td><td>{model}</td><td><span className="ava-sm" style={{background:bg}}>{init}</span>{drv}</td><td><span className={`status-pill ${rsc}`}>{route}</span></td><td>{cap}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td style={{color:"var(--muted)",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{time}</td><td><button className="act-btn" onClick={()=>showModal("bus")}>Edit</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageDrivers({ showModal }) {
  const drivers = [
    {bg:"#3b8bd4",init:"RK",name:"R. Kumar",id:"DL-5201-2019 · 8 yrs exp",sc:"sp-green",st:"Active",bus:"KA-01-B",route:"Route A — North Loop",phone:"+91 98765 43210",trips:"6 / 6",tc:"var(--green)"},
    {bg:"#8b5cf6",init:"PS",name:"P. Sharma",id:"DL-3892-2017 · 10 yrs exp",sc:"sp-amber",st:"Delayed",bus:"KA-02-B",route:"Route B — East Connect",phone:"+91 91234 56789",trips:"4 / 6",tc:"var(--accent)"},
    {bg:"#3dc87a",init:"MR",name:"M. Rao",id:"DL-1123-2020 · 6 yrs exp",sc:"sp-green",st:"Active",bus:"KA-03-C",route:"Route C — South Express",phone:"+91 90000 11223",trips:"5 / 6",tc:"var(--green)"},
    {bg:"#e05252",init:"SJ",name:"S. Joshi",id:"DL-7741-2018 · 9 yrs exp",sc:"sp-gray",st:"Idle",bus:"KA-04-D",route:"Route D — West Campus",phone:"+91 99887 76655",trips:"2 / 6",tc:"var(--muted)"},
    {bg:"#f5a623",init:"AB",name:"A. Baig",id:"DL-4456-2021 · 5 yrs exp",sc:"sp-red",st:"Warning",bus:"KA-05-E",route:"Route A — North Loop",phone:"+91 88001 23456",trips:"3 / 6",tc:"var(--red)"},
    {bg:"#0ea5e9",init:"VP",name:"V. Patil",id:"DL-9920-2016 · 12 yrs exp",sc:"sp-green",st:"Active",bus:"KA-06-F",route:"Route B — East Connect",phone:"+91 97654 32109",trips:"6 / 6",tc:"var(--green)"},
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Drivers</div><div className="page-subtitle">21 drivers on duty today</div></div>
        <div className="fab-row">
          <div className="search-bar"><IconSearch/><input placeholder="Search drivers..."/></div>
          <button className="fab-btn fab-primary" onClick={()=>showModal("driver")}>＋ Add Driver</button>
        </div>
      </div>
      <div className="driver-cards">
        {drivers.map(d=>(
          <div className="driver-card" key={d.name}>
            <div className="dc-header">
              <div className="dc-avatar" style={{background:d.bg}}>{d.init}</div>
              <div><div className="dc-name">{d.name}</div><div className="dc-id">{d.id}</div></div>
              <span className={`status-pill ${d.sc}`} style={{marginLeft:"auto"}}>{d.st}</span>
            </div>
            {[["Assigned Bus",d.bus],["Route",d.route],["Phone",d.phone]].map(([k,v])=>(
              <div className="dc-row" key={k}><span className="dc-key">{k}</span><span className="dc-val">{v}</span></div>
            ))}
            <div className="dc-row" style={{border:"none"}}><span className="dc-key">Trips Today</span><span className="dc-val" style={{color:d.tc}}>{d.trips}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageRoutes({ showModal }) {
  const routes = [
    {cls:"rc-a",letter:"A",name:"Route A — North Loop",sc:"sp-green",ont:"92% on-time",stops:12,buses:6,avg:"34 min",tags:[{col:"var(--blue2)",bg:"rgba(37,99,235,.12)",border:"rgba(37,99,235,.2)"}],stopNames:["Main Gate","Market Circle","City Park","North Bridge"],more:"+8 more"},
    {cls:"rc-b",letter:"B",name:"Route B — East Connect",sc:"sp-amber",ont:"67% on-time",stops:8,buses:4,avg:"28 min",tags:[{col:"var(--green)",bg:"rgba(22,163,74,.1)",border:"rgba(22,163,74,.2)"}],stopNames:["Depot","East Market","Rail Station"],more:"+5 more"},
    {cls:"rc-c",letter:"C",name:"Route C — South Express",sc:"sp-green",ont:"88% on-time",stops:10,buses:5,avg:"40 min",tags:[{col:"var(--accent)",bg:"rgba(245,166,35,.1)",border:"rgba(245,166,35,.2)"}],stopNames:["School Gate","Tilakwadi","Sadashiv Nagar"],more:"+7 more"},
    {cls:"rc-d",letter:"D",name:"Route D — West Campus",sc:"sp-gray",ont:"50% on-time",stops:6,buses:3,avg:"22 min",tags:[{col:"#b07ef7",bg:"rgba(165,110,245,.1)",border:"rgba(165,110,245,.2)"}],stopNames:["Campus A","Science Block","Hostel"],more:"+3 more"},
  ];
  const stopColors = ["rgba(37,99,235,.12)","rgba(22,163,74,.1)","rgba(245,166,35,.1)","rgba(165,110,245,.1)"];
  const stopBorders = ["rgba(37,99,235,.2)","rgba(22,163,74,.2)","rgba(245,166,35,.2)","rgba(165,110,245,.2)"];
  const stopTextColors = ["var(--blue2)","var(--green)","var(--accent)","#b07ef7"];
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Routes</div><div className="page-subtitle">4 active routes — 36 stops total</div></div>
        <button className="fab-btn fab-primary" onClick={()=>showModal("route")}>＋ Create Route</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {routes.map((r,ri)=>(
          <div className="table-card" key={r.letter}>
            <div className="card-header">
              <div className={`route-circle ${r.cls}`} style={{width:26,height:26,fontSize:10}}>{r.letter}</div>
              <span className="card-title">{r.name}</span>
              <div className="ch-right"><span className={`status-pill ${r.sc}`}>{r.ont}</span></div>
            </div>
            <div style={{padding:"16px 18px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
                <div><div className="stat-label">Stops</div><div style={{fontSize:18,fontWeight:700}}>{r.stops}</div></div>
                <div><div className="stat-label">Buses</div><div style={{fontSize:18,fontWeight:700,color:"var(--blue2)"}}>{r.buses}</div></div>
                <div><div className="stat-label">Avg Time</div><div style={{fontSize:18,fontWeight:700,color:stopTextColors[ri]}}>{r.avg}</div></div>
              </div>
              <div style={{fontSize:11,color:"var(--muted)",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Stop Sequence</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {r.stopNames.map(s=>(
                  <span key={s} style={{fontSize:11.5,padding:"3px 9px",background:stopColors[ri],border:`1px solid ${stopBorders[ri]}`,borderRadius:6,color:stopTextColors[ri]}}>{s}</span>
                ))}
                <span style={{fontSize:11,color:"var(--muted)"}}>{r.more ? `→ ${r.more}` : ""}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageStudents({ showModal }) {
  const students = [
    ["#3b8bd4","AR","Aryan Reddy","2024-001","10-A","sp-blue","Route A","North Bridge","sp-green","Active"],
    ["#e05252","PS","Priya Singh","2024-002","9-B","sp-green","Route B","East Market","sp-green","Active"],
    ["#f5a623","KN","Kartik Nair","2024-003","11-C","sp-amber","Route C","Tilakwadi","sp-green","Active"],
    ["#8b5cf6","MV","Meera Verma","2024-004","8-A","sp-purple","Route D","Campus A","sp-amber","Pending"],
    ["#14b8a6","RJ","Rahul Jain","2024-005","10-B","sp-blue","Route A","City Park","sp-green","Active"],
    ["#ec4899","SM","Sneha More","2024-006","12-A","sp-green","Route B","Rail Station","sp-gray","Inactive"],
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Students</div><div className="page-subtitle">1,248 students enrolled in bus service</div></div>
        <div className="fab-row">
          <div className="search-bar"><IconSearch/><input placeholder="Search students..."/></div>
          <select className="filter-select"><option>All Routes</option><option>Route A</option><option>Route B</option><option>Route C</option><option>Route D</option></select>
          <button className="fab-btn fab-primary" onClick={()=>showModal("student")}>＋ Add Student</button>
        </div>
      </div>
      <div className="table-card">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Roll No.</th><th>Class</th><th>Route</th><th>Pickup Stop</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {students.map(([bg,init,name,roll,cls,rsc,route,stop,sc,st])=>(
              <tr key={roll}><td><span className="ava-sm" style={{background:bg}}>{init}</span><strong>{name}</strong></td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{roll}</td><td>{cls}</td><td><span className={`status-pill ${rsc}`}>{route}</span></td><td>{stop}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn">Edit</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageAnalytics() {
  const weekBars = [{h:"85%",c:"var(--green)",l:"Mon"},{h:"92%",c:"var(--green)",l:"Tue"},{h:"78%",c:"var(--accent)",l:"Wed"},{h:"95%",c:"var(--green)",l:"Thu"},{h:"88%",c:"var(--green)",l:"Fri"},{h:"60%",c:"var(--muted)",l:"Sat"},{h:"94%",c:"var(--green)",l:"Sun"}];
  const hourBars = [{h:"30%",o:.4},{h:"95%",o:.8},{h:"100%",o:1},{h:"70%",o:.6},{h:"20%",o:.3},{h:"10%",o:.2},{h:"15%",o:.25},{h:"60%",o:.55},{h:"90%",o:.75},{h:"80%",o:.65},{h:"40%",o:.4},{h:"15%",o:.25}];
  const hourLabels = ["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"];
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Analytics</div><div className="page-subtitle">Performance metrics — April 2026</div></div>
        <div className="fab-row">
          <select className="filter-select"><option>This Week</option><option>This Month</option><option>Last 3 Months</option></select>
          <button className="fab-btn fab-secondary">↓ Export</button>
        </div>
      </div>
      <div className="kpi-row">
        <div className="kpi-card"><div className="kpi-icon" style={{background:"rgba(22,163,74,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div><div><div className="kpi-val" style={{color:"var(--green)"}}>94.2%</div><div className="kpi-lbl">On-Time Rate</div></div></div>
        <div className="kpi-card"><div className="kpi-icon" style={{background:"rgba(37,99,235,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue2)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div><div className="kpi-val" style={{color:"var(--blue2)"}}>6.2 min</div><div className="kpi-lbl">Avg Delay</div></div></div>
        <div className="kpi-card"><div className="kpi-icon" style={{background:"rgba(124,58,237,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><div><div className="kpi-val" style={{color:"var(--purple)"}}>1,248</div><div className="kpi-lbl">Students Transported</div></div></div>
      </div>
      <div className="analytics-grid">
        <div className="chart-card" style={{gridColumn:"span 2"}}>
          <div className="chart-title">Daily On-Time Performance — This Week</div>
          <div className="bar-chart" style={{height:120}}>
            {weekBars.map(b=><div key={b.l} className="bar-col"><div className="bar-fill" style={{height:b.h,background:`linear-gradient(to top,${b.c},${b.c}66)`}}/><div className="bar-label">{b.l}</div></div>)}
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-title">Route Load Distribution</div>
          <div className="donut-wrap">
            <svg width="90" height="90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="rgba(0,0,0,.05)" strokeWidth="4"/>
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--blue2)" strokeWidth="4" strokeDasharray="37 63" strokeDashoffset="25"/>
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--green)" strokeWidth="4" strokeDasharray="28 72" strokeDashoffset="-12"/>
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--accent)" strokeWidth="4" strokeDasharray="22 78" strokeDashoffset="-40"/>
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--purple)" strokeWidth="4" strokeDasharray="13 87" strokeDashoffset="-62"/>
            </svg>
            <div className="donut-legend">
              {[["var(--blue2)","Route A (37%)"],["var(--green)","Route B (28%)"],["var(--accent)","Route C (22%)"],["var(--purple)","Route D (13%)"]].map(([c,l])=>(
                <div className="donut-leg-item" key={l}><div className="donut-leg-dot" style={{background:c}}/>{l}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="chart-card" style={{gridColumn:"span 3"}}>
          <div className="chart-title">Hourly Dispatch Volume — Today</div>
          <div className="bar-chart" style={{height:80,gap:5}}>
            {hourBars.map((b,i)=><div key={i} className="bar-col"><div className="bar-fill" style={{height:b.h,background:`rgba(59,139,212,${b.o})`}}/><div className="bar-label">{hourLabels[i]}</div></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageHistory() {
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Bus History</div><div className="page-subtitle">Trip logs and journey history</div></div>
        <div className="fab-row">
          <div className="search-bar"><IconSearch/><input placeholder="Search by bus or route..."/></div>
          <input type="date" className="filter-select" defaultValue="2026-04-19"/>
          <select className="filter-select"><option>All Buses</option><option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option></select>
          <button className="fab-btn fab-secondary">↓ Export CSV</button>
        </div>
      </div>
      <div className="history-full">
        <table className="data-table">
          <thead><tr><th>Bus</th><th>Route</th><th>Driver</th><th>Trip Start</th><th>Trip End</th><th>Stops Completed</th><th>Delay</th><th>Status</th></tr></thead>
          <tbody>
            {[["KA-01-B","Route A","R. Kumar","07:00 AM","07:34 AM","12 / 12","0 min","var(--green)","sp-green","Completed"],
              ["KA-01-B","Route A","R. Kumar","08:00 AM","08:38 AM","12 / 12","+4 min","var(--accent)","sp-amber","Minor Delay"],
              ["KA-02-B","Route B","P. Sharma","07:00 AM","07:28 AM","8 / 8","0 min","var(--green)","sp-green","Completed"],
              ["KA-02-B","Route B","P. Sharma","08:00 AM","In Progress","4 / 8","+12 min","var(--red)","sp-red","Delayed"],
              ["KA-03-C","Route C","M. Rao","07:00 AM","07:42 AM","10 / 10","0 min","var(--green)","sp-green","Completed"],
              ["KA-04-D","Route D","S. Joshi","07:00 AM","07:22 AM","6 / 6","0 min","var(--green)","sp-green","Completed"],
              ["KA-05-E","Route A","A. Baig","07:30 AM","Stopped","3 / 12","Engine warning","var(--red)","sp-red","⚠ Incident"],
              ["KA-06-F","Route B","V. Patil","08:00 AM","08:26 AM","8 / 8","0 min","var(--green)","sp-green","Completed"],
            ].map(([bus,route,drv,start,end,stops,delay,dc,sc,st],i)=>(
              <tr key={i}><td><strong>{bus}</strong></td><td>{route}</td><td>{drv}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{start}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{end}</td><td>{stops}</td><td style={{color:dc}}>{delay}</td><td><span className={`status-pill ${sc}`}>{st}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageRoles({ showModal }) {
  const perms = [["View live map",[1,1,1,1,1]],["Manage buses",[1,1,0,0,0]],["Edit routes",[1,1,1,0,0]],["Analytics",[1,1,0,0,1]],["Manage students",[1,1,1,0,0]],["System admin",[1,0,0,0,0]]];
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Role Management</div><div className="page-subtitle">Manage user access and permissions</div></div>
        <button className="fab-btn fab-primary" onClick={()=>showModal("role")}>＋ Add User</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div className="role-table-wrap">
          <div className="card-header"><span className="card-title">Users & Roles</span><div className="ch-right"><span className="card-sub">5 users</span></div></div>
          <table className="data-table">
            <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {[["#f5a623","AD","Admin","admin@school.edu","sp-amber","Super Admin","sp-green","Active"],
                ["#3b8bd4","JP","J. Patil","j.patil@school.edu","sp-blue","Admin","sp-green","Active"],
                ["#3dc87a","RD","R. Desai","r.desai@school.edu","sp-green","Dispatcher","sp-green","Active"],
                ["#8b5cf6","NK","N. Kulkarni","n.kulkarni@school.edu","sp-purple","Viewer","sp-gray","Inactive"],
              ].map(([bg,init,name,email,rsc,role,sc,st])=>(
                <tr key={email}><td><span className="ava-sm" style={{background:bg}}>{init}</span><strong>{name}</strong></td><td style={{fontSize:11.5,color:"var(--muted)"}}>{email}</td><td><span className={`status-pill ${rsc}`}>{role}</span></td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn" onClick={()=>showModal("role")}>Edit</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="role-table-wrap">
          <div className="card-header"><span className="card-title">Permission Matrix</span></div>
          <div className="permission-matrix">
            {["Permission","Super Admin","Admin","Dispatcher","Driver","Viewer"].map(h=><div key={h} className="pm-header">{h}</div>)}
            {perms.map(([perm,vals])=>(
              <div key={perm} style={{display:"contents"}}>
                <div className="pm-cell" style={{justifyContent:"flex-start"}}>{perm}</div>
                {vals.map((v,i)=><div key={i} className="pm-cell"><PermCheck defaultOn={!!v}/></div>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ────────────────────────────────────────────────────────── */
export default function BusNavDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [clock, setClock] = useState("");
  const toastTimer = useRef(null);

  // Clock
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  // Toast
  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  const showModal = (type) => setModal(type);
  const hideModal = () => setModal(null);
  const saveAndClose = (msg) => { hideModal(); showToast(msg); };

  const navSections = [
    { label: "Overview", items: [
      { id: "dashboard", icon: <IconDash/>, label: "Dashboard" },
      { id: "tracking",  icon: <IconClock/>, label: "Live Tracking", badge: "3", warn: true },
    ]},
    { label: "Management", items: [
      { id: "buses",   icon: <IconBus/>,    label: "Buses" },
      { id: "drivers", icon: <IconUser/>,   label: "Drivers" },
      { id: "routes",  icon: <IconRoute/>,  label: "Routes" },
      { id: "students",icon: <IconPeople/>, label: "Students", badge: "12", warn: true },
    ]},
    { label: "Analytics", items: [
      { id: "analytics", icon: <IconBar/>,  label: "Analytics" },
      { id: "history",   icon: <IconFile/>, label: "Bus History" },
    ]},
    { label: "System", items: [
      { id: "roles", icon: <IconLock/>, label: "Role Mgmt" },
    ]},
  ];

  const pageLabels = { dashboard:"Dashboard", tracking:"Live Tracking", buses:"Buses", drivers:"Drivers", routes:"Routes", students:"Students", analytics:"Analytics", history:"Bus History", roles:"Role Management" };

  const renderPage = () => {
    switch(activePage) {
      case "dashboard": return <PageDashboard showModal={showModal}/>;
      case "tracking":  return <PageTracking showToast={showToast}/>;
      case "buses":     return <PageBuses showModal={showModal}/>;
      case "drivers":   return <PageDrivers showModal={showModal}/>;
      case "routes":    return <PageRoutes showModal={showModal}/>;
      case "students":  return <PageStudents showModal={showModal}/>;
      case "analytics": return <PageAnalytics/>;
      case "history":   return <PageHistory/>;
      case "roles":     return <PageRoles showModal={showModal}/>;
      default:          return <PageDashboard showModal={showModal}/>;
    }
  };

  const renderModal = () => {
    if (!modal) return null;
    const props = { onClose: hideModal, onSave: saveAndClose };
    const map = { bus: <ModalBus {...props}/>, driver: <ModalDriver {...props}/>, route: <ModalRoute {...props}/>, student: <ModalStudent {...props}/>, role: <ModalRole {...props}/> };
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
            <div className="logo-icon"><BusLogo/></div>
            BusNav Admin
          </div>
          <div className="spacer"/>
          <div className="breadcrumb">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
            <span>{pageLabels[activePage]}</span>
          </div>
          <div className="spacer"/>
          <div className="topbar-right">
            <div className="topbar-time">{clock}</div>
            <div className="badge-notif" title="3 alerts"><IconBell/><span className="dot"/></div>
            <div className="avatar" title="Admin">AD</div>
          </div>
        </div>

        <div className="body-wrap">
          {/* SIDEBAR */}
          <div className="sidebar">
            {navSections.map(s => (
              <div className="nav-section" key={s.label}>
                <div className="nav-label">{s.label}</div>
                {s.items.map(it => (
                  <button key={it.id} className={`nav-item${activePage===it.id?" active":""}`} onClick={()=>setActivePage(it.id)}>
                    {it.icon} {it.label}
                    {it.badge && <span className={`nav-badge${it.warn?" warn":""}`}>{it.badge}</span>}
                  </button>
                ))}
              </div>
            ))}
            <div className="sidebar-bottom">
              <button className="nav-item" style={{color:"#64748b"}}><IconLogout/> Logout</button>
            </div>
          </div>

          {/* MAIN */}
          <div className="main">
            {renderPage()}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {renderModal()}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
