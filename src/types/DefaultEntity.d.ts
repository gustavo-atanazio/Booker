import type { UUID } from 'crypto';

type DefaultEntity = {
  id: UUID;
  createdAt: string;
  updatedAt: string;
};

export default DefaultEntity;