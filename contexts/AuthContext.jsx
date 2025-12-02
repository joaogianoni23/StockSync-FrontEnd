'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar usuário do localStorage após a montagem do componente
    const savedUser = localStorage.getItem('stocksync_user');
    const savedToken = localStorage.getItem('stocksync_token');
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('stocksync_user');
        localStorage.removeItem('stocksync_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Chamada real à API
      const data = await authAPI.login(email, password);
      
      if (data.user && data.token) {
        setUser(data.user);
        return { success: true, user: data.user };
      }
      
      return { success: false, error: 'Credenciais inválidas' };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: error.message || 'Erro ao fazer login' };
    }
  };

  const logout = () => {
    setUser(null);
    authAPI.logout();
    
    // Redirecionar para login após logout
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
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

