import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Play, X } from 'lucide-react';
import { NAV_LINKS } from '../../data/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import Logo from '../ui/Logo';
import PixelButton from '../ui/PixelButton';
import SoundToggle from '../ui/SoundToggle';

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ' +
        (scrolled || open
          ? 'bg-void/95 shadow-[0_8px_30px_-12px_rgba(41,182,246,0.35)] backdrop-blur-md'
          : 'bg-void/60 backdrop-blur-sm')
      }
    >
      <nav aria-label="Main" className="container-mc flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={
                    'relative px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors ' +
                    (isActive ? 'text-grass' : 'text-stone hover:text-snow')
                  }
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-[3px] bg-grass shadow-[0_0_10px_#55FF55]"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <SoundToggle />
          <PixelButton
            href="#play"
            size="sm"
            icon={Play}
            burst
            burstPreset="explosion"
            sound="explode"
            className="hidden sm:inline-flex"
          >
            Play now
          </PixelButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center border-[3px] border-edge bg-panel text-snow active:translate-y-0.5 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Blue → green glow line under the navbar */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(41,182,246,0.6), rgba(85,255,85,0.6), transparent)' }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-b-4 border-edge bg-void lg:hidden"
          >
            <ul className="flex flex-col gap-2 px-4 py-5">
              {NAV_LINKS.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={
                      'flex min-h-[52px] items-center gap-3 border-l-4 bg-panel px-4 font-pixel text-xs uppercase ' +
                      (active === id ? 'border-grass text-grass' : 'border-edge text-snow')
                    }
                  >
                    <span aria-hidden="true" className={`h-2 w-2 ${active === id ? 'bg-grass' : 'bg-sky/60'}`} />
                    {label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3">
                <PixelButton
                  href="#play"
                  size="lg"
                  icon={Play}
                  burst
                  burstPreset="explosion"
                  sound="explode"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Play now
                </PixelButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
