'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/Loading';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return; // Aguardar o carregamento do estado de autenticação
    
    if (isAuthenticated && user) {
      // Redirecionar baseado no tipo de usuário
      if (user.role === 'estoquista') {
        router.push('/entrada');
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, user, router, isLoading]);

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background)'
      }}
    >
      <h1 
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'var(--primary)',
          marginBottom: '32px'
        }}
      >
        StockSync
      </h1>
      <Loading text="Redirecionando..." />
    </div>
  );
}

