import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { useSound } from '../../hooks/useSound';

export default function SoundToggle({ className = '' }) {
  const { enabled, toggle } = useSound();
  const Icon = enabled ? SpeakerHigh : SpeakerSlash;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Turn UI sounds off' : 'Turn UI sounds on'}
      title={enabled ? 'Sound on' : 'Sound off'}
      className={
        'grid h-10 w-10 place-items-center border-[3px] transition-colors active:translate-y-0.5 ' +
        (enabled
          ? 'border-grass/70 bg-grass/10 text-grass'
          : 'border-edge bg-panel text-stone hover:border-sky/60 hover:text-sky') +
        ` ${className}`
      }
    >
      <Icon className="h-4 w-4" weight="bold" aria-hidden="true" />
    </button>
  );
}
