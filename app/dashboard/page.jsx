'use client';

import React from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Alert } from '@/components/Alert';

export default function DashboardPage() {
  const totalEstoque = 127500.50;
  const totalProdutos = 234;
  const produtosEstoqueBaixo = 12;
  const alertasEstoqueBaixo = [
    { id: 1, produto: 'Notebook Dell Inspiron', estoque: 3, minimo: 10 },
    { id: 2, produto: 'Mouse Logitech MX Master', estoque: 5, minimo: 15 },
  ];

  return (
    <AuthLayout requiredRoles={['admin', 'gerente']}>
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '24px' }}>
          Dashboard
        </h1>

        {/* Cards de Estatísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <Card>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Valor Total em Estoque
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)' }}>
              R$ {totalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </Card>

          <Card>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Total de Produtos
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)' }}>
              {totalProdutos}
            </p>
          </Card>

          <Card>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Produtos com Estoque Baixo
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc2626' }}>
              {produtosEstoqueBaixo}
            </p>
          </Card>
        </div>

        {/* Alertas de Estoque Baixo */}
        <Card>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--primary)' }}>
            Alertas de Estoque Baixo
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {alertasEstoqueBaixo.map(alerta => (
              <Alert key={alerta.id} type="warning">
                <strong>{alerta.produto}</strong> - Estoque atual: {alerta.estoque} unidades 
                (Mínimo: {alerta.minimo})
              </Alert>
            ))}
          </div>
        </Card>
      </div>
    </AuthLayout>
  );
}
