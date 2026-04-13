export type UserRole = 'USER' | 'ADMIN';

// API Request DTOs
export interface RegisterRequestDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestDTO {
  usernameOrEmail: string;
  password: string;
}

// API Response DTOs
export interface AuthenticationResponseDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
  user: UserProfileDTO;
}

export interface UserProfileDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDTO extends UserProfileDTO {
  role: UserRole;
}
