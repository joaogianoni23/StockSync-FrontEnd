'use client';

import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Table } from '@/components/Table';
import { Modal } from '@/components/Modal';
import { Alert } from '@/components/Alert';
import { Loading } from '@/components/Loading';
import { suppliersAPI } from '@/services/api';

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    contato: ''
  });

  useEffect(() => {
    loadFornecedores();
  }, []);

  const loadFornecedores = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await suppliersAPI.getAll();
      setFornecedores(data);
    } catch (err) {
      console.error('Erro ao carregar fornecedores:', err);
      setErrorMessage(err.message || 'Erro ao carregar fornecedores');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (fornecedor) => {
    if (fornecedor) {
      setEditingFornecedor(fornecedor);
      setFormData({
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj,
        contato: fornecedor.contato
      });
    } else {
      setEditingFornecedor(null);
      setFormData({
        nome: '',
        cnpj: '',
        contato: ''
      });
    }
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFornecedor(null);
    setFormData({
      nome: '',
      cnpj: '',
      contato: ''
    });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    
    try {
      if (editingFornecedor) {
        // Editar fornecedor existente
        await suppliersAPI.update(editingFornecedor.id, formData);
        setSuccessMessage('Fornecedor atualizado com sucesso!');
      } else {
        // Adicionar novo fornecedor
        await suppliersAPI.create(formData);
        setSuccessMessage('Fornecedor cadastrado com sucesso!');
      }
      
      // Recarregar lista
      await loadFornecedores();
      handleCloseModal();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Erro ao salvar fornecedor:', err);
      setErrorMessage(err.message || 'Erro ao salvar fornecedor');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este fornecedor? Esta ação também removerá todos os produtos associados.')) {
      return;
    }

    try {
      setErrorMessage('');
      await suppliersAPI.delete(id);
      setSuccessMessage('Fornecedor excluído com sucesso!');
      await loadFornecedores();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Erro ao excluir fornecedor:', err);
      setErrorMessage(err.message || 'Erro ao excluir fornecedor');
    }
  };

  const filteredFornecedores = fornecedores.filter(f =>
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cnpj.includes(searchTerm) ||
    f.contato.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableData = filteredFornecedores.map(f => [
    f.nome,
    f.cnpj,
    f.contato,
    new Date(f.createdAt).toLocaleDateString('pt-BR')
  ]);

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

        {errorMessage && (
          <Alert type="error" className="mb-4">
            {errorMessage}
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

          {fornecedores.length === 0 ? (
            <Alert type="info">Nenhum fornecedor cadastrado ainda.</Alert>
          ) : (
            <Table
              headers={['Nome', 'CNPJ', 'Contato', 'Data de Cadastro']}
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
          )}
        </Card>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingFornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
          maxWidth="600px"
        >
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <Alert type="error" className="mb-4">
                {errorMessage}
              </Alert>
            )}

            <Input
              label="Nome do Fornecedor"
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
              disabled={submitting}
            />

            <Input
              label="CNPJ"
              type="text"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              placeholder="12.345.678/0001-90 ou 12345678/0001-90"
              required
              disabled={submitting}
            />

            <Input
              label="Contato (Telefone)"
              type="text"
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              placeholder="(11) 98765-4321"
              required
              disabled={submitting}
            />

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button type="submit" style={{ flex: 1 }} disabled={submitting}>
                {submitting ? 'Salvando...' : (editingFornecedor ? 'Atualizar' : 'Cadastrar')}
              </Button>
              <Button type="button" variant="secondary" onClick={handleCloseModal} style={{ flex: 1 }} disabled={submitting}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AuthLayout>
  );
}

