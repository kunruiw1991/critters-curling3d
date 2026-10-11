/* ============================================================================
 * Critter Ice Curling 3D: Penguin Glacier Knockout!
 * Genre: 3D WebGL Glacier Ice Curling & Knockout Shuffleboard (Three.js WebGL)
 * ============================================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'critters_curling3d_save_v1';

  const CRITTERS = [
    { id: 'catnap', name: 'CatNap', emoji: '🌙', icon: 'icons/catnap.jpg', color: 0x9b5de5, hex: '#9b5de5', rimHex: '#e0aaff', earType: 'cat' },
    { id: 'dogday', name: 'DogDay', emoji: '☀️', icon: 'icons/dogday.jpg', color: 0xff9f1c, hex: '#ff9f1c', rimHex: '#ffe66d', earType: 'dog' },
    { id: 'bobby', name: 'Bobby BearHug', emoji: '❤️', icon: 'icons/bobby.jpg', color: 0xe63946, hex: '#e63946', rimHex: '#ffb3c1', earType: 'bear' },
    { id: 'picky', name: 'PickyPiggy', emoji: '🍎', icon: 'icons/picky.jpg', color: 0xff6b9d, hex: '#ff6b9d', rimHex: '#70e000', earType: 'pig' },
    { id: 'bubba', name: 'Bubba Bubbaphant', emoji: '💡', icon: 'icons/bubba.jpg', color: 0x00bbf9, hex: '#00bbf9', rimHex: '#caf0f8', earType: 'elephant' },
    { id: 'craftycorn', name: 'CraftyCorn', emoji: '🎨', icon: 'icons/craftycorn.jpg', color: 0x00f5d4, hex: '#00f5d4', rimHex: '#ffbe0b', earType: 'unicorn' },
    { id: 'kickin', name: 'KickinChicken', emoji: '⭐', icon: 'icons/kickin.jpg', color: 0xfee440, hex: '#fee440', rimHex: '#ef233c', earType: 'crest' },
    { id: 'hoppy', name: 'Hoppy Hopscotch', emoji: '⚡', icon: 'icons/hoppy.jpg', color: 0x38b000, hex: '#38b000', rimHex: '#ccff33', earType: 'bunny' }
  ];

  const STAGES = [
    {
      id: 1, emoji: '🐧', bossId: 'catnap',
      skyTop: 0x72ddf7, skyBot: 0x0077b6,
      iceTint: 0xc8f0ff, snowTint: 0xd9f2ff, wallTint: 0xe8f8ff,
      spireA: 0x48cae4, spireB: 0x0096c7, bumperColor: 0x00f5d4,
      pattern: 'igloo', setPiece: 'igloos',
      bumperCount: 2, windX: 0.0, aiSkill: 0.48
    },
    {
      id: 2, emoji: '❄️', bossId: 'dogday',
      skyTop: 0x3a86ff, skyBot: 0x03045e,
      iceTint: 0xf0fcff, snowTint: 0xbde0fe, wallTint: 0xd0e8ff,
      spireA: 0x90e0ef, spireB: 0x023e8a, bumperColor: 0x4cc9f0,
      pattern: 'snowflakes', setPiece: 'snowflakes',
      bumperCount: 3, windX: 0.38, aiSkill: 0.56
    },
    {
      id: 3, emoji: '🏔️', bossId: 'bobby',
      skyTop: 0x80ed99, skyBot: 0x1b4332,
      iceTint: 0xc7f9cc, snowTint: 0xb7e4c7, wallTint: 0xd8f3dc,
      spireA: 0x52b788, spireB: 0x2d6a4f, bumperColor: 0xff9f1c,
      pattern: 'chevrons', setPiece: 'alpineArches',
      bumperCount: 4, windX: -0.48, aiSkill: 0.64
    },
    {
      id: 4, emoji: '🐻‍❄️', bossId: 'picky',
      skyTop: 0xc77dff, skyBot: 0x3c096c,
      iceTint: 0xe8cff8, snowTint: 0xdec0f1, wallTint: 0xf3e8ff,
      spireA: 0x9d4edd, spireB: 0x5a189a, bumperColor: 0xfee440,
      pattern: 'paws', setPiece: 'polarBears',
      bumperCount: 5, windX: 0.58, aiSkill: 0.72
    },
    {
      id: 5, emoji: '🌊', bossId: 'bubba',
      skyTop: 0x00f5d4, skyBot: 0x004e64,
      iceTint: 0x9bf6ff, snowTint: 0x80ffdb, wallTint: 0xcaf0f8,
      spireA: 0x00bbf9, spireB: 0x0077b6, bumperColor: 0xff4d6d,
      pattern: 'waves', setPiece: 'lagoonWater',
      bumperCount: 6, windX: -0.68, aiSkill: 0.79
    },
    {
      id: 6, emoji: '💎', bossId: 'craftycorn',
      skyTop: 0xff758f, skyBot: 0x590d22,
      iceTint: 0xffcad4, snowTint: 0xffb3c1, wallTint: 0xffe5ec,
      spireA: 0xff4d6d, spireB: 0xa4133c, bumperColor: 0x00f5d4,
      pattern: 'diamonds', setPiece: 'crystalClusters',
      bumperCount: 6, windX: 0.76, aiSkill: 0.85
    },
    {
      id: 7, emoji: '🌨️', bossId: 'kickin',
      skyTop: 0x7400b8, skyBot: 0x10002b,
      iceTint: 0xb8c0ff, snowTint: 0x9fa8da, wallTint: 0xc8b6ff,
      spireA: 0x5e60ce, spireB: 0x3a0ca3, bumperColor: 0xf72585,
      pattern: 'swirls', setPiece: 'blizzardVortex',
      bumperCount: 7, windX: -0.86, aiSkill: 0.91
    },
    {
      id: 8, emoji: '👑', bossId: 'hoppy',
      skyTop: 0xffbe0b, skyBot: 0x5a189a,
      iceTint: 0xfff1b8, snowTint: 0xffe082, wallTint: 0xfff8d6,
      spireA: 0xff9f1c, spireB: 0x7209b7, bumperColor: 0xe63946,
      pattern: 'crowns', setPiece: 'royalArch',
      bumperCount: 8, windX: 0.95, aiSkill: 0.96
    }
  ];

  const HOUSE_Z = -84;
  const HOUSE_RADII = {
    blue: 11.5,
    white: 8.2,
    red: 4.8,
    gold: 2.0
  };

  /* -------------------- GPU RESOURCE HELPERS -------------------- */
  function markShared(obj) {
    if (obj) {
      obj.userData = obj.userData || {};
      obj.userData.shared = true;
    }
    return obj;
  }

  function applySRGB(tex) {
    if (!tex) return tex;
    if ('colorSpace' in tex && typeof THREE !== 'undefined' && THREE.SRGBColorSpace) {
      tex.colorSpace = THREE.SRGBColorSpace;
    } else if ('encoding' in tex && typeof THREE !== 'undefined' && THREE.sRGBEncoding) {
      tex.encoding = THREE.sRGBEncoding;
    }
    return tex;
  }

  function disposeTree(root) {
    if (!root) return;
    const children = [...root.children];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      disposeTree(child);
      root.remove(child);
      if (child.geometry && (!child.geometry.userData || !child.geometry.userData.shared)) {
        child.geometry.dispose();
      }
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => {
          if (m && (!m.userData || !m.userData.shared)) {
            if (m.map && (!m.map.userData || !m.map.userData.shared)) {
              m.map.dispose();
            }
            m.dispose();
          }
        });
      }
    }
  }

  function drawBadgeCanvas(critter, imgSource = null) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 256, 256);

    ctx.save();
    ctx.beginPath();
    ctx.arc(128, 128, 118, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    if (imgSource) {
      try {
        ctx.drawImage(imgSource, 10, 10, 236, 236);
      } catch (e) {
        imgSource = null;
      }
    }

    if (!imgSource) {
      const grad = ctx.createRadialGradient(128, 100, 18, 128, 128, 120);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.5, critter.hex);
      grad.addColorStop(1, '#023e8a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);

      ctx.font = '112px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(critter.emoji, 128, 134);
    }
    ctx.restore();

    ctx.strokeStyle = critter.hex;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(128, 128, 114, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = critter.rimHex || '#ffd166';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(128, 128, 103, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#023e8a';
    ctx.beginPath();
    ctx.arc(204, 204, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.font = '42px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(critter.emoji, 204, 206);

    return canvas;
  }

  function createFallbackPortraitTexture(critter, maxAnisotropy = 1) {
    const canvas = drawBadgeCanvas(critter, null);
    const tex = new THREE.CanvasTexture(canvas);
    applySRGB(tex);
    tex.anisotropy = maxAnisotropy;
    markShared(tex);
    return tex;
  }

  function createSkyGradientTexture(topHex, botHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const topColor = '#' + new THREE.Color(topHex).getHexString();
    const botColor = '#' + new THREE.Color(botHex).getHexString();
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, topColor);
    grad.addColorStop(0.28, topColor);
    grad.addColorStop(0.48, botColor);
    grad.addColorStop(1.0, botColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 256);
    const tex = new THREE.CanvasTexture(canvas);
    applySRGB(tex);
    return tex;
  }

  function createStageIcePatternTexture(stageCfg) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const baseHex = '#' + new THREE.Color(stageCfg.iceTint).getHexString();
    const accentHex = '#' + new THREE.Color(stageCfg.spireA).getHexString();
    const deepHex = '#' + new THREE.Color(stageCfg.skyBot).getHexString();

    ctx.fillStyle = baseHex;
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = accentHex;
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 6;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 32);
      ctx.lineTo(256, i * 32 + 16);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.35;
    ctx.fillStyle = deepHex;
    ctx.strokeStyle = deepHex;
    ctx.lineWidth = 4;

    for (let y = 32; y < 256; y += 64) {
      for (let x = 32; x < 256; x += 64) {
        ctx.save();
        ctx.translate(x, y);
        if (stageCfg.pattern === 'snowflakes') {
          for (let k = 0; k < 6; k++) {
            ctx.rotate(Math.PI / 3);
            ctx.beginPath();
            ctx.moveTo(0, -18);
            ctx.lineTo(0, 18);
            ctx.stroke();
          }
        } else if (stageCfg.pattern === 'chevrons') {
          ctx.beginPath();
          ctx.moveTo(-18, 10);
          ctx.lineTo(0, -12);
          ctx.lineTo(18, 10);
          ctx.stroke();
        } else if (stageCfg.pattern === 'paws') {
          ctx.beginPath();
          ctx.arc(0, 4, 9, 0, Math.PI * 2);
          ctx.arc(-10, -8, 4, 0, Math.PI * 2);
          ctx.arc(0, -12, 4, 0, Math.PI * 2);
          ctx.arc(10, -8, 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (stageCfg.pattern === 'waves') {
          ctx.beginPath();
          ctx.arc(-10, 0, 10, 0, Math.PI, false);
          ctx.arc(10, 0, 10, Math.PI, Math.PI * 2, false);
          ctx.stroke();
        } else if (stageCfg.pattern === 'diamonds') {
          ctx.beginPath();
          ctx.moveTo(0, -16);
          ctx.lineTo(14, 0);
          ctx.lineTo(0, 16);
          ctx.lineTo(-14, 0);
          ctx.closePath();
          ctx.stroke();
        } else if (stageCfg.pattern === 'swirls') {
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 1.5);
          ctx.stroke();
        } else if (stageCfg.pattern === 'crowns') {
          ctx.beginPath();
          ctx.moveTo(-14, 10);
          ctx.lineTo(-14, -8);
          ctx.lineTo(-5, 2);
          ctx.lineTo(0, -12);
          ctx.lineTo(5, 2);
          ctx.lineTo(14, -8);
          ctx.lineTo(14, 10);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 14);
    applySRGB(tex);
    return tex;
  }

  /* -------------------- PROCEDURAL WEB AUDIO SYNTH -------------------- */
  class SoundFX {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    suspend() {
      if (this.ctx && this.ctx.state === 'running') {
        this.ctx.suspend().catch(() => {});
      }
    }

    tone(freq, duration, type = 'sine', vol = 0.14, slideTo = null, delaySec = 0) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const start = this.ctx.currentTime + Math.max(0, delaySec);
        const attack = Math.min(0.008, duration * 0.25);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(Math.max(30, freq), start);
        if (slideTo) {
          osc.frequency.exponentialRampToValueAtTime(Math.max(35, slideTo), start + duration);
        }
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(Math.max(0.001, vol), start + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch (e) {}
        };
        osc.start(start);
        osc.stop(start + duration + 0.01);
      } catch (e) {}
    }

    playClick() { this.tone(580, 0.08, 'triangle', 0.14, 860, 0); }
    playBonk() { this.tone(140, 0.11, 'sawtooth', 0.12, 88, 0); }
    playReadyChime() {
      this.tone(880, 0.10, 'sine', 0.12, 1174, 0);
      this.tone(1318, 0.14, 'triangle', 0.11, 1568, 0.06);
    }
    playCountdown(isGo = false) {
      if (isGo) {
        this.tone(784, 0.18, 'triangle', 0.16, 1174, 0);
        this.tone(1046, 0.22, 'sine', 0.14, 1568, 0.05);
      } else {
        this.tone(523, 0.11, 'sine', 0.12, 587, 0);
      }
    }
    playLaunch() {
      this.tone(220, 0.22, 'sine', 0.17, 520, 0);
      this.tone(440, 0.16, 'triangle', 0.11, 660, 0.05);
    }
    playSweep() {
      this.tone(420, 0.13, 'triangle', 0.12, 760, 0);
      this.tone(640, 0.14, 'sine', 0.12, 980, 0.055);
    }
    playMagnet() {
      this.tone(440, 0.22, 'sine', 0.15, 880, 0);
      this.tone(660, 0.22, 'triangle', 0.14, 1120, 0.08);
      this.tone(880, 0.20, 'sine', 0.12, 1320, 0.16);
    }
    playHeavy() {
      this.tone(145, 0.30, 'sawtooth', 0.20, 68, 0);
      this.tone(320, 0.22, 'triangle', 0.15, 640, 0.065);
    }
    playStoneClack(intensity = 1) {
      const v = Math.min(0.28, 0.12 * intensity);
      this.tone(190 + Math.random() * 70, 0.11, 'square', v, 85, 0);
      this.tone(720 + Math.random() * 160, 0.07, 'triangle', v * 0.8, 310, 0.01);
    }
    playKnockout() {
      this.tone(110, 0.24, 'sawtooth', 0.22, 52, 0);
      this.tone(587, 0.14, 'triangle', 0.16, 880, 0.04);
      this.tone(880, 0.18, 'sine', 0.15, 1318, 0.10);
    }
    playWallThud(speed = 4) {
      const v = Math.min(0.22, Math.max(0.05, speed * 0.025));
      this.tone(115, 0.14, 'sine', v, 52, 0);
    }
    playStar() {
      this.tone(784, 0.11, 'sine', 0.15, 1174, 0);
      this.tone(1046, 0.15, 'triangle', 0.14, 1568, 0.06);
    }
    playBullseye() {
      [523, 659, 784, 1046].forEach((n, idx) => {
        this.tone(n, 0.18, 'triangle', 0.16, n * 1.15, idx * 0.065);
      });
    }
    playFever() {
      [587, 740, 880, 1174, 1480].forEach((n, idx) => {
        this.tone(n, 0.20, 'sine', 0.16, n * 1.22, idx * 0.065);
      });
    }
    playVictory() {
      const notes = [
        { f: 523, d: 0.16, t: 0.00 },
        { f: 659, d: 0.16, t: 0.09 },
        { f: 784, d: 0.16, t: 0.18 },
        { f: 1046, d: 0.22, t: 0.27 },
        { f: 1318, d: 0.38, t: 0.38 }
      ];
      notes.forEach((n) => {
        this.tone(n.f, n.d, 'triangle', 0.18, n.f * 1.04, n.t);
      });
    }
    playDefeat() {
      // Expressive pitch-sliding sad trombone: wah-wah-wah-waaaah!
      this.tone(392, 0.22, 'sawtooth', 0.13, 370, 0.00);
      this.tone(370, 0.22, 'sawtooth', 0.13, 349, 0.23);
      this.tone(349, 0.22, 'sawtooth', 0.13, 330, 0.46);
      this.tone(311, 0.56, 'sawtooth', 0.15, 182, 0.69);
    }
  }

  /* -------------------- SAVE STATE MANAGEMENT -------------------- */
  function loadSave() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.unlockedStage === 'number') {
          return {
            selectedCritter: parsed.selectedCritter || 'catnap',
            unlockedStage: Math.max(1, Math.min(8, parsed.unlockedStage)),
            stageStars: parsed.stageStars || {},
            tutorialDone: Boolean(parsed.tutorialDone),
            audioEnabled: parsed.audioEnabled !== undefined ? Boolean(parsed.audioEnabled) : true
          };
        }
      }
    } catch (e) {}
    return {
      selectedCritter: 'catnap',
      unlockedStage: 1,
      stageStars: {},
      tutorialDone: false,
      audioEnabled: true
    };
  }

  function writeSave(save) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
    } catch (e) {}
  }

  /* -------------------- MAIN GAME CLASS -------------------- */
  class CritterCurling3DGame {
    constructor() {
      this.sfx = new SoundFX();
      this.save = loadSave();
      this.sfx.enabled = this.save.audioEnabled !== false;
      this.selectedCritterId = this.save.selectedCritter || 'catnap';
      this.selectedStageId = this.save.unlockedStage || 1;

      this.mode = 'title';
      this.paused = false;
      this.currentEnd = 1;
      this.totalEnds = 3;
      this.endTimer = 0;
      this.endDuration = 7.6;
      this.settleTimer = 0;
      this.countdownTimer = 0;
      this.lastCountdownStep = -1;
      this.tutorialTimer = 0;
      this.matchTime = 0;

      this.fever = 0;
      this.feverActive = false;
      this.feverTimer = 0;

      this.trauma = 0;
      this.hitStopTimer = 0;
      this.shockwavePool = [];
      this.aimDotsPool = [];
      this.burstParticleSystem = null;
      this.burstSlots = [];
      this.flyingCoinPool = [];
      this.pairCooldowns = new Map();

      this.pedalCooldowns = [0, 0, 0];
      this.pedalMaxCooldowns = [3.8, 2.6, 4.4];
      this.pedalActiveTimers = [0, 0, 0];

      this.input = { left: false, right: false, touchSteerX: 0 };

      this.curlers = [];
      this.stones = [];
      this.collectibles = [];
      this.bumpers = [];
      this.penguinTransforms = [];
      this.windPennants = [];
      this.snowParticles = null;
      this.previewBounce = 0;
      this.textureCache = {};
      this.badgeTextureCache = {};
      this.critterMats = {};
      this.hudChipRefs = [];
      this.assetsReady = false;
      this.assetsProgress = 0;
      this.webglAvailable = false;

      this.injectPerformanceCSS();
      this.initCockpitOverlays();
      this.bindUI();
      this.renderTitleGrids();

      const ok = this.initThree();
      if (ok) {
        this.initSharedResources();
        this.initImpactPools();
        this.loadPortraitAssets();
        this.buildRinkEnvironment(STAGES[this.selectedStageId - 1]);
        this.updateTitlePreviewStone();
        this.lastFrameTime = performance.now();
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
      }
    }

    injectPerformanceCSS() {
      const style = document.createElement('style');
      style.textContent = `
        #screen-title, .modal-overlay { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
        #screen-title { background: linear-gradient(180deg, rgba(2, 42, 98, 0.25) 0%, rgba(0, 90, 150, 0.45) 100%) !important; }
        #screen-hud {
          height: 100dvh;
          padding-top: max(12px, env(safe-area-inset-top));
          padding-bottom: max(16px, env(safe-area-inset-bottom));
          padding-left: max(16px, env(safe-area-inset-left));
          padding-right: max(16px, env(safe-area-inset-right));
        }
        .title-card {
          max-height: calc(100dvh - 16px) !important;
          overflow-y: auto !important;
          background: rgba(240, 250, 255, 0.92) !important;
        }
        .btn-jumbo-play.loading-assets { opacity: 0.78; position: relative; }
        .btn-jumbo-play:disabled { opacity: 0.4; cursor: not-allowed; filter: grayscale(0.8); }
        .webgl-fallback-card {
          position: fixed; inset: 16px; z-index: 999;
          display: flex; align-items: center; justify-content: center;
          font-size: 3.2rem; background: rgba(2, 62, 138, 0.92);
          border: 5px solid #fff; border-radius: 28px; color: #fff;
        }
        .stage-card {
          color: #ffffff !important;
          text-shadow: 0 2px 4px rgba(0,0,0,0.65);
          border-width: 3px !important;
        }
        .stage-num-badge { color: #023e8a !important; text-shadow: none; }
        .stage-boss-pip {
          font-size: 0.82rem; line-height: 1;
          background: rgba(0,0,0,0.38); border-radius: 99px; padding: 1px 6px;
        }
        /* Star Progress Meter on Title Screen */
        .star-meter-track {
          display: inline-flex; align-items: center; width: 92px; height: 12px;
          background: rgba(0,0,0,0.28); border-radius: 99px; overflow: hidden;
          border: 2px solid #fff; margin-left: 6px; vertical-align: middle;
        }
        .star-meter-fill {
          height: 100%; background: linear-gradient(90deg, #fee440, #ff4d6d);
          border-radius: 99px; transition: width 0.25s ease;
        }
        /* Zero-Wrap Top HUD Bar & Fixed Tabular Score Slots */
        .hud-top-bar {
          flex-wrap: nowrap !important;
          width: 100%;
          gap: 6px !important;
        }
        .hud-stage-pill {
          position: relative;
          padding: 4px 12px !important;
          gap: 6px !important;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hud-wave-ring {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 50%;
          background: conic-gradient(#00f5d4 var(--wave-deg, 360deg), rgba(255,255,255,0.18) 0deg);
          padding: 3px;
        }
        .hud-wave-ring-inner {
          width: 100%; height: 100%; border-radius: 50%;
          background: #023e8a; display: flex; align-items: center; justify-content: center;
          font-size: 1.05rem;
        }
        .hud-stage-dots {
          display: inline-flex; gap: 3px; align-items: center;
        }
        .hud-stage-dot {
          width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.32);
        }
        .hud-stage-dot.active {
          width: 9px; height: 9px; background: #fee440; box-shadow: 0 0 6px #fee440;
        }
        .hud-rank-strip {
          flex: 0 1 auto;
          min-width: 0;
          gap: 5px !important;
          padding: 3px 9px !important;
        }
        .hud-racer-chip {
          position: relative;
          padding: 2px 7px 2px 3px !important;
          gap: 4px !important;
        }
        .hud-racer-score {
          font-variant-numeric: tabular-nums !important;
          min-width: 3ch !important;
          text-align: right !important;
          display: inline-block;
        }
        .chip-medal-pip {
          font-size: 0.78rem; line-height: 1;
        }
        .hud-podium-divider {
          width: 4px; height: 28px; border-radius: 99px;
          background: linear-gradient(180deg, #fee440, #ff9f1c);
          box-shadow: 0 0 8px #fee440;
          margin: 0 2px;
        }
        .hud-racer-chip.qual-danger {
          border-color: #ef233c !important;
          animation: dangerPulse 0.9s infinite alternate ease-in-out;
        }
        @keyframes dangerPulse {
          0% { box-shadow: 0 0 0 rgba(239, 35, 60, 0); }
          100% { box-shadow: 0 0 14px rgba(239, 35, 60, 0.95); }
        }
        .hud-racer-chip.chip-pulse {
          transform: scale(1.22) !important;
          box-shadow: 0 0 18px #fee440 !important;
        }
        /* Fever Active State */
        .hud-fever-wrap { flex-shrink: 0; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hud-fever-wrap.fever-active {
          border-color: #fee440 !important;
          box-shadow: 0 0 22px #fee440, 0 0 36px #ff4d6d !important;
          animation: pulseScale 0.65s infinite ease-in-out;
        }
        /* Pedal Cooldown, Shake, Ready Pop & Hint Pulse */
        .power-pedal.cooling {
          filter: grayscale(0.85) brightness(0.72);
        }
        .pedal-cooldown {
          z-index: 4 !important;
          background: rgba(0, 14, 34, 0.58) !important;
          border-top: 2px solid rgba(255, 255, 255, 0.5);
        }
        .power-pedal.pedal-shake {
          animation: pedalBonkShake 0.22s ease;
        }
        @keyframes pedalBonkShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-7px); }
          75% { transform: translateX(7px); }
        }
        .power-pedal.pedal-ready-pop {
          animation: pedalReadyPop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes pedalReadyPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.22); box-shadow: 0 0 28px #00f5d4; }
          100% { transform: scale(1); }
        }
        .power-pedal.pedal-hint-pulse {
          box-shadow: 0 0 24px #fee440, 0 0 0 4px #fee440 !important;
          animation: pulseScale 0.75s infinite ease-in-out;
        }
        .steer-btn.held {
          transform: scale(0.90) !important;
          box-shadow: 0 0 20px #00f5d4, 0 0 0 4px #fee440 !important;
        }
        @media (hover: none), (pointer: coarse) {
          .pedal-key { display: none !important; }
        }
        .radar-dot {
          background-size: cover !important;
          background-position: center !important;
        }
        .flying-coin-layer {
          position: fixed; inset: 0; pointer-events: none; z-index: 25; overflow: hidden;
        }
        .flying-coin {
          position: absolute; left: 0; top: 0;
          font-size: 1.75rem; line-height: 1;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.45));
          will-change: transform, opacity;
          display: none;
        }
        /* Virtual Drag Joystick & Wordless Ghost Finger Tutorial */
        .drag-joystick {
          position: fixed; width: 88px; height: 88px; border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.85);
          background: radial-gradient(circle, rgba(0,245,212,0.28) 0%, rgba(2,62,138,0.45) 100%);
          transform: translate(-50%, -50%);
          pointer-events: none; z-index: 20; display: none;
        }
        .drag-joystick-thumb {
          position: absolute; left: 50%; top: 50%;
          width: 36px; height: 36px; border-radius: 50%;
          background: #fee440; border: 3px solid #fff;
          transform: translate(-50%, -50%);
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        }
        .tutorial-hand {
          position: fixed; bottom: 92px; left: 82px;
          font-size: 3.1rem; z-index: 22; pointer-events: none;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.55));
          animation: ghostFingerSwipe 1.3s infinite ease-in-out;
          display: none;
        }
        @keyframes ghostFingerSwipe {
          0%, 100% { transform: translateX(-26px) translateY(0) scale(1); }
          50% { transform: translateX(58px) translateY(-8px) scale(1.12); }
        }
        /* Ready Countdown & Pause Modal */
        .countdown-badge {
          position: fixed; left: 50%; top: 44%;
          transform: translate(-50%, -50%);
          font-size: 5.2rem; z-index: 24; pointer-events: none;
          filter: drop-shadow(0 10px 24px rgba(0,0,0,0.55));
          display: none;
        }
        .pause-overlay {
          position: fixed; inset: 0; z-index: 30;
          background: rgba(1, 28, 64, 0.72);
          display: none; align-items: center; justify-content: center; gap: 24px;
          pointer-events: auto;
        }
        .pause-overlay.active { display: flex; }
        /* Results Screen Victory vs Sad Defeat Themes & Qualification Cutline */
        .results-card {
          max-height: calc(100dvh - 16px) !important;
          overflow-y: auto !important;
        }
        .results-card.victory-card {
          border-color: #fee440 !important;
          box-shadow: 0 24px 65px rgba(2, 62, 138, 0.72), 0 0 38px rgba(254, 228, 64, 0.65) !important;
        }
        .results-card.defeat-card {
          background: linear-gradient(180deg, rgba(29, 53, 87, 0.96) 0%, rgba(11, 25, 44, 0.98) 100%) !important;
          border-color: #48cae4 !important;
          box-shadow: 0 24px 65px rgba(0, 0, 0, 0.8), 0 0 28px rgba(239, 35, 60, 0.45) !important;
        }
        .podium-row.defeat-player {
          background: linear-gradient(90deg, rgba(239, 35, 60, 0.36), rgba(72, 202, 228, 0.18)) !important;
          border-color: #ef233c !important;
        }
        .podium-cutline {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 2px 12px; margin: 2px 0; border-radius: 99px;
          background: linear-gradient(90deg, rgba(254,228,64,0.18), rgba(255,159,28,0.32), rgba(254,228,64,0.18));
          border: 2px dashed #fee440; color: #fee440;
          font-size: 0.82rem; font-weight: 900; letter-spacing: 0.5px;
        }
        .podium-ko-badge {
          font-size: 0.88rem; margin-right: 6px; opacity: 0.95;
        }
        .star-pop {
          display: inline-block;
          animation: starPopAnim 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes starPopAnim {
          0% { transform: scale(0) rotate(-25deg); opacity: 0; }
          70% { transform: scale(1.35) rotate(8deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .btn-action.retry-pulse {
          width: 92px !important; height: 92px !important; font-size: 2.6rem !important;
          border-color: #fee440 !important;
          box-shadow: 0 0 28px #ff9f1c, 0 8px 0 #9d0208 !important;
          animation: pulseScale 0.85s infinite ease-in-out;
        }
        /* Responsive Landscape Phone Rules (844x390, 667x375) */
        @media (max-height: 540px) {
          .title-emblem-row, .section-icon-header { display: none !important; }
          .title-card { padding: 8px 14px !important; gap: 6px !important; }
          .critter-grid, .stage-grid { grid-template-columns: repeat(8, 1fr) !important; gap: 6px !important; }
          .critter-avatar { width: 34px !important; height: 34px !important; }
          .critter-card { padding: 3px !important; border-radius: 12px !important; }
          .critter-badge-emoji { font-size: 0.95rem !important; }
          .stage-card { padding: 3px 2px !important; border-radius: 12px !important; }
          .stage-emoji { font-size: 1.15rem !important; }
          .stage-stars { font-size: 0.65rem !important; }
          .btn-jumbo-play { padding: 6px 28px !important; font-size: 1.35rem !important; }
          #screen-hud { padding: 6px 10px 8px !important; }
          .hud-circle-btn { width: 40px !important; height: 40px !important; font-size: 1.15rem !important; }
          .hud-stage-pill { padding: 3px 9px !important; font-size: 0.95rem !important; }
          .hud-racer-chip img { width: 24px !important; height: 24px !important; }
          .hud-racer-score { font-size: 0.82rem !important; }
          .fever-bar-track { width: 64px !important; height: 12px !important; }
          .hud-house-radar { width: 78px !important; height: 78px !important; top: 54px !important; right: 10px !important; }
          .radar-ring.ring-blue { width: 64px !important; height: 64px !important; }
          .radar-ring.ring-white { width: 46px !important; height: 46px !important; }
          .radar-ring.ring-red { width: 28px !important; height: 28px !important; }
          .radar-ring.ring-gold { width: 12px !important; height: 12px !important; }
          .steer-btn { width: 54px !important; height: 54px !important; font-size: 1.65rem !important; border-radius: 16px !important; }
          .power-pedal { width: 62px !important; height: 66px !important; border-radius: 18px !important; }
          .pedal-emoji { font-size: 1.65rem !important; }
          .pedal-sub { font-size: 0.85rem !important; }
          .results-card { padding: 8px 14px !important; gap: 4px !important; border-radius: 22px !important; }
          .results-banner-icon { font-size: 1.85rem !important; line-height: 1 !important; }
          .results-stars-row { font-size: 1.35rem !important; line-height: 1 !important; }
          .results-podium { gap: 3px !important; }
          .podium-row { padding: 2px 10px !important; font-size: 0.92rem !important; border-radius: 12px !important; border-width: 2px !important; }
          .podium-avatar { width: 24px !important; height: 24px !important; border-width: 2px !important; }
          .podium-score-pill { padding: 1px 8px !important; font-size: 0.85rem !important; }
          .podium-cutline { padding: 1px 8px !important; font-size: 0.68rem !important; margin: 1px 0 !important; }
          .results-actions { gap: 12px !important; margin-top: 2px !important; }
          .btn-action, .btn-action.retry-pulse { width: 48px !important; height: 48px !important; font-size: 1.35rem !important; box-shadow: 0 4px 0 rgba(0,0,0,0.35) !important; }
        }
        /* Responsive Portrait Phone Rules (390x844, 375x667, 360x640) */
        @media (max-width: 520px) {
          .hud-stage-dots, .hud-divider { display: none !important; }
          .hud-circle-btn { width: 38px !important; height: 38px !important; font-size: 1.1rem !important; }
          .hud-stage-pill { padding: 3px 7px !important; font-size: 0.9rem !important; }
          .hud-racer-chip { padding: 2px 4px 2px 2px !important; gap: 2px !important; }
          .hud-racer-chip img { width: 20px !important; height: 20px !important; }
          .hud-racer-score { font-size: 0.74rem !important; min-width: 2.5ch !important; }
          .chip-medal-pip { display: none !important; }
          .fever-bar-track { width: 42px !important; height: 10px !important; }
          .hud-house-radar { width: 82px !important; height: 82px !important; top: 58px !important; right: 10px !important; }
          .radar-ring.ring-blue { width: 68px !important; height: 68px !important; }
          .radar-ring.ring-white { width: 48px !important; height: 48px !important; }
          .radar-ring.ring-red { width: 28px !important; height: 28px !important; }
          .radar-ring.ring-gold { width: 12px !important; height: 12px !important; }
          .steer-cluster { gap: 8px !important; }
          .steer-btn { width: 52px !important; height: 58px !important; font-size: 1.6rem !important; border-radius: 16px !important; }
          .pedals-cluster { gap: 7px !important; }
          .power-pedal { width: 56px !important; height: 64px !important; border-radius: 18px !important; }
          .pedal-emoji { font-size: 1.55rem !important; }
          .pedal-sub { font-size: 0.8rem !important; }
        }
        @media (max-width: 520px) and (min-height: 541px) {
          .title-emblem-row { font-size: 1.55rem !important; }
          .emblem-main { font-size: 2.0rem !important; }
          .title-card { padding: 10px 12px !important; gap: 6px !important; }
          .critter-grid, .stage-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 6px !important; }
          .critter-avatar { width: 38px !important; height: 38px !important; }
          .critter-card { padding: 4px !important; border-radius: 14px !important; }
          .stage-card { padding: 4px 2px !important; border-radius: 14px !important; }
          .stage-emoji { font-size: 1.25rem !important; }
          .btn-jumbo-play { padding: 8px 32px !important; font-size: 1.5rem !important; }
          .results-card { padding: 14px 16px !important; gap: 8px !important; }
          .results-banner-icon { font-size: 2.8rem !important; }
          .results-stars-row { font-size: 2.0rem !important; }
          .podium-row { padding: 5px 12px !important; font-size: 1.05rem !important; }
          .podium-avatar { width: 32px !important; height: 32px !important; }
          .btn-action { width: 64px !important; height: 64px !important; font-size: 1.8rem !important; }
          .btn-action.retry-pulse { width: 74px !important; height: 74px !important; font-size: 2.1rem !important; }
        }
      `;
      document.head.appendChild(style);
    }

    initCockpitOverlays() {
      // 1. Remove English tooltip from Fever gauge
      const feverWrap = document.querySelector('.hud-fever-wrap');
      if (feverWrap) feverWrap.removeAttribute('title');

      // 2. Upgrade Stage Pill to Conic Wave Timer Ring + Visual Stage Dots
      const stagePill = document.querySelector('.hud-stage-pill');
      if (stagePill) {
        stagePill.innerHTML = `
          <div id="hud-wave-ring" class="hud-wave-ring">
            <div class="hud-wave-ring-inner"><span id="hud-stage-icon">🐧</span></div>
          </div>
          <div id="hud-stage-dots" class="hud-stage-dots"></div>
          <span class="hud-divider">•</span>
          <span id="hud-stones-row" class="hud-stones-row">🥌🥌🥌</span>
          <span id="hud-stage-num" style="display:none;">1/8</span>
        `;
      }

      // 3. Add Pause Button beside Audio Button
      const audioBtn = document.getElementById('btn-audio');
      if (audioBtn && audioBtn.parentNode) {
        const pauseBtn = document.createElement('button');
        pauseBtn.id = 'btn-pause';
        pauseBtn.className = 'hud-circle-btn';
        pauseBtn.setAttribute('aria-label', 'Pause');
        pauseBtn.textContent = '⏸️';
        audioBtn.parentNode.insertBefore(pauseBtn, audioBtn);
      }

      // 4. Flying Coin Pool Layer
      const layer = document.createElement('div');
      layer.className = 'flying-coin-layer';
      document.body.appendChild(layer);
      this.flyingCoinPool = [];
      for (let i = 0; i < 24; i++) {
        const el = document.createElement('div');
        el.className = 'flying-coin';
        layer.appendChild(el);
        this.flyingCoinPool.push({
          el,
          active: false,
          t: 0,
          duration: 0.58,
          sx: 0, sy: 0, cx: 0, cy: 0, tx: 0, ty: 0,
          targetChip: null
        });
      }

      // 5. Virtual Drag Joystick, Ghost-Finger Tutorial, Ready Countdown & Pause Modal
      const hudScreen = document.getElementById('screen-hud');
      if (hudScreen) {
        this.joystickEl = document.createElement('div');
        this.joystickEl.className = 'drag-joystick';
        this.joystickThumbEl = document.createElement('div');
        this.joystickThumbEl.className = 'drag-joystick-thumb';
        this.joystickEl.appendChild(this.joystickThumbEl);
        hudScreen.appendChild(this.joystickEl);

        this.tutorialHandEl = document.createElement('div');
        this.tutorialHandEl.id = 'hud-tutorial-hand';
        this.tutorialHandEl.className = 'tutorial-hand';
        this.tutorialHandEl.textContent = '👆';
        hudScreen.appendChild(this.tutorialHandEl);

        this.countdownEl = document.createElement('div');
        this.countdownEl.id = 'hud-countdown';
        this.countdownEl.className = 'countdown-badge';
        hudScreen.appendChild(this.countdownEl);

        this.pauseOverlayEl = document.createElement('div');
        this.pauseOverlayEl.id = 'hud-pause-modal';
        this.pauseOverlayEl.className = 'pause-overlay';
        this.pauseOverlayEl.innerHTML = `
          <button id="btn-pause-home" class="btn-action secondary" aria-label="Home">🏠</button>
          <button id="btn-pause-resume" class="btn-action next" aria-label="Resume">▶️</button>
        `;
        hudScreen.appendChild(this.pauseOverlayEl);
      }
    }

    showWebGLFallback() {
      const playBtn = document.getElementById('btn-play');
      if (playBtn) playBtn.disabled = true;
      const titleScreen = document.getElementById('screen-title');
      if (titleScreen && !titleScreen.querySelector('.webgl-fallback-card')) {
        const card = document.createElement('div');
        card.className = 'webgl-fallback-card';
        card.setAttribute('role', 'alert');
        card.textContent = '🧊⚠️🔄';
        titleScreen.appendChild(card);
      }
    }

    /* -------------------- THREE.JS SCENE & SHADOW SETUP -------------------- */
    initThree() {
      this.container = document.getElementById('canvas-container');
      if (typeof THREE === 'undefined') {
        this.showWebGLFallback();
        return false;
      }

      console.info(`[CritterCurling3D] Booting Three.js r${THREE.REVISION}`);

      try {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
      } catch (err) {
        console.warn('[CritterCurling3D] WebGLRenderer unavailable:', err);
        this.showWebGLFallback();
        return false;
      }

      this.webglAvailable = true;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      if (THREE.ACESFilmicToneMapping) {
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
      }
      if ('outputColorSpace' in this.renderer && THREE.SRGBColorSpace) {
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      } else if ('outputEncoding' in this.renderer && THREE.sRGBEncoding) {
        this.renderer.outputEncoding = THREE.sRGBEncoding;
      }

      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x72ddf7);
      this.scene.fog = new THREE.FogExp2(0x72ddf7, 0.0036);

      this.camera = new THREE.PerspectiveCamera(
        52,
        window.innerWidth / window.innerHeight,
        0.5,
        340
      );
      this.camera.position.set(0, 12.0, 18.0);
      this.camera.lookAt(0, 1.0, -24);

      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.22);
      this.scene.add(this.ambientLight);

      this.hemiLight = new THREE.HemisphereLight(0x72ddf7, 0x0077b6, 0.88);
      this.hemiLight.position.set(0, 50, 0);
      this.scene.add(this.hemiLight);

      this.sunLight = new THREE.DirectionalLight(0xffffff, 1.95);
      this.sunLight.position.set(22, 45, -24);
      this.sunLight.target.position.set(0, 0, -52);
      this.scene.add(this.sunLight);
      this.scene.add(this.sunLight.target);

      this.sunLight.castShadow = true;
      this.sunLight.shadow.mapSize.set(2048, 2048);
      const sc = this.sunLight.shadow.camera;
      sc.left = -75;
      sc.right = 75;
      sc.top = 75;
      sc.bottom = -75;
      sc.near = 1;
      sc.far = 220;
      sc.updateProjectionMatrix();
      this.sunLight.shadow.bias = -0.0004;
      if ('normalBias' in this.sunLight.shadow) {
        this.sunLight.shadow.normalBias = 0.03;
      }

      if (THREE.PMREMGenerator) {
        this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        if (this.pmremGenerator.compileCubemapShader) {
          this.pmremGenerator.compileCubemapShader();
        }
      }
      this.envMapRT = null;

      this.worldGroup = new THREE.Group();
      this.scene.add(this.worldGroup);

      this.stonesGroup = new THREE.Group();
      this.scene.add(this.stonesGroup);

      this.fxGroup = new THREE.Group();
      this.scene.add(this.fxGroup);

      this.previewGroup = new THREE.Group();
      this.previewGroup.position.set(0, 0, HOUSE_Z);
      this.scene.add(this.previewGroup);

      this.dummyObj = new THREE.Object3D();
      this.projVec = new THREE.Vector3();

      const applyViewportCamera = () => {
        const aspect = window.innerWidth / Math.max(1, window.innerHeight);
        this.camera.aspect = aspect;
        this.camera.fov = aspect < 1 ? Math.min(70, 52 / Math.max(0.68, aspect * 1.12)) : 52;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      };
      applyViewportCamera();
      window.addEventListener('resize', applyViewportCamera);

      return true;
    }

    /* -------------------- SHARED GEOMETRIES & MATERIALS -------------------- */
    initSharedResources() {
      const maxAniso = this.renderer.capabilities.getMaxAnisotropy
        ? this.renderer.capabilities.getMaxAnisotropy()
        : 1;
      this.maxAnisotropy = maxAniso;

      const makeCapsuleGeo = (r, l) => {
        if (THREE.CapsuleGeometry) return new THREE.CapsuleGeometry(r, l, 8, 12);
        return new THREE.CylinderGeometry(r, r * 1.05, l + r * 1.5, 12);
      };

      this.sharedGeo = {
        skyDome: markShared(new THREE.SphereGeometry(220, 24, 16)),
        snowGround: markShared(new THREE.PlaneGeometry(420, 420)),
        iceSheet: markShared(new THREE.BoxGeometry(28, 1.2, 132)),
        centerLine: markShared(new THREE.PlaneGeometry(0.22, 110)),
        sideLine: markShared(new THREE.PlaneGeometry(0.12, 105)),
        sideWall: markShared(new THREE.BoxGeometry(1.8, 1.8, 132)),
        backWall: markShared(new THREE.BoxGeometry(31.4, 2.4, 2.4)),
        ringBlue: markShared(new THREE.CircleGeometry(HOUSE_RADII.blue, 48)),
        ringWhite: markShared(new THREE.CircleGeometry(HOUSE_RADII.white, 48)),
        ringRed: markShared(new THREE.CircleGeometry(HOUSE_RADII.red, 48)),
        ringGold: markShared(new THREE.CircleGeometry(HOUSE_RADII.gold, 48)),
        beaconTorus: markShared(new THREE.TorusGeometry(HOUSE_RADII.gold + 0.35, 0.16, 14, 40)),
        shockwaveRing: markShared(new THREE.RingGeometry(0.82, 1.05, 40)),
        aimDotDisc: markShared(new THREE.CircleGeometry(0.38, 16)),
        penguinBody: markShared(makeCapsuleGeo(0.55, 0.7)),
        penguinBelly: markShared(new THREE.SphereGeometry(0.46, 12, 12)),
        penguinBeak: markShared(new THREE.ConeGeometry(0.18, 0.4, 8)),
        penguinScarf: markShared(new THREE.TorusGeometry(0.45, 0.1, 8, 16)),
        spireCone: markShared(new THREE.ConeGeometry(3.8, 10.0, 6)),
        bumperCyl: markShared(new THREE.CylinderGeometry(1.15, 1.35, 1.5, 10)),
        colRainbow: markShared(new THREE.TorusGeometry(0.65, 0.2, 10, 20)),
        colGem: markShared(new THREE.OctahedronGeometry(0.68, 0)),
        stoneBody: markShared(new THREE.CylinderGeometry(1.32, 1.38, 0.82, 28)),
        stoneCollar: markShared(new THREE.CylinderGeometry(1.10, 1.16, 0.16, 28)),
        stoneBand: markShared(new THREE.TorusGeometry(1.33, 0.16, 12, 32)),
        stoneStripe: markShared(new THREE.TorusGeometry(1.35, 0.065, 10, 32)),
        stoneMedallion: markShared(new THREE.CircleGeometry(1.06, 28)),
        handleStem: markShared(new THREE.CylinderGeometry(0.13, 0.15, 0.28, 12)),
        handleGrip: markShared(new THREE.BoxGeometry(0.28, 0.14, 0.56)),
        earCat: markShared(new THREE.ConeGeometry(0.26, 0.52, 4)),
        earDog: markShared(new THREE.SphereGeometry(0.25, 10, 10)),
        earBear: markShared(new THREE.SphereGeometry(0.27, 12, 12)),
        earPig: markShared(new THREE.ConeGeometry(0.21, 0.38, 6)),
        pigSnout: markShared(new THREE.CylinderGeometry(0.24, 0.24, 0.12, 14)),
        earElephant: markShared(new THREE.CylinderGeometry(0.48, 0.48, 0.10, 16)),
        hornUnicorn: markShared(new THREE.ConeGeometry(0.20, 0.72, 12)),
        earCrest: markShared(new THREE.SphereGeometry(0.20, 10, 10)),
        earBunny: markShared(makeCapsuleGeo(0.14, 0.62)),
        broomShaft: markShared(new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8)),
        broomPad: markShared(new THREE.BoxGeometry(0.65, 0.16, 0.28)),
        haloRing: markShared(new THREE.RingGeometry(1.55, 1.84, 32)),
        iglooDome: markShared(new THREE.SphereGeometry(3.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2)),
        iglooDoor: markShared(new THREE.CylinderGeometry(1.1, 1.1, 2.2, 12)),
        snowflakeArm: markShared(new THREE.BoxGeometry(0.45, 4.8, 0.35)),
        alpineArch: markShared(new THREE.TorusGeometry(16.5, 1.8, 8, 24, Math.PI)),
        polarBearBody: markShared(makeCapsuleGeo(1.1, 1.4)),
        polarBearHead: markShared(new THREE.SphereGeometry(0.85, 12, 12)),
        waterPlane: markShared(new THREE.PlaneGeometry(55, 132)),
        crystalSpire: markShared(new THREE.OctahedronGeometry(2.4, 0)),
        royalArch: markShared(new THREE.TorusGeometry(15.2, 1.1, 12, 32, Math.PI)),
        royalPillar: markShared(new THREE.CylinderGeometry(1.1, 1.3, 12, 12)),
        windPole: markShared(new THREE.CylinderGeometry(0.08, 0.1, 3.8, 8)),
        windFlag: markShared(new THREE.ConeGeometry(0.45, 2.2, 4)),
        magnetVortexOuter: markShared(new THREE.TorusGeometry(1.75, 0.08, 10, 32)),
        magnetVortexInner: markShared(new THREE.TorusGeometry(1.22, 0.07, 10, 28)),
        heavyAuraRing: markShared(new THREE.TorusGeometry(1.52, 0.14, 10, 24))
      };

      this.sharedMat = {
        ice: markShared(new THREE.MeshStandardMaterial({ color: 0xc8f0ff, roughness: 0.16, metalness: 0.12 })),
        snowGround: markShared(new THREE.MeshStandardMaterial({ color: 0xd9f2ff, roughness: 0.85, metalness: 0.02 })),
        snowWall: markShared(new THREE.MeshStandardMaterial({ color: 0xe8f8ff, roughness: 0.72, metalness: 0.04 })),
        centerLine: markShared(new THREE.MeshBasicMaterial({ color: 0x0077b6, polygonOffset: true, polygonOffsetFactor: -1, toneMapped: false })),
        sideLine: markShared(new THREE.MeshBasicMaterial({ color: 0x48cae4, transparent: true, opacity: 0.65, polygonOffset: true, polygonOffsetFactor: -1, toneMapped: false })),
        ringBlue: markShared(new THREE.MeshBasicMaterial({ color: 0x0077b6, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1, toneMapped: false })),
        ringWhite: markShared(new THREE.MeshBasicMaterial({ color: 0xffffff, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2, toneMapped: false })),
        ringRed: markShared(new THREE.MeshBasicMaterial({ color: 0xef233c, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3, toneMapped: false })),
        ringGold: markShared(new THREE.MeshBasicMaterial({ color: 0xffd166, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4, toneMapped: false })),
        beacon: markShared(new THREE.MeshBasicMaterial({ color: 0xfee440, toneMapped: false })),
        penguinBody: markShared(new THREE.MeshStandardMaterial({ color: 0x1d3557, roughness: 0.42 })),
        penguinBelly: markShared(new THREE.MeshStandardMaterial({ color: 0xf8f9fa, roughness: 0.5 })),
        penguinBeak: markShared(new THREE.MeshStandardMaterial({ color: 0xff9f1c, roughness: 0.35 })),
        penguinScarf: markShared(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })),
        spireEven: markShared(new THREE.MeshStandardMaterial({ color: 0x48cae4, roughness: 0.28, metalness: 0.15 })),
        spireOdd: markShared(new THREE.MeshStandardMaterial({ color: 0x0096c7, roughness: 0.28, metalness: 0.15 })),
        bumper: markShared(new THREE.MeshStandardMaterial({ color: 0x00f5d4, emissive: 0x0077b6, emissiveIntensity: 0.28, roughness: 0.18, metalness: 0.2 })),
        colRainbow: markShared(new THREE.MeshStandardMaterial({ color: 0xff4d6d, emissive: 0xff4d6d, emissiveIntensity: 0.35, roughness: 0.2 })),
        colGem: markShared(new THREE.MeshStandardMaterial({ color: 0x00f5d4, emissive: 0x00f5d4, emissiveIntensity: 0.35, roughness: 0.2 })),
        colStar: markShared(new THREE.MeshStandardMaterial({ color: 0xfee440, emissive: 0xfee440, emissiveIntensity: 0.35, roughness: 0.2 })),
        granite: markShared(new THREE.MeshStandardMaterial({ color: 0x4a5759, roughness: 0.26, metalness: 0.35 })),
        collar: markShared(new THREE.MeshStandardMaterial({ color: 0xe9ecef, roughness: 0.22, metalness: 0.45 })),
        hornGold: markShared(new THREE.MeshStandardMaterial({ color: 0xfee440, emissive: 0xfee440, emissiveIntensity: 0.3, roughness: 0.22 })),
        crestRed: markShared(new THREE.MeshStandardMaterial({ color: 0xef233c, emissive: 0xef233c, emissiveIntensity: 0.25, roughness: 0.28 })),
        broomShaft: markShared(new THREE.MeshBasicMaterial({ color: 0xfee440, toneMapped: false })),
        broomPad: markShared(new THREE.MeshBasicMaterial({ color: 0x00f5d4, toneMapped: false })),
        magnetOuter: markShared(new THREE.MeshBasicMaterial({ color: 0x9b5de5, transparent: true, opacity: 0.88, toneMapped: false })),
        magnetInner: markShared(new THREE.MeshBasicMaterial({ color: 0x00f5d4, transparent: true, opacity: 0.92, toneMapped: false })),
        heavyAura: markShared(new THREE.MeshBasicMaterial({ color: 0xff9f1c, transparent: true, opacity: 0.90, toneMapped: false })),
        halo: markShared(new THREE.MeshBasicMaterial({
          color: 0xfee440,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: -5,
          depthWrite: false,
          toneMapped: false
        })),
        setIgloo: markShared(new THREE.MeshStandardMaterial({ color: 0xf0f8ff, roughness: 0.45, metalness: 0.05 })),
        setSnowflake: markShared(new THREE.MeshStandardMaterial({ color: 0x90e0ef, emissive: 0x00b4d8, emissiveIntensity: 0.45, roughness: 0.15 })),
        setAlpine: markShared(new THREE.MeshStandardMaterial({ color: 0x40916c, roughness: 0.55, metalness: 0.1 })),
        setBear: markShared(new THREE.MeshStandardMaterial({ color: 0xfffdf7, roughness: 0.5 })),
        setWater: markShared(new THREE.MeshStandardMaterial({ color: 0x00bbf9, emissive: 0x0077b6, emissiveIntensity: 0.25, roughness: 0.08, metalness: 0.35 })),
        setCrystal: markShared(new THREE.MeshStandardMaterial({ color: 0xff4d6d, emissive: 0xff007f, emissiveIntensity: 0.45, roughness: 0.1, metalness: 0.4 })),
        setRoyalGold: markShared(new THREE.MeshStandardMaterial({ color: 0xffbe0b, emissive: 0xff9f1c, emissiveIntensity: 0.35, roughness: 0.18, metalness: 0.65 })),
        windFlag: markShared(new THREE.MeshBasicMaterial({ color: 0xff4d6d, toneMapped: false }))
      };

      CRITTERS.forEach((c) => {
        const fallbackTex = createFallbackPortraitTexture(c, maxAniso);
        this.textureCache[c.id] = fallbackTex;
        this.badgeTextureCache[c.id] = fallbackTex;
        this.critterMats[c.id] = {
          bandPlayer: markShared(new THREE.MeshStandardMaterial({
            color: c.color,
            emissive: c.color,
            emissiveIntensity: 0.42,
            roughness: 0.2,
            metalness: 0.2
          })),
          bandAI: markShared(new THREE.MeshStandardMaterial({
            color: c.color,
            emissive: c.color,
            emissiveIntensity: 0.18,
            roughness: 0.22,
            metalness: 0.18
          })),
          stripe: markShared(new THREE.MeshBasicMaterial({
            color: new THREE.Color(c.rimHex || '#ffffff'),
            toneMapped: false
          })),
          handle: markShared(new THREE.MeshStandardMaterial({ color: c.color, roughness: 0.22, metalness: 0.15 })),
          ear: markShared(new THREE.MeshStandardMaterial({ color: c.color, roughness: 0.28 })),
          medallion: markShared(new THREE.MeshBasicMaterial({
            map: fallbackTex,
            color: 0xffffff,
            toneMapped: false
          }))
        };
      });
    }

    /* -------------------- POOLED 3D SHOCKWAVES, AIM DOTS & PARTICLE BURSTS -------------------- */
    initImpactPools() {
      // 1. Pool of 8 Shockwave Rings
      this.shockwavePool = [];
      for (let i = 0; i < 8; i++) {
        const mat = markShared(new THREE.MeshBasicMaterial({
          color: 0xfee440,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          toneMapped: false
        }));
        const mesh = new THREE.Mesh(this.sharedGeo.shockwaveRing, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = 0.08;
        mesh.visible = false;
        mesh.renderOrder = 8;
        this.fxGroup.add(mesh);
        this.shockwavePool.push({ mesh, mat, active: false, t: 0, duration: 0.36, maxScale: 5.0 });
      }

      // 2. Pool of 12 Predicted-Path Aiming Dots on the Ice
      this.aimDotsPool = [];
      for (let i = 0; i < 12; i++) {
        const mat = markShared(new THREE.MeshBasicMaterial({
          color: 0x00f5d4,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          toneMapped: false
        }));
        const mesh = new THREE.Mesh(this.sharedGeo.aimDotDisc, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = 0.065;
        mesh.visible = false;
        mesh.renderOrder = 7;
        this.fxGroup.add(mesh);
        this.aimDotsPool.push({ mesh, mat });
      }

      // 3. Pre-allocated 384-slot 3D Particle Burst System
      const count = 384;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      this.burstSlots = [];
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] = -999;
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
        this.burstSlots.push({
          active: false,
          x: 0, y: -999, z: 0,
          vx: 0, vy: 0, vz: 0,
          life: 0, maxLife: 0.5
        });
      }
      const pGeo = markShared(new THREE.BufferGeometry());
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const pMat = markShared(new THREE.PointsMaterial({
        size: 0.55,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        toneMapped: false
      }));
      this.burstParticleSystem = new THREE.Points(pGeo, pMat);
      this.burstParticleSystem.frustumCulled = false;
      this.fxGroup.add(this.burstParticleSystem);
      this.burstCursor = 0;
    }

    updatePredictedAimDots() {
      if (!this.aimDotsPool.length) return;
      const st = this.playerStone;
      const speed = st ? Math.hypot(st.vx, st.vz) : 0;
      if (this.mode !== 'playing' || !st || this.settleTimer > 0 || speed < 1.2 || st.z < HOUSE_Z - 6) {
        for (let i = 0; i < this.aimDotsPool.length; i++) {
          this.aimDotsPool[i].mesh.visible = false;
        }
        return;
      }

      // Integrate 12 future steps using exact ice friction, steer, magnet, and wind physics
      let px = st.x;
      let pz = st.z;
      let pvx = st.vx;
      let pvz = st.vz;
      let magT = st.magnetTimer;
      const windX = this.stageCfg ? this.stageCfg.windX : 0;
      let steer = 0;
      if (this.input.left) steer -= 1;
      if (this.input.right) steer += 1;
      if (Math.abs(this.input.touchSteerX) > 0.05) steer += this.input.touchSteerX;

      const stepDt = 0.16;
      const pts = [];
      for (let i = 0; i < 12; i++) {
        pvx += steer * 13.5 * stepDt;
        if (magT > 0 || this.feverActive) {
          pvx += (0 - px) * 4.2 * stepDt;
          const dzToHouse = HOUSE_Z - pz;
          if (dzToHouse > -3.5 && dzToHouse < 10) {
            pvz += (-dzToHouse * 2.1 - pvz * 1.9) * stepDt;
          }
          magT = Math.max(0, magT - stepDt);
        } else if (steer === 0 && pz > HOUSE_Z + 6) {
          pvx += (0 - px) * 0.72 * stepDt;
        }
        if (pz > HOUSE_Z + 8) {
          pvx += windX * 0.45 * stepDt;
        }
        const inHouse = pz <= HOUSE_Z + 11.5;
        const fric = inHouse ? 0.962 : 0.9978;
        const fPow = Math.pow(fric, stepDt * 60);
        pvx *= fPow;
        pvz *= fPow;
        px = Math.max(-12.5, Math.min(12.5, px + pvx * stepDt));
        pz = Math.max(-102, pz + pvz * stepDt);
        pts.push({ x: px, z: pz });
      }

      const endPt = pts[pts.length - 1];
      const endDistToButton = Math.hypot(endPt.x, endPt.z - HOUSE_Z);
      const landsInHouse = endDistToButton <= HOUSE_RADII.blue;
      const dotColor = endDistToButton <= HOUSE_RADII.red
        ? 0xfee440
        : landsInHouse
        ? 0x38b000
        : 0x00bbf9;

      const fadeFactor = Math.min(1.0, (speed - 1.2) / 6.0);
      for (let i = 0; i < this.aimDotsPool.length; i++) {
        const dot = this.aimDotsPool[i];
        const pt = pts[i];
        dot.mesh.position.set(pt.x, 0.068, pt.z);
        const sc = (1.0 - i * 0.055) * (i === 11 && landsInHouse ? 1.55 : 1.0);
        dot.mesh.scale.set(sc, sc, 1);
        dot.mat.color.setHex(dotColor);
        dot.mat.opacity = (0.82 - i * 0.05) * fadeFactor;
        dot.mesh.visible = dot.mat.opacity > 0.05;
      }
    }

    spawnShockwave(x, z, colorHex = 0xfee440, maxScale = 5.0) {
      if (!this.shockwavePool.length) return;
      const slot = this.shockwavePool.find((s) => !s.active) || this.shockwavePool[0];
      slot.active = true;
      slot.t = 0;
      slot.duration = maxScale > 6 ? 0.44 : 0.34;
      slot.maxScale = maxScale;
      slot.mat.color.setHex(colorHex);
      slot.mat.opacity = 0.92;
      slot.mesh.position.set(x, 0.08, z);
      slot.mesh.scale.set(0.75, 0.75, 1);
      slot.mesh.visible = true;
    }

    spawnParticleBurst(x, y, z, colorHex = 0xffffff, count = 28, speed = 7.5) {
      if (!this.burstParticleSystem) return;
      const posAttr = this.burstParticleSystem.geometry.attributes.position;
      const colAttr = this.burstParticleSystem.geometry.attributes.color;
      const baseColor = new THREE.Color(colorHex);

      for (let i = 0; i < count; i++) {
        const idx = this.burstCursor;
        this.burstCursor = (this.burstCursor + 1) % this.burstSlots.length;
        const s = this.burstSlots[idx];
        const angle = Math.random() * Math.PI * 2;
        const spd = (0.35 + Math.random() * 0.65) * speed;
        s.active = true;
        s.x = x + (Math.random() - 0.5) * 0.5;
        s.y = y + 0.25 + Math.random() * 0.3;
        s.z = z + (Math.random() - 0.5) * 0.5;
        s.vx = Math.cos(angle) * spd;
        s.vy = 2.8 + Math.random() * (speed * 0.75);
        s.vz = Math.sin(angle) * spd;
        s.maxLife = 0.42 + Math.random() * 0.28;
        s.life = s.maxLife;

        posAttr.setXYZ(idx, s.x, s.y, s.z);
        const mix = i % 3 === 0 ? 1.0 : 0.0;
        colAttr.setXYZ(
          idx,
          baseColor.r * (1 - mix) + mix,
          baseColor.g * (1 - mix) + mix,
          baseColor.b * (1 - mix) + mix
        );
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    spawnFlyingCoin(worldX, worldY, worldZ, curler, emoji = '⭐') {
      if (!this.camera || !this.flyingCoinPool.length) return;
      const slot = this.flyingCoinPool.find((c) => !c.active);
      if (!slot) return;

      this.projVec.set(worldX, worldY, worldZ);
      this.projVec.project(this.camera);
      const sx = (this.projVec.x * 0.5 + 0.5) * window.innerWidth;
      const sy = (-this.projVec.y * 0.5 + 0.5) * window.innerHeight;

      const chipRef = this.hudChipRefs.find((r) => r.curler === curler);
      let tx = window.innerWidth * 0.5;
      let ty = 34;
      if (chipRef && chipRef.chip) {
        const rect = chipRef.chip.getBoundingClientRect();
        if (rect.width > 0) {
          tx = rect.left + rect.width * 0.5;
          ty = rect.top + rect.height * 0.5;
        }
      }

      slot.active = true;
      slot.t = 0;
      slot.duration = 0.56;
      slot.sx = Math.max(20, Math.min(window.innerWidth - 20, sx));
      slot.sy = Math.max(20, Math.min(window.innerHeight - 20, sy));
      slot.tx = tx;
      slot.ty = ty;
      slot.cx = (slot.sx + tx) * 0.5 + (Math.random() - 0.5) * 90;
      slot.cy = Math.min(slot.sy, ty) - 65;
      slot.targetChip = chipRef ? chipRef.chip : null;
      slot.el.textContent = emoji;
      slot.el.style.display = 'block';
      slot.el.style.opacity = '1';
      slot.el.style.transform = `translate3d(${slot.sx}px, ${slot.sy}px, 0) scale(1)`;
    }

    updateImpactFX(dt) {
      for (let i = 0; i < this.shockwavePool.length; i++) {
        const sw = this.shockwavePool[i];
        if (!sw.active) continue;
        sw.t += dt;
        const p = sw.t / sw.duration;
        if (p >= 1) {
          sw.active = false;
          sw.mesh.visible = false;
        } else {
          const sc = 0.75 + (sw.maxScale - 0.75) * (1 - Math.pow(1 - p, 2));
          sw.mesh.scale.set(sc, sc, 1);
          sw.mat.opacity = 0.92 * (1 - p);
        }
      }

      if (this.burstParticleSystem) {
        const posAttr = this.burstParticleSystem.geometry.attributes.position;
        let anyActive = false;
        for (let i = 0; i < this.burstSlots.length; i++) {
          const s = this.burstSlots[i];
          if (!s.active) continue;
          anyActive = true;
          s.life -= dt;
          if (s.life <= 0) {
            s.active = false;
            posAttr.setXYZ(i, 0, -999, 0);
          } else {
            s.vy -= 18.0 * dt;
            s.x += s.vx * dt;
            s.y += s.vy * dt;
            s.z += s.vz * dt;
            if (s.y < 0.08) {
              s.y = 0.08;
              s.vy = Math.abs(s.vy) * 0.35;
              s.vx *= 0.8;
              s.vz *= 0.8;
            }
            posAttr.setXYZ(i, s.x, s.y, s.z);
          }
        }
        if (anyActive) {
          posAttr.needsUpdate = true;
        }
      }

      for (let i = 0; i < this.flyingCoinPool.length; i++) {
        const fc = this.flyingCoinPool[i];
        if (!fc.active) continue;
        fc.t += dt;
        const u = Math.min(1, fc.t / fc.duration);
        const inv = 1 - u;
        const x = inv * inv * fc.sx + 2 * inv * u * fc.cx + u * u * fc.tx;
        const y = inv * inv * fc.sy + 2 * inv * u * fc.cy + u * u * fc.ty;
        const scale = 0.85 + Math.sin(u * Math.PI) * 0.55;
        fc.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(2)})`;
        if (u >= 1) {
          fc.active = false;
          fc.el.style.display = 'none';
          if (fc.targetChip) {
            fc.targetChip.classList.add('chip-pulse');
            setTimeout(() => fc.targetChip && fc.targetChip.classList.remove('chip-pulse'), 180);
          }
        }
      }
    }

    addTrauma(amount) {
      this.trauma = Math.min(1.0, this.trauma + amount);
    }

    loadPortraitAssets() {
      const playBtn = document.getElementById('btn-play');
      if (playBtn) playBtn.classList.add('loading-assets');

      const manager = new THREE.LoadingManager();
      manager.onProgress = (url, loaded, total) => {
        this.assetsProgress = total > 0 ? Math.round((loaded / total) * 100) : 100;
      };
      manager.onLoad = () => {
        this.assetsReady = true;
        this.assetsProgress = 100;
        if (playBtn) playBtn.classList.remove('loading-assets');
      };
      manager.onError = (url) => {
        console.warn('[CritterCurling3D] Portrait texture fallback active for:', url);
      };

      const loader = new THREE.TextureLoader(manager);
      CRITTERS.forEach((c) => {
        loader.load(
          c.icon,
          (tex) => {
            applySRGB(tex);
            tex.anisotropy = this.maxAnisotropy || 1;
            markShared(tex);
            this.textureCache[c.id] = tex;

            const badgeCanvas = drawBadgeCanvas(c, tex.image);
            const badgeTex = new THREE.CanvasTexture(badgeCanvas);
            applySRGB(badgeTex);
            badgeTex.anisotropy = this.maxAnisotropy || 1;
            markShared(badgeTex);
            this.badgeTextureCache[c.id] = badgeTex;

            if (this.critterMats[c.id] && this.critterMats[c.id].medallion) {
              this.critterMats[c.id].medallion.map = tex;
              this.critterMats[c.id].medallion.needsUpdate = true;
            }
            this.stones.forEach((st) => {
              if (st.curler.critter.id === c.id && st.badgeMat) {
                st.badgeMat.map = badgeTex;
                st.badgeMat.needsUpdate = true;
              }
            });
            if (this.selectedCritterId === c.id && this.mode === 'title') {
              this.updateTitlePreviewStone();
            }
          },
          undefined,
          () => {}
        );
      });
    }

    updateStageEnvironmentMap(stageCfg) {
      const skyTex = createSkyGradientTexture(stageCfg.skyTop, stageCfg.skyBot);
      if (this.skyDomeMesh) {
        if (this.skyDomeMesh.material.map) {
          this.skyDomeMesh.material.map.dispose();
        }
        this.skyDomeMesh.material.map = skyTex;
        this.skyDomeMesh.material.needsUpdate = true;
      }

      if (!this.pmremGenerator) return;
      try {
        const envScene = new THREE.Scene();
        const envMesh = new THREE.Mesh(
          this.sharedGeo.skyDome,
          new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false })
        );
        envScene.add(envMesh);
        const nextRT = this.pmremGenerator.fromScene(envScene, 0.04);
        if (this.envMapRT) {
          this.envMapRT.dispose();
        }
        this.envMapRT = nextRT;
        this.scene.environment = nextRT.texture;
        envMesh.material.dispose();
      } catch (e) {}
    }

    /* -------------------- GLACIER RINK, SET-PIECES & BULLSEYE HOUSE -------------------- */
    buildRinkEnvironment(stageCfg) {
      if (!this.webglAvailable) return;
      disposeTree(this.worldGroup);
      this.penguinTransforms = [];
      this.bumpers = [];
      this.collectibles = [];
      this.windPennants = [];
      this.snowParticles = null;

      this.scene.background = new THREE.Color(stageCfg.skyBot);
      this.scene.fog.color.setHex(stageCfg.skyBot);
      this.hemiLight.color.setHex(stageCfg.skyTop);
      this.hemiLight.groundColor.setHex(stageCfg.skyBot);

      if (this.sharedMat.ice.map) {
        this.sharedMat.ice.map.dispose();
      }
      this.sharedMat.ice.map = createStageIcePatternTexture(stageCfg);
      this.sharedMat.ice.color.setHex(0xffffff);
      this.sharedMat.ice.needsUpdate = true;

      this.sharedMat.snowGround.color.setHex(stageCfg.snowTint);
      this.sharedMat.snowWall.color.setHex(stageCfg.wallTint);
      this.sharedMat.spireEven.color.setHex(stageCfg.spireA);
      this.sharedMat.spireOdd.color.setHex(stageCfg.spireB);
      this.sharedMat.bumper.color.setHex(stageCfg.bumperColor);
      this.sharedMat.bumper.emissive.setHex(stageCfg.skyBot);

      const skyTex = createSkyGradientTexture(stageCfg.skyTop, stageCfg.skyBot);
      const skyDomeMat = new THREE.MeshBasicMaterial({
        map: skyTex,
        side: THREE.BackSide,
        depthWrite: false,
        toneMapped: false,
        fog: false
      });
      this.skyDomeMesh = new THREE.Mesh(this.sharedGeo.skyDome, skyDomeMat);
      this.worldGroup.add(this.skyDomeMesh);
      this.updateStageEnvironmentMap(stageCfg);

      const snowGround = new THREE.Mesh(this.sharedGeo.snowGround, this.sharedMat.snowGround);
      snowGround.rotation.x = -Math.PI / 2;
      snowGround.position.set(0, -0.05, -52);
      snowGround.receiveShadow = true;
      this.worldGroup.add(snowGround);

      const iceMesh = new THREE.Mesh(this.sharedGeo.iceSheet, this.sharedMat.ice);
      iceMesh.position.set(0, -0.6, -52);
      iceMesh.receiveShadow = true;
      this.worldGroup.add(iceMesh);

      const centerLine = new THREE.Mesh(this.sharedGeo.centerLine, this.sharedMat.centerLine);
      centerLine.rotation.x = -Math.PI / 2;
      centerLine.position.set(0, 0.012, -48);
      this.worldGroup.add(centerLine);

      [-6, 6].forEach((lx) => {
        const sideLine = new THREE.Mesh(this.sharedGeo.sideLine, this.sharedMat.sideLine);
        sideLine.rotation.x = -Math.PI / 2;
        sideLine.position.set(lx, 0.012, -48);
        this.worldGroup.add(sideLine);
      });

      const ringSpecs = [
        { geo: this.sharedGeo.ringBlue, mat: this.sharedMat.ringBlue, y: 0.018, order: 1 },
        { geo: this.sharedGeo.ringWhite, mat: this.sharedMat.ringWhite, y: 0.024, order: 2 },
        { geo: this.sharedGeo.ringRed, mat: this.sharedMat.ringRed, y: 0.030, order: 3 },
        { geo: this.sharedGeo.ringGold, mat: this.sharedMat.ringGold, y: 0.036, order: 4 }
      ];
      ringSpecs.forEach((rg) => {
        const disc = new THREE.Mesh(rg.geo, rg.mat);
        disc.rotation.x = -Math.PI / 2;
        disc.position.set(0, rg.y, HOUSE_Z);
        disc.renderOrder = rg.order;
        disc.receiveShadow = true;
        this.worldGroup.add(disc);
      });

      this.bullseyeBeacon = new THREE.Mesh(this.sharedGeo.beaconTorus, this.sharedMat.beacon);
      this.bullseyeBeacon.rotation.x = Math.PI / 2;
      this.bullseyeBeacon.position.set(0, 0.24, HOUSE_Z);
      this.worldGroup.add(this.bullseyeBeacon);

      [-14.8, 14.8].forEach((sx) => {
        const wall = new THREE.Mesh(this.sharedGeo.sideWall, this.sharedMat.snowWall);
        wall.position.set(sx, 0.6, -52);
        wall.castShadow = true;
        wall.receiveShadow = true;
        this.worldGroup.add(wall);
      });
      const backWall = new THREE.Mesh(this.sharedGeo.backWall, this.sharedMat.snowWall);
      backWall.position.set(0, 0.9, -116);
      backWall.castShadow = true;
      backWall.receiveShadow = true;
      this.worldGroup.add(backWall);

      const penguinCount = 28;
      this.penguinBodyIM = new THREE.InstancedMesh(this.sharedGeo.penguinBody, this.sharedMat.penguinBody, penguinCount);
      this.penguinBellyIM = new THREE.InstancedMesh(this.sharedGeo.penguinBelly, this.sharedMat.penguinBelly, penguinCount);
      this.penguinBeakIM = new THREE.InstancedMesh(this.sharedGeo.penguinBeak, this.sharedMat.penguinBeak, penguinCount);
      this.penguinScarfIM = new THREE.InstancedMesh(this.sharedGeo.penguinScarf, this.sharedMat.penguinScarf, penguinCount);
      this.penguinBodyIM.castShadow = true;
      this.penguinBodyIM.receiveShadow = true;

      this.spireEvenIM = new THREE.InstancedMesh(this.sharedGeo.spireCone, this.sharedMat.spireEven, 14);
      this.spireOddIM = new THREE.InstancedMesh(this.sharedGeo.spireCone, this.sharedMat.spireOdd, 14);
      this.spireEvenIM.castShadow = true;
      this.spireEvenIM.receiveShadow = true;
      this.spireOddIM.castShadow = true;
      this.spireOddIM.receiveShadow = true;

      const scarfColors = [stageCfg.bumperColor, stageCfg.spireA, 0xfee440, 0xff4d6d];
      const tmpColor = new THREE.Color();
      let evenIdx = 0;
      let oddIdx = 0;

      for (let i = 0; i < 14; i++) {
        const zPos = -8 - i * 7.5;
        const leftIdx = i * 2;
        const rightIdx = i * 2 + 1;

        this.penguinTransforms.push(
          { idx: leftIdx, x: -16.2, z: zPos, rotY: Math.PI / 2.3, seed: i },
          { idx: rightIdx, x: 16.2, z: zPos, rotY: -Math.PI / 2.3, seed: i + 7 }
        );

        if (this.penguinScarfIM.setColorAt) {
          tmpColor.setHex(scarfColors[i % scarfColors.length]);
          this.penguinScarfIM.setColorAt(leftIdx, tmpColor);
          tmpColor.setHex(scarfColors[(i + 1) % scarfColors.length]);
          this.penguinScarfIM.setColorAt(rightIdx, tmpColor);
        }

        const spireScaleY = 0.8 + (i % 4) * 0.45;
        const spireH = 10.0 * spireScaleY;
        const targetIM = i % 2 === 0 ? this.spireEvenIM : this.spireOddIM;
        const baseSlot = i % 2 === 0 ? evenIdx : oddIdx;

        this.dummyObj.position.set(-24 - (i % 3) * 4, spireH * 0.45, zPos);
        this.dummyObj.rotation.set(0, i * 0.5, 0);
        this.dummyObj.scale.set(1, spireScaleY, 1);
        this.dummyObj.updateMatrix();
        targetIM.setMatrixAt(baseSlot, this.dummyObj.matrix);

        this.dummyObj.position.set(24 + (i % 3) * 4, spireH * 0.45, zPos);
        this.dummyObj.rotation.set(0, -i * 0.5, 0);
        this.dummyObj.scale.set(1, spireScaleY, 1);
        this.dummyObj.updateMatrix();
        targetIM.setMatrixAt(baseSlot + 1, this.dummyObj.matrix);

        if (i % 2 === 0) evenIdx += 2;
        else oddIdx += 2;
      }

      this.spireEvenIM.instanceMatrix.needsUpdate = true;
      this.spireOddIM.instanceMatrix.needsUpdate = true;
      if (this.penguinScarfIM.instanceColor) {
        this.penguinScarfIM.instanceColor.needsUpdate = true;
      }

      this.updatePenguinInstances(0);
      this.worldGroup.add(
        this.penguinBodyIM,
        this.penguinBellyIM,
        this.penguinBeakIM,
        this.penguinScarfIM,
        this.spireEvenIM,
        this.spireOddIM
      );

      this.buildStageSetPieces(stageCfg);

      if (Math.abs(stageCfg.windX) > 0.05) {
        const windSign = stageCfg.windX >= 0 ? 1 : -1;
        const windLen = 0.7 + Math.abs(stageCfg.windX) * 1.4;
        this.sharedMat.windFlag.color.setHex(stageCfg.bumperColor);
        for (let w = 0; w < 6; w++) {
          const wz = -18 - w * 12;
          [-14.8, 14.8].forEach((wx) => {
            const pole = new THREE.Mesh(this.sharedGeo.windPole, this.sharedMat.collar);
            pole.position.set(wx, 2.8, wz);
            this.worldGroup.add(pole);

            const pennant = new THREE.Mesh(this.sharedGeo.windFlag, this.sharedMat.windFlag);
            pennant.rotation.z = windSign > 0 ? -Math.PI / 2 : Math.PI / 2;
            pennant.scale.set(1, windLen, 1);
            pennant.position.set(wx + windSign * 1.1 * windLen, 4.3, wz);
            this.worldGroup.add(pennant);
            this.windPennants.push({ mesh: pennant, baseX: wx + windSign * 1.1 * windLen, seed: w, windSign });
          });
        }
      }

      // Bumpers placed at bx = ±2.85 (clear of center x=0 and clear of AI lanes ±6.2 / ±10.2)
      for (let b = 0; b < stageCfg.bumperCount; b++) {
        const bz = -24 - b * (42 / Math.max(1, stageCfg.bumperCount));
        const bx = (b % 2 === 0 ? -1 : 1) * 2.85;
        const bumperMesh = new THREE.Mesh(this.sharedGeo.bumperCyl, this.sharedMat.bumper);
        bumperMesh.position.set(bx, 0.75, bz);
        bumperMesh.castShadow = true;
        bumperMesh.receiveShadow = true;
        this.worldGroup.add(bumperMesh);
        this.bumpers.push({ mesh: bumperMesh, x: bx, z: bz, radius: 1.22, shattered: false });
      }

      for (let i = 0; i < 18; i++) {
        const kind = i % 5 === 0 ? 'rainbow' : i % 3 === 0 ? 'gem' : 'star';
        const geo = kind === 'rainbow' ? this.sharedGeo.colRainbow : this.sharedGeo.colGem;
        const mat = kind === 'rainbow'
          ? this.sharedMat.colRainbow
          : kind === 'gem'
          ? this.sharedMat.colGem
          : this.sharedMat.colStar;
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        this.worldGroup.add(mesh);
        this.collectibles.push({
          mesh,
          x: 0,
          z: 0,
          kind,
          collected: false,
          popTimer: 0,
          points: kind === 'rainbow' ? 35 : kind === 'gem' ? 25 : 15
        });
      }
      this.spawnSheetCollectibles();
    }

    buildStageSetPieces(stageCfg) {
      const sp = stageCfg.setPiece;
      if (sp === 'igloos') {
        for (let i = 0; i < 5; i++) {
          const z = -18 - i * 16;
          [-19.5, 19.5].forEach((x) => {
            const dome = new THREE.Mesh(this.sharedGeo.iglooDome, this.sharedMat.setIgloo);
            dome.position.set(x, 0, z);
            dome.castShadow = true;
            dome.receiveShadow = true;
            const door = new THREE.Mesh(this.sharedGeo.iglooDoor, this.sharedMat.setIgloo);
            door.rotation.z = Math.PI / 2;
            door.position.set(x > 0 ? x - 2.6 : x + 2.6, 0.8, z);
            this.worldGroup.add(dome, door);
          });
        }
      } else if (sp === 'snowflakes') {
        for (let i = 0; i < 5; i++) {
          const z = -16 - i * 16;
          [-18.0, 18.0].forEach((x) => {
            const flakeGroup = new THREE.Group();
            flakeGroup.position.set(x, 3.6, z);
            for (let k = 0; k < 3; k++) {
              const arm = new THREE.Mesh(this.sharedGeo.snowflakeArm, this.sharedMat.setSnowflake);
              arm.rotation.z = (k * Math.PI) / 3;
              arm.castShadow = true;
              flakeGroup.add(arm);
            }
            this.worldGroup.add(flakeGroup);
          });
        }
      } else if (sp === 'alpineArches') {
        [-26, -54, -84].forEach((z) => {
          const arch = new THREE.Mesh(this.sharedGeo.alpineArch, this.sharedMat.setAlpine);
          arch.position.set(0, -0.5, z);
          arch.castShadow = true;
          this.worldGroup.add(arch);
        });
      } else if (sp === 'polarBears') {
        for (let i = 0; i < 6; i++) {
          const z = -15 - i * 14;
          [-19.0, 19.0].forEach((x) => {
            const bearBody = new THREE.Mesh(this.sharedGeo.polarBearBody, this.sharedMat.setBear);
            bearBody.position.set(x, 1.8, z);
            bearBody.castShadow = true;
            const bearHead = new THREE.Mesh(this.sharedGeo.polarBearHead, this.sharedMat.setBear);
            bearHead.position.set(x, 3.3, z);
            bearHead.castShadow = true;
            this.worldGroup.add(bearBody, bearHead);
          });
        }
      } else if (sp === 'lagoonWater') {
        [-42, 42].forEach((wx) => {
          const water = new THREE.Mesh(this.sharedGeo.waterPlane, this.sharedMat.setWater);
          water.rotation.x = -Math.PI / 2;
          water.position.set(wx, 0.08, -52);
          this.worldGroup.add(water);
        });
        for (let i = 0; i < 5; i++) {
          const arch = new THREE.Mesh(this.sharedGeo.alpineArch, this.sharedMat.setWater);
          arch.scale.set(0.95, 0.55, 0.8);
          arch.position.set(0, -1.0, -20 - i * 16);
          this.worldGroup.add(arch);
        }
      } else if (sp === 'crystalClusters') {
        for (let i = 0; i < 7; i++) {
          const z = -12 - i * 13;
          [-18.2, 18.2].forEach((x, side) => {
            const c1 = new THREE.Mesh(this.sharedGeo.crystalSpire, this.sharedMat.setCrystal);
            c1.scale.set(0.9, 2.2, 0.9);
            c1.position.set(x, 2.8, z);
            c1.rotation.z = side === 0 ? -0.22 : 0.22;
            c1.castShadow = true;
            const c2 = new THREE.Mesh(this.sharedGeo.crystalSpire, this.sharedMat.bumper);
            c2.scale.set(0.65, 1.5, 0.65);
            c2.position.set(x + (side === 0 ? -2.2 : 2.2), 1.8, z + 1.4);
            c2.castShadow = true;
            this.worldGroup.add(c1, c2);
          });
        }
      } else if (sp === 'blizzardVortex') {
        const count = 260;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          pos[i * 3] = (Math.random() - 0.5) * 44;
          pos[i * 3 + 1] = 1 + Math.random() * 18;
          pos[i * 3 + 2] = -Math.random() * 110;
        }
        const snowGeo = new THREE.BufferGeometry();
        snowGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const snowMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.55, transparent: true, opacity: 0.88 });
        this.snowParticles = new THREE.Points(snowGeo, snowMat);
        this.worldGroup.add(this.snowParticles);

        for (let i = 0; i < 5; i++) {
          const z = -18 - i * 16;
          [-18.5, 18.5].forEach((x) => {
            const p = new THREE.Mesh(this.sharedGeo.royalPillar, this.sharedMat.spireEven);
            p.position.set(x, 4.5, z);
            this.worldGroup.add(p);
          });
        }
      } else if (sp === 'royalArch') {
        [-22, -52, -84].forEach((z) => {
          const arch = new THREE.Mesh(this.sharedGeo.royalArch, this.sharedMat.setRoyalGold);
          arch.position.set(0, 0.2, z);
          arch.castShadow = true;
          this.worldGroup.add(arch);
        });
        for (let i = 0; i < 6; i++) {
          const z = -14 - i * 15;
          [-17.8, 17.8].forEach((x) => {
            const col = new THREE.Mesh(this.sharedGeo.royalPillar, this.sharedMat.setRoyalGold);
            col.position.set(x, 5.0, z);
            col.castShadow = true;
            this.worldGroup.add(col);
          });
        }
      }
    }

    updatePenguinInstances(timeSec) {
      if (!this.penguinBodyIM || !this.penguinTransforms.length) return;
      const d = this.dummyObj;
      for (let i = 0; i < this.penguinTransforms.length; i++) {
        const p = this.penguinTransforms[i];
        const bounceY = 0.55 + Math.abs(Math.sin(timeSec * 4.8 + p.seed)) * 0.34;

        d.position.set(p.x, bounceY + 0.6, p.z);
        d.rotation.set(0, p.rotY, 0);
        d.scale.set(1, 1, 1);
        d.updateMatrix();
        this.penguinBodyIM.setMatrixAt(p.idx, d.matrix);

        const sinY = Math.sin(p.rotY);
        const cosY = Math.cos(p.rotY);
        d.position.set(p.x + sinY * 0.26, bounceY + 0.55, p.z + cosY * 0.26);
        d.rotation.set(0, p.rotY, 0);
        d.scale.set(0.85, 1.15, 0.55);
        d.updateMatrix();
        this.penguinBellyIM.setMatrixAt(p.idx, d.matrix);

        d.position.set(p.x + sinY * 0.58, bounceY + 0.95, p.z + cosY * 0.58);
        d.rotation.set(Math.PI / 2, p.rotY, 0);
        d.scale.set(1, 1, 1);
        d.updateMatrix();
        this.penguinBeakIM.setMatrixAt(p.idx, d.matrix);

        d.position.set(p.x, bounceY + 0.82, p.z);
        d.rotation.set(Math.PI / 2, 0, 0);
        d.scale.set(1, 1, 1);
        d.updateMatrix();
        this.penguinScarfIM.setMatrixAt(p.idx, d.matrix);
      }
      this.penguinBodyIM.instanceMatrix.needsUpdate = true;
      this.penguinBellyIM.instanceMatrix.needsUpdate = true;
      this.penguinBeakIM.instanceMatrix.needsUpdate = true;
      this.penguinScarfIM.instanceMatrix.needsUpdate = true;
    }

    spawnSheetCollectibles() {
      const stageId = this.selectedStageId || 1;
      for (let i = 0; i < this.collectibles.length; i++) {
        const z = -14 - i * 3.7;
        const x = Math.sin(i * (0.95 + stageId * 0.12) + (this.currentEnd || 1) * 0.6) * 7.2;
        const col = this.collectibles[i];
        col.x = x;
        col.z = z;
        col.collected = false;
        col.popTimer = 0;
        col.mesh.visible = true;
        col.mesh.scale.set(1, 1, 1);
        col.mesh.position.set(x, 0.85, z);
      }
      for (let b = 0; b < this.bumpers.length; b++) {
        const bmp = this.bumpers[b];
        bmp.shattered = false;
        if (bmp.mesh) {
          bmp.mesh.visible = true;
          bmp.mesh.scale.set(1, 1, 1);
        }
      }
    }

    /* -------------------- 3D CURLING STONE -------------------- */
    createCurlingStoneMesh(critter, isPlayer, includeBillboard = true) {
      const rootGroup = new THREE.Group();
      const spinGroup = new THREE.Group();
      rootGroup.add(spinGroup);
      rootGroup.userData.spinGroup = spinGroup;

      const cMats = this.critterMats[critter.id] || this.critterMats.catnap;

      const baseBody = new THREE.Mesh(this.sharedGeo.stoneBody, this.sharedMat.granite);
      baseBody.position.y = 0.42;
      baseBody.castShadow = true;
      baseBody.receiveShadow = true;
      spinGroup.add(baseBody);

      const collar = new THREE.Mesh(this.sharedGeo.stoneCollar, this.sharedMat.collar);
      collar.position.y = 0.86;
      spinGroup.add(collar);

      const band = new THREE.Mesh(
        this.sharedGeo.stoneBand,
        isPlayer ? cMats.bandPlayer : cMats.bandAI
      );
      band.rotation.x = Math.PI / 2;
      band.position.y = 0.44;
      band.castShadow = true;
      spinGroup.add(band);

      const stripe = new THREE.Mesh(this.sharedGeo.stoneStripe, cMats.stripe);
      stripe.rotation.x = Math.PI / 2;
      stripe.position.y = 0.56;
      spinGroup.add(stripe);

      const handleStem = new THREE.Mesh(this.sharedGeo.handleStem, cMats.handle);
      handleStem.position.set(0, 0.88, 1.05);
      handleStem.castShadow = true;
      rootGroup.add(handleStem);

      const handleGrip = new THREE.Mesh(this.sharedGeo.handleGrip, cMats.handle);
      handleGrip.position.set(0, 0.98, 0.92);
      handleGrip.castShadow = true;
      rootGroup.add(handleGrip);

      const medallion = new THREE.Mesh(this.sharedGeo.stoneMedallion, cMats.medallion);
      medallion.rotation.x = -Math.PI / 2;
      medallion.position.y = 0.96;
      medallion.renderOrder = 5;
      rootGroup.add(medallion);
      rootGroup.userData.medallion = medallion;

      this.attachCritterEars(rootGroup, critter, cMats);

      if (includeBillboard) {
        const badgeTex = this.badgeTextureCache[critter.id] || this.textureCache[critter.id];
        const badgeMat = new THREE.SpriteMaterial({
          map: badgeTex,
          transparent: true,
          opacity: 0.95,
          sizeAttenuation: false,
          depthTest: false,
          toneMapped: false
        });
        const badgeSprite = new THREE.Sprite(badgeMat);
        badgeSprite.position.set(0, 2.35, 0);
        badgeSprite.scale.set(isPlayer ? 0.068 : 0.058, isPlayer ? 0.084 : 0.072, 1);
        badgeSprite.renderOrder = 12;
        rootGroup.add(badgeSprite);
        rootGroup.userData.badgeSprite = badgeSprite;
        rootGroup.userData.badgeMat = badgeMat;
      }

      const broomGroup = new THREE.Group();
      [-0.85, 0.85].forEach((bx) => {
        const bShaft = new THREE.Mesh(this.sharedGeo.broomShaft, this.sharedMat.broomShaft);
        bShaft.position.set(bx, 1.0, -1.75);
        bShaft.rotation.z = bx > 0 ? -0.25 : 0.25;
        const bPad = new THREE.Mesh(this.sharedGeo.broomPad, this.sharedMat.broomPad);
        bPad.position.set(bx * 0.7, 0.15, -1.75);
        broomGroup.add(bShaft, bPad);
      });
      broomGroup.visible = false;
      rootGroup.add(broomGroup);
      rootGroup.userData.broomGroup = broomGroup;

      if (isPlayer) {
        const halo = new THREE.Mesh(this.sharedGeo.haloRing, this.sharedMat.halo);
        halo.rotation.x = -Math.PI / 2;
        halo.position.y = 0.09;
        halo.renderOrder = 6;
        rootGroup.add(halo);
        rootGroup.userData.halo = halo;

        const magnetGroup = new THREE.Group();
        const magOuter = new THREE.Mesh(this.sharedGeo.magnetVortexOuter, this.sharedMat.magnetOuter);
        magOuter.rotation.x = Math.PI / 2;
        magOuter.position.y = 0.56;
        const magInner = new THREE.Mesh(this.sharedGeo.magnetVortexInner, this.sharedMat.magnetInner);
        magInner.rotation.x = Math.PI / 2;
        magInner.position.y = 0.72;
        magnetGroup.add(magOuter, magInner);
        magnetGroup.visible = false;
        rootGroup.add(magnetGroup);
        rootGroup.userData.magnetGroup = magnetGroup;
        rootGroup.userData.magOuter = magOuter;
        rootGroup.userData.magInner = magInner;

        const heavyAura = new THREE.Mesh(this.sharedGeo.heavyAuraRing, this.sharedMat.heavyAura);
        heavyAura.rotation.x = Math.PI / 2;
        heavyAura.position.y = 0.36;
        heavyAura.visible = false;
        rootGroup.add(heavyAura);
        rootGroup.userData.heavyAura = heavyAura;
      }

      return rootGroup;
    }

    attachCritterEars(rootGroup, critter, cMats) {
      const type = critter.earType;
      if (type === 'cat') {
        [-0.64, 0.64].forEach((ex) => {
          const ear = new THREE.Mesh(this.sharedGeo.earCat, cMats.ear);
          ear.position.set(ex, 1.18, -0.74);
          ear.rotation.y = Math.PI / 4;
          ear.rotation.z = ex > 0 ? -0.18 : 0.18;
          ear.castShadow = true;
          rootGroup.add(ear);
        });
      } else if (type === 'dog') {
        [-0.86, 0.86].forEach((ex) => {
          const ear = new THREE.Mesh(this.sharedGeo.earDog, cMats.ear);
          ear.scale.set(0.62, 1.28, 0.45);
          ear.position.set(ex, 1.02, -0.52);
          ear.rotation.z = ex > 0 ? 0.55 : -0.55;
          ear.castShadow = true;
          rootGroup.add(ear);
        });
      } else if (type === 'bear') {
        [-0.68, 0.68].forEach((ex) => {
          const ear = new THREE.Mesh(this.sharedGeo.earBear, cMats.ear);
          ear.position.set(ex, 1.15, -0.72);
          ear.castShadow = true;
          rootGroup.add(ear);
        });
      } else if (type === 'pig') {
        [-0.62, 0.62].forEach((ex) => {
          const ear = new THREE.Mesh(this.sharedGeo.earPig, cMats.ear);
          ear.position.set(ex, 1.16, -0.74);
          ear.rotation.z = ex > 0 ? -0.25 : 0.25;
          ear.castShadow = true;
          rootGroup.add(ear);
        });
        const snout = new THREE.Mesh(this.sharedGeo.pigSnout, cMats.ear);
        snout.position.set(0, 1.0, 0.15);
        rootGroup.add(snout);
      } else if (type === 'elephant') {
        [-1.08, 1.08].forEach((ex) => {
          const ear = new THREE.Mesh(this.sharedGeo.earElephant, cMats.ear);
          ear.rotation.x = Math.PI / 2;
          ear.position.set(ex, 1.12, -0.42);
          ear.castShadow = true;
          rootGroup.add(ear);
        });
      } else if (type === 'unicorn') {
        const horn = new THREE.Mesh(this.sharedGeo.hornUnicorn, this.sharedMat.hornGold);
        horn.position.set(0, 1.32, -0.78);
        horn.rotation.x = -0.22;
        horn.castShadow = true;
        rootGroup.add(horn);
        [-0.58, 0.58].forEach((ex) => {
          const ear = new THREE.Mesh(this.sharedGeo.earPig, cMats.ear);
          ear.position.set(ex, 1.12, -0.72);
          rootGroup.add(ear);
        });
      } else if (type === 'crest') {
        [-0.28, 0, 0.28].forEach((cx, idx) => {
          const comb = new THREE.Mesh(this.sharedGeo.earCrest, this.sharedMat.crestRed);
          const sc = idx === 1 ? 1.25 : 0.95;
          comb.scale.set(sc, sc * 1.2, sc);
          comb.position.set(cx, 1.18, -0.78);
          comb.castShadow = true;
          rootGroup.add(comb);
        });
      } else if (type === 'bunny') {
        [-0.46, 0.46].forEach((ex) => {
          const ear = new THREE.Mesh(this.sharedGeo.earBunny, cMats.ear);
          ear.position.set(ex, 1.38, -0.76);
          ear.rotation.z = ex > 0 ? -0.12 : 0.12;
          ear.castShadow = true;
          rootGroup.add(ear);
        });
      }
    }

    updateTitlePreviewStone() {
      if (!this.webglAvailable || !this.previewGroup) return;
      disposeTree(this.previewGroup);
      const critter = CRITTERS.find((c) => c.id === this.selectedCritterId) || CRITTERS[0];
      const mesh = this.createCurlingStoneMesh(critter, true, false);
      mesh.scale.set(1.65, 1.65, 1.65);
      this.previewGroup.add(mesh);
      this.previewGroup.visible = this.mode !== 'playing';
      this.previewBounce = 1.0;
    }

    /* -------------------- MATCH START & PER-STAGE RIVAL ROTATION -------------------- */
    resetTransientPoolsAndOverlays() {
      this.input.left = false;
      this.input.right = false;
      this.input.touchSteerX = 0;
      ['btn-curl-left', 'btn-curl-right'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('held');
      });
      for (let i = 0; i < this.flyingCoinPool.length; i++) {
        const fc = this.flyingCoinPool[i];
        fc.active = false;
        if (fc.el) fc.el.style.display = 'none';
      }
      for (let i = 0; i < this.aimDotsPool.length; i++) {
        this.aimDotsPool[i].mesh.visible = false;
      }
      for (let i = 0; i < this.shockwavePool.length; i++) {
        this.shockwavePool[i].active = false;
        this.shockwavePool[i].mesh.visible = false;
      }
      if (this.sharedMat && this.sharedMat.halo) {
        this.sharedMat.halo.color.setHex(0xfee440);
      }
      if (this.camera) {
        this.camera.rotation.z = 0;
      }
      if (this.countdownEl) this.countdownEl.style.display = 'none';
      if (this.tutorialHandEl) this.tutorialHandEl.style.display = 'none';
      if (this.joystickEl) this.joystickEl.style.display = 'none';
      const toast = document.getElementById('hud-toast');
      if (toast) toast.classList.remove('show');
      clearTimeout(this.toastTimeout);
    }

    startStage(stageId = this.selectedStageId) {
      if (!this.webglAvailable) return;
      this.resetTransientPoolsAndOverlays();
      this.selectedStageId = Math.max(1, Math.min(8, stageId));
      const stageCfg = STAGES[this.selectedStageId - 1];
      this.stageCfg = stageCfg;

      this.mode = 'playing';
      this.paused = false;
      if (this.pauseOverlayEl) this.pauseOverlayEl.classList.remove('active');
      if (this.previewGroup) this.previewGroup.visible = false;
      this.currentEnd = 1;
      this.endTimer = 0;
      this.settleTimer = 0;
      this.waveScored = false;
      this.countdownTimer = 0.95; // Visual 3-2-1 🥌 beat
      this.lastCountdownStep = -1;
      this.tutorialTimer = (!this.save.tutorialDone && this.selectedStageId === 1) ? 3.5 : 0;
      this.matchTime = 0;
      this.fever = 0;
      this.feverActive = false;
      this.feverTimer = 0;
      this.trauma = 0;
      this.hitStopTimer = 0;
      this.pedalCooldowns = [0, 0, 0];
      this.pedalActiveTimers = [0, 0, 0];
      this.pairCooldowns.clear();

      const playerCritter = CRITTERS.find((c) => c.id === this.selectedCritterId) || CRITTERS[0];
      const pool = CRITTERS.filter((c) => c.id !== playerCritter.id);
      const offset = (this.selectedStageId - 1) * 3;
      const rivals = [];

      const bossCritter = pool.find((c) => c.id === stageCfg.bossId);
      if (bossCritter) {
        rivals.push(bossCritter);
      }

      for (let k = 0; k < pool.length && rivals.length < 4; k++) {
        const candidate = pool[(offset + k) % pool.length];
        if (rivals.some((r) => r.id === candidate.id)) continue;

        const isPinkCandidate = candidate.id === 'bobby' || candidate.id === 'picky';
        const alreadyHasPink =
          playerCritter.id === 'bobby' ||
          playerCritter.id === 'picky' ||
          rivals.some((r) => r.id === 'bobby' || r.id === 'picky');

        if (isPinkCandidate && alreadyHasPink && pool.length - k > 4 - rivals.length) {
          continue;
        }
        rivals.push(candidate);
      }

      this.curlers = [
        { critter: playerCritter, isPlayer: true, score: 0, knockouts: 0, rank: 1 },
        ...rivals.map((rc) => ({ critter: rc, isPlayer: false, score: 0, knockouts: 0, rank: 2 }))
      ];

      disposeTree(this.stonesGroup);
      this.stones = [];
      this.buildRinkEnvironment(stageCfg);

      this.showScreen('screen-hud');
      const iconEl = document.getElementById('hud-stage-icon');
      if (iconEl) iconEl.textContent = stageCfg.emoji;
      const numEl = document.getElementById('hud-stage-num');
      if (numEl) numEl.textContent = `${this.selectedStageId}/8`;
      const dotsEl = document.getElementById('hud-stage-dots');
      if (dotsEl) {
        dotsEl.innerHTML = STAGES.map(
          (s) => `<span class="hud-stage-dot ${s.id === this.selectedStageId ? 'active' : ''}"></span>`
        ).join('');
      }
      const stagePill = document.querySelector('.hud-stage-pill');
      if (stagePill) {
        stagePill.style.borderColor = '#' + new THREE.Color(stageCfg.skyTop).getHexString();
        stagePill.style.background = '#' + new THREE.Color(stageCfg.skyBot).getHexString() + 'd8';
      }

      this.initHUDCache();
      this.spawnDeliveryWave(1);
      this.updateHUD();
      this.sfx.playLaunch();
    }

    initHUDCache() {
      const strip = document.getElementById('hud-rank-strip');
      strip.innerHTML = '';

      // Gold Top-3 Podium Qualification Divider at order = 3
      const divider = document.createElement('div');
      divider.className = 'hud-podium-divider';
      divider.style.order = '3';
      strip.appendChild(divider);

      this.hudChipRefs = this.curlers.map((c) => {
        const chip = document.createElement('div');
        chip.className = `hud-racer-chip ${c.isPlayer ? 'is-player' : ''}`;
        chip.style.borderColor = c.isPlayer ? '#ffffff' : c.critter.rimHex;

        const medalPip = document.createElement('span');
        medalPip.className = 'chip-medal-pip';
        medalPip.textContent = '🥇';

        const img = document.createElement('img');
        img.src = c.critter.icon;
        img.alt = c.critter.name;

        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'hud-racer-score';
        scoreSpan.textContent = '0';

        chip.appendChild(medalPip);
        chip.appendChild(img);
        chip.appendChild(scoreSpan);
        strip.appendChild(chip);
        return { curler: c, chip, medalPip, scoreSpan, lastScore: -1, lastOrder: -1 };
      });

      const radarDots = document.getElementById('radar-dots');
      if (radarDots) {
        radarDots.innerHTML = '';
      }
    }

    spawnDeliveryWave(endNumber) {
      this.currentEnd = endNumber;
      this.endTimer = 0;
      this.settleTimer = 0;
      this.waveScored = false;
      this.pairCooldowns.clear();

      const stonesIcons = [];
      for (let i = 1; i <= this.totalEnds; i++) {
        stonesIcons.push(i >= endNumber ? '🥌' : '⚪');
      }
      document.getElementById('hud-stones-row').textContent = stonesIcons.join('');

      this.stones.forEach((st) => {
        st.isCurrentWave = false;
      });

      if (endNumber > 1) {
        this.spawnSheetCollectibles();
      }

      // Lanes [0, -6.2, 6.2, -10.2, 10.2] stay 100% clear of bumpers at ±2.85!
      const laneOffsets = [0, -6.2, 6.2, -10.2, 10.2];
      const aiRoles = ['player', 'boss', 'collector', 'guard', 'flanker'];
      const radarDots = document.getElementById('radar-dots');

      // Kid-friendly End 2/3 comeback rubber-banding when trailing in 4th/5th place
      const playerEntry = this.curlers.find((c) => c.isPlayer);
      const trailingRank = endNumber > 1 && playerEntry && playerEntry.rank >= 4;
      let effectiveSkill = this.stageCfg ? this.stageCfg.aiSkill : 0.48;
      if (trailingRank) {
        const relief = this.selectedStageId <= 4 ? 0.16 : 0.10;
        effectiveSkill = Math.max(0.36, effectiveSkill - relief);
      }
      const spread = 1.0 - effectiveSkill;
      const waveSign = endNumber % 2 === 0 ? 1 : -1;

      this.curlers.forEach((curler, idx) => {
        const mesh = this.webglAvailable ? this.createCurlingStoneMesh(curler.critter, curler.isPlayer, true) : null;
        const startX = laneOffsets[idx];
        const startZ = curler.isPlayer ? -2.0 : -3.5 - idx * 2.1;
        if (mesh) {
          mesh.position.set(startX, 0, startZ);
          this.stonesGroup.add(mesh);
        }

        const aiRole = aiRoles[idx] || 'flanker';
        let aiTargetX = 0;
        let aiTargetZ = HOUSE_Z;
        let baseSpeed = 19.6;

        if (!curler.isPlayer) {
          if (aiRole === 'boss') {
            aiTargetX = waveSign * (0.95 + spread * 6.4);
            aiTargetZ = HOUSE_Z + spread * 4.2;
            baseSpeed = 18.8 + effectiveSkill * 1.45;
          } else if (aiRole === 'collector') {
            aiTargetX = -waveSign * (2.2 + spread * 6.8);
            aiTargetZ = HOUSE_Z + 1.8 + spread * 4.8;
            baseSpeed = 18.4 + effectiveSkill * 1.25;
          } else if (aiRole === 'guard') {
            aiTargetX = -1 * (2.6 + spread * 6.5);
            aiTargetZ = HOUSE_Z + 2.4 + spread * 5.0;
            baseSpeed = 18.1 + effectiveSkill * 1.15;
          } else {
            aiTargetX = +1 * (2.6 + spread * 6.5);
            aiTargetZ = HOUSE_Z + 1.6 + spread * 5.2;
            baseSpeed = 18.2 + effectiveSkill * 1.18;
          }
        }

        let dotEl = null;
        if (radarDots) {
          dotEl = document.createElement('div');
          dotEl.className = `radar-dot ${curler.isPlayer ? 'is-player' : ''}`;
          dotEl.style.backgroundColor = curler.critter.hex;
          dotEl.style.backgroundImage = `url(${curler.critter.icon})`;
          dotEl.style.borderColor = curler.isPlayer ? '#fee440' : curler.critter.rimHex;
          radarDots.appendChild(dotEl);
        }

        const stoneObj = {
          id: `${endNumber}_${idx}`,
          curler,
          isPlayer: curler.isPlayer,
          aiRole,
          effectiveSkill,
          isCurrentWave: true,
          mesh,
          badgeSprite: mesh ? mesh.userData.badgeSprite : null,
          badgeMat: mesh ? mesh.userData.badgeMat : null,
          dotEl,
          x: startX,
          y: 0,
          z: startZ,
          vx: 0,
          vy: 0,
          vz: -baseSpeed,
          spinAngle: 0,
          squashTimer: 0,
          radius: 1.36,
          mass: 1.0,
          heavyTimer: 0,
          sweepTimer: 0,
          magnetTimer: 0,
          bumperCooldown: 0,
          shatteredBumpers: new Set(),
          scoredEnd: false,
          laneX: startX,
          aiTargetX,
          aiTargetZ
        };

        if (curler.isPlayer) {
          this.playerStone = stoneObj;
        }
        this.stones.push(stoneObj);
      });

      if (this.playerStone && this.camera) {
        this.camera.position.set(this.playerStone.x * 0.35, 12.0, this.playerStone.z + 20.0);
        this.camera.lookAt(this.playerStone.x * 0.2, 1.0, this.playerStone.z - 22.0);
        this.camera.rotation.z = 0;
      }

      if (endNumber > 1) {
        this.showToast('🥌✨');
      }
    }

    /* -------------------- POWER PEDALS & FEVER -------------------- */
    activatePedal(pedalIdx) {
      if (this.mode !== 'playing' || this.paused || !this.playerStone) return false;
      const pedalIds = ['pedal-magnet', 'pedal-sweep', 'pedal-knockout'];
      const btnEl = document.getElementById(pedalIds[pedalIdx]);

      // Tactile feedback if tapped while on cooldown
      if (this.pedalCooldowns[pedalIdx] > 0) {
        this.sfx.playBonk();
        if (btnEl) {
          btnEl.classList.remove('pedal-shake');
          void btnEl.offsetWidth;
          btnEl.classList.add('pedal-shake');
        }
        return false;
      }

      this.pedalCooldowns[pedalIdx] = this.pedalMaxCooldowns[pedalIdx];
      const st = this.playerStone;

      if (pedalIdx === 0) {
        st.magnetTimer = 2.6;
        this.pedalActiveTimers[0] = 2.6;
        this.sfx.playMagnet();
        this.spawnShockwave(st.x, st.z, 0x9b5de5, 4.5);
        this.showToast('🌪️🎯');
      } else if (pedalIdx === 1) {
        st.sweepTimer = 2.2;
        this.pedalActiveTimers[1] = 2.2;
        st.vz = Math.min(st.vz - 4.5, -18.5);
        this.sfx.playSweep();
        this.spawnParticleBurst(st.x, 0.3, st.z - 1.5, 0x00f5d4, 18, 5.5);
        this.showToast('⚡🧹');
      } else if (pedalIdx === 2) {
        st.heavyTimer = 3.2;
        this.pedalActiveTimers[2] = 3.2;
        st.mass = 2.85;
        st.radius = 1.85;
        if (st.mesh) st.mesh.scale.set(1.38, 1.38, 1.38);
        this.sfx.playHeavy();
        this.spawnShockwave(st.x, st.z, 0xff9f1c, 6.5);
        this.addTrauma(0.32);
        this.triggerFlash();
        this.showToast('💥🥌');
      }

      this.addFever(22);
      return true;
    }

    addFever(amount) {
      if (this.feverActive) return;
      this.fever = Math.min(100, this.fever + amount);
      if (this.fever >= 100) {
        this.feverActive = true;
        this.feverTimer = 5.5;
        this.sfx.playFever();
        if (this.playerStone) {
          this.spawnShockwave(this.playerStone.x, this.playerStone.z, 0xfee440, 7.5);
          this.spawnParticleBurst(this.playerStone.x, 0.6, this.playerStone.z, 0xfee440, 32, 8.5);
        }
        this.addTrauma(0.28);
        this.triggerFlash();
        this.showToast('🌈🔥🔥');
      }
    }

    /* -------------------- PHYSICS & ELASTIC KNOCKOUT ENGINE -------------------- */
    updatePlaying(rawDt) {
      if (this.paused) return;

      // Update 3-2-1 🥌 Ready Countdown Overlay & Synth Cue
      if (this.countdownTimer > 0) {
        this.countdownTimer = Math.max(0, this.countdownTimer - rawDt);
        const c = this.countdownTimer;
        const step = c > 0.65 ? 3 : c > 0.35 ? 2 : c > 0.05 ? 1 : 0;
        if (step !== this.lastCountdownStep) {
          this.lastCountdownStep = step;
          this.sfx.playCountdown(step === 0);
        }
        if (this.countdownEl) {
          this.countdownEl.style.display = 'block';
          this.countdownEl.textContent = step === 3 ? '3️⃣' : step === 2 ? '2️⃣' : step === 1 ? '1️⃣' : '🥌';
          if (this.countdownTimer <= 0) {
            this.countdownEl.style.display = 'none';
          }
        }
      }

      // Update Wordless Ghost-Finger Tutorial on Stage 1
      if (this.tutorialTimer > 0) {
        if (this.input.left || this.input.right || Math.abs(this.input.touchSteerX) > 0.1) {
          this.tutorialTimer = 0;
          this.save.tutorialDone = true;
          writeSave(this.save);
        } else {
          this.tutorialTimer = Math.max(0, this.tutorialTimer - rawDt);
        }
        if (this.tutorialHandEl) {
          this.tutorialHandEl.style.display = this.tutorialTimer > 0 ? 'block' : 'none';
        }
      }

      let dt = rawDt;
      if (this.hitStopTimer > 0) {
        this.hitStopTimer = Math.max(0, this.hitStopTimer - rawDt);
        dt = rawDt * 0.16;
      }

      this.matchTime += dt;
      this.trauma = Math.max(0, this.trauma - 1.65 * rawDt);

      this.pairCooldowns.forEach((val, key) => {
        const next = val - dt;
        if (next <= 0) this.pairCooldowns.delete(key);
        else this.pairCooldowns.set(key, next);
      });

      const pedalIds = ['pedal-magnet', 'pedal-sweep', 'pedal-knockout'];
      const cdRate = this.feverActive ? 2.0 : 1.0;
      for (let i = 0; i < 3; i++) {
        if (this.pedalCooldowns[i] > 0) {
          const prev = this.pedalCooldowns[i];
          this.pedalCooldowns[i] = Math.max(0, this.pedalCooldowns[i] - rawDt * cdRate);
          if (prev > 0 && this.pedalCooldowns[i] === 0) {
            // Ready scale-pop & chime!
            this.sfx.playReadyChime();
            const btn = document.getElementById(pedalIds[i]);
            if (btn) {
              btn.classList.remove('pedal-ready-pop');
              void btn.offsetWidth;
              btn.classList.add('pedal-ready-pop');
            }
          }
        }
        if (this.pedalActiveTimers[i] > 0) {
          this.pedalActiveTimers[i] = Math.max(0, this.pedalActiveTimers[i] - rawDt);
        }
      }

      if (this.feverActive) {
        this.feverTimer -= dt;
        this.fever = Math.max(0, (this.feverTimer / 5.5) * 100);
        if (this.sharedMat && this.sharedMat.halo) {
          this.sharedMat.halo.color.setHSL((this.matchTime * 1.6) % 1, 1.0, 0.55);
        }
        if (this.feverTimer <= 0) {
          this.feverActive = false;
          this.fever = 0;
          if (this.sharedMat && this.sharedMat.halo) {
            this.sharedMat.halo.color.setHex(0xfee440);
          }
        }
      } else if (this.sharedMat && this.sharedMat.halo) {
        this.sharedMat.halo.color.setHex(0xfee440);
      }

      if (this.bullseyeBeacon) {
        const pulse = 1 + Math.sin(this.matchTime * 6) * 0.08;
        this.bullseyeBeacon.scale.set(pulse, pulse, 1);
      }
      this.updatePenguinInstances(this.matchTime);
      this.updateImpactFX(rawDt);

      // House Settle Camera Beat (1.25s hold over the House while ring coins & shockwaves play)
      if (this.settleTimer > 0) {
        this.settleTimer = Math.max(0, this.settleTimer - rawDt);
        if (this.camera) {
          this.camera.position.x += (0 - this.camera.position.x) * Math.min(1, rawDt * 6);
          this.camera.position.y += (14.5 - this.camera.position.y) * Math.min(1, rawDt * 6);
          this.camera.position.z += ((HOUSE_Z + 17.5) - this.camera.position.z) * Math.min(1, rawDt * 6);
          this.camera.lookAt(0, 0.5, HOUSE_Z);
        }
        this.updatePredictedAimDots();
        this.updateHUD();
        if (this.settleTimer <= 0) {
          if (this.currentEnd < this.totalEnds) {
            this.spawnDeliveryWave(this.currentEnd + 1);
          } else {
            this.finishMatch();
          }
        }
        return;
      }

      this.endTimer += dt;

      const windX = this.stageCfg ? this.stageCfg.windX : 0;
      for (let i = 0; i < this.windPennants.length; i++) {
        const wp = this.windPennants[i];
        wp.mesh.rotation.y = Math.sin(this.matchTime * 12 + wp.seed) * 0.25;
      }
      if (this.snowParticles) {
        const posAttr = this.snowParticles.geometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          let sx = posAttr.getX(i) + windX * 8 * dt;
          let sy = posAttr.getY(i) - 5.5 * dt;
          if (sy < 0.2) sy = 18;
          if (sx > 22) sx = -22;
          if (sx < -22) sx = 22;
          posAttr.setXY(i, sx, sy);
        }
        posAttr.needsUpdate = true;
      }

      this.collectibles.forEach((c) => {
        if (!c.mesh) return;
        if (!c.collected) {
          c.mesh.rotation.y += dt * 2.8;
        } else if (c.popTimer > 0) {
          c.popTimer = Math.max(0, c.popTimer - rawDt);
          const p = 1 - c.popTimer / 0.16;
          const sc = 1.0 + p * 0.65;
          c.mesh.scale.set(sc, sc, sc);
          c.mesh.position.y = 0.85 + p * 1.1;
          c.mesh.rotation.y += rawDt * 12;
          if (c.popTimer <= 0) {
            c.mesh.visible = false;
          }
        }
      });

      this.stones.forEach((st) => {
        if (st.magnetTimer > 0) st.magnetTimer = Math.max(0, st.magnetTimer - dt);
        if (st.sweepTimer > 0) st.sweepTimer = Math.max(0, st.sweepTimer - dt);
        if (st.bumperCooldown > 0) st.bumperCooldown = Math.max(0, st.bumperCooldown - dt);
        if (st.squashTimer > 0) st.squashTimer = Math.max(0, st.squashTimer - rawDt);
        if (st.heavyTimer > 0) {
          st.heavyTimer = Math.max(0, st.heavyTimer - dt);
          if (st.heavyTimer <= 0) {
            st.mass = 1.0;
            st.radius = 1.36;
            if (st.mesh) st.mesh.scale.set(1, 1, 1);
          }
        }

        if (st.mesh && st.mesh.userData.broomGroup) {
          const showBroom = st.sweepTimer > 0 || (st.isPlayer && this.feverActive);
          st.mesh.userData.broomGroup.visible = showBroom;
          if (showBroom) {
            st.mesh.userData.broomGroup.position.x = Math.sin(this.matchTime * 28) * 0.42;
          }
        }

        if (st.mesh && st.mesh.userData.magnetGroup) {
          const showMag = st.magnetTimer > 0 || (st.isPlayer && this.feverActive);
          st.mesh.userData.magnetGroup.visible = showMag;
          if (showMag) {
            const mPulse = 1 + Math.sin(this.matchTime * 16) * 0.12;
            st.mesh.userData.magnetGroup.scale.set(mPulse, 1, mPulse);
            if (st.mesh.userData.magOuter) st.mesh.userData.magOuter.rotation.z = this.matchTime * 7.5;
            if (st.mesh.userData.magInner) st.mesh.userData.magInner.rotation.z = -this.matchTime * 10.5;
            if (Math.random() < 0.45) {
              this.spawnParticleBurst(st.x, 0.35, st.z, 0x9b5de5, 1, 3.2);
            }
          }
        }

        if (st.mesh && st.mesh.userData.heavyAura) {
          const showHeavy = st.heavyTimer > 0;
          st.mesh.userData.heavyAura.visible = showHeavy;
          if (showHeavy) {
            const hPulse = 1 + Math.sin(this.matchTime * 20) * 0.14;
            st.mesh.userData.heavyAura.scale.set(hPulse, hPulse, 1);
            st.mesh.userData.heavyAura.rotation.z = this.matchTime * 6.0;
            if (Math.random() < 0.55) {
              this.spawnParticleBurst(st.x, 0.25, st.z + 0.8, 0xff9f1c, 1, 4.0);
            }
          }
        }

        if (st.isPlayer && this.feverActive && Math.random() < 0.65) {
          const rainbowPalette = [0xff4d6d, 0xff9f1c, 0xfee440, 0x38b000, 0x00f5d4, 0x00bbf9, 0x9b5de5];
          const rHex = rainbowPalette[Math.floor(this.matchTime * 14) % rainbowPalette.length];
          this.spawnParticleBurst(st.x, 0.25, st.z + 1.1, rHex, 2, 3.8);
        }

        if (st.isCurrentWave) {
          if (st.isPlayer) {
            let steer = 0;
            if (this.input.left) steer -= 1;
            if (this.input.right) steer += 1;
            if (Math.abs(this.input.touchSteerX) > 0.05) steer += this.input.touchSteerX;

            st.vx += steer * 13.5 * dt;

            if (st.magnetTimer > 0 || this.feverActive) {
              const dx = 0 - st.x;
              st.vx += dx * 4.2 * dt;
              const dzToHouse = HOUSE_Z - st.z;
              if (dzToHouse > -3.5 && dzToHouse < 10) {
                st.vz += (-dzToHouse * 2.1 - st.vz * 1.9) * dt;
              }
            } else if (steer === 0 && st.z > HOUSE_Z + 6) {
              st.vx += (0 - st.x) * 0.72 * dt;
            }

            if (st.sweepTimer > 0 || this.feverActive) {
              if (st.z > HOUSE_Z + 4) {
                st.vz = Math.min(st.vz, -16.5);
              }
            }
          } else {
            // Distinct 4-Role AI Steering (boss, collector, guard, flanker) + Bumper Avoidance
            let desiredX = st.z > -54 ? st.laneX : st.aiTargetX;

            if (st.aiRole === 'boss') {
              // Stage Boss: visible 3D broom sweep burst in mid-rink on Stages 5-8 & challenges settled player stones on Stages 4-8
              if (this.selectedStageId >= 5 && st.z < -34 && st.z > -54 && st.sweepTimer <= 0) {
                st.sweepTimer = 0.85;
              }
              if (this.selectedStageId >= 4 && st.z < -48 && st.z > HOUSE_Z + 4) {
                const playerTarget = this.stones.find(
                  (pst) => pst.isPlayer && !pst.isCurrentWave && Math.hypot(pst.x, pst.z - HOUSE_Z) < HOUSE_RADII.red
                );
                if (playerTarget) {
                  desiredX = playerTarget.x;
                }
              }
            } else if (st.aiRole === 'collector' && this.selectedStageId >= 3 && st.z > -64) {
              // Collector AI: bends toward nearby uncollected mid-rink stars/gems before curling into the House
              let nearestCol = null;
              let bestDist = 999;
              for (let cIdx = 0; cIdx < this.collectibles.length; cIdx++) {
                const col = this.collectibles[cIdx];
                if (col.collected) continue;
                const dzCol = st.z - col.z;
                const dxCol = Math.abs(col.x - st.x);
                if (dzCol > 1.0 && dzCol < 16.0 && dxCol < 4.6 && dzCol < bestDist) {
                  bestDist = dzCol;
                  nearestCol = col;
                }
              }
              if (nearestCol) {
                desiredX = nearestCol.x;
              }
            }

            for (let b = 0; b < this.bumpers.length; b++) {
              const bmp = this.bumpers[b];
              if (bmp.shattered) continue;
              const dz = st.z - bmp.z;
              const dx = st.x - bmp.x;
              if (dz > 0 && dz < 14.0 && Math.abs(dx) < 3.1) {
                desiredX = bmp.x + (dx >= 0 ? 3.6 : -3.6);
              }
            }
            const k = st.aiRole === 'boss' ? 1.85 : 1.65;
            const c = 2.57;
            st.vx += (k * (desiredX - st.x) - c * st.vx) * dt;

            // Longitudinal House stopping depth control around st.aiTargetZ
            const targetZ = typeof st.aiTargetZ === 'number' ? st.aiTargetZ : HOUSE_Z;
            const dzToTarget = targetZ - st.z;
            if (dzToTarget > -4.0 && dzToTarget < 12.0) {
              st.vz += (-dzToTarget * 1.45 - st.vz * 1.35) * dt;
            }
          }

          if (st.z > HOUSE_Z + 8) {
            st.vx += windX * 0.45 * dt;
          }
        }

        const inHouseZone = st.z <= HOUSE_Z + 11.5;
        const friction = inHouseZone ? 0.962 : 0.9978;
        st.vx *= Math.pow(friction, dt * 60);
        st.vz *= Math.pow(friction, dt * 60);

        st.x += st.vx * dt;
        st.z += st.vz * dt;

        const prevY = st.y || 0;
        if (st.y > 0 || st.vy !== 0) {
          st.vy -= 28.0 * dt;
          st.y += st.vy * dt;
          if (st.y <= 0) {
            st.y = 0;
            if (prevY > 0.08 && Math.abs(st.vy) > 1.5) {
              st.squashTimer = 0.15;
              this.spawnParticleBurst(st.x, 0.1, st.z, 0xffffff, 14, 4.5);
              this.sfx.playWallThud(Math.abs(st.vy));
              this.addTrauma(0.12);
            }
            st.vy = 0;
          }
        }

        const maxX = 12.6;
        if (st.x < -maxX) {
          const vn = Math.abs(st.vx);
          st.x = -maxX;
          st.vx = vn * 0.74;
          if (vn > 1.2) {
            this.sfx.playWallThud(vn);
            this.spawnParticleBurst(-maxX, 0.3, st.z, 0xffffff, 14, 4.8);
          }
        } else if (st.x > maxX) {
          const vn = Math.abs(st.vx);
          st.x = maxX;
          st.vx = -vn * 0.74;
          if (vn > 1.2) {
            this.sfx.playWallThud(vn);
            this.spawnParticleBurst(maxX, 0.3, st.z, 0xffffff, 14, 4.8);
          }
        }

        if (st.z < -102) {
          const vn = Math.abs(st.vz);
          st.z = -102;
          st.vz = vn * 0.45;
          if (vn > 1.2) {
            this.sfx.playWallThud(vn);
            this.spawnParticleBurst(st.x, 0.3, -102, 0xffffff, 16, 5.2);
          }
        }

        for (let bIdx = 0; bIdx < this.bumpers.length; bIdx++) {
          const bmp = this.bumpers[bIdx];
          if (bmp.shattered) continue;
          const dx = st.x - bmp.x;
          const dz = st.z - bmp.z;
          const dist = Math.hypot(dx, dz);
          const minDist = st.radius + bmp.radius;

          if (dist < minDist && dist > 0.0001) {
            const nx = dx / dist;
            const nz = dz / dist;

            if (st.heavyTimer > 0 || (st.isPlayer && this.feverActive)) {
              if (!st.shatteredBumpers.has(bIdx)) {
                st.shatteredBumpers.add(bIdx);
                bmp.shattered = true;
                if (bmp.mesh) bmp.mesh.visible = false;
                st.curler.score += 15;
                this.sfx.playStoneClack(1.5);
                this.spawnShockwave(bmp.x, bmp.z, 0x00f5d4, 5.5);
                this.spawnParticleBurst(bmp.x, 0.7, bmp.z, 0x00f5d4, 30, 8.5);
                this.spawnFlyingCoin(bmp.x, 1.0, bmp.z, st.curler, '💎');
                this.addTrauma(0.24);
                if (st.isPlayer) this.showToast('💥💎');
              }
              continue;
            }

            st.x = bmp.x + nx * minDist;
            st.z = bmp.z + nz * minDist;
            const vn = st.vx * nx + st.vz * nz;
            if (vn < 0) {
              const eB = 0.78;
              st.vx -= (1 + eB) * vn * nx;
              st.vz -= (1 + eB) * vn * nz;
              const tx = -nz;
              const tz = nx;
              const vt = st.vx * tx + st.vz * tz;
              st.vx -= vt * 0.05 * tx;
              st.vz -= vt * 0.05 * tz;

              if (st.bumperCooldown <= 0) {
                st.bumperCooldown = 0.25;
                const impactSpd = Math.abs(vn);
                this.sfx.playStoneClack(Math.min(1.6, impactSpd * 0.14));
                this.spawnShockwave(bmp.x + nx * bmp.radius, bmp.z + nz * bmp.radius, 0x00f5d4, 3.6);
                this.spawnParticleBurst(bmp.x + nx * bmp.radius, 0.5, bmp.z + nz * bmp.radius, 0x00f5d4, 18, 6.0);
                if (st.isPlayer) this.addTrauma(Math.min(0.25, impactSpd * 0.02));
              }
            }
          }
        }

        this.collectibles.forEach((col) => {
          if (col.collected) return;
          const pullRadius = st.isPlayer && (st.magnetTimer > 0 || this.feverActive) ? 5.2 : 2.15;
          const dist = Math.hypot(st.x - col.x, st.z - col.z);
          if (dist < pullRadius) {
            col.collected = true;
            col.popTimer = 0.16;
            const mult = st.isPlayer && this.feverActive ? 1.5 : 1.0;
            const pts = Math.round(col.points * mult);
            st.curler.score += pts;
            const coinEmoji = col.kind === 'rainbow' ? '🌈' : col.kind === 'gem' ? '💎' : '⭐';
            this.spawnFlyingCoin(col.x, 1.1, col.z, st.curler, coinEmoji);
            if (st.isPlayer && this.feverActive) {
              this.spawnFlyingCoin(col.x + 0.6, 1.4, col.z, st.curler, '🔥');
            }
            this.spawnParticleBurst(col.x, 0.85, col.z, col.kind === 'rainbow' ? 0xff4d6d : 0xfee440, 14, 5.0);
            if (st.isPlayer) {
              this.addFever(col.kind === 'rainbow' ? 34 : 14);
              this.sfx.playStar();
              this.showToast(coinEmoji);
            }
          }
        });

        if (st.mesh) {
          st.mesh.position.set(st.x, st.y || 0, st.z);
          const speed = Math.hypot(st.vx, st.vz);
          st.spinAngle += (st.vx * 0.08 + 0.75) * dt * (speed * 0.22);
          if (st.mesh.userData.spinGroup) {
            st.mesh.userData.spinGroup.rotation.y = st.spinAngle;
          }
          if (st.y > 0.01) {
            const tiltMag = Math.min(0.32, Math.atan2(st.vy, Math.max(2, speed)) * 0.55);
            st.mesh.rotation.x = tiltMag;
            st.mesh.rotation.z = -st.vx * 0.025;
          } else {
            st.mesh.rotation.x *= 0.75;
            st.mesh.rotation.z *= 0.75;
          }

          const baseScale = st.heavyTimer > 0 ? 1.38 : 1.0;
          if (st.squashTimer > 0) {
            const sq = Math.sin((st.squashTimer / 0.15) * Math.PI) * 0.18;
            st.mesh.scale.set(baseScale * (1 + sq * 0.6), baseScale * (1 - sq), baseScale * (1 + sq * 0.6));
          } else {
            st.mesh.scale.set(baseScale, baseScale, baseScale);
          }
        }
      });

      this.resolveStoneCollisions();
      this.updatePredictedAimDots();

      if (this.playerStone && this.camera) {
        const targetZ = Math.max(HOUSE_Z - 3, this.playerStone.z);
        const camZ = targetZ + 20.0;
        const camX = this.playerStone.x * 0.38;
        this.camera.position.x += (camX - this.camera.position.x) * Math.min(1, rawDt * 8);
        this.camera.position.z += (camZ - this.camera.position.z) * Math.min(1, rawDt * 8);
        this.camera.position.y = 12.0;
        this.camera.lookAt(this.playerStone.x * 0.22, 1.0, targetZ - 22.0);
        this.camera.rotation.z = 0;

        if (this.trauma > 0.001) {
          const s = this.trauma * this.trauma;
          const t = this.matchTime * 42;
          this.camera.position.x += Math.sin(t * 1.13) * 0.48 * s;
          this.camera.position.y += Math.cos(t * 1.71) * 0.34 * s;
          this.camera.rotation.z += Math.sin(t * 2.29) * 0.032 * s;
        }

        const cz = this.camera.position.z;
        for (let i = 0; i < this.stones.length; i++) {
          const st = this.stones[i];
          if (st.badgeMat && st.badgeSprite) {
            const dCam = Math.abs(cz - st.z);
            const op = dCam <= 18 ? 0.0 : Math.min(1.0, (dCam - 18) / 10);
            st.badgeMat.opacity = op;
            st.badgeSprite.visible = op > 0.02;
          }
        }
      }

      // Check if all current-wave stones have settled or wave timer expired
      const allSettled = this.endTimer > 3.2 && this.stones.every(
        (st) => !st.isCurrentWave || Math.hypot(st.vx, st.vz) < 0.45
      );
      if (allSettled || this.endTimer >= this.endDuration) {
        this.scoreHouseAndEnterSettleBeat();
      }

      this.updateHUD();
    }

    resolveStoneCollisions() {
      for (let i = 0; i < this.stones.length; i++) {
        for (let j = i + 1; j < this.stones.length; j++) {
          const a = this.stones[i];
          const b = this.stones[j];
          const dx = b.x - a.x;
          const dz = b.z - a.z;
          const dist = Math.hypot(dx, dz);
          const minDist = a.radius + b.radius;

          if (dist < minDist && dist > 0.0001) {
            const nx = dx / dist;
            const nz = dz / dist;
            const overlap = minDist - dist;

            const aIn = a.vx * nx + a.vz * nz;
            const bIn = -(b.vx * nx + b.vz * nz);
            const hitter = aIn >= bIn ? a : b;
            const victim = hitter === a ? b : a;
            const hitDirX = hitter === a ? nx : -nx;
            const hitDirZ = hitter === a ? nz : -nz;

            const totalMass = a.mass + b.mass;
            a.x -= nx * overlap * (b.mass / totalMass);
            a.z -= nz * overlap * (b.mass / totalMass);
            b.x += nx * overlap * (a.mass / totalMass);
            b.z += nz * overlap * (a.mass / totalMass);

            const rvx = b.vx - a.vx;
            const rvz = b.vz - a.vz;
            const velAlongNormal = rvx * nx + rvz * nz;

            if (velAlongNormal < 0) {
              const restitution = 0.92;
              const jImpulse = (-(1 + restitution) * velAlongNormal) / (1 / a.mass + 1 / b.mass);
              const ix = jImpulse * nx;
              const iz = jImpulse * nz;

              a.vx -= ix / a.mass;
              a.vz -= iz / a.mass;
              b.vx += ix / b.mass;
              b.vz += iz / b.mass;

              const contactX = a.x + nx * a.radius;
              const contactZ = a.z + nz * a.radius;
              const absJ = Math.abs(jImpulse);
              const isHeavyHit = hitter.heavyTimer > 0 || (hitter.isPlayer && this.feverActive);

              this.spawnShockwave(contactX, contactZ, hitter.curler.critter.color, isHeavyHit ? 7.8 : Math.min(5.5, 2.2 + absJ * 0.25));
              this.spawnParticleBurst(
                contactX,
                0.45,
                contactZ,
                hitter.curler.critter.color,
                isHeavyHit ? 38 : 24,
                Math.min(11.0, 4.5 + absJ * 0.45)
              );

              if (absJ > 5.0 || isHeavyHit) {
                victim.vy = Math.min(6.2, 0.36 * absJ + (isHeavyHit ? 2.0 : 0));
                hitter.squashTimer = 0.14;
              }

              this.addTrauma(Math.min(0.65, absJ * 0.045 + (isHeavyHit ? 0.35 : 0)));
              if (isHeavyHit && absJ > 5.5) {
                this.hitStopTimer = 0.068;
              }

              const pairKey = a.id < b.id ? `${a.id}:${b.id}` : `${b.id}:${a.id}`;
              const nearHouse = a.z < HOUSE_Z + 20 || b.z < HOUSE_Z + 20;
              if (nearHouse && absJ > 2.5 && !this.pairCooldowns.has(pairKey)) {
                this.pairCooldowns.set(pairKey, 0.35);
                if (hitter.curler !== victim.curler) {
                  const koBonus = isHeavyHit ? 45 : 30;
                  hitter.curler.score += koBonus;
                  hitter.curler.knockouts += 1;

                  const kickMag = Math.min(absJ, 14.0) * (isHeavyHit ? 0.48 : 0.30);
                  victim.vx += hitDirX * kickMag;
                  victim.vz += hitDirZ * kickMag;

                  this.spawnFlyingCoin(contactX, 1.4, contactZ, hitter.curler, '🥊');
                  this.sfx.playKnockout();
                  if (hitter.isPlayer) {
                    this.addFever(26);
                    this.showToast('💥🥊');
                    this.triggerFlash();
                  }
                }
              }
              this.sfx.playStoneClack(Math.min(2.2, absJ * 0.22));
            }
          }
        }
      }
    }

    getStoneRingScore(st) {
      const dist = Math.hypot(st.x, st.z - HOUSE_Z);
      if (dist <= HOUSE_RADII.gold) return 100;
      if (dist <= HOUSE_RADII.red) return 50;
      if (dist <= HOUSE_RADII.white) return 25;
      if (dist <= HOUSE_RADII.blue) return 10;
      return 0;
    }

    scoreHouseAndEnterSettleBeat() {
      if (this.waveScored) return;
      this.waveScored = true;

      this.stones.forEach((st) => {
        const ringPts = this.getStoneRingScore(st);
        if (ringPts > 0) {
          const mult = st.isPlayer && this.feverActive ? 1.5 : 1.0;
          const awarded = Math.round(ringPts * mult);
          st.curler.score += awarded;
          const coinCount = Math.min(4, Math.max(1, Math.round(awarded / 25)));
          for (let c = 0; c < coinCount; c++) {
            this.spawnFlyingCoin(st.x, 1.2 + c * 0.3, st.z, st.curler, ringPts >= 50 ? '🎯' : '⭐');
          }
          this.spawnShockwave(st.x, st.z, st.curler.critter.color, ringPts >= 50 ? 5.2 : 3.4);
          if (st.isPlayer) {
            this.addFever(ringPts >= 50 ? 30 : 18);
            if (ringPts >= 50) {
              this.sfx.playBullseye();
              this.showToast('🎯🏆');
            }
          }
        }
      });

      // Hold the camera over the House for 1.15s so ring shockwaves & flying coins are clearly seen!
      this.settleTimer = 1.15;
    }

    scoreHouseAndAdvanceWave() {
      this.scoreHouseAndEnterSettleBeat();
      this.settleTimer = 0;
      if (this.currentEnd < this.totalEnds) {
        this.spawnDeliveryWave(this.currentEnd + 1);
      } else {
        this.finishMatch();
      }
    }

    /* -------------------- PODIUM QUALIFICATION & RESULTS -------------------- */
    sortCurlersStandings(list = this.curlers) {
      return [...list].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.isPlayer !== b.isPlayer) return a.isPlayer ? -1 : 1;
        return (b.knockouts || 0) - (a.knockouts || 0);
      });
    }

    finishMatch(forcedRank = null) {
      if (this.mode === 'results') return;
      this.mode = 'results';
      this.paused = false;
      this.settleTimer = 0;
      this.resetTransientPoolsAndOverlays();
      if (this.pauseOverlayEl) this.pauseOverlayEl.classList.remove('active');
      if (this.previewGroup) this.previewGroup.visible = false;

      if (typeof forcedRank === 'number' && forcedRank >= 1 && forcedRank <= 5) {
        const baseScores = [320, 260, 210, 150, 95];
        const rivals = this.curlers.filter((c) => !c.isPlayer);
        const player = this.curlers.find((c) => c.isPlayer);
        player.score = baseScores[forcedRank - 1];
        let rIdx = 0;
        for (let r = 1; r <= 5; r++) {
          if (r === forcedRank) continue;
          if (rivals[rIdx]) {
            rivals[rIdx].score = baseScores[r - 1];
            rIdx++;
          }
        }
      }

      const sorted = this.sortCurlersStandings();
      sorted.forEach((c, idx) => {
        c.rank = idx + 1;
      });

      const playerEntry = sorted.find((c) => c.isPlayer);
      const playerRank = playerEntry ? playerEntry.rank : 1;

      const starsEarned = playerRank === 1 ? 3 : playerRank === 2 ? 2 : playerRank === 3 ? 1 : 0;
      const qualified = starsEarned > 0;

      if (qualified) {
        const prevStars = this.save.stageStars[this.selectedStageId] || 0;
        this.save.stageStars[this.selectedStageId] = Math.max(prevStars, starsEarned);
        if (this.selectedStageId >= this.save.unlockedStage && this.selectedStageId < 8) {
          this.save.unlockedStage = this.selectedStageId + 1;
        }
        writeSave(this.save);
        this.sfx.playVictory();
        this.spawnShockwave(0, HOUSE_Z, 0xfee440, 8.5);
        this.spawnParticleBurst(0, 1.8, HOUSE_Z, 0xfee440, 42, 9.5);
      } else {
        this.sfx.playDefeat();
      }

      this.lastResult = {
        stageId: this.selectedStageId,
        playerRank,
        starsEarned,
        qualified,
        standings: sorted.map((c) => ({
          id: c.critter.id,
          name: c.critter.name,
          score: c.score,
          knockouts: c.knockouts || 0,
          rank: c.rank,
          isPlayer: c.isPlayer
        }))
      };

      const resultsCard = document.querySelector('.results-card');
      const bannerEl = document.getElementById('results-banner-icon');
      const starsEl = document.getElementById('results-stars-row');
      const podiumEl = document.getElementById('results-podium');
      const retryBtn = document.getElementById('btn-retry-stage');
      const nextBtn = document.getElementById('btn-next-stage');

      if (resultsCard) {
        resultsCard.classList.toggle('victory-card', qualified);
        resultsCard.classList.toggle('defeat-card', !qualified);
      }
      if (retryBtn) {
        retryBtn.classList.toggle('retry-pulse', !qualified);
      }

      const isChampClear = qualified && this.selectedStageId === 8;
      bannerEl.textContent = isChampClear
        ? '👑🏆🎉'
        : playerRank === 1
        ? '🥇🏆'
        : playerRank === 2
        ? '🥈🎉'
        : playerRank === 3
        ? '🥉✨'
        : '❄️😢';

      if (starsEarned > 0) {
        const starSpans = [];
        for (let s = 0; s < 3; s++) {
          if (s < starsEarned) {
            starSpans.push(`<span class="star-pop" style="animation-delay:${s * 0.12}s">⭐</span>`);
          } else {
            starSpans.push('<span>☆</span>');
          }
        }
        starsEl.innerHTML = starSpans.join('');
      } else {
        starsEl.textContent = '☆☆☆';
      }

      const rankMedals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
      const rowsHtml = [];
      sorted.forEach((entry, idx) => {
        if (idx === 3) {
          rowsHtml.push(`
            <div class="podium-cutline" aria-hidden="true">
              <span>🏆 1–3 ⭐</span><span>•</span><span>❄️ 4–5 🔄</span>
            </div>
          `);
        }
        const playerCls = entry.isPlayer ? (qualified ? 'is-player' : 'is-player defeat-player') : '';
        const koCount = entry.knockouts || 0;
        const koBadge = koCount > 0 ? `<span class="podium-ko-badge">🥊${koCount}</span>` : '';
        rowsHtml.push(`
          <div class="podium-row ${playerCls}" data-rank="${idx + 1}">
            <div class="podium-left">
              <span>${rankMedals[idx]}</span>
              <img class="podium-avatar" src="${entry.critter.icon}" alt="${entry.critter.name}" />
              <span>${entry.critter.emoji}</span>
            </div>
            <div class="podium-score-pill">${koBadge}🥌 ${entry.score}</div>
          </div>
        `);
      });
      podiumEl.innerHTML = rowsHtml.join('');

      if (qualified) {
        nextBtn.textContent = this.selectedStageId === 8 ? '👑' : '▶️';
        nextBtn.classList.remove('hidden');
      } else {
        nextBtn.classList.add('hidden');
      }

      this.renderTitleGrids();
      this.showScreen('screen-results');
    }

    /* -------------------- UI & POINTER-CAPTURE CONTROLS -------------------- */
    bindUI() {
      // Global first-gesture AudioContext unlock
      const unlockAudio = () => {
        if (this.sfx.enabled) this.sfx.init();
      };
      window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
      window.addEventListener('keydown', unlockAudio, { once: true, passive: true });

      document.getElementById('btn-play').addEventListener('click', () => {
        if (!this.webglAvailable) return;
        this.sfx.playClick();
        this.startStage(this.selectedStageId);
      });

      const exitToHome = () => {
        this.sfx.playClick();
        this.mode = 'title';
        this.paused = false;
        this.resetTransientPoolsAndOverlays();
        if (this.pauseOverlayEl) this.pauseOverlayEl.classList.remove('active');
        this.updateTitlePreviewStone();
        this.renderTitleGrids();
        this.showScreen('screen-title');
      };

      document.getElementById('btn-hud-home').addEventListener('click', exitToHome);

      const pauseBtn = document.getElementById('btn-pause');
      if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
          this.sfx.playClick();
          this.paused = !this.paused;
          if (this.pauseOverlayEl) {
            this.pauseOverlayEl.classList.toggle('active', this.paused);
          }
        });
      }
      const pauseResumeBtn = document.getElementById('btn-pause-resume');
      if (pauseResumeBtn) {
        pauseResumeBtn.addEventListener('click', () => {
          this.sfx.playClick();
          this.paused = false;
          if (this.pauseOverlayEl) this.pauseOverlayEl.classList.remove('active');
        });
      }
      const pauseHomeBtn = document.getElementById('btn-pause-home');
      if (pauseHomeBtn) {
        pauseHomeBtn.addEventListener('click', exitToHome);
      }

      const audioBtn = document.getElementById('btn-audio');
      if (audioBtn) {
        audioBtn.textContent = this.sfx.enabled ? '🔊' : '🔇';
        audioBtn.addEventListener('click', (e) => {
          this.sfx.enabled = !this.sfx.enabled;
          this.save.audioEnabled = this.sfx.enabled;
          writeSave(this.save);
          e.currentTarget.textContent = this.sfx.enabled ? '🔊' : '🔇';
          if (this.sfx.enabled) {
            this.sfx.playClick();
          } else {
            this.sfx.suspend();
          }
        });
      }

      // Bulletproof Pointer Events with setPointerCapture + pointercancel + blur cleanup
      const bindHold = (id, key) => {
        const el = document.getElementById(id);
        if (!el) return;
        const setVal = (v) => {
          this.input[key] = v;
          el.classList.toggle('held', v);
        };
        el.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          try { el.setPointerCapture(e.pointerId); } catch (err) {}
          setVal(true);
        });
        el.addEventListener('pointerup', () => setVal(false));
        el.addEventListener('pointercancel', () => setVal(false));
        el.addEventListener('lostpointercapture', () => setVal(false));
      };
      bindHold('btn-curl-left', 'left');
      bindHold('btn-curl-right', 'right');

      const clearAllInputs = () => {
        this.input.left = false;
        this.input.right = false;
        this.input.touchSteerX = 0;
        ['btn-curl-left', 'btn-curl-right'].forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.classList.remove('held');
        });
        if (this.joystickEl) this.joystickEl.style.display = 'none';
      };
      window.addEventListener('blur', clearAllInputs);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          clearAllInputs();
          this.sfx.suspend();
        } else if (this.sfx.enabled && this.sfx.ctx) {
          this.sfx.init();
        }
      });

      ['pedal-magnet', 'pedal-sweep', 'pedal-knockout'].forEach((id, idx) => {
        const btn = document.getElementById(id);
        btn.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          this.activatePedal(idx);
        });
        btn.addEventListener('click', (e) => {
          if (e.detail > 0) return;
          this.activatePedal(idx);
        });
      });

      document.getElementById('btn-results-home').addEventListener('click', exitToHome);

      document.getElementById('btn-retry-stage').addEventListener('click', () => {
        this.sfx.playClick();
        this.startStage(this.selectedStageId);
      });

      document.getElementById('btn-next-stage').addEventListener('click', () => {
        if (!this.lastResult || !this.lastResult.qualified) return;
        this.sfx.playClick();
        const nextId = Math.min(8, this.selectedStageId + 1);
        this.selectedStageId = nextId;
        this.startStage(nextId);
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.input.left = true;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.input.right = true;
        if (e.key === '1') this.activatePedal(0);
        if (e.key === '2' || e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
          this.activatePedal(1);
        }
        if (e.key === '3') this.activatePedal(2);
        if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
          if (this.mode === 'playing') {
            this.paused = !this.paused;
            if (this.pauseOverlayEl) this.pauseOverlayEl.classList.toggle('active', this.paused);
          }
        }
      });

      window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.input.left = false;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.input.right = false;
      });

      // Drag-to-Steer on Canvas with Visual Translucent Joystick Ring
      let dragging = false;
      let startX = 0;
      let startY = 0;
      this.container = document.getElementById('canvas-container');
      this.container.addEventListener('pointerdown', (e) => {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        if (this.joystickEl && this.mode === 'playing') {
          this.joystickEl.style.display = 'block';
          this.joystickEl.style.left = `${startX}px`;
          this.joystickEl.style.top = `${startY}px`;
          this.joystickThumbEl.style.transform = 'translate(-50%, -50%)';
        }
      });
      window.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const clampedDx = Math.max(-32, Math.min(32, dx));
        if (this.joystickThumbEl) {
          this.joystickThumbEl.style.transform = `translate(calc(-50% + ${clampedDx}px), -50%)`;
        }
        this.input.touchSteerX = Math.max(-1.2, Math.min(1.2, dx / 40));
      });
      const endDrag = () => {
        dragging = false;
        this.input.touchSteerX = 0;
        if (this.joystickEl) this.joystickEl.style.display = 'none';
      };
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
    }

    renderTitleGrids() {
      const critterGrid = document.getElementById('critter-grid');
      critterGrid.setAttribute('role', 'radiogroup');
      critterGrid.innerHTML = CRITTERS.map((c) => {
        const isSel = c.id === this.selectedCritterId;
        return `
        <button class="critter-card ${isSel ? 'selected' : ''}" role="radio" aria-checked="${isSel}" data-critter="${c.id}" aria-label="${c.name}" style="border-color:${isSel ? '#ff9f1c' : c.hex};">
          <img class="critter-avatar" src="${c.icon}" alt="${c.name}" />
          <span class="critter-badge-emoji">${c.emoji}</span>
        </button>
      `;
      }).join('');

      critterGrid.querySelectorAll('.critter-card').forEach((card) => {
        card.addEventListener('click', () => {
          this.selectedCritterId = card.getAttribute('data-critter');
          this.save.selectedCritter = this.selectedCritterId;
          writeSave(this.save);
          this.sfx.playClick();
          this.updateTitlePreviewStone();
          this.renderTitleGrids();
        });
      });

      const stageGrid = document.getElementById('stage-grid');
      stageGrid.setAttribute('role', 'radiogroup');
      let totalStars = 0;
      Object.values(this.save.stageStars).forEach((s) => { totalStars += s || 0; });
      const pct = Math.round((totalStars / 24) * 100);
      const starBadge = document.getElementById('total-stars-badge');
      if (starBadge) {
        starBadge.innerHTML = `⭐ ${totalStars} <span class="star-meter-track"><span class="star-meter-fill" style="width:${pct}%;"></span></span>`;
      }

      stageGrid.innerHTML = STAGES.map((st) => {
        const unlocked = st.id <= this.save.unlockedStage;
        const stars = this.save.stageStars[st.id] || 0;
        const selected = st.id === this.selectedStageId;
        const topHex = '#' + new THREE.Color(st.skyTop).getHexString();
        const botHex = '#' + new THREE.Color(st.skyBot).getHexString();
        const boss = CRITTERS.find((c) => c.id === st.bossId) || CRITTERS[0];
        return `
          <button class="stage-card ${selected ? 'selected' : ''} ${unlocked ? '' : 'locked'}" role="radio" aria-checked="${selected}" data-stage="${st.id}" aria-label="Stage ${st.id}" style="background:linear-gradient(160deg, ${topHex} 0%, ${botHex} 100%);border-color:${selected ? '#ffffff' : topHex};">
            <span class="stage-num-badge">${st.id}</span>
            <span class="stage-emoji">${unlocked ? st.emoji : '🔒'}</span>
            <span class="stage-boss-pip">${boss.emoji}</span>
            <span class="stage-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>
          </button>
        `;
      }).join('');

      stageGrid.querySelectorAll('.stage-card').forEach((card) => {
        card.addEventListener('click', () => {
          const stId = parseInt(card.getAttribute('data-stage'), 10);
          if (stId <= this.save.unlockedStage) {
            this.selectedStageId = stId;
            this.sfx.playClick();
            if (this.webglAvailable && this.mode === 'title') {
              this.buildRinkEnvironment(STAGES[stId - 1]);
            }
            this.renderTitleGrids();
          }
        });
      });
    }

    updateHUD() {
      const sorted = this.sortCurlersStandings();
      sorted.forEach((c, idx) => { c.rank = idx + 1; });
      const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

      for (let i = 0; i < this.hudChipRefs.length; i++) {
        const ref = this.hudChipRefs[i];
        const r = ref.curler.rank;
        if (ref.lastScore !== ref.curler.score) {
          ref.lastScore = ref.curler.score;
          ref.scoreSpan.textContent = String(ref.curler.score);
        }
        if (ref.lastOrder !== r) {
          ref.lastOrder = r;
          ref.chip.style.order = String(r);
          if (ref.medalPip) ref.medalPip.textContent = medals[r - 1] || '';
          if (ref.curler.isPlayer) {
            ref.chip.classList.toggle('qual-danger', r > 3);
          }
        }
      }

      // Conic Wave Progress Ring
      const waveRing = document.getElementById('hud-wave-ring');
      if (waveRing) {
        const remRatio = Math.max(0, 1 - this.endTimer / this.endDuration);
        waveRing.style.setProperty('--wave-deg', `${Math.round(remRatio * 360)}deg`);
      }

      // Fever Gauge & Active Visual State
      const feverFill = document.getElementById('hud-fever-fill');
      if (feverFill) feverFill.style.width = `${Math.round(this.fever)}%`;
      const feverWrap = document.querySelector('.hud-fever-wrap');
      if (feverWrap) {
        feverWrap.classList.toggle('fever-active', this.feverActive);
        const fIcon = feverWrap.querySelector('.fever-icon');
        if (fIcon) fIcon.textContent = this.feverActive ? '🔥' : '🌈';
      }

      // Context-Aware Pedal Hints + Cooldown Visuals
      const st = this.playerStone;
      const rivalInHouse = this.stones.some(
        (s) => !s.isPlayer && Math.hypot(s.x, s.z - HOUSE_Z) <= HOUSE_RADII.blue + 3.0
      );
      const hintMagnet = Boolean(st && st.z < HOUSE_Z + 34 && st.z > HOUSE_Z - 4 && Math.abs(st.x) > 1.8);
      const hintSweep = Boolean(st && st.z > HOUSE_Z + 12 && Math.abs(st.vz) < 13.5);
      const hintKnockout = Boolean(st && st.z < HOUSE_Z + 38 && rivalInHouse);
      const hints = [hintMagnet, hintSweep, hintKnockout];

      const pedalIds = ['pedal-magnet', 'pedal-sweep', 'pedal-knockout'];
      pedalIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (!el) return;
        const cdEl = el.querySelector('.pedal-cooldown');
        const ratio = this.pedalCooldowns[idx] / this.pedalMaxCooldowns[idx];
        cdEl.style.height = `${Math.min(100, Math.max(0, ratio * 100)).toFixed(1)}%`;
        el.classList.toggle('cooling', ratio > 0);
        el.classList.toggle('active-glow', this.pedalActiveTimers[idx] > 0);
        el.classList.toggle('pedal-hint-pulse', ratio === 0 && this.pedalActiveTimers[idx] === 0 && hints[idx]);
      });

      for (let i = 0; i < this.stones.length; i++) {
        const stone = this.stones[i];
        if (stone.dotEl) {
          const dx = (stone.x / 14) * 46;
          const dz = ((stone.z - HOUSE_Z) / 22) * 46;
          const cx = Math.max(8, Math.min(96, 52 + dx));
          const cy = Math.max(8, Math.min(96, 52 + dz));
          stone.dotEl.style.left = `${cx.toFixed(1)}px`;
          stone.dotEl.style.top = `${cy.toFixed(1)}px`;
        }
      }
    }

    showScreen(screenId) {
      ['screen-title', 'screen-hud', 'screen-results'].forEach((id) => {
        const el = document.getElementById(id);
        if (id === screenId) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }

    showToast(text) {
      const toast = document.getElementById('hud-toast');
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 950);
    }

    triggerFlash() {
      const fl = document.getElementById('fx-flash');
      if (!fl) return;
      fl.classList.add('active');
      setTimeout(() => fl.classList.remove('active'), 180);
    }

    /* -------------------- MAIN RENDER & ANIMATION LOOP -------------------- */
    animate(now) {
      requestAnimationFrame(this.animate);
      if (!this.webglAvailable) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - this.lastFrameTime) / 1000));
      this.lastFrameTime = now;

      if (this.mode === 'playing') {
        this.updatePlaying(dt);
      } else {
        const t = now * 0.00055;
        this.camera.position.set(Math.sin(t) * 11, 8.2, HOUSE_Z + 14 + Math.cos(t) * 5);
        this.camera.lookAt(0, 1.2, HOUSE_Z);
        this.updatePenguinInstances(now * 0.001);
        this.updateImpactFX(dt);
        if (this.previewGroup && this.previewGroup.visible) {
          if (this.previewBounce > 0) {
            this.previewBounce = Math.max(0, this.previewBounce - dt * 3.2);
          }
          const bY = Math.sin(this.previewBounce * Math.PI) * 1.1;
          this.previewGroup.position.set(0, bY, HOUSE_Z);
          const childStone = this.previewGroup.children[0];
          if (childStone && childStone.userData.spinGroup) {
            childStone.userData.spinGroup.rotation.y = now * 0.0012;
          }
        }
      }

      this.renderer.render(this.scene, this.camera);
    }

    /* -------------------- PUBLIC API / TEST HOOKS -------------------- */
    getState() {
      return {
        mode: this.mode,
        paused: this.paused,
        threeRevision: typeof THREE !== 'undefined' ? THREE.REVISION : null,
        webglAvailable: this.webglAvailable,
        assetsReady: this.assetsReady,
        geometryCount: this.renderer && this.renderer.info ? this.renderer.info.memory.geometries : 0,
        drawCalls: this.renderer && this.renderer.info ? this.renderer.info.render.calls : 0,
        selectedCritterId: this.selectedCritterId,
        selectedStageId: this.selectedStageId,
        unlockedStage: this.save.unlockedStage,
        stageStars: this.save.stageStars,
        currentEnd: this.currentEnd,
        totalEnds: this.totalEnds,
        fever: this.fever,
        feverActive: this.feverActive,
        trauma: this.trauma,
        curlers: this.curlers.map((c) => ({
          id: c.critter.id,
          score: c.score,
          knockouts: c.knockouts,
          rank: c.rank,
          isPlayer: c.isPlayer
        })),
        lastResult: this.lastResult || null
      };
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.game = new CritterCurling3DGame();
  });
})();
