import { Server } from 'lucide-react';
import { SERVER, STEPS } from '../../data/site';
import CopyIpButton from '../ui/CopyIpButton';
import PixelArt from '../ui/PixelArt';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { StatusDot } from '../ui/ServerStatus';

export default function HowToPlay() {
  return (
    <section id="play" aria-labelledby="play-title" className="section">
      <div className="container-mc">
        <SectionHeading
          id="play-title"
          eyebrow="How to play"
          title="Join in 3 steps"
          subtitle="No mods, no launchers. Just vanilla Minecraft and our address."
        />

        <div className="relative">
          {/* Dashed pixel connector (desktop) */}
          <span
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-[58px] hidden h-1 md:block"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, #2E8B3C 0 12px, transparent 12px 20px)' }}
          />
          <ol className="relative grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.12} className="relative">
                <div className="pixel-panel flex h-full flex-col items-center gap-4 px-6 pb-8 pt-6 text-center">
                  <div className="relative grid h-[72px] w-[72px] place-items-center border-4 border-edge bg-void">
                    <PixelArt sprite={step.sprite} size={40} />
                    <span className="absolute -right-3 -top-3 bg-grass px-1.5 py-1 font-pixel text-[9px] text-void shadow-[0_3px_0_#14401c]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="font-pixel text-[10px] tracking-widest text-sky">STEP {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="heading-pixel text-sm text-snow">{step.title}</h3>
                  <p className="text-sm text-stone">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Server address panel */}
        <Reveal delay={0.2} className="mt-14">
          <div className="pixel-panel mx-auto flex max-w-3xl flex-col items-center gap-6 bg-void/80 p-6 shadow-[0_0_0_4px_#26323a,0_0_60px_-20px_rgba(85,255,85,0.35)] sm:flex-row sm:justify-between sm:p-8">
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
                <Server className="h-4 w-4 text-sky" aria-hidden="true" />
                Server address
              </span>
              <code className="break-all font-pixel text-sm text-grass text-glow-green sm:text-base md:text-lg">
                {SERVER.ip}
              </code>
              <span className="flex items-center gap-2 text-xs text-stone">
                <StatusDot className="!h-2 !w-2" />
                Online now · {SERVER.version}
              </span>
            </div>
            <CopyIpButton className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
