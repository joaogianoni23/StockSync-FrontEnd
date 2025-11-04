'use client';

import React, { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table } from '@/components/Table';
import { Modal } from '@/components/Modal';
import { Alert } from '@/components/Alert';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Notebook Dell Inspiron', categoria: 'Informática', quantidade: 15, preco: 3500.00, estoqueMinimo: 10, fornecedor: 'Dell Brasil' },
    { id: 2, nome: 'Mouse Logitech MX Master', categoria: 'Periféricos', quantidade: 45, preco: 450.00, estoqueMinimo: 15, fornecedor: 'Logitech' },
    { id: 3, nome: 'Teclado Mecânico RGB', categoria: 'Periféricos', quantidade: 32, preco: 600.00, estoqueMinimo: 20, fornecedor: 'HyperX' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    quantidade: 0,
    preco: 0,
    estoqueMinimo: 0,
    fornecedor: ''
  });

  const categorias = [
    { value: '', label: 'Selecione uma categoria' },
    { value: 'Informática', label: 'Informática' },
    { value: 'Periféricos', label: 'Periféricos' },
    { value: 'Móveis', label: 'Móveis' },
    { value: 'Material de Escritório', label: 'Material de Escritório' },
  ];

  const handleOpenModal = (produto) => {
    if (produto) {
      setEditingProduto(produto);
      setFormData({
        nome: produto.nome,
        categoria: produto.categoria,
        quantidade: produto.quantidade,
        preco: produto.preco,
        estoqueMinimo: produto.estoqueMinimo,
        fornecedor: produto.fornecedor
      });
    } else {
      setEditingProduto(null);
      setFormData({
        nome: '',
        categoria: '',
        quantidade: 0,
        preco: 0,
        estoqueMinimo: 0,
        fornecedor: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduto(null);
    setFormData({
      nome: '',
      categoria: '',
      quantidade: 0,
      preco: 0,
      estoqueMinimo: 0,
      fornecedor: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduto) {
      // Editar produto existente
      setProdutos(produtos.map(p => 
        p.id === editingProduto.id 
          ? { ...editingProduto, ...formData }
          : p
      ));
      setSuccessMessage('Produto atualizado com sucesso!');
    } else {
      // Adicionar novo produto
      const novoProduto = {
        id: Math.max(...produtos.map(p => p.id), 0) + 1,
        ...formData
      };
      setProdutos([...produtos, novoProduto]);
      setSuccessMessage('Produto cadastrado com sucesso!');
    }
    
    handleCloseModal();
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
      setSuccessMessage('Produto excluído com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const filteredProdutos = produtos.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableData = filteredProdutos.map(p => [
    p.nome,
    p.categoria,
    p.quantidade,
    `R$ ${p.preco.toFixed(2)}`,
    p.estoqueMinimo,
    p.fornecedor
  ]);

  return (
    <AuthLayout requiredRoles={['admin', 'gerente']}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>
            Gestão de Produtos
          </h1>
          <Button onClick={() => handleOpenModal()}>
            ➕ Novo Produto
          </Button>
        </div>

        {successMessage && (
          <Alert type="success" className="mb-4">
            {successMessage}
          </Alert>
        )}

        <Card>
          <div style={{ marginBottom: '20px' }}>
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table
            headers={['Nome', 'Categoria', 'Quantidade', 'Preço', 'Estoque Mínimo', 'Fornecedor']}
            data={tableData}
            actions={(row, index) => (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(filteredProdutos[index])}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  ✏️ Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(filteredProdutos[index].id)}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  🗑️ Excluir
                </Button>
              </div>
            )}
          />
        </Card>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingProduto ? 'Editar Produto' : 'Novo Produto'}
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome do Produto"
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />

            <Select
              label="Categoria"
              options={categorias}
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              required
            />

            <Input
              label="Quantidade"
              type="number"
              value={formData.quantidade}
              onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value) || 0 })}
              required
            />

            <Input
              label="Preço (R$)"
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) || 0 })}
              required
            />

            <Input
              label="Estoque Mínimo"
              type="number"
              value={formData.estoqueMinimo}
              onChange={(e) => setFormData({ ...formData, estoqueMinimo: parseInt(e.target.value) || 0 })}
              required
            />

            <Input
              label="Fornecedor"
              type="text"
              value={formData.fornecedor}
              onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
              required
            />

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button type="submit" style={{ flex: 1 }}>
                {editingProduto ? 'Atualizar' : 'Cadastrar'}
              </Button>
              <Button type="button" variant="secondary" onClick={handleCloseModal} style={{ flex: 1 }}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AuthLayout>
  );
}

