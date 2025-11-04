'use client';

import React, { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table } from '@/components/Table';

interface Movimentacao {
  id: number;
  tipo: 'entrada' | 'saida';
  produto: string;
  quantidade: number;
  motivo: string;
  usuario: string;
  data: string;
}

export default function HistoricoPage() {
  const [movimentacoes] = useState<Movimentacao[]>([
    {
      id: 1,
      tipo: 'entrada',
      produto: 'Notebook Dell Inspiron',
      quantidade: 10,
      motivo: 'Compra',
      usuario: 'João Silva',
      data: '2025-11-01 14:30'
    },
    {
      id: 2,
      tipo: 'saida',
      produto: 'Mouse Logitech MX Master',
      quantidade: 5,
      motivo: 'Venda',
      usuario: 'Maria Santos',
      data: '2025-11-02 09:15'
    },
    {
      id: 3,
      tipo: 'entrada',
      produto: 'Teclado Mecânico RGB',
      quantidade: 15,
      motivo: 'Devolução',
      usuario: 'Pedro Costa',
      data: '2025-11-02 16:45'
    },
    {
      id: 4,
      tipo: 'saida',
      produto: 'Monitor LG 27"',
      quantidade: 3,
      motivo: 'Perda',
      usuario: 'Ana Paula',
      data: '2025-11-03 11:20'
    },
    {
      id: 5,
      tipo: 'entrada',
      produto: 'Cadeira Ergonômica',
      quantidade: 20,
      motivo: 'Compra',
      usuario: 'Carlos Mendes',
      data: '2025-11-03 15:00'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('');

  const tipoOptions = [
    { value: '', label: 'Todos os tipos' },
    { value: 'entrada', label: 'Entradas' },
    { value: 'saida', label: 'Saídas' },
  ];

  const filteredMovimentacoes = movimentacoes.filter(m => {
    const matchSearch = m.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       m.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       m.motivo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTipo = !filterTipo || m.tipo === filterTipo;
    return matchSearch && matchTipo;
  });

  const tableData = filteredMovimentacoes.map(m => [
    <span key={m.id} style={{ 
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      background: m.tipo === 'entrada' ? '#d4edda' : '#f8d7da',
      color: m.tipo === 'entrada' ? '#155724' : '#721c24'
    }}>
      {m.tipo === 'entrada' ? '📥 ENTRADA' : '📤 SAÍDA'}
    </span>,
    m.produto,
    m.quantidade,
    m.motivo,
    m.usuario,
    m.data
  ]);

  // Calcular estatísticas
  const totalEntradas = movimentacoes
    .filter(m => m.tipo === 'entrada')
    .reduce((sum, m) => sum + m.quantidade, 0);
  
  const totalSaidas = movimentacoes
    .filter(m => m.tipo === 'saida')
    .reduce((sum, m) => sum + m.quantidade, 0);

  return (
    <AuthLayout requiredRoles={['admin', 'gerente']}>
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '24px' }}>
          Histórico de Movimentações
        </h1>

        {/* Cards de Estatísticas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '24px'
          }}
        >
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: '#28a745',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}
              >
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
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: '#dc3545',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}
              >
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
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}
              >
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

        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <Input
              type="text"
              placeholder="Buscar por produto, usuário ou motivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              options={tipoOptions}
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
            />
          </div>

          <Table
            headers={['Tipo', 'Produto', 'Quantidade', 'Motivo', 'Usuário', 'Data']}
            data={tableData}
          />
        </Card>
      </div>
    </AuthLayout>
  );
}
