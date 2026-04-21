// // // export default function AdminDashboard() {
// // //   return <h1 style={{textAlign:'center',marginTop:'40vh',color:'#1B2B4B'}}>Admin Dashboard — Coming Soon!</h1>
// // // }
// // import { useState, useEffect, useRef } from "react";

// // /* ─── CSS ─────────────────────────────────────────────────────────────── */
// // const css = `
// // @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Mono:wght@400;500&display=swap');
// // *{box-sizing:border-box;margin:0;padding:0}
// // :root{
// //   --accent:#f5a623;--accent2:#e8951f;--blue:#3b8bd4;--blue2:#2563eb;
// //   --green:#16a34a;--red:#dc2626;--purple:#7c3aed;
// //   --text:#1e293b;--muted:#64748b;--border:#e2e8f0;
// // }
// // body{font-family:'DM Sans',sans-serif;background:#f1f5f9;color:var(--text)}
// // .layout{display:flex;min-height:100vh;flex-direction:column}
// // /* TOPBAR */
// // .topbar{height:58px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:12px;position:sticky;top:0;z-index:100;box-shadow:0 1px 3px rgba(0,0,0,.06)}
// // .logo{display:flex;align-items:center;gap:9px;font-weight:700;font-size:15px;letter-spacing:-.2px;color:var(--text)}
// // .logo-icon{width:34px;height:34px;background:var(--accent);border-radius:9px;display:flex;align-items:center;justify-content:center}
// // .logo-icon svg{width:18px;height:18px;fill:#1a1a1a}
// // .topbar .spacer{flex:1}
// // .topbar-right{display:flex;align-items:center;gap:14px}
// // .badge-notif{position:relative;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#f8fafc;border:1px solid var(--border);transition:background .15s}
// // .badge-notif:hover{background:#f1f5f9}
// // .badge-notif .dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--red);border-radius:50%;border:2px solid #fff}
// // .avatar{width:32px;height:32px;background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#1a1a1a;cursor:pointer}
// // .topbar-time{font-size:12.5px;color:var(--muted);font-family:'DM Mono',monospace;background:#f8fafc;padding:4px 10px;border-radius:6px;border:1px solid var(--border)}
// // .breadcrumb{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px}
// // .breadcrumb span{color:var(--text);font-weight:500}
// // /* BODY */
// // .body-wrap{display:flex;flex:1}
// // /* SIDEBAR */
// // .sidebar{width:230px;background:#1e293b;border-right:1px solid #334155;display:flex;flex-direction:column;padding:14px 0;flex-shrink:0;position:sticky;top:58px;height:calc(100vh - 58px);overflow-y:auto}
// // .nav-section{padding:0 10px;margin-bottom:6px}
// // .nav-label{font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1.2px;padding:8px 10px 5px}
// // .nav-item{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;cursor:pointer;font-size:13px;color:#94a3b8;transition:all .15s;margin-bottom:1px;user-select:none;position:relative;background:none;border:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif}
// // .nav-item:hover{background:rgba(255,255,255,.07);color:#e2e8f0}
// // .nav-item.active{background:rgba(245,166,35,.15);color:var(--accent);font-weight:600}
// // .nav-item.active::before{content:'';position:absolute;left:-10px;top:50%;transform:translateY(-50%);width:3px;height:20px;background:var(--accent);border-radius:0 3px 3px 0}
// // .nav-item .ni{width:15px;height:15px;opacity:.7;flex-shrink:0}
// // .nav-item.active .ni{opacity:1}
// // .nav-badge{margin-left:auto;background:var(--red);color:#fff;font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:10px;line-height:1.4}
// // .nav-badge.warn{background:rgba(245,166,35,.2);color:var(--accent);border:1px solid rgba(245,166,35,.3)}
// // .sidebar-bottom{margin-top:auto;padding:10px;border-top:1px solid #334155}
// // /* MAIN */
// // .main{flex:1;overflow-y:auto;background:#f1f5f9}
// // .page{padding:22px 26px;display:flex;flex-direction:column;gap:18px;animation:fadeIn .2s ease}
// // @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
// // /* PAGE HEADER */
// // .page-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
// // .page-title{font-size:20px;font-weight:700;letter-spacing:-.3px}
// // .page-subtitle{font-size:12.5px;color:var(--muted);margin-top:2px}
// // /* FAB */
// // .fab-row{display:flex;gap:8px;flex-wrap:wrap}
// // .fab-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:'DM Sans',sans-serif}
// // .fab-primary{background:var(--accent);color:#1a1a1a}
// // .fab-primary:hover{background:var(--accent2);transform:translateY(-1px);box-shadow:0 4px 12px rgba(245,166,35,.35)}
// // .fab-secondary{background:#fff;color:var(--text);border:1px solid var(--border)}
// // .fab-secondary:hover{background:#f1f5f9}
// // .fab-danger{background:rgba(220,38,38,.08);color:var(--red);border:1px solid rgba(220,38,38,.2)}
// // .fab-danger:hover{background:rgba(220,38,38,.14)}
// // /* STAT CARDS */
// // .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
// // .stat-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;position:relative;overflow:hidden;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// // .stat-card:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
// // .stat-card::after{content:'';position:absolute;top:-10px;right:-10px;width:70px;height:70px;border-radius:50%;opacity:.08}
// // .stat-card.s-green::after{background:var(--green)}
// // .stat-card.s-amber::after{background:var(--accent)}
// // .stat-card.s-blue::after{background:var(--blue)}
// // .stat-card.s-purple::after{background:var(--purple)}
// // .stat-label{font-size:10.5px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
// // .stat-val{font-size:30px;font-weight:700;line-height:1;letter-spacing:-1px}
// // .stat-val.green{color:var(--green)} .stat-val.amber{color:var(--accent)} .stat-val.blue{color:var(--blue2)} .stat-val.purple{color:var(--purple)}
// // .stat-sub{font-size:11.5px;color:var(--muted);margin-top:8px;display:flex;align-items:center;gap:5px}
// // .stat-trend{font-size:10.5px;padding:2px 7px;border-radius:6px;font-weight:700}
// // .stat-trend.up{background:rgba(22,163,74,.1);color:var(--green)}
// // .stat-trend.down{background:rgba(220,38,38,.1);color:var(--red)}
// // /* CARDS */
// // .mid-row{display:grid;grid-template-columns:1fr 320px;gap:14px}
// // .map-card,.alerts-card,.table-card,.route-card{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// // .card-header{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid var(--border);background:#f8fafc}
// // .card-title{font-size:13.5px;font-weight:600;color:var(--text)}
// // .card-sub{font-size:11.5px;color:var(--muted)}
// // .ch-right{margin-left:auto;display:flex;align-items:center;gap:8px}
// // .pill{font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid transparent;background:none;font-family:'DM Sans',sans-serif}
// // .pill.active{background:var(--accent);color:#1a1a1a;border-color:var(--accent)}
// // .pill.passive{background:#f1f5f9;color:var(--muted);border-color:var(--border)}
// // .pill.passive:hover{background:#e2e8f0;color:var(--text)}
// // /* MAP */
// // .map-body{height:250px;background:#eef4fb;position:relative;overflow:hidden}
// // .map-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,139,212,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,139,212,.1) 1px,transparent 1px);background-size:36px 36px}
// // .map-road{position:absolute;background:rgba(148,163,184,.3);border-radius:2px}
// // .bus-dot{position:absolute;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:800;cursor:pointer;transition:transform .2s;z-index:2}
// // .bus-dot:hover{transform:scale(1.35)!important}
// // .bus-dot.on-time{background:var(--green);color:#fff;animation:pulseGreen 2s infinite}
// // .bus-dot.delayed{background:var(--accent);color:#1a1a1a;animation:pulseAmber 2s infinite}
// // .bus-dot.idle{background:#3a4a60;color:#94a3b8;box-shadow:0 0 0 4px rgba(58,74,96,.3)}
// // @keyframes pulseGreen{0%,100%{box-shadow:0 0 0 3px rgba(61,200,122,.25)}50%{box-shadow:0 0 0 8px rgba(61,200,122,.06)}}
// // @keyframes pulseAmber{0%,100%{box-shadow:0 0 0 3px rgba(245,166,35,.25)}50%{box-shadow:0 0 0 8px rgba(245,166,35,.06)}}
// // .stop-dot{position:absolute;width:7px;height:7px;background:#cbd5e1;border:2px solid #94a3b8;border-radius:50%;z-index:1}
// // .route-line-h{position:absolute;height:3px;border-radius:2px;z-index:0}
// // .map-legend{display:flex;align-items:center;gap:16px;padding:10px 18px;border-top:1px solid var(--border);background:#f8fafc}
// // .legend-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
// // .legend-dot{width:8px;height:8px;border-radius:50%}
// // /* ALERTS */
// // .alerts-card{display:flex;flex-direction:column}
// // .alert-item{display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s}
// // .alert-item:last-child{border-bottom:none}
// // .alert-item:hover{background:#f8fafc}
// // .alert-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;margin-top:1px}
// // .alert-icon.warn{background:rgba(245,166,35,.12);color:var(--accent2)}
// // .alert-icon.err{background:rgba(220,38,38,.1);color:var(--red)}
// // .alert-icon.ok{background:rgba(22,163,74,.1);color:var(--green)}
// // .alert-text{font-size:12px;line-height:1.5;flex:1;color:var(--text)}
// // .alert-text strong{font-weight:600}
// // .alert-text span{color:var(--muted)}
// // .alert-time{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:2px}
// // /* BOTTOM ROW */
// // .bot-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
// // .data-table{width:100%;border-collapse:collapse}
// // .data-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;padding:10px 16px;text-align:left;border-bottom:1px solid var(--border);background:#f8fafc}
// // .data-table td{padding:10px 16px;font-size:12.5px;border-bottom:1px solid var(--border);vertical-align:middle;color:var(--text)}
// // .data-table tr:last-child td{border-bottom:none}
// // .data-table tr:hover td{background:#f8fafc}
// // .status-pill{font-size:10px;padding:3px 9px;border-radius:8px;font-weight:700;display:inline-block}
// // .sp-green{background:rgba(61,200,122,.12);color:var(--green)}
// // .sp-amber{background:rgba(245,166,35,.12);color:var(--accent)}
// // .sp-gray{background:rgba(122,143,170,.1);color:var(--muted)}
// // .sp-red{background:rgba(224,82,82,.12);color:var(--red)}
// // .sp-blue{background:rgba(59,139,212,.12);color:var(--blue2)}
// // .sp-purple{background:rgba(165,110,245,.12);color:var(--purple)}
// // .ava-sm{width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#fff;margin-right:6px;vertical-align:middle;flex-shrink:0}
// // .act-btn{background:#f8fafc;border:1px solid var(--border);color:var(--muted);border-radius:7px;padding:4px 10px;font-size:11px;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif}
// // .act-btn:hover{border-color:var(--accent);color:var(--accent2)}
// // /* ROUTES */
// // .route-list{padding:6px 0}
// // .route-item{display:flex;align-items:center;gap:12px;padding:10px 18px;cursor:pointer;transition:background .15s;border-left:2px solid transparent}
// // .route-item:hover{background:#f8fafc}
// // .route-item.active-route{background:rgba(245,166,35,.06);border-left-color:var(--accent)}
// // .route-circle{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0}
// // .rc-a{background:rgba(37,99,235,.12);color:var(--blue2)}
// // .rc-b{background:rgba(22,163,74,.12);color:var(--green)}
// // .rc-c{background:rgba(245,166,35,.15);color:var(--accent2)}
// // .rc-d{background:rgba(124,58,237,.12);color:var(--purple)}
// // .route-info{flex:1}
// // .route-name{font-size:13px;font-weight:600;color:var(--text)}
// // .route-meta{font-size:11px;color:var(--muted);margin-top:1px}
// // .route-bar-wrap{width:80px}
// // .route-bar-bg{height:4px;background:#e2e8f0;border-radius:4px;overflow:hidden}
// // .route-bar-fill{height:100%;border-radius:4px;transition:width .4s ease}
// // .history-strip{border-top:1px solid var(--border);padding:14px 18px;background:#f8fafc}
// // .history-label{font-size:10.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:9px}
// // .history-bars{display:flex;gap:4px;align-items:flex-end;height:32px}
// // .history-bar{flex:1;border-radius:3px 3px 0 0}
// // .history-times{display:flex;justify-content:space-between;margin-top:5px;font-size:10px;color:var(--muted);font-family:'DM Mono',monospace}
// // /* TRACKING */
// // .tracking-grid{display:grid;grid-template-columns:1fr 300px;gap:14px}
// // .map-large{height:420px;background:#eef4fb;border-radius:13px;border:1px solid var(--border);position:relative;overflow:hidden}
// // .bus-detail-panel{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// // .bus-detail-item{padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s;display:flex;align-items:center;gap:10px;border-left:2px solid transparent}
// // .bus-detail-item:hover{background:#f8fafc}
// // .bus-detail-item.selected{background:rgba(245,166,35,.06);border-left-color:var(--accent)}
// // .bdi-num{font-size:13px;font-weight:700}
// // .bdi-route{font-size:11px;color:var(--muted)}
// // .bdi-status{margin-left:auto}
// // /* ANALYTICS */
// // .analytics-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
// // .chart-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// // .chart-title{font-size:13px;font-weight:600;margin-bottom:14px;color:var(--text)}
// // .bar-chart{display:flex;align-items:flex-end;gap:8px;height:100px}
// // .bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px}
// // .bar-fill{width:100%;border-radius:4px 4px 0 0;transition:height .6s ease;min-height:3px}
// // .bar-label{font-size:9px;color:var(--muted);font-family:'DM Mono',monospace}
// // .donut-wrap{display:flex;align-items:center;justify-content:center;gap:18px}
// // .donut-legend{display:flex;flex-direction:column;gap:7px}
// // .donut-leg-item{display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--muted)}
// // .donut-leg-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
// // .kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
// // .kpi-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:16px;display:flex;align-items:center;gap:14px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// // .kpi-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
// // .kpi-val{font-size:22px;font-weight:700}
// // .kpi-lbl{font-size:11px;color:var(--muted);margin-top:2px}
// // /* HISTORY */
// // .history-full{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// // /* STUDENTS */
// // .student-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
// // .student-card{background:#fff;border:1px solid var(--border);border-radius:12px;padding:16px;cursor:pointer;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// // .student-card:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
// // .sc-avatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;margin-bottom:10px}
// // .sc-name{font-size:13px;font-weight:600}
// // .sc-meta{font-size:11px;color:var(--muted);margin-top:2px}
// // .sc-tag{margin-top:8px}
// // /* DRIVERS */
// // .driver-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
// // .driver-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;cursor:pointer;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// // .driver-card:hover{border-color:rgba(37,99,235,.3);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
// // .dc-header{display:flex;align-items:center;gap:12px;margin-bottom:12px}
// // .dc-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff;flex-shrink:0}
// // .dc-name{font-size:14px;font-weight:600}
// // .dc-id{font-size:11px;color:var(--muted);margin-top:1px}
// // .dc-row{display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid var(--border)}
// // .dc-key{color:var(--muted)}
// // .dc-val{font-weight:500;text-align:right}
// // /* ROLES */
// // .role-table-wrap{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// // .permission-matrix{display:grid;grid-template-columns:180px repeat(5,1fr);gap:0;font-size:12px}
// // .pm-header{padding:10px 14px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;background:#f8fafc;border-bottom:1px solid var(--border);text-align:center}
// // .pm-header:first-child{text-align:left}
// // .pm-cell{padding:11px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:center}
// // .pm-cell:first-child{justify-content:flex-start;font-weight:500;color:var(--text)}
// // .pm-check{width:18px;height:18px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;transition:all .15s;border:none;font-family:'DM Sans',sans-serif}
// // .pm-check.on{background:rgba(22,163,74,.12);color:var(--green)}
// // .pm-check.off{background:#f1f5f9;color:#cbd5e1;border:1px solid var(--border)}
// // .pm-check.on:hover{background:rgba(22,163,74,.2)}
// // .pm-check.off:hover{background:#e2e8f0;color:var(--muted)}
// // /* MODAL */
// // .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:500;backdrop-filter:blur(3px);animation:fadeIn .2s ease}
// // .modal{background:#fff;border:1px solid var(--border);border-radius:16px;width:460px;max-width:95vw;max-height:90vh;overflow-y:auto;padding:26px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.15);animation:slideUp .2s ease}
// // @keyframes slideUp{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
// // .modal h3{font-size:16px;font-weight:700;margin-bottom:20px;letter-spacing:-.2px;color:var(--text)}
// // .form-row{margin-bottom:14px}
// // .form-label{font-size:10.5px;color:var(--muted);margin-bottom:6px;display:block;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
// // .form-input{width:100%;background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:10px 13px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .15s,background .15s}
// // .form-input:focus{border-color:var(--accent);background:#fffbf5}
// // .form-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
// // .form-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
// // .modal-actions{display:flex;gap:10px;margin-top:22px}
// // .btn-cancel{flex:1;padding:11px;border-radius:9px;border:1px solid var(--border);background:#f8fafc;color:var(--muted);font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
// // .btn-cancel:hover{border-color:var(--muted);color:var(--text)}
// // .btn-save{flex:2;padding:11px;border-radius:9px;border:none;background:var(--accent);color:#1a1a1a;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
// // .btn-save:hover{background:var(--accent2);transform:translateY(-1px)}
// // .close-btn{position:absolute;top:18px;right:18px;background:#f1f5f9;border:none;color:var(--muted);width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;transition:all .15s;flex-shrink:0}
// // .close-btn:hover{background:#e2e8f0;color:var(--text)}
// // .role-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}
// // .role-chip{padding:5px 14px;border-radius:20px;font-size:11.5px;cursor:pointer;border:1px solid var(--border);color:var(--muted);transition:all .15s;user-select:none;background:none;font-family:'DM Sans',sans-serif}
// // .role-chip:hover{border-color:var(--muted);color:var(--text)}
// // .role-chip.sel{background:rgba(245,166,35,.1);border-color:var(--accent);color:var(--accent2)}
// // .perm-row{display:grid;gap:9px;margin-top:6px}
// // .perm-label{display:flex;align-items:center;gap:9px;font-size:12.5px;cursor:pointer;color:var(--text)}
// // .perm-label input[type=checkbox]{accent-color:var(--accent);width:14px;height:14px}
// // .form-section-title{font-size:11px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.6px;padding:10px 0 4px;border-top:1px solid var(--border);margin-top:4px}
// // .route-stop-list{margin-top:8px;display:flex;flex-direction:column;gap:6px}
// // .stop-item{display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f8fafc;border-radius:7px;border:1px solid var(--border);font-size:12.5px;color:var(--text)}
// // .stop-num{width:20px;height:20px;border-radius:50%;background:rgba(245,166,35,.12);color:var(--accent2);font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
// // .stop-name-txt{flex:1}
// // .remove-stop{background:transparent;border:none;color:var(--muted);cursor:pointer;font-size:16px;line-height:1;padding:0 2px;transition:color .15s}
// // .remove-stop:hover{color:var(--red)}
// // .add-stop-row{display:flex;gap:8px;margin-top:8px}
// // .add-stop-input{flex:1;background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text);font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .15s}
// // .add-stop-input:focus{border-color:var(--accent)}
// // .add-stop-btn{padding:8px 14px;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.25);border-radius:8px;color:var(--accent2);font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap;font-family:'DM Sans',sans-serif}
// // .add-stop-btn:hover{background:rgba(245,166,35,.2)}
// // /* TOAST */
// // .toast{position:fixed;bottom:28px;right:28px;background:var(--green);color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:slideUp .3s ease}
// // /* SEARCH */
// // .search-bar{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;transition:border-color .15s}
// // .search-bar:focus-within{border-color:var(--accent)}
// // .search-bar input{background:transparent;border:none;outline:none;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;width:200px}
// // .search-bar input::placeholder{color:var(--muted)}
// // .filter-select{background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;color:var(--text);font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer}
// // ::-webkit-scrollbar{width:5px;height:5px}
// // ::-webkit-scrollbar-track{background:transparent}
// // ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
// // ::-webkit-scrollbar-thumb:hover{background:#94a3b8}
// // `;

// // /* ─── SVG ICONS ───────────────────────────────────────────────────────── */
// // const IconDash  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>;
// // const IconClock = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
// // const IconBus   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
// // const IconUser  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
// // const IconRoute = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
// // const IconPeople= () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
// // const IconBar   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
// // const IconFile  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
// // const IconLock  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
// // const IconLogout= () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
// // const IconSearch= () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
// // const IconBell  = () => <svg width="15" height="15" fill="none" stroke="var(--muted)" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
// // const BusLogo   = () => <svg viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 9h16v4H4V9z"/></svg>;

// // /* ─── MODAL COMPONENTS ────────────────────────────────────────────────── */
// // function AddStopList() {
// //   const [stops, setStops] = useState(["Main Gate","Market Circle","City Park"]);
// //   const [input, setInput] = useState("");
// //   const addStop = () => {
// //     const name = input.trim();
// //     if (!name) return;
// //     setStops(s => [...s, name]);
// //     setInput("");
// //   };
// //   const removeStop = (i) => setStops(s => s.filter((_, idx) => idx !== i));
// //   return (
// //     <>
// //       <div className="route-stop-list">
// //         {stops.map((s, i) => (
// //           <div className="stop-item" key={i}>
// //             <div className="stop-num">{i + 1}</div>
// //             <div className="stop-name-txt">{s}</div>
// //             <button className="remove-stop" onClick={() => removeStop(i)}>×</button>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="add-stop-row">
// //         <input className="add-stop-input" placeholder="Add stop name..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addStop()} />
// //         <button className="add-stop-btn" onClick={addStop}>+ Add</button>
// //       </div>
// //     </>
// //   );
// // }

// // function PermCheck({ defaultOn }) {
// //   const [on, setOn] = useState(defaultOn);
// //   return <button className={`pm-check ${on ? "on" : "off"}`} onClick={() => setOn(o => !o)}>{on ? "✓" : "—"}</button>;
// // }

// // function RoleChip({ label, defaultSel }) {
// //   const [sel, setSel] = useState(defaultSel);
// //   return <button className={`role-chip${sel ? " sel" : ""}`} onClick={() => setSel(s => !s)}>{label}</button>;
// // }

// // /* ─── MODALS ──────────────────────────────────────────────────────────── */
// // function ModalBus({ onClose, onSave }) {
// //   return (
// //     <div className="modal">
// //       <button className="close-btn" onClick={onClose}>×</button>
// //       <h3>Add / Edit Bus</h3>
// //       <div className="form-row2">
// //         <div className="form-row"><label className="form-label">Bus Number</label><input className="form-input" placeholder="KA-XX-X" /></div>
// //         <div className="form-row"><label className="form-label">Model</label><input className="form-input" placeholder="Tata Starbus" /></div>
// //       </div>
// //       <div className="form-row"><label className="form-label">Assign Driver</label>
// //         <select className="form-input"><option>— Select driver —</option><option>R. Kumar</option><option>P. Sharma</option><option>M. Rao</option><option>S. Joshi</option></select>
// //       </div>
// //       <div className="form-row"><label className="form-label">Assign Route</label>
// //         <select className="form-input"><option>— Select route —</option><option>Route A — North Loop</option><option>Route B — East Connect</option><option>Route C — South Express</option><option>Route D — West Campus</option></select>
// //       </div>
// //       <div className="form-row2">
// //         <div className="form-row"><label className="form-label">Capacity</label><input className="form-input" placeholder="50" type="number" /></div>
// //         <div className="form-row"><label className="form-label">Status</label>
// //           <select className="form-input"><option>Active</option><option>Maintenance</option><option>Idle</option></select>
// //         </div>
// //       </div>
// //       <div className="modal-actions">
// //         <button className="btn-cancel" onClick={onClose}>Cancel</button>
// //         <button className="btn-save" onClick={() => onSave("Bus saved successfully!")}>Save Bus</button>
// //       </div>
// //     </div>
// //   );
// // }

// // function ModalDriver({ onClose, onSave }) {
// //   return (
// //     <div className="modal">
// //       <button className="close-btn" onClick={onClose}>×</button>
// //       <h3>Add / Edit Driver</h3>
// //       <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" placeholder="Driver full name" /></div>
// //       <div className="form-row2">
// //         <div className="form-row"><label className="form-label">License No.</label><input className="form-input" placeholder="DL-XXXX-XXXX" /></div>
// //         <div className="form-row"><label className="form-label">Experience (yrs)</label><input className="form-input" placeholder="5" type="number" /></div>
// //       </div>
// //       <div className="form-row"><label className="form-label">Phone</label><input className="form-input" placeholder="+91 9XXXXXXXXX" /></div>
// //       <div className="form-row"><label className="form-label">Assign Bus</label>
// //         <select className="form-input"><option>— Select bus —</option><option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option><option>KA-04-D</option></select>
// //       </div>
// //       <div className="modal-actions">
// //         <button className="btn-cancel" onClick={onClose}>Cancel</button>
// //         <button className="btn-save" onClick={() => onSave("Driver saved successfully!")}>Save Driver</button>
// //       </div>
// //     </div>
// //   );
// // }

// // function ModalRoute({ onClose, onSave }) {
// //   return (
// //     <div className="modal">
// //       <button className="close-btn" onClick={onClose}>×</button>
// //       <h3>Create / Edit Route</h3>
// //       <div className="form-row2">
// //         <div className="form-row"><label className="form-label">Route ID</label><input className="form-input" placeholder="E (next available)" /></div>
// //         <div className="form-row"><label className="form-label">Route Name</label><input className="form-input" placeholder="North Loop" /></div>
// //       </div>
// //       <div className="form-row"><label className="form-label">Description</label><input className="form-input" placeholder="Short description..." /></div>
// //       <div className="form-section-title">Stops</div>
// //       <AddStopList />
// //       <div className="form-row" style={{marginTop:14}}><label className="form-label">Assign Buses</label>
// //         <select className="form-input" multiple style={{height:90}}>
// //           <option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option><option>KA-04-D</option><option>KA-05-E</option>
// //         </select>
// //         <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Hold Ctrl/Cmd to select multiple buses</div>
// //       </div>
// //       <div className="modal-actions">
// //         <button className="btn-cancel" onClick={onClose}>Cancel</button>
// //         <button className="btn-save" onClick={() => onSave("Route created successfully!")}>Create Route</button>
// //       </div>
// //     </div>
// //   );
// // }

// // function ModalStudent({ onClose, onSave }) {
// //   return (
// //     <div className="modal">
// //       <button className="close-btn" onClick={onClose}>×</button>
// //       <h3>Add Student</h3>
// //       <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" placeholder="Student full name" /></div>
// //       <div className="form-row2">
// //         <div className="form-row"><label className="form-label">Roll No.</label><input className="form-input" placeholder="2024-XXX" /></div>
// //         <div className="form-row"><label className="form-label">Class / Section</label><input className="form-input" placeholder="10-A" /></div>
// //       </div>
// //       <div className="form-row"><label className="form-label">Assign Route</label>
// //         <select className="form-input"><option value="">— Select route —</option><option>Route A — North Loop</option><option>Route B — East Connect</option><option>Route C — South Express</option><option>Route D — West Campus</option></select>
// //       </div>
// //       <div className="form-row"><label className="form-label">Pickup Stop</label>
// //         <select className="form-input"><option value="">— Select stop —</option><option>Main Gate</option><option>Market Square</option><option>North Bridge</option><option>City Park</option><option>East Market</option><option>Rail Station</option><option>Tilakwadi</option><option>Sadashiv Nagar</option><option>Campus A</option><option>Science Block</option></select>
// //       </div>
// //       <div className="form-row"><label className="form-label">Parent Contact</label><input className="form-input" placeholder="+91 9XXXXXXXXX" /></div>
// //       <div className="modal-actions">
// //         <button className="btn-cancel" onClick={onClose}>Cancel</button>
// //         <button className="btn-save" onClick={() => onSave("Student added successfully!")}>Save Student</button>
// //       </div>
// //     </div>
// //   );
// // }

// // function ModalRole({ onClose, onSave }) {
// //   return (
// //     <div className="modal">
// //       <button className="close-btn" onClick={onClose}>×</button>
// //       <h3>Add / Edit User Role</h3>
// //       <div className="form-row2">
// //         <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" placeholder="User full name" /></div>
// //         <div className="form-row"><label className="form-label">User Email</label><input className="form-input" placeholder="user@school.edu" /></div>
// //       </div>
// //       <div className="form-row"><label className="form-label">Assign Role</label>
// //         <div className="role-row">
// //           {["Super Admin","Admin","Dispatcher","Driver","Viewer"].map((r,i) => <RoleChip key={r} label={r} defaultSel={i===1} />)}
// //         </div>
// //       </div>
// //       <div className="form-row" style={{marginTop:4}}><label className="form-label">Permissions</label>
// //         <div className="perm-row">
// //           {["View live map & tracking","Manage buses & drivers","Edit routes & stops","Access analytics & reports","Manage students","System & role administration"].map((p,i) => (
// //             <label className="perm-label" key={p}><input type="checkbox" defaultChecked={i<2} style={{accentColor:"var(--accent)",width:14,height:14}} /> {p}</label>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="modal-actions">
// //         <button className="btn-cancel" onClick={onClose}>Cancel</button>
// //         <button className="btn-save" onClick={() => onSave("User role updated!")}>Save User</button>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─── PAGES ───────────────────────────────────────────────────────────── */
// // function PageDashboard({ showModal }) {
// //   const [activePill, setActivePill] = useState("All");
// //   const [activeRoute, setActiveRoute] = useState(0);
// //   const pills = ["All","Route A","Route B","Route C"];
// //   const routes = [
// //     {cls:"rc-a",name:"Route A — North Loop",meta:"12 stops · 6 buses · 34 min",pct:92,color:"var(--green)"},
// //     {cls:"rc-b",name:"Route B — East Connect",meta:"8 stops · 4 buses · 28 min",pct:67,color:"var(--accent)"},
// //     {cls:"rc-c",name:"Route C — South Express",meta:"10 stops · 5 buses · 40 min",pct:88,color:"var(--green)"},
// //     {cls:"rc-d",name:"Route D — West Campus",meta:"6 stops · 3 buses · 22 min",pct:50,color:"var(--muted)"},
// //   ];
// //   return (
// //     <div className="page">
// //       <div className="page-header">
// //         <div><div className="page-title">Dashboard</div><div className="page-subtitle">Good morning — Sunday, April 19, 2026</div></div>
// //         <div className="fab-row">
// //           <button className="fab-btn fab-primary" onClick={() => showModal("bus")}>＋ Add Bus</button>
// //           <button className="fab-btn fab-secondary" onClick={() => showModal("driver")}>＋ Add Driver</button>
// //           <button className="fab-btn fab-secondary" onClick={() => showModal("route")}>＋ Create Route</button>
// //           <button className="fab-btn fab-secondary" onClick={() => showModal("student")}>＋ Add Student</button>
// //         </div>
// //       </div>
// //       <div className="stat-grid">
// //         <div className="stat-card s-green"><div className="stat-label">Active Buses</div><div className="stat-val green">18</div><div className="stat-sub"><span className="stat-trend up">+2</span> vs yesterday</div></div>
// //         <div className="stat-card s-amber"><div className="stat-label">Delayed Buses</div><div className="stat-val amber">3</div><div className="stat-sub"><span className="stat-trend down">▲ 1</span> alert active</div></div>
// //         <div className="stat-card s-blue"><div className="stat-label">Drivers on Duty</div><div className="stat-val blue">21</div><div className="stat-sub"><span className="stat-trend up">100%</span> assigned</div></div>
// //         <div className="stat-card s-purple"><div className="stat-label">Students Today</div><div className="stat-val purple">1,248</div><div className="stat-sub"><span className="stat-trend up">+34</span> this week</div></div>
// //       </div>
// //       <div className="mid-row">
// //         <div className="map-card">
// //           <div className="card-header">
// //             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
// //             <span className="card-title">Live Map</span><span className="card-sub">— all buses</span>
// //             <div className="ch-right">
// //               {pills.map(p => <button key={p} className={`pill ${activePill===p?"active":"passive"}`} onClick={()=>setActivePill(p)}>{p}</button>)}
// //             </div>
// //           </div>
// //           <div className="map-body">
// //             <div className="map-grid-bg"/>
// //             <div className="map-road" style={{left:0,top:118,width:"100%",height:3,opacity:.5}}/>
// //             <div className="map-road" style={{left:0,top:62,width:"100%",height:2,opacity:.25}}/>
// //             <div className="map-road" style={{left:0,top:185,width:"100%",height:2,opacity:.25}}/>
// //             <div className="map-road" style={{left:120,top:0,width:3,height:"100%",opacity:.4}}/>
// //             <div className="map-road" style={{left:280,top:0,width:2,height:"100%",opacity:.25}}/>
// //             <div className="map-road" style={{left:450,top:0,width:2,height:"100%",opacity:.25}}/>
// //             <div className="route-line-h" style={{left:80,top:109,width:240,background:"rgba(59,139,212,.35)"}}/>
// //             <div className="route-line-h" style={{left:60,top:176,width:300,background:"rgba(61,200,122,.3)"}}/>
// //             <div className="route-line-h" style={{left:300,top:63,width:200,background:"rgba(245,166,35,.25)"}}/>
// //             {[[76,114],[160,114],[240,114],[315,114],[56,171],[160,171],[320,171],[310,58],[420,58]].map(([l,t],i)=><div key={i} className="stop-dot" style={{left:l,top:t}}/>)}
// //             {[["on-time",130,108,"Bus A1 — On time","A1"],["on-time",200,108,"Bus A2 — On time","A2"],["delayed",268,108,"Bus B3 — Delayed 12 min","B3"],["on-time",100,165,"Bus C1 — On time","C1"],["on-time",240,165,"Bus C2 — On time","C2"],["on-time",390,108,"Bus D1 — On time","D1"],["delayed",370,53,"Bus E2 — Delayed","E2"],["idle",430,178,"Bus F1 — Idle","F1"]].map(([cls,l,t,title,lbl])=>(
// //               <div key={lbl} className={`bus-dot ${cls}`} style={{left:l,top:t}} title={title}>{lbl}</div>
// //             ))}
// //           </div>
// //           <div className="map-legend">
// //             <div className="legend-item"><div className="legend-dot" style={{background:"var(--green)"}}/> On time (18)</div>
// //             <div className="legend-item"><div className="legend-dot" style={{background:"var(--accent)"}}/> Delayed (3)</div>
// //             <div className="legend-item"><div className="legend-dot" style={{background:"#3a4a60"}}/> Idle (2)</div>
// //           </div>
// //         </div>
// //         <div className="alerts-card">
// //           <div className="card-header">
// //             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
// //             <span className="card-title">Delay Alerts</span>
// //             <div className="ch-right"><button className="pill passive" style={{fontSize:10}}>Mark all read</button></div>
// //           </div>
// //           {[{t:"warn",icon:"⚠",txt:<><strong>Bus B3</strong> <span>is 12 min delayed on Route B — stop 4</span></>,time:"09:14 AM"},
// //             {t:"err",icon:"!",txt:<><strong>Bus E2</strong> <span>engine warning — driver notified</span></>,time:"09:08 AM"},
// //             {t:"warn",icon:"⚠",txt:<><strong>Route C</strong> <span>heavy traffic near Main St</span></>,time:"08:55 AM"},
// //             {t:"ok",icon:"✓",txt:<><strong>Bus A1</strong> <span>resumed schedule after delay</span></>,time:"08:42 AM"},
// //             {t:"ok",icon:"✓",txt:<><strong>Driver R. Kumar</strong> <span>checked in for morning shift</span></>,time:"08:00 AM"},
// //           ].map((a,i)=>(
// //             <div className="alert-item" key={i}>
// //               <div className={`alert-icon ${a.t}`}>{a.icon}</div>
// //               <div style={{flex:1}}><div className="alert-text">{a.txt}</div><div className="alert-time">{a.time}</div></div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="bot-row">
// //         <div className="table-card">
// //           <div className="card-header">
// //             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--blue2)" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
// //             <span className="card-title">Buses</span>
// //             <div className="ch-right"><button className="fab-btn fab-primary" style={{padding:"5px 12px",fontSize:11}} onClick={()=>showModal("bus")}>＋ Add</button></div>
// //           </div>
// //           <table className="data-table">
// //             <thead><tr><th>Bus</th><th>Driver</th><th>Route</th><th>Status</th><th></th></tr></thead>
// //             <tbody>
// //               {[["KA-01-B","#3b8bd4","RK","R. Kumar","Route A","sp-green","On Time"],
// //                 ["KA-02-B","#8b5cf6","PS","P. Sharma","Route B","sp-amber","Delayed"],
// //                 ["KA-03-C","#3dc87a","MR","M. Rao","Route C","sp-green","On Time"],
// //                 ["KA-04-D","#e05252","SJ","S. Joshi","Route D","sp-gray","Idle"],
// //                 ["KA-05-E","#f5a623","AB","A. Baig","Route A","sp-red","⚠ Warning"],
// //               ].map(([bus,bg,init,drv,route,sc,st])=>(
// //                 <tr key={bus}><td><strong>{bus}</strong></td><td><span className="ava-sm" style={{background:bg}}>{init}</span>{drv}</td><td>{route}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn" onClick={()=>showModal("bus")}>Edit</button></td></tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //         <div className="route-card">
// //           <div className="card-header">
// //             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
// //             <span className="card-title">Routes</span>
// //             <div className="ch-right"><button className="fab-btn fab-secondary" style={{padding:"5px 12px",fontSize:11}} onClick={()=>showModal("route")}>＋ New</button></div>
// //           </div>
// //           <div className="route-list">
// //             {routes.map((r,i)=>(
// //               <div key={i} className={`route-item${activeRoute===i?" active-route":""}`} onClick={()=>setActiveRoute(i)}>
// //                 <div className={`route-circle ${r.cls}`}>{["A","B","C","D"][i]}</div>
// //                 <div className="route-info"><div className="route-name">{r.name}</div><div className="route-meta">{r.meta}</div></div>
// //                 <div className="route-bar-wrap">
// //                   <div style={{fontSize:10,color:r.color,marginBottom:3,textAlign:"right"}}>{r.pct}%</div>
// //                   <div className="route-bar-bg"><div className="route-bar-fill" style={{width:`${r.pct}%`,background:r.color}}/></div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="history-strip">
// //             <div className="history-label">Bus History — KA-01-B today</div>
// //             <div className="history-bars">
// //               {[["var(--green)",.8,"60%"],["var(--green)",.9,"75%"],["var(--accent)",1,"90%"],["var(--green)",.85,"70%"],["var(--green)",.9,"80%"],["var(--green)",1,"65%"],["rgba(100,116,139,.15)",1,"40%"],["rgba(100,116,139,.15)",1,"40%"]].map(([bg,op,h],i)=>(
// //                 <div key={i} className="history-bar" style={{background:bg,opacity:op,height:h}}/>
// //               ))}
// //             </div>
// //             <div className="history-times"><span>07:00</span><span>08:00</span><span>09:00</span><span>10:00</span></div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function PageTracking({ showToast }) {
// //   const [selected, setSelected] = useState(0);
// //   const buses = [
// //     ["KA-01-B","Route A — R. Kumar","sp-green","On Time"],["KA-02-B","Route B — P. Sharma","sp-amber","+12 min"],
// //     ["KA-03-C","Route C — M. Rao","sp-green","On Time"],["KA-04-D","Route D — S. Joshi","sp-gray","Idle"],
// //     ["KA-05-E","Route A — A. Baig","sp-red","Warning"],["KA-06-F","Route B — V. Patil","sp-green","On Time"],
// //     ["KA-07-G","Route C — D. Nair","sp-green","On Time"],["KA-08-H","Route D — K. Singh","sp-amber","+5 min"],
// //   ];
// //   return (
// //     <div className="page">
// //       <div className="page-header">
// //         <div><div className="page-title">Live Tracking</div><div className="page-subtitle">Real-time positions of all active buses</div></div>
// //         <div style={{display:"flex",gap:8,alignItems:"center"}}>
// //           <span className="status-pill sp-green" style={{fontSize:11,padding:"5px 12px"}}>● Live</span>
// //           <button className="fab-btn fab-secondary">⟳ Refresh</button>
// //         </div>
// //       </div>
// //       <div className="stat-grid">
// //         <div className="stat-card s-green"><div className="stat-label">On Time</div><div className="stat-val green">18</div><div className="stat-sub">buses running normally</div></div>
// //         <div className="stat-card s-amber"><div className="stat-label">Delayed</div><div className="stat-val amber">3</div><div className="stat-sub">avg 9 min delay</div></div>
// //         <div className="stat-card s-blue"><div className="stat-label">Idle</div><div className="stat-val blue">2</div><div className="stat-sub">at depot / maintenance</div></div>
// //         <div className="stat-card s-purple"><div className="stat-label">Coverage</div><div className="stat-val purple">96%</div><div className="stat-sub">route completion rate</div></div>
// //       </div>
// //       <div className="tracking-grid">
// //         <div className="map-large">
// //           <div className="map-grid-bg"/>
// //           <div className="map-road" style={{left:0,top:200,width:"100%",height:3,opacity:.5}}/>
// //           <div className="map-road" style={{left:0,top:100,width:"100%",height:2,opacity:.25}}/>
// //           <div className="map-road" style={{left:0,top:320,width:"100%",height:2,opacity:.25}}/>
// //           <div className="map-road" style={{left:200,top:0,width:3,height:"100%",opacity:.4}}/>
// //           <div className="map-road" style={{left:480,top:0,width:2,height:"100%",opacity:.25}}/>
// //           <div className="map-road" style={{left:720,top:0,width:2,height:"100%",opacity:.25}}/>
// //           <div className="route-line-h" style={{left:50,top:190,width:480,background:"rgba(59,139,212,.4)"}}/>
// //           <div className="route-line-h" style={{left:80,top:310,width:560,background:"rgba(61,200,122,.35)"}}/>
// //           <div className="route-line-h" style={{left:300,top:95,width:400,background:"rgba(245,166,35,.3)"}}/>
// //           <div className="route-line-h" style={{left:100,top:355,width:300,background:"rgba(165,110,245,.25)"}}/>
// //           {[[50,194],[180,194],[300,194],[420,194],[520,194],[80,305],[220,305],[380,305],[530,305],[300,90],[460,90],[620,90]].map(([l,t],i)=><div key={i} className="stop-dot" style={{left:l,top:t}}/>)}
// //           {[["on-time",160,183,"Bus A1","A1"],["on-time",340,183,"Bus A2","A2"],["delayed",490,183,"Bus B3 — 12 min late","B3"],["on-time",140,294,"Bus C1","C1"],["on-time",350,294,"Bus C2","C2"],["on-time",400,88,"Bus D1","D1"],["delayed",580,88,"Bus E2 — delayed","E2"],["idle",700,340,"Bus F1 — Idle","F1"]].map(([cls,l,t,title,lbl])=>(
// //             <div key={lbl} className={`bus-dot ${cls}`} style={{left:l,top:t}} title={title} onClick={()=>showToast(title)}>{lbl}</div>
// //           ))}
// //           <div style={{position:"absolute",left:10,top:6,fontSize:10,color:"#94a3b8",fontFamily:"'DM Mono',monospace"}}>BELAGAVI CITY</div>
// //           <div style={{position:"absolute",left:10,top:185,fontSize:9,color:"rgba(37,99,235,.7)",fontFamily:"'DM Mono',monospace"}}>Route A</div>
// //           <div style={{position:"absolute",left:10,top:300,fontSize:9,color:"rgba(22,163,74,.7)",fontFamily:"'DM Mono',monospace"}}>Route B</div>
// //           <div style={{position:"absolute",left:303,top:75,fontSize:9,color:"rgba(245,166,35,.8)",fontFamily:"'DM Mono',monospace"}}>Route C</div>
// //         </div>
// //         <div className="bus-detail-panel">
// //           <div className="card-header"><span className="card-title">All Buses</span><div className="ch-right"><span className="card-sub">23 total</span></div></div>
// //           <div style={{overflowY:"auto",flex:1}}>
// //             {buses.map(([num,route,sc,st],i)=>(
// //               <div key={i} className={`bus-detail-item${selected===i?" selected":""}`} onClick={()=>setSelected(i)}>
// //                 <div><div className="bdi-num">{num}</div><div className="bdi-route">{route}</div></div>
// //                 <div className="bdi-status"><span className={`status-pill ${sc}`}>{st}</span></div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function PageBuses({ showModal }) {
// //   return (
// //     <div className="page">
// //       <div className="page-header">
// //         <div><div className="page-title">Buses</div><div className="page-subtitle">Manage fleet — 23 buses registered</div></div>
// //         <div className="fab-row">
// //           <div className="search-bar"><IconSearch/><input placeholder="Search buses..."/></div>
// //           <select className="filter-select"><option>All Routes</option><option>Route A</option><option>Route B</option><option>Route C</option><option>Route D</option></select>
// //           <button className="fab-btn fab-primary" onClick={()=>showModal("bus")}>＋ Add Bus</button>
// //         </div>
// //       </div>
// //       <div className="table-card">
// //         <table className="data-table">
// //           <thead><tr><th>Bus No.</th><th>Model</th><th>Driver</th><th>Assigned Route</th><th>Capacity</th><th>Status</th><th>Last Active</th><th></th></tr></thead>
// //           <tbody>
// //             {[["KA-01-B","Tata Starbus","#3b8bd4","RK","R. Kumar","sp-blue","Route A",50,"sp-green","On Time","09:12"],
// //               ["KA-02-B","Ashok Leyland","#8b5cf6","PS","P. Sharma","sp-green","Route B",48,"sp-amber","Delayed","09:08"],
// //               ["KA-03-C","Tata Starbus","#3dc87a","MR","M. Rao","sp-amber","Route C",52,"sp-green","On Time","09:14"],
// //               ["KA-04-D","Eicher Bus","#e05252","SJ","S. Joshi","sp-purple","Route D",45,"sp-gray","Idle","07:30"],
// //               ["KA-05-E","Tata Starbus","#f5a623","AB","A. Baig","sp-blue","Route A",50,"sp-red","⚠ Warning","08:55"],
// //               ["KA-06-F","Ashok Leyland","#0ea5e9","VP","V. Patil","sp-green","Route B",48,"sp-green","On Time","09:10"],
// //               ["KA-07-G","Volvo 9400","#14b8a6","DN","D. Nair","sp-amber","Route C",55,"sp-green","On Time","09:13"],
// //             ].map(([bus,model,bg,init,drv,rsc,route,cap,sc,st,time])=>(
// //               <tr key={bus}><td><strong>{bus}</strong></td><td>{model}</td><td><span className="ava-sm" style={{background:bg}}>{init}</span>{drv}</td><td><span className={`status-pill ${rsc}`}>{route}</span></td><td>{cap}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td style={{color:"var(--muted)",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{time}</td><td><button className="act-btn" onClick={()=>showModal("bus")}>Edit</button></td></tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // function PageDrivers({ showModal }) {
// //   const drivers = [
// //     {bg:"#3b8bd4",init:"RK",name:"R. Kumar",id:"DL-5201-2019 · 8 yrs exp",sc:"sp-green",st:"Active",bus:"KA-01-B",route:"Route A — North Loop",phone:"+91 98765 43210",trips:"6 / 6",tc:"var(--green)"},
// //     {bg:"#8b5cf6",init:"PS",name:"P. Sharma",id:"DL-3892-2017 · 10 yrs exp",sc:"sp-amber",st:"Delayed",bus:"KA-02-B",route:"Route B — East Connect",phone:"+91 91234 56789",trips:"4 / 6",tc:"var(--accent)"},
// //     {bg:"#3dc87a",init:"MR",name:"M. Rao",id:"DL-1123-2020 · 6 yrs exp",sc:"sp-green",st:"Active",bus:"KA-03-C",route:"Route C — South Express",phone:"+91 90000 11223",trips:"5 / 6",tc:"var(--green)"},
// //     {bg:"#e05252",init:"SJ",name:"S. Joshi",id:"DL-7741-2018 · 9 yrs exp",sc:"sp-gray",st:"Idle",bus:"KA-04-D",route:"Route D — West Campus",phone:"+91 99887 76655",trips:"2 / 6",tc:"var(--muted)"},
// //     {bg:"#f5a623",init:"AB",name:"A. Baig",id:"DL-4456-2021 · 5 yrs exp",sc:"sp-red",st:"Warning",bus:"KA-05-E",route:"Route A — North Loop",phone:"+91 88001 23456",trips:"3 / 6",tc:"var(--red)"},
// //     {bg:"#0ea5e9",init:"VP",name:"V. Patil",id:"DL-9920-2016 · 12 yrs exp",sc:"sp-green",st:"Active",bus:"KA-06-F",route:"Route B — East Connect",phone:"+91 97654 32109",trips:"6 / 6",tc:"var(--green)"},
// //   ];
// //   return (
// //     <div className="page">
// //       <div className="page-header">
// //         <div><div className="page-title">Drivers</div><div className="page-subtitle">21 drivers on duty today</div></div>
// //         <div className="fab-row">
// //           <div className="search-bar"><IconSearch/><input placeholder="Search drivers..."/></div>
// //           <button className="fab-btn fab-primary" onClick={()=>showModal("driver")}>＋ Add Driver</button>
// //         </div>
// //       </div>
// //       <div className="driver-cards">
// //         {drivers.map(d=>(
// //           <div className="driver-card" key={d.name}>
// //             <div className="dc-header">
// //               <div className="dc-avatar" style={{background:d.bg}}>{d.init}</div>
// //               <div><div className="dc-name">{d.name}</div><div className="dc-id">{d.id}</div></div>
// //               <span className={`status-pill ${d.sc}`} style={{marginLeft:"auto"}}>{d.st}</span>
// //             </div>
// //             {[["Assigned Bus",d.bus],["Route",d.route],["Phone",d.phone]].map(([k,v])=>(
// //               <div className="dc-row" key={k}><span className="dc-key">{k}</span><span className="dc-val">{v}</span></div>
// //             ))}
// //             <div className="dc-row" style={{border:"none"}}><span className="dc-key">Trips Today</span><span className="dc-val" style={{color:d.tc}}>{d.trips}</span></div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // function PageRoutes({ showModal }) {
// //   const routes = [
// //     {cls:"rc-a",letter:"A",name:"Route A — North Loop",sc:"sp-green",ont:"92% on-time",stops:12,buses:6,avg:"34 min",tags:[{col:"var(--blue2)",bg:"rgba(37,99,235,.12)",border:"rgba(37,99,235,.2)"}],stopNames:["Main Gate","Market Circle","City Park","North Bridge"],more:"+8 more"},
// //     {cls:"rc-b",letter:"B",name:"Route B — East Connect",sc:"sp-amber",ont:"67% on-time",stops:8,buses:4,avg:"28 min",tags:[{col:"var(--green)",bg:"rgba(22,163,74,.1)",border:"rgba(22,163,74,.2)"}],stopNames:["Depot","East Market","Rail Station"],more:"+5 more"},
// //     {cls:"rc-c",letter:"C",name:"Route C — South Express",sc:"sp-green",ont:"88% on-time",stops:10,buses:5,avg:"40 min",tags:[{col:"var(--accent)",bg:"rgba(245,166,35,.1)",border:"rgba(245,166,35,.2)"}],stopNames:["School Gate","Tilakwadi","Sadashiv Nagar"],more:"+7 more"},
// //     {cls:"rc-d",letter:"D",name:"Route D — West Campus",sc:"sp-gray",ont:"50% on-time",stops:6,buses:3,avg:"22 min",tags:[{col:"#b07ef7",bg:"rgba(165,110,245,.1)",border:"rgba(165,110,245,.2)"}],stopNames:["Campus A","Science Block","Hostel"],more:"+3 more"},
// //   ];
// //   const stopColors = ["rgba(37,99,235,.12)","rgba(22,163,74,.1)","rgba(245,166,35,.1)","rgba(165,110,245,.1)"];
// //   const stopBorders = ["rgba(37,99,235,.2)","rgba(22,163,74,.2)","rgba(245,166,35,.2)","rgba(165,110,245,.2)"];
// //   const stopTextColors = ["var(--blue2)","var(--green)","var(--accent)","#b07ef7"];
// //   return (
// //     <div className="page">
// //       <div className="page-header">
// //         <div><div className="page-title">Routes</div><div className="page-subtitle">4 active routes — 36 stops total</div></div>
// //         <button className="fab-btn fab-primary" onClick={()=>showModal("route")}>＋ Create Route</button>
// //       </div>
// //       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
// //         {routes.map((r,ri)=>(
// //           <div className="table-card" key={r.letter}>
// //             <div className="card-header">
// //               <div className={`route-circle ${r.cls}`} style={{width:26,height:26,fontSize:10}}>{r.letter}</div>
// //               <span className="card-title">{r.name}</span>
// //               <div className="ch-right"><span className={`status-pill ${r.sc}`}>{r.ont}</span></div>
// //             </div>
// //             <div style={{padding:"16px 18px"}}>
// //               <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
// //                 <div><div className="stat-label">Stops</div><div style={{fontSize:18,fontWeight:700}}>{r.stops}</div></div>
// //                 <div><div className="stat-label">Buses</div><div style={{fontSize:18,fontWeight:700,color:"var(--blue2)"}}>{r.buses}</div></div>
// //                 <div><div className="stat-label">Avg Time</div><div style={{fontSize:18,fontWeight:700,color:stopTextColors[ri]}}>{r.avg}</div></div>
// //               </div>
// //               <div style={{fontSize:11,color:"var(--muted)",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Stop Sequence</div>
// //               <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
// //                 {r.stopNames.map(s=>(
// //                   <span key={s} style={{fontSize:11.5,padding:"3px 9px",background:stopColors[ri],border:`1px solid ${stopBorders[ri]}`,borderRadius:6,color:stopTextColors[ri]}}>{s}</span>
// //                 ))}
// //                 <span style={{fontSize:11,color:"var(--muted)"}}>{r.more ? `→ ${r.more}` : ""}</span>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // function PageStudents({ showModal }) {
// //   const students = [
// //     ["#3b8bd4","AR","Aryan Reddy","2024-001","10-A","sp-blue","Route A","North Bridge","sp-green","Active"],
// //     ["#e05252","PS","Priya Singh","2024-002","9-B","sp-green","Route B","East Market","sp-green","Active"],
// //     ["#f5a623","KN","Kartik Nair","2024-003","11-C","sp-amber","Route C","Tilakwadi","sp-green","Active"],
// //     ["#8b5cf6","MV","Meera Verma","2024-004","8-A","sp-purple","Route D","Campus A","sp-amber","Pending"],
// //     ["#14b8a6","RJ","Rahul Jain","2024-005","10-B","sp-blue","Route A","City Park","sp-green","Active"],
// //     ["#ec4899","SM","Sneha More","2024-006","12-A","sp-green","Route B","Rail Station","sp-gray","Inactive"],
// //   ];
// //   return (
// //     <div className="page">
// //       <div className="page-header">
// //         <div><div className="page-title">Students</div><div className="page-subtitle">1,248 students enrolled in bus service</div></div>
// //         <div className="fab-row">
// //           <div className="search-bar"><IconSearch/><input placeholder="Search students..."/></div>
// //           <select className="filter-select"><option>All Routes</option><option>Route A</option><option>Route B</option><option>Route C</option><option>Route D</option></select>
// //           <button className="fab-btn fab-primary" onClick={()=>showModal("student")}>＋ Add Student</button>
// //         </div>
// //       </div>
// //       <div className="table-card">
// //         <table className="data-table">
// //           <thead><tr><th>Name</th><th>Roll No.</th><th>Class</th><th>Route</th><th>Pickup Stop</th><th>Status</th><th></th></tr></thead>
// //           <tbody>
// //             {students.map(([bg,init,name,roll,cls,rsc,route,stop,sc,st])=>(
// //               <tr key={roll}><td><span className="ava-sm" style={{background:bg}}>{init}</span><strong>{name}</strong></td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{roll}</td><td>{cls}</td><td><span className={`status-pill ${rsc}`}>{route}</span></td><td>{stop}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn">Edit</button></td></tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // function PageAnalytics() {
// //   const weekBars = [{h:"85%",c:"var(--green)",l:"Mon"},{h:"92%",c:"var(--green)",l:"Tue"},{h:"78%",c:"var(--accent)",l:"Wed"},{h:"95%",c:"var(--green)",l:"Thu"},{h:"88%",c:"var(--green)",l:"Fri"},{h:"60%",c:"var(--muted)",l:"Sat"},{h:"94%",c:"var(--green)",l:"Sun"}];
// //   const hourBars = [{h:"30%",o:.4},{h:"95%",o:.8},{h:"100%",o:1},{h:"70%",o:.6},{h:"20%",o:.3},{h:"10%",o:.2},{h:"15%",o:.25},{h:"60%",o:.55},{h:"90%",o:.75},{h:"80%",o:.65},{h:"40%",o:.4},{h:"15%",o:.25}];
// //   const hourLabels = ["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"];
// //   return (
// //     <div className="page">
// //       <div className="page-header">
// //         <div><div className="page-title">Analytics</div><div className="page-subtitle">Performance metrics — April 2026</div></div>
// //         <div className="fab-row">
// //           <select className="filter-select"><option>This Week</option><option>This Month</option><option>Last 3 Months</option></select>
// //           <button className="fab-btn fab-secondary">↓ Export</button>
// //         </div>
// //       </div>
// //       <div className="kpi-row">
// //         <div className="kpi-card"><div className="kpi-icon" style={{background:"rgba(22,163,74,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div><div><div className="kpi-val" style={{color:"var(--green)"}}>94.2%</div><div className="kpi-lbl">On-Time Rate</div></div></div>
// //         <div className="kpi-card"><div className="kpi-icon" style={{background:"rgba(37,99,235,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue2)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div><div className="kpi-val" style={{color:"var(--blue2)"}}>6.2 min</div><div className="kpi-lbl">Avg Delay</div></div></div>
// //         <div className="kpi-card"><div className="kpi-icon" style={{background:"rgba(124,58,237,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><div><div className="kpi-val" style={{color:"var(--purple)"}}>1,248</div><div className="kpi-lbl">Students Transported</div></div></div>
// //       </div>
// //       <div className="analytics-grid">
// //         <div className="chart-card" style={{gridColumn:"span 2"}}>
// //           <div className="chart-title">Daily On-Time Performance — This Week</div>
// //           <div className="bar-chart" style={{height:120}}>
// //             {weekBars.map(b=><div key={b.l} className="bar-col"><div className="bar-fill" style={{height:b.h,background:`linear-gradient(to top,${b.c},${b.c}66)`}}/><div className="bar-label">{b.l}</div></div>)}
// //           </div>
// //         </div>
// //         <div className="chart-card">
// //           <div className="chart-title">Route Load Distribution</div>
// //           <div className="donut-wrap">
// //             <svg width="90" height="90" viewBox="0 0 36 36">
// //               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="rgba(0,0,0,.05)" strokeWidth="4"/>
// //               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--blue2)" strokeWidth="4" strokeDasharray="37 63" strokeDashoffset="25"/>
// //               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--green)" strokeWidth="4" strokeDasharray="28 72" strokeDashoffset="-12"/>
// //               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--accent)" strokeWidth="4" strokeDasharray="22 78" strokeDashoffset="-40"/>
// //               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--purple)" strokeWidth="4" strokeDasharray="13 87" strokeDashoffset="-62"/>
// //             </svg>
// //             <div className="donut-legend">
// //               {[["var(--blue2)","Route A (37%)"],["var(--green)","Route B (28%)"],["var(--accent)","Route C (22%)"],["var(--purple)","Route D (13%)"]].map(([c,l])=>(
// //                 <div className="donut-leg-item" key={l}><div className="donut-leg-dot" style={{background:c}}/>{l}</div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //         <div className="chart-card" style={{gridColumn:"span 3"}}>
// //           <div className="chart-title">Hourly Dispatch Volume — Today</div>
// //           <div className="bar-chart" style={{height:80,gap:5}}>
// //             {hourBars.map((b,i)=><div key={i} className="bar-col"><div className="bar-fill" style={{height:b.h,background:`rgba(59,139,212,${b.o})`}}/><div className="bar-label">{hourLabels[i]}</div></div>)}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function PageHistory() {
// //   return (
// //     <div className="page">
// //       <div className="page-header">
// //         <div><div className="page-title">Bus History</div><div className="page-subtitle">Trip logs and journey history</div></div>
// //         <div className="fab-row">
// //           <div className="search-bar"><IconSearch/><input placeholder="Search by bus or route..."/></div>
// //           <input type="date" className="filter-select" defaultValue="2026-04-19"/>
// //           <select className="filter-select"><option>All Buses</option><option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option></select>
// //           <button className="fab-btn fab-secondary">↓ Export CSV</button>
// //         </div>
// //       </div>
// //       <div className="history-full">
// //         <table className="data-table">
// //           <thead><tr><th>Bus</th><th>Route</th><th>Driver</th><th>Trip Start</th><th>Trip End</th><th>Stops Completed</th><th>Delay</th><th>Status</th></tr></thead>
// //           <tbody>
// //             {[["KA-01-B","Route A","R. Kumar","07:00 AM","07:34 AM","12 / 12","0 min","var(--green)","sp-green","Completed"],
// //               ["KA-01-B","Route A","R. Kumar","08:00 AM","08:38 AM","12 / 12","+4 min","var(--accent)","sp-amber","Minor Delay"],
// //               ["KA-02-B","Route B","P. Sharma","07:00 AM","07:28 AM","8 / 8","0 min","var(--green)","sp-green","Completed"],
// //               ["KA-02-B","Route B","P. Sharma","08:00 AM","In Progress","4 / 8","+12 min","var(--red)","sp-red","Delayed"],
// //               ["KA-03-C","Route C","M. Rao","07:00 AM","07:42 AM","10 / 10","0 min","var(--green)","sp-green","Completed"],
// //               ["KA-04-D","Route D","S. Joshi","07:00 AM","07:22 AM","6 / 6","0 min","var(--green)","sp-green","Completed"],
// //               ["KA-05-E","Route A","A. Baig","07:30 AM","Stopped","3 / 12","Engine warning","var(--red)","sp-red","⚠ Incident"],
// //               ["KA-06-F","Route B","V. Patil","08:00 AM","08:26 AM","8 / 8","0 min","var(--green)","sp-green","Completed"],
// //             ].map(([bus,route,drv,start,end,stops,delay,dc,sc,st],i)=>(
// //               <tr key={i}><td><strong>{bus}</strong></td><td>{route}</td><td>{drv}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{start}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{end}</td><td>{stops}</td><td style={{color:dc}}>{delay}</td><td><span className={`status-pill ${sc}`}>{st}</span></td></tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // function PageRoles({ showModal }) {
// //   const perms = [["View live map",[1,1,1,1,1]],["Manage buses",[1,1,0,0,0]],["Edit routes",[1,1,1,0,0]],["Analytics",[1,1,0,0,1]],["Manage students",[1,1,1,0,0]],["System admin",[1,0,0,0,0]]];
// //   return (
// //     <div className="page">
// //       <div className="page-header">
// //         <div><div className="page-title">Role Management</div><div className="page-subtitle">Manage user access and permissions</div></div>
// //         <button className="fab-btn fab-primary" onClick={()=>showModal("role")}>＋ Add User</button>
// //       </div>
// //       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
// //         <div className="role-table-wrap">
// //           <div className="card-header"><span className="card-title">Users & Roles</span><div className="ch-right"><span className="card-sub">5 users</span></div></div>
// //           <table className="data-table">
// //             <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
// //             <tbody>
// //               {[["#f5a623","AD","Admin","admin@school.edu","sp-amber","Super Admin","sp-green","Active"],
// //                 ["#3b8bd4","JP","J. Patil","j.patil@school.edu","sp-blue","Admin","sp-green","Active"],
// //                 ["#3dc87a","RD","R. Desai","r.desai@school.edu","sp-green","Dispatcher","sp-green","Active"],
// //                 ["#8b5cf6","NK","N. Kulkarni","n.kulkarni@school.edu","sp-purple","Viewer","sp-gray","Inactive"],
// //               ].map(([bg,init,name,email,rsc,role,sc,st])=>(
// //                 <tr key={email}><td><span className="ava-sm" style={{background:bg}}>{init}</span><strong>{name}</strong></td><td style={{fontSize:11.5,color:"var(--muted)"}}>{email}</td><td><span className={`status-pill ${rsc}`}>{role}</span></td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn" onClick={()=>showModal("role")}>Edit</button></td></tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //         <div className="role-table-wrap">
// //           <div className="card-header"><span className="card-title">Permission Matrix</span></div>
// //           <div className="permission-matrix">
// //             {["Permission","Super Admin","Admin","Dispatcher","Driver","Viewer"].map(h=><div key={h} className="pm-header">{h}</div>)}
// //             {perms.map(([perm,vals])=>(
// //               <div key={perm} style={{display:"contents"}}>
// //                 <div className="pm-cell" style={{justifyContent:"flex-start"}}>{perm}</div>
// //                 {vals.map((v,i)=><div key={i} className="pm-cell"><PermCheck defaultOn={!!v}/></div>)}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─── MAIN APP ────────────────────────────────────────────────────────── */
// // export default function BusNavDashboard() {
// //   const [activePage, setActivePage] = useState("dashboard");
// //   const [modal, setModal] = useState(null);
// //   const [toast, setToast] = useState(null);
// //   const [clock, setClock] = useState("");
// //   const toastTimer = useRef(null);

// //   // Clock
// //   useEffect(() => {
// //     const tick = () => setClock(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
// //     tick();
// //     const t = setInterval(tick, 1000);
// //     return () => clearInterval(t);
// //   }, []);

// //   // Toast
// //   const showToast = (msg) => {
// //     setToast(msg);
// //     clearTimeout(toastTimer.current);
// //     toastTimer.current = setTimeout(() => setToast(null), 2800);
// //   };

// //   const showModal = (type) => setModal(type);
// //   const hideModal = () => setModal(null);
// //   const saveAndClose = (msg) => { hideModal(); showToast(msg); };

// //   const navSections = [
// //     { label: "Overview", items: [
// //       { id: "dashboard", icon: <IconDash/>, label: "Dashboard" },
// //       { id: "tracking",  icon: <IconClock/>, label: "Live Tracking", badge: "3", warn: true },
// //     ]},
// //     { label: "Management", items: [
// //       { id: "buses",   icon: <IconBus/>,    label: "Buses" },
// //       { id: "drivers", icon: <IconUser/>,   label: "Drivers" },
// //       { id: "routes",  icon: <IconRoute/>,  label: "Routes" },
// //       { id: "students",icon: <IconPeople/>, label: "Students", badge: "12", warn: true },
// //     ]},
// //     { label: "Analytics", items: [
// //       { id: "analytics", icon: <IconBar/>,  label: "Analytics" },
// //       { id: "history",   icon: <IconFile/>, label: "Bus History" },
// //     ]},
// //     { label: "System", items: [
// //       { id: "roles", icon: <IconLock/>, label: "Role Mgmt" },
// //     ]},
// //   ];

// //   const pageLabels = { dashboard:"Dashboard", tracking:"Live Tracking", buses:"Buses", drivers:"Drivers", routes:"Routes", students:"Students", analytics:"Analytics", history:"Bus History", roles:"Role Management" };

// //   const renderPage = () => {
// //     switch(activePage) {
// //       case "dashboard": return <PageDashboard showModal={showModal}/>;
// //       case "tracking":  return <PageTracking showToast={showToast}/>;
// //       case "buses":     return <PageBuses showModal={showModal}/>;
// //       case "drivers":   return <PageDrivers showModal={showModal}/>;
// //       case "routes":    return <PageRoutes showModal={showModal}/>;
// //       case "students":  return <PageStudents showModal={showModal}/>;
// //       case "analytics": return <PageAnalytics/>;
// //       case "history":   return <PageHistory/>;
// //       case "roles":     return <PageRoles showModal={showModal}/>;
// //       default:          return <PageDashboard showModal={showModal}/>;
// //     }
// //   };

// //   const renderModal = () => {
// //     if (!modal) return null;
// //     const props = { onClose: hideModal, onSave: saveAndClose };
// //     const map = { bus: <ModalBus {...props}/>, driver: <ModalDriver {...props}/>, route: <ModalRoute {...props}/>, student: <ModalStudent {...props}/>, role: <ModalRole {...props}/> };
// //     return (
// //       <div className="modal-overlay" onClick={e => e.target === e.currentTarget && hideModal()}>
// //         {map[modal]}
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <style>{css}</style>
// //       <div className="layout">
// //         {/* TOPBAR */}
// //         <div className="topbar">
// //           <div className="logo">
// //             <div className="logo-icon"><BusLogo/></div>
// //             BusNav Admin
// //           </div>
// //           <div className="spacer"/>
// //           <div className="breadcrumb">
// //             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
// //             <span>{pageLabels[activePage]}</span>
// //           </div>
// //           <div className="spacer"/>
// //           <div className="topbar-right">
// //             <div className="topbar-time">{clock}</div>
// //             <div className="badge-notif" title="3 alerts"><IconBell/><span className="dot"/></div>
// //             <div className="avatar" title="Admin">AD</div>
// //           </div>
// //         </div>

// //         <div className="body-wrap">
// //           {/* SIDEBAR */}
// //           <div className="sidebar">
// //             {navSections.map(s => (
// //               <div className="nav-section" key={s.label}>
// //                 <div className="nav-label">{s.label}</div>
// //                 {s.items.map(it => (
// //                   <button key={it.id} className={`nav-item${activePage===it.id?" active":""}`} onClick={()=>setActivePage(it.id)}>
// //                     {it.icon} {it.label}
// //                     {it.badge && <span className={`nav-badge${it.warn?" warn":""}`}>{it.badge}</span>}
// //                   </button>
// //                 ))}
// //               </div>
// //             ))}
// //             <div className="sidebar-bottom">
// //               <button className="nav-item" style={{color:"#64748b"}}><IconLogout/> Logout</button>
// //             </div>
// //           </div>

// //           {/* MAIN */}
// //           <div className="main">
// //             {renderPage()}
// //           </div>
// //         </div>
// //       </div>

// //       {/* MODAL */}
// //       {renderModal()}

// //       {/* TOAST */}
// //       {toast && <div className="toast">{toast}</div>}
// //     </>
// //   );
// // }

// import { useState, useEffect, useRef, useCallback } from "react";

// /* ─── CSS ─────────────────────────────────────────────────────────────── */
// const css = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Mono:wght@400;500&display=swap');
// *{box-sizing:border-box;margin:0;padding:0}
// :root{
//   --accent:#f5a623;--accent2:#e8951f;--blue:#3b8bd4;--blue2:#2563eb;
//   --green:#16a34a;--red:#dc2626;--purple:#7c3aed;
//   --text:#1e293b;--muted:#64748b;--border:#e2e8f0;
// }
// body{font-family:'DM Sans',sans-serif;background:#f1f5f9;color:var(--text)}
// .layout{display:flex;min-height:100vh;flex-direction:column}
// .topbar{height:58px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:12px;position:sticky;top:0;z-index:100;box-shadow:0 1px 3px rgba(0,0,0,.06)}
// .logo{display:flex;align-items:center;gap:9px;font-weight:700;font-size:15px;letter-spacing:-.2px;color:var(--text)}
// .logo-icon{width:34px;height:34px;background:var(--accent);border-radius:9px;display:flex;align-items:center;justify-content:center}
// .logo-icon svg{width:18px;height:18px;fill:#1a1a1a}
// .topbar .spacer{flex:1}
// .topbar-right{display:flex;align-items:center;gap:14px}
// .badge-notif{position:relative;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#f8fafc;border:1px solid var(--border);transition:background .15s}
// .badge-notif:hover{background:#f1f5f9}
// .badge-notif .dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--red);border-radius:50%;border:2px solid #fff}
// .avatar{width:32px;height:32px;background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#1a1a1a;cursor:pointer}
// .topbar-time{font-size:12.5px;color:var(--muted);font-family:'DM Mono',monospace;background:#f8fafc;padding:4px 10px;border-radius:6px;border:1px solid var(--border)}
// .breadcrumb{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px}
// .breadcrumb span{color:var(--text);font-weight:500}
// .body-wrap{display:flex;flex:1}
// .sidebar{width:230px;background:#1e293b;border-right:1px solid #334155;display:flex;flex-direction:column;padding:14px 0;flex-shrink:0;position:sticky;top:58px;height:calc(100vh - 58px);overflow-y:auto}
// .nav-section{padding:0 10px;margin-bottom:6px}
// .nav-label{font-size:10px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1.2px;padding:8px 10px 5px}
// .nav-item{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;cursor:pointer;font-size:13px;color:#94a3b8;transition:all .15s;margin-bottom:1px;user-select:none;position:relative;background:none;border:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif}
// .nav-item:hover{background:rgba(255,255,255,.07);color:#e2e8f0}
// .nav-item.active{background:rgba(245,166,35,.15);color:var(--accent);font-weight:600}
// .nav-item.active::before{content:'';position:absolute;left:-10px;top:50%;transform:translateY(-50%);width:3px;height:20px;background:var(--accent);border-radius:0 3px 3px 0}
// .nav-item .ni{width:15px;height:15px;opacity:.7;flex-shrink:0}
// .nav-item.active .ni{opacity:1}
// .nav-badge{margin-left:auto;background:var(--red);color:#fff;font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:10px;line-height:1.4}
// .nav-badge.warn{background:rgba(245,166,35,.2);color:var(--accent);border:1px solid rgba(245,166,35,.3)}
// .sidebar-bottom{margin-top:auto;padding:10px;border-top:1px solid #334155}
// .main{flex:1;overflow-y:auto;background:#f1f5f9}
// .page{padding:22px 26px;display:flex;flex-direction:column;gap:18px;animation:fadeIn .2s ease}
// @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
// .page-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
// .page-title{font-size:20px;font-weight:700;letter-spacing:-.3px}
// .page-subtitle{font-size:12.5px;color:var(--muted);margin-top:2px}
// .fab-row{display:flex;gap:8px;flex-wrap:wrap}
// .fab-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;font-family:'DM Sans',sans-serif}
// .fab-primary{background:var(--accent);color:#1a1a1a}
// .fab-primary:hover{background:var(--accent2);transform:translateY(-1px);box-shadow:0 4px 12px rgba(245,166,35,.35)}
// .fab-secondary{background:#fff;color:var(--text);border:1px solid var(--border)}
// .fab-secondary:hover{background:#f1f5f9}
// .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
// .stat-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;position:relative;overflow:hidden;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .stat-card:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
// .stat-card::after{content:'';position:absolute;top:-10px;right:-10px;width:70px;height:70px;border-radius:50%;opacity:.08}
// .stat-card.s-green::after{background:var(--green)} .stat-card.s-amber::after{background:var(--accent)} .stat-card.s-blue::after{background:var(--blue)} .stat-card.s-purple::after{background:var(--purple)}
// .stat-label{font-size:10.5px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
// .stat-val{font-size:30px;font-weight:700;line-height:1;letter-spacing:-1px}
// .stat-val.green{color:var(--green)} .stat-val.amber{color:var(--accent)} .stat-val.blue{color:var(--blue2)} .stat-val.purple{color:var(--purple)}
// .stat-sub{font-size:11.5px;color:var(--muted);margin-top:8px;display:flex;align-items:center;gap:5px}
// .stat-trend{font-size:10.5px;padding:2px 7px;border-radius:6px;font-weight:700}
// .stat-trend.up{background:rgba(22,163,74,.1);color:var(--green)} .stat-trend.down{background:rgba(220,38,38,.1);color:var(--red)}
// .mid-row{display:grid;grid-template-columns:1fr 320px;gap:14px}
// .map-card,.alerts-card,.table-card,.route-card{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .card-header{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid var(--border);background:#f8fafc}
// .card-title{font-size:13.5px;font-weight:600;color:var(--text)}
// .card-sub{font-size:11.5px;color:var(--muted)}
// .ch-right{margin-left:auto;display:flex;align-items:center;gap:8px}
// .pill{font-size:11px;padding:3px 10px;border-radius:20px;font-weight:600;cursor:pointer;transition:all .15s;border:1px solid transparent;background:none;font-family:'DM Sans',sans-serif}
// .pill.active{background:var(--accent);color:#1a1a1a;border-color:var(--accent)}
// .pill.passive{background:#f1f5f9;color:var(--muted);border-color:var(--border)}
// .pill.passive:hover{background:#e2e8f0;color:var(--text)}
// .map-body{height:250px;background:#eef4fb;position:relative;overflow:hidden}
// .map-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,139,212,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,139,212,.1) 1px,transparent 1px);background-size:36px 36px}
// .map-road{position:absolute;background:rgba(148,163,184,.3);border-radius:2px}
// .bus-dot{position:absolute;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:800;cursor:pointer;transition:transform .2s;z-index:2}
// .bus-dot:hover{transform:scale(1.35)!important}
// .bus-dot.on-time{background:var(--green);color:#fff;animation:pulseGreen 2s infinite}
// .bus-dot.delayed{background:var(--accent);color:#1a1a1a;animation:pulseAmber 2s infinite}
// .bus-dot.idle{background:#3a4a60;color:#94a3b8}
// @keyframes pulseGreen{0%,100%{box-shadow:0 0 0 3px rgba(61,200,122,.25)}50%{box-shadow:0 0 0 8px rgba(61,200,122,.06)}}
// @keyframes pulseAmber{0%,100%{box-shadow:0 0 0 3px rgba(245,166,35,.25)}50%{box-shadow:0 0 0 8px rgba(245,166,35,.06)}}
// .stop-dot{position:absolute;width:7px;height:7px;background:#cbd5e1;border:2px solid #94a3b8;border-radius:50%;z-index:1}
// .route-line-h{position:absolute;height:3px;border-radius:2px;z-index:0}
// .map-legend{display:flex;align-items:center;gap:16px;padding:10px 18px;border-top:1px solid var(--border);background:#f8fafc}
// .legend-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
// .legend-dot{width:8px;height:8px;border-radius:50%}
// .alerts-card{display:flex;flex-direction:column}
// .alert-item{display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s}
// .alert-item:last-child{border-bottom:none}
// .alert-item:hover{background:#f8fafc}
// .alert-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;margin-top:1px}
// .alert-icon.warn{background:rgba(245,166,35,.12);color:var(--accent2)}
// .alert-icon.err{background:rgba(220,38,38,.1);color:var(--red)}
// .alert-icon.ok{background:rgba(22,163,74,.1);color:var(--green)}
// .alert-text{font-size:12px;line-height:1.5;flex:1;color:var(--text)}
// .alert-text strong{font-weight:600}
// .alert-text span{color:var(--muted)}
// .alert-time{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:2px}
// .bot-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
// .data-table{width:100%;border-collapse:collapse}
// .data-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;padding:10px 16px;text-align:left;border-bottom:1px solid var(--border);background:#f8fafc}
// .data-table td{padding:10px 16px;font-size:12.5px;border-bottom:1px solid var(--border);vertical-align:middle;color:var(--text)}
// .data-table tr:last-child td{border-bottom:none}
// .data-table tr:hover td{background:#f8fafc}
// .status-pill{font-size:10px;padding:3px 9px;border-radius:8px;font-weight:700;display:inline-block}
// .sp-green{background:rgba(61,200,122,.12);color:var(--green)} .sp-amber{background:rgba(245,166,35,.12);color:var(--accent)} .sp-gray{background:rgba(122,143,170,.1);color:var(--muted)} .sp-red{background:rgba(224,82,82,.12);color:var(--red)} .sp-blue{background:rgba(59,139,212,.12);color:var(--blue2)} .sp-purple{background:rgba(165,110,245,.12);color:var(--purple)}
// .ava-sm{width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#fff;margin-right:6px;vertical-align:middle;flex-shrink:0}
// .act-btn{background:#f8fafc;border:1px solid var(--border);color:var(--muted);border-radius:7px;padding:4px 10px;font-size:11px;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif}
// .act-btn:hover{border-color:var(--accent);color:var(--accent2)}
// .route-list{padding:6px 0}
// .route-item{display:flex;align-items:center;gap:12px;padding:10px 18px;cursor:pointer;transition:background .15s;border-left:2px solid transparent}
// .route-item:hover{background:#f8fafc}
// .route-item.active-route{background:rgba(245,166,35,.06);border-left-color:var(--accent)}
// .route-circle{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0}
// .rc-a{background:rgba(37,99,235,.12);color:var(--blue2)} .rc-b{background:rgba(22,163,74,.12);color:var(--green)} .rc-c{background:rgba(245,166,35,.15);color:var(--accent2)} .rc-d{background:rgba(124,58,237,.12);color:var(--purple)}
// .route-info{flex:1}
// .route-name{font-size:13px;font-weight:600;color:var(--text)}
// .route-meta{font-size:11px;color:var(--muted);margin-top:1px}
// .route-bar-wrap{width:80px}
// .route-bar-bg{height:4px;background:#e2e8f0;border-radius:4px;overflow:hidden}
// .route-bar-fill{height:100%;border-radius:4px;transition:width .4s ease}
// .history-strip{border-top:1px solid var(--border);padding:14px 18px;background:#f8fafc}
// .history-label{font-size:10.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:9px}
// .history-bars{display:flex;gap:4px;align-items:flex-end;height:32px}
// .history-bar{flex:1;border-radius:3px 3px 0 0}
// .history-times{display:flex;justify-content:space-between;margin-top:5px;font-size:10px;color:var(--muted);font-family:'DM Mono',monospace}
// .analytics-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
// .chart-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .chart-title{font-size:13px;font-weight:600;margin-bottom:14px;color:var(--text)}
// .bar-chart{display:flex;align-items:flex-end;gap:8px;height:100px}
// .bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px}
// .bar-fill{width:100%;border-radius:4px 4px 0 0;transition:height .6s ease;min-height:3px}
// .bar-label{font-size:9px;color:var(--muted);font-family:'DM Mono',monospace}
// .donut-wrap{display:flex;align-items:center;justify-content:center;gap:18px}
// .donut-legend{display:flex;flex-direction:column;gap:7px}
// .donut-leg-item{display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--muted)}
// .donut-leg-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
// .kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
// .kpi-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:16px;display:flex;align-items:center;gap:14px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .kpi-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
// .kpi-val{font-size:22px;font-weight:700}
// .kpi-lbl{font-size:11px;color:var(--muted);margin-top:2px}
// .history-full{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .driver-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
// .driver-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:18px;cursor:pointer;transition:border-color .2s,transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .driver-card:hover{border-color:rgba(37,99,235,.3);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
// .dc-header{display:flex;align-items:center;gap:12px;margin-bottom:12px}
// .dc-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff;flex-shrink:0}
// .dc-name{font-size:14px;font-weight:600}
// .dc-id{font-size:11px;color:var(--muted);margin-top:1px}
// .dc-row{display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid var(--border)}
// .dc-key{color:var(--muted)} .dc-val{font-weight:500;text-align:right}
// .role-table-wrap{background:#fff;border:1px solid var(--border);border-radius:13px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04)}
// .permission-matrix{display:grid;grid-template-columns:180px repeat(5,1fr);gap:0;font-size:12px}
// .pm-header{padding:10px 14px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;background:#f8fafc;border-bottom:1px solid var(--border);text-align:center}
// .pm-header:first-child{text-align:left}
// .pm-cell{padding:11px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:center}
// .pm-cell:first-child{justify-content:flex-start;font-weight:500;color:var(--text)}
// .pm-check{width:18px;height:18px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;transition:all .15s;border:none;font-family:'DM Sans',sans-serif}
// .pm-check.on{background:rgba(22,163,74,.12);color:var(--green)} .pm-check.off{background:#f1f5f9;color:#cbd5e1;border:1px solid var(--border)}
// .pm-check.on:hover{background:rgba(22,163,74,.2)} .pm-check.off:hover{background:#e2e8f0;color:var(--muted)}
// .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:500;backdrop-filter:blur(3px);animation:fadeIn .2s ease}
// .modal{background:#fff;border:1px solid var(--border);border-radius:16px;width:460px;max-width:95vw;max-height:90vh;overflow-y:auto;padding:26px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.15);animation:slideUp .2s ease}
// @keyframes slideUp{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
// .modal h3{font-size:16px;font-weight:700;margin-bottom:20px;letter-spacing:-.2px;color:var(--text)}
// .form-row{margin-bottom:14px}
// .form-label{font-size:10.5px;color:var(--muted);margin-bottom:6px;display:block;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
// .form-input{width:100%;background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:10px 13px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .15s,background .15s}
// .form-input:focus{border-color:var(--accent);background:#fffbf5}
// .form-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
// .modal-actions{display:flex;gap:10px;margin-top:22px}
// .btn-cancel{flex:1;padding:11px;border-radius:9px;border:1px solid var(--border);background:#f8fafc;color:var(--muted);font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
// .btn-cancel:hover{border-color:var(--muted);color:var(--text)}
// .btn-save{flex:2;padding:11px;border-radius:9px;border:none;background:var(--accent);color:#1a1a1a;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
// .btn-save:hover{background:var(--accent2);transform:translateY(-1px)}
// .close-btn{position:absolute;top:18px;right:18px;background:#f1f5f9;border:none;color:var(--muted);width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;transition:all .15s;flex-shrink:0}
// .close-btn:hover{background:#e2e8f0;color:var(--text)}
// .role-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}
// .role-chip{padding:5px 14px;border-radius:20px;font-size:11.5px;cursor:pointer;border:1px solid var(--border);color:var(--muted);transition:all .15s;user-select:none;background:none;font-family:'DM Sans',sans-serif}
// .role-chip:hover{border-color:var(--muted);color:var(--text)}
// .role-chip.sel{background:rgba(245,166,35,.1);border-color:var(--accent);color:var(--accent2)}
// .perm-row{display:grid;gap:9px;margin-top:6px}
// .perm-label{display:flex;align-items:center;gap:9px;font-size:12.5px;cursor:pointer;color:var(--text)}
// .perm-label input[type=checkbox]{accent-color:var(--accent);width:14px;height:14px}
// .form-section-title{font-size:11px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.6px;padding:10px 0 4px;border-top:1px solid var(--border);margin-top:4px}
// .route-stop-list{margin-top:8px;display:flex;flex-direction:column;gap:6px}
// .stop-item{display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f8fafc;border-radius:7px;border:1px solid var(--border);font-size:12.5px;color:var(--text)}
// .stop-num{width:20px;height:20px;border-radius:50%;background:rgba(245,166,35,.12);color:var(--accent2);font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
// .stop-name-txt{flex:1}
// .remove-stop{background:transparent;border:none;color:var(--muted);cursor:pointer;font-size:16px;line-height:1;padding:0 2px;transition:color .15s}
// .remove-stop:hover{color:var(--red)}
// .add-stop-row{display:flex;gap:8px;margin-top:8px}
// .add-stop-input{flex:1;background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text);font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .15s}
// .add-stop-input:focus{border-color:var(--accent)}
// .add-stop-btn{padding:8px 14px;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.25);border-radius:8px;color:var(--accent2);font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap;font-family:'DM Sans',sans-serif}
// .add-stop-btn:hover{background:rgba(245,166,35,.2)}
// .toast{position:fixed;bottom:28px;right:28px;background:var(--green);color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:slideUp .3s ease}
// .search-bar{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;transition:border-color .15s}
// .search-bar:focus-within{border-color:var(--accent)}
// .search-bar input{background:transparent;border:none;outline:none;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;width:200px}
// .search-bar input::placeholder{color:var(--muted)}
// .filter-select{background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;color:var(--text);font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer}

// /* ── LIVE TRACKING PAGE ── */
// .tracking-page{display:flex;flex-direction:column;height:calc(100vh - 58px);overflow:hidden;background:#e8f0e8;position:relative}
// .tracking-topbar{position:absolute;top:12px;left:12px;right:12px;z-index:20;display:flex;gap:8px;align-items:center;pointer-events:none}
// .tracking-topbar>*{pointer-events:all}
// .gm-searchbox{height:40px;background:#fff;border-radius:24px;box-shadow:0 2px 8px rgba(0,0,0,.22);display:flex;align-items:center;padding:0 16px;gap:10px;min-width:220px;max-width:300px}
// .gm-searchbox input{border:none;outline:none;font-size:13px;color:#202124;width:100%;background:transparent;font-family:'DM Sans',sans-serif}
// .gm-searchbox input::placeholder{color:#80868b}
// .route-chips{display:flex;gap:6px;flex-wrap:wrap}
// .rchip{height:34px;padding:0 14px;border-radius:17px;background:#fff;box-shadow:0 1px 5px rgba(0,0,0,.2);font-size:12px;font-weight:600;cursor:pointer;border:none;display:flex;align-items:center;gap:6px;transition:all .15s;font-family:'DM Sans',sans-serif;color:#444}
// .rchip.active{box-shadow:0 2px 8px rgba(0,0,0,.25)}
// .rchip .rdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
// .live-badge-float{position:absolute;top:64px;right:12px;z-index:20;background:#fff;border-radius:20px;box-shadow:0 2px 8px rgba(0,0,0,.2);padding:6px 12px;display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:#202124}
// .live-anim-dot{width:7px;height:7px;border-radius:50%;background:#0f9d58;animation:livePulse 1.8s infinite}
// @keyframes livePulse{0%,100%{opacity:1}50%{opacity:.2}}
// .gm-canvas-wrap{position:absolute;inset:0;cursor:grab}
// .gm-canvas-wrap:active{cursor:grabbing}
// .gm-canvas{display:block;width:100%;height:100%}
// .gm-zoom-ctrl{position:absolute;right:12px;bottom:110px;z-index:20;display:flex;flex-direction:column;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.25)}
// .gm-zoom-btn{width:36px;height:36px;background:#fff;border:none;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#444;border-bottom:0.5px solid #e0e0e0;transition:background .1s;line-height:1}
// .gm-zoom-btn:last-child{border-bottom:none}
// .gm-zoom-btn:hover{background:#f1f3f4}
// .gm-compass{position:absolute;right:12px;bottom:170px;z-index:20;width:36px;height:36px;background:#fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#e8453c}
// .bus-info-panel{position:absolute;left:12px;top:64px;z-index:30;background:#fff;border-radius:14px;box-shadow:0 4px 24px rgba(0,0,0,.2);width:270px;overflow:hidden;transition:opacity .2s,transform .2s}
// .bus-info-panel.hidden{opacity:0;pointer-events:none;transform:translateY(-8px)}
// .bip-header{padding:13px 14px 10px;border-bottom:1px solid #f1f3f4;display:flex;align-items:flex-start;gap:10px}
// .bip-avatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
// .bip-busid{font-size:15px;font-weight:700;color:#202124}
// .bip-routename{font-size:11px;color:#5f6368;margin-top:1px}
// .bip-close{margin-left:auto;background:none;border:none;cursor:pointer;color:#5f6368;font-size:20px;line-height:1;padding:0;flex-shrink:0}
// .bip-body{padding:10px 14px}
// .bip-row{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:0.5px solid #f1f3f4;font-size:12px}
// .bip-row:last-child{border-bottom:none}
// .bip-icon{width:15px;height:15px;flex-shrink:0;opacity:.6}
// .bip-key{color:#5f6368;min-width:78px;font-size:11.5px}
// .bip-val{color:#202124;font-weight:600;flex:1;text-align:right;font-size:12px}
// .bip-progress{padding:8px 14px 14px;border-top:1px solid #f1f3f4}
// .bip-prog-lbl{font-size:10.5px;color:#5f6368;margin-bottom:7px;font-weight:600;text-transform:uppercase;letter-spacing:.4px}
// .bip-prog-track{height:4px;background:#e8eaed;border-radius:2px;margin-bottom:10px;position:relative}
// .bip-prog-fill{height:100%;border-radius:2px;transition:width .6s ease}
// .bip-stops-row{display:flex;justify-content:space-between;align-items:flex-start}
// .bip-stop-node{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:52px}
// .bip-stop-dot{width:9px;height:9px;border-radius:50%;border:2px solid #dadce0;background:#fff;flex-shrink:0}
// .bip-stop-dot.done{background:#1a73e8;border-color:#1a73e8}
// .bip-stop-dot.current{background:#fff;border-color:#1a73e8;box-shadow:0 0 0 3px rgba(26,115,232,.22)}
// .bip-stop-label{font-size:9.5px;color:#5f6368;text-align:center;line-height:1.3;word-break:break-word}
// .bip-stop-label.done-lbl{color:#1a73e8;font-weight:600}
// .gm-attribution{position:absolute;bottom:56px;right:6px;font-size:10px;color:#666;background:rgba(255,255,255,.85);padding:2px 6px;border-radius:2px;z-index:10}
// .bus-cards-bar{position:absolute;bottom:0;left:0;right:0;z-index:20}
// .bcs-scroll{display:flex;gap:10px;padding:10px 12px 14px;overflow-x:auto;scrollbar-width:none}
// .bcs-scroll::-webkit-scrollbar{display:none}
// .bcard{min-width:188px;background:#fff;border-radius:13px;box-shadow:0 2px 10px rgba(0,0,0,.16);padding:10px 12px;cursor:pointer;border:2px solid transparent;transition:all .15s;flex-shrink:0}
// .bcard:hover{box-shadow:0 4px 16px rgba(0,0,0,.2)}
// .bcard.sel{border-color:#1a73e8;box-shadow:0 2px 16px rgba(26,115,232,.28)}
// .bcard-top{display:flex;align-items:center;gap:8px;margin-bottom:6px}
// .bcard-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;flex-shrink:0}
// .bcard-num{font-size:12.5px;font-weight:700;color:#202124}
// .bcard-route{font-size:10px;color:#5f6368;margin-top:1px}
// .bcard-spill{font-size:10px;font-weight:700;padding:2px 7px;border-radius:9px}
// .bcs-green{background:#e6f4ea;color:#1e7e34}
// .bcs-amber{background:#fef7e0;color:#9a6700}
// .bcs-gray{background:#f1f3f4;color:#5f6368}
// .bcs-red{background:#fce8e6;color:#c5221f}
// .bcard-info{font-size:10.5px;color:#5f6368;line-height:1.6}
// .bcard-info b{color:#202124;font-weight:600}
// .bcard-info .hl{font-weight:600}

// ::-webkit-scrollbar{width:5px;height:5px}
// ::-webkit-scrollbar-track{background:transparent}
// ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
// ::-webkit-scrollbar-thumb:hover{background:#94a3b8}
// `;

// /* ─── SVG ICONS ───────────────────────────────────────────────────────── */
// const IconDash   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>;
// const IconClock  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
// const IconBus    = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
// const IconUser   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
// const IconRoute  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
// const IconPeople = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
// const IconBar    = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
// const IconFile   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
// const IconLock   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
// const IconLogout = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
// const IconSearch = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
// const IconBell   = () => <svg width="15" height="15" fill="none" stroke="var(--muted)" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
// const BusLogo    = () => <svg viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 9h16v4H4V9z"/></svg>;

// /* ─── TRACKING DATA ───────────────────────────────────────────────────── */
// const ROUTE_CFG = {
//   A: { color: '#1a73e8', label: 'Route A — North Loop',  short: 'North Loop'    },
//   B: { color: '#0f9d58', label: 'Route B — East Connect', short: 'East Connect'  },
//   C: { color: '#f9ab00', label: 'Route C — South Express',short: 'South Express' },
//   D: { color: '#9334e6', label: 'Route D — West Campus',  short: 'West Campus'   },
// };

// const MAP_STOPS = {
//   A: [
//     {x:62, y:300, name:'Main Gate'},      {x:116,y:264, name:'KHB Colony'},
//     {x:172,y:228, name:'Market Circle'},  {x:232,y:198, name:'City Park'},
//     {x:292,y:183, name:'North Bridge'},   {x:347,y:193, name:'Bus Stand'},
//     {x:397,y:218, name:'Old Town'},       {x:432,y:254, name:'Shahapur'},
//     {x:452,y:294, name:'Civil Lines'},    {x:436,y:334, name:'Station Rd'},
//     {x:401,y:364, name:'Railway Stn'},    {x:351,y:379, name:'Depot North'},
//   ],
//   B: [
//     {x:356,y:384, name:'Depot'},          {x:421,y:414, name:'East Market'},
//     {x:476,y:439, name:'Gandhi Ngr'},     {x:521,y:419, name:'New Colony'},
//     {x:556,y:389, name:'College Rd'},     {x:571,y:354, name:'Hospital'},
//     {x:556,y:314, name:'Rail Station'},   {x:511,y:289, name:'Main Stop'},
//   ],
//   C: [
//     {x:71, y:430, name:'School Gate'},    {x:131,y:459, name:'Tilakwadi'},
//     {x:196,y:474, name:'Sadashiv Ngr'},   {x:261,y:459, name:'Vidyanagar'},
//     {x:321,y:444, name:'Camp'},           {x:376,y:449, name:'Belgaum Fort'},
//     {x:431,y:464, name:'Nehru Ngr'},      {x:481,y:477, name:'Shivaji Ngr'},
//     {x:531,y:467, name:'Angol'},          {x:591,y:454, name:'Central Mkt'},
//   ],
//   D: [
//     {x:81, y:164, name:'Campus A'},       {x:146,y:139, name:'Science Block'},
//     {x:211,y:129, name:'Hostel'},         {x:276,y:137, name:'Library'},
//     {x:336,y:154, name:'Admin Block'},    {x:386,y:169, name:'West Gate'},
//   ],
// };

// const INITIAL_BUSES = [
//   {id:'KA-01-B',route:'A',label:'A1',t:0.08, speed:0.00055,status:'on-time', delay:0,  driver:'R. Kumar',  passengers:38,capacity:50},
//   {id:'KA-02-B',route:'A',label:'A2',t:0.43, speed:0.00048,status:'on-time', delay:0,  driver:'V. Patil',  passengers:45,capacity:50},
//   {id:'KA-03-C',route:'A',label:'A3',t:0.71, speed:0.00025,status:'delayed', delay:12, driver:'A. Baig',   passengers:22,capacity:50},
//   {id:'KA-04-D',route:'B',label:'B1',t:0.14, speed:0.00062,status:'on-time', delay:0,  driver:'M. Rao',    passengers:30,capacity:48},
//   {id:'KA-05-E',route:'B',label:'B2',t:0.61, speed:0.00055,status:'on-time', delay:0,  driver:'D. Nair',   passengers:41,capacity:48},
//   {id:'KA-06-F',route:'C',label:'C1',t:0.11, speed:0.00052,status:'on-time', delay:0,  driver:'P. Sharma', passengers:28,capacity:52},
//   {id:'KA-07-G',route:'C',label:'C2',t:0.54, speed:0.00043,status:'delayed', delay:7,  driver:'K. Singh',  passengers:35,capacity:52},
//   {id:'KA-08-H',route:'D',label:'D1',t:0.26, speed:0.00068,status:'on-time', delay:0,  driver:'S. Joshi',  passengers:15,capacity:45},
//   {id:'KA-09-I',route:'D',label:'D2',t:0.79, speed:0,      status:'idle',    delay:0,  driver:'R. Desai',  passengers:0, capacity:45},
// ];

// /* ─── CANVAS DRAW HELPERS ─────────────────────────────────────────────── */
// function ptOnPath(stops, t) {
//   const n = stops.length - 1;
//   const seg = Math.min(Math.floor(t * n), n - 1);
//   const lt = (t * n) - seg;
//   const a = stops[seg], b = stops[Math.min(seg + 1, n)];
//   return { x: a.x + (b.x - a.x) * lt, y: a.y + (b.y - a.y) * lt, seg };
// }

// function drawMapFrame(ctx, W0, H0) {
//   ctx.fillStyle = '#e8f0e8';
//   ctx.fillRect(0, 0, W0, H0);

//   const blocks = [
//     {x:20,y:20,w:118,h:78,c:'#d4e8d4'},{x:156,y:20,w:88,h:58,c:'#cce0cc'},
//     {x:262,y:20,w:78,h:53,c:'#d0e4d0'},{x:228,y:152,w:53,h:108,c:'#cce0cc'},
//     {x:438,y:20,w:98,h:88,c:'#d4e8d4'},{x:558,y:20,w:88,h:78,c:'#cce0cc'},
//     {x:478,y:118,w:68,h:58,c:'#d0e4d0'},{x:578,y:168,w:78,h:58,c:'#cce0cc'},
//     {x:20,y:338,w:98,h:78,c:'#d4e8d4'},{x:138,y:358,w:78,h:68,c:'#cce0cc'},
//     {x:248,y:378,w:88,h:73,c:'#d0e4d0'},{x:458,y:348,w:83,h:78,c:'#d4e8d4'},
//     {x:568,y:338,w:78,h:88,c:'#cce0cc'},
//   ];
//   blocks.forEach(b => {
//     ctx.fillStyle = b.c;
//     ctx.beginPath();
//     ctx.roundRect(b.x, b.y, b.w, b.h, 3);
//     ctx.fill();
//   });

//   ctx.fillStyle = '#b8d4a0';
//   ctx.beginPath(); ctx.roundRect(293, 58, 108, 118, 8); ctx.fill();
//   ctx.fillStyle = '#5a9e5a'; ctx.font = 'bold 10px DM Sans, sans-serif';
//   ctx.textAlign = 'center'; ctx.fillText('City Park', 347, 122);

//   ctx.fillStyle = '#b8d4d8';
//   ctx.beginPath(); ctx.ellipse(590, 288, 52, 33, 0, 0, Math.PI * 2); ctx.fill();
//   ctx.fillStyle = '#4a8a9a'; ctx.font = '9px DM Sans, sans-serif';
//   ctx.textAlign = 'center'; ctx.fillText('Lake', 590, 292);

//   const majorRoads = [
//     [0,293,W0,293],[0,188,W0,188],[0,413,W0,413],
//     [118,0,118,H0],[288,0,288,420],[478,0,478,H0],[0,498,W0,498],
//   ];
//   majorRoads.forEach(([x1,y1,x2,y2]) => {
//     ctx.beginPath(); ctx.strokeStyle = '#c4cfbf'; ctx.lineWidth = 9;
//     ctx.lineCap = 'round'; ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
//     ctx.beginPath(); ctx.strokeStyle = '#e8f0e8'; ctx.lineWidth = 1;
//     ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
//   });
//   const minorRoads = [
//     [0,348,W0,348],[0,448,478,448],[53,0,53,H0],
//     [198,0,198,H0],[378,0,378,498],[548,0,548,H0],
//   ];
//   minorRoads.forEach(([x1,y1,x2,y2]) => {
//     ctx.beginPath(); ctx.strokeStyle = '#d0d8cc'; ctx.lineWidth = 4;
//     ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
//   });

//   const streetNames = [
//     {x:340,y:287,t:'MG Road'},{x:340,y:182,t:'Station Road'},
//     {x:340,y:407,t:'College Road'},{x:112,y:198,t:'KHB Rd'},
//     {x:472,y:198,t:'Camp Rd'},{x:282,y:198,t:'Market Rd'},
//     {x:193,y:342,t:'Civil Lines Rd'},{x:490,y:342,t:'East Rd'},
//   ];
//   ctx.font = '8px DM Sans, sans-serif'; ctx.fillStyle = '#7a8f7a';
//   streetNames.forEach(s => { ctx.textAlign = 'center'; ctx.fillText(s.t, s.x, s.y); });
// }

// function drawRoutes(ctx, activeRoute) {
//   Object.entries(MAP_STOPS).forEach(([rk, stops]) => {
//     const rc = ROUTE_CFG[rk];
//     const visible = activeRoute === 'ALL' || activeRoute === rk;
//     ctx.globalAlpha = visible ? 1 : 0.1;
//     ctx.beginPath();
//     ctx.strokeStyle = rc.color;
//     ctx.lineWidth = activeRoute === rk ? 5 : 3;
//     ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.setLineDash([]);
//     ctx.moveTo(stops[0].x, stops[0].y);
//     stops.forEach(s => ctx.lineTo(s.x, s.y));
//     ctx.stroke();

//     if (visible) {
//       stops.forEach((s, i) => {
//         const isTerm = i === 0 || i === stops.length - 1;
//         ctx.beginPath();
//         ctx.arc(s.x, s.y, isTerm ? 6 : 4, 0, Math.PI * 2);
//         ctx.fillStyle = '#fff'; ctx.fill();
//         ctx.strokeStyle = rc.color;
//         ctx.lineWidth = isTerm ? 2.5 : 2;
//         ctx.setLineDash([]); ctx.stroke();
//       });

//       if (activeRoute === rk) {
//         stops.forEach(s => {
//           ctx.font = 'bold 9px DM Sans, sans-serif';
//           ctx.textAlign = 'center';
//           const tw = ctx.measureText(s.name).width;
//           ctx.fillStyle = 'rgba(255,255,255,.9)';
//           ctx.beginPath();
//           ctx.roundRect(s.x - tw / 2 - 4, s.y - 21, tw + 8, 13, 2);
//           ctx.fill();
//           ctx.fillStyle = '#202124';
//           ctx.fillText(s.name, s.x, s.y - 11);
//         });
//       } else if (activeRoute === 'ALL') {
//         const terminals = [stops[0], stops[stops.length - 1]];
//         terminals.forEach(s => {
//           ctx.font = 'bold 8px DM Sans, sans-serif';
//           ctx.textAlign = 'center';
//           const tw = ctx.measureText(s.name).width;
//           ctx.fillStyle = 'rgba(255,255,255,.88)';
//           ctx.beginPath();
//           ctx.roundRect(s.x - tw / 2 - 3, s.y - 19, tw + 6, 12, 2);
//           ctx.fill();
//           ctx.fillStyle = '#333';
//           ctx.fillText(s.name, s.x, s.y - 10);
//         });
//       }
//     }
//     ctx.globalAlpha = 1;
//   });
// }

// function drawBuses(ctx, busesRef, activeRoute, selectedBusId) {
//   busesRef.forEach(bus => {
//     if (activeRoute !== 'ALL' && bus.route !== activeRoute) return;
//     const rc = ROUTE_CFG[bus.route];
//     const stops = MAP_STOPS[bus.route];
//     const { x, y } = ptOnPath(stops, bus.t);
//     const isSel = selectedBusId === bus.id;
//     const isIdle = bus.status === 'idle';
//     const isDelayed = bus.status === 'delayed';
//     const busColor = isIdle ? '#9aa0a6' : isDelayed ? '#f9ab00' : rc.color;

//     if (isSel) {
//       ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2);
//       ctx.fillStyle = busColor + '26'; ctx.fill();
//       ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2);
//       ctx.fillStyle = busColor + '44'; ctx.fill();
//     }
//     ctx.beginPath(); ctx.arc(x, y, isSel ? 13 : 10, 0, Math.PI * 2);
//     ctx.fillStyle = busColor; ctx.fill();
//     ctx.strokeStyle = '#fff'; ctx.lineWidth = isSel ? 3 : 2;
//     ctx.setLineDash([]); ctx.stroke();

//     ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
//     ctx.font = `bold ${isSel ? 9 : 8}px DM Sans, sans-serif`;
//     ctx.fillText(bus.label, x, y);
//     ctx.textBaseline = 'alphabetic';

//     if (isDelayed) {
//       ctx.beginPath(); ctx.arc(x + 9, y - 9, 6, 0, Math.PI * 2);
//       ctx.fillStyle = '#ea4335'; ctx.fill();
//       ctx.fillStyle = '#fff'; ctx.font = 'bold 8px DM Sans, sans-serif';
//       ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
//       ctx.fillText('!', x + 9, y - 9);
//       ctx.textBaseline = 'alphabetic';
//     }

//     if (isSel || activeRoute === bus.route) {
//       ctx.font = '500 9px DM Sans, sans-serif';
//       ctx.textAlign = 'center';
//       const tw = ctx.measureText(bus.id).width;
//       ctx.fillStyle = 'rgba(255,255,255,.94)';
//       ctx.strokeStyle = busColor + '70'; ctx.lineWidth = 0.5;
//       ctx.beginPath(); ctx.roundRect(x - tw / 2 - 5, y + 15, tw + 10, 13, 3);
//       ctx.fill(); ctx.stroke();
//       ctx.fillStyle = '#202124'; ctx.fillText(bus.id, x, y + 24);
//     }
//     ctx.textAlign = 'left';
//   });
// }

// /* ─── LIVE TRACKING PAGE ──────────────────────────────────────────────── */
// function PageTracking({ showToast }) {
//   const canvasRef  = useRef(null);
//   const busesRef   = useRef(INITIAL_BUSES.map(b => ({ ...b })));
//   const rafRef     = useRef(null);
//   const panRef     = useRef({ x: 0, y: 0 });
//   const dragRef    = useRef({ active: false, sx: 0, sy: 0 });
//   const zoomRef    = useRef(1);
//   const W0 = 680, H0 = 560;

//   const [activeRoute,  setActiveRoute]  = useState('ALL');
//   const [selectedBus,  setSelectedBus]  = useState(null);
//   const [searchQuery,  setSearchQuery]  = useState('');
//   const [, forceRender] = useState(0);

//   const activeRouteRef  = useRef('ALL');
//   const selectedBusRef  = useRef(null);

//   const redraw = useCallback(() => {
//     const cv = canvasRef.current;
//     if (!cv) return;
//     const ctx = cv.getContext('2d');
//     const W = cv.width, H = cv.height;
//     const dpr = window.devicePixelRatio || 1;
//     const cw = W / dpr, ch = H / dpr;
//     ctx.clearRect(0, 0, W, H);
//     ctx.save();
//     ctx.scale(dpr, dpr);
//     const cx = cw / 2, cy = ch / 2;
//     const z = zoomRef.current;
//     const pan = panRef.current;
//     ctx.save();
//     ctx.translate(cx + pan.x, cy + pan.y);
//     ctx.scale(z, z);
//     ctx.translate(-W0 / 2, -H0 / 2);
//     drawMapFrame(ctx, W0, H0);
//     drawRoutes(ctx, activeRouteRef.current);
//     drawBuses(ctx, busesRef.current, activeRouteRef.current, selectedBusRef.current);
//     ctx.restore();
//     ctx.restore();
//   }, []);

//   useEffect(() => {
//     const cv = canvasRef.current;
//     if (!cv) return;
//     const resize = () => {
//       const dpr = window.devicePixelRatio || 1;
//       const rect = cv.parentElement.getBoundingClientRect();
//       cv.width  = rect.width  * dpr;
//       cv.height = rect.height * dpr;
//       cv.style.width  = rect.width  + 'px';
//       cv.style.height = rect.height + 'px';
//     };
//     resize();
//     window.addEventListener('resize', resize);
//     return () => window.removeEventListener('resize', resize);
//   }, []);

//   useEffect(() => {
//     const tick = () => {
//       busesRef.current.forEach(b => {
//         if (b.status === 'idle') return;
//         b.t += b.speed;
//         if (b.t >= 1) b.t = 0;
//       });
//       redraw();
//       rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [redraw]);

//   const doZoom = (f) => {
//     zoomRef.current = Math.min(3, Math.max(0.4, zoomRef.current * f));
//   };

//   const handleCanvasClick = (e) => {
//     if (dragRef.current.moved) return;
//     const cv = canvasRef.current;
//     const rect = cv.getBoundingClientRect();
//     const dpr = window.devicePixelRatio || 1;
//     const mx = (e.clientX - rect.left);
//     const my = (e.clientY - rect.top);
//     const cw = cv.width / dpr, ch = cv.height / dpr;
//     const z = zoomRef.current;
//     const pan = panRef.current;
//     const wx = (mx - cw / 2 - pan.x) / z + W0 / 2;
//     const wy = (my - ch / 2 - pan.y) / z + H0 / 2;

//     let hit = null, minD = 16;
//     busesRef.current.forEach(bus => {
//       if (activeRouteRef.current !== 'ALL' && bus.route !== activeRouteRef.current) return;
//       const stops = MAP_STOPS[bus.route];
//       const { x, y } = ptOnPath(stops, bus.t);
//       const d = Math.hypot(wx - x, wy - y);
//       if (d < minD) { minD = d; hit = bus; }
//     });

//     if (hit) {
//       selectedBusRef.current = hit.id;
//       setSelectedBus(hit.id);
//     } else {
//       selectedBusRef.current = null;
//       setSelectedBus(null);
//     }
//   };

//   const handleMouseDown = (e) => {
//     dragRef.current = { active: true, moved: false, sx: e.clientX - panRef.current.x, sy: e.clientY - panRef.current.y };
//   };
//   const handleMouseMove = (e) => {
//     if (!dragRef.current.active) return;
//     dragRef.current.moved = true;
//     panRef.current = { x: e.clientX - dragRef.current.sx, y: e.clientY - dragRef.current.sy };
//   };
//   const handleMouseUp = () => { dragRef.current.active = false; };

//   const handleWheel = (e) => {
//     e.preventDefault();
//     doZoom(e.deltaY < 0 ? 1.12 : 0.9);
//   };

//   const selectRoute = (r) => {
//     activeRouteRef.current = r;
//     setActiveRoute(r);
//     selectedBusRef.current = null;
//     setSelectedBus(null);
//   };

//   const selectBus = (busId) => {
//     selectedBusRef.current = busId;
//     setSelectedBus(busId);
//   };

//   const closePanel = () => {
//     selectedBusRef.current = null;
//     setSelectedBus(null);
//   };

//   const selBusData = busesRef.current.find(b => b.id === selectedBus) || null;

//   const getNextStop = (bus) => {
//     const stops = MAP_STOPS[bus.route];
//     const n = stops.length - 1;
//     const seg = Math.min(Math.floor(bus.t * n) + 1, n);
//     return stops[seg].name;
//   };

//   const getCurrentArea = (bus) => {
//     const stops = MAP_STOPS[bus.route];
//     const n = stops.length - 1;
//     return stops[Math.min(Math.floor(bus.t * n), n)].name;
//   };

//   const getETA = (bus) => {
//     if (bus.status === 'idle') return '—';
//     const stops = MAP_STOPS[bus.route];
//     const n = stops.length - 1;
//     const seg = Math.floor(bus.t * n);
//     const rem = (seg + 1) / n - bus.t;
//     return Math.max(1, Math.round(rem * n / (bus.speed * 3600 * 0.016))) + ' min';
//   };

//   const routeChips = [
//     { r: 'ALL', label: 'All routes', color: '#1a73e8', dot: '#1a73e8' },
//     { r: 'A',   label: 'Route A',    color: '#1a73e8', dot: '#1a73e8' },
//     { r: 'B',   label: 'Route B',    color: '#0f9d58', dot: '#0f9d58' },
//     { r: 'C',   label: 'Route C',    color: '#f9ab00', dot: '#f9ab00' },
//     { r: 'D',   label: 'Route D',    color: '#9334e6', dot: '#9334e6' },
//   ];

//   const statusCls  = s => s === 'on-time' ? 'bcs-green' : s === 'delayed' ? 'bcs-amber' : s === 'idle' ? 'bcs-gray' : 'bcs-red';
//   const statusText = s => s === 'on-time' ? 'On time' : s === 'delayed' ? 'Delayed' : 'Idle';

//   const visibleBuses = busesRef.current.filter(b => {
//     if (activeRoute !== 'ALL' && b.route !== activeRoute) return false;
//     const q = searchQuery.toLowerCase();
//     if (q && !b.id.toLowerCase().includes(q) && !b.driver.toLowerCase().includes(q) && !b.route.toLowerCase().includes(q)) return false;
//     return true;
//   });

//   const progKeyStops = (bus) => {
//     const stops = MAP_STOPS[bus.route];
//     const n = stops.length;
//     const indices = [0, Math.floor(n / 3), Math.floor(2 * n / 3), n - 1];
//     const curSeg = Math.min(Math.floor(bus.t * (n - 1)), n - 2);
//     return indices.map(i => ({
//       name:  stops[i].name,
//       done:  i <= curSeg,
//       cur:   i === curSeg || i === curSeg + 1,
//     }));
//   };

//   return (
//     <div className="tracking-page">
//       {/* Canvas */}
//       <div
//         className="gm-canvas-wrap"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onWheel={handleWheel}
//         onClick={handleCanvasClick}
//       >
//         <canvas className="gm-canvas" ref={canvasRef} />
//       </div>

//       {/* Top bar */}
//       <div className="tracking-topbar">
//         <div className="gm-searchbox">
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//           <input
//             placeholder="Search bus, driver or route…"
//             value={searchQuery}
//             onChange={e => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div className="route-chips">
//           {routeChips.map(chip => (
//             <button
//               key={chip.r}
//               className={`rchip${activeRoute === chip.r ? ' active' : ''}`}
//               style={activeRoute === chip.r ? { background: chip.color, color: '#fff' } : {}}
//               onClick={() => selectRoute(chip.r)}
//             >
//               <span className="rdot" style={{ background: activeRoute === chip.r ? '#fff' : chip.dot }} />
//               {chip.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Live badge */}
//       <div className="live-badge-float">
//         <div className="live-anim-dot" />
//         Live updates
//       </div>

//       {/* Bus info panel */}
//       <div className={`bus-info-panel${selBusData ? '' : ' hidden'}`}>
//         {selBusData && (() => {
//           const rc = ROUTE_CFG[selBusData.route];
//           const pct = Math.round(selBusData.passengers / selBusData.capacity * 100);
//           const progPct = Math.round(selBusData.t * 100);
//           const nodes = progKeyStops(selBusData);
//           return (
//             <>
//               <div className="bip-header">
//                 <div className="bip-avatar" style={{ background: selBusData.status === 'idle' ? '#9aa0a6' : rc.color }}>
//                   {selBusData.label}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <div className="bip-busid">{selBusData.id}</div>
//                     <span className={`bcard-spill ${statusCls(selBusData.status)}`}>
//                       {selBusData.status === 'delayed' ? `+${selBusData.delay}m` : statusText(selBusData.status)}
//                     </span>
//                   </div>
//                   <div className="bip-routename">{rc.label}</div>
//                 </div>
//                 <button className="bip-close" onClick={closePanel}>×</button>
//               </div>
//               <div className="bip-body">
//                 <div className="bip-row">
//                   <svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
//                   <span className="bip-key">Near</span>
//                   <span className="bip-val">{getCurrentArea(selBusData)}</span>
//                 </div>
//                 <div className="bip-row">
//                   <svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
//                   <span className="bip-key">Next stop</span>
//                   <span className="bip-val" style={{ color: rc.color }}>{getNextStop(selBusData)}</span>
//                 </div>
//                 <div className="bip-row">
//                   <svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
//                   <span className="bip-key">ETA next stop</span>
//                   <span className="bip-val">{getETA(selBusData)}</span>
//                 </div>
//                 <div className="bip-row">
//                   <svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
//                   <span className="bip-key">Driver</span>
//                   <span className="bip-val">{selBusData.driver}</span>
//                 </div>
//                 <div className="bip-row">
//                   <svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
//                   <span className="bip-key">Passengers</span>
//                   <span className="bip-val">{selBusData.passengers}/{selBusData.capacity} <span style={{ color: '#9aa0a6', fontWeight: 400 }}>({pct}%)</span></span>
//                 </div>
//                 <div className="bip-row">
//                   <svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
//                   <span className="bip-key">Speed</span>
//                   <span className="bip-val">{selBusData.status === 'idle' ? '0 km/h' : `${Math.round(28 + (selBusData.t * 100) % 15)} km/h`}</span>
//                 </div>
//               </div>
//               <div className="bip-progress">
//                 <div className="bip-prog-lbl">Route progress — {progPct}%</div>
//                 <div className="bip-prog-track">
//                   <div className="bip-prog-fill" style={{ width: `${progPct}%`, background: rc.color }} />
//                 </div>
//                 <div className="bip-stops-row">
//                   {nodes.map((n, i) => (
//                     <div className="bip-stop-node" key={i}>
//                       <div className={`bip-stop-dot${n.done ? ' done' : ''}${n.cur ? ' current' : ''}`} />
//                       <div className={`bip-stop-label${n.done ? ' done-lbl' : ''}`}
//                            style={n.done ? { color: rc.color } : {}}>
//                         {n.name}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           );
//         })()}
//       </div>

//       {/* Zoom + Compass */}
//       <div className="gm-zoom-ctrl">
//         <button className="gm-zoom-btn" onClick={() => doZoom(1.25)}>+</button>
//         <button className="gm-zoom-btn" onClick={() => doZoom(0.8)}>−</button>
//       </div>
//       <div className="gm-compass">N</div>
//       <div className="gm-attribution">Map data © BusNav 2026</div>

//       {/* Bottom bus cards */}
//       <div className="bus-cards-bar">
//         <div className="bcs-scroll">
//           {visibleBuses.map(bus => {
//             const rc = ROUTE_CFG[bus.route];
//             return (
//               <div
//                 key={bus.id}
//                 className={`bcard${selectedBus === bus.id ? ' sel' : ''}`}
//                 onClick={() => selectBus(bus.id)}
//               >
//                 <div className="bcard-top">
//                   <div className="bcard-av" style={{ background: bus.status === 'idle' ? '#9aa0a6' : rc.color }}>
//                     {bus.label}
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <div className="bcard-num">{bus.id}</div>
//                     <div className="bcard-route">{rc.short}</div>
//                   </div>
//                   <span className={`bcard-spill ${statusCls(bus.status)}`}>
//                     {bus.status === 'delayed' ? `+${bus.delay}m` : statusText(bus.status)}
//                   </span>
//                 </div>
//                 <div className="bcard-info">
//                   <span style={{ color: '#5f6368' }}>Near: </span>
//                   <b>{getCurrentArea(bus)}</b><br />
//                   <span style={{ color: '#5f6368' }}>Next: </span>
//                   <span className="hl" style={{ color: rc.color }}>{getNextStop(bus)}</span>
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

// /* ─── MODAL COMPONENTS (unchanged) ───────────────────────────────────── */
// function AddStopList() {
//   const [stops, setStops] = useState(["Main Gate","Market Circle","City Park"]);
//   const [input, setInput] = useState("");
//   const addStop = () => { const n = input.trim(); if (!n) return; setStops(s=>[...s,n]); setInput(""); };
//   const removeStop = (i) => setStops(s=>s.filter((_,idx)=>idx!==i));
//   return (
//     <>
//       <div className="route-stop-list">
//         {stops.map((s,i)=>(
//           <div className="stop-item" key={i}>
//             <div className="stop-num">{i+1}</div>
//             <div className="stop-name-txt">{s}</div>
//             <button className="remove-stop" onClick={()=>removeStop(i)}>×</button>
//           </div>
//         ))}
//       </div>
//       <div className="add-stop-row">
//         <input className="add-stop-input" placeholder="Add stop name..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addStop()} />
//         <button className="add-stop-btn" onClick={addStop}>+ Add</button>
//       </div>
//     </>
//   );
// }
// function PermCheck({ defaultOn }) {
//   const [on,setOn]=useState(defaultOn);
//   return <button className={`pm-check ${on?"on":"off"}`} onClick={()=>setOn(o=>!o)}>{on?"✓":"—"}</button>;
// }
// function RoleChip({ label, defaultSel }) {
//   const [sel,setSel]=useState(defaultSel);
//   return <button className={`role-chip${sel?" sel":""}`} onClick={()=>setSel(s=>!s)}>{label}</button>;
// }
// function ModalBus({ onClose, onSave }) {
//   return (
//     <div className="modal">
//       <button className="close-btn" onClick={onClose}>×</button>
//       <h3>Add / Edit Bus</h3>
//       <div className="form-row2">
//         <div className="form-row"><label className="form-label">Bus Number</label><input className="form-input" placeholder="KA-XX-X"/></div>
//         <div className="form-row"><label className="form-label">Model</label><input className="form-input" placeholder="Tata Starbus"/></div>
//       </div>
//       <div className="form-row"><label className="form-label">Assign Driver</label>
//         <select className="form-input"><option>— Select driver —</option><option>R. Kumar</option><option>P. Sharma</option><option>M. Rao</option><option>S. Joshi</option></select>
//       </div>
//       <div className="form-row"><label className="form-label">Assign Route</label>
//         <select className="form-input"><option>— Select route —</option><option>Route A — North Loop</option><option>Route B — East Connect</option><option>Route C — South Express</option><option>Route D — West Campus</option></select>
//       </div>
//       <div className="form-row2">
//         <div className="form-row"><label className="form-label">Capacity</label><input className="form-input" placeholder="50" type="number"/></div>
//         <div className="form-row"><label className="form-label">Status</label>
//           <select className="form-input"><option>Active</option><option>Maintenance</option><option>Idle</option></select>
//         </div>
//       </div>
//       <div className="modal-actions">
//         <button className="btn-cancel" onClick={onClose}>Cancel</button>
//         <button className="btn-save" onClick={()=>onSave("Bus saved successfully!")}>Save Bus</button>
//       </div>
//     </div>
//   );
// }
// function ModalDriver({ onClose, onSave }) {
//   return (
//     <div className="modal">
//       <button className="close-btn" onClick={onClose}>×</button>
//       <h3>Add / Edit Driver</h3>
//       <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" placeholder="Driver full name"/></div>
//       <div className="form-row2">
//         <div className="form-row"><label className="form-label">License No.</label><input className="form-input" placeholder="DL-XXXX-XXXX"/></div>
//         <div className="form-row"><label className="form-label">Experience (yrs)</label><input className="form-input" placeholder="5" type="number"/></div>
//       </div>
//       <div className="form-row"><label className="form-label">Phone</label><input className="form-input" placeholder="+91 9XXXXXXXXX"/></div>
//       <div className="form-row"><label className="form-label">Assign Bus</label>
//         <select className="form-input"><option>— Select bus —</option><option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option><option>KA-04-D</option></select>
//       </div>
//       <div className="modal-actions">
//         <button className="btn-cancel" onClick={onClose}>Cancel</button>
//         <button className="btn-save" onClick={()=>onSave("Driver saved successfully!")}>Save Driver</button>
//       </div>
//     </div>
//   );
// }
// function ModalRoute({ onClose, onSave }) {
//   return (
//     <div className="modal">
//       <button className="close-btn" onClick={onClose}>×</button>
//       <h3>Create / Edit Route</h3>
//       <div className="form-row2">
//         <div className="form-row"><label className="form-label">Route ID</label><input className="form-input" placeholder="E"/></div>
//         <div className="form-row"><label className="form-label">Route Name</label><input className="form-input" placeholder="North Loop"/></div>
//       </div>
//       <div className="form-row"><label className="form-label">Description</label><input className="form-input" placeholder="Short description..."/></div>
//       <div className="form-section-title">Stops</div>
//       <AddStopList/>
//       <div className="form-row" style={{marginTop:14}}><label className="form-label">Assign Buses</label>
//         <select className="form-input" multiple style={{height:90}}>
//           <option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option><option>KA-04-D</option><option>KA-05-E</option>
//         </select>
//         <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Hold Ctrl/Cmd to select multiple buses</div>
//       </div>
//       <div className="modal-actions">
//         <button className="btn-cancel" onClick={onClose}>Cancel</button>
//         <button className="btn-save" onClick={()=>onSave("Route created successfully!")}>Create Route</button>
//       </div>
//     </div>
//   );
// }
// function ModalStudent({ onClose, onSave }) {
//   return (
//     <div className="modal">
//       <button className="close-btn" onClick={onClose}>×</button>
//       <h3>Add Student</h3>
//       <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" placeholder="Student full name"/></div>
//       <div className="form-row2">
//         <div className="form-row"><label className="form-label">Roll No.</label><input className="form-input" placeholder="2024-XXX"/></div>
//         <div className="form-row"><label className="form-label">Class / Section</label><input className="form-input" placeholder="10-A"/></div>
//       </div>
//       <div className="form-row"><label className="form-label">Assign Route</label>
//         <select className="form-input"><option value="">— Select route —</option><option>Route A — North Loop</option><option>Route B — East Connect</option><option>Route C — South Express</option><option>Route D — West Campus</option></select>
//       </div>
//       <div className="form-row"><label className="form-label">Pickup Stop</label>
//         <select className="form-input"><option value="">— Select stop —</option><option>Main Gate</option><option>Market Square</option><option>North Bridge</option><option>City Park</option><option>East Market</option><option>Rail Station</option><option>Tilakwadi</option><option>Sadashiv Nagar</option><option>Campus A</option><option>Science Block</option></select>
//       </div>
//       <div className="form-row"><label className="form-label">Parent Contact</label><input className="form-input" placeholder="+91 9XXXXXXXXX"/></div>
//       <div className="modal-actions">
//         <button className="btn-cancel" onClick={onClose}>Cancel</button>
//         <button className="btn-save" onClick={()=>onSave("Student added successfully!")}>Save Student</button>
//       </div>
//     </div>
//   );
// }
// function ModalRole({ onClose, onSave }) {
//   return (
//     <div className="modal">
//       <button className="close-btn" onClick={onClose}>×</button>
//       <h3>Add / Edit User Role</h3>
//       <div className="form-row2">
//         <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" placeholder="User full name"/></div>
//         <div className="form-row"><label className="form-label">User Email</label><input className="form-input" placeholder="user@school.edu"/></div>
//       </div>
//       <div className="form-row"><label className="form-label">Assign Role</label>
//         <div className="role-row">
//           {["Super Admin","Admin","Dispatcher","Driver","Viewer"].map((r,i)=><RoleChip key={r} label={r} defaultSel={i===1}/>)}
//         </div>
//       </div>
//       <div className="form-row" style={{marginTop:4}}><label className="form-label">Permissions</label>
//         <div className="perm-row">
//           {["View live map & tracking","Manage buses & drivers","Edit routes & stops","Access analytics & reports","Manage students","System & role administration"].map((p,i)=>(
//             <label className="perm-label" key={p}><input type="checkbox" defaultChecked={i<2} style={{accentColor:"var(--accent)",width:14,height:14}}/> {p}</label>
//           ))}
//         </div>
//       </div>
//       <div className="modal-actions">
//         <button className="btn-cancel" onClick={onClose}>Cancel</button>
//         <button className="btn-save" onClick={()=>onSave("User role updated!")}>Save User</button>
//       </div>
//     </div>
//   );
// }

// /* ─── OTHER PAGE COMPONENTS (unchanged) ──────────────────────────────── */
// function PageDashboard({ showModal }) {
//   const [activePill,setActivePill]=useState("All");
//   const [activeRoute,setActiveRoute]=useState(0);
//   const pills=["All","Route A","Route B","Route C"];
//   const routes=[
//     {cls:"rc-a",name:"Route A — North Loop",meta:"12 stops · 6 buses · 34 min",pct:92,color:"var(--green)"},
//     {cls:"rc-b",name:"Route B — East Connect",meta:"8 stops · 4 buses · 28 min",pct:67,color:"var(--accent)"},
//     {cls:"rc-c",name:"Route C — South Express",meta:"10 stops · 5 buses · 40 min",pct:88,color:"var(--green)"},
//     {cls:"rc-d",name:"Route D — West Campus",meta:"6 stops · 3 buses · 22 min",pct:50,color:"var(--muted)"},
//   ];
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Dashboard</div><div className="page-subtitle">Good morning — Sunday, April 19, 2026</div></div>
//         <div className="fab-row">
//           <button className="fab-btn fab-primary" onClick={()=>showModal("bus")}>＋ Add Bus</button>
//           <button className="fab-btn fab-secondary" onClick={()=>showModal("driver")}>＋ Add Driver</button>
//           <button className="fab-btn fab-secondary" onClick={()=>showModal("route")}>＋ Create Route</button>
//           <button className="fab-btn fab-secondary" onClick={()=>showModal("student")}>＋ Add Student</button>
//         </div>
//       </div>
//       <div className="stat-grid">
//         <div className="stat-card s-green"><div className="stat-label">Active Buses</div><div className="stat-val green">18</div><div className="stat-sub"><span className="stat-trend up">+2</span> vs yesterday</div></div>
//         <div className="stat-card s-amber"><div className="stat-label">Delayed Buses</div><div className="stat-val amber">3</div><div className="stat-sub"><span className="stat-trend down">▲ 1</span> alert active</div></div>
//         <div className="stat-card s-blue"><div className="stat-label">Drivers on Duty</div><div className="stat-val blue">21</div><div className="stat-sub"><span className="stat-trend up">100%</span> assigned</div></div>
//         <div className="stat-card s-purple"><div className="stat-label">Students Today</div><div className="stat-val purple">1,248</div><div className="stat-sub"><span className="stat-trend up">+34</span> this week</div></div>
//       </div>
//       <div className="mid-row">
//         <div className="map-card">
//           <div className="card-header">
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
//             <span className="card-title">Live Map</span><span className="card-sub">— all buses</span>
//             <div className="ch-right">
//               {pills.map(p=><button key={p} className={`pill ${activePill===p?"active":"passive"}`} onClick={()=>setActivePill(p)}>{p}</button>)}
//             </div>
//           </div>
//           <div className="map-body">
//             <div className="map-grid-bg"/>
//             <div className="map-road" style={{left:0,top:118,width:"100%",height:3,opacity:.5}}/>
//             <div className="map-road" style={{left:0,top:62,width:"100%",height:2,opacity:.25}}/>
//             <div className="map-road" style={{left:0,top:185,width:"100%",height:2,opacity:.25}}/>
//             <div className="map-road" style={{left:120,top:0,width:3,height:"100%",opacity:.4}}/>
//             <div className="map-road" style={{left:280,top:0,width:2,height:"100%",opacity:.25}}/>
//             <div className="map-road" style={{left:450,top:0,width:2,height:"100%",opacity:.25}}/>
//             <div className="route-line-h" style={{left:80,top:109,width:240,background:"rgba(59,139,212,.35)"}}/>
//             <div className="route-line-h" style={{left:60,top:176,width:300,background:"rgba(61,200,122,.3)"}}/>
//             <div className="route-line-h" style={{left:300,top:63,width:200,background:"rgba(245,166,35,.25)"}}/>
//             {[[76,114],[160,114],[240,114],[315,114],[56,171],[160,171],[320,171],[310,58],[420,58]].map(([l,t],i)=><div key={i} className="stop-dot" style={{left:l,top:t}}/>)}
//             {[["on-time",130,108,"Bus A1","A1"],["on-time",200,108,"Bus A2","A2"],["delayed",268,108,"Bus B3 — Delayed","B3"],["on-time",100,165,"Bus C1","C1"],["on-time",240,165,"Bus C2","C2"],["on-time",390,108,"Bus D1","D1"],["delayed",370,53,"Bus E2 — Delayed","E2"],["idle",430,178,"Bus F1 — Idle","F1"]].map(([cls,l,t,title,lbl])=>(
//               <div key={lbl} className={`bus-dot ${cls}`} style={{left:l,top:t}} title={title}>{lbl}</div>
//             ))}
//           </div>
//           <div className="map-legend">
//             <div className="legend-item"><div className="legend-dot" style={{background:"var(--green)"}}/> On time (18)</div>
//             <div className="legend-item"><div className="legend-dot" style={{background:"var(--accent)"}}/> Delayed (3)</div>
//             <div className="legend-item"><div className="legend-dot" style={{background:"#3a4a60"}}/> Idle (2)</div>
//           </div>
//         </div>
//         <div className="alerts-card">
//           <div className="card-header">
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
//             <span className="card-title">Delay Alerts</span>
//             <div className="ch-right"><button className="pill passive" style={{fontSize:10}}>Mark all read</button></div>
//           </div>
//           {[{t:"warn",icon:"⚠",txt:<><strong>Bus B3</strong> <span>is 12 min delayed on Route B — stop 4</span></>,time:"09:14 AM"},
//             {t:"err",icon:"!",txt:<><strong>Bus E2</strong> <span>engine warning — driver notified</span></>,time:"09:08 AM"},
//             {t:"warn",icon:"⚠",txt:<><strong>Route C</strong> <span>heavy traffic near Main St</span></>,time:"08:55 AM"},
//             {t:"ok",icon:"✓",txt:<><strong>Bus A1</strong> <span>resumed schedule after delay</span></>,time:"08:42 AM"},
//             {t:"ok",icon:"✓",txt:<><strong>Driver R. Kumar</strong> <span>checked in for morning shift</span></>,time:"08:00 AM"},
//           ].map((a,i)=>(
//             <div className="alert-item" key={i}>
//               <div className={`alert-icon ${a.t}`}>{a.icon}</div>
//               <div style={{flex:1}}><div className="alert-text">{a.txt}</div><div className="alert-time">{a.time}</div></div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="bot-row">
//         <div className="table-card">
//           <div className="card-header">
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--blue2)" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
//             <span className="card-title">Buses</span>
//             <div className="ch-right"><button className="fab-btn fab-primary" style={{padding:"5px 12px",fontSize:11}} onClick={()=>showModal("bus")}>＋ Add</button></div>
//           </div>
//           <table className="data-table">
//             <thead><tr><th>Bus</th><th>Driver</th><th>Route</th><th>Status</th><th></th></tr></thead>
//             <tbody>
//               {[["KA-01-B","#3b8bd4","RK","R. Kumar","Route A","sp-green","On Time"],
//                 ["KA-02-B","#8b5cf6","PS","P. Sharma","Route B","sp-amber","Delayed"],
//                 ["KA-03-C","#3dc87a","MR","M. Rao","Route C","sp-green","On Time"],
//                 ["KA-04-D","#e05252","SJ","S. Joshi","Route D","sp-gray","Idle"],
//                 ["KA-05-E","#f5a623","AB","A. Baig","Route A","sp-red","⚠ Warning"],
//               ].map(([bus,bg,init,drv,route,sc,st])=>(
//                 <tr key={bus}><td><strong>{bus}</strong></td><td><span className="ava-sm" style={{background:bg}}>{init}</span>{drv}</td><td>{route}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn" onClick={()=>showModal("bus")}>Edit</button></td></tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="route-card">
//           <div className="card-header">
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
//             <span className="card-title">Routes</span>
//             <div className="ch-right"><button className="fab-btn fab-secondary" style={{padding:"5px 12px",fontSize:11}} onClick={()=>showModal("route")}>＋ New</button></div>
//           </div>
//           <div className="route-list">
//             {routes.map((r,i)=>(
//               <div key={i} className={`route-item${activeRoute===i?" active-route":""}`} onClick={()=>setActiveRoute(i)}>
//                 <div className={`route-circle ${r.cls}`}>{["A","B","C","D"][i]}</div>
//                 <div className="route-info"><div className="route-name">{r.name}</div><div className="route-meta">{r.meta}</div></div>
//                 <div className="route-bar-wrap">
//                   <div style={{fontSize:10,color:r.color,marginBottom:3,textAlign:"right"}}>{r.pct}%</div>
//                   <div className="route-bar-bg"><div className="route-bar-fill" style={{width:`${r.pct}%`,background:r.color}}/></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="history-strip">
//             <div className="history-label">Bus History — KA-01-B today</div>
//             <div className="history-bars">
//               {[["var(--green)",.8,"60%"],["var(--green)",.9,"75%"],["var(--accent)",1,"90%"],["var(--green)",.85,"70%"],["var(--green)",.9,"80%"],["var(--green)",1,"65%"],["rgba(100,116,139,.15)",1,"40%"],["rgba(100,116,139,.15)",1,"40%"]].map(([bg,op,h],i)=>(
//                 <div key={i} className="history-bar" style={{background:bg,opacity:op,height:h}}/>
//               ))}
//             </div>
//             <div className="history-times"><span>07:00</span><span>08:00</span><span>09:00</span><span>10:00</span></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PageBuses({ showModal }) {
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Buses</div><div className="page-subtitle">Manage fleet — 23 buses registered</div></div>
//         <div className="fab-row">
//           <div className="search-bar"><IconSearch/><input placeholder="Search buses..."/></div>
//           <select className="filter-select"><option>All Routes</option><option>Route A</option><option>Route B</option><option>Route C</option><option>Route D</option></select>
//           <button className="fab-btn fab-primary" onClick={()=>showModal("bus")}>＋ Add Bus</button>
//         </div>
//       </div>
//       <div className="table-card">
//         <table className="data-table">
//           <thead><tr><th>Bus No.</th><th>Model</th><th>Driver</th><th>Assigned Route</th><th>Capacity</th><th>Status</th><th>Last Active</th><th></th></tr></thead>
//           <tbody>
//             {[["KA-01-B","Tata Starbus","#3b8bd4","RK","R. Kumar","sp-blue","Route A",50,"sp-green","On Time","09:12"],
//               ["KA-02-B","Ashok Leyland","#8b5cf6","PS","P. Sharma","sp-green","Route B",48,"sp-amber","Delayed","09:08"],
//               ["KA-03-C","Tata Starbus","#3dc87a","MR","M. Rao","sp-amber","Route C",52,"sp-green","On Time","09:14"],
//               ["KA-04-D","Eicher Bus","#e05252","SJ","S. Joshi","sp-purple","Route D",45,"sp-gray","Idle","07:30"],
//               ["KA-05-E","Tata Starbus","#f5a623","AB","A. Baig","sp-blue","Route A",50,"sp-red","⚠ Warning","08:55"],
//               ["KA-06-F","Ashok Leyland","#0ea5e9","VP","V. Patil","sp-green","Route B",48,"sp-green","On Time","09:10"],
//               ["KA-07-G","Volvo 9400","#14b8a6","DN","D. Nair","sp-amber","Route C",55,"sp-green","On Time","09:13"],
//             ].map(([bus,model,bg,init,drv,rsc,route,cap,sc,st,time])=>(
//               <tr key={bus}><td><strong>{bus}</strong></td><td>{model}</td><td><span className="ava-sm" style={{background:bg}}>{init}</span>{drv}</td><td><span className={`status-pill ${rsc}`}>{route}</span></td><td>{cap}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td style={{color:"var(--muted)",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{time}</td><td><button className="act-btn" onClick={()=>showModal("bus")}>Edit</button></td></tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function PageDrivers({ showModal }) {
//   const drivers=[
//     {bg:"#3b8bd4",init:"RK",name:"R. Kumar",id:"DL-5201-2019 · 8 yrs",sc:"sp-green",st:"Active",bus:"KA-01-B",route:"Route A — North Loop",phone:"+91 98765 43210",trips:"6 / 6",tc:"var(--green)"},
//     {bg:"#8b5cf6",init:"PS",name:"P. Sharma",id:"DL-3892-2017 · 10 yrs",sc:"sp-amber",st:"Delayed",bus:"KA-02-B",route:"Route B — East Connect",phone:"+91 91234 56789",trips:"4 / 6",tc:"var(--accent)"},
//     {bg:"#3dc87a",init:"MR",name:"M. Rao",id:"DL-1123-2020 · 6 yrs",sc:"sp-green",st:"Active",bus:"KA-03-C",route:"Route C — South Express",phone:"+91 90000 11223",trips:"5 / 6",tc:"var(--green)"},
//     {bg:"#e05252",init:"SJ",name:"S. Joshi",id:"DL-7741-2018 · 9 yrs",sc:"sp-gray",st:"Idle",bus:"KA-04-D",route:"Route D — West Campus",phone:"+91 99887 76655",trips:"2 / 6",tc:"var(--muted)"},
//     {bg:"#f5a623",init:"AB",name:"A. Baig",id:"DL-4456-2021 · 5 yrs",sc:"sp-red",st:"Warning",bus:"KA-05-E",route:"Route A — North Loop",phone:"+91 88001 23456",trips:"3 / 6",tc:"var(--red)"},
//     {bg:"#0ea5e9",init:"VP",name:"V. Patil",id:"DL-9920-2016 · 12 yrs",sc:"sp-green",st:"Active",bus:"KA-06-F",route:"Route B — East Connect",phone:"+91 97654 32109",trips:"6 / 6",tc:"var(--green)"},
//   ];
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Drivers</div><div className="page-subtitle">21 drivers on duty today</div></div>
//         <div className="fab-row">
//           <div className="search-bar"><IconSearch/><input placeholder="Search drivers..."/></div>
//           <button className="fab-btn fab-primary" onClick={()=>showModal("driver")}>＋ Add Driver</button>
//         </div>
//       </div>
//       <div className="driver-cards">
//         {drivers.map(d=>(
//           <div className="driver-card" key={d.name}>
//             <div className="dc-header">
//               <div className="dc-avatar" style={{background:d.bg}}>{d.init}</div>
//               <div><div className="dc-name">{d.name}</div><div className="dc-id">{d.id}</div></div>
//               <span className={`status-pill ${d.sc}`} style={{marginLeft:"auto"}}>{d.st}</span>
//             </div>
//             {[["Assigned Bus",d.bus],["Route",d.route],["Phone",d.phone]].map(([k,v])=>(
//               <div className="dc-row" key={k}><span className="dc-key">{k}</span><span className="dc-val">{v}</span></div>
//             ))}
//             <div className="dc-row" style={{border:"none"}}><span className="dc-key">Trips Today</span><span className="dc-val" style={{color:d.tc}}>{d.trips}</span></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function PageRoutes({ showModal }) {
//   const routes=[
//     {cls:"rc-a",letter:"A",name:"Route A — North Loop",sc:"sp-green",ont:"92% on-time",stops:12,buses:6,avg:"34 min",stopNames:["Main Gate","Market Circle","City Park","North Bridge"],more:"+8 more",col:"var(--blue2)",bg:"rgba(37,99,235,.12)",bd:"rgba(37,99,235,.2)"},
//     {cls:"rc-b",letter:"B",name:"Route B — East Connect",sc:"sp-amber",ont:"67% on-time",stops:8,buses:4,avg:"28 min",stopNames:["Depot","East Market","Rail Station"],more:"+5 more",col:"var(--green)",bg:"rgba(22,163,74,.1)",bd:"rgba(22,163,74,.2)"},
//     {cls:"rc-c",letter:"C",name:"Route C — South Express",sc:"sp-green",ont:"88% on-time",stops:10,buses:5,avg:"40 min",stopNames:["School Gate","Tilakwadi","Sadashiv Nagar"],more:"+7 more",col:"var(--accent)",bg:"rgba(245,166,35,.1)",bd:"rgba(245,166,35,.2)"},
//     {cls:"rc-d",letter:"D",name:"Route D — West Campus",sc:"sp-gray",ont:"50% on-time",stops:6,buses:3,avg:"22 min",stopNames:["Campus A","Science Block","Hostel"],more:"+3 more",col:"#b07ef7",bg:"rgba(165,110,245,.1)",bd:"rgba(165,110,245,.2)"},
//   ];
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Routes</div><div className="page-subtitle">4 active routes — 36 stops total</div></div>
//         <button className="fab-btn fab-primary" onClick={()=>showModal("route")}>＋ Create Route</button>
//       </div>
//       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
//         {routes.map(r=>(
//           <div className="table-card" key={r.letter}>
//             <div className="card-header">
//               <div className={`route-circle ${r.cls}`} style={{width:26,height:26,fontSize:10}}>{r.letter}</div>
//               <span className="card-title">{r.name}</span>
//               <div className="ch-right"><span className={`status-pill ${r.sc}`}>{r.ont}</span></div>
//             </div>
//             <div style={{padding:"16px 18px"}}>
//               <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
//                 <div><div className="stat-label">Stops</div><div style={{fontSize:18,fontWeight:700}}>{r.stops}</div></div>
//                 <div><div className="stat-label">Buses</div><div style={{fontSize:18,fontWeight:700,color:"var(--blue2)"}}>{r.buses}</div></div>
//                 <div><div className="stat-label">Avg Time</div><div style={{fontSize:18,fontWeight:700,color:r.col}}>{r.avg}</div></div>
//               </div>
//               <div style={{fontSize:11,color:"var(--muted)",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Stop Sequence</div>
//               <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
//                 {r.stopNames.map(s=>(
//                   <span key={s} style={{fontSize:11.5,padding:"3px 9px",background:r.bg,border:`1px solid ${r.bd}`,borderRadius:6,color:r.col}}>{s}</span>
//                 ))}
//                 {r.more&&<span style={{fontSize:11,color:"var(--muted)"}}>→ {r.more}</span>}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function PageStudents({ showModal }) {
//   const students=[
//     ["#3b8bd4","AR","Aryan Reddy","2024-001","10-A","sp-blue","Route A","North Bridge","sp-green","Active"],
//     ["#e05252","PS","Priya Singh","2024-002","9-B","sp-green","Route B","East Market","sp-green","Active"],
//     ["#f5a623","KN","Kartik Nair","2024-003","11-C","sp-amber","Route C","Tilakwadi","sp-green","Active"],
//     ["#8b5cf6","MV","Meera Verma","2024-004","8-A","sp-purple","Route D","Campus A","sp-amber","Pending"],
//     ["#14b8a6","RJ","Rahul Jain","2024-005","10-B","sp-blue","Route A","City Park","sp-green","Active"],
//     ["#ec4899","SM","Sneha More","2024-006","12-A","sp-green","Route B","Rail Station","sp-gray","Inactive"],
//   ];
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Students</div><div className="page-subtitle">1,248 students enrolled in bus service</div></div>
//         <div className="fab-row">
//           <div className="search-bar"><IconSearch/><input placeholder="Search students..."/></div>
//           <select className="filter-select"><option>All Routes</option><option>Route A</option><option>Route B</option><option>Route C</option><option>Route D</option></select>
//           <button className="fab-btn fab-primary" onClick={()=>showModal("student")}>＋ Add Student</button>
//         </div>
//       </div>
//       <div className="table-card">
//         <table className="data-table">
//           <thead><tr><th>Name</th><th>Roll No.</th><th>Class</th><th>Route</th><th>Pickup Stop</th><th>Status</th><th></th></tr></thead>
//           <tbody>
//             {students.map(([bg,init,name,roll,cls,rsc,route,stop,sc,st])=>(
//               <tr key={roll}><td><span className="ava-sm" style={{background:bg}}>{init}</span><strong>{name}</strong></td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{roll}</td><td>{cls}</td><td><span className={`status-pill ${rsc}`}>{route}</span></td><td>{stop}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn">Edit</button></td></tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function PageAnalytics() {
//   const weekBars=[{h:"85%",c:"var(--green)",l:"Mon"},{h:"92%",c:"var(--green)",l:"Tue"},{h:"78%",c:"var(--accent)",l:"Wed"},{h:"95%",c:"var(--green)",l:"Thu"},{h:"88%",c:"var(--green)",l:"Fri"},{h:"60%",c:"var(--muted)",l:"Sat"},{h:"94%",c:"var(--green)",l:"Sun"}];
//   const hourBars=[{h:"30%",o:.4},{h:"95%",o:.8},{h:"100%",o:1},{h:"70%",o:.6},{h:"20%",o:.3},{h:"10%",o:.2},{h:"15%",o:.25},{h:"60%",o:.55},{h:"90%",o:.75},{h:"80%",o:.65},{h:"40%",o:.4},{h:"15%",o:.25}];
//   const hourLabels=["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"];
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Analytics</div><div className="page-subtitle">Performance metrics — April 2026</div></div>
//         <div className="fab-row">
//           <select className="filter-select"><option>This Week</option><option>This Month</option><option>Last 3 Months</option></select>
//           <button className="fab-btn fab-secondary">↓ Export</button>
//         </div>
//       </div>
//       <div className="kpi-row">
//         <div className="kpi-card"><div className="kpi-icon" style={{background:"rgba(22,163,74,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div><div><div className="kpi-val" style={{color:"var(--green)"}}>94.2%</div><div className="kpi-lbl">On-Time Rate</div></div></div>
//         <div className="kpi-card"><div className="kpi-icon" style={{background:"rgba(37,99,235,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue2)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div><div className="kpi-val" style={{color:"var(--blue2)"}}>6.2 min</div><div className="kpi-lbl">Avg Delay</div></div></div>
//         <div className="kpi-card"><div className="kpi-icon" style={{background:"rgba(124,58,237,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><div><div className="kpi-val" style={{color:"var(--purple)"}}>1,248</div><div className="kpi-lbl">Students Transported</div></div></div>
//       </div>
//       <div className="analytics-grid">
//         <div className="chart-card" style={{gridColumn:"span 2"}}>
//           <div className="chart-title">Daily On-Time Performance — This Week</div>
//           <div className="bar-chart" style={{height:120}}>
//             {weekBars.map(b=><div key={b.l} className="bar-col"><div className="bar-fill" style={{height:b.h,background:`linear-gradient(to top,${b.c},${b.c}66)`}}/><div className="bar-label">{b.l}</div></div>)}
//           </div>
//         </div>
//         <div className="chart-card">
//           <div className="chart-title">Route Load Distribution</div>
//           <div className="donut-wrap">
//             <svg width="90" height="90" viewBox="0 0 36 36">
//               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="rgba(0,0,0,.05)" strokeWidth="4"/>
//               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--blue2)" strokeWidth="4" strokeDasharray="37 63" strokeDashoffset="25"/>
//               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--green)" strokeWidth="4" strokeDasharray="28 72" strokeDashoffset="-12"/>
//               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--accent)" strokeWidth="4" strokeDasharray="22 78" strokeDashoffset="-40"/>
//               <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--purple)" strokeWidth="4" strokeDasharray="13 87" strokeDashoffset="-62"/>
//             </svg>
//             <div className="donut-legend">
//               {[["var(--blue2)","Route A (37%)"],["var(--green)","Route B (28%)"],["var(--accent)","Route C (22%)"],["var(--purple)","Route D (13%)"]].map(([c,l])=>(
//                 <div className="donut-leg-item" key={l}><div className="donut-leg-dot" style={{background:c}}/>{l}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="chart-card" style={{gridColumn:"span 3"}}>
//           <div className="chart-title">Hourly Dispatch Volume — Today</div>
//           <div className="bar-chart" style={{height:80,gap:5}}>
//             {hourBars.map((b,i)=><div key={i} className="bar-col"><div className="bar-fill" style={{height:b.h,background:`rgba(59,139,212,${b.o})`}}/><div className="bar-label">{hourLabels[i]}</div></div>)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PageHistory() {
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Bus History</div><div className="page-subtitle">Trip logs and journey history</div></div>
//         <div className="fab-row">
//           <div className="search-bar"><IconSearch/><input placeholder="Search by bus or route..."/></div>
//           <input type="date" className="filter-select" defaultValue="2026-04-19"/>
//           <select className="filter-select"><option>All Buses</option><option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option></select>
//           <button className="fab-btn fab-secondary">↓ Export CSV</button>
//         </div>
//       </div>
//       <div className="history-full">
//         <table className="data-table">
//           <thead><tr><th>Bus</th><th>Route</th><th>Driver</th><th>Trip Start</th><th>Trip End</th><th>Stops Completed</th><th>Delay</th><th>Status</th></tr></thead>
//           <tbody>
//             {[["KA-01-B","Route A","R. Kumar","07:00 AM","07:34 AM","12 / 12","0 min","var(--green)","sp-green","Completed"],
//               ["KA-01-B","Route A","R. Kumar","08:00 AM","08:38 AM","12 / 12","+4 min","var(--accent)","sp-amber","Minor Delay"],
//               ["KA-02-B","Route B","P. Sharma","07:00 AM","07:28 AM","8 / 8","0 min","var(--green)","sp-green","Completed"],
//               ["KA-02-B","Route B","P. Sharma","08:00 AM","In Progress","4 / 8","+12 min","var(--red)","sp-red","Delayed"],
//               ["KA-03-C","Route C","M. Rao","07:00 AM","07:42 AM","10 / 10","0 min","var(--green)","sp-green","Completed"],
//               ["KA-04-D","Route D","S. Joshi","07:00 AM","07:22 AM","6 / 6","0 min","var(--green)","sp-green","Completed"],
//               ["KA-05-E","Route A","A. Baig","07:30 AM","Stopped","3 / 12","Engine warning","var(--red)","sp-red","⚠ Incident"],
//               ["KA-06-F","Route B","V. Patil","08:00 AM","08:26 AM","8 / 8","0 min","var(--green)","sp-green","Completed"],
//             ].map(([bus,route,drv,start,end,stops,delay,dc,sc,st],i)=>(
//               <tr key={i}><td><strong>{bus}</strong></td><td>{route}</td><td>{drv}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{start}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:11}}>{end}</td><td>{stops}</td><td style={{color:dc}}>{delay}</td><td><span className={`status-pill ${sc}`}>{st}</span></td></tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function PageRoles({ showModal }) {
//   const perms=[["View live map",[1,1,1,1,1]],["Manage buses",[1,1,0,0,0]],["Edit routes",[1,1,1,0,0]],["Analytics",[1,1,0,0,1]],["Manage students",[1,1,1,0,0]],["System admin",[1,0,0,0,0]]];
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div><div className="page-title">Role Management</div><div className="page-subtitle">Manage user access and permissions</div></div>
//         <button className="fab-btn fab-primary" onClick={()=>showModal("role")}>＋ Add User</button>
//       </div>
//       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
//         <div className="role-table-wrap">
//           <div className="card-header"><span className="card-title">Users & Roles</span><div className="ch-right"><span className="card-sub">5 users</span></div></div>
//           <table className="data-table">
//             <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
//             <tbody>
//               {[["#f5a623","AD","Admin","admin@school.edu","sp-amber","Super Admin","sp-green","Active"],
//                 ["#3b8bd4","JP","J. Patil","j.patil@school.edu","sp-blue","Admin","sp-green","Active"],
//                 ["#3dc87a","RD","R. Desai","r.desai@school.edu","sp-green","Dispatcher","sp-green","Active"],
//                 ["#8b5cf6","NK","N. Kulkarni","n.kulkarni@school.edu","sp-purple","Viewer","sp-gray","Inactive"],
//               ].map(([bg,init,name,email,rsc,role,sc,st])=>(
//                 <tr key={email}><td><span className="ava-sm" style={{background:bg}}>{init}</span><strong>{name}</strong></td><td style={{fontSize:11.5,color:"var(--muted)"}}>{email}</td><td><span className={`status-pill ${rsc}`}>{role}</span></td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn" onClick={()=>showModal("role")}>Edit</button></td></tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="role-table-wrap">
//           <div className="card-header"><span className="card-title">Permission Matrix</span></div>
//           <div className="permission-matrix">
//             {["Permission","Super Admin","Admin","Dispatcher","Driver","Viewer"].map(h=><div key={h} className="pm-header">{h}</div>)}
//             {perms.map(([perm,vals])=>(
//               <div key={perm} style={{display:"contents"}}>
//                 <div className="pm-cell" style={{justifyContent:"flex-start"}}>{perm}</div>
//                 {vals.map((v,i)=><div key={i} className="pm-cell"><PermCheck defaultOn={!!v}/></div>)}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── MAIN APP ────────────────────────────────────────────────────────── */
// export default function BusNavDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [modal, setModal] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [clock, setClock] = useState("");
//   const toastTimer = useRef(null);

//   useEffect(() => {
//     const tick = () => setClock(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
//     tick();
//     const t = setInterval(tick, 1000);
//     return () => clearInterval(t);
//   }, []);

//   const showToast = (msg) => {
//     setToast(msg);
//     clearTimeout(toastTimer.current);
//     toastTimer.current = setTimeout(() => setToast(null), 2800);
//   };

//   const showModal = (type) => setModal(type);
//   const hideModal = () => setModal(null);
//   const saveAndClose = (msg) => { hideModal(); showToast(msg); };

//   const navSections = [
//     { label: "Overview", items: [
//       { id: "dashboard", icon: <IconDash/>,   label: "Dashboard" },
//       { id: "tracking",  icon: <IconClock/>,  label: "Live Tracking", badge: "3", warn: true },
//     ]},
//     { label: "Management", items: [
//       { id: "buses",    icon: <IconBus/>,    label: "Buses" },
//       { id: "drivers",  icon: <IconUser/>,   label: "Drivers" },
//       { id: "routes",   icon: <IconRoute/>,  label: "Routes" },
//       { id: "students", icon: <IconPeople/>, label: "Students", badge: "12", warn: true },
//     ]},
//     { label: "Analytics", items: [
//       { id: "analytics", icon: <IconBar/>,  label: "Analytics" },
//       { id: "history",   icon: <IconFile/>, label: "Bus History" },
//     ]},
//     { label: "System", items: [
//       { id: "roles", icon: <IconLock/>, label: "Role Mgmt" },
//     ]},
//   ];

//   const pageLabels = { dashboard:"Dashboard", tracking:"Live Tracking", buses:"Buses", drivers:"Drivers", routes:"Routes", students:"Students", analytics:"Analytics", history:"Bus History", roles:"Role Management" };

//   const renderPage = () => {
//     switch (activePage) {
//       case "dashboard": return <PageDashboard showModal={showModal}/>;
//       case "tracking":  return <PageTracking showToast={showToast}/>;
//       case "buses":     return <PageBuses showModal={showModal}/>;
//       case "drivers":   return <PageDrivers showModal={showModal}/>;
//       case "routes":    return <PageRoutes showModal={showModal}/>;
//       case "students":  return <PageStudents showModal={showModal}/>;
//       case "analytics": return <PageAnalytics/>;
//       case "history":   return <PageHistory/>;
//       case "roles":     return <PageRoles showModal={showModal}/>;
//       default:          return <PageDashboard showModal={showModal}/>;
//     }
//   };

//   const renderModal = () => {
//     if (!modal) return null;
//     const props = { onClose: hideModal, onSave: saveAndClose };
//     const map = { bus:<ModalBus {...props}/>, driver:<ModalDriver {...props}/>, route:<ModalRoute {...props}/>, student:<ModalStudent {...props}/>, role:<ModalRole {...props}/> };
//     return (
//       <div className="modal-overlay" onClick={e => e.target === e.currentTarget && hideModal()}>
//         {map[modal]}
//       </div>
//     );
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <div className="layout">
//         <div className="topbar">
//           <div className="logo">
//             <div className="logo-icon"><BusLogo/></div>
//             BusNav Admin
//           </div>
//           <div className="spacer"/>
//           <div className="breadcrumb">
//             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
//             <span>{pageLabels[activePage]}</span>
//           </div>
//           <div className="spacer"/>
//           <div className="topbar-right">
//             <div className="topbar-time">{clock}</div>
//             <div className="badge-notif" title="3 alerts"><IconBell/><span className="dot"/></div>
//             <div className="avatar" title="Admin">AD</div>
//           </div>
//         </div>

//         <div className="body-wrap">
//           <div className="sidebar">
//             {navSections.map(s => (
//               <div className="nav-section" key={s.label}>
//                 <div className="nav-label">{s.label}</div>
//                 {s.items.map(it => (
//                   <button key={it.id} className={`nav-item${activePage === it.id ? " active" : ""}`} onClick={() => setActivePage(it.id)}>
//                     {it.icon} {it.label}
//                     {it.badge && <span className={`nav-badge${it.warn ? " warn" : ""}`}>{it.badge}</span>}
//                   </button>
//                 ))}
//               </div>
//             ))}
//             <div className="sidebar-bottom">
//               <button className="nav-item" style={{color:"#64748b"}}><IconLogout/> Logout</button>
//             </div>
//           </div>

//           <div className="main">
//             {renderPage()}
//           </div>
//         </div>
//       </div>

//       {renderModal()}
//       {toast && <div className="toast">{toast}</div>}
//     </>
//   );
// }

import { useState, useEffect, useRef, useCallback } from "react";

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
.badge-notif{position:relative;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#f8fafc;border:1px solid var(--border);transition:background .15s}
.badge-notif:hover{background:#f1f5f9}
.badge-notif .dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--red);border-radius:50%;border:2px solid #fff}
.avatar{width:32px;height:32px;background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#1a1a1a;cursor:pointer}
.topbar-time{font-size:12.5px;color:var(--muted);font-family:'DM Mono',monospace;background:#f8fafc;padding:4px 10px;border-radius:6px;border:1px solid var(--border)}
.breadcrumb{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px}
.breadcrumb span{color:var(--text);font-weight:500}
.body-wrap{display:flex;flex:1}
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
.main{flex:1;overflow-y:auto;background:#f1f5f9}
.page{padding:22px 26px;display:flex;flex-direction:column;gap:18px;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.page-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.page-title{font-size:20px;font-weight:700;letter-spacing:-.3px}
.page-subtitle{font-size:12.5px;color:var(--muted);margin-top:2px}
.fab-row{display:flex;gap:8px;flex-wrap:wrap}
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
.route-list{padding:6px 0}
.route-item{display:flex;align-items:center;gap:12px;padding:10px 18px;cursor:pointer;transition:background .15s;border-left:2px solid transparent}
.route-item:hover{background:#f8fafc}
.route-item.active-route{background:rgba(245,166,35,.06);border-left-color:var(--accent)}
.route-circle{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0}
.rc-a{background:rgba(37,99,235,.12);color:var(--blue2)} .rc-b{background:rgba(22,163,74,.12);color:var(--green)} .rc-c{background:rgba(245,166,35,.15);color:var(--accent2)} .rc-d{background:rgba(124,58,237,.12);color:var(--purple)}
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
.toast{position:fixed;bottom:28px;right:28px;background:var(--green);color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:slideUp .3s ease}
.search-bar{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;transition:border-color .15s}
.search-bar:focus-within{border-color:var(--accent)}
.search-bar input{background:transparent;border:none;outline:none;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;width:200px}
.search-bar input::placeholder{color:var(--muted)}
.filter-select{background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:8px 13px;color:var(--text);font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer}

/* NOTIFICATIONS PANEL */
.notif-overlay{position:fixed;inset:0;z-index:400}
.notif-panel{position:fixed;top:66px;right:16px;width:340px;background:#fff;border:1px solid var(--border);border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,.14);z-index:401;animation:slideUp .2s ease;overflow:hidden}
.notif-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--border);background:#f8fafc}
.notif-title{font-size:13.5px;font-weight:600;color:var(--text)}
.notif-mark{font-size:11px;color:var(--blue2);cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif;font-weight:600}
.notif-mark:hover{text-decoration:underline}
.notif-item{display:flex;align-items:flex-start;gap:10px;padding:12px 18px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s;position:relative}
.notif-item:last-child{border-bottom:none}
.notif-item:hover{background:#f8fafc}
.notif-item.unread{background:rgba(245,166,35,.04)}
.notif-item.unread::before{content:'';position:absolute;left:8px;top:50%;transform:translateY(-50%);width:5px;height:5px;background:var(--accent);border-radius:50%}
.notif-icon{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;margin-top:1px}
.notif-icon.warn{background:rgba(245,166,35,.12);color:var(--accent2)}
.notif-icon.err{background:rgba(220,38,38,.1);color:var(--red)}
.notif-icon.ok{background:rgba(22,163,74,.1);color:var(--green)}
.notif-icon.info{background:rgba(37,99,235,.1);color:var(--blue2)}
.notif-text{font-size:12px;line-height:1.5;flex:1;color:var(--text)}
.notif-text strong{font-weight:600}
.notif-time{font-size:10px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:3px}
.notif-empty{padding:28px 18px;text-align:center;font-size:12.5px;color:var(--muted)}

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
.profile-actions{padding:14px 22px;border-top:1px solid var(--border);background:#f8fafc;display:flex;justify-content:flex-end;gap:10px}
.activity-list{padding:0 22px 18px}
.activity-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)}
.activity-item:last-child{border-bottom:none}
.activity-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px}
.activity-text{font-size:12.5px;color:var(--text);line-height:1.5}
.activity-time{font-size:10.5px;color:var(--muted);font-family:'DM Mono',monospace;margin-top:2px}

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

::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:#94a3b8}
`;

/* ─── ICONS ───────────────────────────────────────────────────────────── */
const IconDash   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>;
const IconClock  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconBus    = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const IconUser   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconRoute  = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconPeople = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconBar    = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IconFile   = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IconSearch = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconBell   = () => <svg width="15" height="15" fill="none" stroke="var(--muted)" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IconProfile= () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconLogout = () => <svg className="ni" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const BusLogo    = () => <svg viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 9h16v4H4V9z"/></svg>;

/* ─── GREETING HELPER ─────────────────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getDateString() {
  return new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

/* ─── TRACKING DATA ───────────────────────────────────────────────────── */
const ROUTE_CFG = {
  A: { color: '#1a73e8', label: 'Route A — North Loop',  short: 'North Loop'    },
  B: { color: '#0f9d58', label: 'Route B — East Connect', short: 'East Connect'  },
  C: { color: '#f9ab00', label: 'Route C — South Express',short: 'South Express' },
  D: { color: '#9334e6', label: 'Route D — West Campus',  short: 'West Campus'   },
};

const MAP_STOPS = {
  A: [
    {x:62, y:300, name:'Main Gate'},      {x:116,y:264, name:'KHB Colony'},
    {x:172,y:228, name:'Market Circle'},  {x:232,y:198, name:'City Park'},
    {x:292,y:183, name:'North Bridge'},   {x:347,y:193, name:'Bus Stand'},
    {x:397,y:218, name:'Old Town'},       {x:432,y:254, name:'Shahapur'},
    {x:452,y:294, name:'Civil Lines'},    {x:436,y:334, name:'Station Rd'},
    {x:401,y:364, name:'Railway Stn'},    {x:351,y:379, name:'Depot North'},
  ],
  B: [
    {x:356,y:384, name:'Depot'},          {x:421,y:414, name:'East Market'},
    {x:476,y:439, name:'Gandhi Ngr'},     {x:521,y:419, name:'New Colony'},
    {x:556,y:389, name:'College Rd'},     {x:571,y:354, name:'Hospital'},
    {x:556,y:314, name:'Rail Station'},   {x:511,y:289, name:'Main Stop'},
  ],
  C: [
    {x:71, y:430, name:'School Gate'},    {x:131,y:459, name:'Tilakwadi'},
    {x:196,y:474, name:'Sadashiv Ngr'},   {x:261,y:459, name:'Vidyanagar'},
    {x:321,y:444, name:'Camp'},           {x:376,y:449, name:'Belgaum Fort'},
    {x:431,y:464, name:'Nehru Ngr'},      {x:481,y:477, name:'Shivaji Ngr'},
    {x:531,y:467, name:'Angol'},          {x:591,y:454, name:'Central Mkt'},
  ],
  D: [
    {x:81, y:164, name:'Campus A'},       {x:146,y:139, name:'Science Block'},
    {x:211,y:129, name:'Hostel'},         {x:276,y:137, name:'Library'},
    {x:336,y:154, name:'Admin Block'},    {x:386,y:169, name:'West Gate'},
  ],
};

const INITIAL_BUSES = [
  {id:'KA-01-B',route:'A',label:'A1',t:0.08, speed:0.00055,status:'on-time', delay:0,  driver:'R. Kumar',  passengers:38,capacity:50},
  {id:'KA-02-B',route:'A',label:'A2',t:0.43, speed:0.00048,status:'on-time', delay:0,  driver:'V. Patil',  passengers:45,capacity:50},
  {id:'KA-03-C',route:'A',label:'A3',t:0.71, speed:0.00025,status:'delayed', delay:12, driver:'A. Baig',   passengers:22,capacity:50},
  {id:'KA-04-D',route:'B',label:'B1',t:0.14, speed:0.00062,status:'on-time', delay:0,  driver:'M. Rao',    passengers:30,capacity:48},
  {id:'KA-05-E',route:'B',label:'B2',t:0.61, speed:0.00055,status:'on-time', delay:0,  driver:'D. Nair',   passengers:41,capacity:48},
  {id:'KA-06-F',route:'C',label:'C1',t:0.11, speed:0.00052,status:'on-time', delay:0,  driver:'P. Sharma', passengers:28,capacity:52},
  {id:'KA-07-G',route:'C',label:'C2',t:0.54, speed:0.00043,status:'delayed', delay:7,  driver:'K. Singh',  passengers:35,capacity:52},
  {id:'KA-08-H',route:'D',label:'D1',t:0.26, speed:0.00068,status:'on-time', delay:0,  driver:'S. Joshi',  passengers:15,capacity:45},
  {id:'KA-09-I',route:'D',label:'D2',t:0.79, speed:0,      status:'idle',    delay:0,  driver:'R. Desai',  passengers:0, capacity:45},
];

/* ─── CANVAS HELPERS ──────────────────────────────────────────────────── */
function ptOnPath(stops, t) {
  const n = stops.length - 1;
  const seg = Math.min(Math.floor(t * n), n - 1);
  const lt = (t * n) - seg;
  const a = stops[seg], b = stops[Math.min(seg + 1, n)];
  return { x: a.x + (b.x - a.x) * lt, y: a.y + (b.y - a.y) * lt, seg };
}

function drawMapFrame(ctx, W0, H0) {
  ctx.fillStyle = '#e8f0e8';
  ctx.fillRect(0, 0, W0, H0);
  const blocks = [
    {x:20,y:20,w:118,h:78,c:'#d4e8d4'},{x:156,y:20,w:88,h:58,c:'#cce0cc'},
    {x:262,y:20,w:78,h:53,c:'#d0e4d0'},{x:228,y:152,w:53,h:108,c:'#cce0cc'},
    {x:438,y:20,w:98,h:88,c:'#d4e8d4'},{x:558,y:20,w:88,h:78,c:'#cce0cc'},
    {x:478,y:118,w:68,h:58,c:'#d0e4d0'},{x:578,y:168,w:78,h:58,c:'#cce0cc'},
    {x:20,y:338,w:98,h:78,c:'#d4e8d4'},{x:138,y:358,w:78,h:68,c:'#cce0cc'},
    {x:248,y:378,w:88,h:73,c:'#d0e4d0'},{x:458,y:348,w:83,h:78,c:'#d4e8d4'},
    {x:568,y:338,w:78,h:88,c:'#cce0cc'},
  ];
  blocks.forEach(b => {
    ctx.fillStyle = b.c;
    ctx.beginPath();
    ctx.roundRect(b.x, b.y, b.w, b.h, 3);
    ctx.fill();
  });
  ctx.fillStyle = '#b8d4a0';
  ctx.beginPath(); ctx.roundRect(293, 58, 108, 118, 8); ctx.fill();
  ctx.fillStyle = '#5a9e5a'; ctx.font = 'bold 10px DM Sans, sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('City Park', 347, 122);
  ctx.fillStyle = '#b8d4d8';
  ctx.beginPath(); ctx.ellipse(590, 288, 52, 33, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#4a8a9a'; ctx.font = '9px DM Sans, sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('Lake', 590, 292);
  const majorRoads = [
    [0,293,W0,293],[0,188,W0,188],[0,413,W0,413],
    [118,0,118,H0],[288,0,288,420],[478,0,478,H0],[0,498,W0,498],
  ];
  majorRoads.forEach(([x1,y1,x2,y2]) => {
    ctx.beginPath(); ctx.strokeStyle = '#c4cfbf'; ctx.lineWidth = 9;
    ctx.lineCap = 'round'; ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = '#e8f0e8'; ctx.lineWidth = 1;
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  });
  const minorRoads = [
    [0,348,W0,348],[0,448,478,448],[53,0,53,H0],
    [198,0,198,H0],[378,0,378,498],[548,0,548,H0],
  ];
  minorRoads.forEach(([x1,y1,x2,y2]) => {
    ctx.beginPath(); ctx.strokeStyle = '#d0d8cc'; ctx.lineWidth = 4;
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  });
  const streetNames = [
    {x:340,y:287,t:'MG Road'},{x:340,y:182,t:'Station Road'},
    {x:340,y:407,t:'College Road'},{x:112,y:198,t:'KHB Rd'},
    {x:472,y:198,t:'Camp Rd'},{x:282,y:198,t:'Market Rd'},
    {x:193,y:342,t:'Civil Lines Rd'},{x:490,y:342,t:'East Rd'},
  ];
  ctx.font = '8px DM Sans, sans-serif'; ctx.fillStyle = '#7a8f7a';
  streetNames.forEach(s => { ctx.textAlign = 'center'; ctx.fillText(s.t, s.x, s.y); });
}

function drawRoutes(ctx, activeRoute) {
  Object.entries(MAP_STOPS).forEach(([rk, stops]) => {
    const rc = ROUTE_CFG[rk];
    const visible = activeRoute === 'ALL' || activeRoute === rk;
    ctx.globalAlpha = visible ? 1 : 0.1;
    ctx.beginPath();
    ctx.strokeStyle = rc.color;
    ctx.lineWidth = activeRoute === rk ? 5 : 3;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.setLineDash([]);
    ctx.moveTo(stops[0].x, stops[0].y);
    stops.forEach(s => ctx.lineTo(s.x, s.y));
    ctx.stroke();
    if (visible) {
      stops.forEach((s, i) => {
        const isTerm = i === 0 || i === stops.length - 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, isTerm ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.strokeStyle = rc.color;
        ctx.lineWidth = isTerm ? 2.5 : 2;
        ctx.setLineDash([]); ctx.stroke();
      });
      if (activeRoute === rk) {
        stops.forEach(s => {
          ctx.font = 'bold 9px DM Sans, sans-serif';
          ctx.textAlign = 'center';
          const tw = ctx.measureText(s.name).width;
          ctx.fillStyle = 'rgba(255,255,255,.9)';
          ctx.beginPath();
          ctx.roundRect(s.x - tw / 2 - 4, s.y - 21, tw + 8, 13, 2);
          ctx.fill();
          ctx.fillStyle = '#202124';
          ctx.fillText(s.name, s.x, s.y - 11);
        });
      } else if (activeRoute === 'ALL') {
        const terminals = [stops[0], stops[stops.length - 1]];
        terminals.forEach(s => {
          ctx.font = 'bold 8px DM Sans, sans-serif';
          ctx.textAlign = 'center';
          const tw = ctx.measureText(s.name).width;
          ctx.fillStyle = 'rgba(255,255,255,.88)';
          ctx.beginPath();
          ctx.roundRect(s.x - tw / 2 - 3, s.y - 19, tw + 6, 12, 2);
          ctx.fill();
          ctx.fillStyle = '#333';
          ctx.fillText(s.name, s.x, s.y - 10);
        });
      }
    }
    ctx.globalAlpha = 1;
  });
}

function drawBuses(ctx, busesRef, activeRoute, selectedBusId) {
  busesRef.forEach(bus => {
    if (activeRoute !== 'ALL' && bus.route !== activeRoute) return;
    const rc = ROUTE_CFG[bus.route];
    const stops = MAP_STOPS[bus.route];
    const { x, y } = ptOnPath(stops, bus.t);
    const isSel = selectedBusId === bus.id;
    const isIdle = bus.status === 'idle';
    const isDelayed = bus.status === 'delayed';
    const busColor = isIdle ? '#9aa0a6' : isDelayed ? '#f9ab00' : rc.color;
    if (isSel) {
      ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = busColor + '26'; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = busColor + '44'; ctx.fill();
    }
    ctx.beginPath(); ctx.arc(x, y, isSel ? 13 : 10, 0, Math.PI * 2);
    ctx.fillStyle = busColor; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = isSel ? 3 : 2;
    ctx.setLineDash([]); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `bold ${isSel ? 9 : 8}px DM Sans, sans-serif`;
    ctx.fillText(bus.label, x, y);
    ctx.textBaseline = 'alphabetic';
    if (isDelayed) {
      ctx.beginPath(); ctx.arc(x + 9, y - 9, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ea4335'; ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 8px DM Sans, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('!', x + 9, y - 9);
      ctx.textBaseline = 'alphabetic';
    }
    if (isSel || activeRoute === bus.route) {
      ctx.font = '500 9px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      const tw = ctx.measureText(bus.id).width;
      ctx.fillStyle = 'rgba(255,255,255,.94)';
      ctx.strokeStyle = busColor + '70'; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.roundRect(x - tw / 2 - 5, y + 15, tw + 10, 13, 3);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#202124'; ctx.fillText(bus.id, x, y + 24);
    }
    ctx.textAlign = 'left';
  });
}

/* ─── NOTIFICATIONS DATA ──────────────────────────────────────────────── */
const INITIAL_NOTIFS = [
  {id:1, type:'err',  icon:'!', title:'Bus E2 engine warning', desc:'Driver A. Baig has been notified. Bus halted at Shahapur.', time:'09:08 AM', read:false},
  {id:2, type:'warn', icon:'⚠', title:'Bus B3 delayed — 12 min', desc:'Route B, stop 4. Heavy traffic near Rail Station.', time:'09:14 AM', read:false},
  {id:3, type:'warn', icon:'⚠', title:'Route C traffic alert', desc:'Heavy congestion near Main St. Expect 5–8 min delay.', time:'08:55 AM', read:false},
  {id:4, type:'ok',   icon:'✓', title:'Bus A1 back on schedule', desc:'Resumed normal route after earlier delay.', time:'08:42 AM', read:true},
  {id:5, type:'info', icon:'i', title:'Driver R. Kumar checked in', desc:'Checked in for morning shift. Bus KA-01-B assigned.', time:'08:00 AM', read:true},
  {id:6, type:'ok',   icon:'✓', title:'Route A — all stops completed', desc:'Morning loop finished 2 min ahead of schedule.', time:'07:38 AM', read:true},
];

/* ─── NOTIFICATION PANEL ──────────────────────────────────────────────── */
function NotificationPanel({ notifs, setNotifs, onClose }) {
  const markAll = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  return (
    <>
      <div className="notif-overlay" onClick={onClose} />
      <div className="notif-panel">
        <div className="notif-header">
          <span className="notif-title">Notifications</span>
          <button className="notif-mark" onClick={markAll}>Mark all read</button>
        </div>
        {notifs.length === 0 ? (
          <div className="notif-empty">No notifications</div>
        ) : notifs.map(n => (
          <div key={n.id} className={`notif-item${n.read ? '' : ' unread'}`}
            onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}>
            <div className={`notif-icon ${n.type}`}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="notif-text"><strong>{n.title}</strong><br /><span style={{ color: 'var(--muted)' }}>{n.desc}</span></div>
              <div className="notif-time">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── MODAL HELPERS ───────────────────────────────────────────────────── */
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
      <div className="form-row"><label className="form-label">Bus Number</label><input className="form-input" placeholder="KA-XX-X" /></div>
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
      <div className="form-row"><label className="form-label">Assign Route <span style={{color:'var(--muted)',fontWeight:400,fontSize:9,textTransform:'none',letterSpacing:0}}>(optional)</span></label>
        <select className="form-input"><option value="">— Select route (optional) —</option><option>Route A — North Loop</option><option>Route B — East Connect</option><option>Route C — South Express</option><option>Route D — West Campus</option></select>
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
      <div className="form-row"><label className="form-label">Route Name</label><input className="form-input" placeholder="North Loop" /></div>
      <div className="form-section-title">Stops</div>
      <AddStopList />
      <div className="form-row" style={{ marginTop: 14 }}><label className="form-label">Assign Buses</label>
        <select className="form-input" multiple style={{ height: 90 }}>
          <option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option><option>KA-04-D</option><option>KA-05-E</option>
        </select>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Hold Ctrl/Cmd to select multiple buses</div>
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

/* ─── PAGES ───────────────────────────────────────────────────────────── */
function PageDashboard({ showModal }) {
  const [activePill, setActivePill] = useState("All");
  const [activeRoute, setActiveRoute] = useState(0);
  const pills = ["All", "Route A", "Route B", "Route C"];
  const routes = [
    { cls: "rc-a", name: "Route A — North Loop", meta: "12 stops · 6 buses · 34 min", pct: 92, color: "var(--green)" },
    { cls: "rc-b", name: "Route B — East Connect", meta: "8 stops · 4 buses · 28 min", pct: 67, color: "var(--accent)" },
    { cls: "rc-c", name: "Route C — South Express", meta: "10 stops · 5 buses · 40 min", pct: 88, color: "var(--green)" },
    { cls: "rc-d", name: "Route D — West Campus", meta: "6 stops · 3 buses · 22 min", pct: 50, color: "var(--muted)" },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-subtitle">{getGreeting()} — {getDateString()}</div>
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
              {pills.map(p => <button key={p} className={`pill ${activePill === p ? "active" : "passive"}`} onClick={() => setActivePill(p)}>{p}</button>)}
            </div>
          </div>
          <div className="map-body">
            <div className="map-grid-bg" />
            <div className="map-road" style={{ left: 0, top: 118, width: "100%", height: 3, opacity: .5 }} />
            <div className="map-road" style={{ left: 0, top: 62, width: "100%", height: 2, opacity: .25 }} />
            <div className="map-road" style={{ left: 0, top: 185, width: "100%", height: 2, opacity: .25 }} />
            <div className="map-road" style={{ left: 120, top: 0, width: 3, height: "100%", opacity: .4 }} />
            <div className="map-road" style={{ left: 280, top: 0, width: 2, height: "100%", opacity: .25 }} />
            <div className="map-road" style={{ left: 450, top: 0, width: 2, height: "100%", opacity: .25 }} />
            <div className="route-line-h" style={{ left: 80, top: 109, width: 240, background: "rgba(59,139,212,.35)" }} />
            <div className="route-line-h" style={{ left: 60, top: 176, width: 300, background: "rgba(61,200,122,.3)" }} />
            <div className="route-line-h" style={{ left: 300, top: 63, width: 200, background: "rgba(245,166,35,.25)" }} />
            {[[76,114],[160,114],[240,114],[315,114],[56,171],[160,171],[320,171],[310,58],[420,58]].map(([l,t],i) => <div key={i} className="stop-dot" style={{ left: l, top: t }} />)}
            {[["on-time",130,108,"Bus A1","A1"],["on-time",200,108,"Bus A2","A2"],["delayed",268,108,"Bus B3 — Delayed","B3"],["on-time",100,165,"Bus C1","C1"],["on-time",240,165,"Bus C2","C2"],["on-time",390,108,"Bus D1","D1"],["delayed",370,53,"Bus E2 — Delayed","E2"],["idle",430,178,"Bus F1 — Idle","F1"]].map(([cls,l,t,title,lbl]) => (
              <div key={lbl} className={`bus-dot ${cls}`} style={{ left: l, top: t }} title={title}>{lbl}</div>
            ))}
          </div>
          <div className="map-legend">
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--green)" }} /> On time (18)</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--accent)" }} /> Delayed (3)</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "#3a4a60" }} /> Idle (2)</div>
          </div>
        </div>
        <div className="alerts-card">
          <div className="card-header">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span className="card-title">Delay Alerts</span>
            <div className="ch-right"><button className="pill passive" style={{ fontSize: 10 }}>Mark all read</button></div>
          </div>
          {[
            { t: "warn", icon: "⚠", txt: <><strong>Bus B3</strong> <span>is 12 min delayed on Route B — stop 4</span></>, time: "09:14 AM" },
            { t: "err",  icon: "!", txt: <><strong>Bus E2</strong> <span>engine warning — driver notified</span></>, time: "09:08 AM" },
            { t: "warn", icon: "⚠", txt: <><strong>Route C</strong> <span>heavy traffic near Main St</span></>, time: "08:55 AM" },
            { t: "ok",   icon: "✓", txt: <><strong>Bus A1</strong> <span>resumed schedule after delay</span></>, time: "08:42 AM" },
            { t: "ok",   icon: "✓", txt: <><strong>Driver R. Kumar</strong> <span>checked in for morning shift</span></>, time: "08:00 AM" },
          ].map((a, i) => (
            <div className="alert-item" key={i}>
              <div className={`alert-icon ${a.t}`}>{a.icon}</div>
              <div style={{ flex: 1 }}><div className="alert-text">{a.txt}</div><div className="alert-time">{a.time}</div></div>
            </div>
          ))}
        </div>
      </div>
      {/* Routes only (no buses table) */}
      <div className="route-card" style={{ width: "100%" }}>
        <div className="card-header">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
          <span className="card-title">Routes</span>
          <div className="ch-right"><button className="fab-btn fab-secondary" style={{ padding: "5px 12px", fontSize: 11 }} onClick={() => showModal("route")}>＋ New Route</button></div>
        </div>
        <div className="route-list">
          {routes.map((r, i) => (
            <div key={i} className={`route-item${activeRoute === i ? " active-route" : ""}`} onClick={() => setActiveRoute(i)}>
              <div className={`route-circle ${r.cls}`}>{["A","B","C","D"][i]}</div>
              <div className="route-info"><div className="route-name">{r.name}</div><div className="route-meta">{r.meta}</div></div>
              <div className="route-bar-wrap">
                <div style={{ fontSize: 10, color: r.color, marginBottom: 3, textAlign: "right" }}>{r.pct}%</div>
                <div className="route-bar-bg"><div className="route-bar-fill" style={{ width: `${r.pct}%`, background: r.color }} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="history-strip">
          <div className="history-label">Bus History — KA-01-B today</div>
          <div className="history-bars">
            {[["var(--green)",.8,"60%"],["var(--green)",.9,"75%"],["var(--accent)",1,"90%"],["var(--green)",.85,"70%"],["var(--green)",.9,"80%"],["var(--green)",1,"65%"],["rgba(100,116,139,.15)",1,"40%"],["rgba(100,116,139,.15)",1,"40%"]].map(([bg,op,h],i) => (
              <div key={i} className="history-bar" style={{ background: bg, opacity: op, height: h }} />
            ))}
          </div>
          <div className="history-times"><span>07:00</span><span>08:00</span><span>09:00</span><span>10:00</span></div>
        </div>
      </div>
    </div>
  );
}

/* ─── LIVE TRACKING PAGE ──────────────────────────────────────────────── */
function PageTracking({ showToast }) {
  const canvasRef = useRef(null);
  const busesRef = useRef(INITIAL_BUSES.map(b => ({ ...b })));
  const rafRef = useRef(null);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({ active: false, sx: 0, sy: 0 });
  const zoomRef = useRef(1);
  const W0 = 680, H0 = 560;

  const [activeRoute, setActiveRoute] = useState('ALL');
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeRouteRef = useRef('ALL');
  const selectedBusRef = useRef(null);

  const redraw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const cw = cv.width / dpr, ch = cv.height / dpr;
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    const cx = cw / 2, cy = ch / 2;
    const z = zoomRef.current;
    const pan = panRef.current;
    ctx.save();
    ctx.translate(cx + pan.x, cy + pan.y);
    ctx.scale(z, z);
    ctx.translate(-W0 / 2, -H0 / 2);
    drawMapFrame(ctx, W0, H0);
    drawRoutes(ctx, activeRouteRef.current);
    drawBuses(ctx, busesRef.current, activeRouteRef.current, selectedBusRef.current);
    ctx.restore();
    ctx.restore();
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = cv.parentElement.getBoundingClientRect();
      cv.width = rect.width * dpr;
      cv.height = rect.height * dpr;
      cv.style.width = rect.width + 'px';
      cv.style.height = rect.height + 'px';
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const tick = () => {
      busesRef.current.forEach(b => {
        if (b.status === 'idle') return;
        b.t += b.speed;
        if (b.t >= 1) b.t = 0;
      });
      redraw();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [redraw]);

  const doZoom = (f) => { zoomRef.current = Math.min(3, Math.max(0.4, zoomRef.current * f)); };

  const handleCanvasClick = (e) => {
    if (dragRef.current.moved) return;
    const cv = canvasRef.current;
    const rect = cv.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cw = cv.width / dpr, ch = cv.height / dpr;
    const z = zoomRef.current;
    const pan = panRef.current;
    const wx = (mx - cw / 2 - pan.x) / z + W0 / 2;
    const wy = (my - ch / 2 - pan.y) / z + H0 / 2;
    let hit = null, minD = 16;
    busesRef.current.forEach(bus => {
      if (activeRouteRef.current !== 'ALL' && bus.route !== activeRouteRef.current) return;
      const stops = MAP_STOPS[bus.route];
      const { x, y } = ptOnPath(stops, bus.t);
      const d = Math.hypot(wx - x, wy - y);
      if (d < minD) { minD = d; hit = bus; }
    });
    if (hit) { selectedBusRef.current = hit.id; setSelectedBus(hit.id); }
    else { selectedBusRef.current = null; setSelectedBus(null); }
  };

  const handleMouseDown = (e) => { dragRef.current = { active: true, moved: false, sx: e.clientX - panRef.current.x, sy: e.clientY - panRef.current.y }; };
  const handleMouseMove = (e) => { if (!dragRef.current.active) return; dragRef.current.moved = true; panRef.current = { x: e.clientX - dragRef.current.sx, y: e.clientY - dragRef.current.sy }; };
  const handleMouseUp = () => { dragRef.current.active = false; };
  const handleWheel = (e) => { e.preventDefault(); doZoom(e.deltaY < 0 ? 1.12 : 0.9); };

  const selectRoute = (r) => { activeRouteRef.current = r; setActiveRoute(r); selectedBusRef.current = null; setSelectedBus(null); };
  const selectBus = (busId) => { selectedBusRef.current = busId; setSelectedBus(busId); };
  const closePanel = () => { selectedBusRef.current = null; setSelectedBus(null); };

  const selBusData = busesRef.current.find(b => b.id === selectedBus) || null;

  const getNextStop = (bus) => {
    const stops = MAP_STOPS[bus.route];
    const n = stops.length - 1;
    const seg = Math.min(Math.floor(bus.t * n) + 1, n);
    return stops[seg].name;
  };

  const getCurrentArea = (bus) => {
    const stops = MAP_STOPS[bus.route];
    const n = stops.length - 1;
    return stops[Math.min(Math.floor(bus.t * n), n)].name;
  };

  const getETA = (bus) => {
    if (bus.status === 'idle') return '—';
    const stops = MAP_STOPS[bus.route];
    const n = stops.length - 1;
    const seg = Math.floor(bus.t * n);
    const rem = (seg + 1) / n - bus.t;
    return Math.max(1, Math.round(rem * n / (bus.speed * 3600 * 0.016))) + ' min';
  };

  const routeChips = [
    { r: 'ALL', label: 'All routes', color: '#1a73e8', dot: '#1a73e8' },
    { r: 'A', label: 'Route A', color: '#1a73e8', dot: '#1a73e8' },
    { r: 'B', label: 'Route B', color: '#0f9d58', dot: '#0f9d58' },
    { r: 'C', label: 'Route C', color: '#f9ab00', dot: '#f9ab00' },
    { r: 'D', label: 'Route D', color: '#9334e6', dot: '#9334e6' },
  ];

  const statusCls = s => s === 'on-time' ? 'bcs-green' : s === 'delayed' ? 'bcs-amber' : s === 'idle' ? 'bcs-gray' : 'bcs-red';
  const statusText = s => s === 'on-time' ? 'On time' : s === 'delayed' ? 'Delayed' : 'Idle';

  const visibleBuses = busesRef.current.filter(b => {
    if (activeRoute !== 'ALL' && b.route !== activeRoute) return false;
    const q = searchQuery.toLowerCase();
    if (q && !b.id.toLowerCase().includes(q) && !b.driver.toLowerCase().includes(q) && !b.route.toLowerCase().includes(q)) return false;
    return true;
  });

  const progKeyStops = (bus) => {
    const stops = MAP_STOPS[bus.route];
    const n = stops.length;
    const indices = [0, Math.floor(n / 3), Math.floor(2 * n / 3), n - 1];
    const curSeg = Math.min(Math.floor(bus.t * (n - 1)), n - 2);
    return indices.map(i => ({ name: stops[i].name, done: i <= curSeg, cur: i === curSeg || i === curSeg + 1 }));
  };

  return (
    <div className="tracking-page">
      <div className="gm-canvas-wrap" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} onClick={handleCanvasClick}>
        <canvas className="gm-canvas" ref={canvasRef} />
      </div>
      <div className="tracking-topbar">
        <div className="gm-searchbox">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search bus, driver or route…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <div className="route-chips">
          {routeChips.map(chip => (
            <button key={chip.r} className={`rchip${activeRoute === chip.r ? ' active' : ''}`}
              style={activeRoute === chip.r ? { background: chip.color, color: '#fff' } : {}}
              onClick={() => selectRoute(chip.r)}>
              <span className="rdot" style={{ background: activeRoute === chip.r ? '#fff' : chip.dot }} />
              {chip.label}
            </button>
          ))}
        </div>
      </div>
      <div className="live-badge-float"><div className="live-anim-dot" /> Live updates</div>
      <div className={`bus-info-panel${selBusData ? '' : ' hidden'}`}>
        {selBusData && (() => {
          const rc = ROUTE_CFG[selBusData.route];
          const pct = Math.round(selBusData.passengers / selBusData.capacity * 100);
          const progPct = Math.round(selBusData.t * 100);
          const nodes = progKeyStops(selBusData);
          return (
            <>
              <div className="bip-header">
                <div className="bip-avatar" style={{ background: selBusData.status === 'idle' ? '#9aa0a6' : rc.color }}>{selBusData.label}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="bip-busid">{selBusData.id}</div>
                    <span className={`bcard-spill ${statusCls(selBusData.status)}`}>{selBusData.status === 'delayed' ? `+${selBusData.delay}m` : statusText(selBusData.status)}</span>
                  </div>
                  <div className="bip-routename">{rc.label}</div>
                </div>
                <button className="bip-close" onClick={closePanel}>×</button>
              </div>
              <div className="bip-body">
                <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg><span className="bip-key">Near</span><span className="bip-val">{getCurrentArea(selBusData)}</span></div>
                <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg><span className="bip-key">Next stop</span><span className="bip-val" style={{ color: rc.color }}>{getNextStop(selBusData)}</span></div>
                <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span className="bip-key">ETA next stop</span><span className="bip-val">{getETA(selBusData)}</span></div>
                <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span className="bip-key">Driver</span><span className="bip-val">{selBusData.driver}</span></div>
                <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg><span className="bip-key">Passengers</span><span className="bip-val">{selBusData.passengers}/{selBusData.capacity} <span style={{ color: '#9aa0a6', fontWeight: 400 }}>({pct}%)</span></span></div>
                <div className="bip-row"><svg className="bip-icon" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg><span className="bip-key">Speed</span><span className="bip-val">{selBusData.status === 'idle' ? '0 km/h' : `${Math.round(28 + (selBusData.t * 100) % 15)} km/h`}</span></div>
              </div>
              <div className="bip-progress">
                <div className="bip-prog-lbl">Route progress — {progPct}%</div>
                <div className="bip-prog-track"><div className="bip-prog-fill" style={{ width: `${progPct}%`, background: rc.color }} /></div>
                <div className="bip-stops-row">
                  {nodes.map((n, i) => (
                    <div className="bip-stop-node" key={i}>
                      <div className={`bip-stop-dot${n.done ? ' done' : ''}${n.cur ? ' current' : ''}`} />
                      <div className={`bip-stop-label${n.done ? ' done-lbl' : ''}`} style={n.done ? { color: rc.color } : {}}>{n.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })()}
      </div>
      <div className="gm-zoom-ctrl">
        <button className="gm-zoom-btn" onClick={() => doZoom(1.25)}>+</button>
        <button className="gm-zoom-btn" onClick={() => doZoom(0.8)}>−</button>
      </div>
      <div className="gm-compass">N</div>
      <div className="gm-attribution">Map data © BusNav 2026</div>
      <div className="bus-cards-bar">
        <div className="bcs-scroll">
          {visibleBuses.map(bus => {
            const rc = ROUTE_CFG[bus.route];
            return (
              <div key={bus.id} className={`bcard${selectedBus === bus.id ? ' sel' : ''}`} onClick={() => selectBus(bus.id)}>
                <div className="bcard-top">
                  <div className="bcard-av" style={{ background: bus.status === 'idle' ? '#9aa0a6' : rc.color }}>{bus.label}</div>
                  <div style={{ flex: 1 }}><div className="bcard-num">{bus.id}</div><div className="bcard-route">{rc.short}</div></div>
                  <span className={`bcard-spill ${statusCls(bus.status)}`}>{bus.status === 'delayed' ? `+${bus.delay}m` : statusText(bus.status)}</span>
                </div>
                <div className="bcard-info">
                  <span style={{ color: '#5f6368' }}>Near: </span><b>{getCurrentArea(bus)}</b><br />
                  <span style={{ color: '#5f6368' }}>Next: </span><span className="hl" style={{ color: rc.color }}>{getNextStop(bus)}</span>
                  <span style={{ color: '#9aa0a6' }}> · {getETA(bus)}</span>
                </div>
              </div>
            );
          })}
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
          <div className="search-bar"><IconSearch /><input placeholder="Search buses..." /></div>
          <select className="filter-select"><option>All Routes</option><option>Route A</option><option>Route B</option><option>Route C</option><option>Route D</option></select>
          <button className="fab-btn fab-primary" onClick={() => showModal("bus")}>＋ Add Bus</button>
        </div>
      </div>
      <div className="table-card">
        <table className="data-table">
          <thead><tr><th>Bus No.</th><th>Driver</th><th>Assigned Route</th><th>Capacity</th><th>Status</th><th>Last Active</th><th></th></tr></thead>
          <tbody>
            {[
              ["KA-01-B","#3b8bd4","RK","R. Kumar","sp-blue","Route A",50,"sp-green","On Time","09:12"],
              ["KA-02-B","#8b5cf6","PS","P. Sharma","sp-green","Route B",48,"sp-amber","Delayed","09:08"],
              ["KA-03-C","#3dc87a","MR","M. Rao","sp-amber","Route C",52,"sp-green","On Time","09:14"],
              ["KA-04-D","#e05252","SJ","S. Joshi","sp-purple","Route D",45,"sp-gray","Idle","07:30"],
              ["KA-05-E","#f5a623","AB","A. Baig","sp-blue","Route A",50,"sp-red","⚠ Warning","08:55"],
              ["KA-06-F","#0ea5e9","VP","V. Patil","sp-green","Route B",48,"sp-green","On Time","09:10"],
              ["KA-07-G","#14b8a6","DN","D. Nair","sp-amber","Route C",55,"sp-green","On Time","09:13"],
            ].map(([bus,bg,init,drv,rsc,route,cap,sc,st,time]) => (
              <tr key={bus}><td><strong>{bus}</strong></td><td><span className="ava-sm" style={{ background: bg }}>{init}</span>{drv}</td><td><span className={`status-pill ${rsc}`}>{route}</span></td><td>{cap}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td style={{ color: "var(--muted)", fontSize: 11, fontFamily: "'DM Mono',monospace" }}>{time}</td><td><button className="act-btn" onClick={() => showModal("bus")}>Edit</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageDrivers({ showModal }) {
  const drivers = [
    { bg:"#3b8bd4",init:"RK",name:"R. Kumar",id:"DL-5201-2019 · 8 yrs",sc:"sp-green",st:"Active",bus:"KA-01-B",route:"Route A — North Loop",phone:"+91 98765 43210",trips:"6 / 6",tc:"var(--green)" },
    { bg:"#8b5cf6",init:"PS",name:"P. Sharma",id:"DL-3892-2017 · 10 yrs",sc:"sp-amber",st:"Delayed",bus:"KA-02-B",route:"Route B — East Connect",phone:"+91 91234 56789",trips:"4 / 6",tc:"var(--accent)" },
    { bg:"#3dc87a",init:"MR",name:"M. Rao",id:"DL-1123-2020 · 6 yrs",sc:"sp-green",st:"Active",bus:"KA-03-C",route:"Route C — South Express",phone:"+91 90000 11223",trips:"5 / 6",tc:"var(--green)" },
    { bg:"#e05252",init:"SJ",name:"S. Joshi",id:"DL-7741-2018 · 9 yrs",sc:"sp-gray",st:"Idle",bus:"KA-04-D",route:"Route D — West Campus",phone:"+91 99887 76655",trips:"2 / 6",tc:"var(--muted)" },
    { bg:"#f5a623",init:"AB",name:"A. Baig",id:"DL-4456-2021 · 5 yrs",sc:"sp-red",st:"Warning",bus:"KA-05-E",route:"Route A — North Loop",phone:"+91 88001 23456",trips:"3 / 6",tc:"var(--red)" },
    { bg:"#0ea5e9",init:"VP",name:"V. Patil",id:"DL-9920-2016 · 12 yrs",sc:"sp-green",st:"Active",bus:"KA-06-F",route:"Route B — East Connect",phone:"+91 97654 32109",trips:"6 / 6",tc:"var(--green)" },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Drivers</div><div className="page-subtitle">21 drivers on duty today</div></div>
        <div className="fab-row">
          <div className="search-bar"><IconSearch /><input placeholder="Search drivers..." /></div>
          <button className="fab-btn fab-primary" onClick={() => showModal("driver")}>＋ Add Driver</button>
        </div>
      </div>
      <div className="driver-cards">
        {drivers.map(d => (
          <div className="driver-card" key={d.name}>
            <div className="dc-header">
              <div className="dc-avatar" style={{ background: d.bg }}>{d.init}</div>
              <div><div className="dc-name">{d.name}</div><div className="dc-id">{d.id}</div></div>
              <span className={`status-pill ${d.sc}`} style={{ marginLeft: "auto" }}>{d.st}</span>
            </div>
            {[["Assigned Bus", d.bus], ["Route", d.route], ["Phone", d.phone]].map(([k, v]) => (
              <div className="dc-row" key={k}><span className="dc-key">{k}</span><span className="dc-val">{v}</span></div>
            ))}
            <div className="dc-row" style={{ border: "none" }}><span className="dc-key">Trips Today</span><span className="dc-val" style={{ color: d.tc }}>{d.trips}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageRoutes({ showModal }) {
  const routes = [
    { cls:"rc-a",letter:"A",name:"Route A — North Loop",sc:"sp-green",ont:"92% on-time",stops:12,buses:6,avg:"34 min",stopNames:["Main Gate","Market Circle","City Park","North Bridge"],more:"+8 more",col:"var(--blue2)",bg:"rgba(37,99,235,.12)",bd:"rgba(37,99,235,.2)" },
    { cls:"rc-b",letter:"B",name:"Route B — East Connect",sc:"sp-amber",ont:"67% on-time",stops:8,buses:4,avg:"28 min",stopNames:["Depot","East Market","Rail Station"],more:"+5 more",col:"var(--green)",bg:"rgba(22,163,74,.1)",bd:"rgba(22,163,74,.2)" },
    { cls:"rc-c",letter:"C",name:"Route C — South Express",sc:"sp-green",ont:"88% on-time",stops:10,buses:5,avg:"40 min",stopNames:["School Gate","Tilakwadi","Sadashiv Nagar"],more:"+7 more",col:"var(--accent)",bg:"rgba(245,166,35,.1)",bd:"rgba(245,166,35,.2)" },
    { cls:"rc-d",letter:"D",name:"Route D — West Campus",sc:"sp-gray",ont:"50% on-time",stops:6,buses:3,avg:"22 min",stopNames:["Campus A","Science Block","Hostel"],more:"+3 more",col:"#b07ef7",bg:"rgba(165,110,245,.1)",bd:"rgba(165,110,245,.2)" },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Routes</div><div className="page-subtitle">4 active routes — 36 stops total</div></div>
        <button className="fab-btn fab-primary" onClick={() => showModal("route")}>＋ Create Route</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {routes.map(r => (
          <div className="table-card" key={r.letter}>
            <div className="card-header">
              <div className={`route-circle ${r.cls}`} style={{ width: 26, height: 26, fontSize: 10 }}>{r.letter}</div>
              <span className="card-title">{r.name}</span>
              <div className="ch-right"><span className={`status-pill ${r.sc}`}>{r.ont}</span></div>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div><div className="stat-label">Stops</div><div style={{ fontSize: 18, fontWeight: 700 }}>{r.stops}</div></div>
                <div><div className="stat-label">Buses</div><div style={{ fontSize: 18, fontWeight: 700, color: "var(--blue2)" }}>{r.buses}</div></div>
                <div><div className="stat-label">Avg Time</div><div style={{ fontSize: 18, fontWeight: 700, color: r.col }}>{r.avg}</div></div>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: .5 }}>Stop Sequence</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {r.stopNames.map(s => (
                  <span key={s} style={{ fontSize: 11.5, padding: "3px 9px", background: r.bg, border: `1px solid ${r.bd}`, borderRadius: 6, color: r.col }}>{s}</span>
                ))}
                {r.more && <span style={{ fontSize: 11, color: "var(--muted)" }}>→ {r.more}</span>}
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
          <div className="search-bar"><IconSearch /><input placeholder="Search students..." /></div>
          <select className="filter-select"><option>All Routes</option><option>Route A</option><option>Route B</option><option>Route C</option><option>Route D</option></select>
          <button className="fab-btn fab-primary" onClick={() => showModal("student")}>＋ Add Student</button>
        </div>
      </div>
      <div className="table-card">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Roll No.</th><th>Class</th><th>Route</th><th>Pickup Stop</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {students.map(([bg,init,name,roll,cls,rsc,route,stop,sc,st]) => (
              <tr key={roll}><td><span className="ava-sm" style={{ background: bg }}>{init}</span><strong>{name}</strong></td><td style={{ fontFamily: "'DM Mono',monospace", fontSize: 11 }}>{roll}</td><td>{cls}</td><td><span className={`status-pill ${rsc}`}>{route}</span></td><td>{stop}</td><td><span className={`status-pill ${sc}`}>{st}</span></td><td><button className="act-btn">Edit</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageAnalytics() {
  const weekBars = [{ h:"85%",c:"var(--green)",l:"Mon" },{ h:"92%",c:"var(--green)",l:"Tue" },{ h:"78%",c:"var(--accent)",l:"Wed" },{ h:"95%",c:"var(--green)",l:"Thu" },{ h:"88%",c:"var(--green)",l:"Fri" },{ h:"60%",c:"var(--muted)",l:"Sat" },{ h:"94%",c:"var(--green)",l:"Sun" }];
  const hourBars = [{ h:"30%",o:.4 },{ h:"95%",o:.8 },{ h:"100%",o:1 },{ h:"70%",o:.6 },{ h:"20%",o:.3 },{ h:"10%",o:.2 },{ h:"15%",o:.25 },{ h:"60%",o:.55 },{ h:"90%",o:.75 },{ h:"80%",o:.65 },{ h:"40%",o:.4 },{ h:"15%",o:.25 }];
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
        <div className="kpi-card"><div className="kpi-icon" style={{ background:"rgba(22,163,74,.12)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div><div><div className="kpi-val" style={{ color:"var(--green)" }}>94.2%</div><div className="kpi-lbl">On-Time Rate</div></div></div>
        <div className="kpi-card"><div className="kpi-icon" style={{ background:"rgba(37,99,235,.12)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue2)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div><div className="kpi-val" style={{ color:"var(--blue2)" }}>6.2 min</div><div className="kpi-lbl">Avg Delay</div></div></div>
        <div className="kpi-card"><div className="kpi-icon" style={{ background:"rgba(124,58,237,.12)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><div><div className="kpi-val" style={{ color:"var(--purple)" }}>1,248</div><div className="kpi-lbl">Students Transported</div></div></div>
      </div>
      <div className="analytics-grid">
        <div className="chart-card" style={{ gridColumn:"span 2" }}>
          <div className="chart-title">Daily On-Time Performance — This Week</div>
          <div className="bar-chart" style={{ height:120 }}>
            {weekBars.map(b => <div key={b.l} className="bar-col"><div className="bar-fill" style={{ height:b.h, background:`linear-gradient(to top,${b.c},${b.c}66)` }}/><div className="bar-label">{b.l}</div></div>)}
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
              {[["var(--blue2)","Route A (37%)"],["var(--green)","Route B (28%)"],["var(--accent)","Route C (22%)"],["var(--purple)","Route D (13%)"]].map(([c,l]) => (
                <div className="donut-leg-item" key={l}><div className="donut-leg-dot" style={{ background:c }}/>{l}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="chart-card" style={{ gridColumn:"span 3" }}>
          <div className="chart-title">Hourly Dispatch Volume — Today</div>
          <div className="bar-chart" style={{ height:80, gap:5 }}>
            {hourBars.map((b,i) => <div key={i} className="bar-col"><div className="bar-fill" style={{ height:b.h, background:`rgba(59,139,212,${b.o})` }}/><div className="bar-label">{hourLabels[i]}</div></div>)}
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
          <div className="search-bar"><IconSearch /><input placeholder="Search by bus or route..." /></div>
          <input type="date" className="filter-select" defaultValue="2026-04-21" />
          <select className="filter-select"><option>All Buses</option><option>KA-01-B</option><option>KA-02-B</option><option>KA-03-C</option></select>
          <button className="fab-btn fab-secondary">↓ Export CSV</button>
        </div>
      </div>
      <div className="history-full">
        <table className="data-table">
          <thead><tr><th>Bus</th><th>Route</th><th>Driver</th><th>Trip Start</th><th>Trip End</th><th>Stops Completed</th><th>Delay</th><th>Status</th></tr></thead>
          <tbody>
            {[
              ["KA-01-B","Route A","R. Kumar","07:00 AM","07:34 AM","12 / 12","0 min","var(--green)","sp-green","Completed"],
              ["KA-01-B","Route A","R. Kumar","08:00 AM","08:38 AM","12 / 12","+4 min","var(--accent)","sp-amber","Minor Delay"],
              ["KA-02-B","Route B","P. Sharma","07:00 AM","07:28 AM","8 / 8","0 min","var(--green)","sp-green","Completed"],
              ["KA-02-B","Route B","P. Sharma","08:00 AM","In Progress","4 / 8","+12 min","var(--red)","sp-red","Delayed"],
              ["KA-03-C","Route C","M. Rao","07:00 AM","07:42 AM","10 / 10","0 min","var(--green)","sp-green","Completed"],
              ["KA-04-D","Route D","S. Joshi","07:00 AM","07:22 AM","6 / 6","0 min","var(--green)","sp-green","Completed"],
              ["KA-05-E","Route A","A. Baig","07:30 AM","Stopped","3 / 12","Engine warning","var(--red)","sp-red","⚠ Incident"],
              ["KA-06-F","Route B","V. Patil","08:00 AM","08:26 AM","8 / 8","0 min","var(--green)","sp-green","Completed"],
            ].map(([bus,route,drv,start,end,stops,delay,dc,sc,st],i) => (
              <tr key={i}><td><strong>{bus}</strong></td><td>{route}</td><td>{drv}</td><td style={{ fontFamily:"'DM Mono',monospace",fontSize:11 }}>{start}</td><td style={{ fontFamily:"'DM Mono',monospace",fontSize:11 }}>{end}</td><td>{stops}</td><td style={{ color:dc }}>{delay}</td><td><span className={`status-pill ${sc}`}>{st}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── MY PROFILE PAGE ─────────────────────────────────────────────────── */
function PageProfile({ showToast }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@school.edu");
  const [phone, setPhone] = useState("+91 98765 00001");
  const [dept, setDept] = useState("Transport Management");

  const handleSave = () => { setEditing(false); showToast("Profile updated successfully!"); };

  const activities = [
    { dot:"var(--green)",  text:"Added new bus KA-09-I to Route D",           time:"Today, 09:22 AM" },
    { dot:"var(--accent)", text:"Updated driver P. Sharma's route assignment",  time:"Today, 08:45 AM" },
    { dot:"var(--blue2)",  text:"Generated April analytics report",             time:"Yesterday, 05:10 PM" },
    { dot:"var(--purple)", text:"Created Route E — East Extension",             time:"Apr 19, 03:40 PM" },
    { dot:"var(--red)",    text:"Resolved bus KA-05-E engine warning",          time:"Apr 19, 11:15 AM" },
    { dot:"var(--green)",  text:"Added 12 new students to Route B",             time:"Apr 18, 02:30 PM" },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">My Profile</div><div className="page-subtitle">Manage your account and preferences</div></div>
        {!editing
          ? <button className="fab-btn fab-secondary" onClick={() => setEditing(true)}>✎ Edit Profile</button>
          : <div className="fab-row">
              <button className="fab-btn fab-secondary" onClick={() => setEditing(false)}>Cancel</button>
              <button className="fab-btn fab-primary" onClick={handleSave}>Save Changes</button>
            </div>
        }
      </div>
      <div className="profile-grid">
        {/* Left card */}
        <div className="profile-card">
          <div className="profile-avatar-lg">AD</div>
          <div className="profile-name">{name}</div>
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

        {/* Right card */}
        <div className="profile-info-card">
          <div className="profile-section">
            <div className="profile-section-title">Personal Information</div>
            <div className="profile-field-row">
              <div className="profile-field">
                <label>Full Name</label>
                {editing ? <input value={name} onChange={e => setName(e.target.value)} /> : <div className="field-val">{name}</div>}
              </div>
              <div className="profile-field">
                <label>Email</label>
                {editing ? <input value={email} onChange={e => setEmail(e.target.value)} /> : <div className="field-val">{email}</div>}
              </div>
              <div className="profile-field">
                <label>Phone</label>
                {editing ? <input value={phone} onChange={e => setPhone(e.target.value)} /> : <div className="field-val">{phone}</div>}
              </div>
              <div className="profile-field">
                <label>Department</label>
                {editing ? <input value={dept} onChange={e => setDept(e.target.value)} /> : <div className="field-val">{dept}</div>}
              </div>
            </div>
          </div>

          <div className="profile-section" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="profile-section-title">Security</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Password</div>
                <div style={{ fontSize: 11.5, color: "var(--muted)" }}>Last changed 3 months ago</div>
              </div>
              <button className="fab-btn fab-secondary" style={{ padding: "6px 14px", fontSize: 12 }}>Change Password</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Two-Factor Authentication</div>
                <div style={{ fontSize: 11.5, color: "var(--muted)" }}>Protect your account with 2FA</div>
              </div>
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
                <div><div className="activity-text">{a.text}</div><div className="activity-time">{a.time}</div></div>
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
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const toastTimer = useRef(null);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  const showModal = (type) => setModal(type);
  const hideModal = () => setModal(null);
  const saveAndClose = (msg) => { hideModal(); showToast(msg); };

  const unreadCount = notifs.filter(n => !n.read).length;

  const navSections = [
    { label: "Overview", items: [
      { id: "dashboard", icon: <IconDash />,   label: "Dashboard" },
      { id: "tracking",  icon: <IconClock />,  label: "Live Tracking", badge: "3", warn: true },
    ]},
    { label: "Management", items: [
      { id: "buses",    icon: <IconBus />,    label: "Buses" },
      { id: "drivers",  icon: <IconUser />,   label: "Drivers" },
      { id: "routes",   icon: <IconRoute />,  label: "Routes" },
      { id: "students", icon: <IconPeople />, label: "Students", badge: "12", warn: true },
    ]},
    { label: "Analytics", items: [
      { id: "analytics", icon: <IconBar />,  label: "Analytics" },
      { id: "history",   icon: <IconFile />, label: "Bus History" },
    ]},
    { label: "Account", items: [
      { id: "profile", icon: <IconProfile />, label: "My Profile" },
    ]},
  ];

  const pageLabels = { dashboard:"Dashboard", tracking:"Live Tracking", buses:"Buses", drivers:"Drivers", routes:"Routes", students:"Students", analytics:"Analytics", history:"Bus History", profile:"My Profile" };

  const handleLogout = () => {
    showToast("Logged out successfully!");
    setTimeout(() => {
      setActivePage("dashboard");
    }, 1200);
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <PageDashboard showModal={showModal} />;
      case "tracking":  return <PageTracking showToast={showToast} />;
      case "buses":     return <PageBuses showModal={showModal} />;
      case "drivers":   return <PageDrivers showModal={showModal} />;
      case "routes":    return <PageRoutes showModal={showModal} />;
      case "students":  return <PageStudents showModal={showModal} />;
      case "analytics": return <PageAnalytics />;
      case "history":   return <PageHistory />;
      case "profile":   return <PageProfile showToast={showToast} />;
      default:          return <PageDashboard showModal={showModal} />;
    }
  };

  const renderModal = () => {
    if (!modal) return null;
    const props = { onClose: hideModal, onSave: saveAndClose };
    const map = { bus: <ModalBus {...props} />, driver: <ModalDriver {...props} />, route: <ModalRoute {...props} />, student: <ModalStudent {...props} /> };
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
            <div className="badge-notif" title={`${unreadCount} unread notifications`} onClick={() => setShowNotifs(v => !v)}>
              <IconBell />
              {unreadCount > 0 && <span className="dot" />}
            </div>
            <div className="avatar" title="My Profile" onClick={() => setActivePage("profile")}>AD</div>
          </div>
        </div>

        <div className="body-wrap">
          <div className="sidebar">
            {navSections.map(s => (
              <div className="nav-section" key={s.label}>
                <div className="nav-label">{s.label}</div>
                {s.items.map(it => (
                  <button key={it.id} className={`nav-item${activePage === it.id ? " active" : ""}`} onClick={() => setActivePage(it.id)}>
                    {it.icon} {it.label}
                    {it.badge && <span className={`nav-badge${it.warn ? " warn" : ""}`}>{it.badge}</span>}
                  </button>
                ))}
              </div>
            ))}
            <div className="sidebar-bottom">
              <button className="nav-item" style={{ color: "#64748b" }} onClick={handleLogout}><IconLogout /> Logout</button>
            </div>
          </div>

          <div className="main">
            {renderPage()}
          </div>
        </div>
      </div>

      {renderModal()}
      {toast && <div className="toast">{toast}</div>}
      {showNotifs && (
        <NotificationPanel
          notifs={notifs}
          setNotifs={setNotifs}
          onClose={() => setShowNotifs(false)}
        />
      )}
    </>
  );
}