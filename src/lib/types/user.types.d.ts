export type UserRoleOption = 'USER' | 'ADMIN';

export interface UserListItemDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  role: UserRoleOption;
  accountNonLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageUserDTO {
  content: UserListItemDTO[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface CreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  role: UserRoleOption;
  enabled: boolean;
  accountNonLocked: boolean;
}

export interface UpdateUserDTO {
  name?: string;
  username?: string;
  email?: string;
  bio?: string;
  role?: UserRoleOption;
  accountNonLocked?: boolean;
}

export interface UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
}
