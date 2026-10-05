import { useEffect } from 'react';
import ParticleLayer from './components/effects/ParticleLayer';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import About from './components/sections/About';
import Stats from './components/sections/Stats';
import HowToPlay from './components/sections/HowToPlay';
import Gallery from './components/sections/Gallery';
import Community from './components/sections/Community';
import Faq from './components/sections/Faq';

export default function App() {
  // Sections render after the browser tries to jump to a #hash, so redo that jump once mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-grass focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>
      <ParticleLayer />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Stats />
        <HowToPlay />
        <Gallery />
        <Community />
        <Faq />
      </main>
    </>
  );
}
