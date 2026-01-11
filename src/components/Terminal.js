"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';

// ═══════════════════════════════════════════════════════════════════════════════
// TERMINAL CONFIGURATION - Ghostty-inspired settings
// ═══════════════════════════════════════════════════════════════════════════════

const TERM_CONFIG = {
  name: 'xterm-256color',
  version: '0.14.2',
  scrollback: 10000,
  cursorStyle: 'block', // block | beam | underline
  cursorBlink: true,
  cursorBlinkInterval: 530,
  fontSize: 14,
  lineHeight: 1.5,
  fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
  fontLigatures: true,
  bellStyle: 'visual',
  theme: 'ghostty-dark',
  gpu: true,
  cols: 120,
  rows: 40,
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANSI ESCAPE CODE PARSER - Real terminal color support
// ═══════════════════════════════════════════════════════════════════════════════

const ANSI_COLORS = {
  30: '#1a1b26', 31: '#f7768e', 32: '#9ece6a', 33: '#e0af68',
  34: '#7aa2f7', 35: '#bb9af7', 36: '#7dcfff', 37: '#c0caf5',
  90: '#414868', 91: '#f7768e', 92: '#9ece6a', 93: '#e0af68',
  94: '#7aa2f7', 95: '#bb9af7', 96: '#7dcfff', 97: '#c0caf5',
  40: '#1a1b26', 41: '#f7768e', 42: '#9ece6a', 43: '#e0af68',
  44: '#7aa2f7', 45: '#bb9af7', 46: '#7dcfff', 47: '#c0caf5',
};

const ANSI_256_COLORS = (() => {
  const colors = [];
  const standard = [
    '#000000', '#cd0000', '#00cd00', '#cdcd00', '#0000ee', '#cd00cd', '#00cdcd', '#e5e5e5',
    '#7f7f7f', '#ff0000', '#00ff00', '#ffff00', '#5c5cff', '#ff00ff', '#00ffff', '#ffffff'
  ];
  colors.push(...standard);
  const levels = [0, 95, 135, 175, 215, 255];
  for (let r = 0; r < 6; r++) {
    for (let g = 0; g < 6; g++) {
      for (let b = 0; b < 6; b++) {
        colors.push(`rgb(${levels[r]}, ${levels[g]}, ${levels[b]})`);
      }
    }
  }
  for (let i = 0; i < 24; i++) {
    const v = 8 + i * 10;
    colors.push(`rgb(${v}, ${v}, ${v})`);
  }
  return colors;
})();

const parseAnsi = (text) => {
  const segments = [];
  const regex = /\x1b\[([0-9;]*)m/g;
  let lastIndex = 0;
  let currentStyle = {};
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), style: { ...currentStyle } });
    }
    const codes = match[1].split(';').map(Number);
    for (let i = 0; i < codes.length; i++) {
      const code = codes[i];
      if (code === 0) currentStyle = {};
      else if (code === 1) currentStyle.fontWeight = 'bold';
      else if (code === 2) currentStyle.opacity = 0.7;
      else if (code === 3) currentStyle.fontStyle = 'italic';
      else if (code === 4) currentStyle.textDecoration = 'underline';
      else if (code === 5 || code === 6) currentStyle.animation = 'blink 1s step-end infinite';
      else if (code === 7) currentStyle.filter = 'invert(1)';
      else if (code === 8) currentStyle.opacity = 0;
      else if (code === 9) currentStyle.textDecoration = 'line-through';
      else if (code >= 30 && code <= 37) currentStyle.color = ANSI_COLORS[code];
      else if (code === 38 && codes[i + 1] === 5) {
        currentStyle.color = ANSI_256_COLORS[codes[i + 2]];
        i += 2;
      }
      else if (code === 38 && codes[i + 1] === 2) {
        currentStyle.color = `rgb(${codes[i + 2]}, ${codes[i + 3]}, ${codes[i + 4]})`;
        i += 4;
      }
      else if (code >= 40 && code <= 47) currentStyle.backgroundColor = ANSI_COLORS[code];
      else if (code >= 90 && code <= 97) currentStyle.color = ANSI_COLORS[code];
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), style: { ...currentStyle } });
  }
  return segments.length > 0 ? segments : [{ text, style: {} }];
};

// ═══════════════════════════════════════════════════════════════════════════════
// SHELL ENVIRONMENT SIMULATION
// ═══════════════════════════════════════════════════════════════════════════════

const SHELL_ENV = {
  USER: 'aadit',
  HOME: '/home/aadit',
  PWD: '/home/aadit',
  SHELL: '/usr/bin/zsh',
  TERM: 'xterm-256color',
  LANG: 'en_US.UTF-8',
  EDITOR: 'nvim',
  PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
  COLORTERM: 'truecolor',
  TERM_PROGRAM: 'ghostty',
  TERM_PROGRAM_VERSION: '0.14.2',
  XDG_SESSION_TYPE: 'tty',
  GIT_BRANCH: 'main',
  NODE_VERSION: 'v20.10.0',
  HOSTNAME: 'portfolio',
};

const FILESYSTEM = {
  '/home/aadit': {
    type: 'dir',
    contents: ['about.txt', 'skills.txt', 'socials.txt', 'projects/', '.config/', '.ssh/', 'resume.pdf', '.zshrc', '.gitconfig']
  },
  '/home/aadit/projects': {
    type: 'dir',
    contents: ['portfolio/', 'dotfiles/', 'scripts/']
  },
  '/home/aadit/.config': {
    type: 'dir',
    contents: ['nvim/', 'ghostty/', 'tmux/']
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ASCII ART & CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const ASCII_BANNER = `\x1b[38;5;79m
    ██████╗  █████╗ ██████╗ ██╗████████╗   ███████╗██╗  ██╗
   ██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝   ██╔════╝██║  ██║
   ███████║███████║██║  ██║██║   ██║      ███████╗███████║
   ██╔══██║██╔══██║██║  ██║██║   ██║      ╚════██║██╔══██║
   ██║  ██║██║  ██║██████╔╝██║   ██║   ██╗███████║██║  ██║
   ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝   ╚═╝╚══════╝╚═╝  ╚═╝
\x1b[0m`;

const ASCII_BANNER_MOBILE = `\x1b[38;5;79m
  █████╗  █████╗ ██████╗ ██╗████████╗
 ██╔══██╗██╔══██╗██╔══██╗██║╚══██╔══╝
 ███████║███████║██║  ██║██║   ██║
 ██╔══██║██╔══██║██║  ██║██║   ██║
 ██║  ██║██║  ██║██████╔╝██║   ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝
          ███████╗██╗  ██╗
          ██╔════╝██║  ██║
          ███████╗███████║
          ╚════██║██╔══██║
       ██╗███████║██║  ██║
       ╚═╝╚══════╝╚═╝  ╚═╝
\x1b[0m`;

const SYSTEM_INFO = `\x1b[1;38;5;79maadit.sh\x1b[0m \x1b[38;5;244m—\x1b[0m \x1b[38;5;250mv2.0.0\x1b[0m \x1b[38;5;244m(pid: %%PID%%)\x1b[0m

\x1b[38;5;79m◉\x1b[0m \x1b[1mCS & Math\x1b[0m @ Texas A&M
\x1b[38;5;79m◉\x1b[0m Building for the web

`;

const HELP_TEXT = `
\x1b[1;38;5;79m━━━ COMMANDS ━━━\x1b[0m

\x1b[1;38;5;250mNavigation\x1b[0m \x1b[38;5;244m(use directly or with 'cd')\x1b[0m
  \x1b[38;5;79mabout\x1b[0m      Who I am
  \x1b[38;5;79mskills\x1b[0m     Technical stack
  \x1b[38;5;79mprojects\x1b[0m   View my projects
  \x1b[38;5;79msocials\x1b[0m    Find me online
  \x1b[38;5;79mresume\x1b[0m     Download resume

\x1b[1;38;5;250mMedia\x1b[0m
  \x1b[38;5;79mreviews\x1b[0m    Film & TV reviews
  \x1b[38;5;79mmusic\x1b[0m      What I'm listening to

\x1b[1;38;5;250mInteractive\x1b[0m
  \x1b[38;5;79mchat\x1b[0m       Chat with AI Aadit

\x1b[1;38;5;250mSystem\x1b[0m
  \x1b[38;5;79mneofetch\x1b[0m   System info
  \x1b[38;5;79mls\x1b[0m         List files
  \x1b[38;5;79mclear\x1b[0m      Clear terminal

`;

const ABOUT_TEXT = `
\x1b[1;38;5;79m━━━ ABOUT ━━━\x1b[0m

Howdy, I'm \x1b[1;38;5;79mAadit Shah\x1b[0m.

I'm a Computer Science and Mathematics
student at \x1b[1mTexas A&M University\x1b[0m.

I build solutions for the web and
think about problems worth solving.

\x1b[1;38;5;250mCurrently interested in:\x1b[0m
  \x1b[38;5;79m❯\x1b[0m Full-stack development
  \x1b[38;5;79m❯\x1b[0m AI/ML applications

`;

const SKILLS_TEXT = `
\x1b[1;38;5;79m━━━ SKILLS ━━━\x1b[0m

\x1b[1;38;5;250mLanguages\x1b[0m
  \x1b[38;5;79m❯\x1b[0m JavaScript / TypeScript
  \x1b[38;5;79m❯\x1b[0m Python
  \x1b[38;5;79m❯\x1b[0m Java
  \x1b[38;5;79m❯\x1b[0m C++
  \x1b[38;5;79m❯\x1b[0m SQL

\x1b[1;38;5;250mFrontend\x1b[0m
  \x1b[38;5;79m❯\x1b[0m React / Next.js
  \x1b[38;5;79m❯\x1b[0m Tailwind CSS
  \x1b[38;5;79m❯\x1b[0m HTML / CSS

\x1b[1;38;5;250mBackend\x1b[0m
  \x1b[38;5;79m❯\x1b[0m Node.js / Express
  \x1b[38;5;79m❯\x1b[0m PostgreSQL
  \x1b[38;5;79m❯\x1b[0m MongoDB

\x1b[1;38;5;250mTools & Platforms\x1b[0m
  \x1b[38;5;79m❯\x1b[0m Git / GitHub
  \x1b[38;5;79m❯\x1b[0m AWS / Vercel / Railway
  \x1b[38;5;79m❯\x1b[0m Linux

`;

const SOCIALS_TEXT = `
\x1b[1;38;5;79m━━━ SOCIALS ━━━\x1b[0m

Find me on the internet:

\x1b[38;5;79m◉\x1b[0m \x1b[1mGitHub\x1b[0m
  \x1b[4;38;5;81mgithub.com/aadit2805\x1b[0m

\x1b[38;5;79m◉\x1b[0m \x1b[1mLinkedIn\x1b[0m
  \x1b[4;38;5;81mlinkedin.com/in/aadit2805\x1b[0m

\x1b[38;5;79m◉\x1b[0m \x1b[1mTwitter\x1b[0m
  \x1b[4;38;5;81mtwitter.com/aadit2805\x1b[0m

\x1b[38;5;79m◉\x1b[0m \x1b[1mEmail\x1b[0m
  \x1b[4;38;5;81maadit2805@gmail.com\x1b[0m

`;

const PROJECTS_TEXT = `
\x1b[1;38;5;79m━━━ PROJECTS ━━━\x1b[0m

\x1b[1;38;5;250m[1] GitaChat\x1b[0m
    \x1b[38;5;79m❯\x1b[0m Spiritual guidance from the Bhagavad Gita
    \x1b[38;5;244mSemantic search across 700+ verses with synthesized commentary\x1b[0m
    \x1b[38;5;244mStack:\x1b[0m Next.js, FastAPI, Pinecone, Sentence Transformers, OpenAI
    \x1b[4;38;5;81mgithub.com/aadit2805/gitachat.org\x1b[0m

\x1b[1;38;5;250m[2] Espress\x1b[0m
    \x1b[38;5;79m❯\x1b[0m Your personal coffee companion
    \x1b[38;5;244mTrack drinks, discover flavors, get personalized recommendations\x1b[0m
    \x1b[38;5;244mStack:\x1b[0m Next.js, Express.js, PostgreSQL, Claude AI, Google Maps
    \x1b[4;38;5;81mgithub.com/aadit2805/espress\x1b[0m

`;

const COMMANDS = [
  'help', 'about', 'projects', 'skills', 'reviews', 'music',
  'resume', 'socials', 'chat', 'clear', 'ls', 'pwd', 'cd',
  'cat', 'echo', 'env', 'whoami', 'date', 'neofetch', 'exit',
  'history', 'which', 'man', 'grep', 'head', 'tail', 'tree'
];

// Navigation commands that work with 'cd'
const NAV_COMMANDS = ['about', 'skills', 'projects', 'socials', 'resume', 'reviews', 'music'];

// ═══════════════════════════════════════════════════════════════════════════════
// TAB SESSION STATE
// ═══════════════════════════════════════════════════════════════════════════════

const createTabSession = (id, pid) => ({
  id,
  pid,
  name: 'zsh',
  lines: [],
  commandHistory: [],
  historyIndex: -1,
  currentInput: '',
  cursorPosition: 0,
  isInChatMode: false,
  chatHistory: [],
  isTyping: false,
  // Interactive mode state
  interactiveMode: null, // 'reviews' | 'music' | null
  reviewsState: {
    selectedIndex: 0,
    filterType: 'all',
    sortBy: 'date',
    sortDir: 'desc',
    searchQuery: '',
    viewingReview: null,
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// TERMINAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const Terminal = () => {
  // Tab management
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [nextTabId, setNextTabId] = useState(1);
  const [basePid, setBasePid] = useState(10000);

  // Global state
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState(0);
  const [bellFlash, setBellFlash] = useState(false);
  const [dimensions, setDimensions] = useState({ cols: 120, rows: 40 });
  const [uptime, setUptime] = useState(0);
  const [memoryInfo, setMemoryInfo] = useState({ used: 0, total: 0, percent: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Reviews data
  const [reviewsData, setReviewsData] = useState([]);

  const terminalRef = useRef(null);
  const hiddenInputRef = useRef(null);

  // Load reviews data
  useEffect(() => {
    import('../app/reviews/revdata.json').then(data => {
      setReviewsData(data.default || data);
    }).catch(() => setReviewsData([]));
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper to get appropriate banner
  const getBanner = useCallback(() => {
    return (typeof window !== 'undefined' && window.innerWidth < 640) ? ASCII_BANNER_MOBILE : ASCII_BANNER;
  }, []);

  // Initialize first tab
  useEffect(() => {
    const pid = Math.floor(Math.random() * 90000) + 10000;
    setBasePid(pid);
    const firstTab = createTabSession(1, pid);
    firstTab.lines = [
      { type: 'raw', content: getBanner() },
      { type: 'raw', content: SYSTEM_INFO.replace('%%PID%%', pid.toString()) },
    ];
    setTabs([firstTab]);
    setActiveTabId(1);
    setNextTabId(2);
  }, [getBanner]);

  // Get active tab
  const activeTab = useMemo(() => tabs.find(t => t.id === activeTabId), [tabs, activeTabId]);

  // Update active tab
  const updateActiveTab = useCallback((updates) => {
    setTabs(prev => prev.map(tab =>
      tab.id === activeTabId ? { ...tab, ...updates } : tab
    ));
  }, [activeTabId]);

  // Add new tab
  const addTab = useCallback(() => {
    const newPid = basePid + nextTabId;
    const newTab = createTabSession(nextTabId, newPid);
    newTab.lines = [
      { type: 'raw', content: getBanner() },
      { type: 'raw', content: SYSTEM_INFO.replace('%%PID%%', newPid.toString()) },
    ];
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(nextTabId);
    setNextTabId(prev => prev + 1);
  }, [basePid, nextTabId, getBanner]);

  // Close tab
  const closeTab = useCallback((tabId) => {
    setTabs(prev => {
      const newTabs = prev.filter(t => t.id !== tabId);
      if (newTabs.length === 0) {
        // Create new tab if closing last one
        const newPid = basePid + nextTabId;
        const newTab = createTabSession(nextTabId, newPid);
        newTab.lines = [
          { type: 'raw', content: getBanner() },
          { type: 'raw', content: SYSTEM_INFO.replace('%%PID%%', newPid.toString()) },
        ];
        setNextTabId(n => n + 1);
        setActiveTabId(nextTabId);
        return [newTab];
      }
      if (tabId === activeTabId) {
        const idx = prev.findIndex(t => t.id === tabId);
        const newActiveIdx = Math.min(idx, newTabs.length - 1);
        setActiveTabId(newTabs[newActiveIdx].id);
      }
      return newTabs;
    });
  }, [activeTabId, basePid, nextTabId, getBanner]);

  // Uptime counter & memory tracking
  useEffect(() => {
    const updateMemory = () => {
      try {
        // Try performance.memory (Chrome only, needs --enable-precise-memory-info flag for accurate results)
        const perfMemory = performance?.memory;
        if (perfMemory && perfMemory.usedJSHeapSize > 0) {
          const used = Math.round(perfMemory.usedJSHeapSize / 1024 / 1024);
          const total = Math.round(perfMemory.jsHeapSizeLimit / 1024 / 1024);
          const percent = ((used / total) * 100).toFixed(1);
          setMemoryInfo({ used, total, percent });
        } else {
          // Fallback: estimate based on deviceMemory or simulate realistic values
          const deviceMem = typeof navigator !== 'undefined' ? (navigator.deviceMemory || 8) : 8;
          const total = deviceMem * 1024;
          // Simulate realistic browser memory usage (varies between 80-200MB typically)
          const baseUsed = 80 + Math.floor(Math.random() * 40);
          setMemoryInfo(prev => {
            // Small random fluctuation from previous value for realism
            const fluctuation = Math.floor(Math.random() * 10) - 5;
            const newUsed = prev.used > 0 ? Math.max(50, prev.used + fluctuation) : baseUsed;
            return {
              used: newUsed,
              total,
              percent: ((newUsed / total) * 100).toFixed(1)
            };
          });
        }
      } catch (e) {
        // Final fallback
        setMemoryInfo({ used: 128, total: 8192, percent: '1.6' });
      }
    };

    updateMemory();
    const interval = setInterval(() => {
      setUptime(u => u + 1);
      updateMemory();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cursor blink
  useEffect(() => {
    if (!TERM_CONFIG.cursorBlink) return setCursorVisible(true);
    const interval = setInterval(() => setCursorVisible(v => !v), TERM_CONFIG.cursorBlinkInterval);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({ top: terminalRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [activeTab?.lines, activeTab?.currentInput]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (terminalRef.current) {
        const width = terminalRef.current.clientWidth;
        const charWidth = 8.4;
        const cols = Math.floor(width / charWidth);
        const rows = Math.floor(terminalRef.current.clientHeight / (TERM_CONFIG.fontSize * TERM_CONFIG.lineHeight));
        setDimensions({ cols, rows });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bell
  const triggerBell = useCallback(() => {
    if (TERM_CONFIG.bellStyle === 'visual') {
      setBellFlash(true);
      setTimeout(() => setBellFlash(false), 100);
    }
  }, []);

  // Focus handling
  const handleTerminalClick = () => hiddenInputRef.current?.focus();

  // Format uptime
  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Generate neofetch
  const generateNeofetch = useCallback(() => {
    return `
\x1b[38;5;79m                    'c.          \x1b[0m\x1b[1m${SHELL_ENV.USER}\x1b[0m@\x1b[1m${SHELL_ENV.HOSTNAME}\x1b[0m
\x1b[38;5;79m                 ,xNMM.          \x1b[38;5;244m────────────────────────\x1b[0m
\x1b[38;5;79m               .OMMMMo           \x1b[1;38;5;79mOS\x1b[0m: Web 3.0 (Portfolio Edition)
\x1b[38;5;79m               OMMM0,            \x1b[1;38;5;79mHost\x1b[0m: ${navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : navigator.userAgent.includes('Safari') ? 'Safari' : 'Browser'}
\x1b[38;5;79m     .;loddo:' loolloddol;.     \x1b[1;38;5;79mKernel\x1b[0m: Next.js 14.2.35
\x1b[38;5;79m   cKMMMMMMMMMMNWMMMMMMMMMM0:   \x1b[1;38;5;79mUptime\x1b[0m: ${formatUptime(uptime)}
\x1b[38;5;79m .KMMMMMMMMMMMMMMMMMMMMMMMWd.   \x1b[1;38;5;79mPackages\x1b[0m: 42 (npm)
\x1b[38;5;79m XMMMMMMMMMMMMMMMMMMMMMMMX.     \x1b[1;38;5;79mShell\x1b[0m: zsh 5.9
\x1b[38;5;79m;MMMMMMMMMMMMMMMMMMMMMMMM:      \x1b[1;38;5;79mResolution\x1b[0m: ${dimensions.cols}x${dimensions.rows}
\x1b[38;5;79m:MMMMMMMMMMMMMMMMMMMMMMMM:      \x1b[1;38;5;79mTerminal\x1b[0m: ghostty ${TERM_CONFIG.version}
\x1b[38;5;79m.MMMMMMMMMMMMMMMMMMMMMMMMX.     \x1b[1;38;5;79mCPU\x1b[0m: ${navigator.hardwareConcurrency || 8} cores
\x1b[38;5;79m kMMMMMMMMMMMMMMMMMMMMMMMMWd.   \x1b[1;38;5;79mGPU\x1b[0m: WebGL Renderer
\x1b[38;5;79m .XMMMMMMMMMMMMMMMMMMMMMMMMMMk  \x1b[1;38;5;79mMemory\x1b[0m: ${memoryInfo.used}MB / ${memoryInfo.total}MB (${memoryInfo.percent}%)
\x1b[38;5;79m  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
\x1b[38;5;79m    kMMMMMMMMMMMMMMMMMMMMMMd    \x1b[40m  \x1b[41m  \x1b[42m  \x1b[43m  \x1b[44m  \x1b[45m  \x1b[46m  \x1b[47m  \x1b[0m
\x1b[38;5;79m     ;KMMMMMMMWXXWMMMMMMMk.     \x1b[100m  \x1b[101m  \x1b[102m  \x1b[103m  \x1b[104m  \x1b[105m  \x1b[106m  \x1b[107m  \x1b[0m
\x1b[38;5;79m       .cooc,.    .,coo:.

`;
  }, [uptime, dimensions, memoryInfo]);

  // Generate reviews TUI
  const generateReviewsTUI = useCallback((state) => {
    const { selectedIndex, filterType, sortBy, sortDir, searchQuery: sq, viewingReview } = state;

    let filtered = reviewsData
      .filter(item => filterType === 'all' || item.type === filterType)
      .filter(item => !sq || item.title.toLowerCase().includes(sq.toLowerCase()));

    filtered = filtered.sort((a, b) => {
      if (sortBy === 'rating') return sortDir === 'desc' ? b.rating - a.rating : a.rating - b.rating;
      return sortDir === 'desc' ? new Date(b.reviewDate) - new Date(a.reviewDate) : new Date(a.reviewDate) - new Date(b.reviewDate);
    });

    const total = reviewsData.length;
    const avgRating = total > 0 ? (reviewsData.reduce((a, b) => a + b.rating, 0) / total).toFixed(1) : '0.0';
    const movies = reviewsData.filter(r => r.type === 'movie').length;
    const shows = reviewsData.filter(r => r.type === 'show').length;

    if (viewingReview !== null) {
      const review = filtered[viewingReview];
      if (!review) return '\x1b[31mError: Review not found\x1b[0m';

      const ratingColor = review.rating >= 8 ? '79' : review.rating >= 7 ? '208' : '196';
      const typeLabel = review.type === 'movie' ? 'FILM' : 'SHOW';

      return `
\x1b[1;38;5;79m┌──────────────────────────────────────────────────────────────────┐
│  ${review.title.toUpperCase().padEnd(62)}│
└──────────────────────────────────────────────────────────────────┘\x1b[0m

  \x1b[38;5;244mType:\x1b[0m     ${typeLabel}
  \x1b[38;5;244mDirector:\x1b[0m ${review.artist}
  \x1b[38;5;244mRating:\x1b[0m   \x1b[1;38;5;${ratingColor}m${review.rating}/10\x1b[0m
  \x1b[38;5;244mReviewed:\x1b[0m ${new Date(review.reviewDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

  \x1b[38;5;244m─────────────────────────────────────────────────────────────────\x1b[0m

${review.review ? review.review.split('\n').map(line => `  ${line}`).join('\n') : '  \x1b[38;5;244mNo review text available.\x1b[0m'}

  \x1b[38;5;244m─────────────────────────────────────────────────────────────────\x1b[0m
  \x1b[38;5;244mPress\x1b[0m \x1b[1;38;5;79mq\x1b[0m \x1b[38;5;244mor\x1b[0m \x1b[1;38;5;79mESC\x1b[0m \x1b[38;5;244mto go back\x1b[0m

`;
    }

    const listStart = Math.max(0, selectedIndex - 5);
    const listEnd = Math.min(filtered.length, listStart + 12);

    let output = `
\x1b[1;38;5;79m┌──────────────────────────────────────────────────────────────────┐
│  REVIEWS                                            \x1b[38;5;244m[TUI v1.0.0]\x1b[1;38;5;79m │
└──────────────────────────────────────────────────────────────────┘\x1b[0m

  \x1b[38;5;250mStats:\x1b[0m \x1b[38;5;79m${total}\x1b[0m total  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;79m${avgRating}\x1b[0m avg  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;81m${movies}\x1b[0m films  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;168m${shows}\x1b[0m shows
  \x1b[38;5;250mFilter:\x1b[0m ${filterType === 'all' ? '\x1b[1;38;5;79mall\x1b[0m' : filterType === 'movie' ? '\x1b[1;38;5;81mfilms\x1b[0m' : '\x1b[1;38;5;168mshows\x1b[0m'}  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;250mSort:\x1b[0m ${sortBy} ${sortDir === 'desc' ? '↓' : '↑'}${sq ? `  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;250mSearch:\x1b[0m "${sq}"` : ''}

  \x1b[38;5;244m─────────────────────────────────────────────────────────────────\x1b[0m
`;

    if (filtered.length === 0) {
      output += `\n  \x1b[38;5;244mNo reviews found.\x1b[0m\n`;
    } else {
      for (let i = listStart; i < listEnd; i++) {
        const r = filtered[i];
        const isSelected = i === selectedIndex;
        const ratingColor = r.rating >= 8 ? '79' : r.rating >= 7 ? '208' : '196';
        const prefix = isSelected ? '\x1b[1;38;5;79m❯\x1b[0m' : ' ';
        const titleStyle = isSelected ? '\x1b[1;38;5;79m' : '\x1b[38;5;250m';
        const typeIcon = r.type === 'movie' ? '\x1b[38;5;81m■\x1b[0m' : '\x1b[38;5;168m●\x1b[0m';

        output += `  ${prefix} ${typeIcon} ${titleStyle}${r.title.substring(0, 35).padEnd(35)}\x1b[0m \x1b[38;5;${ratingColor}m${r.rating.toFixed(1).padStart(4)}\x1b[0m \x1b[38;5;244m${r.artist.substring(0, 15)}\x1b[0m\n`;
      }

      if (filtered.length > 12) {
        output += `\n  \x1b[38;5;244m... ${filtered.length - 12} more items (scroll with ↑↓)\x1b[0m\n`;
      }
    }

    output += `
  \x1b[38;5;244m─────────────────────────────────────────────────────────────────\x1b[0m
  \x1b[38;5;244m↑↓\x1b[0m Navigate  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;244mEnter\x1b[0m View  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;244mf\x1b[0m Filter  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;244ms\x1b[0m Sort  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;244m/\x1b[0m Search  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;244mq\x1b[0m Quit

`;
    return output;
  }, [reviewsData]);

  // Generate music TUI
  const generateMusicTUI = useCallback(() => {
    return `
\x1b[1;38;5;79m┌──────────────────────────────────────────────────────────────────┐
│  MUSIC                                              \x1b[38;5;244m[TUI v1.0.0]\x1b[1;38;5;79m │
└──────────────────────────────────────────────────────────────────┘\x1b[0m

  \x1b[38;5;244m─────────────────────────────────────────────────────────────────\x1b[0m

  \x1b[1;38;5;250mSpotify Integration\x1b[0m

  \x1b[38;5;79m❯\x1b[0m  Recently played tracks are synced from Spotify
  \x1b[38;5;79m❯\x1b[0m  Visit the web version for embedded playlists

  \x1b[38;5;244m─────────────────────────────────────────────────────────────────\x1b[0m

  \x1b[1;38;5;250mPlaylists\x1b[0m

  \x1b[38;5;79m[1]\x1b[0m  \x1b[38;5;250mSunday Snooze\x1b[0m
       \x1b[38;5;244mChill vibes for lazy weekends\x1b[0m
       \x1b[4;38;5;81mopen.spotify.com/playlist/2hJ9vjNCXEVrbPDmr8RRaY\x1b[0m

  \x1b[38;5;79m[2]\x1b[0m  \x1b[38;5;250mFocus\x1b[0m
       \x1b[38;5;244mLocked in on work, great for the gym\x1b[0m
       \x1b[4;38;5;81mopen.spotify.com/playlist/2N0n81gJrPqZzFxeteHPUI\x1b[0m

  \x1b[38;5;244m─────────────────────────────────────────────────────────────────\x1b[0m

  \x1b[38;5;250mUser:\x1b[0m \x1b[38;5;79maadit2805\x1b[0m
  \x1b[38;5;250mProfile:\x1b[0m \x1b[4;38;5;81mopen.spotify.com/user/aadit2805\x1b[0m

  \x1b[38;5;244m─────────────────────────────────────────────────────────────────\x1b[0m
  \x1b[38;5;244mPress\x1b[0m \x1b[1;38;5;79m1-2\x1b[0m \x1b[38;5;244mto open playlist\x1b[0m  \x1b[38;5;244m│\x1b[0m  \x1b[38;5;244mPress\x1b[0m \x1b[1;38;5;79mq\x1b[0m \x1b[38;5;244mor\x1b[0m \x1b[1;38;5;79mESC\x1b[0m \x1b[38;5;244mto quit\x1b[0m

`;
  }, []);

  // Autocomplete
  const handleAutocomplete = useCallback(() => {
    if (!activeTab || activeTab.isInChatMode || isSearchMode || activeTab.interactiveMode) return;

    const input = activeTab.currentInput.toLowerCase().trim();
    const parts = input.split(' ');
    const cmd = parts[parts.length - 1];
    const matches = COMMANDS.filter(c => c.startsWith(cmd));

    if (matches.length === 0) return triggerBell();

    if (matches.length === 1) {
      const newInput = parts.length > 1 ? [...parts.slice(0, -1), matches[0]].join(' ') : matches[0];
      updateActiveTab({ currentInput: newInput, cursorPosition: newInput.length });
      setShowAutocomplete(false);
    } else {
      setAutocompleteOptions(matches);
      setAutocompleteIndex(0);
      setShowAutocomplete(true);
    }
  }, [activeTab, isSearchMode, triggerBell, updateActiveTab]);

  // History search
  const handleHistorySearch = useCallback((query) => {
    if (!activeTab) return;
    const results = activeTab.commandHistory.filter(cmd =>
      cmd.toLowerCase().includes(query.toLowerCase())
    ).reverse();
    setSearchResults(results);
    setSearchIndex(0);
  }, [activeTab]);

  // Process command
  const processCommand = useCallback(async (cmd) => {
    if (!activeTab) return null;

    const trimmedCmd = cmd.trim();
    const lowerCmd = trimmedCmd.toLowerCase();
    const args = trimmedCmd.split(/\s+/);
    const mainCmd = args[0].toLowerCase();

    if (activeTab.isInChatMode) {
      if (lowerCmd === 'exit' || lowerCmd === 'quit' || lowerCmd === '/exit') {
        updateActiveTab({ isInChatMode: false, chatHistory: [] });
        return { type: 'raw', content: '\n\x1b[38;5;244mExited chat mode.\x1b[0m\n' };
      }

      // Streaming chat response
      updateActiveTab({ isTyping: true });

      // Add streaming response line immediately
      const streamingLineId = Date.now();
      setTabs(prev => prev.map(tab =>
        tab.id === activeTabId
          ? { ...tab, lines: [...tab.lines, { type: 'chat-streaming', content: '', id: streamingLineId }] }
          : tab
      ));

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: cmd, history: activeTab.chatHistory }),
        });

        if (!response.ok) throw new Error('Failed');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  fullResponse += parsed.text;
                  // Update the streaming line in place
                  setTabs(prev => prev.map(tab =>
                    tab.id === activeTabId
                      ? {
                          ...tab,
                          lines: tab.lines.map(l =>
                            l.id === streamingLineId ? { ...l, content: fullResponse } : l
                          )
                        }
                      : tab
                  ));
                }
              } catch {}
            }
          }
        }

        // Convert streaming line to final chat-response
        setTabs(prev => prev.map(tab =>
          tab.id === activeTabId
            ? {
                ...tab,
                isTyping: false,
                chatHistory: [...tab.chatHistory, { role: 'user', content: cmd }, { role: 'assistant', content: fullResponse }],
                lines: tab.lines.map(l =>
                  l.id === streamingLineId ? { type: 'chat-response', content: fullResponse } : l
                )
              }
            : tab
        ));

        return null; // Already handled inline
      } catch {
        updateActiveTab({ isTyping: false });
        // Remove the streaming line and show error
        setTabs(prev => prev.map(tab =>
          tab.id === activeTabId
            ? { ...tab, lines: tab.lines.filter(l => l.id !== streamingLineId) }
            : tab
        ));
        return { type: 'error', content: '\x1b[31mError:\x1b[0m Failed to connect.' };
      }
    }

    switch (mainCmd) {
      case 'help':
      case '?':
      case 'man':
        return { type: 'raw', content: HELP_TEXT };
      case 'about':
        return { type: 'raw', content: ABOUT_TEXT };
      case 'skills':
        return { type: 'raw', content: SKILLS_TEXT };
      case 'projects':
      case 'work':
        return { type: 'projects', content: PROJECTS_TEXT };
      case 'socials':
      case 'contact':
      case 'links':
        return { type: 'raw', content: SOCIALS_TEXT };
      case 'resume':
      case 'cv':
        window.open('/resume.pdf', '_blank');
        return { type: 'raw', content: '\n\x1b[38;5;79m❯\x1b[0m Opening resume...\n' };
      case 'reviews':
        updateActiveTab({
          interactiveMode: 'reviews',
          reviewsState: { selectedIndex: 0, filterType: 'all', sortBy: 'date', sortDir: 'desc', searchQuery: '', viewingReview: null }
        });
        return { type: 'raw', content: generateReviewsTUI({ selectedIndex: 0, filterType: 'all', sortBy: 'date', sortDir: 'desc', searchQuery: '', viewingReview: null }) };
      case 'music':
        updateActiveTab({ interactiveMode: 'music' });
        return { type: 'raw', content: generateMusicTUI() };
      case 'clear':
      case 'cls':
        updateActiveTab({ lines: [] });
        return null;
      case 'chat':
        updateActiveTab({ isInChatMode: true, chatHistory: [] });
        return {
          type: 'raw',
          content: `
\x1b[1;38;5;79m┌──────────────────────────────────────────────────────────────────┐
│  CHAT WITH AADIT                                                 │
└──────────────────────────────────────────────────────────────────┘\x1b[0m

  You're chatting with an \x1b[1mAI version\x1b[0m of Aadit.
  Type \x1b[38;5;79mexit\x1b[0m to leave.

`
        };
      case 'ls':
        const path = args[1] || SHELL_ENV.PWD;
        const dir = FILESYSTEM[path] || FILESYSTEM['/home/aadit'];
        if (dir?.contents) {
          const formatted = dir.contents.map(item => {
            if (item.endsWith('/')) return `\x1b[1;38;5;81m${item}\x1b[0m`;
            if (item.startsWith('.')) return `\x1b[38;5;244m${item}\x1b[0m`;
            if (item.endsWith('.txt')) return `\x1b[38;5;250m${item}\x1b[0m`;
            if (item.endsWith('.pdf')) return `\x1b[38;5;208m${item}\x1b[0m`;
            return item;
          });
          return { type: 'raw', content: `\n${formatted.join('  ')}\n` };
        }
        return { type: 'error', content: `\n\x1b[31mls:\x1b[0m cannot access '${path}'\n` };
      case 'pwd':
        return { type: 'raw', content: `\n${SHELL_ENV.PWD}\n` };
      case 'cd': {
        const target = args[1]?.toLowerCase();
        if (!target || target === '~' || target === '.') return null;
        // Handle cd to navigation commands
        if (target === 'about') return { type: 'raw', content: ABOUT_TEXT };
        if (target === 'skills') return { type: 'raw', content: SKILLS_TEXT };
        if (target === 'projects' || target === 'work') return { type: 'projects', content: PROJECTS_TEXT };
        if (target === 'socials' || target === 'contact' || target === 'links') return { type: 'raw', content: SOCIALS_TEXT };
        if (target === 'reviews') {
          updateActiveTab({
            interactiveMode: 'reviews',
            reviewsState: { selectedIndex: 0, filterType: 'all', sortBy: 'date', sortDir: 'desc', searchQuery: '', viewingReview: null }
          });
          return { type: 'raw', content: generateReviewsTUI({ selectedIndex: 0, filterType: 'all', sortBy: 'date', sortDir: 'desc', searchQuery: '', viewingReview: null }) };
        }
        if (target === 'music') {
          updateActiveTab({ interactiveMode: 'music' });
          return { type: 'raw', content: generateMusicTUI() };
        }
        if (target === 'resume' || target === 'cv') {
          window.open('/resume.pdf', '_blank');
          return { type: 'raw', content: '\n\x1b[38;5;79m❯\x1b[0m Opening resume...\n' };
        }
        return { type: 'error', content: `\n\x1b[31mcd:\x1b[0m no such directory: ${target}\n` };
      }
      case 'date':
        return { type: 'raw', content: `\n${new Date().toString()}\n` };
      case 'whoami':
        return { type: 'raw', content: `\n${SHELL_ENV.USER}\n` };
      case 'hostname':
        return { type: 'raw', content: `\n${SHELL_ENV.HOSTNAME}\n` };
      case 'env':
        return { type: 'raw', content: `\n${Object.entries(SHELL_ENV).map(([k, v]) => `\x1b[38;5;79m${k}\x1b[0m=${v}`).join('\n')}\n` };
      case 'echo':
        const processed = args.slice(1).join(' ').replace(/\$(\w+)/g, (_, n) => SHELL_ENV[n] || '');
        return { type: 'raw', content: `\n${processed}\n` };
      case 'cat':
        const file = args[1];
        if (!file) return { type: 'error', content: '\n\x1b[31mcat:\x1b[0m missing operand\n' };
        if (file === 'about.txt') return { type: 'raw', content: ABOUT_TEXT };
        if (file === 'skills.txt') return { type: 'raw', content: SKILLS_TEXT };
        if (file === 'socials.txt') return { type: 'raw', content: SOCIALS_TEXT };
        if (file === '.zshrc') return { type: 'raw', content: `\n\x1b[38;5;244m# ~/.zshrc\x1b[0m\nexport EDITOR=nvim\nexport TERM=xterm-256color\nalias ll='ls -la'\nalias vim='nvim'\n` };
        return { type: 'error', content: `\n\x1b[31mcat:\x1b[0m ${file}: No such file\n` };
      case 'neofetch':
      case 'fastfetch':
        return { type: 'raw', content: generateNeofetch() };
      case 'history':
        const hist = activeTab.commandHistory.map((c, i) => `  \x1b[38;5;244m${(i + 1).toString().padStart(4)}\x1b[0m  ${c}`).join('\n');
        return { type: 'raw', content: `\n${hist || '  \x1b[38;5;244mNo history.\x1b[0m'}\n` };
      case 'tree':
        return { type: 'raw', content: `
\x1b[1;38;5;81m.\x1b[0m
├── \x1b[38;5;250mabout.txt\x1b[0m
├── \x1b[1;38;5;81mprojects/\x1b[0m
├── \x1b[38;5;250mskills.txt\x1b[0m
├── \x1b[38;5;208mresume.pdf\x1b[0m
├── \x1b[38;5;250msocials.txt\x1b[0m
├── \x1b[1;38;5;81m.config/\x1b[0m
└── \x1b[38;5;244m.zshrc\x1b[0m
` };
      case 'ps':
        return { type: 'raw', content: `\n\x1b[1m  PID TTY      CMD\x1b[0m\n    1 pts/0    zsh\n${activeTab.pid} pts/0    aadit.sh\n` };
      case 'top':
      case 'htop':
        return { type: 'raw', content: `\n\x1b[1;7m  top - ${new Date().toLocaleTimeString()} up ${formatUptime(uptime)} \x1b[0m\nTasks: ${tabs.length + 2} total\n%Cpu: ${(Math.random() * 2).toFixed(1)} us\nMiB Mem: ${memoryInfo.total} total, ${memoryInfo.used} used (${memoryInfo.percent}%)\n\n\x1b[1;7m  PID USER   CPU  MEM  CMD \x1b[0m\n${activeTab.pid} aadit  ${(Math.random() * 2).toFixed(1)}%  ${memoryInfo.percent}%  aadit.sh\n` };
      case 'sudo':
        return { type: 'raw', content: `\n\x1b[31m[sudo]\x1b[0m Sorry, ${SHELL_ENV.USER} is not in sudoers.\n` };
      case 'exit':
      case 'quit':
        return { type: 'raw', content: '\n\x1b[38;5;244mUse ⌘W to close tab.\x1b[0m\n' };
      case '':
        return null;
      default:
        return { type: 'error', content: `\n\x1b[31mzsh:\x1b[0m command not found: ${mainCmd}\n` };
    }
  }, [activeTab, updateActiveTab, generateNeofetch, generateReviewsTUI, generateMusicTUI, uptime, tabs.length, memoryInfo]);

  // Handle interactive mode keys
  const handleInteractiveKey = useCallback((e) => {
    if (!activeTab?.interactiveMode) return false;

    const mode = activeTab.interactiveMode;

    if (mode === 'reviews') {
      const state = activeTab.reviewsState;
      let filtered = reviewsData
        .filter(item => state.filterType === 'all' || item.type === state.filterType)
        .filter(item => !state.searchQuery || item.title.toLowerCase().includes(state.searchQuery.toLowerCase()));

      if (state.viewingReview !== null) {
        // In detail view
        if (e.key === 'q' || e.key === 'Escape') {
          const newState = { ...state, viewingReview: null };
          updateActiveTab({
            reviewsState: newState,
            lines: [...activeTab.lines.slice(0, -1), { type: 'raw', content: generateReviewsTUI(newState) }]
          });
          return true;
        }
        return true;
      }

      // In list view
      if (e.key === 'ArrowUp' || e.key === 'k') {
        const newIdx = Math.max(0, state.selectedIndex - 1);
        const newState = { ...state, selectedIndex: newIdx };
        updateActiveTab({
          reviewsState: newState,
          lines: [...activeTab.lines.slice(0, -1), { type: 'raw', content: generateReviewsTUI(newState) }]
        });
        return true;
      }
      if (e.key === 'ArrowDown' || e.key === 'j') {
        const newIdx = Math.min(filtered.length - 1, state.selectedIndex + 1);
        const newState = { ...state, selectedIndex: newIdx };
        updateActiveTab({
          reviewsState: newState,
          lines: [...activeTab.lines.slice(0, -1), { type: 'raw', content: generateReviewsTUI(newState) }]
        });
        return true;
      }
      if (e.key === 'Enter') {
        const newState = { ...state, viewingReview: state.selectedIndex };
        updateActiveTab({
          reviewsState: newState,
          lines: [...activeTab.lines.slice(0, -1), { type: 'raw', content: generateReviewsTUI(newState) }]
        });
        return true;
      }
      if (e.key === 'f') {
        const types = ['all', 'movie', 'show'];
        const nextType = types[(types.indexOf(state.filterType) + 1) % types.length];
        const newState = { ...state, filterType: nextType, selectedIndex: 0 };
        updateActiveTab({
          reviewsState: newState,
          lines: [...activeTab.lines.slice(0, -1), { type: 'raw', content: generateReviewsTUI(newState) }]
        });
        return true;
      }
      if (e.key === 's') {
        let newSort = state.sortBy;
        let newDir = state.sortDir;
        if (state.sortBy === 'date') {
          newSort = 'rating';
          newDir = 'desc';
        } else {
          newDir = state.sortDir === 'desc' ? 'asc' : 'desc';
          if (newDir === 'desc') newSort = 'date';
        }
        const newState = { ...state, sortBy: newSort, sortDir: newDir, selectedIndex: 0 };
        updateActiveTab({
          reviewsState: newState,
          lines: [...activeTab.lines.slice(0, -1), { type: 'raw', content: generateReviewsTUI(newState) }]
        });
        return true;
      }
      if (e.key === 'q' || e.key === 'Escape') {
        updateActiveTab({ interactiveMode: null });
        return true;
      }
      return true;
    }

    if (mode === 'music') {
      if (e.key === '1') {
        window.open('https://open.spotify.com/playlist/2hJ9vjNCXEVrbPDmr8RRaY', '_blank');
        return true;
      }
      if (e.key === '2') {
        window.open('https://open.spotify.com/playlist/2N0n81gJrPqZzFxeteHPUI', '_blank');
        return true;
      }
      if (e.key === 'q' || e.key === 'Escape') {
        updateActiveTab({ interactiveMode: null });
        return true;
      }
      return true;
    }

    return false;
  }, [activeTab, updateActiveTab, generateReviewsTUI, reviewsData]);

  // Handle command submission (used by both Enter key and mobile send button)
  const handleSubmit = useCallback(async () => {
    if (!activeTab || activeTab.isTyping) return;

    const cmd = activeTab.currentInput;
    setShowAutocomplete(false);

    const inputLine = { type: 'input', content: cmd, isChat: activeTab.isInChatMode };
    const newHistory = cmd.trim() ? [...activeTab.commandHistory, cmd] : activeTab.commandHistory;

    updateActiveTab({
      lines: [...activeTab.lines, inputLine],
      commandHistory: newHistory,
      historyIndex: -1,
      currentInput: '',
      cursorPosition: 0
    });

    const result = await processCommand(cmd);
    if (result) {
      setTabs(prev => prev.map(tab =>
        tab.id === activeTabId ? { ...tab, lines: [...tab.lines, result] } : tab
      ));
    }
  }, [activeTab, activeTabId, processCommand, updateActiveTab]);

  // Handle key press
  const handleKeyDown = async (e) => {
    if (!activeTab) return;

    // Tab shortcuts (Cmd+T, Cmd+W, Cmd+1-9)
    if (e.metaKey) {
      if (e.key === 't') {
        e.preventDefault();
        addTab();
        return;
      }
      if (e.key === 'w') {
        e.preventDefault();
        closeTab(activeTabId);
        return;
      }
      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const idx = parseInt(e.key) - 1;
        if (tabs[idx]) setActiveTabId(tabs[idx].id);
        return;
      }
      // Cmd+Backspace - delete line
      if (e.key === 'Backspace') {
        e.preventDefault();
        updateActiveTab({ currentInput: '', cursorPosition: 0 });
        return;
      }
    }

    // Alt+Backspace - delete word
    if (e.altKey && e.key === 'Backspace') {
      e.preventDefault();
      const beforeCursor = activeTab.currentInput.slice(0, activeTab.cursorPosition);
      const afterCursor = activeTab.currentInput.slice(activeTab.cursorPosition);
      const lastSpace = beforeCursor.trimEnd().lastIndexOf(' ');
      const newBefore = lastSpace === -1 ? '' : beforeCursor.slice(0, lastSpace + 1);
      updateActiveTab({ currentInput: newBefore + afterCursor, cursorPosition: newBefore.length });
      return;
    }

    // Alt+Left - move word left
    if (e.altKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      const beforeCursor = activeTab.currentInput.slice(0, activeTab.cursorPosition);
      const lastSpace = beforeCursor.trimEnd().lastIndexOf(' ');
      updateActiveTab({ cursorPosition: lastSpace === -1 ? 0 : lastSpace + 1 });
      return;
    }

    // Alt+Right - move word right
    if (e.altKey && e.key === 'ArrowRight') {
      e.preventDefault();
      const afterCursor = activeTab.currentInput.slice(activeTab.cursorPosition);
      const nextSpace = afterCursor.indexOf(' ');
      const newPos = nextSpace === -1 ? activeTab.currentInput.length : activeTab.cursorPosition + nextSpace + 1;
      updateActiveTab({ cursorPosition: newPos });
      return;
    }

    // Interactive mode handling
    if (handleInteractiveKey(e)) {
      e.preventDefault();
      return;
    }

    // Search mode
    if (isSearchMode) {
      if (e.key === 'Escape') {
        setIsSearchMode(false);
        setSearchQuery('');
        return;
      }
      if (e.key === 'Enter') {
        if (searchResults[searchIndex]) {
          updateActiveTab({
            currentInput: searchResults[searchIndex],
            cursorPosition: searchResults[searchIndex].length
          });
        }
        setIsSearchMode(false);
        setSearchQuery('');
        return;
      }
      if (e.key === 'Backspace') {
        const newQuery = searchQuery.slice(0, -1);
        setSearchQuery(newQuery);
        handleHistorySearch(newQuery);
        return;
      }
      if (e.key.length === 1) {
        const newQuery = searchQuery + e.key;
        setSearchQuery(newQuery);
        handleHistorySearch(newQuery);
        return;
      }
      if (e.key === 'ArrowUp' || (e.key === 'r' && e.ctrlKey)) {
        setSearchIndex(i => Math.min(i + 1, searchResults.length - 1));
        return;
      }
      if (e.key === 'ArrowDown') {
        setSearchIndex(i => Math.max(i - 1, 0));
        return;
      }
      return;
    }

    // Ctrl+R
    if (e.key === 'r' && e.ctrlKey) {
      e.preventDefault();
      setIsSearchMode(true);
      setSearchQuery('');
      setSearchResults([]);
      setSearchIndex(0);
      return;
    }

    // Ctrl+C
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      if (activeTab.isTyping) updateActiveTab({ isTyping: false });
      if (activeTab.interactiveMode) updateActiveTab({ interactiveMode: null });
      updateActiveTab({
        currentInput: '',
        cursorPosition: 0,
        lines: [...activeTab.lines, { type: 'input', content: activeTab.currentInput + '^C', isChat: activeTab.isInChatMode }]
      });
      setShowAutocomplete(false);
      return;
    }

    // Ctrl+L
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      updateActiveTab({ lines: [] });
      return;
    }

    // Ctrl+A
    if (e.key === 'a' && e.ctrlKey) {
      e.preventDefault();
      updateActiveTab({ cursorPosition: 0 });
      return;
    }

    // Ctrl+E
    if (e.key === 'e' && e.ctrlKey) {
      e.preventDefault();
      updateActiveTab({ cursorPosition: activeTab.currentInput.length });
      return;
    }

    // Ctrl+U
    if (e.key === 'u' && e.ctrlKey) {
      e.preventDefault();
      updateActiveTab({ currentInput: '', cursorPosition: 0 });
      return;
    }

    // Ctrl+W
    if (e.key === 'w' && e.ctrlKey) {
      e.preventDefault();
      const beforeCursor = activeTab.currentInput.slice(0, activeTab.cursorPosition);
      const afterCursor = activeTab.currentInput.slice(activeTab.cursorPosition);
      const lastSpace = beforeCursor.trimEnd().lastIndexOf(' ');
      const newBefore = lastSpace === -1 ? '' : beforeCursor.slice(0, lastSpace + 1);
      updateActiveTab({ currentInput: newBefore + afterCursor, cursorPosition: newBefore.length });
      return;
    }

    // Autocomplete handling
    if (showAutocomplete) {
      if (e.key === 'Tab' || e.key === 'ArrowDown') {
        e.preventDefault();
        setAutocompleteIndex(i => (i + 1) % autocompleteOptions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setAutocompleteIndex(i => (i - 1 + autocompleteOptions.length) % autocompleteOptions.length);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        updateActiveTab({
          currentInput: autocompleteOptions[autocompleteIndex],
          cursorPosition: autocompleteOptions[autocompleteIndex].length
        });
        setShowAutocomplete(false);
        return;
      }
      if (e.key === 'Escape') {
        setShowAutocomplete(false);
        return;
      }
    }

    // Enter
    if (e.key === 'Enter' && !activeTab.isTyping) {
      e.preventDefault();
      handleSubmit();
    }

    // Arrow Up (history)
    else if (e.key === 'ArrowUp' && !activeTab.interactiveMode) {
      e.preventDefault();
      if (activeTab.commandHistory.length > 0) {
        const newIdx = activeTab.historyIndex < activeTab.commandHistory.length - 1 ? activeTab.historyIndex + 1 : activeTab.historyIndex;
        const cmd = activeTab.commandHistory[activeTab.commandHistory.length - 1 - newIdx] || '';
        updateActiveTab({ historyIndex: newIdx, currentInput: cmd, cursorPosition: cmd.length });
      }
    }

    // Arrow Down (history)
    else if (e.key === 'ArrowDown' && !activeTab.interactiveMode) {
      e.preventDefault();
      if (activeTab.historyIndex > 0) {
        const newIdx = activeTab.historyIndex - 1;
        const cmd = activeTab.commandHistory[activeTab.commandHistory.length - 1 - newIdx] || '';
        updateActiveTab({ historyIndex: newIdx, currentInput: cmd, cursorPosition: cmd.length });
      } else {
        updateActiveTab({ historyIndex: -1, currentInput: '', cursorPosition: 0 });
      }
    }

    // Arrow Left
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      updateActiveTab({ cursorPosition: Math.max(0, activeTab.cursorPosition - 1) });
    }

    // Arrow Right
    else if (e.key === 'ArrowRight') {
      e.preventDefault();
      updateActiveTab({ cursorPosition: Math.min(activeTab.currentInput.length, activeTab.cursorPosition + 1) });
    }

    // Tab
    else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
    }

    // Home
    else if (e.key === 'Home') {
      e.preventDefault();
      updateActiveTab({ cursorPosition: 0 });
    }

    // End
    else if (e.key === 'End') {
      e.preventDefault();
      updateActiveTab({ cursorPosition: activeTab.currentInput.length });
    }

    // Backspace
    else if (e.key === 'Backspace') {
      e.preventDefault();
      if (activeTab.cursorPosition > 0) {
        const newInput = activeTab.currentInput.slice(0, activeTab.cursorPosition - 1) + activeTab.currentInput.slice(activeTab.cursorPosition);
        updateActiveTab({ currentInput: newInput, cursorPosition: activeTab.cursorPosition - 1 });
      }
    }

    // Delete
    else if (e.key === 'Delete') {
      e.preventDefault();
      if (activeTab.cursorPosition < activeTab.currentInput.length) {
        const newInput = activeTab.currentInput.slice(0, activeTab.cursorPosition) + activeTab.currentInput.slice(activeTab.cursorPosition + 1);
        updateActiveTab({ currentInput: newInput });
      }
    }

    // Character input
    else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const newInput = activeTab.currentInput.slice(0, activeTab.cursorPosition) + e.key + activeTab.currentInput.slice(activeTab.cursorPosition);
      updateActiveTab({ currentInput: newInput, cursorPosition: activeTab.cursorPosition + 1 });
      setShowAutocomplete(false);
    }
  };

  // Render ANSI text
  const renderAnsiText = (text) => {
    const segments = parseAnsi(text);
    return segments.map((segment, i) => <span key={i} style={segment.style}>{segment.text}</span>);
  };

  // Render line
  const renderLine = (line, index) => {
    switch (line.type) {
      case 'raw':
        return (
          <motion.pre key={index} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
            {renderAnsiText(line.content)}
          </motion.pre>
        );
      case 'input':
        return (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 py-0.5">
            {line.isChat ? (
              <span className="text-purple-400 font-bold"><span className="text-purple-500">❯</span> you</span>
            ) : (
              <span className="prompt-ps1 flex items-center gap-1">
                <span className="text-emerald-400 font-semibold">{SHELL_ENV.USER}</span>
                <span className="text-zinc-600">@</span>
                <span className="text-cyan-400">{SHELL_ENV.HOSTNAME}</span>
                <span className="text-zinc-600">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-zinc-500 text-xs ml-1">git:(<span className="text-orange-400">{SHELL_ENV.GIT_BRANCH}</span>)</span>
                <span className="text-emerald-400 ml-1 font-bold">❯</span>
              </span>
            )}
            <span className="text-zinc-100 ml-1">{line.content}</span>
          </motion.div>
        );
      case 'chat-response':
        return (
          <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-2 py-2 pl-2 border-l-2 border-emerald-500/30 my-2">
            <span className="text-emerald-400 font-bold shrink-0"><span className="text-emerald-500">◆</span> aadit</span>
            <span className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{line.content}</span>
          </motion.div>
        );
      case 'chat-streaming':
        return (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2 py-2 pl-2 border-l-2 border-emerald-500/30 my-2">
            <span className="text-emerald-400 font-bold shrink-0"><span className="text-emerald-500">◆</span> aadit</span>
            <span className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {line.content}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[2px] h-[1em] bg-emerald-400 ml-0.5 align-middle"
              />
            </span>
          </motion.div>
        );
      case 'error':
        return (
          <motion.pre key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-zinc-300 whitespace-pre-wrap font-mono">
            {renderAnsiText(line.content)}
          </motion.pre>
        );
      case 'projects':
        return (
          <motion.div key={index} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}>
            <pre className="text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
              {renderAnsiText(line.content)}
            </pre>
            <div className="mt-2 mb-4">
              <button
                onClick={() => window.location.href = '/portfolio'}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 font-mono text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-emerald-500">❯</span>
                <span>View All Projects</span>
                <span className="text-zinc-500">→</span>
              </button>
            </div>
          </motion.div>
        );
      default:
        return <div key={index} className="text-zinc-300">{renderAnsiText(line.content)}</div>;
    }
  };

  // Render cursor (block style)
  const renderCursor = () => {
    if (!activeTab) return null;
    const charAtCursor = activeTab.currentInput[activeTab.cursorPosition] || ' ';
    return (
      <motion.span
        className={`absolute top-0 bg-emerald-400 text-zinc-950 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: `${activeTab.cursorPosition}ch` }}
        initial={false}
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        transition={{ duration: 0.05 }}
      >
        {charAtCursor}
      </motion.span>
    );
  };

  if (!activeTab) return null;

  return (
    <div className={`min-h-screen bg-[#0d0d0f] text-zinc-100 p-2 sm:p-4 lg:p-6 selection:bg-emerald-500/30 ${bellFlash ? 'animate-bell-flash' : ''}`} onClick={handleTerminalClick} style={{ fontFamily: TERM_CONFIG.fontFamily }}>
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]">
        <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)', backgroundSize: '100% 2px' }} />
      </div>

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Window chrome */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#16161a] rounded-t-xl border border-zinc-800/50 border-b-0 shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5">
            {/* Traffic lights */}
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.1 }} className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.5)] cursor-pointer" onClick={() => closeTab(activeTabId)} />
              <motion.div whileHover={{ scale: 1.1 }} className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.5)] cursor-pointer" />
              <motion.div whileHover={{ scale: 1.1 }} className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.5)] cursor-pointer" />
            </div>

            {/* Title */}
            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-600 font-medium">{SHELL_ENV.USER}@{SHELL_ENV.HOSTNAME}</span>
              <span className="text-zinc-700">—</span>
              <span className="text-zinc-500">{activeTab.interactiveMode || (activeTab.isInChatMode ? 'chat' : 'zsh')}</span>
              <span className="text-zinc-700">—</span>
              <span className="text-zinc-600">{dimensions.cols}×{dimensions.rows}</span>
            </div>

            {/* Process info */}
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <span className="text-zinc-700">PID {activeTab.pid}</span>
              <span className="text-emerald-500/70">{memoryInfo.used}MB</span>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex items-center px-2 pb-1 gap-1 border-t border-zinc-800/30 overflow-x-auto">
            {tabs.map((tab, idx) => (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs cursor-pointer shrink-0 ${tab.id === activeTabId ? 'bg-[#0d0d0f] text-zinc-300' : 'bg-transparent text-zinc-600 hover:text-zinc-400'}`}
              >
                <span className={`w-2 h-2 rounded-full ${tab.id === activeTabId ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                <span>{tab.interactiveMode || (tab.isInChatMode ? 'chat' : 'zsh')}</span>
                <span className="text-zinc-700 text-[10px]">⌘{idx + 1}</span>
                {tabs.length > 1 && (
                  <span
                    onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                    className="text-zinc-700 hover:text-zinc-400 ml-1"
                  >
                    ×
                  </span>
                )}
              </div>
            ))}
            <div onClick={addTab} className="px-2 py-1 text-zinc-700 hover:text-zinc-500 cursor-pointer text-xs shrink-0">
              + <span className="text-[10px]">⌘T</span>
            </div>
          </div>
        </motion.div>

        {/* Terminal body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          ref={terminalRef}
          className="bg-[#0d0d0f] border border-zinc-800/50 border-t-0 rounded-b-xl p-4 sm:p-6 h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
          style={{ fontSize: `${TERM_CONFIG.fontSize}px`, lineHeight: TERM_CONFIG.lineHeight }}
        >
          <div className="space-y-0.5">
            {activeTab.lines.map((line, index) => renderLine(line, index))}
          </div>

          {/* History search */}
          <AnimatePresence>
            {isSearchMode && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-2 mt-2 py-2 px-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <span className="text-yellow-500">(reverse-i-search)</span>
                <span className="text-zinc-500">`</span>
                <span className="text-zinc-100">{searchQuery}</span>
                <span className="text-zinc-500">`</span>
                <span className="text-zinc-600">:</span>
                <span className="text-zinc-300">{searchResults[searchIndex] || ''}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input line (hidden in interactive mode) */}
          {!isSearchMode && !activeTab.interactiveMode && (
            <div className="flex items-center gap-2 mt-1 py-2 sm:py-0.5">
              {activeTab.isInChatMode ? (
                <span className="text-purple-400 font-bold shrink-0"><span className="text-purple-500">❯</span> you</span>
              ) : (
                <span className="prompt-ps1 flex items-center gap-1 shrink-0">
                  {/* Full prompt on desktop, simplified on mobile */}
                  <span className="hidden sm:inline-flex items-center gap-1">
                    <span className="text-emerald-400 font-semibold">{SHELL_ENV.USER}</span>
                    <span className="text-zinc-600">@</span>
                    <span className="text-cyan-400">{SHELL_ENV.HOSTNAME}</span>
                    <span className="text-zinc-600">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-zinc-500 text-xs ml-1">git:(<span className="text-orange-400">{SHELL_ENV.GIT_BRANCH}</span>)</span>
                  </span>
                  {/* Simplified prompt on mobile */}
                  <span className="sm:hidden text-emerald-400 font-semibold">~</span>
                  <span className="text-emerald-400 ml-1 font-bold">❯</span>
                </span>
              )}
              <div className="flex-1 relative ml-1 min-h-[24px] flex items-center" onClick={() => hiddenInputRef.current?.focus()}>
                {activeTab.currentInput.length === 0 ? (
                  <>
                    {renderCursor()}
                    <span className="text-zinc-500 text-sm sm:text-base">Type <span className="text-emerald-400 font-bold">help</span> to see available commands</span>
                  </>
                ) : (
                  <>
                    <span className="text-zinc-100 whitespace-pre">{activeTab.currentInput.slice(0, activeTab.cursorPosition)}</span>
                    {renderCursor()}
                    <span className="text-zinc-100 whitespace-pre">{activeTab.currentInput.slice(activeTab.cursorPosition + 1)}</span>
                  </>
                )}
                <input ref={hiddenInputRef} type="text" className="absolute opacity-0 w-0 h-0" onKeyDown={handleKeyDown} autoFocus autoComplete="off" spellCheck={false} />
              </div>
              {/* Mobile send button */}
              <button
                onClick={handleSubmit}
                className="sm:hidden shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 active:bg-emerald-500/30 transition-colors"
                aria-label="Send command"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                </svg>
              </button>
            </div>
          )}

          {/* Hidden input for interactive mode */}
          {activeTab.interactiveMode && (
            <input ref={hiddenInputRef} type="text" className="absolute opacity-0 w-0 h-0" onKeyDown={handleKeyDown} autoFocus autoComplete="off" spellCheck={false} />
          )}

          {/* Autocomplete */}
          <AnimatePresence>
            {showAutocomplete && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50">
                {autocompleteOptions.map((option, i) => (
                  <div key={option} className={`px-4 py-1.5 text-sm cursor-pointer transition-colors ${i === autocompleteIndex ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:bg-zinc-800'}`} onClick={() => { updateActiveTab({ currentInput: option, cursorPosition: option.length }); setShowAutocomplete(false); }}>
                    {option}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {activeTab.isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 mt-3 text-zinc-500">
                <span className="text-emerald-400">◆</span>
                <span className="text-zinc-400">aadit is thinking</span>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Status bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center justify-between px-4 py-1.5 bg-[#16161a] border border-zinc-800/50 border-t-0 rounded-b-lg text-xs">
          <div className="flex items-center gap-4 text-zinc-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeTab.interactiveMode ? 'INTERACTIVE' : 'INSERT'}</span>
            </span>
            <span>{SHELL_ENV.PWD}</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-600">
            <span>utf-8</span>
            <span>{tabs.length} tab{tabs.length > 1 ? 's' : ''}</span>
            <span>{formatUptime(uptime)}</span>
          </div>
        </motion.div>
      </div>

      {/* Mobile hint - only show briefly */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 left-0 right-0 text-center sm:hidden pointer-events-none"
      >
        <span className="text-zinc-600 text-xs px-3 py-1.5 bg-zinc-900/80 rounded-full backdrop-blur-sm">
          Tap input to type • Press <span className="text-emerald-500">↵</span> or send button
        </span>
      </motion.div>

      <style jsx global>{`
        @keyframes bell-flash {
          0%, 100% { background-color: #0d0d0f; }
          50% { background-color: #1a1a1e; }
        }
        .animate-bell-flash { animation: bell-flash 0.1s ease-in-out; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
        ::selection { background: rgba(16, 185, 129, 0.3); }
      `}</style>
    </div>
  );
};

export default Terminal;
