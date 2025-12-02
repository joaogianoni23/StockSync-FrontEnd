'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Alert } from '@/components/Alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Email ou senha incorretos');
      }
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'var(--background)'
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'var(--primary)',
              marginBottom: '8px'
            }}
          >
            StockSync
          </h1>
          <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>
            Sistema de Gestão de Estoque
          </p>
        </div>

        <Card>
          <h2 
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '24px',
              textAlign: 'center',
              color: 'var(--primary)'
            }}
          >
            Entrar no Sistema
          </h2>

          {error && (
            <Alert type="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', marginTop: '8px' }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div 
            style={{
              marginTop: '24px',
              padding: '16px',
              background: 'var(--alert-bg)',
              borderRadius: '8px',
              fontSize: '12px',
              color: 'var(--foreground)'
            }}
          >
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Usuários de teste:</p>
            <p>👤 Admin: admin@stocksync.com / 123456</p>
            <p>👤 Estoquista: maria.estoquista@stocksync.com / 123456</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

