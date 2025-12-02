'use client';

import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Alert } from '@/components/Alert';
import { Loading } from '@/components/Loading';
import { dashboardAPI } from '@/services/api';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await dashboardAPI.getData();
      setDashboardData(data);
    } catch (err) {
      console.error('Erro ao carregar dashboard:', err);
      setError(err.message || 'Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AuthLayout requiredRoles={['admin', 'estoquista']}>
        <Loading />
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout requiredRoles={['admin', 'estoquista']}>
        <Alert type="error">{error}</Alert>
      </AuthLayout>
    );
  }

  const { resumo, alertas } = dashboardData || {};

  return (
    <AuthLayout requiredRoles={['admin', 'estoquista']}>
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
              R$ {(resumo?.valorTotalEstoque || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </Card>

          <Card>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Total de Produtos
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)' }}>
              {resumo?.totalProdutos || 0}
            </p>
          </Card>

          <Card>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Total de Fornecedores
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)' }}>
              {resumo?.totalFornecedores || 0}
            </p>
          </Card>

          <Card>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Movimentações (Entrada)
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
              {resumo?.totalEntradas || 0}
            </p>
          </Card>

          <Card>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Movimentações (Saída)
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>
              {resumo?.totalSaidas || 0}
            </p>
          </Card>

          <Card>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
              Produtos com Estoque Baixo
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc2626' }}>
              {alertas?.length || 0}
            </p>
          </Card>
        </div>

        {/* Alertas de Estoque Baixo */}
        <Card>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--primary)' }}>
            ⚠️ Alertas de Estoque Baixo
          </h2>
          {alertas && alertas.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {alertas.map(alerta => (
                <Alert key={alerta.id} type="warning">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{alerta.name}</strong>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px', marginLeft: '8px' }}>
                        ({alerta.category})
                      </span>
                      <br />
                      <span style={{ fontSize: '14px' }}>
                        Estoque atual: <strong>{alerta.estoqueAtual}</strong> | 
                        Mínimo: <strong>{alerta.estoqueMinimo}</strong>
                      </span>
                      {alerta.fornecedor && (
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                          | Fornecedor: {alerta.fornecedor.nome}
                        </span>
                      )}
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          ) : (
            <Alert type="success">
              ✅ Todos os produtos estão com estoque adequado!
            </Alert>
          )}
        </Card>
      </div>
    </AuthLayout>
  );
}
