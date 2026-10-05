import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { FAQS, SOCIAL } from '../../data/site';
import { playSound } from '../../utils/sound';
import PixelArt from '../ui/PixelArt';
import PixelButton from '../ui/PixelButton';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Pixel plus that collapses into a minus when open. */
function PixelToggleIcon({ open }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-9 w-9 shrink-0 place-items-center border-[3px] transition-colors ${
        open ? 'border-grass bg-grass text-void' : 'border-edge bg-void text-grass group-hover:border-grass'
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

function FaqItem({ item, open, onToggle }) {
  const id = useId();
  return (
    <li className={`border-[3px] transition-colors ${open ? 'border-grass/60 bg-panel' : 'border-edge bg-panel/60'}`}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
        >
          <span className={`text-base font-semibold sm:text-lg ${open ? 'text-grass' : 'text-snow'}`}>{item.q}</span>
          <PixelToggleIcon open={open} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="border-t-2 border-edge px-5 pb-5 pt-4 text-stone sm:px-6">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="container-mc grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="FAQ"
            title="Questions? Answers."
            subtitle="Everything you need to know before you spawn in."
          />
          <Reveal delay={0.1} className="-mt-4">
            <div className="pixel-panel flex flex-col items-start gap-4 p-6">
              <PixelArt sprite="heart" size={36} />
              <p className="font-pixel text-[11px] leading-relaxed text-snow">STILL STUCK?</p>
              <p className="text-sm text-stone">Our staff and community answer questions on Discord every day.</p>
              <PixelButton href={SOCIAL.discord} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={MessageCircle}>
                Ask on Discord
              </PixelButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                open={openIndex === i}
                onToggle={() => {
                  playSound('click');
                  setOpenIndex(openIndex === i ? -1 : i);
                }}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
