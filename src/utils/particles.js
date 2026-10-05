// Minimal event bus so any component can spawn particles on the shared canvas.

const listeners = new Set();

export const PALETTES = {
  green: ['#55FF55', '#2E8B3C', '#B6FFB6', '#3FD44A'],
  blue: ['#29B6F6', '#1565C0', '#7FDBFF', '#4DE8E8'],
  mixed: ['#55FF55', '#29B6F6', '#2E8B3C', '#1565C0', '#F5F5F5'],
  explosion: ['#F5F5F5', '#FFD54F', '#FF9800', '#AAB2B8', '#55FF55', '#3A3A3A'],
  creeper: ['#55FF55', '#2E8B3C', '#1B5E20', '#0B0B0B', '#AAB2B8', '#F5F5F5'],
};

/**
 * @param {{x:number, y:number, preset?: 'burst'|'explosion'|'sparkle'|'trail', palette?: string[]}} opts
 */
export function emitParticles(opts) {
  listeners.forEach((fn) => fn(opts));
}

export function burstFromElement(el, opts = {}) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  emitParticles({ x: r.left + r.width / 2, y: r.top + r.height / 2, ...opts });
}

export function subscribeParticles(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
