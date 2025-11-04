'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'admin' | 'gerente' | 'estoquista';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Verificar se há usuário salvo no localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('stocksync_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    }
    return null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de autenticação (substituir por chamada real à API)
    // Usuários de exemplo:
    const mockUsers: Record<string, User & { password: string }> = {
      'admin@stocksync.com': { 
        id: '1', 
        name: 'Administrador', 
        email: 'admin@stocksync.com', 
        role: 'admin',
        password: 'admin123'
      },
      'gerente@stocksync.com': { 
        id: '2', 
        name: 'Gerente', 
        email: 'gerente@stocksync.com', 
        role: 'gerente',
        password: 'gerente123'
      },
      'estoquista@stocksync.com': { 
        id: '3', 
        name: 'Estoquista', 
        email: 'estoquista@stocksync.com', 
        role: 'estoquista',
        password: 'estoquista123'
      }
    };

    const foundUser = mockUsers[email];
    
    if (foundUser && foundUser.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('stocksync_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stocksync_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
