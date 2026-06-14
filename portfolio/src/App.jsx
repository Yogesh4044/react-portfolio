import { useState, useEffect, useRef, useCallback } from "react";

const ACCENT = "#7c6eff";
const ACCENT2 = "#00d4ff";
const ACCENT3 = "#00f5a0";
const GITHUB = "https://github.com/Yogesh4044";
const LINKEDIN = "https://www.linkedin.com/in/yogesh-k-9511353b2/";

const NAV_LINKS = ["About","Skills","Projects","Education","Certifications","Contact"];

const SKILLS = [
  { title: "⚙️ Backend & Languages", color: "#7c6eff", items: [
    {label:"Java",pct:88},{label:"Spring Boot",pct:80},{label:"Hibernate / JPA",pct:75},{label:"JDBC / Servlets",pct:70},{label:"SQL",pct:82}]},
  { title: "🎨 Frontend", color: "#00d4ff", items: [
    {label:"React.js",pct:78},{label:"JavaScript",pct:76},{label:"HTML & CSS",pct:85},{label:"Axios / REST",pct:75},{label:"Responsive Design",pct:80}]},
  { title: "🛠️ Tools & Databases", color: "#00f5a0", items: [
    {label:"MySQL",pct:80},{label:"Git & GitHub",pct:78},{label:"Eclipse IDE",pct:82},{label:"VS Code",pct:85},{label:"RESTful API Design",pct:76}]},
];

const TECH_PILLS = [
  ["☕","Java"],["🌿","Spring Boot"],["⚛️","React.js"],["🐬","MySQL"],
  ["🔗","Hibernate"],["📡","REST APIs"],["🐙","GitHub"],["💛","JavaScript"],
  ["🎨","HTML & CSS"],["📦","Axios"],["🔧","JDBC"],["📜","Servlets"],
];

const PROJECT_FEATURES = [
  "RESTful APIs with full CRUD for movies, users & reviews",
  "Search & filter by title, genre, and language",
  "User review submission with star ratings system",
  "React.js SPA integrated via Axios client",
  "Spring Data JPA + Hibernate ORM with MySQL",
  "Fully responsive UI across all devices",
];

const PROJECT_TAGS = [
  {label:"Java",color:"#fb923c",bg:"rgba(249,115,22,.15)",border:"rgba(249,115,22,.3)"},
  {label:"Spring Boot",color:"#7c6eff",bg:"rgba(124,110,255,.12)",border:"rgba(124,110,255,.3)"},
  {label:"React.js",color:"#00d4ff",bg:"rgba(0,212,255,.1)",border:"rgba(0,212,255,.25)"},
  {label:"MySQL",color:"#00f5a0",bg:"rgba(0,245,160,.1)",border:"rgba(0,245,160,.25)"},
  {label:"Hibernate",color:"#fb7185",bg:"rgba(244,63,94,.12)",border:"rgba(244,63,94,.3)"},
  {label:"Axios",color:"#00d4ff",bg:"rgba(0,212,255,.1)",border:"rgba(0,212,255,.25)"},
];

const CERTS = [
  {icon:"☕",grad:`linear-gradient(135deg,${ACCENT},${ACCENT2})`,name:"Java Full Stack Development",org:"QSpiders Institute",period:"July 2025 → Present",status:"In Progress",sc:"#00f5a0",sb:"rgba(0,245,160,.1)",sbr:"rgba(0,245,160,.25)"},
  {icon:"⚛️",grad:"linear-gradient(135deg,#f59e0b,#f43f5e)",name:"React.js Fundamentals",org:"Self-Study / Project Based",period:"2025",status:"Completed",sc:"#00d4ff",sb:"rgba(0,212,255,.1)",sbr:"rgba(0,212,255,.25)"},
  {icon:"🌿",grad:"linear-gradient(135deg,#00f5a0,#00d4ff)",name:"Spring Boot & REST APIs",org:"Project-Based Learning",period:"2025",status:"Completed",sc:"#00d4ff",sb:"rgba(0,212,255,.1)",sbr:"rgba(0,212,255,.25)"},
];

const EDUCATION = [
  {year:"Jul 2025 – Present",title:"Java Full Stack Development",school:"QSpiders Training Institute",desc:"Intensive program covering Java Core, Spring Boot, Hibernate, React.js, MySQL, REST APIs, and modern development practices.",badge:"🔥 Completed",bc:"#fb923c",bb:"rgba(249,115,22,.12)",bbr:"rgba(249,115,22,.3)"},
  {year:"2021 – June 2025",title:"B.E. Mechanical Engineering",school:"Government College of Engineering, Thanjavur",desc:"Strong foundation in analytical thinking and problem decomposition — skills that directly translate to software architecture and system design.",badge:"🎓 CGPA 7.2",bc:"#00f5a0",bb:"rgba(0,245,160,.1)",bbr:"rgba(0,245,160,.25)"},
];

const FLOAT_ICONS = [
  {icon:"☕",top:"10%",left:"5%",size:"2.8rem",delay:0},
  {icon:"⚛️",top:"18%",right:"7%",size:"2.2rem",delay:1},
  {icon:"🌿",top:"52%",left:"3%",size:"2rem",delay:2},
  {icon:"🐬",top:"68%",right:"4%",size:"2.4rem",delay:1.5},
  {icon:"🔧",top:"33%",left:"12%",size:"1.6rem",delay:3},
  {icon:"📦",top:"43%",right:"13%",size:"1.6rem",delay:.5},
  {icon:"🐙",top:"78%",left:"18%",size:"1.5rem",delay:2.5},
  {icon:"🗄️",top:"22%",left:"25%",size:"1.4rem",delay:4},
  {icon:"💻",top:"60%",right:"20%",size:"1.5rem",delay:3.5},
];

const WORDS = ["scalable REST APIs.","React.js interfaces.","Spring Boot backends.","clean database schemas.","full stack solutions."];

/* ── CSS ──────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden;transition:background .35s,color .35s}
a{color:inherit;text-decoration:none}

.dark{
  --bg:#05080f;--bg2:#090d18;--bg3:#0d1220;--bg4:#111827;
  --surface:rgba(255,255,255,.03);--surface2:rgba(255,255,255,.06);
  --border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.13);
  --text:#eceef5;--muted:#7a8299;--muted2:#525a72;
  --glow:rgba(124,110,255,.4);--glow2:rgba(0,212,255,.28);--glow3:rgba(0,245,160,.2);
}
.light{
  --bg:#f6f8ff;--bg2:#eef1f9;--bg3:#e4e9f5;--bg4:#dde3f0;
  --surface:rgba(0,0,0,.025);--surface2:rgba(0,0,0,.05);
  --border:rgba(0,0,0,.07);--border2:rgba(0,0,0,.13);
  --text:#0c1023;--muted:#5a6380;--muted2:#8a94b0;
  --glow:rgba(124,110,255,.18);--glow2:rgba(0,212,255,.14);--glow3:rgba(0,245,160,.12);
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--bg2)}
::-webkit-scrollbar-thumb{background:${ACCENT};border-radius:99px}

/* ── CANVAS ── */
#ptcl{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.45}

/* ── NAV ── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:900;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 clamp(1rem,5vw,3rem);height:66px;
  border-bottom:1px solid var(--border);
  transition:background .3s,box-shadow .3s,backdrop-filter .3s;
}
.dark .nav{background:rgba(5,8,15,.82);backdrop-filter:blur(24px) saturate(1.6)}
.light .nav{background:rgba(246,248,255,.88);backdrop-filter:blur(24px) saturate(1.4)}
.nav.scrolled{box-shadow:0 4px 40px rgba(0,0,0,.5)}
.nav-logo{
  font-family:'JetBrains Mono',monospace;font-size:1.05rem;font-weight:700;
  background:linear-gradient(135deg,${ACCENT},${ACCENT2});
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  letter-spacing:-.01em;
}
.nav-links{display:flex;gap:2rem;list-style:none}
.nav-links a{
  font-size:.82rem;font-weight:600;color:var(--muted);
  letter-spacing:.04em;text-transform:uppercase;cursor:pointer;
  position:relative;transition:color .2s;padding:.25rem 0;
}
.nav-links a::after{
  content:'';position:absolute;bottom:-2px;left:0;right:0;height:1.5px;
  background:linear-gradient(90deg,${ACCENT},${ACCENT2});
  transform:scaleX(0);transform-origin:left;transition:transform .25s;
  border-radius:99px;
}
.nav-links a:hover{color:var(--text)}
.nav-links a:hover::after{transform:scaleX(1)}
.nav-actions{display:flex;gap:.65rem;align-items:center}
.theme-btn{
  width:38px;height:38px;border-radius:10px;
  border:1px solid var(--border2);background:var(--surface2);
  cursor:pointer;display:grid;place-items:center;font-size:1rem;
  transition:background .2s,transform .2s,border-color .2s;
}
.theme-btn:hover{background:var(--border);transform:rotate(20deg)}
.nav-cta{
  padding:.48rem 1.2rem;border-radius:9px;
  background:linear-gradient(135deg,${ACCENT},${ACCENT2});
  color:#fff;font-size:.8rem;font-weight:700;letter-spacing:.04em;
  border:none;cursor:pointer;position:relative;overflow:hidden;
  transition:opacity .2s,transform .2s,box-shadow .2s;
  box-shadow:0 2px 18px var(--glow);
}
.nav-cta::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,${ACCENT2},${ACCENT3});
  opacity:0;transition:opacity .3s;
}
.nav-cta:hover{transform:translateY(-1px);opacity:1;box-shadow:0 6px 28px var(--glow)}
.nav-cta:hover::before{opacity:1}
.nav-cta span{position:relative;z-index:1}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:6px}
.hamburger span{display:block;width:22px;height:2px;background:var(--text);border-radius:2px;transition:.25s}

/* ── MOBILE MENU ── */
.mobile-menu{
  display:none;flex-direction:column;
  position:fixed;top:66px;left:0;right:0;
  padding:1.5rem;gap:1rem;z-index:850;
  border-bottom:1px solid var(--border);
}
.dark .mobile-menu{background:rgba(5,8,15,.97);backdrop-filter:blur(20px)}
.light .mobile-menu{background:rgba(246,248,255,.97);backdrop-filter:blur(20px)}
.mobile-menu.open{display:flex}
.mobile-menu a{font-size:1rem;font-weight:600;color:var(--muted);cursor:pointer;padding:.4rem 0;border-bottom:1px solid var(--border)}
.mobile-menu a:hover{color:var(--text)}

/* ── HERO ── */
.hero{
  position:relative;min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:7rem 1.5rem 4rem;overflow:hidden;
}
.hero-bg-grid{
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:
    linear-gradient(var(--border) 1px,transparent 1px),
    linear-gradient(90deg,var(--border) 1px,transparent 1px);
  background-size:60px 60px;
  mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%);
  -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%);
  opacity:.4;
}
.orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(100px)}
.orb1{width:600px;height:600px;background:rgba(124,110,255,.25);top:-15%;left:-12%;animation:orb1 12s ease-in-out infinite alternate}
.orb2{width:500px;height:500px;background:rgba(0,212,255,.18);bottom:-8%;right:-10%;animation:orb2 14s ease-in-out infinite alternate}
.orb3{width:300px;height:300px;background:rgba(0,245,160,.12);top:40%;left:40%;animation:orb3 9s ease-in-out infinite alternate}
@keyframes orb1{0%{transform:translate(0,0) scale(1)}100%{transform:translate(70px,50px) scale(1.1)}}
@keyframes orb2{0%{transform:translate(0,0) scale(1)}100%{transform:translate(-60px,-50px) scale(1.08)}}
@keyframes orb3{0%{transform:translate(0,0)}100%{transform:translate(-40px,40px)}}
.float-icon{
  position:absolute;opacity:.12;pointer-events:none;z-index:0;
  animation:floatY 7s ease-in-out infinite;
  text-shadow:0 0 20px currentColor;
}
@keyframes floatY{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-22px) rotate(10deg)}}
.hero-content{position:relative;z-index:1;max-width:800px;margin:0 auto}
.hero-badge{
  display:inline-flex;align-items:center;gap:.55rem;
  padding:.4rem 1.1rem;border-radius:99px;margin-bottom:2rem;
  border:1px solid rgba(124,110,255,.4);
  background:rgba(124,110,255,.08);
  backdrop-filter:blur(8px);
  font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${ACCENT};
  animation:fadeDown .8s both;
  box-shadow:0 0 24px rgba(124,110,255,.15);
}
.badge-pulse{
  width:7px;height:7px;border-radius:50%;background:${ACCENT3};
  box-shadow:0 0 8px ${ACCENT3};animation:pulse 2s infinite;
}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
.hero-title{
  font-size:clamp(2.0rem,7.2vw,3rem);font-weight:800;
  letter-spacing:-.045em;line-height:1.02;margin-bottom:1.4rem;
  animation:fadeDown .8s .1s both;
}
.grad{
  background:linear-gradient(135deg,${ACCENT} 0%,${ACCENT2} 50%,${ACCENT3} 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  filter:drop-shadow(0 0 30px rgba(124,110,255,.3));
}
.typewriter-wrap{
  font-size:clamp(1.05rem,2.5vw,1.4rem);color:var(--muted);
  margin-bottom:2.5rem;min-height:2.2rem;
  animation:fadeDown .8s .2s both;
  font-weight:300;letter-spacing:.01em;
}
.tw-word{
  color:${ACCENT2};font-family:'JetBrains Mono',monospace;font-weight:600;
  text-shadow:0 0 20px rgba(0,212,255,.4);
}
.tw-cursor{color:${ACCENT};animation:blink .75s step-end infinite;font-family:'JetBrains Mono',monospace}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.hero-btns{
  display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;
  margin-bottom:4rem;animation:fadeDown .8s .3s both;
}
.btn-primary{
  padding:.8rem 2.2rem;border-radius:12px;
  background:linear-gradient(135deg,${ACCENT},${ACCENT2});
  color:#fff;font-weight:700;font-size:.95rem;letter-spacing:.02em;
  border:none;cursor:pointer;position:relative;overflow:hidden;
  transition:transform .2s,box-shadow .2s;
  box-shadow:0 4px 30px var(--glow),0 0 0 1px rgba(124,110,255,.3);
}
.btn-primary::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,${ACCENT2},${ACCENT3});
  opacity:0;transition:opacity .3s;
}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 10px 40px var(--glow)}
.btn-primary:hover::before{opacity:1}
.btn-primary span{position:relative;z-index:1}
.btn-secondary{
  padding:.8rem 2.2rem;border-radius:12px;background:var(--surface2);
 color: #000000;
font-weight: 600;
font-size: 0.95rem;
letter-spacing: 0.02em;
  border:1px solid var(--border2);cursor:pointer;
  transition:background .2s,border-color .2s,transform .2s,box-shadow .2s;
  backdrop-filter:blur(8px);
}
.btn-secondary:hover{
  background:rgba(124,110,255,.1);border-color:${ACCENT};
  transform:translateY(-3px);box-shadow:0 8px 30px rgba(124,110,255,.2);
}
.hero-stats{
  display:flex;gap:3rem;justify-content:center;flex-wrap:wrap;
  animation:fadeDown .8s .4s both;
  padding:1.5rem 2.5rem;border-radius:20px;
  background:var(--surface);border:1px solid var(--border);
  backdrop-filter:blur(12px);
}
.stat-num{
  font-size:2rem;font-weight:900;letter-spacing:-.04em;
  background:linear-gradient(135deg,${ACCENT},${ACCENT2});
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.stat-label{font-size:.7rem;color:var(--muted);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-top:.1rem}
.stat-divider{width:1px;background:var(--border2);align-self:stretch}

/* ── SECTION ── */
section{position:relative;z-index:1}
.container{max-width:1140px;margin:0 auto;padding:0 clamp(1rem,4vw,2.5rem)}
.section-pad{padding:7rem 0}
.alt-bg{background:var(--bg2)}
.section-eyebrow{
  display:inline-flex;align-items:center;gap:.5rem;
  font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:700;
  letter-spacing:.18em;text-transform:uppercase;color:${ACCENT};margin-bottom:1rem;
}
.section-eyebrow::before{
  content:'';width:28px;height:1.5px;
  background:linear-gradient(90deg,transparent,${ACCENT});border-radius:99px;
}
.section-title{
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: 1.1rem;
  color: #eceff3;
}
.section-sub{font-size:1rem;color:var(--muted);max-width:500px;line-height:1.75;font-weight:300}
.divider{height:1px;background:linear-gradient(90deg,transparent,var(--border2),transparent)}

/* ── GLASS ── */
.glass{
  background:var(--surface);
  backdrop-filter:blur(16px) saturate(1.4);
  border:1px solid var(--border);border-radius:24px;
  transition:border-color .3s,box-shadow .3s,transform .3s;
  position:relative;overflow:hidden;
}
.glass::before{
  content:'';position:absolute;inset:0;border-radius:inherit;
  background:linear-gradient(135deg,rgba(124,110,255,.04),rgba(0,212,255,.02),transparent);
  pointer-events:none;
}
.glass:hover{
  border-color:rgba(124,110,255,.35);
  box-shadow:0 0 0 1px rgba(124,110,255,.15),0 20px 60px rgba(0,0,0,.3),0 0 40px rgba(124,110,255,.1);
  transform:translateY(-4px);
}

/* ── REVEAL ── */
.reveal,.reveal-l,.reveal-r{opacity:0;transition:opacity .75s cubic-bezier(.4,0,.2,1),transform .75s cubic-bezier(.4,0,.2,1)}
.reveal{transform:translateY(32px)}
.reveal-l{transform:translateX(-32px)}
.reveal-r{transform:translateX(32px)}
.visible{opacity:1!important;transform:none!important}

/* ── ABOUT ── */
.about-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:4rem;align-items:center}
.about-avatar-outer{position:relative;display:flex;justify-content:center;align-items:center}
.about-avatar-bg{
  width:260px;height:260px;border-radius:50%;
  background:linear-gradient(135deg,${ACCENT},${ACCENT2},${ACCENT3});
  padding:3px;
  box-shadow:0 0 80px var(--glow),0 0 140px rgba(0,212,255,.15);
  animation:avatarPulse 4s ease-in-out infinite;
}
@keyframes avatarPulse{0%,100%{box-shadow:0 0 80px var(--glow)}50%{box-shadow:0 0 100px var(--glow),0 0 140px rgba(0,212,255,.25)}}
.about-avatar-inner{
  width:100%;height:100%;border-radius:50%;
  background:var(--bg3);
  display:grid;place-items:center;font-size:6rem;
}
.about-ring-1{
  position:absolute;inset:-20px;border-radius:50%;
  border:1px solid rgba(124,110,255,.2);
  animation:rotate 20s linear infinite;
}
.about-ring-2{
  position:absolute;inset:-36px;border-radius:50%;
  border:1px dashed rgba(0,212,255,.15);
  animation:rotate 30s linear infinite reverse;
}
.about-ring-dot{
  position:absolute;top:6px;left:50%;transform:translateX(-50%);
  width:8px;height:8px;border-radius:50%;background:${ACCENT};
  box-shadow:0 0 10px ${ACCENT};
}
.about-ring-dot2{
  position:absolute;bottom:6px;left:50%;transform:translateX(-50%);
  width:6px;height:6px;border-radius:50%;background:${ACCENT2};
  box-shadow:0 0 8px ${ACCENT2};
}
@keyframes rotate{to{transform:rotate(360deg)}}
.about-content h2{
  font-size:clamp(1.7rem,3.5vw,2.2rem);font-weight:800;
  letter-spacing:-.035em;margin-bottom:1rem;
  background:linear-gradient(135deg,var(--text),var(--muted));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.about-content p{color:var(--muted);line-height:1.8;margin-bottom:.9rem;font-size:.95rem;font-weight:300}
.about-chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem}
.chip{
  padding:.35rem .9rem;border-radius:99px;
  background:rgba(124,110,255,.08);border:1px solid rgba(124,110,255,.2);
  font-size:.74rem;font-weight:600;color:${ACCENT};letter-spacing:.04em;
  transition:background .2s,transform .2s,box-shadow .2s;cursor:default;
}
.chip:hover{background:rgba(124,110,255,.18);transform:translateY(-2px);box-shadow:0 4px 16px rgba(124,110,255,.2)}

/* ── SKILLS ── */
.skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:1.5rem;margin-top:3.5rem}
.skill-card{padding:2rem}
.skill-card-header{display:flex;align-items:center;gap:.65rem;margin-bottom:1.5rem}
.skill-card-icon{
  width:38px;height:38px;border-radius:10px;
  display:grid;place-items:center;font-size:1.2rem;
  background:var(--surface2);border:1px solid var(--border2);
}
.skill-card-title{font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.skill-row{margin-bottom:1.1rem}
.skill-label-row{display:flex;justify-content:space-between;font-size:.85rem;font-weight:600;margin-bottom:.45rem;align-items:center}
.skill-pct{
  font-family:'JetBrains Mono',monospace;font-size:.72rem;
  padding:.1rem .45rem;border-radius:4px;background:var(--surface2);color:var(--muted);
}
.skill-bar-bg{height:5px;border-radius:99px;background:var(--surface2);overflow:hidden;border:1px solid var(--border)}
.skill-bar-fill{
  height:100%;border-radius:99px;width:0%;
  transition:width 1.3s cubic-bezier(.4,0,.2,1);
  position:relative;
}
.skill-bar-fill::after{
  content:'';position:absolute;right:0;top:-1px;
  width:8px;height:7px;border-radius:50%;
  background:inherit;box-shadow:0 0 8px currentColor;
  opacity:0;transition:opacity .3s .8s;
}
.skill-bar-fill.filled::after{opacity:1}
.tech-pills{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:3.5rem;justify-content:center}
.tech-pill{
  padding:.55rem 1.2rem;border-radius:99px;
  background:var(--surface);border:1px solid var(--border2);
  font-size:.8rem;font-weight:600;display:flex;align-items:center;gap:.45rem;
  transition:border-color .2s,background .2s,transform .2s,box-shadow .2s;cursor:default;
  color:var(--muted);
}
.tech-pill:hover{
  border-color:${ACCENT};background:rgba(124,110,255,.1);
  transform:translateY(-3px);box-shadow:0 6px 20px rgba(124,110,255,.2);
  color:var(--text);
}

/* ── PROJECTS ── */
.project-card{
  padding:3rem;margin-top:3.5rem;
  display:grid;grid-template-columns:1fr 1fr;gap:3.5rem;align-items:center;
}
.proj-window{
  border-radius:16px;overflow:hidden;
  border:1px solid var(--border2);
  box-shadow:0 0 0 1px var(--border),0 30px 60px rgba(0,0,0,.4);
}
.proj-window-bar{
  display:flex;align-items:center;gap:.5rem;
  padding:.7rem 1.1rem;background:var(--bg3);border-bottom:1px solid var(--border2);
}
.dot{width:11px;height:11px;border-radius:50%}
.proj-window-url{
  flex:1;background:var(--bg4);border-radius:5px;padding:.22rem .7rem;
  font-family:'JetBrains Mono',monospace;font-size:.67rem;color:var(--muted2);
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis;border:1px solid var(--border);
}
.proj-screen{padding:1.5rem;min-height:240px;display:flex;flex-direction:column;gap:.8rem;background:var(--bg3)}
.ps-filter-bar{display:flex;gap:.35rem;flex-wrap:wrap}
.ps-filter{
  font-size:.62rem;padding:.18rem .5rem;border-radius:5px;font-weight:600;
  border:1px solid var(--border);cursor:default;
}
.ps-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:.55rem}
.ps-card{
  background:var(--bg4);border:1px solid var(--border2);border-radius:10px;
  padding:.85rem;display:flex;flex-direction:column;gap:.35rem;
  transition:border-color .2s;
}
.ps-card:hover{border-color:${ACCENT}}
.ps-tag{font-size:.58rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${ACCENT2}}
.ps-title-text{font-size:.74rem;font-weight:700;color:var(--text)}
.ps-stars{color:#f59e0b;font-size:.78rem;letter-spacing:.05em}
.ps-reviews{font-size:.6rem;color:var(--muted2)}
.ps-api{
  background:var(--bg4);border:1px solid var(--border);border-radius:8px;padding:.75rem;
  display:flex;flex-direction:column;gap:.3rem;
}
.ps-api-url{font-size:.6rem;color:var(--muted);font-family:'JetBrains Mono',monospace}
.ps-api-status{font-size:.6rem;color:${ACCENT3};font-family:'JetBrains Mono',monospace;font-weight:700}
.proj-info h3{font-size:1.8rem;font-weight:900;letter-spacing:-.04em;margin-bottom:.8rem}
.proj-info p{font-size:.92rem;color:var(--muted);line-height:1.75;margin-bottom:1.3rem;font-weight:300}
.feat-list{list-style:none;margin-bottom:1.6rem;display:flex;flex-direction:column;gap:.15rem}
.feat-list li{
  font-size:.87rem;color:var(--muted);padding:.35rem .5rem;
  display:flex;align-items:flex-start;gap:.6rem;border-radius:8px;
  transition:background .2s,color .2s;
}
.feat-list li:hover{background:var(--surface2);color:var(--text)}
.feat-arrow{color:${ACCENT};font-weight:700;flex-shrink:0;margin-top:.05rem;font-family:'JetBrains Mono',monospace}
.proj-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.6rem}
.proj-tag{padding:.32rem .8rem;border-radius:7px;font-size:.72rem;font-weight:700;letter-spacing:.04em}
.proj-links{display:flex;gap:.75rem}
.pl{
  padding:.55rem 1.3rem;border-radius:10px;font-size:.84rem;font-weight:700;
  display:flex;align-items:center;gap:.5rem;cursor:pointer;
  transition:transform .2s,box-shadow .2s,opacity .2s;
  text-decoration:none;letter-spacing:.02em;
}
.pl:hover{transform:translateY(-3px)}
.pl-primary{
  background:linear-gradient(135deg,${ACCENT},${ACCENT2});color:#fff;
  box-shadow:0 4px 20px var(--glow);
}
.pl-primary:hover{box-shadow:0 8px 30px var(--glow)}
.pl-ghost{
  border:1px solid var(--border2);background:var(--surface2);color:var(--text);
}
.pl-ghost:hover{border-color:${ACCENT};box-shadow:0 4px 20px rgba(124,110,255,.15)}

/* ── TIMELINE ── */
.timeline{position:relative;margin-top:3.5rem;padding-left:2.5rem}
.timeline::before{
  content:'';position:absolute;left:.7rem;top:0;bottom:0;width:2px;
  background:linear-gradient(180deg,${ACCENT} 0%,${ACCENT2} 50%,transparent 100%);
  border-radius:99px;
}
.tl-item{position:relative;margin-bottom:2.5rem}
.tl-dot{
  position:absolute;left:-1.95rem;top:.45rem;
  width:16px;height:16px;border-radius:50%;
  background:linear-gradient(135deg,${ACCENT},${ACCENT2});
  border:2px solid var(--bg2);
  box-shadow:0 0 0 4px rgba(124,110,255,.15),0 0 16px var(--glow);
}
.tl-card{padding:1.75rem}
.tl-year{
  font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:700;
  letter-spacing:.1em;color:${ACCENT2};text-transform:uppercase;margin-bottom:.5rem;
}
.tl-title{font-size:1.08rem;font-weight:800;margin-bottom:.25rem;letter-spacing:-.02em}
.tl-school{font-size:.88rem;color:var(--muted);margin-bottom:.65rem;font-weight:400}
.tl-desc{font-size:.86rem;color:var(--muted);line-height:1.7;margin-bottom:.75rem;font-weight:300}
.tl-badge{
  display:inline-flex;align-items:center;gap:.35rem;
  padding:.28rem .75rem;border-radius:99px;
  font-size:.72rem;font-weight:700;letter-spacing:.04em;
}

/* ── CERTS ── */
.cert-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:1.5rem;margin-top:3.5rem}
.cert-card{padding:2rem;display:flex;flex-direction:column;gap:1.1rem}
.cert-icon{
  width:52px;height:52px;border-radius:14px;display:grid;place-items:center;
  font-size:1.5rem;box-shadow:0 4px 20px rgba(0,0,0,.3);flex-shrink:0;
}
.cert-name{font-size:1.02rem;font-weight:800;line-height:1.3;letter-spacing:-.02em}
.cert-org{font-size:.82rem;color:var(--muted);font-weight:400}
.cert-period{font-size:.75rem;color:var(--muted2);font-family:'JetBrains Mono',monospace}
.cert-status{
  display:inline-flex;align-items:center;gap:.4rem;
  padding:.22rem .7rem;border-radius:99px;
  font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  width:fit-content;
}
.cert-status-dot{font-size:.45rem;animation:pulse 2s infinite}

/* ── CONTACT ── */
.contact-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:3.5rem;align-items:start;margin-top:3.5rem}
.contact-info-title{font-size:1.35rem;font-weight:800;margin-bottom:.8rem;letter-spacing:-.03em}
.contact-info-sub{color:var(--muted);font-size:.9rem;line-height:1.75;margin-bottom:1.75rem;font-weight:300}
.contact-link{
  display:flex;align-items:center;gap:.85rem;
  padding:.85rem 1.1rem;border-radius:14px;
  border:1px solid var(--border);background:var(--surface);
  margin-bottom:.75rem;font-size:.88rem;font-weight:500;
  transition:border-color .25s,transform .25s,background .25s,box-shadow .25s;
  text-decoration:none;color:var(--text);
}
.contact-link:hover{
  border-color:${ACCENT};transform:translateX(5px);
  background:rgba(124,110,255,.07);box-shadow:4px 0 20px rgba(124,110,255,.15);
}
.contact-link-icon{
  width:38px;height:38px;border-radius:10px;border:1px solid var(--border2);
  background:var(--surface2);display:grid;place-items:center;font-size:1.15rem;flex-shrink:0;
}
.contact-link-label{font-weight:600;font-size:.87rem}
.contact-link-sub{font-size:.71rem;color:var(--muted);display:block;margin-top:.1rem}
.form-wrap{padding:2.25rem}
.form-group{margin-bottom:1.2rem}
label{
  display:block;font-size:.75rem;font-weight:700;
  letter-spacing:.08em;color:var(--muted);margin-bottom:.5rem;text-transform:uppercase;
}
input,textarea{
  width:100%;padding:.8rem 1.1rem;border-radius:12px;
  border:1px solid var(--border2);background:var(--surface);color:var(--text);
  font-family:'Inter',sans-serif;font-size:.9rem;font-weight:400;
  transition:border-color .25s,box-shadow .25s,background .25s;outline:none;resize:vertical;
}
input:focus,textarea:focus{
  border-color:${ACCENT};
  background:rgba(124,110,255,.05);
  box-shadow:0 0 0 3px rgba(124,110,255,.12),0 0 20px rgba(124,110,255,.08);
}
input::placeholder,textarea::placeholder{color:var(--muted2)}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.submit-btn{
  width:100%;padding:.9rem;border-radius:12px;border:none;
  background:linear-gradient(135deg,${ACCENT},${ACCENT2});color:#fff;
  font-family:'Inter',sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;
  letter-spacing:.03em;position:relative;overflow:hidden;
  transition:opacity .25s,transform .25s,box-shadow .25s;
  box-shadow:0 4px 28px var(--glow);
}
.submit-btn::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,${ACCENT2},${ACCENT3});
  opacity:0;transition:opacity .3s;
}
.submit-btn:hover{opacity:1;transform:translateY(-2px);box-shadow:0 10px 40px var(--glow)}
.submit-btn:hover::before{opacity:1}
.submit-btn span{position:relative;z-index:1}
.form-toast{
  margin-top:1.1rem;padding:.85rem 1.1rem;border-radius:12px;
  background:rgba(0,245,160,.08);border:1px solid rgba(0,245,160,.3);
  color:${ACCENT3};font-size:.88rem;font-weight:600;text-align:center;
  animation:fadeDown .4s both;
  box-shadow:0 0 20px rgba(0,245,160,.1);
}

/* ── FOOTER ── */
footer{
  position:relative;z-index:1;
  padding:3.5rem clamp(1rem,4vw,2.5rem) 2rem;
  border-top:1px solid var(--border);
  display:flex;flex-direction:column;align-items:center;gap:1.75rem;text-align:center;
  background:var(--bg2);
}
.footer-logo{
  font-family:'JetBrains Mono',monospace;font-size:1.3rem;font-weight:700;
  background:linear-gradient(135deg,${ACCENT},${ACCENT2});
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.footer-nav{display:flex;flex-wrap:wrap;gap:2rem;justify-content:center}
.footer-nav a{
  font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  color:var(--muted);cursor:pointer;transition:color .2s;
}
.footer-nav a:hover{color:var(--text)}
.footer-socials{display:flex;gap:.85rem}
.social-btn{
  width:44px;height:44px;border-radius:12px;border:1px solid var(--border2);
  background:var(--surface2);display:grid;place-items:center;font-size:1.15rem;
  cursor:pointer;transition:border-color .2s,background .2s,transform .2s,box-shadow .2s;
  text-decoration:none;
}
.social-btn:hover{
  border-color:${ACCENT};background:rgba(124,110,255,.12);
  transform:translateY(-3px);box-shadow:0 6px 20px rgba(124,110,255,.25);
}
.footer-copy{font-size:.78rem;color:var(--muted2);letter-spacing:.02em}
.footer-copy strong{color:${ACCENT};font-weight:700}
.footer-divider{width:60px;height:2px;background:linear-gradient(90deg,${ACCENT},${ACCENT2});border-radius:99px}

/* ── ANIMATIONS ── */
@keyframes fadeDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  .project-card{grid-template-columns:1fr;padding:2rem}
  .about-grid{grid-template-columns:1fr;text-align:center;gap:2.5rem}
  .about-chips{justify-content:center}
  .contact-grid{grid-template-columns:1fr}
}
@media(max-width:768px){
  .nav-links,.nav-cta{display:none}
  .hamburger{display:flex}
  .form-row{grid-template-columns:1fr}
  .hero-stats{gap:1.5rem;padding:1.2rem 1.5rem}
  .stat-divider{display:none}
}
`;

/* ── HOOKS ─────────────────────────────────────────────────── */
function useTypewriter(words) {
  const [text, setText] = useState("");
  const s = useRef({ wi:0, ci:0, deleting:false, wait:0 });
  useEffect(() => {
    let raf, last = 0;
    function tick(ts) {
      const r = s.current, w = words[r.wi];
      const delay = r.deleting ? (r.wait > 0 ? 16 : 38) : 82;
      if (ts - last < delay) { raf = requestAnimationFrame(tick); return; }
      last = ts;
      if (r.wait > 0) { r.wait--; raf = requestAnimationFrame(tick); return; }
      if (!r.deleting) {
        r.ci++; setText(w.slice(0, r.ci));
        if (r.ci === w.length) { r.deleting = true; r.wait = 65; }
      } else {
        r.ci--; setText(w.slice(0, r.ci));
        if (r.ci === 0) { r.deleting = false; r.wi = (r.wi + 1) % words.length; }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [words]);
  return text;
}

function useParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, pts = [], raf;
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 130; i++) pts.push({ x:Math.random()*1400, y:Math.random()*900, vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35, r:Math.random()*1.4+.4, a:Math.random()*.5+.15 });
    function draw() {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(124,110,255,${p.a})`; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(124,110,255,${.15*(1-d/110)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return ref;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-l,.reveal-r");
    const obs = new IntersectionObserver(e => e.forEach(x => { if(x.isIntersecting) x.target.classList.add("visible"); }), { threshold:.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

function useSkillBars() {
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => {
      if(x.isIntersecting) x.target.querySelectorAll(".skill-bar-fill").forEach(b => {
        b.style.width = b.dataset.width+"%";
        setTimeout(() => b.classList.add("filled"), 1300);
      });
    }), { threshold:.2 });
    document.querySelectorAll(".skill-card").forEach(c => obs.observe(c));
    return () => obs.disconnect();
  });
}

/* ── COMPONENTS ─────────────────────────────────────────────── */
function Navbar({ theme, toggleTheme, scrollTo }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="nav-logo">YK.</div>
        <ul className="nav-links">
          {NAV_LINKS.map(n => <li key={n}><a onClick={() => scrollTo(n.toLowerCase())}>{n}</a></li>)}
        </ul>
        <div className="nav-actions">
          <button className="theme-btn" onClick={toggleTheme}>{theme==="dark"?"🌙":"☀️"}</button>
          <button className="nav-cta" onClick={() => scrollTo("contact")}><span>Hire Me</span></button>
          <div className="hamburger" onClick={() => setOpen(!open)}><span/><span/><span/></div>
        </div>
      </nav>
      <div className={`mobile-menu${open?" open":""}`}>
        {NAV_LINKS.map(n => <a key={n} onClick={() => { scrollTo(n.toLowerCase()); setOpen(false); }}>{n}</a>)}
      </div>
    </>
  );
}

function Hero({ scrollTo }) {
  const tw = useTypewriter(WORDS);
  return (
    <section id="hero" className="hero">
      <div className="hero-bg-grid"/>
      <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>
      {FLOAT_ICONS.map((fi,i) => (
        <span key={i} className="float-icon" style={{ top:fi.top, left:fi.left, right:fi.right, fontSize:fi.size, animationDelay:`${fi.delay}s` }}>{fi.icon}</span>
      ))}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-pulse"/>
          Available for Opportunities
        </div>
        <h1 className="hero-title">Yogesh K<br/><span className="grad">Full Stack Developer</span></h1>
        <div className="typewriter-wrap">
          I build&nbsp;<span className="tw-word">{tw}</span><span className="tw-cursor">|</span>
        </div>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo("projects")}><span>View Projects →</span></button>
          <button className="btn-secondary" onClick={() => scrollTo("contact")}>Get in Touch</button>
        </div>
        <div className="hero-stats">
          {[["1+","Projects"],["8+","Technologies"],["7.2","CGPA"],["∞","Curiosity"]].map(([n,l],i,arr) => (
            <>
              <div key={l} style={{textAlign:"center"}}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
              {i < arr.length-1 && <div className="stat-divider" key={`d${i}`}/>}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container">
        <div className="about-grid">
          <div className="about-avatar-outer reveal-l">
            <div className="about-ring-1"><div className="about-ring-dot"/></div>
            <div className="about-ring-2"><div className="about-ring-dot2"/></div>
            <div className="about-avatar-bg"><div className="about-avatar-inner">👨‍💻</div></div>
          </div>
          <div className="about-content reveal-r">
            <span className="section-eyebrow">who I am</span>
            <h2>Aspiring Full Stack<br/>Engineer</h2>
            <p>I'm Yogesh K, a Mechanical Engineering graduate with a deep passion for software development. I transitioned into the world of code and haven't looked back — currently pursuing Java Full Stack Development at QSpiders.</p>
            <p>My focus is building clean, efficient, and user-centric applications — Java Spring Boot on the backend, React.js on the frontend. I love turning complex problems into elegant digital solutions.</p>
            <p>Based in Thanjavur, Tamil Nadu. Open to remote and on-site opportunities across India.</p>
            <div className="about-chips">
              {["Java","Spring Boot","React.js","MySQL","Hibernate","REST APIs","Git","Thanjavur, TN"].map(c => <span key={c} className="chip">{c}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ label, pct, color }) {
  return (
    <div className="skill-row">
      <div className="skill-label-row">
        <span style={{color:"var(--text)",fontSize:".87rem"}}>{label}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" data-width={pct} style={{background:`linear-gradient(90deg,${color},${color}cc)`}}/>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-pad alt-bg">
      <div className="container">
        <div className="reveal">
          <span className="section-eyebrow">expertise</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-sub">Technologies I work with, building production-grade full stack applications.</p>
        </div>
        <div className="skills-grid">
          {SKILLS.map((s,i) => (
            <div key={s.title} className="glass skill-card reveal" style={{transitionDelay:`${i*.1}s`}}>
              <div className="skill-card-header">
                <div className="skill-card-icon">{s.title.split(" ")[0]}</div>
                <div className="skill-card-title" style={{color:s.color}}>{s.title.slice(3)}</div>
              </div>
              {s.items.map(item => <SkillBar key={item.label} {...item} color={s.color}/>)}
            </div>
          ))}
        </div>
        <div className="tech-pills reveal">
          {TECH_PILLS.map(([icon,label]) => (
            <div key={label} className="tech-pill"><span>{icon}</span>{label}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectMockup() {
  return (
    <div className="proj-window">
      <div className="proj-window-bar">
        <div className="dot" style={{background:"#f43f5e"}}/>
        <div className="dot" style={{background:"#f59e0b"}}/>
        <div className="dot" style={{background:"#10b981"}}/>
        <div className="proj-window-url">localhost:3000/movies</div>
      </div>
      <div className="proj-screen">
        <div style={{fontSize:".75rem",fontWeight:700,color:"var(--text)"}}>🎬 Movie Review System</div>
        <div className="ps-filter-bar">
          {["All","Action","Drama","Sci-Fi","Comedy"].map((t,i) => (
            <span key={t} className="ps-filter" style={{
              background:i===0?"rgba(124,110,255,.18)":"var(--surface2)",
              color:i===0?ACCENT:"var(--muted)",
              borderColor:i===0?ACCENT:"var(--border)",
            }}>{t}</span>
          ))}
        </div>
        <div className="ps-cards-grid">
          {[
            {genre:"Action",title:"Dune: Part Two",stars:"★★★★★",reviews:"128 reviews"},
            {genre:"Sci-Fi",title:"Oppenheimer",stars:"★★★★☆",reviews:"89 reviews"},
          ].map(m => (
            <div key={m.title} className="ps-card">
              <div className="ps-tag">{m.genre}</div>
              <div className="ps-title-text">{m.title}</div>
              <div className="ps-stars">{m.stars}</div>
              <div className="ps-reviews">{m.reviews}</div>
            </div>
          ))}
        </div>
        <div className="ps-api">
          <div className="ps-api-url">GET /api/movies?genre=action&lang=en</div>
          <div className="ps-api-status">200 OK · 12ms · Spring Boot</div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="container">
        <div className="reveal">
          <span className="section-eyebrow">what I've built</span>
          <h2 className="section-title">Featured Project</h2>
          <p className="section-sub">A production-quality full stack application showcasing end-to-end development skills.</p>
        </div>
        <div className="glass project-card">
          <div className="reveal-l"><ProjectMockup/></div>
          <div className="proj-info reveal-r">
            <h3>Movie Review System</h3>
            <p>A comprehensive full-stack web application enabling users to discover movies, submit reviews, and manage ratings — powered by a robust RESTful API backend.</p>
            <ul className="feat-list">
              {PROJECT_FEATURES.map(f => (
                <li key={f}><span className="feat-arrow">→</span>{f}</li>
              ))}
            </ul>
            <div className="proj-tags">
              {PROJECT_TAGS.map(t => (
                <span key={t.label} className="proj-tag" style={{color:t.color,background:t.bg,border:`1px solid ${t.border}`}}>{t.label}</span>
              ))}
            </div>
            <div className="proj-links">
              <a href={GITHUB} target="_blank" rel="noreferrer" className="pl pl-primary">🐙 <span>GitHub</span></a>
              <a href="#contact" className="pl pl-ghost">📩 Contact Me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-pad alt-bg">
      <div className="container">
        <div className="reveal">
          <span className="section-eyebrow">background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-sub">The foundation of disciplined problem-solving, now applied to software engineering.</p>
        </div>
        <div className="timeline">
          {EDUCATION.map((e,i) => (
            <div key={e.title} className="tl-item reveal" style={{transitionDelay:`${i*.15}s`}}>
              <div className="tl-dot"/>
              <div className="glass tl-card">
                <div className="tl-year">{e.year}</div>
                <div className="tl-title">{e.title}</div>
                <div className="tl-school">{e.school}</div>
                <div className="tl-desc">{e.desc}</div>
                <span className="tl-badge" style={{background:e.bb,border:`1px solid ${e.bbr}`,color:e.bc}}>{e.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section-pad">
      <div className="container">
        <div className="reveal">
          <span className="section-eyebrow">credentials</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-sub">Continuous learning is core to who I am as a developer.</p>
        </div>
        <div className="cert-grid">
          {CERTS.map((c,i) => (
            <div key={c.name} className="glass cert-card reveal" style={{transitionDelay:`${i*.1}s`}}>
              <div className="cert-icon" style={{background:c.grad}}>{c.icon}</div>
              <div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-org">{c.org}</div>
              </div>
              <div className="cert-period">{c.period}</div>
              <div className="cert-status" style={{background:c.sb,border:`1px solid ${c.sbr}`,color:c.sc}}>
                <span className="cert-status-dot">●</span>{c.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({fname:"",lname:"",email:"",subject:"",message:""});
  const [sent, setSent] = useState(false);
  const update = k => e => setForm(f => ({...f,[k]:e.target.value}));
  const submit = () => {
    if(!form.fname||!form.email||!form.message){alert("Please fill in name, email and message.");return;}
    setSent(true);setForm({fname:"",lname:"",email:"",subject:"",message:""});
    setTimeout(()=>setSent(false),5000);
  };
  return (
    <section id="contact" className="section-pad alt-bg">
      <div className="container">
        <div className="reveal" style={{textAlign:"center",maxWidth:"560px",margin:"0 auto"}}>
          <span className="section-eyebrow">let's connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-sub" style={{margin:"0 auto"}}>Whether it's a job opportunity, collaboration, or just a chat about tech — I'd love to hear from you.</p>
        </div>
        <div className="contact-grid">
          <div className="reveal-l">
            <div className="contact-info-title">Contact Info</div>
            <div className="contact-info-sub">Based in Thanjavur, Tamil Nadu. Open to remote and relocation opportunities across India.</div>
            {[
              {icon:"📧",label:"yogeyogesh408@gmail.com",sub:"Responds within 24 hours",href:"mailto:yogeyogesh408@gmail.com"},
              {icon:"📞",label:"+91 9566 797 042",sub:"Mon–Sat, 9 AM – 7 PM IST",href:"tel:+919566797042"},
              {icon:"🐙",label:"github.com/Yogesh4044",sub:"Check out my code",href:GITHUB},
              {icon:"💼",label:"Yogesh K — LinkedIn",sub:"Connect professionally",href:LINKEDIN},
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="contact-link">
                <div className="contact-link-icon">{c.icon}</div>
                <div>
                  <div className="contact-link-label">{c.label}</div>
                  <span className="contact-link-sub">{c.sub}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="reveal-r">
            <div className="glass form-wrap">
              <div className="form-row">
                <div className="form-group"><label>First Name</label><input placeholder="Arjun" value={form.fname} onChange={update("fname")}/></div>
                <div className="form-group"><label>Last Name</label><input placeholder="Sharma" value={form.lname} onChange={update("lname")}/></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="arjun@company.com" value={form.email} onChange={update("email")}/></div>
              <div className="form-group"><label>Subject</label><input placeholder="Job Opportunity / Collaboration" value={form.subject} onChange={update("subject")}/></div>
              <div className="form-group"><label>Message</label><textarea rows={5} placeholder="Tell me about the role or project…" value={form.message} onChange={update("message")}/></div>
              <button className="submit-btn" onClick={submit}><span>Send Message →</span></button>
              {sent && <div className="form-toast">✅ Message sent! I'll get back to you soon.</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ scrollTo }) {
  return (
    <footer>
      <div className="footer-logo">YK.</div>
      <div className="footer-divider"/>
      <nav className="footer-nav">
        {NAV_LINKS.map(n => <a key={n} onClick={() => scrollTo(n.toLowerCase())}>{n}</a>)}
      </nav>
      <div className="footer-socials">
        {[
          {icon:"🐙",href:GITHUB,title:"GitHub"},
          {icon:"💼",href:LINKEDIN,title:"LinkedIn"},
          {icon:"📧",href:"mailto:yogeyogesh408@gmail.com",title:"Email"},
        ].map(s => <a key={s.title} href={s.href} target="_blank" rel="noreferrer" className="social-btn" title={s.title}>{s.icon}</a>)}
      </div>
      <p className="footer-copy">© 2025 <strong>Yogesh K</strong>. Crafted with ☕ Java &amp; ⚛️ React.</p>
    </footer>
  );
}

/* ── APP ─────────────────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme] = useState("dark");
  const canvasRef = useParticles();
  useReveal();
  useSkillBars();
  const scrollTo = useCallback(id => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }, []);
  const toggleTheme = () => setTheme(t => t==="dark"?"light":"dark");
  return (
    <div className={theme} style={{minHeight:"100vh"}}>
      <style>{css}</style>
      <canvas id="ptcl" ref={canvasRef}/>
      <Navbar theme={theme} toggleTheme={toggleTheme} scrollTo={scrollTo}/>
      <main>
        <Hero scrollTo={scrollTo}/>
        <div className="divider"/>
        <About/>
        <div className="divider"/>
        <Skills/>
        <div className="divider"/>
        <Projects/>
        <div className="divider"/>
        <Education/>
        <div className="divider"/>
        <Certifications/>
        <div className="divider"/>
        <Contact/>
      </main>
      <Footer scrollTo={scrollTo}/>
    </div>
  );
}