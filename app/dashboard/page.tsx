'use client';

import React from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Alert } from '@/components/Alert';

export default function DashboardPage() {
  // Dados simulados - em produção viriam da API
  const totalEstoque = 127500.50;
  const totalProdutos = 234;
  const produtosEstoqueBaixo = 12;

  const alertasEstoqueBaixo = [
    { id: 1, produto: 'Notebook Dell Inspiron', estoque: 3, minimo: 10 },
    { id: 2, produto: 'Mouse Logitech MX Master', estoque: 5, minimo: 15 },
    { id: 3, produto: 'Teclado Mecânico RGB', estoque: 2, minimo: 8 },
    { id: 4, produto: 'Monitor LG 27"', estoque: 4, minimo: 12 },
  ];

  return (
    <AuthLayout requiredRoles={['admin', 'gerente']}>
      <div>
        <h1 
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'var(--primary)',
            marginBottom: '24px'
          }}
        >
          Dashboard
        </h1>

        {/* Cards de Estatísticas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}
        >
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}
              >
                💰
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--foreground)', opacity: 0.7, marginBottom: '4px' }}>
                  Valor Total do Estoque
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)' }}>
                  R$ {totalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}
              >
                📦
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--foreground)', opacity: 0.7, marginBottom: '4px' }}>
                  Total de Produtos
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)' }}>
                  {totalProdutos}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: '#ffc107',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}
              >
                ⚠️
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--foreground)', opacity: 0.7, marginBottom: '4px' }}>
                  Estoque Baixo
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>
                  {produtosEstoqueBaixo}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Alertas de Estoque Baixo */}
        <Card title="⚠️ Alertas de Estoque Baixo">
          {alertasEstoqueBaixo.length === 0 ? (
            <Alert type="success">
              Todos os produtos estão com estoque adequado! 🎉
            </Alert>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {alertasEstoqueBaixo.map((alerta) => (
                <Alert key={alerta.id} type="warning">
                  <div style={{ flex: 1 }}>
                    <strong>{alerta.produto}</strong>
                    <div style={{ fontSize: '13px', marginTop: '4px' }}>
                      Estoque atual: <strong>{alerta.estoque}</strong> | 
                      Estoque mínimo: <strong>{alerta.minimo}</strong>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AuthLayout>
  );
}
