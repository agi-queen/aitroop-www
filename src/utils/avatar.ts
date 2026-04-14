import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';

export function generateAvatar(seed: string, size = 40): string {
  return createAvatar(openPeeps, {
    seed,
    size,
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
    backgroundType: ['solid'],
  }).toString();
}
