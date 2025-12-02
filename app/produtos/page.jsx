'use client';

import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table } from '@/components/Table';
import { Modal } from '@/components/Modal';
import { Alert } from '@/components/Alert';
import { Loading } from '@/components/Loading';
import BarcodeScanner from '@/components/BarcodeScanner';
import { productsAPI, suppliersAPI } from '@/services/api';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [scannerMode, setScannerMode] = useState('search'); // 'search' ou 'create'
  const [editingProduto, setEditingProduto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [barcodeSearch, setBarcodeSearch] = useState('');
  const [searchingBarcode, setSearchingBarcode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    barcode: '',
    name: '',
    description: '',
    price: '',
    category: '',
    estoqueMinimo: '10',
    fornecedorId: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const [produtosData, fornecedoresData] = await Promise.all([
        productsAPI.getAll(),
        suppliersAPI.getAll()
      ]);
      setProdutos(produtosData);
      setFornecedores(fornecedoresData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setErrorMessage(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const categorias = [
    { value: '', label: 'Selecione uma categoria' },
    { value: 'Informática', label: 'Informática' },
    { value: 'Periféricos', label: 'Periféricos' },
    { value: 'Móveis', label: 'Móveis' },
    { value: 'Material de Escritório', label: 'Material de Escritório' },
    { value: 'Eletrônicos', label: 'Eletrônicos' },
    { value: 'Acessórios', label: 'Acessórios' },
  ];

  const fornecedoresOptions = [
    { value: '', label: 'Selecione um fornecedor' },
    ...fornecedores.map(f => ({ value: f.id, label: f.nome }))
  ];

  const handleOpenModal = (produto) => {
    if (produto) {
      setEditingProduto(produto);
      setFormData({
        barcode: produto.barcode,
        name: produto.name,
        description: produto.description || '',
        price: produto.price.toString(),
        category: produto.category,
        estoqueMinimo: produto.estoqueMinimo.toString(),
        fornecedorId: produto.fornecedorId.toString()
      });
    } else {
      setEditingProduto(null);
      setFormData({
        barcode: '',
        name: '',
        description: '',
        price: '',
        category: '',
        estoqueMinimo: '10',
        fornecedorId: ''
      });
    }
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduto(null);
    setFormData({
      barcode: '',
      name: '',
      description: '',
      price: '',
      category: '',
      estoqueMinimo: '10',
      fornecedorId: ''
    });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    
    try {
      const productData = {
        barcode: formData.barcode,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        estoqueMinimo: parseInt(formData.estoqueMinimo),
        fornecedorId: parseInt(formData.fornecedorId)
      };

      if (editingProduto) {
        await productsAPI.update(editingProduto.id, productData);
        setSuccessMessage('Produto atualizado com sucesso!');
      } else {
        await productsAPI.create({ ...productData, stock: 0 });
        setSuccessMessage('Produto cadastrado com sucesso!');
      }
      
      await loadData();
      handleCloseModal();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      setErrorMessage(err.message || 'Erro ao salvar produto');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este produto? Esta ação também removerá todas as movimentações associadas.')) {
      return;
    }

    try {
      setErrorMessage('');
      await productsAPI.delete(id);
      setSuccessMessage('Produto excluído com sucesso!');
      await loadData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      setErrorMessage(err.message || 'Erro ao excluir produto');
    }
  };

  const handleSearchByBarcode = async () => {
    if (!barcodeSearch.trim()) {
      setErrorMessage('Digite um código de barras para buscar');
      return;
    }

    try {
      setSearchingBarcode(true);
      setErrorMessage('');
      const produto = await productsAPI.getByBarcode(barcodeSearch);
      
      // Fechar modal de busca
      setIsBarcodeModalOpen(false);
      setBarcodeSearch('');
      
      // Abrir modal de edição com o produto encontrado
      handleOpenModal(produto);
      setSuccessMessage(`Produto "${produto.name}" encontrado!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      setErrorMessage(err.message || 'Produto não encontrado');
    } finally {
      setSearchingBarcode(false);
    }
  };

  const handleOpenBarcodeModal = () => {
    setBarcodeSearch('');
    setErrorMessage('');
    setScannerMode('search');
    setShowBarcodeScanner(true);
  };

  const handleCloseBarcodeModal = () => {
    setIsBarcodeModalOpen(false);
    setShowBarcodeScanner(false);
    setBarcodeSearch('');
    setErrorMessage('');
  };

  const handleCloseBarcodeScanner = () => {
    setShowBarcodeScanner(false);
    setErrorMessage('');
  };

  const handleOpenCameraForCreate = () => {
    setScannerMode('create');
    setShowBarcodeScanner(true);
  };

  const handleBarcodeDetected = async (barcode) => {
    setShowBarcodeScanner(false);
    
    if (scannerMode === 'search') {
      // Modo de busca: buscar o produto e abrir para edição
      try {
        setSearchingBarcode(true);
        setErrorMessage('');
        const produto = await productsAPI.getByBarcode(barcode);
        
        handleOpenModal(produto);
        setSuccessMessage(`Produto "${produto.name}" encontrado!`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        setErrorMessage(err.message || 'Produto não encontrado');
        // Permitir digitar manualmente
        setBarcodeSearch(barcode);
        setIsBarcodeModalOpen(true);
      } finally {
        setSearchingBarcode(false);
      }
    } else {
      // Modo de criação: preencher o campo de código de barras e abrir modal
      setFormData({ ...formData, barcode });
      setIsModalOpen(true);
    }
  };

  const handleSwitchToManualInput = () => {
    setShowBarcodeScanner(false);
    if (scannerMode === 'search') {
      setIsBarcodeModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const filteredProdutos = produtos.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode.includes(searchTerm) ||
    (p.fornecedor && p.fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const tableData = filteredProdutos.map(p => [
    p.name,
    p.barcode,
    p.category,
    p.stock,
    `R$ ${p.price.toFixed(2)}`,
    p.estoqueMinimo,
    p.fornecedor?.nome || 'N/A'
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
            Gestão de Produtos
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={handleOpenBarcodeModal}>
              🔍 Buscar por Código de Barras
            </Button>
            <Button onClick={() => handleOpenModal()}>
              ➕ Novo Produto
            </Button>
          </div>
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
              placeholder="Buscar produtos por nome, categoria, código de barras ou fornecedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {produtos.length === 0 ? (
            <Alert type="info">Nenhum produto cadastrado ainda.</Alert>
          ) : (
            <Table
              headers={['Nome', 'Código de Barras', 'Categoria', 'Estoque', 'Preço', 'Estoque Mínimo', 'Fornecedor']}
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
          )}
        </Card>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingProduto ? 'Editar Produto' : 'Novo Produto'}
          maxWidth="700px"
        >
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <Alert type="error" className="mb-4">
                {errorMessage}
              </Alert>
            )}

            <div style={{ position: 'relative' }}>
              <Input
                label="Código de Barras (EAN-13)"
                type="text"
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                placeholder="1234567890123"
                required
                disabled={submitting}
              />
              {!editingProduto && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleOpenCameraForCreate}
                  disabled={submitting}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '32px',
                    padding: '6px 12px',
                    fontSize: '14px'
                  }}
                >
                  📷 Escanear
                </Button>
              )}
            </div>

            <Input
              label="Nome do Produto"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={submitting}
            />

            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Descrição
              </label>
              <textarea
                className="input"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição detalhada do produto..."
                disabled={submitting}
                style={{ resize: 'vertical' }}
              />
            </div>

            <Select
              label="Categoria"
              options={categorias}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              disabled={submitting}
            />

            <Input
              label="Preço (R$)"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              disabled={submitting}
            />

            <Input
              label="Estoque Mínimo"
              type="number"
              min="0"
              value={formData.estoqueMinimo}
              onChange={(e) => setFormData({ ...formData, estoqueMinimo: e.target.value })}
              required
              disabled={submitting}
            />

            <Select
              label="Fornecedor"
              options={fornecedoresOptions}
              value={formData.fornecedorId}
              onChange={(e) => setFormData({ ...formData, fornecedorId: e.target.value })}
              required
              disabled={submitting}
            />

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button type="submit" style={{ flex: 1 }} disabled={submitting}>
                {submitting ? 'Salvando...' : (editingProduto ? 'Atualizar' : 'Cadastrar')}
              </Button>
              <Button type="button" variant="secondary" onClick={handleCloseModal} style={{ flex: 1 }} disabled={submitting}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={isBarcodeModalOpen}
          onClose={handleCloseBarcodeModal}
          title="Buscar Produto por Código de Barras"
          maxWidth="500px"
        >
          <div>
            {errorMessage && (
              <Alert type="error" className="mb-4">
                {errorMessage}
              </Alert>
            )}

            <Input
              label="Código de Barras (EAN-13)"
              type="text"
              value={barcodeSearch}
              onChange={(e) => setBarcodeSearch(e.target.value)}
              placeholder="1234567890123"
              disabled={searchingBarcode}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && barcodeSearch.trim()) {
                  e.preventDefault();
                  handleSearchByBarcode();
                }
              }}
              autoFocus
            />

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button
                onClick={handleSearchByBarcode}
                style={{ flex: 1 }}
                disabled={searchingBarcode || !barcodeSearch.trim()}
              >
                {searchingBarcode ? '🔍 Buscando...' : '🔍 Buscar'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCloseBarcodeModal}
                style={{ flex: 1 }}
                disabled={searchingBarcode}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showBarcodeScanner}
          onClose={handleCloseBarcodeScanner}
          title={scannerMode === 'search' ? '📷 Escanear Código de Barras' : '📷 Escanear para Cadastrar'}
          maxWidth="600px"
        >
          <BarcodeScanner
            onDetected={handleBarcodeDetected}
            onClose={handleCloseBarcodeScanner}
            onManualInput={handleSwitchToManualInput}
          />
        </Modal>
      </div>
    </AuthLayout>
  );
}

