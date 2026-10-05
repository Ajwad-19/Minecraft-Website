import { memo } from 'react';

// Deterministic pseudo-random so positions are stable between renders.
const rnd = (n) => {
  const s = Math.sin(n * 91.7) * 10000;
  return s - Math.floor(s);
};

const STARS = Array.from({ length: 46 }, (_, n) => ({
  left: rnd(n) * 100,
  top: rnd(n + 100) * 45,
  size: rnd(n + 200) > 0.8 ? 3 : 2,
  delay: rnd(n + 300) * 3,
  blue: rnd(n + 400) > 0.7,
}));

const EMBERS = Array.from({ length: 22 }, (_, n) => ({
  left: rnd(n + 500) * 100,
  delay: rnd(n + 600) * 10,
  duration: 9 + rnd(n + 700) * 8,
  size: rnd(n + 800) > 0.6 ? 4 : 3,
  green: rnd(n + 900) > 0.35,
}));

/** Stars and slowly rising pixel particles. `lite` renders fewer for mobile. */
function HeroAmbience({ lite = false }) {
  const stars = lite ? STARS.slice(0, 16) : STARS;
  const embers = lite ? EMBERS.slice(0, 7) : EMBERS;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, n) => (
        <span
          key={`s${n}`}
          className={`absolute animate-twinkle ${s.blue ? 'bg-sky' : 'bg-snow'}`}
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
      {embers.map((e, n) => (
        <span
          key={`e${n}`}
          className={`ember absolute bottom-0 ${e.green ? 'bg-grass' : 'bg-sky'}`}
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default memo(HeroAmbience);
