'use client';

import { createContext, useContext } from 'react';
import type { UserDTO, UserRole } from '@/lib/types/auth.types';

interface AuthContextType {
  user: UserDTO | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: UserDTO | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const isAuthenticated = initialUser !== null;
  const role = initialUser?.role ?? null;
  const isAdmin = role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user: initialUser, isAuthenticated, role, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
