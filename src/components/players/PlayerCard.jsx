import { memo, useCallback, useRef, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ACTIONS } from '../../data/players';
import { burstFromElement, PALETTES } from '../../utils/particles';
import { playSound } from '../../utils/sound';
import SpriteAnimator, { loadSheet } from './SpriteAnimator';

// Every hover/tap plays the next action in this shared rotation, so the page feels varied.
let cursor = 0;
const nextAction = () => ACTIONS[cursor++ % ACTIONS.length];

const ACCENT = {
  grass: { text: 'text-grass', badge: 'bg-grass text-void', glow: 'rgba(85,255,85,0.28)', ring: '#55FF55' },
  sky: { text: 'text-sky', badge: 'bg-sky text-void', glow: 'rgba(41,182,246,0.28)', ring: '#29B6F6' },
};

const sheet = (id, action) => `/renders/players/${id}/${action}.webp`;

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <dd className="font-display text-base tabular-nums text-snow">{value.toLocaleString('en-US')}</dd>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">{label}</dt>
    </div>
  );
}

/**
 * One card on the ring. Its 3D position is derived from the ring's rotation motion value,
 * so spinning the ring never re-renders React.
 */
function PlayerCard({ player, index, rot, step, radius, offset, live, reduceMotion, onSelect, wasDragged }) {
  const ref = useRef(null);
  const [action, setAction] = useState(null);
  const accent = ACCENT[player.accent] ?? ACCENT.grass;
  const inFront = Math.abs(offset) <= 2;
  const centred = offset === 0;

  const angle = useTransform(rot, (r) => {
    let a = (index * step + r) % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return a;
  });
  const transform = useTransform(
    angle,
    (a) => `translate(-50%, -50%) rotateY(${a}deg) translateZ(${radius}px) rotateY(${-a * 0.7}deg)`,
  );
  const depth = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180));
  const opacity = useTransform(depth, (d) => 0.3 + 0.7 * ((d + 1) / 2) ** 1.4);
  const shade = useTransform(depth, (d) => ((1 - d) / 2) * 0.75);

  const play = useCallback(() => {
    if (reduceMotion || action) return;
    const next = nextAction();
    setAction(next);
    if (next === 'strike' || next === 'victory') {
      setTimeout(() => burstFromElement(ref.current, { preset: 'sparkle', palette: next === 'strike' ? PALETTES.blue : PALETTES.green }), 280);
    }
  }, [action, reduceMotion]);

  const onPointerEnter = (e) => {
    if (e.pointerType !== 'mouse') return;
    if (inFront) play();
    else ACTIONS.forEach((a) => loadSheet(sheet(player.id, a)).catch(() => {}));
  };

  // Tap/click the centred card to animate it; any other card spins to the front.
  const onClick = () => {
    if (wasDragged()) return;
    if (centred) {
      play();
      return;
    }
    playSound('click');
    onSelect(index);
  };

  const src = action ? sheet(player.id, action) : sheet(player.id, 'idle');
  const playing = action ? true : inFront && live && !reduceMotion;

  return (
    <motion.li
      style={{ transform, opacity }}
      className="absolute left-1/2 top-1/2 list-none [transform-style:preserve-3d]"
    >
      <button
        ref={ref}
        type="button"
        onPointerEnter={onPointerEnter}
        onClick={onClick}
        tabIndex={centred ? 0 : -1}
        aria-label={`${player.username}, ${player.role}${centred ? '. Press to play an animation.' : '. Press to bring to the front.'}`}
        className={
          'group relative block w-[var(--card-w)] overflow-hidden bg-panel text-left outline-none transition-shadow duration-300 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-sky ' +
          'shadow-[0_0_0_3px_#26323a,0_24px_50px_-20px_rgba(0,0,0,0.9)]'
        }
        style={centred ? { boxShadow: `0 0 0 3px ${accent.ring}, 0 0 40px -8px ${accent.glow}, 0 24px 50px -20px rgba(0,0,0,0.9)` } : undefined}
      >
        <div
          className="relative aspect-[2/3] w-full"
          style={{ background: `radial-gradient(70% 55% at 50% 62%, ${accent.glow}, transparent 70%), linear-gradient(180deg, #0c1418, #10161A)` }}
        >
          <span aria-hidden="true" className="absolute inset-x-6 bottom-[9%] h-3 rounded-[50%] bg-black/50 blur-md" />
          <SpriteAnimator
            poster={`/renders/players/${player.id}/poster.webp`}
            src={src}
            playing={playing}
            loop={!action}
            onEnd={() => setAction(null)}
            alt={`${player.username}'s Minecraft character`}
            className="h-full w-full origin-[50%_88%] scale-[1.28]"
          />
          <span className={`absolute left-2.5 top-2.5 px-1.5 py-1 font-pixel text-[7px] uppercase ${accent.badge}`}>
            {player.role}
          </span>
        </div>
        <div className="flex flex-col gap-3 border-t-[3px] border-edge px-3 pb-3.5 pt-3">
          <p className={`truncate font-display text-lg leading-none ${accent.text}`}>{player.username}</p>
          <dl className="grid grid-cols-3 gap-1">
            <Stat label="Lvl" value={player.stats.level} />
            <Stat label="Kills" value={player.stats.kills} />
            <Stat label="Builds" value={player.stats.builds} />
          </dl>
        </div>
        <motion.span aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-void" />
      </button>
    </motion.li>
  );
}

export default memo(PlayerCard);
