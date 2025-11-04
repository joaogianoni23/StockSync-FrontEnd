'use client';

import React, { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Table } from '@/components/Table';
import { Modal } from '@/components/Modal';
import { Alert } from '@/components/Alert';

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string;
  email: string;
  telefone: string;
  endereco: string;
}

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([
    { 
      id: 1, 
      nome: 'Dell Brasil', 
      cnpj: '12.345.678/0001-90', 
      contato: 'João Silva',
      email: 'contato@dell.com.br',
      telefone: '(11) 3333-4444',
      endereco: 'Av. Paulista, 1000 - São Paulo, SP'
    },
    { 
      id: 2, 
      nome: 'Logitech', 
      cnpj: '98.765.432/0001-10', 
      contato: 'Maria Santos',
      email: 'vendas@logitech.com.br',
      telefone: '(11) 5555-6666',
      endereco: 'Rua dos Periféricos, 500 - São Paulo, SP'
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    contato: '',
    email: '',
    telefone: '',
    endereco: ''
  });

  const handleOpenModal = (fornecedor?: Fornecedor) => {
    if (fornecedor) {
      setEditingFornecedor(fornecedor);
      setFormData({
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj,
        contato: fornecedor.contato,
        email: fornecedor.email,
        telefone: fornecedor.telefone,
        endereco: fornecedor.endereco
      });
    } else {
      setEditingFornecedor(null);
      setFormData({
        nome: '',
        cnpj: '',
        contato: '',
        email: '',
        telefone: '',
        endereco: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFornecedor(null);
    setFormData({
      nome: '',
      cnpj: '',
      contato: '',
      email: '',
      telefone: '',
      endereco: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFornecedor) {
      // Editar fornecedor existente
      setFornecedores(fornecedores.map(f => 
        f.id === editingFornecedor.id 
          ? { ...editingFornecedor, ...formData }
          : f
      ));
      setSuccessMessage('Fornecedor atualizado com sucesso!');
    } else {
      // Adicionar novo fornecedor
      const novoFornecedor: Fornecedor = {
        id: Math.max(...fornecedores.map(f => f.id), 0) + 1,
        ...formData
      };
      setFornecedores([...fornecedores, novoFornecedor]);
      setSuccessMessage('Fornecedor cadastrado com sucesso!');
    }
    
    handleCloseModal();
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      setFornecedores(fornecedores.filter(f => f.id !== id));
      setSuccessMessage('Fornecedor excluído com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const filteredFornecedores = fornecedores.filter(f =>
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cnpj.includes(searchTerm) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableData = filteredFornecedores.map(f => [
    f.nome,
    f.cnpj,
    f.contato,
    f.email,
    f.telefone
  ]);

  return (
    <AuthLayout requiredRoles={['admin', 'gerente']}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)' }}>
            Gestão de Fornecedores
          </h1>
          <Button onClick={() => handleOpenModal()}>
            ➕ Novo Fornecedor
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
              placeholder="Buscar fornecedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table
            headers={['Nome', 'CNPJ', 'Contato', 'Email', 'Telefone']}
            data={tableData}
            actions={(row, index) => (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(filteredFornecedores[index])}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  ✏️ Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(filteredFornecedores[index].id)}
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
          title={editingFornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
          maxWidth="700px"
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome do Fornecedor"
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />

            <Input
              label="CNPJ"
              type="text"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              placeholder="00.000.000/0000-00"
              required
            />

            <Input
              label="Nome do Contato"
              type="text"
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Telefone"
              type="text"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              placeholder="(00) 0000-0000"
              required
            />

            <Input
              label="Endereço"
              type="text"
              value={formData.endereco}
              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              required
            />

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button type="submit" style={{ flex: 1 }}>
                {editingFornecedor ? 'Atualizar' : 'Cadastrar'}
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
