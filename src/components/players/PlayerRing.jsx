import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { CaretLeft, CaretRight, HandSwipeLeft } from '@phosphor-icons/react';
import { PLAYERS, SPRITE } from '../../data/players';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { playSound } from '../../utils/sound';
import PlayerCard from './PlayerCard';
import { loadSheet } from './SpriteAnimator';

const mod = (n, m) => ((n % m) + m) % m;
const DRAG_THRESHOLD = 6;

/**
 * Cards arranged on a 3D cylinder. With 10 players the front half shows 5 cards and
 * the rest sit around the back. Adding players to PLAYERS grows the ring.
 */
export default function PlayerRing() {
  const N = PLAYERS.length;
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);
  const live = useInView(stageRef, { margin: '-80px' });

  const cardW = isMobile ? 150 : 190;
  const cardH = cardW * (SPRITE.height / SPRITE.width) + 92;
  const step = 360 / Math.max(N, 10);
  const radius = Math.round((cardW + (isMobile ? 10 : 22)) / (2 * Math.tan((step * Math.PI) / 360)));

  const rot = useMotionValue(0);
  const [front, setFront] = useState(0);
  useMotionValueEvent(rot, 'change', (r) => {
    const f = mod(Math.round(-r / step), N);
    setFront((prev) => (prev === f ? prev : f));
  });

  const spinTo = useCallback(
    (target) => {
      if (reduceMotion) rot.set(target);
      else animate(rot, target, { type: 'spring', stiffness: 140, damping: 22 });
    },
    [rot, reduceMotion],
  );

  const goTo = useCallback(
    (i) => {
      const base = -i * step;
      const k = Math.round((rot.get() - base) / 360);
      spinTo(base + k * 360);
    },
    [rot, step, spinTo],
  );

  const turn = useCallback(
    (dir) => {
      playSound('click');
      const current = Math.round(rot.get() / step) * step;
      spinTo(current - dir * step);
    },
    [rot, step, spinTo],
  );

  // Warm the cache for the five front idle sheets once the section is near.
  useEffect(() => {
    if (!live || reduceMotion) return;
    for (let d = -2; d <= 2; d++) loadSheet(`/renders/players/${PLAYERS[mod(front + d, N)].id}/idle.webp`).catch(() => {});
  }, [live, front, N, reduceMotion]);

  // --- Drag / swipe to rotate --------------------------------------------------------
  const drag = useRef({ active: false, moved: false, x: 0, start: 0, lastX: 0, lastT: 0, v: 0 });
  const dragged = useRef(false);
  const wasDragged = useCallback(() => dragged.current, []);
  const degPerPx = step / (cardW + 20);

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    rot.stop();
    drag.current = { active: true, moved: false, x: e.clientX, start: rot.get(), lastX: e.clientX, lastT: performance.now(), v: 0 };
    dragged.current = false;
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      dragged.current = true;
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    const now = performance.now();
    d.v = (e.clientX - d.lastX) / Math.max(1, now - d.lastT);
    d.lastX = e.clientX;
    d.lastT = now;
    rot.set(d.start + dx * degPerPx);
  };
  const onPointerUp = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (!d.moved) return;
    const projected = rot.get() + d.v * 220 * degPerPx;
    spinTo(Math.round(projected / step) * step);
    playSound('click');
    // Let the click that follows a drag see `dragged`, then clear it.
    setTimeout(() => (dragged.current = false), 0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      turn(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      turn(-1);
    }
  };

  const current = PLAYERS[front];

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Players. Use the arrow keys to rotate."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative w-full cursor-grab touch-pan-y select-none outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-sky/60"
        style={{ height: cardH + (isMobile ? 100 : 150), perspective: isMobile ? 900 : 1400, '--card-w': `${cardW}px` }}
      >
        {/* Floor glow under the ring */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[62%] h-40 w-[min(900px,90%)] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{ background: 'radial-gradient(closest-side, rgba(41,182,246,0.16), rgba(85,255,85,0.06), transparent)' }}
        />
        <ul
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: `translateY(${isMobile ? 4 : 10}px) translateZ(${-radius}px) rotateX(-14deg)` }}
        >
          {PLAYERS.map((p, i) => {
            let offset = mod(i - front, N);
            if (offset > N / 2) offset -= N;
            return (
              <PlayerCard
                key={p.id}
                player={p}
                index={i}
                rot={rot}
                step={step}
                radius={radius}
                offset={offset}
                live={live}
                reduceMotion={reduceMotion}
                onSelect={goTo}
                wasDragged={wasDragged}
              />
            );
          })}
        </ul>
      </div>

      <div className="flex w-full max-w-md items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => turn(-1)}
          aria-label="Previous player"
          className="grid h-12 w-12 place-items-center border-[3px] border-edge bg-panel text-snow transition-colors hover:border-sky hover:text-sky active:translate-y-0.5"
        >
          <CaretLeft size={20} weight="bold" />
        </button>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="font-display text-xl leading-none text-snow" aria-hidden="true">
            {current.username}
          </p>
          <p className="text-sm text-stone">{current.tagline}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-stone/80 md:hidden">
            <HandSwipeLeft size={16} aria-hidden="true" /> Swipe to rotate, tap to animate
          </p>
        </div>
        <button
          type="button"
          onClick={() => turn(1)}
          aria-label="Next player"
          className="grid h-12 w-12 place-items-center border-[3px] border-edge bg-panel text-snow transition-colors hover:border-sky hover:text-sky active:translate-y-0.5"
        >
          <CaretRight size={20} weight="bold" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Now facing: {current.username}, {current.role}. {front + 1} of {N}.
      </p>
    </div>
  );
}
