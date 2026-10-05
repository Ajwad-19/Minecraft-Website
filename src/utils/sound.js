// Tiny Web Audio synth for Minecraft-ish UI blips.
// Nothing is created or played until the user explicitly enables sound.

const STORAGE_KEY = 'examplecraft:sound';
const listeners = new Set();

let enabled = false;
let ctx = null;

function getCtx() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function isSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(value) {
  enabled = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((fn) => fn());
  if (value) playSound('toggle');
}

export function subscribeSound(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Restore the previous choice. Sounds still only play in response to user clicks.
export function restoreSoundPreference() {
  try {
    enabled = localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    enabled = false;
  }
}

function tone(ac, { freq, endFreq, type = 'square', duration = 0.08, gain = 0.06, delay = 0 }) {
  const t = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

function noise(ac, { duration = 0.5, gain = 0.25, from = 1800, to = 120, delay = 0 }) {
  const t = ac.currentTime + delay;
  const length = Math.floor(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(from, t);
  filter.frequency.exponentialRampToValueAtTime(to, t + duration);
  const g = ac.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  src.connect(filter).connect(g).connect(ac.destination);
  src.start(t);
}

const SOUNDS = {
  click: (ac) => tone(ac, { freq: 520, endFreq: 380, duration: 0.06 }),
  toggle: (ac) => {
    tone(ac, { freq: 660, duration: 0.06 });
    tone(ac, { freq: 990, duration: 0.08, delay: 0.06 });
  },
  pop: (ac) => tone(ac, { freq: 300, endFreq: 900, type: 'triangle', duration: 0.1, gain: 0.08 }),
  success: (ac) => {
    tone(ac, { freq: 784, duration: 0.08 });
    tone(ac, { freq: 1046, duration: 0.08, delay: 0.08 });
    tone(ac, { freq: 1318, duration: 0.14, delay: 0.16 });
  },
  hiss: (ac) => noise(ac, { duration: 1.1, gain: 0.08, from: 6000, to: 2500 }),
  explode: (ac) => {
    noise(ac, { duration: 0.9, gain: 0.35, from: 2200, to: 60 });
    tone(ac, { freq: 120, endFreq: 40, type: 'sawtooth', duration: 0.4, gain: 0.12 });
  },
};

export function playSound(name) {
  if (!enabled) return;
  const ac = getCtx();
  const fn = SOUNDS[name];
  if (ac && fn) fn(ac);
}
