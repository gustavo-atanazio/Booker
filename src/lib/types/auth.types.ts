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
  tokenType: string;
  expiresIn: number; // seconds
  user: UserDTO;
}

export interface UserDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}
