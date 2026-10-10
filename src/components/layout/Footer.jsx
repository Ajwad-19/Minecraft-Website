import { ArrowUp, DiscordLogo, TiktokLogo, YoutubeLogo } from '@phosphor-icons/react';
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
  { label: 'Discord', href: SOCIAL.discord, icon: DiscordLogo },
  { label: 'YouTube', href: SOCIAL.youtube, icon: YoutubeLogo },
  { label: 'TikTok', href: SOCIAL.tiktok, icon: TiktokLogo },
];

export default function Footer() {
  return (
    <footer className="block-texture relative mt-8 bg-[#060809]">
      <GrassEdge />

      <div className="container-mc grid gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_0.8fr_1.1fr] md:gap-10">
        {/* Brand + community */}
        <div className="flex flex-col items-start gap-6">
          <Logo size="lg" />
          <p className="max-w-xs text-sm leading-relaxed text-stone">
            A community survival server where every block tells a story. Build, explore and survive together.
          </p>
          <nav aria-label="Community">
            <ul className="flex flex-wrap gap-2">
              {COMMUNITY_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 border-[3px] border-edge bg-panel px-3 text-sm text-snow transition-colors hover:border-sky hover:text-sky"
                  >
                    <Icon size={18} weight="bold" aria-hidden="true" />
                    {label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h2 className="mb-4 font-display text-xl font-bold text-snow">Quick links</h2>
          <ul className="flex flex-col gap-1">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={l.modal ? () => openModal(l.modal) : undefined}
                  className="group inline-flex items-center gap-2 py-1.5 text-stone transition-colors hover:text-grass"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-edge transition-colors group-hover:bg-grass" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Server status */}
        <div>
          <h2 className="mb-4 font-display text-xl font-bold text-snow">Server status</h2>
          <div className="pixel-panel flex flex-col gap-4 bg-void/80 p-5">
            <p className="flex items-center gap-2.5 font-pixel text-[10px] text-grass">
              <StatusDot />
              ONLINE
            </p>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.16em] text-stone">Server IP</span>
              <code className="break-all font-display text-lg font-bold text-snow">{SERVER.ip}</code>
            </div>
            <CopyIpButton size="sm" className="w-full" />
          </div>
        </div>
      </div>

      <div className="border-t-4 border-edge/60">
        <div className="container-mc flex flex-col gap-4 px-4 py-6 text-xs text-stone sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-snow/80">© 2026 ExampleCraft. All rights reserved.</p>
            <p>Not an official Minecraft product. Not approved by or associated with Mojang Studios or Microsoft.</p>
          </div>
          <a
            href="#home"
            className="inline-flex min-h-[44px] w-fit items-center gap-2 border-[3px] border-edge bg-panel px-3 font-pixel text-[9px] text-snow transition-colors hover:border-grass hover:text-grass active:translate-y-0.5"
          >
            <ArrowUp size={14} weight="bold" aria-hidden="true" />
            BACK TO TOP
          </a>
        </div>
      </div>
    </footer>
  );
}
