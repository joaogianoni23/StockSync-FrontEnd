/**
 * Serviço de API para StockSync
 * Centraliza todas as chamadas HTTP para o backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Utilitário para fazer requisições HTTP com tratamento de erros
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Se não houver conteúdo (204 No Content)
    if (response.status === 204) {
      return null;
    }

    const data = await response.json();

    // Se a resposta não for ok, lançar erro com a mensagem da API
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    // Se for erro de rede
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Erro de conexão com o servidor. Verifique se a API está rodando.');
    }
    throw error;
  }
}

/**
 * Adiciona token JWT ao header da requisição
 */
function getAuthHeaders() {
  const token = localStorage.getItem('stocksync_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ============================================
// AUTENTICAÇÃO
// ============================================

export const authAPI = {
  /**
   * Faz login do usuário
   */
  login: async (email, password) => {
    const data = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Salvar token no localStorage
    if (data.token) {
      localStorage.setItem('stocksync_token', data.token);
      localStorage.setItem('stocksync_user', JSON.stringify(data.user));
    }
    
    return data;
  },

  /**
   * Registra novo usuário
   */
  register: async (name, email, password, role = 'estoquista') => {
    return await fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  },

  /**
   * Lista todos os usuários
   */
  getUsers: async () => {
    return await fetchAPI('/auth/users', {
      headers: getAuthHeaders(),
    });
  },

  /**
   * Faz logout (limpa localStorage)
   */
  logout: () => {
    localStorage.removeItem('stocksync_token');
    localStorage.removeItem('stocksync_user');
  },
};

// ============================================
// FORNECEDORES
// ============================================

export const suppliersAPI = {
  /**
   * Lista todos os fornecedores
   */
  getAll: async () => {
    return await fetchAPI('/suppliers', {
      headers: getAuthHeaders(),
    });
  },

  /**
   * Busca fornecedor por ID
   */
  getById: async (id) => {
    return await fetchAPI(`/suppliers/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  /**
   * Cria novo fornecedor
   */
  create: async (supplierData) => {
    return await fetchAPI('/suppliers', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(supplierData),
    });
  },

  /**
   * Atualiza fornecedor existente
   */
  update: async (id, supplierData) => {
    return await fetchAPI(`/suppliers/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(supplierData),
    });
  },

  /**
   * Exclui fornecedor
   */
  delete: async (id) => {
    return await fetchAPI(`/suppliers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};

// ============================================
// PRODUTOS
// ============================================

export const productsAPI = {
  /**
   * Lista todos os produtos
   */
  getAll: async () => {
    return await fetchAPI('/products', {
      headers: getAuthHeaders(),
    });
  },

  /**
   * Busca produto por ID
   */
  getById: async (id) => {
    return await fetchAPI(`/products/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  /**
   * Busca produto por código de barras
   */
  getByBarcode: async (barcode) => {
    return await fetchAPI(`/products/barcode/${barcode}`, {
      headers: getAuthHeaders(),
    });
  },

  /**
   * Cria novo produto
   */
  create: async (productData) => {
    return await fetchAPI('/products', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
  },

  /**
   * Atualiza produto existente
   */
  update: async (id, productData) => {
    return await fetchAPI(`/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
  },

  /**
   * Exclui produto
   */
  delete: async (id) => {
    return await fetchAPI(`/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};

// ============================================
// MOVIMENTAÇÕES DE ESTOQUE
// ============================================

export const stockMovementsAPI = {
  /**
   * Lista todas as movimentações
   * @param {Object} filters - Filtros opcionais (tipo, produtoId, dataInicio, dataFim)
   */
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.tipo) queryParams.append('tipo', filters.tipo);
    if (filters.produtoId) queryParams.append('produtoId', filters.produtoId);
    if (filters.dataInicio) queryParams.append('dataInicio', filters.dataInicio);
    if (filters.dataFim) queryParams.append('dataFim', filters.dataFim);
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    return await fetchAPI(`/stockmovements${query}`, {
      headers: getAuthHeaders(),
    });
  },

  /**
   * Busca movimentação por ID
   */
  getById: async (id) => {
    return await fetchAPI(`/stockmovements/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  /**
   * Registra nova movimentação (entrada ou saída)
   */
  create: async (movementData) => {
    return await fetchAPI('/stockmovements', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(movementData),
    });
  },

  /**
   * Exclui movimentação
   */
  delete: async (id) => {
    return await fetchAPI(`/stockmovements/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};

// ============================================
// DASHBOARD
// ============================================

export const dashboardAPI = {
  /**
   * Obtém dados completos do dashboard
   */
  getData: async () => {
    return await fetchAPI('/dashboard', {
      headers: getAuthHeaders(),
    });
  },
};

// ============================================
// HEALTH CHECK
// ============================================

export const healthAPI = {
  /**
   * Verifica se a API está funcionando
   */
  check: async () => {
    return await fetchAPI('/health');
  },
};

// Exportação padrão com todas as APIs
export default {
  auth: authAPI,
  suppliers: suppliersAPI,
  products: productsAPI,
  stockMovements: stockMovementsAPI,
  dashboard: dashboardAPI,
  health: healthAPI,
};
