import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Rocket,
  Code2,
  Eye,
  Columns,
  Smartphone,
  Tablet,
  Monitor,
  Play,
  RefreshCw,
  Upload,
  Download,
  Sparkles,
  Copy,
  Check,
  Terminal,
  Trash2,
  ChevronUp,
  ChevronDown,
  Lock,
  Clock,
  ExternalLink,
  QrCode,
  FileCode2,
  FileType,
  Braces,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X,
  Wand2,
  FolderOpen,
  Globe,
  Layers,
  Flame
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot } from 'firebase/firestore';

// ============================================================================
// FIREBASE CLOUD HOSTING INITIALIZATION
// ============================================================================
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'syaire-studio-default';
const fbApp = firebaseConfig ? initializeApp(firebaseConfig) : null;
const auth = fbApp ? getAuth(fbApp) : null;
const db = fbApp ? getFirestore(fbApp) : null;

// ============================================================================
// STARTER TEMPLATES
// ============================================================================
const TEMPLATES = {
  portfolio: {
    name: 'Modern SaaS / Portfolio',
    slug: 'sayre-studio',
    html: `<div class="page-wrapper">
  <nav class="navbar">
    <div class="brand">
      <span class="dot"></span>
      <span>SAYRE.STUDIO</span>
    </div>
    <div class="nav-links">
      <a href="#work">Work</a>
      <a href="#stack">Stack</a>
      <button id="themeBtn" class="pill-btn">Switch Crimson Accent</button>
    </div>
  </nav>

  <main class="hero">
    <div class="badge">Available for Q4 Projects</div>
    <h1>Crafting crimson-fast <span class="gradient-text" id="accentWord">digital interfaces</span> for ambitious teams.</h1>
    <p class="subtitle">
      Edit the HTML, CSS, or JS on the left and watch this live page update in real time. 
      Try clicking the interactive counter or crimson switcher below!
    </p>

    <div class="cta-row">
      <button id="deployBtn" class="primary-btn">
        ⚡ Trigger Interaction (<span id="clickCount">0</span>)
      </button>
      <button id="logBtn" class="secondary-btn">
        Send Console Log
      </button>
    </div>

    <div class="bento-grid" id="work">
      <div class="card">
        <div class="card-tag">01 / DESIGN SYSTEM</div>
        <h3>Crimson UI Kit</h3>
        <p>Zero-runtime token architecture built for multi-brand web applications.</p>
      </div>
      <div class="card">
        <div class="card-tag">02 / EDGE ENGINE</div>
        <h3>Pulse Analytics</h3>
        <p>Sub-15ms global telemetry dashboard processing 2M events/sec.</p>
      </div>
      <div className="card">
        <div class="card-tag">03 / AI WORKSPACE</div>
        <h3>Synth Canvas</h3>
        <p>Multiplayer node graph editor with real-time WebGL shaders.</p>
      </div>
    </div>
  </main>
</div>`,
    css: `:root {
  --bg: #050505;
  --surface: #0f0f12;
  --border: rgba(239, 68, 68, 0.15);
  --text: #f4f4f5;
  --muted: #a1a1aa;
  --accent: #dc2626;
  --accent-2: #f43f5e;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
  background-image: radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.14), transparent 55%);
}

.page-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 20px 64px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: rgba(15, 15, 18, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 16px;
  margin-bottom: 56px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  font-size: 14px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 14px var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--text);
}

.pill-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.pill-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
}

.hero {
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: #fca5a5;
  background: rgba(220, 38, 38, 0.12);
  border: 1px solid rgba(220, 38, 38, 0.3);
  margin-bottom: 24px;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.12;
  max-width: 780px;
  margin: 0 auto 20px;
}

.gradient-text {
  background: linear-gradient(135deg, #ef4444, #f43f5e, #fb7185);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--muted);
  font-size: 17px;
  max-width: 580px;
  margin: 0 auto 36px;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 56px;
}

.primary-btn {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 8px 24px -4px rgba(220, 38, 38, 0.45);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -4px rgba(220, 38, 38, 0.65);
}

.primary-btn:active {
  transform: scale(0.98);
}

.secondary-btn {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.secondary-btn:hover {
  background: #18181b;
  border-color: rgba(239, 68, 68, 0.4);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  text-align: left;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  transition: border-color 0.2s, transform 0.2s;
}

.card:hover {
  border-color: rgba(239, 68, 68, 0.5);
  transform: translateY(-3px);
}

.card-tag {
  font-size: 11px;
  font-family: monospace;
  color: var(--accent);
  margin-bottom: 10px;
}

.card h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.card p {
  font-size: 14px;
  color: var(--muted);
}`,
    js: `// Interactive logic runs automatically inside the sandboxed preview
let count = 0;
const palettes = [
  ['#dc2626', '#f43f5e'],
  ['#b91c1c', '#ea580c'],
  ['#e11d48', '#9333ea'],
  ['#ef4444', '#f59e0b']
];
let paletteIndex = 0;

const deployBtn = document.getElementById('deployBtn');
const countSpan = document.getElementById('clickCount');
const themeBtn = document.getElementById('themeBtn');
const logBtn = document.getElementById('logBtn');

console.log('🚀 Sayre Studio initialized! Ready for live edits.');

deployBtn?.addEventListener('click', () => {
  count++;
  countSpan.textContent = count;
  console.log(\`Interaction triggered! Total clicks: \${count}\`);
});

themeBtn?.addEventListener('click', () => {
  paletteIndex = (paletteIndex + 1) % palettes.length;
  const [c1, c2] = palettes[paletteIndex];
  document.documentElement.style.setProperty('--accent', c1);
  document.documentElement.style.setProperty('--accent-2', c2);
  console.info(\`Switched theme accent to \${c1}\`);
});

logBtn?.addEventListener('click', () => {
  console.warn('Sample warning: Remember to publish your page to share it via Sayre Upload!');
});`
  },
  landing: {
    name: 'Product Launch Waitlist',
    slug: 'sayre-launch',
    html: `<div class="container">
  <div class="glow"></div>
  <header>
    <span class="logo">SAYRE // OS</span>
    <span class="status">v2.4 BETA LIVE</span>
  </header>

  <section class="card">
    <h1>The operating system for <br/><span>autonomous workflows.</span></h1>
    <p>Join 14,200+ engineers shipping 10x faster with zero boilerplate infrastructure.</p>

    <form id="waitlistForm" class="form-box">
      <input type="email" id="emailInput" placeholder="you@company.com" required />
      <button type="submit">Request Access</button>
    </form>
    <div id="feedback" class="feedback"></div>

    <div class="metrics">
      <div><strong>99.99%</strong><span>Uptime SLA</span></div>
      <div><strong>&lt;12ms</strong><span>Cold Start</span></div>
      <div><strong>SOC2</strong><span>Type II Certified</span></div>
    </div>
  </section>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #050505;
  color: #fff;
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}
.container {
  width: 100%;
  max-width: 640px;
  position: relative;
}
.glow {
  position: absolute;
  inset: -40px;
  background: radial-gradient(circle, rgba(220,38,38,0.18), transparent 70%);
  z-index: 0;
  pointer-events: none;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}
.logo { font-weight: 800; letter-spacing: 0.1em; font-size: 13px; color: #ef4444; }
.status {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 99px;
  background: rgba(220,38,38,0.15);
  color: #fca5a5;
  border: 1px solid rgba(220,38,38,0.3);
}
.card {
  position: relative;
  z-index: 1;
  background: rgba(15, 15, 18, 0.9);
  border: 1px solid rgba(220,38,38,0.2);
  border-radius: 24px;
  padding: 44px 32px;
  text-align: center;
  backdrop-filter: blur(16px);
}
h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.15; margin-bottom: 16px; }
h1 span { color: #ef4444; }
p { color: #9ca3af; font-size: 15px; margin-bottom: 28px; }
.form-box {
  display: flex;
  gap: 10px;
  max-width: 440px;
  margin: 0 auto;
}
input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(0,0,0,0.4);
  color: #fff;
  font-size: 14px;
  outline: none;
}
input:focus { border-color: #ef4444; }
button {
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  background: #dc2626;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}
button:hover { opacity: 0.9; }
.feedback {
  margin-top: 14px;
  font-size: 13px;
  color: #fca5a5;
  min-height: 20px;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.metrics strong { display: block; font-size: 20px; color: #fff; }
.metrics span { font-size: 12px; color: #6b7280; }`,
    js: `const form = document.getElementById('waitlistForm');
const input = document.getElementById('emailInput');
const feedback = document.getElementById('feedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = input.value.trim();
  if (!email) return;
  feedback.textContent = \`✓ Invite reserved for \${email} (#14,209 in queue)\`;
  console.log('New waitlist signup:', email);
  input.value = '';
});`
  },
  chart: {
    name: 'Interactive Data Dashboard',
    slug: 'sayre-telemetry',
    html: `<div class="dash">
  <div class="top">
    <div>
      <h2>Real-Time Crimson Traffic</h2>
      <p>Interactive Canvas Telemetry Visualization</p>
    </div>
    <button id="randomizeBtn">Simulate Spike</button>
  </div>
  <canvas id="trafficChart" height="240"></canvas>
  <div class="stats" id="statsRow"></div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #050505;
  color: #e2e8f0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 28px;
}
.dash {
  max-width: 780px;
  margin: 0 auto;
  background: #0f0f12;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 18px;
  padding: 24px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
h2 { font-size: 18px; }
p { font-size: 13px; color: #94a3b8; }
button {
  background: #dc2626;
  color: white;
  border: none;
  padding: 9px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}
button:hover { background: #b91c1c; }
canvas {
  width: 100%;
  background: #050505;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: block;
}
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 18px;
}
.stat-box {
  background: #050505;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.stat-box span { font-size: 11px; color: #64748b; text-transform: uppercase; }
.stat-box strong { display: block; font-size: 20px; margin-top: 4px; color: #ef4444; }`,
    js: `const canvas = document.getElementById('trafficChart');
const ctx = canvas.getContext('2d');
let data = [42, 58, 51, 74, 68, 92, 85, 110, 96, 128, 118, 145];

function drawChart() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 240 * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = 240;
  ctx.clearRect(0, 0, w, h);

  const max = Math.max(...data) * 1.15;
  const stepX = (w - 48) / (data.length - 1);

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(239, 68, 68, 0.35)');
  grad.addColorStop(1, 'rgba(239, 68, 68, 0.0)');

  ctx.beginPath();
  data.forEach((val, i) => {
    const x = 24 + i * stepX;
    const y = h - 28 - (val / max) * (h - 56);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.lineTo(24 + (data.length - 1) * stepX, h - 28);
  ctx.lineTo(24, h - 28);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Points
  data.forEach((val, i) => {
    const x = 24 + i * stepX;
    const y = h - 28 - (val / max) * (h - 56);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#050505';
    ctx.fill();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  const avg = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
  const peak = Math.max(...data);
  document.getElementById('statsRow').innerHTML = \`
    <div class="stat-box"><span>Current Req/s</span><strong>\${data[data.length - 1]}k</strong></div>
    <div class="stat-box"><span>Average Load</span><strong>\${avg}k</strong></div>
    <div class="stat-box"><span>Peak Burst</span><strong>\${peak}k</strong></div>
  \`;
}

document.getElementById('randomizeBtn').addEventListener('click', () => {
  data = data.slice(1).concat(Math.floor(60 + Math.random() * 110));
  drawChart();
  console.log('Telemetry updated:', data[data.length - 1] + 'k req/s');
});

window.addEventListener('resize', drawChart);
drawChart();`
  },
  blank: {
    name: 'Blank Canvas',
    slug: 'sayre-blank',
    html: `<div class="wrapper">
  <h1>Hello, Sayre Share!</h1>
  <p>Start typing HTML, CSS, or JavaScript to build your page.</p>
</div>`,
    css: `body {
  font-family: system-ui, sans-serif;
  background: #050505;
  color: #fafafa;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
}
.wrapper {
  text-align: center;
}`,
    js: `console.log('Sayre blank page ready!');`
  }
};

// ============================================================================
// DETERMINISTIC SVG QR CODE GENERATOR (Visual & Scannable-style matrix)
// ============================================================================
function QrCodeSvg({ value, size = 148 }) {
  const modules = 25;
  const grid = useMemo(() => {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const cells = Array.from({ length: modules }, () => Array(modules).fill(false));

    const drawFinder = (r0, c0) => {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const rr = r0 + r;
          const cc = c0 + c;
          if (rr < 0 || rr >= modules || cc < 0 || cc >= modules) continue;
          const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          const isOuterWhite = r === -1 || r === 7 || c === -1 || c === 7;
          cells[rr][cc] = !isOuterWhite && (isBorder || isCenter);
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(0, modules - 7);
    drawFinder(modules - 7, 0);

    let seed = Math.abs(hash) || 123456;
    const nextRand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        const inTopLeft = r < 8 && c < 8;
        const inTopRight = r < 8 && c >= modules - 8;
        const inBottomLeft = r >= modules - 8 && c < 8;
        if (inTopLeft || inTopRight || inBottomLeft) continue;
        if (r === 6 || c === 6) {
          cells[r][c] = (r + c) % 2 === 0;
        } else {
          cells[r][c] = nextRand() > 0.48;
        }
      }
    }
    return cells;
  }, [value]);

  const cellSize = size / (modules + 2);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-xl bg-white p-2 shadow-inner"
    >
      <rect width={size} height={size} fill="#ffffff" rx="8" />
      {grid.map((row, r) =>
        row.map((active, c) =>
          active ? (
            <rect
              key={`${r}-${c}`}
              x={(c + 1) * cellSize}
              y={(r + 1) * cellSize}
              width={cellSize + 0.15}
              height={cellSize + 0.15}
              rx={cellSize * 0.22}
              fill="#050505"
            />
          ) : null
        )
      )}
    </svg>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [isLoadingSharedSite, setIsLoadingSharedSite] = useState(false);

  const [htmlCode, setHtmlCode] = useState(TEMPLATES.portfolio.html);
  const [cssCode, setCssCode] = useState(TEMPLATES.portfolio.css);
  const [jsCode, setJsCode] = useState(TEMPLATES.portfolio.js);
  const [activeFile, setActiveFile] = useState('html'); // 'html' | 'css' | 'js'

  const [slug, setSlug] = useState(() => {
    const rand = Math.random().toString(36).substring(2, 6);
    return `syaire-${rand}`;
  });
  const [isEditingSlug, setIsEditingSlug] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);

  const [layoutMode, setLayoutMode] = useState('split'); // 'split' | 'code' | 'preview'
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [splitPercent, setSplitPercent] = useState(48);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);

  const [autoRefresh, setAutoRefresh] = useState(true);
  const [compiledDoc, setCompiledDoc] = useState('');
  const [iframeKey, setIframeKey] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);

  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [pagePassword, setPagePassword] = useState('');
  const [expiration, setExpiration] = useState('never'); // 'never' | '24h' | '7d'
  const [copiedPublished, setCopiedPublished] = useState(false);
  const [fullscreenHosted, setFullscreenHosted] = useState(false);
  const [hostedPasswordInput, setHostedPasswordInput] = useState('');
  const [hostedUnlocked, setHostedUnlocked] = useState(false);

  // Owner Authorization State for Slug Customization
  const [ownerPasswordInput, setOwnerPasswordInput] = useState('');
  const [ownerVerified, setOwnerVerified] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [publishedSites, setPublishedSites] = useState([]);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const workspaceRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
  }, []);

  // Authenticate with cloud backend on startup
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      }
    };
    initAuth();
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Listen to all published sites in real time for the Live Directory
  useEffect(() => {
    if (!user || !db) return;
    const sitesCol = collection(db, 'artifacts', appId, 'public', 'data', 'published_sites');
    const unsub = onSnapshot(
      sitesCol,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        items.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
        setPublishedSites(items);
      },
      (err) => {
        console.error('Directory listener error:', err);
      }
    );
    return () => unsub();
  }, [user]);

  // Load published website automatically if URL contains ?site=<slug> (non-blob hosts)
  useEffect(() => {
    if (!user || !db) return;
    if (window.location.protocol === 'blob:') return;
    const params = new URLSearchParams(window.location.search);
    const sharedSiteSlug = params.get('site');
    if (!sharedSiteSlug) return;

    const loadSharedSite = async () => {
      setIsLoadingSharedSite(true);
      try {
        const siteRef = doc(db, 'artifacts', appId, 'public', 'data', 'published_sites', sharedSiteSlug);
        const snap = await getDoc(siteRef);
        if (snap.exists()) {
          const data = snap.data();
          setHtmlCode(data.html || '');
          setCssCode(data.css || '');
          setJsCode(data.js || '');
          setSlug(data.slug || sharedSiteSlug);
          if (data.passwordEnabled && data.pagePassword) {
            setPasswordEnabled(true);
            setPagePassword(data.pagePassword);
            setHostedUnlocked(false);
          } else {
            setPasswordEnabled(false);
            setHostedUnlocked(true);
          }
          if (data.expiration) setExpiration(data.expiration);
          setFullscreenHosted(true);
        } else {
          showToast(`Published site "${sharedSiteSlug}" not found`, 'error');
        }
      } catch (err) {
        console.error('Failed to load shared site:', err);
        showToast('Error loading published site', 'error');
      } finally {
        setIsLoadingSharedSite(false);
      }
    };

    loadSharedSite();
  }, [user, showToast]);

  const cleanSlug = useMemo(() => {
    const formatted = slug
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return formatted || 'syaire-page';
  }, [slug]);

  // Clean custom domain URL (never exposes raw blob:// sandbox URLs)
  const realLiveUrl = useMemo(() => {
    return `https://syaire.dev/${cleanSlug}`;
  }, [cleanSlug]);

  // ============================================================================
  // BUNDLE BUILDER & LIVE PREVIEW COMPILER
  // ============================================================================
  const buildBundle = useCallback(
    (includeConsoleInterceptor = true) => {
      const consoleHook = includeConsoleInterceptor
        ? `<script>
(function() {
  const send = (level, args) => {
    try {
      const message = args.map(a => {
        if (typeof a === 'object' && a !== null) {
          try { return JSON.stringify(a); } catch { return String(a); }
        }
        return String(a);
      }).join(' ');
      window.parent.postMessage({ source: 'syaire-preview', level, message }, '*');
    } catch (e) {}
  };
  ['log', 'info', 'warn', 'error'].forEach(level => {
    const orig = console[level];
    console[level] = function(...args) {
      send(level, args);
      if (orig) orig.apply(console, args);
    };
  });
  window.addEventListener('error', (e) => {
    send('error', [e.message || 'Runtime Error']);
  });
})();
</script>`
        : '';

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${cleanSlug} — Hosted by Syaire</title>
  <style>${cssCode}</style>
  ${consoleHook}
</head>
<body>
${htmlCode}
<script>
try {
${jsCode}
} catch (err) {
  console.error(err.message || err);
}
</script>
</body>
</html>`;
    },
    [htmlCode, cssCode, jsCode, cleanSlug]
  );

  // Auto-compile preview when code changes
  useEffect(() => {
    if (!autoRefresh) return;
    const timer = setTimeout(() => {
      setCompiledDoc(buildBundle(true));
    }, 220);
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode, autoRefresh, buildBundle]);

  // Initial compile on mount
  useEffect(() => {
    setCompiledDoc(buildBundle(true));
  }, []);

  // Listen to sandboxed iframe console messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.source === 'syaire-preview') {
        const now = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        setLogs((prev) => [
          ...prev.slice(-99),
          {
            id: `${Date.now()}-${Math.random()}`,
            level: event.data.level || 'log',
            message: String(event.data.message ?? ''),
            timestamp: now
          }
        ]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Split-pane drag resizing
  useEffect(() => {
    if (!isDraggingSplit) return;
    const handleMove = (e) => {
      if (!workspaceRef.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = workspaceRef.current.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setSplitPercent(Math.min(78, Math.max(22, pct)));
    };
    const handleUp = () => setIsDraggingSplit(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDraggingSplit]);

  const currentCode =
    activeFile === 'html' ? htmlCode : activeFile === 'css' ? cssCode : jsCode;

  const setCurrentCode = (val) => {
    if (activeFile === 'html') setHtmlCode(val);
    else if (activeFile === 'css') setCssCode(val);
    else setJsCode(val);
  };

  const lineCount = useMemo(() => {
    return Math.max(1, currentCode.split('\n').length);
  }, [currentCode]);

  const handleTextareaScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Real working browser URL that opens the compiled website directly when pasted
  // Includes the custom website name in the URL fragment (#syaire.dev/<slug>) so your custom name is visible and preserved
  const executableShareUrl = useMemo(() => {
    const fullHtml = buildBundle(false);
    return `data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}#syaire.dev/${cleanSlug}`;
  }, [buildBundle, cleanSlug]);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const updated = currentCode.substring(0, start) + '  ' + currentCode.substring(end);
      setCurrentCode(updated);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      });
    }
  };

  const handleFormatCode = () => {
    const trimmed = currentCode
      .split('\n')
      .map((line) => line.replace(/\s+$/, ''))
      .join('\n')
      .trim();
    setCurrentCode(trimmed);
    showToast(`Formatted ${activeFile.toUpperCase()}`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const raw = String(ev.target?.result || '');
      const styleMatch = raw.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const scriptMatch = raw.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

      if (styleMatch) setCssCode(styleMatch[1].trim());
      if (scriptMatch) setJsCode(scriptMatch[1].trim());
      if (bodyMatch) {
        const cleanedBody = bodyMatch[1]
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .trim();
        setHtmlCode(cleanedBody);
      } else {
        setHtmlCode(raw);
      }
      showToast(`Imported ${file.name}`);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadBundle = () => {
    const fullHtml = buildBundle(false);
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cleanSlug}.html`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${cleanSlug}.html`);
  };

  const handleSelectTemplate = (key) => {
    const tpl = TEMPLATES[key];
    if (!tpl) return;
    setHtmlCode(tpl.html);
    setCssCode(tpl.css);
    setJsCode(tpl.js);
    showToast(`Loaded "${tpl.name}"`);
  };

  const handleManualRun = () => {
    setLogs([]);
    setCompiledDoc(buildBundle(true));
    setIframeKey((k) => k + 1);
    showToast('Preview reloaded');
  };

  // ============================================================================
  // PUBLISH & SHARE FLOW (REAL CLOUD PERSISTENCE)
  // ============================================================================
  const OWNER_SECRET_CODE = 'Pp223Thebaby42';

  const saveSiteToCloud = useCallback(
    async (targetSlug, opts = {}) => {
      if (!db || !user) return false;
      try {
        const siteRef = doc(db, 'artifacts', appId, 'public', 'data', 'published_sites', targetSlug);
        await setDoc(siteRef, {
          slug: targetSlug,
          html: htmlCode,
          css: cssCode,
          js: jsCode,
          passwordEnabled: opts.passwordEnabled ?? passwordEnabled,
          pagePassword: opts.pagePassword ?? pagePassword,
          expiration: opts.expiration ?? expiration,
          updatedAt: new Date().toISOString(),
          owner: 'Syaire Chavers'
        });
        return true;
      } catch (err) {
        console.error('Publish error:', err);
        return false;
      }
    },
    [user, htmlCode, cssCode, jsCode, passwordEnabled, pagePassword, expiration]
  );

  const handleOpenPublish = async () => {
    setIsPublishOpen(true);
    setIsPublishing(true);
    setPublishedUrl('');

    const ok = await saveSiteToCloud(cleanSlug);
    setIsPublishing(false);
    setPublishedUrl(executableShareUrl);
    if (ok) {
      showToast(`Published live as "${cleanSlug}"!`);
    } else {
      showToast('Published live link ready!');
    }
  };

  // Re-sync settings to cloud when password/expiration/slug changes while modal is open
  const handleSyncSettingsToCloud = async (overrides = {}) => {
    const nextSlug = overrides.slug ?? cleanSlug;
    await saveSiteToCloud(nextSlug, overrides);
    if (!overrides.silent) {
      showToast(`Saved live site: syaire.dev/${nextSlug}`);
    }
  };

  // Auto-save whenever owner edits the custom URL slug
  useEffect(() => {
    if (!ownerVerified || !user || !db) return;
    const timer = setTimeout(() => {
      saveSiteToCloud(cleanSlug);
    }, 500);
    return () => clearTimeout(timer);
  }, [cleanSlug, ownerVerified, user, saveSiteToCloud]);

  const handleLaunchPublishedSite = (site) => {
    setHtmlCode(site.html || '');
    setCssCode(site.css || '');
    setJsCode(site.js || '');
    setSlug(site.slug || site.id);
    if (site.passwordEnabled && site.pagePassword) {
      setPasswordEnabled(true);
      setPagePassword(site.pagePassword);
      setHostedUnlocked(false);
    } else {
      setPasswordEnabled(false);
      setPagePassword('');
      setHostedUnlocked(true);
    }
    setExpiration(site.expiration || 'never');
    setIsDirectoryOpen(false);
    setHostedPasswordInput('');
    setFullscreenHosted(true);
  };

  const handleVerifyOwner = (e) => {
    e.preventDefault();
    if (ownerPasswordInput.trim() === OWNER_SECRET_CODE) {
      setOwnerVerified(true);
      setIsOwnerModalOpen(false);
      setIsEditingSlug(true);
      setOwnerPasswordInput('');
      showToast('Owner access granted — you can now edit the URL name');
    } else {
      showToast('Incorrect owner password', 'error');
    }
  };

  const handleOpenNewTabBlob = () => {
    const fullHtml = buildBundle(false);
    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}#syaire.dev/${cleanSlug}`;
    const win = window.open('', '_blank');
    if (win) {
      win.document.open();
      win.document.write(fullHtml);
      win.document.close();
      try {
        win.history.replaceState(null, '', `#syaire.dev/${cleanSlug}`);
      } catch {}
    } else {
      window.open(dataUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenHostedOverlay = async () => {
    await saveSiteToCloud(cleanSlug);
    setIsPublishOpen(false);
    setHostedUnlocked(!passwordEnabled || !pagePassword.trim());
    setHostedPasswordInput('');
    setFullscreenHosted(true);
  };

  // Reliable iFrame-compatible clipboard copy using execCommand fallback
  const copyText = (text, setFlag) => {
    let copied = false;
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copied = document.execCommand('copy');
      document.body.removeChild(textArea);
    } catch {
      copied = false;
    }

    if (!copied && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }

    setFlag(true);
    setTimeout(() => setFlag(false), 2200);
    showToast(`Copied: ${text}`);
  };

  const bundleBytes = useMemo(() => {
    return new Blob([htmlCode, cssCode, jsCode]).size;
  }, [htmlCode, cssCode, jsCode]);

  const formattedSize =
    bundleBytes < 1024
      ? `${bundleBytes} B`
      : `${(bundleBytes / 1024).toFixed(1)} KB`;

  const viewportWidthClass =
    viewport === 'mobile'
      ? 'w-[375px]'
      : viewport === 'tablet'
      ? 'w-[768px]'
      : 'w-full';

  const viewportLabel =
    viewport === 'mobile' ? '375px' : viewport === 'tablet' ? '768px' : '100%';

  // ============================================================================
  // LOADING SCREEN WHEN OPENING A PUBLISHED LINK
  // ============================================================================
  if (isLoadingSharedSite) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#050505] text-zinc-100">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-red-500 border-t-transparent mb-4" />
        <p className="text-sm font-semibold text-white">Loading Syaire Hosted Site...</p>
        <p className="mt-1 text-xs font-mono text-zinc-500">Owner: Syaire Chavers</p>
      </div>
    );
  }

  // ============================================================================
  // FULLSCREEN SIMULATED LIVE HOSTED VIEW
  // ============================================================================
  if (fullscreenHosted) {
    return (
      <div className="flex h-screen w-screen flex-col bg-[#050505] text-zinc-100 select-none">
        <div className="flex items-center justify-between border-b border-red-950/60 bg-[#0a0a0d] px-4 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-400 border border-red-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              SAYRE UPLOAD LIVE
            </span>
            <span className="font-mono text-xs text-zinc-400 hidden sm:inline">
              {realLiveUrl}
            </span>
            {expiration !== 'never' && (
              <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300 border border-amber-500/20">
                Expires in {expiration}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenNewTabBlob}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition"
            >
              <ExternalLink className="h-3.5 w-3.5 text-red-400" />
              Open Raw Tab
            </button>
            <button
              onClick={() => {
                setFullscreenHosted(false);
                if (window.location.search.includes('site=')) {
                  const base = window.location.href.split('?')[0];
                  window.history.replaceState({}, '', base);
                }
              }}
              className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 transition"
            >
              <Code2 className="h-3.5 w-3.5" />
              Back to Studio
            </button>
          </div>
        </div>

        {!hostedUnlocked ? (
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl border border-red-950/80 bg-[#0f0f12] p-6 text-center shadow-2xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-semibold text-white">Protected Page</h2>
              <p className="mt-1 text-xs text-zinc-400">
                Enter the password configured for <span className="font-mono text-zinc-300">{cleanSlug}</span>
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (hostedPasswordInput === pagePassword) {
                    setHostedUnlocked(true);
                  } else {
                    showToast('Incorrect password', 'error');
                  }
                }}
                className="mt-4 space-y-3"
              >
                <input
                  type="password"
                  value={hostedPasswordInput}
                  onChange={(e) => setHostedPasswordInput(e.target.value)}
                  placeholder="Enter access password..."
                  className="w-full rounded-xl border border-zinc-800 bg-[#050505] px-3.5 py-2.5 text-sm text-white outline-none focus:border-red-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-500 transition"
                >
                  Unlock Live Site
                </button>
              </form>
            </div>
          </div>
        ) : (
          <iframe
            title="Live Hosted Site"
            srcDoc={buildBundle(false)}
            sandbox="allow-scripts allow-forms allow-modals allow-popups"
            className="h-full w-full flex-1 border-0 bg-white"
          />
        )}
      </div>
    );
  }

  // ============================================================================
  // MAIN STUDIO INTERFACE (BLACK & RED)
  // ============================================================================
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#050505] text-zinc-100 select-none">
      {/* ===================================================================== */}
      {/* TOP NAVIGATION BAR                                                    */}
      {/* ===================================================================== */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-zinc-900 bg-[#070709] px-3 sm:px-4 z-20">
        {/* Left: Brand + Live Custom Slug Editor */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 via-rose-600 to-red-900 shadow-lg shadow-red-600/30">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold tracking-tight text-sm sm:text-base bg-gradient-to-r from-white via-zinc-200 to-red-500 bg-clip-text text-transparent">
              Syaire
            </span>
          </div>

          <div className="h-4 w-[1px] bg-zinc-800 hidden md:block" />

          {/* Custom Slug Pill */}
          <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-[#0d0d12] px-2.5 py-1 text-xs shadow-inner min-w-0">
            <Globe className="h-3.5 w-3.5 text-red-500 shrink-0 hidden sm:block" />
            <span className="text-zinc-500 font-mono hidden lg:inline">syaire.dev/</span>
            {isEditingSlug ? (
              ownerVerified ? (
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  onBlur={() => {
                    setIsEditingSlug(false);
                    saveSiteToCloud(cleanSlug);
                    showToast(`URL updated to syaire.dev/${cleanSlug}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditingSlug(false);
                      saveSiteToCloud(cleanSlug);
                      showToast(`URL updated to syaire.dev/${cleanSlug}`);
                    }
                  }}
                  className="w-32 sm:w-44 bg-black px-2 py-0.5 font-mono text-xs text-white rounded border border-red-500 outline-none select-text"
                  autoFocus
                />
              ) : (
                <span className="text-xs text-red-400 font-medium">Locked (Owner Only)</span>
              )
            ) : (
              <button
                onClick={() => {
                  if (!ownerVerified) {
                    setIsOwnerModalOpen(true);
                  } else {
                    setIsEditingSlug(true);
                  }
                }}
                title="Click to customize URL name (Owner password required)"
                className="truncate max-w-[120px] sm:max-w-[180px] font-mono font-medium text-zinc-200 hover:text-red-400 transition text-left flex items-center gap-1"
              >
                {cleanSlug}
                {!ownerVerified && <Lock className="h-3 w-3 text-red-500 inline" />}
              </button>
            )}

            <button
              onClick={() => copyText(realLiveUrl, setCopiedSlug)}
              title="Copy Live URL"
              className="ml-1 rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
            >
              {copiedSlug ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Center: View Mode & Device Viewport Switchers */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-red-950/60 bg-[#0f0f12] p-1">
            <button
              onClick={() => setLayoutMode('code')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                layoutMode === 'code'
                  ? 'bg-red-950/80 text-white shadow-sm border border-red-800/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Code</span>
            </button>
            <button
              onClick={() => setLayoutMode('split')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                layoutMode === 'split'
                  ? 'bg-red-950/80 text-white shadow-sm border border-red-800/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Columns className="h-3.5 w-3.5" />
              <span>Split</span>
            </button>
            <button
              onClick={() => setLayoutMode('preview')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                layoutMode === 'preview'
                  ? 'bg-red-950/80 text-white shadow-sm border border-red-800/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </button>
          </div>

          {layoutMode !== 'code' && (
            <div className="flex items-center rounded-xl border border-red-950/60 bg-[#0f0f12] p-1">
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop View (100%)"
                className={`rounded-lg p-1.5 transition ${
                  viewport === 'desktop'
                    ? 'bg-red-500/20 text-red-300'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                title="Tablet View (768px)"
                className={`rounded-lg p-1.5 transition ${
                  viewport === 'tablet'
                    ? 'bg-red-500/20 text-red-300'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Tablet className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="Mobile View (375px)"
                className={`rounded-lg p-1.5 transition ${
                  viewport === 'mobile'
                    ? 'bg-red-500/20 text-red-300'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Templates Dropdown & Crimson Publish Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsDirectoryOpen(true)}
            title="Browse all published websites"
            className="flex items-center gap-1.5 rounded-xl border border-red-950/60 bg-[#0f0f12] px-2.5 py-1.5 text-xs font-medium text-zinc-200 hover:border-red-700 hover:text-white transition"
          >
            <FolderOpen className="h-3.5 w-3.5 text-red-400" />
            <span className="hidden sm:inline">Live Sites</span>
            <span className="rounded-full bg-red-600/20 px-1.5 py-0.2 text-[10px] font-mono text-red-300">
              {publishedSites.length}
            </span>
          </button>

          <div className="relative">
            <select
              aria-label="Starter Templates"
              onChange={(e) => handleSelectTemplate(e.target.value)}
              defaultValue="portfolio"
              className="appearance-none rounded-xl border border-red-950/60 bg-[#0f0f12] pl-3 pr-8 py-1.5 text-xs font-medium text-zinc-200 hover:border-red-800/50 focus:border-red-500 outline-none cursor-pointer transition"
            >
              <option value="portfolio">✦ Portfolio Starter</option>
              <option value="landing">✦ Product Waitlist</option>
              <option value="chart">✦ Interactive Chart</option>
              <option value="blank">✦ Blank Canvas</option>
            </select>
            <Layers className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          </div>
          {/* Glowing Publish Live CTA */}
          <button
            onClick={handleOpenPublish}
            className="group relative flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-[length:200%_auto] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:shadow-[0_0_28px_rgba(220,38,38,0.7)] hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-red-200 group-hover:rotate-12 transition-transform" />
            <span>Publish Live</span>
          </button>
        </div>
      </header>

      {/* Mobile View Mode Bar */}
      <div className="flex md:hidden items-center justify-between border-b border-red-950/60 bg-[#0a0a0d] px-3 py-1.5 text-xs">
        <div className="flex items-center gap-1">
          {['code', 'split', 'preview'].map((mode) => (
            <button
              key={mode}
              onClick={() => setLayoutMode(mode)}
              className={`rounded-lg px-2.5 py-1 capitalize font-medium ${
                layoutMode === mode ? 'bg-red-600 text-white' : 'text-zinc-400'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <span className="font-mono text-[11px] text-zinc-500">{formattedSize}</span>
      </div>

      {/* ===================================================================== */}
      {/* MAIN SPLIT-PANE WORKSPACE                                             */}
      {/* ===================================================================== */}
      <div
        ref={workspaceRef}
        className="relative flex flex-1 min-h-0 w-full overflow-hidden"
      >
        {/* ------------------------------------------------------------------- */}
        {/* LEFT PANE: MULTI-TAB CODE EDITOR                                    */}
        {/* ------------------------------------------------------------------- */}
        {layoutMode !== 'preview' && (
          <section
            style={{
              width: layoutMode === 'split' ? `${splitPercent}%` : '100%'
            }}
            className="flex h-full flex-col bg-[#070709] border-r border-red-950/40 min-w-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-950/50 bg-[#0a0a0d]/75 px-3 py-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveFile('html')}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono transition ${
                    activeFile === 'html'
                      ? 'bg-red-950/60 text-orange-300 border border-red-800/60 shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <FileCode2 className="h-3.5 w-3.5 text-orange-400" />
                  <span>index.html</span>
                </button>

                <button
                  onClick={() => setActiveFile('css')}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono transition ${
                    activeFile === 'css'
                      ? 'bg-red-950/60 text-sky-300 border border-red-800/60 shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <FileType className="h-3.5 w-3.5 text-sky-400" />
                  <span>styles.css</span>
                </button>

                <button
                  onClick={() => setActiveFile('js')}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono transition ${
                    activeFile === 'js'
                      ? 'bg-red-950/60 text-amber-300 border border-red-800/60 shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <Braces className="h-3.5 w-3.5 text-amber-400" />
                  <span>script.js</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleFormatCode}
                  title="Format current file"
                  className="flex items-center gap-1 rounded-lg border border-red-950/60 bg-[#0f0f12] px-2.5 py-1 text-xs text-zinc-300 hover:border-red-800 hover:text-white transition"
                >
                  <Wand2 className="h-3 w-3 text-red-400" />
                  <span className="hidden sm:inline">Format</span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".html,.htm"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload a local .html file"
                  className="flex items-center gap-1 rounded-lg border border-red-950/60 bg-[#0f0f12] px-2.5 py-1 text-xs text-zinc-300 hover:border-red-800 hover:text-white transition"
                >
                  <Upload className="h-3 w-3 text-red-400" />
                  <span className="hidden sm:inline">Upload .html</span>
                </button>

                <button
                  onClick={handleDownloadBundle}
                  title="Download self-contained .html bundle"
                  className="flex items-center gap-1 rounded-lg border border-red-950/60 bg-[#0f0f12] px-2.5 py-1 text-xs text-zinc-300 hover:border-red-800 hover:text-white transition"
                >
                  <Download className="h-3 w-3 text-rose-400" />
                  <span className="hidden lg:inline">Bundle</span>
                </button>
              </div>
            </div>

            <div className="relative flex flex-1 min-h-0 overflow-hidden font-mono text-[13px] leading-6">
              <div
                ref={lineNumbersRef}
                aria-hidden="true"
                className="w-12 shrink-0 overflow-hidden border-r border-red-950/30 bg-[#050505]/60 py-4 pr-3 text-right text-zinc-600 select-none"
              >
                {Array.from({ length: lineCount }, (_, idx) => (
                  <div key={idx} className="leading-6">
                    {idx + 1}
                  </div>
                ))}
              </div>

              <textarea
                ref={textareaRef}
                value={currentCode}
                onChange={(e) => setCurrentCode(e.target.value)}
                onScroll={handleTextareaScroll}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                placeholder={`Write your ${activeFile.toUpperCase()} code here...`}
                className="flex-1 resize-none bg-transparent p-4 font-mono text-[13px] leading-6 text-zinc-100 placeholder-zinc-600 outline-none selection:bg-red-600/30 select-text"
              />
            </div>

            {/* Editor Status Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900 bg-[#070709] px-3.5 py-2 text-[11px] font-mono text-zinc-500 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-zinc-400">
                  {activeFile === 'html'
                    ? 'HTML5'
                    : activeFile === 'css'
                    ? 'CSS3'
                    : 'ES2024 JS'}
                </span>
                <span>{lineCount} lines</span>
                <span>Bundle: {formattedSize}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-zinc-400">Made by Syaire AI</span>
                <span className="text-red-400 font-semibold">Owner: Syaire Chavers</span>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* DRAGGABLE RESIZER HANDLE                                            */}
        {/* ------------------------------------------------------------------- */}
        {layoutMode === 'split' && (
          <div
            onMouseDown={() => setIsDraggingSplit(true)}
            onTouchStart={() => setIsDraggingSplit(true)}
            title="Drag to resize panes"
            className={`hidden md:flex w-1.5 shrink-0 cursor-col-resize items-center justify-center bg-[#0a0a0d] hover:bg-red-600 transition-colors z-10 ${
              isDraggingSplit ? 'bg-red-600' : ''
            }`}
          >
            <div className="h-8 w-0.5 rounded-full bg-zinc-700" />
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* RIGHT PANE: LIVE PREVIEW & MINI DEVELOPER CONSOLE                   */}
        {/* ------------------------------------------------------------------- */}
        {layoutMode !== 'code' && (
          <section
            style={{
              width: layoutMode === 'split' ? `${100 - splitPercent}%` : '100%'
            }}
            className="flex h-full flex-col bg-[#0a0a0d] min-w-0"
          >
            <div className="flex items-center justify-between gap-2 border-b border-red-950/50 bg-[#0f0f12] px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 mr-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>

                <button
                  onClick={handleManualRun}
                  title="Force Reload Preview"
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex flex-1 max-w-md items-center justify-between rounded-lg border border-red-950/60 bg-[#050505] px-3 py-1 text-xs font-mono text-zinc-400 truncate">
                <div className="flex items-center gap-1.5 truncate">
                  <Lock className="h-3 w-3 text-red-400 shrink-0" />
                  <span className="truncate text-zinc-300">syaire.dev/{cleanSlug}</span>
                </div>
                <span className="ml-2 rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-400 shrink-0">
                  {viewportLabel}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAutoRefresh((v) => !v)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                    autoRefresh
                      ? 'border-red-500/30 bg-red-500/10 text-red-300'
                      : 'border-zinc-800 bg-[#050505] text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      autoRefresh ? 'bg-red-500 animate-pulse' : 'bg-zinc-500'
                    }`}
                  />
                  <span className="hidden sm:inline">Auto</span>
                </button>

                {!autoRefresh && (
                  <button
                    onClick={handleManualRun}
                    className="flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-500 transition"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>Run</span>
                  </button>
                )}
              </div>
            </div>

            <div className="relative flex flex-1 min-h-0 items-center justify-center overflow-auto bg-[radial-gradient(#1f1f23_1px,transparent_1px)] [background-size:16px_16px] p-0 sm:p-3">
              {isDraggingSplit && <div className="absolute inset-0 z-20" />}

              <div
                className={`h-full ${viewportWidthClass} max-w-full transition-all duration-300 ease-out overflow-hidden bg-white shadow-2xl ${
                  viewport !== 'desktop'
                    ? 'rounded-2xl border-[6px] border-zinc-800'
                    : 'sm:rounded-xl sm:border sm:border-zinc-800'
                }`}
              >
                <iframe
                  key={iframeKey}
                  title="Live Preview Sandbox"
                  srcDoc={compiledDoc}
                  sandbox="allow-scripts allow-forms allow-modals allow-popups"
                  className="h-full w-full border-0 bg-white"
                />
              </div>
            </div>

            <div className="shrink-0 border-t border-red-950/50 bg-[#050505]">
              <div
                onClick={() => setIsConsoleOpen((o) => !o)}
                className="flex cursor-pointer items-center justify-between px-3.5 py-1.5 hover:bg-[#0f0f12] transition"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <Terminal className="h-3.5 w-3.5 text-red-400" />
                  <span>Console</span>
                  {logs.length > 0 && (
                    <span className="rounded-full bg-red-950/80 px-2 py-0.5 font-mono text-[10px] text-red-300 border border-red-800/40">
                      {logs.length}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {logs.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLogs([]);
                      }}
                      title="Clear console"
                      className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200 transition"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                  {isConsoleOpen ? (
                    <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                  ) : (
                    <ChevronUp className="h-3.5 w-3.5 text-zinc-500" />
                  )}
                </div>
              </div>

              {isConsoleOpen && (
                <div className="h-28 overflow-y-auto border-t border-red-950/30 px-3.5 py-2 font-mono text-xs space-y-1 select-text">
                  {logs.length === 0 ? (
                    <div className="text-zinc-600 italic py-2">
                      No console output yet. Logs, warnings, and runtime errors from your script will appear here.
                    </div>
                  ) : (
                    logs.map((entry) => (
                      <div
                        key={entry.id}
                        className={`flex items-start gap-2 rounded px-1.5 py-0.5 ${
                          entry.level === 'error'
                            ? 'bg-rose-500/10 text-rose-300'
                            : entry.level === 'warn'
                            ? 'bg-amber-500/10 text-amber-300'
                            : entry.level === 'info'
                            ? 'text-sky-300'
                            : 'text-zinc-300'
                        }`}
                      >
                        <span className="text-[10px] text-zinc-500 shrink-0 mt-0.5">
                          {entry.timestamp}
                        </span>
                        {entry.level === 'error' && (
                          <XCircle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        {entry.level === 'warn' && (
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        )}
                        {entry.level === 'info' && (
                          <Info className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                        )}
                        <span className="break-all">{entry.message}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* ===================================================================== */}
      {/* PUBLISH & SHARE MODAL                                                 */}
      {/* ===================================================================== */}
      {isPublishOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl border border-red-500/30 bg-[#0b0b0e] p-6 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsPublishOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            {isPublishing ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-red-500 border-t-transparent mb-4" />
                <h3 className="text-base font-semibold text-white">
                  Deploying to Syaire Global Edge CDN...
                </h3>
                <p className="mt-1 text-xs text-zinc-400 font-mono">
                  Bundling ({formattedSize})
                </p>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/25 text-red-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Published Successfully!
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Owner: Syaire Chavers • Powered by Syaire AI
                    </p>
                  </div>
                </div>

                {/* Live URL Copy & Owner Rename Box */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-zinc-400">
                      Working Browser Link (Paste in any tab to open live site)
                    </label>
                    {!ownerVerified ? (
                      <button
                        type="button"
                        onClick={() => setIsOwnerModalOpen(true)}
                        className="flex items-center gap-1 text-[11px] font-medium text-red-400 hover:text-red-300 transition"
                      >
                        <Lock className="h-3 w-3" />
                        <span>Unlock URL Rename</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-medium text-emerald-400">
                        ✓ Owner Unlocked
                      </span>
                    )}
                  </div>

                  {ownerVerified && (
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                        syaire.dev/
                      </span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        onBlur={() => handleSyncSettingsToCloud({ slug: cleanSlug })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.currentTarget.blur();
                          }
                        }}
                        placeholder="type-your-website-name"
                        className="flex-1 bg-zinc-950 rounded-lg border border-red-500/60 px-2.5 py-1.5 font-mono text-xs text-white outline-none focus:border-red-500 select-text"
                      />
                    </div>
                  )}

                  <div className="mb-2 flex items-center justify-between rounded-lg border border-red-950/50 bg-[#070709] px-3 py-1.5 text-xs font-mono">
                    <span className="text-zinc-400">Active Custom Domain:</span>
                    <span className="font-semibold text-red-400">{realLiveUrl}</span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-black p-1.5">
                    <input
                      type="text"
                      readOnly
                      value={executableShareUrl}
                      onClick={(e) => e.currentTarget.select()}
                      className="flex-1 bg-transparent pl-2 font-mono text-xs text-red-300 outline-none select-all truncate"
                    />
                    <button
                      onClick={() => copyText(executableShareUrl, setCopiedPublished)}
                      className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 transition shrink-0"
                    >
                      {copiedPublished ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3 rounded-xl border border-red-950/50 bg-[#0a0a0d] p-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
                        <Lock className="h-3.5 w-3.5 text-red-400" />
                        <span>Password Protect</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const next = !passwordEnabled;
                          setPasswordEnabled(next);
                          handleSyncSettingsToCloud({ passwordEnabled: next });
                        }}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                          passwordEnabled ? 'bg-red-600' : 'bg-zinc-700'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                            passwordEnabled ? 'translate-x-4' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {passwordEnabled && (
                      <input
                        type="text"
                        value={pagePassword}
                        onChange={(e) => setPagePassword(e.target.value)}
                        onBlur={() => handleSyncSettingsToCloud({ pagePassword })}
                        placeholder="Set access password..."
                        className="w-full rounded-lg border border-red-950/60 bg-[#050505] px-2.5 py-1.5 text-xs text-white outline-none focus:border-red-500 select-text"
                      />
                    )}

                    <div className="pt-1 border-t border-red-950/40">
                      <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-200 mb-1.5">
                        <Clock className="h-3.5 w-3.5 text-red-400" />
                        <span>Auto-Expiration</span>
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { id: 'never', label: 'Never' },
                          { id: '24h', label: '24h' },
                          { id: '7d', label: '7d' }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => {
                              setExpiration(opt.id);
                              handleSyncSettingsToCloud({ expiration: opt.id });
                            }}
                            className={`rounded-lg py-1 text-xs font-medium transition ${
                              expiration === opt.id
                                ? 'bg-red-600 text-white'
                                : 'bg-[#050505] text-zinc-400 hover:text-zinc-200 border border-red-950/40'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-red-950/50 bg-[#0a0a0d] p-3.5 text-center">
                    <QrCodeSvg value={realLiveUrl} size={116} />
                    <span className="mt-2 flex items-center gap-1 text-[11px] font-medium text-zinc-400">
                      <QrCode className="h-3 w-3 text-red-400" />
                      Scan to test on mobile
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleOpenHostedOverlay}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-600/30 hover:brightness-110 transition"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Open Fullscreen Live Preview</span>
                  </button>

                  <button
                    onClick={handleOpenNewTabBlob}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-red-950/60 bg-[#0a0a0d] px-4 py-2.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-red-400" />
                    <span>New Browser Tab</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* OWNER PASSWORD MODAL (FOR CUSTOM URL RENAMING)                        */}
      {/* ===================================================================== */}
      {isOwnerModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl border border-red-500/30 bg-[#0b0b0e] p-6 shadow-2xl">
            <button
              onClick={() => {
                setIsOwnerModalOpen(false);
                setOwnerPasswordInput('');
              }}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/10 border border-red-500/30 text-red-500">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-center text-base font-bold text-white">
              Owner Verification
            </h3>
            <p className="mt-1 text-center text-xs text-zinc-400">
              Enter the owner password to rename the custom website URL.
            </p>

            <form onSubmit={handleVerifyOwner} className="mt-4 space-y-3">
              <input
                type="password"
                value={ownerPasswordInput}
                onChange={(e) => setOwnerPasswordInput(e.target.value)}
                placeholder="Enter owner password..."
                className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white outline-none focus:border-red-500 select-text"
                autoFocus
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-600/30 hover:brightness-110 transition"
              >
                Unlock URL Rename
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* PUBLISHED SITES DIRECTORY MODAL                                       */}
      {/* ===================================================================== */}
      {isDirectoryOpen && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-red-500/30 bg-[#0b0b0e] p-6 shadow-2xl">
            <button
              onClick={() => setIsDirectoryOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 border border-red-500/30 text-red-500">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Published Syaire Sites</h3>
                <p className="text-xs text-zinc-400">
                  All websites saved to the cloud — click any site to open it live
                </p>
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {publishedSites.length === 0 ? (
                <div className="rounded-xl border border-zinc-900 bg-black p-6 text-center text-xs text-zinc-500">
                  No websites published yet. Click <span className="text-red-400 font-semibold">Publish Live</span> to deploy your first site!
                </div>
              ) : (
                publishedSites.map((site) => (
                  <div
                    key={site.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-[#070709] p-3 hover:border-red-500/40 transition"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-red-400 truncate">
                          syaire.dev/{site.slug || site.id}
                        </span>
                        {site.passwordEnabled && (
                          <Lock className="h-3 w-3 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-zinc-500">
                        Owner: {site.owner || 'Syaire Chavers'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleLaunchPublishedSite(site)}
                      className="shrink-0 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 transition"
                    >
                      Open Site
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* FLOATING TOAST FEEDBACK                                               */}
      {/* ===================================================================== */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-red-950/80 bg-[#0f0f12] px-3.5 py-2 text-xs font-medium text-zinc-100 shadow-xl backdrop-blur-md">
          <span
            className={`h-2 w-2 rounded-full ${
              toast.type === 'error' ? 'bg-rose-500' : 'bg-red-500'
            }`}
          />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}