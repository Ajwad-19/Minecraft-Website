import { useSyncExternalStore } from 'react';
import { isSoundEnabled, playSound, setSoundEnabled, subscribeSound } from '../utils/sound';

export function useSound() {
  const enabled = useSyncExternalStore(subscribeSound, isSoundEnabled, () => false);
  return {
    enabled,
    play: playSound,
    toggle: () => setSoundEnabled(!enabled),
  };
}
