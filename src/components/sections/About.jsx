import { FEATURES } from '../../data/site';
import BlockRender from '../ui/BlockRender';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import SpotlightPanel from '../ui/SpotlightPanel';

const ACCENT = {
  green: { text: 'text-grass', dot: 'bg-grass' },
  blue: { text: 'text-sky', dot: 'bg-sky' },
};

function Tags({ tags, dot }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="flex items-center gap-2 bg-void/70 px-2.5 py-1 text-xs font-medium text-snow/90 backdrop-blur-sm">
          <span aria-hidden="true" className={`h-1.5 w-1.5 ${dot}`} />
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Image tile: a rendered scene fills the tile and the copy sits on a gradient at the bottom. */
function ImageTile({ feature, large }) {
  const accent = ACCENT[feature.glow];
  return (
    <SpotlightPanel
      as="article"
      glow={feature.glow}
      className="pixel-mask group flex h-full min-h-[320px] flex-col justify-end overflow-hidden bg-panel"
    >
      <img
        src={feature.image}
        alt=""
        width="1600"
        height="1000"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/0" />
      <div className={`relative z-[2] flex flex-col gap-3 ${large ? 'p-7 md:p-10' : 'p-6'}`}>
        <h3 className={`heading-pixel ${large ? 'text-5xl md:text-6xl' : 'text-3xl'} ${accent.text}`}>{feature.title}</h3>
        <p className={`max-w-[42ch] text-snow/85 ${large ? 'text-lg' : ''}`}>{feature.text}</p>
        <Tags tags={feature.tags} dot={accent.dot} />
      </div>
    </SpotlightPanel>
  );
}

/** Block tile: a single rendered block floats over a plain panel. */
function BlockTile({ feature }) {
  const accent = ACCENT[feature.glow];
  return (
    <SpotlightPanel
      as="article"
      glow={feature.glow}
      className="pixel-panel group flex h-full min-h-[260px] items-center gap-6 overflow-hidden p-6"
    >
      <BlockRender
        type={feature.block}
        size={120}
        className="relative z-[2] shrink-0 drop-shadow-[0_18px_30px_rgba(41,182,246,0.35)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-6"
      />
      <div className="relative z-[2] flex flex-col gap-3">
        <h3 className={`heading-pixel text-3xl ${accent.text}`}>{feature.title}</h3>
        <p className="text-stone">{feature.text}</p>
        <Tags tags={feature.tags} dot={accent.dot} />
      </div>
    </SpotlightPanel>
  );
}

export default function About() {
  const [survival, economy, events] = FEATURES;
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-mc">
        <SectionHeading
          id="about-title"
          align="left"
          eyebrow="Why ExampleCraft"
          title="Not just another server."
          subtitle="A hand-built survival world with a fair economy, active staff and something happening every week."
        />

        {/* Asymmetric bento: one large tile, two stacked tiles */}
        <div className="grid gap-5 lg:grid-cols-5 lg:grid-rows-2">
          <Reveal className="lg:col-span-3 lg:row-span-2">
            <ImageTile feature={survival} large />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <BlockTile feature={economy} />
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-2">
            <ImageTile feature={events} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
