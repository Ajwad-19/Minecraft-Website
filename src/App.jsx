import { Play, Compass } from 'lucide-react';
import ParticleLayer from './components/effects/ParticleLayer';
import PixelButton from './components/ui/PixelButton';
import SectionHeading from './components/ui/SectionHeading';
import TiltCard from './components/ui/TiltCard';
import SoundToggle from './components/ui/SoundToggle';
import PixelArt from './components/ui/PixelArt';
import IsoCube from './components/ui/IsoCube';

// Temporary component preview — replaced by the real page sections in the next parts.
export default function App() {
  return (
    <>
      <ParticleLayer />
      <main className="section">
        <div className="container-mc">
          <div className="mb-8 flex justify-end">
            <SoundToggle />
          </div>
          <SectionHeading eyebrow="Part 2 preview" title="UI BUILDING BLOCKS" subtitle="Buttons, cards, sprites and cubes." />

          <div className="mb-16 flex flex-wrap justify-center gap-6">
            <PixelButton size="lg" icon={Play} burst burstPreset="explosion" sound="explode">Play now</PixelButton>
            <PixelButton size="lg" variant="outline" icon={Compass} burst>Explore server</PixelButton>
            <PixelButton size="lg" variant="dark">Server rules</PixelButton>
          </div>

          <div className="mb-16 flex flex-wrap items-end justify-center gap-8">
            {['grass', 'dirt', 'stone', 'diamond', 'emerald', 'diamondOre'].map((t, i) => (
              <IsoCube key={t} type={t} seed={i + 1} size={88} />
            ))}
          </div>

          <div className="mb-16 flex flex-wrap items-center justify-center gap-8">
            {['diamond', 'emerald', 'pickaxe', 'sword', 'trophy', 'creeper', 'grass', 'heart'].map((s) => (
              <PixelArt key={s} sprite={s} size={56} title={s} />
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <TiltCard className="p-8">
              <h3 className="heading-pixel mb-3 text-sm text-grass">Green tilt card</h3>
              <p className="text-stone">Hover me: I lift, tilt and glow green.</p>
            </TiltCard>
            <TiltCard glow="blue" className="p-8">
              <h3 className="heading-pixel mb-3 text-sm text-sky">Blue tilt card</h3>
              <p className="text-stone">Same component with the blue glow variant.</p>
            </TiltCard>
          </div>
        </div>
      </main>
    </>
  );
}
