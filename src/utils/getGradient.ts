import GRADIENTS from '@/constants/style';
import type { UUID } from 'crypto';

function hashUUID(uuid: UUID): number {
  let hash = 0;

  for (let i = 0; i < uuid.length; i++) hash = (hash * 31 + uuid.charCodeAt(i)) | 0;

  return Math.abs(hash);
}

function getGradient(uuid: UUID) { return GRADIENTS[hashUUID(uuid) % GRADIENTS.length]; }

export default getGradient;