'use client';

import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Alert } from '@/components/Alert';
import { Loading } from '@/components/Loading';
import { stockMovementsAPI, productsAPI } from '@/services/api';

export default function SaidaPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    produtoId: '',
    quantidade: '',
    observacoes: ''
  });

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      setProdutos(data);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setErrorMessage(err.message || 'Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const produtosOptions = [
    { value: '', label: 'Selecione um produto' },
    ...produtos.map(p => ({ 
      value: p.id, 
      label: `${p.name} - Estoque atual: ${p.stock}` 
    }))
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validações
    if (!formData.produtoId) {
      setErrorMessage('Por favor, selecione um produto');
      return;
    }

    const quantidade = parseInt(formData.quantidade);
    if (quantidade <= 0 || isNaN(quantidade)) {
      setErrorMessage('A quantidade deve ser maior que zero');
      return;
    }

    // Verificar se há estoque suficiente
    const produto = produtos.find(p => p.id === parseInt(formData.produtoId));
    if (produto && quantidade > produto.stock) {
      setErrorMessage(`❌ Estoque insuficiente! Disponível: ${produto.stock} unidade(s)`);
      return;
    }

    setSubmitting(true);

    try {
      const movementData = {
        tipo: 'saida',
        quantidade: quantidade,
        produtoId: parseInt(formData.produtoId)
      };

      await stockMovementsAPI.create(movementData);

      setSuccessMessage(
        `✅ Saída registrada com sucesso! ${quantidade} unidade(s) de "${produto.name}" removidas do estoque.`
      );

      // Limpar formulário
      setFormData({
        produtoId: '',
        quantidade: '',
        observacoes: ''
      });

      // Recarregar produtos para atualizar estoque
      await loadProdutos();

      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Erro ao registrar saída:', err);
      setErrorMessage(err.message || 'Erro ao registrar saída');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      produtoId: '',
      quantidade: '',
      observacoes: ''
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const selectedProduct = produtos.find(p => p.id === parseInt(formData.produtoId));

  if (loading) {
    return (
      <AuthLayout requiredRoles={['estoquista', 'admin']}>
        <Loading />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout requiredRoles={['estoquista', 'admin']}>
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
              ℹ️ <strong>Importante:</strong> Use este formulário para registrar saídas de produtos do estoque.
              O estoque do produto será atualizado automaticamente.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Select
              label="Produto"
              options={produtosOptions}
              value={formData.produtoId}
              onChange={(e) => setFormData({ ...formData, produtoId: e.target.value })}
              required
              disabled={submitting}
            />

            {selectedProduct && (
              <div style={{ 
                marginBottom: '16px', 
                padding: '12px', 
                background: selectedProduct.stock < selectedProduct.estoqueMinimo ? '#fef3c7' : '#dcfce7',
                borderRadius: '8px',
                border: `1px solid ${selectedProduct.stock < selectedProduct.estoqueMinimo ? '#f59e0b' : '#10b981'}`
              }}>
                <p style={{ fontSize: '14px', color: '#000', margin: 0 }}>
                  📦 <strong>Estoque disponível:</strong> {selectedProduct.stock} unidade(s)
                  {selectedProduct.stock < selectedProduct.estoqueMinimo && (
                    <span style={{ color: '#f59e0b', marginLeft: '8px' }}>
                      ⚠️ Abaixo do mínimo ({selectedProduct.estoqueMinimo})
                    </span>
                  )}
                </p>
              </div>
            )}

            <Input
              label="Quantidade"
              type="number"
              min="1"
              max={selectedProduct?.stock || undefined}
              value={formData.quantidade}
              onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
              required
              disabled={submitting}
              placeholder="Digite a quantidade"
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
                placeholder="Adicione informações adicionais sobre esta saída (número do pedido, cliente, motivo, etc.)"
                disabled={submitting}
                style={{ resize: 'vertical', minHeight: '100px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button type="submit" style={{ flex: 1 }} disabled={submitting}>
                {submitting ? 'Registrando...' : '✅ Registrar Saída'}
              </Button>
              <Button type="button" variant="secondary" onClick={handleReset} style={{ flex: 1 }} disabled={submitting}>
                🔄 Limpar Formulário
              </Button>
            </div>
          </form>
        </Card>

        {/* Card de Ajuda */}
        <Card title="💡 Dicas" style={{ marginTop: '24px' }}>
          <ul style={{ paddingLeft: '20px', color: 'var(--foreground)', lineHeight: '1.8' }}>
            <li><strong>Estoque Automático:</strong> O estoque do produto será atualizado automaticamente após o registro</li>
            <li><strong>Validação:</strong> O sistema não permite saídas maiores que o estoque disponível</li>
            <li><strong>Vendas:</strong> Use para registrar produtos vendidos a clientes</li>
            <li><strong>Perdas:</strong> Use também para registrar produtos danificados, vencidos ou extraviados</li>
            <li><strong>Observações:</strong> Adicione informações como número do pedido, nome do cliente, motivo da perda, etc.</li>
          </ul>
        </Card>
      </div>
    </AuthLayout>
  );
}
