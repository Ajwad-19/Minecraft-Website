import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { HardDrives } from '@phosphor-icons/react';
import { SERVER, STEPS } from '../../data/site';
import CopyIpButton from '../ui/CopyIpButton';
import PixelArt from '../ui/PixelArt';
import SectionHeading from '../ui/SectionHeading';
import { StatusDot } from '../ui/ServerStatus';

function Step({ step, index, active, onActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li
      ref={ref}
      className={
        'flex flex-col gap-4 border-l-4 py-8 pl-6 transition-[opacity,border-color] duration-500 lg:min-h-[52vh] lg:justify-center lg:pl-10 ' +
        (active ? 'border-grass opacity-100' : 'border-edge lg:opacity-35')
      }
    >
      <div className="flex items-center gap-4">
        <span className={`font-display text-7xl font-bold leading-none tabular-nums transition-colors duration-500 md:text-8xl ${active ? 'text-grass text-glow-green' : 'text-edge'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <PixelArt sprite={step.sprite} size={44} />
      </div>
      <h3 className="heading-pixel text-3xl text-snow md:text-4xl">{step.title}</h3>
      <p className="max-w-[44ch] text-lg leading-relaxed text-stone">{step.text}</p>
    </li>
  );
}

/** Steps scroll past on the right while the server address stays pinned on the left (desktop). */
export default function HowToPlay() {
  const [active, setActive] = useState(0);

  return (
    <section id="play" aria-labelledby="play-title" className="section">
      <div className="container-mc">
        <SectionHeading
          id="play-title"
          align="left"
          eyebrow="How to play"
          title="Online in three steps"
          subtitle="No mods, no launchers. Just Minecraft and our address."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Pinned panel */}
          <div className="self-start lg:sticky lg:top-28">
            <div className="pixel-panel overflow-hidden bg-void/80 shadow-[0_0_0_4px_#26323a,0_0_60px_-24px_rgba(85,255,85,0.4)]">
              <div className="relative grid place-items-center overflow-hidden bg-[radial-gradient(60%_60%_at_50%_45%,rgba(41,182,246,0.18),transparent_70%)] px-6 pt-6">
                <img
                  src="/renders/island.webp"
                  alt="A floating Minecraft island with a tree and diamond ore"
                  width="1400"
                  height="1400"
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-[min(320px,80%)] animate-float drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)]"
                />
              </div>
              <div className="flex flex-col gap-5 border-t-4 border-edge p-6">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone">
                    <HardDrives size={16} weight="bold" className="text-sky" aria-hidden="true" />
                    Server address
                  </span>
                  <code className="break-all font-display text-2xl font-bold text-grass text-glow-green md:text-3xl">{SERVER.ip}</code>
                  <span className="flex items-center gap-2 text-sm text-stone">
                    <StatusDot className="!h-2 !w-2" />
                    Online now · {SERVER.version}
                  </span>
                </div>
                <CopyIpButton className="w-full" />
                <div className="hidden gap-1.5 lg:flex" aria-hidden="true">
                  {STEPS.map((s, i) => (
                    <span key={s.title} className={`h-1.5 flex-1 transition-colors duration-500 ${i <= active ? 'bg-grass' : 'bg-edge'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ol className="flex flex-col">
            {STEPS.map((step, i) => (
              <Step key={step.title} step={step} index={i} active={active === i} onActive={setActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
