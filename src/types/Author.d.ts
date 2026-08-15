import { type UUID } from 'crypto';

type Author = {
  id: UUID;
  name: string;
  biography: string;
};

export default Author;