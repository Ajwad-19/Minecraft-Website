import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CaretRight, DiscordLogo } from '@phosphor-icons/react';
import { FAQS, SOCIAL } from '../../data/site';
import { playSound } from '../../utils/sound';
import PixelArt from '../ui/PixelArt';
import PixelButton from '../ui/PixelButton';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Pixel plus that collapses into a minus when open (used by the mobile accordion). */
function PixelToggleIcon({ open }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-9 w-9 shrink-0 place-items-center border-[3px] transition-colors ${
        open ? 'border-grass bg-grass text-void' : 'border-edge bg-void text-grass'
      }`}
    >
      <svg viewBox="0 0 10 10" className="h-3.5 w-3.5" shapeRendering="crispEdges">
        <rect x="1" y="4" width="8" height="2" fill="currentColor" />
        <rect
          x="4"
          y="1"
          width="2"
          height="8"
          fill="currentColor"
          className="transition-transform duration-200"
          style={{ transformBox: 'fill-box', transformOrigin: 'center', transform: open ? 'scaleY(0)' : 'scaleY(1)' }}
        />
      </svg>
    </span>
  );
}

/**
 * Desktop: questions on the left, the selected answer in a panel on the right.
 * Mobile: the same list becomes an accordion with the answer under its question.
 */
export default function Faq() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const select = (i) => {
    playSound('click');
    setActive((cur) => (cur === i && window.matchMedia('(max-width: 1023px)').matches ? -1 : i));
  };
  const current = FAQS[active];

  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="container-mc">
        <SectionHeading
          id="faq-title"
          align="left"
          eyebrow="FAQ"
          title="Questions before you spawn in?"
          subtitle="The things new players ask us most."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <Reveal>
            <ul className="flex flex-col divide-y-2 divide-edge border-y-2 border-edge">
              {FAQS.map((item, i) => {
                const open = active === i;
                return (
                  <li key={item.q}>
                    <h3>
                      <button
                        type="button"
                        id={`${baseId}-q${i}`}
                        aria-expanded={open}
                        aria-controls={`${baseId}-a${i}`}
                        onClick={() => select(i)}
                        className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span className={`text-lg font-semibold transition-colors ${open ? 'text-grass' : 'text-snow group-hover:text-grass'}`}>
                          {item.q}
                        </span>
                        <span className="lg:hidden">
                          <PixelToggleIcon open={open} />
                        </span>
                        <CaretRight
                          size={20}
                          weight="bold"
                          aria-hidden="true"
                          className={`hidden shrink-0 transition-[transform,color] lg:block ${open ? 'translate-x-1 text-grass' : 'text-edge group-hover:text-stone'}`}
                        />
                      </button>
                    </h3>
                    {/* Mobile answer, inline */}
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`${baseId}-a${i}`}
                          role="region"
                          aria-labelledby={`${baseId}-q${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden lg:hidden"
                        >
                          <p className="pb-5 leading-relaxed text-stone">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Desktop answer panel */}
          <Reveal delay={0.1} className="hidden lg:block">
            <div className="pixel-panel sticky top-28 flex min-h-[320px] flex-col justify-between gap-8 p-8">
              <AnimatePresence mode="wait">
                {current && (
                  <motion.div
                    key={current.q}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    aria-live="polite"
                    className="flex flex-col gap-4"
                  >
                    <p className="font-display text-3xl font-bold leading-tight text-snow">{current.q}</p>
                    <p className="text-lg leading-relaxed text-stone">{current.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-center justify-between gap-4 border-t-2 border-edge pt-6">
                <span className="flex items-center gap-3 text-sm text-stone">
                  <PixelArt sprite="heart" size={24} />
                  Still stuck? Staff answer on Discord every day.
                </span>
                <PixelButton href={SOCIAL.discord} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={DiscordLogo}>
                  Join Discord
                </PixelButton>
              </div>
            </div>
          </Reveal>

          {/* Mobile help card */}
          <div className="flex flex-col items-start gap-4 lg:hidden">
            <p className="flex items-center gap-3 text-sm text-stone">
              <PixelArt sprite="heart" size={24} />
              Still stuck? Staff answer on Discord every day.
            </p>
            <PixelButton href={SOCIAL.discord} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={DiscordLogo}>
              Join Discord
            </PixelButton>
          </div>
        </div>
      </div>
    </section>
  );
}
