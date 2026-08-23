import type DefaultEntity from '@/types/DefaultEntity';

type User = DefaultEntity & {
  name: string;
  username: string;
  email: string;
  bio: string;
};

export default User;