import { memo, useEffect, useRef } from 'react';
import { SPRITE } from '../../data/players';

// Shared image cache so a sheet is downloaded once, however many cards ask for it.
const cache = new Map();
export function loadSheet(src) {
  if (!cache.has(src)) {
    cache.set(
      src,
      new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => resolve(src);
        img.onerror = reject;
        img.src = src;
      }),
    );
  }
  return cache.get(src);
}

/**
 * Plays a horizontal sprite sheet (SPRITE.frames frames) by stepping background-position.
 * The poster sits underneath, so nothing flashes while a sheet downloads.
 * Frames are written straight to the DOM; React does not re-render per frame.
 */
function SpriteAnimator({ poster, src, playing, loop = true, onEnd, alt, className = '' }) {
  const spriteRef = useRef(null);
  const posterRef = useRef(null);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  useEffect(() => {
    const el = spriteRef.current;
    const still = posterRef.current;
    if (!el) return;
    // Only one of the still frame and the animated sheet is visible at a time,
    // otherwise the idle pose shows through the transparent parts of an action.
    el.style.opacity = '0';
    if (still) still.style.opacity = '1';
    if (!playing || !src) return;

    let raf = 0;
    let cancelled = false;
    loadSheet(src).then(() => {
      if (cancelled) return;
      el.style.backgroundImage = `url("${src}")`;
      el.style.backgroundPosition = '0% 0';
      el.style.opacity = '1';
      if (still) still.style.opacity = '0';
      const start = performance.now();
      let last = -1;
      const tick = (now) => {
        let frame = Math.floor(((now - start) / 1000) * SPRITE.fps);
        if (frame >= SPRITE.frames) {
          if (!loop) {
            onEndRef.current?.();
            return;
          }
          frame %= SPRITE.frames;
        }
        if (frame !== last) {
          last = frame;
          el.style.backgroundPosition = `${(frame / (SPRITE.frames - 1)) * 100}% 0`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, () => onEndRef.current?.());

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [src, playing, loop]);

  return (
    <div className={`relative ${className}`}>
      <img
        ref={posterRef}
        src={poster}
        alt={alt}
        width={SPRITE.width}
        height={SPRITE.height}
        decoding="async"
        draggable="false"
        className="absolute inset-0 h-full w-full select-none object-contain"
      />
      <div
        ref={spriteRef}
        aria-hidden="true"
        className="absolute inset-0 bg-no-repeat opacity-0"
        style={{ backgroundSize: `${SPRITE.frames * 100}% 100%`}}
      />
    </div>
  );
}

export default memo(SpriteAnimator);
