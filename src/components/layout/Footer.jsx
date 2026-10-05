import { ArrowUp, MessageCircle, Music2, Youtube } from 'lucide-react';
import { SERVER, SOCIAL } from '../../data/site';
import { openModal } from '../../utils/events';
import CopyIpButton from '../ui/CopyIpButton';
import GrassEdge from '../ui/GrassEdge';
import Logo from '../ui/Logo';
import { StatusDot } from '../ui/ServerStatus';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Server', href: '#server' },
  { label: 'Rules', href: '#community', modal: 'rules' },
  { label: 'Community', href: '#community' },
  { label: 'Support', href: '#faq' },
];

const COMMUNITY_LINKS = [
  { label: 'Discord', href: SOCIAL.discord, icon: MessageCircle },
  { label: 'YouTube', href: SOCIAL.youtube, icon: Youtube },
  { label: 'TikTok', href: SOCIAL.tiktok, icon: Music2 },
];

function ColumnTitle({ children }) {
  return (
    <h2 className="mb-5 flex items-center gap-2 font-pixel text-[10px] uppercase tracking-widest text-snow">
      <span aria-hidden="true" className="h-2 w-2 bg-grass" />
      {children}
    </h2>
  );
}

const linkClass =
  'group inline-flex items-center gap-2 py-1 text-stone transition-colors hover:text-grass focus-visible:text-grass';

export default function Footer() {
  return (
    <footer className="block-texture relative mt-8 bg-[#060809]">
      <GrassEdge />

      <div className="container-mc grid gap-12 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10">
        <div className="flex flex-col items-start gap-5">
          <Logo size="lg" />
          <p className="max-w-xs text-sm text-stone">
            A community survival server where every block tells a story. Build, explore and survive together.
          </p>
        </div>

        <nav aria-label="Quick links">
          <ColumnTitle>Quick links</ColumnTitle>
          <ul className="flex flex-col gap-1.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={linkClass}
                  onClick={l.modal ? () => openModal(l.modal) : undefined}
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-edge transition-colors group-hover:bg-grass" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Community links">
          <ColumnTitle>Community</ColumnTitle>
          <ul className="flex flex-col gap-1.5">
            {COMMUNITY_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Icon className="h-4 w-4 text-sky" aria-hidden="true" />
                  {label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ColumnTitle>Server status</ColumnTitle>
          <div className="pixel-panel flex flex-col gap-4 bg-void/80 p-5">
            <p className="flex items-center gap-2.5 font-pixel text-[10px] text-grass">
              <StatusDot />
              ONLINE
            </p>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.18em] text-stone">Server IP</span>
              <code className="break-all font-pixel text-[11px] leading-relaxed text-snow">{SERVER.ip}</code>
            </div>
            <CopyIpButton size="sm" className="w-full" />
          </div>
        </div>
      </div>

      <div className="border-t-4 border-edge/60">
        <div className="container-mc flex flex-col gap-4 px-4 py-6 text-xs text-stone sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-snow/80">© 2026 ExampleCraft. All rights reserved.</p>
            <p>
              Not an official Minecraft product. Not approved by or associated with Mojang Studios or Microsoft.
            </p>
          </div>
          <a
            href="#home"
            className="inline-flex w-fit items-center gap-2 border-[3px] border-edge bg-panel px-3 py-2 font-pixel text-[9px] text-snow transition-colors hover:border-grass hover:text-grass active:translate-y-0.5"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            BACK TO TOP
          </a>
        </div>
      </div>
    </footer>
  );
}
