import { useEffect, useRef } from 'react';
import { PALETTES, subscribeParticles } from '../../utils/particles';

const MAX_PARTICLES = 450;

const PRESETS = {
  burst: { count: 26, speed: [2, 7], size: [4, 8], life: [35, 60], gravity: 0.18 },
  explosion: { count: 80, speed: [3, 13], size: [5, 12], life: [45, 90], gravity: 0.22 },
  sparkle: { count: 10, speed: [0.6, 2.4], size: [3, 5], life: [25, 45], gravity: -0.02 },
  trail: { count: 1, speed: [0.2, 1], size: [3, 5], life: [20, 34], gravity: 0.06 },
};

const rand = (min, max) => min + Math.random() * (max - min);

/** Full-screen canvas that renders square "pixel" particles. Idle when empty. */
export default function ParticleLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    let raf = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const isSmall = () => window.innerWidth < 768;

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const t = p.life / p.maxLife;
        const s = Math.max(1, Math.round(p.size * (0.4 + 0.6 * t)));
        ctx.globalAlpha = Math.min(1, t * 1.6);
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x - s / 2), Math.round(p.y - s / 2), s, s);
      }
      ctx.globalAlpha = 1;
      raf = particles.length ? requestAnimationFrame(tick) : 0;
    };

    const unsubscribe = subscribeParticles(({ x, y, preset = 'burst', palette }) => {
      const cfg = PRESETS[preset] ?? PRESETS.burst;
      const colors = palette ?? PALETTES.mixed;
      const count = isSmall() ? Math.ceil(cfg.count / 2) : cfg.count;
      for (let i = 0; i < count && particles.length < MAX_PARTICLES; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(...cfg.speed);
        const life = rand(...cfg.life);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (preset === 'explosion' ? 2 : 1),
          size: rand(...cfg.size),
          color: colors[(Math.random() * colors.length) | 0],
          life,
          maxLife: life,
          gravity: cfg.gravity,
        });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] h-full w-full"
    />
  );
}
