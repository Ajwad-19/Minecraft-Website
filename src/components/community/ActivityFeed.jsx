import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Pulse } from '@phosphor-icons/react';
import { ACTIVITY } from '../../data/site';
import PixelArt from '../ui/PixelArt';
import PlayerHead from '../ui/PlayerHead';
import { StatusDot } from '../ui/ServerStatus';

const VISIBLE = 4;
const AGES = ['just now', '1m ago', '3m ago', '6m ago'];

/** Simulated live server feed that cycles while it is on screen. */
export default function ActivityFeed() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-40px' });
  const [head, setHead] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setHead((h) => h + 1), 3200);
    return () => clearInterval(t);
  }, [inView]);

  const entries = Array.from({ length: VISIBLE }, (_, i) => {
    const n = head - i;
    const idx = ((n % ACTIVITY.length) + ACTIVITY.length) % ACTIVITY.length;
    return { key: n, ...ACTIVITY[idx] };
  });

  return (
    <div ref={ref} className="pixel-panel flex flex-col bg-void/80">
      <div className="flex items-center justify-between border-b-4 border-edge px-5 py-4">
        <span className="flex items-center gap-2 font-pixel text-[10px] text-snow">
          <Pulse className="h-4 w-4 text-sky" aria-hidden="true" />
          LIVE ACTIVITY
        </span>
        <span className="flex items-center gap-2 text-xs text-grass">
          <StatusDot className="!h-2 !w-2" />
          Online
        </span>
      </div>
      <ul className="flex flex-col gap-2 p-3" aria-label="Recent server activity">
        <AnimatePresence initial={false} mode="popLayout">
          {entries.map((e, i) => (
            <motion.li
              key={e.key}
              layout
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1 - i * 0.18, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex items-center gap-3 border-2 border-edge bg-panel px-3 py-2.5"
            >
              <span className="border-2 border-void" style={{ boxShadow: `0 0 0 2px ${e.shirt}` }}>
                <PlayerHead hair={e.hair} size={32} />
              </span>
              <span className="min-w-0 flex-1 text-sm leading-snug">
                <strong className="font-semibold text-snow">{e.name}</strong>{' '}
                <span className="text-stone">{e.text}</span>
              </span>
              <span className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                <PixelArt sprite={e.tag} size={18} />
                <span className="text-[11px] text-stone/80">{AGES[i]}</span>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
