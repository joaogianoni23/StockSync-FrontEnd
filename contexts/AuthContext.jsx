'use client';

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Verificar se há usuário salvo no localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('stocksync_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    }
    return null;
  });

  const login = async (email, password) => {
    // Simulação de autenticação (substituir por chamada real à API)
    // Usuários de exemplo:
    const mockUsers = {
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

