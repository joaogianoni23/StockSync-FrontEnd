'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './Button';

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  const isAdmin = user.role === 'admin' || user.role === 'gerente';
  const isEstoquista = user.role === 'estoquista';

  const menuItems = [
    ...(isAdmin ? [
      { href: '/dashboard', label: 'Dashboard', icon: '📊' },
      { href: '/produtos', label: 'Produtos', icon: '📦' },
      { href: '/fornecedores', label: 'Fornecedores', icon: '🏭' },
      { href: '/historico', label: 'Histórico', icon: '📋' },
    ] : []),
    ...(isEstoquista ? [
      { href: '/entrada', label: 'Registrar Entrada', icon: '📥' },
      { href: '/saida', label: 'Registrar Saída', icon: '📤' },
    ] : []),
  ];

  return (
    <aside
      style={{
        width: '260px',
        height: '100vh',
        background: 'var(--card-bg)',
        borderRight: '2px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px',
          borderBottom: '2px solid var(--border)',
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'var(--primary)',
            marginBottom: '4px'
          }}
        >
          StockSync
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--foreground)', opacity: 0.7 }}>
          {user.name}
        </p>
        <span
          style={{
            display: 'inline-block',
            marginTop: '8px',
            padding: '4px 12px',
            background: 'var(--primary)',
            color: 'var(--neutral-light)',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}
        >
          {user.role}
        </span>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                marginBottom: '8px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive ? 'var(--neutral-light)' : 'var(--foreground)',
                background: isActive ? 'var(--primary)' : 'transparent',
                fontWeight: isActive ? '600' : '400',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--alert-bg)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px', borderTop: '2px solid var(--border)' }}>
        <button
          onClick={toggleTheme}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '8px',
            background: 'var(--alert-bg)',
            border: '2px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--foreground)',
            cursor: 'pointer',
            fontFamily: 'Arimo, sans-serif',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'} 
          {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
        </button>
        <Button variant="danger" onClick={handleLogout} style={{ width: '100%' }}>
          🚪 Sair
        </Button>
      </div>
    </aside>
  );
};

