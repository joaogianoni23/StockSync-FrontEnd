'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';

export const AuthLayout = ({ children, requiredRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Aguardar o carregamento do estado de autenticação
    
    if (!isAuthenticated) {
      router.push('/login');
    } else if (requiredRoles && user && !requiredRoles.includes(user.role)) {
      // Se o usuário não tem permissão, redirecionar
      if (user.role === 'estoquista') {
        router.push('/entrada');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router, requiredRoles, isLoading]);

  if (isLoading || !isAuthenticated || (requiredRoles && user && !requiredRoles.includes(user.role))) {
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main
        style={{
          marginLeft: '260px',
          flex: 1,
          minHeight: '100vh',
          background: 'var(--background)',
          padding: '32px'
        }}
      >
        {children}
      </main>
    </div>
  );
};

