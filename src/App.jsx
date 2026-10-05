import ParticleLayer from './components/effects/ParticleLayer';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';

export default function App() {
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
      </main>
    </>
  );
}
