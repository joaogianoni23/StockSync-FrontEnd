'use client';

import React, { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Alert } from '@/components/Alert';

export default function SaidaPage() {
  const [formData, setFormData] = useState({
    produto: '',
    quantidade: 0,
    motivo: '',
    observacoes: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const produtosOptions = [
    { value: '', label: 'Selecione um produto' },
    { value: 'Notebook Dell Inspiron', label: 'Notebook Dell Inspiron' },
    { value: 'Mouse Logitech MX Master', label: 'Mouse Logitech MX Master' },
    { value: 'Teclado Mecânico RGB', label: 'Teclado Mecânico RGB' },
    { value: 'Monitor LG 27"', label: 'Monitor LG 27"' },
    { value: 'Cadeira Ergonômica', label: 'Cadeira Ergonômica' },
  ];

  const motivoOptions = [
    { value: '', label: 'Selecione o motivo' },
    { value: 'Venda', label: 'Venda' },
    { value: 'Perda', label: 'Perda' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validações
    if (!formData.produto) {
      setErrorMessage('Por favor, selecione um produto');
      return;
    }

    if (formData.quantidade <= 0) {
      setErrorMessage('A quantidade deve ser maior que zero');
      return;
    }

    if (!formData.motivo) {
      setErrorMessage('Por favor, selecione o motivo da saída');
      return;
    }

    // Simular registro (em produção, enviaria para API)
    console.log('Saída registrada:', formData);
    
    setSuccessMessage(`Saída registrada com sucesso! ${formData.quantidade} unidade(s) de ${formData.produto} removidas do estoque.`);
    
    // Limpar formulário
    setFormData({
      produto: '',
      quantidade: 0,
      motivo: '',
      observacoes: ''
    });

    // Limpar mensagem de sucesso após 5 segundos
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleReset = () => {
    setFormData({
      produto: '',
      quantidade: 0,
      motivo: '',
      observacoes: ''
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <AuthLayout requiredRoles={['estoquista', 'admin', 'gerente']}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '24px' }}>
          📤 Registrar Saída de Estoque
        </h1>

        {successMessage && (
          <Alert type="success" className="mb-4">
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert type="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}

        <Card>
          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--alert-bg)', borderRadius: '8px' }}>
            <p style={{ fontSize: '14px', color: 'var(--foreground)' }}>
              ℹ️ <strong>Importante:</strong> Use este formulário para registrar saídas de produtos do estoque, 
              seja por vendas realizadas ou perdas/danos de produtos.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Select
              label="Produto"
              options={produtosOptions}
              value={formData.produto}
              onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
              required
            />

            <Input
              label="Quantidade"
              type="number"
              min="1"
              value={formData.quantidade || ''}
              onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value) || 0 })}
              required
            />

            <Select
              label="Motivo da Saída"
              options={motivoOptions}
              value={formData.motivo}
              onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
              required
            />

            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Observações (Opcional)
              </label>
              <textarea
                className="input"
                rows={4}
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Adicione informações adicionais sobre esta saída..."
                style={{ resize: 'vertical', minHeight: '100px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button type="submit" style={{ flex: 1 }}>
                ✅ Registrar Saída
              </Button>
              <Button type="button" variant="secondary" onClick={handleReset} style={{ flex: 1 }}>
                🔄 Limpar Formulário
              </Button>
            </div>
          </form>
        </Card>

        {/* Card de Ajuda */}
        <Card title="💡 Dicas" className="mt-6">
          <ul style={{ paddingLeft: '20px', color: 'var(--foreground)', lineHeight: '1.8' }}>
            <li><strong>Venda:</strong> Use quando produtos forem vendidos a clientes</li>
            <li><strong>Perda:</strong> Use para produtos danificados, vencidos ou extraviados</li>
            <li><strong>Observações:</strong> Adicione informações como número do pedido, cliente, motivo da perda, etc.</li>
          </ul>
        </Card>
      </div>
    </AuthLayout>
  );
}
