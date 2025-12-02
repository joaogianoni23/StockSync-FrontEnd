'use client';

import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table } from '@/components/Table';
import { Alert } from '@/components/Alert';
import { Loading } from '@/components/Loading';
import { stockMovementsAPI } from '@/services/api';

export default function HistoricoPage() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');

  useEffect(() => {
    loadMovimentacoes();
  }, []);

  const loadMovimentacoes = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await stockMovementsAPI.getAll();
      setMovimentacoes(data);
    } catch (err) {
      console.error('Erro ao carregar movimentações:', err);
      setErrorMessage(err.message || 'Erro ao carregar movimentações');
    } finally {
      setLoading(false);
    }
  };

  const filteredMovimentacoes = movimentacoes.filter(m => {
    const matchSearch = 
      m.produto?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.produto?.barcode?.includes(searchTerm) || false;
    const matchTipo = filterTipo === 'todos' || m.tipo === filterTipo;
    return matchSearch && matchTipo;
  });

  const tableData = filteredMovimentacoes.map(m => [
    <span 
      key={m.id} 
      style={{ 
        display: 'inline-block', 
        padding: '4px 12px', 
        borderRadius: '12px', 
        fontSize: '12px', 
        fontWeight: 'bold', 
        background: m.tipo === 'entrada' ? '#d4edda' : '#f8d7da', 
        color: m.tipo === 'entrada' ? '#155724' : '#721c24' 
      }}
    >
      {m.tipo === 'entrada' ? '📥 ENTRADA' : '📤 SAÍDA'}
    </span>,
    m.produto?.name || 'Produto não encontrado',
    m.produto?.barcode || 'N/A',
    m.quantidade,
    new Date(m.data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  ]);

  const totalEntradas = movimentacoes
    .filter(m => m.tipo === 'entrada')
    .reduce((sum, m) => sum + m.quantidade, 0);

  const totalSaidas = movimentacoes
    .filter(m => m.tipo === 'saida')
    .reduce((sum, m) => sum + m.quantidade, 0);

  if (loading) {
    return (
      <AuthLayout requiredRoles={['admin', 'estoquista']}>
        <Loading />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout requiredRoles={['admin', 'estoquista']}>
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '24px' }}>
          📋 Histórico de Movimentações
        </h1>

        {errorMessage && (
          <Alert type="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}

        {/* Cards de Resumo */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          marginBottom: '24px' 
        }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '10px', 
                background: '#28a745', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '24px' 
              }}>
                📥
              </div>
              <div>
                <p style={{ fontSize: '13px', color: 'var(--foreground)', opacity: 0.7, marginBottom: '4px' }}>
                  Total de Entradas
                </p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                  {totalEntradas}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '10px', 
                background: '#dc3545', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '24px' 
              }}>
                📤
              </div>
              <div>
                <p style={{ fontSize: '13px', color: 'var(--foreground)', opacity: 0.7, marginBottom: '4px' }}>
                  Total de Saídas
                </p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
                  {totalSaidas}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '10px', 
                background: 'var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '24px' 
              }}>
                📊
              </div>
              <div>
                <p style={{ fontSize: '13px', color: 'var(--foreground)', opacity: 0.7, marginBottom: '4px' }}>
                  Saldo Total
                </p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)' }}>
                  {totalEntradas - totalSaidas}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabela de Movimentações */}
        <Card>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr', 
            gap: '16px', 
            marginBottom: '20px' 
          }}>
            <Input 
              type="text" 
              placeholder="Buscar por produto ou código de barras..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <Select 
              value={filterTipo} 
              onChange={(e) => setFilterTipo(e.target.value)} 
              options={[
                { value: 'todos', label: 'Todos os Tipos' }, 
                { value: 'entrada', label: 'Somente Entradas' }, 
                { value: 'saida', label: 'Somente Saídas' }
              ]} 
            />
          </div>

          {movimentacoes.length === 0 ? (
            <Alert type="info">Nenhuma movimentação registrada ainda.</Alert>
          ) : filteredMovimentacoes.length === 0 ? (
            <Alert type="info">Nenhuma movimentação encontrada com os filtros aplicados.</Alert>
          ) : (
            <Table 
              headers={['Tipo', 'Produto', 'Código de Barras', 'Quantidade', 'Data/Hora']} 
              data={tableData} 
            />
          )}
        </Card>
      </div>
    </AuthLayout>
  );
}
