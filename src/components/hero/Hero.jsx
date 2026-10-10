import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CaretDown, Compass, Play } from '@phosphor-icons/react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import BlockRender from '../ui/BlockRender';
import Magnetic from '../ui/Magnetic';
import PixelButton from '../ui/PixelButton';
import ServerStatus from '../ui/ServerStatus';
import HeroAmbience from './HeroAmbience';
import Landscape from './Landscape';

const CUBES = [
  { type: 'diamond', left: '6%', top: '20%', size: 46, delay: 0, mobile: true },
  { type: 'grass', left: '44%', top: '12%', size: 30, delay: 1.5 },
  { type: 'emerald', left: '90%', top: '16%', size: 34, delay: 3, mobile: true },
  { type: 'dirt', left: '3%', top: '62%', size: 28, delay: 2 },
  { type: 'diamondOre', left: '55%', top: '80%', size: 26, delay: 4 },
  { type: 'stone', left: '80%', top: '74%', size: 22, delay: 1, mobile: true },
];

const HEADLINE = [
  { word: 'BUILD.', className: 'text-snow' },
  { word: 'EXPLORE.', className: 'text-sky text-glow-blue' },
  { word: 'SURVIVE.', className: 'text-grass text-glow-green' },
];

export default function Hero() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const parallax = !isMobile && !reduceMotion;

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const farY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const groundY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const cubesY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse parallax
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const farX = useTransform(mx, (v) => v * -8);
  const midX = useTransform(mx, (v) => v * -16);
  const cubesX = useTransform(mx, (v) => v * 28);
  const islandX = useTransform(mx, (v) => v * -18);
  const islandY = useTransform(my, (v) => v * -12);

  const onPointerMove = (e) => {
    if (!parallax) return;
    mx.set((e.clientX / window.innerWidth) * 2 - 1);
    my.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  const cubes = isMobile ? CUBES.filter((c) => c.mobile) : CUBES;

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-4 pb-44 pt-28 sm:px-6 md:pb-48"
    >
      {/* Night sky with a blue horizon glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 88%, rgba(41,182,246,0.30), transparent 70%),' +
            'radial-gradient(ellipse 45% 35% at 78% 72%, rgba(85,255,85,0.10), transparent 70%),' +
            'linear-gradient(180deg, #05080A 0%, #08121A 55%, #0C1D2A 100%)',
        }}
      />

      <HeroAmbience lite={isMobile} />

      <Landscape
        farStyle={parallax ? { x: farX, y: farY } : undefined}
        midStyle={parallax ? { x: midX, y: midY } : undefined}
        groundStyle={parallax ? { y: groundY } : undefined}
      />

      {/* Floating background cubes */}
      <motion.div
        aria-hidden="true"
        style={parallax ? { x: cubesX, y: cubesY } : undefined}
        className="pointer-events-none absolute inset-0"
      >
        {cubes.map((c) => (
          <div key={c.type} className="absolute opacity-70" style={{ left: c.left, top: c.top }}>
            <BlockRender
              type={c.type}
              size={isMobile ? Math.round(c.size * 0.85) : Math.round(c.size * 1.2)}
              eager
              className="animate-float"
              style={{ animationDelay: `${c.delay}s` }}
            />
          </div>
        ))}
      </motion.div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-void" />

      <motion.div
        style={parallax ? { y: contentY, opacity: contentOpacity } : undefined}
        className="container-mc relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]"
      >
        <div className="flex flex-col items-start gap-7">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <ServerStatus />
          </motion.div>

          <h1 id="hero-title" className="heading-pixel text-[56px] uppercase leading-[0.92] sm:text-7xl md:text-8xl xl:text-[112px]">
            {HEADLINE.map(({ word, className }, i) => (
              <motion.span
                key={word}
                className={`block ${className}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="max-w-md text-lg text-stone md:text-xl"
          >
            Your adventure starts one block at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-5"
          >
            <Magnetic className="w-full sm:w-auto">
              <PixelButton href="#play" size="lg" icon={Play} burst burstPreset="explosion" sound="explode" className="w-full sm:w-auto">
                Play now
              </PixelButton>
            </Magnetic>
            <PixelButton href="#server" size="lg" variant="outline" icon={Compass} burst sound="pop">
              Explore server
            </PixelButton>
          </motion.div>

        </div>

        {/* Voxel island centerpiece (desktop) */}
        <motion.div
          style={parallax ? { x: islandX, y: islandY } : undefined}
          className="relative hidden justify-center lg:flex"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: reduceMotion ? 0 : [0, -14, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.3 },
              scale: { duration: 0.8, delay: 0.3 },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative"
          >
            <img
              src="/renders/island.webp"
              width="1400"
              height="1400"
              alt="A floating Minecraft island with a tree and diamond ore"
              fetchpriority="high"
              decoding="async"
              draggable="false"
              className="h-auto w-[480px] select-none drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] xl:w-[560px]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-10 left-1/2 h-8 w-3/4 -translate-x-1/2 bg-sky/20 blur-2xl"
            />
          </motion.div>
          <div aria-hidden="true" className="absolute -right-2 top-4">
            <BlockRender type="diamond" size={64} eager className="animate-float drop-shadow-[0_0_18px_rgba(41,182,246,0.6)]" />
          </div>
          <div aria-hidden="true" className="absolute -left-4 bottom-16">
            <BlockRender type="emerald" size={46} eager className="animate-float drop-shadow-[0_0_14px_rgba(85,255,85,0.5)]" style={{ animationDelay: '2s' }} />
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-stone transition-colors hover:text-grass"
      >
        <span className="font-pixel text-[8px] tracking-widest">SCROLL</span>
        <CaretDown size={20} weight="bold" className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
