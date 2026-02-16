'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { UserDTO } from '@/lib/types/auth.types';

interface AuthContextType {
  user: UserDTO | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: UserDTO | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
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
