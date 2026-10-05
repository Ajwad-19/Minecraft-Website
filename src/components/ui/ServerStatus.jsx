import { Users } from 'lucide-react';
import { SERVER } from '../../data/site';

export function StatusDot({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 shrink-0 animate-pulse-dot bg-grass shadow-[0_0_10px_#55FF55] ${className}`}
    />
  );
}

/** "SERVER ONLINE ● 247 Players Online" badge. */
export default function ServerStatus({ className = '' }) {
  return (
    <div
      role="status"
      className={
        'inline-flex flex-wrap items-center gap-x-4 gap-y-2 border-2 border-grass/40 bg-void/70 px-4 py-2.5 ' +
        `shadow-[0_0_24px_-6px_rgba(85,255,85,0.45)] backdrop-blur-sm ${className}`
      }
    >
      <span className="flex items-center gap-2.5 font-pixel text-[10px] text-grass">
        <StatusDot />
        SERVER ONLINE
      </span>
      <span aria-hidden="true" className="hidden h-4 w-0.5 bg-edge sm:block" />
      <span className="flex items-center gap-2 text-sm text-snow">
        <Users className="h-4 w-4 text-sky" aria-hidden="true" />
        <strong className="font-semibold">{SERVER.playersOnline}</strong>
        <span className="text-stone">Players Online</span>
      </span>
    </div>
  );
}
