import { useEffect, useState } from 'react';
import { ArrowSquareOut, DiscordLogo, Scroll, ThumbsUp } from '@phosphor-icons/react';
import { COMMUNITY_STATS, RULES, SOCIAL, VOTE_SITES } from '../../data/site';
import { onOpenModal } from '../../utils/events';
import ActivityFeed from '../community/ActivityFeed';
import GrassEdge from '../ui/GrassEdge';
import Modal from '../ui/Modal';
import PixelArt from '../ui/PixelArt';
import PixelButton from '../ui/PixelButton';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Community() {
  const [modal, setModal] = useState(null); // 'rules' | 'vote' | null
  const close = () => setModal(null);

  // Lets other parts of the page (e.g. the footer "Rules" link) open these dialogs.
  useEffect(() => onOpenModal(setModal), []);

  return (
    <section id="community" aria-labelledby="community-title" className="relative bg-panel">
      <GrassEdge />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(85,255,85,0.08), transparent 70%),' +
            'radial-gradient(ellipse 50% 60% at 100% 40%, rgba(41,182,246,0.10), transparent 70%)',
        }}
      />

      <div className="section">
        <div className="container-mc grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="flex flex-col">
            <SectionHeading
              id="community-title"
              align="left"
              title="Join the community"
              subtitle="Thousands of players. One world. Endless adventures."
            />

            <Reveal delay={0.1} className="-mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <PixelButton href={SOCIAL.discord} target="_blank" rel="noopener noreferrer" size="lg" icon={DiscordLogo} burst>
                Join Discord
              </PixelButton>
              <PixelButton variant="outline" size="lg" icon={Scroll} onClick={() => setModal('rules')}>
                Server rules
              </PixelButton>
              <PixelButton variant="dark" size="lg" icon={ThumbsUp} onClick={() => setModal('vote')}>
                Vote for us
              </PixelButton>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                {COMMUNITY_STATS.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse gap-1.5 border-l-4 border-grass/70 bg-void/50 px-3 py-3 sm:px-4">
                    <dt className="text-xs text-stone sm:text-sm">{s.label}</dt>
                    <dd className="font-pixel text-sm text-snow sm:text-base">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ActivityFeed />
          </Reveal>
        </div>
      </div>

      <Modal open={modal === 'rules'} onClose={close} title="Server rules" eyebrow="Play fair, have fun" variant="drawer">
        <ol className="flex flex-col gap-3">
          {RULES.map((r, i) => (
            <li key={r.title} className="flex gap-4 border-2 border-edge bg-void/60 p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center bg-grass font-pixel text-[10px] text-void">
                {i + 1}
              </span>
              <span className="flex flex-col gap-1">
                <strong className="font-semibold text-snow">{r.title}</strong>
                <span className="text-sm text-stone">{r.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-stone">
          Breaking rules can lead to a warning, mute or ban. Full rules are pinned in our Discord.
        </p>
      </Modal>

      <Modal open={modal === 'vote'} onClose={close} title="Vote for ExampleCraft" eyebrow="Daily rewards" variant="drawer">
        <div className="mb-5 flex items-center gap-4 border-2 border-sky/40 bg-sky/10 p-4">
          <PixelArt sprite="emerald" size={36} />
          <p className="text-sm text-snow">
            Every vote gives you <strong className="text-grass">500 coins</strong> and a{' '}
            <strong className="text-sky">vote crate key</strong>. You can vote once per site every 24 hours.
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {VOTE_SITES.map((site, i) => (
            <li key={site.name}>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-2 border-edge bg-void/60 p-4 transition-colors hover:border-grass"
              >
                <span className="flex items-center gap-3">
                  <span className="font-pixel text-[10px] text-sky">#{i + 1}</span>
                  <span className="font-semibold text-snow">{site.name}</span>
                </span>
                <ArrowSquareOut className="h-4 w-4 text-stone transition-colors group-hover:text-grass" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Modal>
    </section>
  );
}
