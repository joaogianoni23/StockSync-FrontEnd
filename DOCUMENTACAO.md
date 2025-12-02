# 📚 Documentação Completa - StockSync Frontend

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Arquitetura](#arquitetura)
6. [Componentes](#componentes)
7. [Contextos](#contextos)
8. [Páginas](#páginas)
9. [Serviços e API](#serviços-e-api)
10. [Funcionalidades Especiais](#funcionalidades-especiais)
11. [Autenticação e Autorização](#autenticação-e-autorização)
12. [Scanner de Código de Barras](#scanner-de-código-de-barras)
13. [Testes](#testes)
14. [Deploy](#deploy)
15. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

**StockSync** é um sistema completo de gerenciamento de estoque com interface web moderna e responsiva. O frontend foi desenvolvido com Next.js 15 e React 18, oferecendo uma experiência de usuário fluida e intuitiva.

### Principais Funcionalidades

- ✅ **Autenticação JWT** - Login seguro com tokens
- ✅ **Gestão de Produtos** - CRUD completo com código de barras
- ✅ **Gestão de Fornecedores** - Cadastro e gerenciamento
- ✅ **Controle de Estoque** - Entrada e saída de produtos
- ✅ **Dashboard** - Estatísticas e indicadores em tempo real
- ✅ **Histórico** - Rastreamento de todas as movimentações
- ✅ **Scanner de Código de Barras** - Leitura por câmera ou manual
- ✅ **Tema Claro/Escuro** - Alternância de temas
- ✅ **Responsivo** - Funciona em desktop, tablet e mobile

### Tipos de Usuário

- **Admin** - Acesso total a todas as funcionalidades
- **Estoquista** - Acesso limitado (sem dashboard)

---

## 🛠️ Tecnologias Utilizadas

### Core
- **Next.js** 15.0.3 - Framework React com SSR e App Router
- **React** 18.3.1 - Biblioteca JavaScript para interfaces
- **React DOM** 18.3.1 - Renderização React para web

### Bibliotecas Adicionais
- **@zxing/library** - Leitura de códigos de barras (polyfill)
- **BarcodeDetector API** - API nativa do navegador (quando disponível)

### DevDependencies
- **TypeScript** 5+ - Tipagem estática
- **ESLint** 9+ - Linting de código
- **@types/node** 20+ - Tipos TypeScript para Node.js
- **@types/react** 18+ - Tipos TypeScript para React
- **@types/react-dom** 18+ - Tipos TypeScript para React DOM

### Variáveis de Ambiente
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 📁 Estrutura do Projeto

```
StockSync-FrontEnd/
├── app/                          # App Router do Next.js
│   ├── globals.css              # Estilos globais e variáveis CSS
│   ├── layout.jsx               # Layout principal da aplicação
│   ├── page.jsx                 # Página inicial (redireciona para /dashboard)
│   ├── dashboard/
│   │   └── page.jsx            # Dashboard com estatísticas
│   ├── entrada/
│   │   └── page.jsx            # Registro de entrada de produtos
│   ├── fornecedores/
│   │   └── page.jsx            # Gestão de fornecedores (CRUD)
│   ├── historico/
│   │   └── page.jsx            # Histórico de movimentações
│   ├── login/
│   │   └── page.jsx            # Página de autenticação
│   ├── produtos/
│   │   └── page.jsx            # Gestão de produtos (CRUD + Scanner)
│   └── saida/
│       └── page.jsx            # Registro de saída de produtos
│
├── components/                   # Componentes reutilizáveis
│   ├── Alert.jsx               # Alertas de sucesso/erro/warning
│   ├── AuthLayout.jsx          # Layout com autenticação e sidebar
│   ├── BarcodeScanner.jsx      # Scanner de código de barras
│   ├── Button.jsx              # Botão customizado
│   ├── Card.jsx                # Card/container
│   ├── Input.jsx               # Input de formulário
│   ├── Loading.jsx             # Indicador de carregamento
│   ├── Modal.jsx               # Modal/Dialog
│   ├── Select.jsx              # Select/dropdown
│   ├── Sidebar.jsx             # Menu lateral de navegação
│   └── Table.jsx               # Tabela de dados
│
├── contexts/                     # Contextos React
│   ├── AuthContext.jsx         # Contexto de autenticação
│   └── ThemeContext.jsx        # Contexto de tema (claro/escuro)
│
├── services/                     # Serviços e integrações
│   └── api.js                  # Cliente HTTP e endpoints da API
│
├── utils/                        # Utilitários
│   └── barcodePolyfill.js      # Polyfill para BarcodeDetector
│
├── .env.local                    # Variáveis de ambiente (não versionado)
├── .gitignore                   # Arquivos ignorados pelo Git
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configuração TypeScript
├── README.md                    # Documentação básica
├── DOCUMENTACAO.md              # Esta documentação completa
├── TESTES.md                    # Guia de testes
├── INTEGRACAO.md                # Guia de integração com backend
├── INSTRUCOES.md                # Guia rápido de início
└── SCANNER.md                   # Guia do scanner de código de barras
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- **Node.js** 18+ ou 20+
- **npm** 9+ ou **yarn** 1.22+
- **Backend StockSync** rodando (padrão: http://localhost:4000)

### Passo a Passo

#### 1. Clone o repositório
```bash
git clone https://github.com/joaogianoni23/StockSync-FrontEnd.git
cd StockSync-FrontEnd
```

#### 2. Instale as dependências
```bash
npm install
```

#### 3. Configure as variáveis de ambiente
```bash
# Crie o arquivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
```

#### 4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

#### 5. Acesse a aplicação
```
http://localhost:3000
```

### Scripts Disponíveis

```bash
# Desenvolvimento (hot reload)
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm run start

# Linting
npm run lint
```

---

## 🏗️ Arquitetura

### Padrão de Arquitetura

O projeto segue os padrões do **Next.js App Router** com **React Server Components** e **Client Components**.

```
┌─────────────────────────────────────────┐
│         Next.js App Router              │
├─────────────────────────────────────────┤
│  Pages (app/)                           │
│    ├── Server Components (RSC)          │
│    └── Client Components ('use client') │
├─────────────────────────────────────────┤
│  Contexts (React Context API)           │
│    ├── AuthContext (Autenticação)       │
│    └── ThemeContext (Tema)              │
├─────────────────────────────────────────┤
│  Components (Reutilizáveis)             │
│    ├── Layout Components                │
│    ├── Form Components                  │
│    └── UI Components                    │
├─────────────────────────────────────────┤
│  Services (API Integration)             │
│    └── api.js (HTTP Client)             │
├─────────────────────────────────────────┤
│         Backend REST API                │
│         (Node.js + Express)             │
└─────────────────────────────────────────┘
```

### Fluxo de Dados

1. **Autenticação**: Login → JWT Token → localStorage → Header Authorization
2. **Requisições API**: Component → api.js → Backend → Response → Component
3. **Estado Global**: Context API → Providers → Consumer Components
4. **Navegação**: Next.js Router → Middleware → Protected Routes

---

## 🧩 Componentes

### Alert.jsx
**Propósito**: Exibir mensagens de feedback ao usuário

```jsx
<Alert type="success">Operação realizada com sucesso!</Alert>
<Alert type="error">Erro ao processar requisição</Alert>
<Alert type="warning">Atenção: estoque baixo</Alert>
<Alert type="info">Informação importante</Alert>
```

**Props**:
- `type`: 'success' | 'error' | 'warning' | 'info'
- `children`: Conteúdo da mensagem
- `className`: Classes CSS adicionais

**Estilos**: Cores dinâmicas baseadas no tipo, ícone automático

---

### AuthLayout.jsx
**Propósito**: Layout com autenticação e sidebar para páginas protegidas

```jsx
<AuthLayout requiredRoles={['admin', 'estoquista']}>
  <YourPageContent />
</AuthLayout>
```

**Funcionalidades**:
- Verifica autenticação (redireciona para /login se não autenticado)
- Verifica roles/permissões
- Renderiza Sidebar
- Área de conteúdo principal
- Responsivo (sidebar colapsável em mobile)

**Props**:
- `requiredRoles`: Array de roles permitidas (opcional)
- `children`: Conteúdo da página

---

### BarcodeScanner.jsx
**Propósito**: Scanner de código de barras usando câmera do dispositivo

```jsx
<BarcodeScanner
  onDetected={(barcode) => console.log('Código detectado:', barcode)}
  onClose={() => setShowScanner(false)}
  onManualInput={() => setShowManualInput(true)}
/>
```

**Funcionalidades**:
- Acesso à câmera do dispositivo
- Detecção automática de códigos de barras
- Suporte múltiplos formatos (EAN-13, EAN-8, Code 128, Code 39)
- Fallback para digitação manual
- Interface visual com guia de alinhamento
- Câmera traseira preferencial em mobile

**Props**:
- `onDetected(barcode)`: Callback quando código é detectado
- `onClose()`: Callback para fechar scanner
- `onManualInput()`: Callback para alternar para digitação manual

**APIs Utilizadas**:
- `navigator.mediaDevices.getUserMedia()` - Acesso à câmera
- `BarcodeDetector` (nativo ou polyfill com ZXing)

---

### Button.jsx
**Propósito**: Botão customizado com variantes

```jsx
<Button onClick={handleClick}>Salvar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="danger">Excluir</Button>
<Button disabled={loading}>Carregando...</Button>
```

**Props**:
- `variant`: 'primary' | 'secondary' | 'danger'
- `children`: Texto/conteúdo do botão
- `className`: Classes CSS adicionais
- `disabled`: Desabilitar botão
- `type`: 'button' | 'submit' | 'reset'
- `onClick`: Função de clique
- Outros props HTML do button

**Estilos**: Tema-aware (adapta ao tema claro/escuro)

---

### Card.jsx
**Propósito**: Container/card para agrupar conteúdo

```jsx
<Card>
  <h2>Título</h2>
  <p>Conteúdo do card</p>
</Card>

<Card className="custom-class">
  Conteúdo personalizado
</Card>
```

**Props**:
- `children`: Conteúdo interno
- `className`: Classes CSS adicionais
- Outros props HTML da div

**Estilos**: Borda, sombra, padding, border-radius

---

### Input.jsx
**Propósito**: Input de formulário com label

```jsx
<Input
  label="Nome"
  type="text"
  value={nome}
  onChange={(e) => setNome(e.target.value)}
  placeholder="Digite o nome"
  required
/>
```

**Props**:
- `label`: Texto do label
- `type`: Tipo do input (text, number, email, password, etc)
- `value`: Valor controlado
- `onChange`: Função de mudança
- `placeholder`: Placeholder
- `required`: Campo obrigatório
- `disabled`: Desabilitar input
- `className`: Classes CSS adicionais
- Outros props HTML do input

**Funcionalidades**:
- Label automático com id único
- Estilo consistente
- Suporte a required visual

---

### Loading.jsx
**Propósito**: Indicador de carregamento

```jsx
{loading && <Loading />}

// Com texto customizado
<Loading text="Carregando produtos..." />
```

**Props**:
- `text`: Texto de carregamento (opcional)

**Estilos**: Spinner animado + texto centralizado

---

### Modal.jsx
**Propósito**: Modal/Dialog customizado

```jsx
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Título do Modal"
  maxWidth="600px"
>
  <p>Conteúdo do modal</p>
  <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
</Modal>
```

**Funcionalidades**:
- Backdrop com overlay escuro
- Fecha com ESC ou clique fora
- Botão X para fechar
- Animação de entrada/saída
- Scroll interno se conteúdo grande
- Responsivo
- Previne scroll da página quando aberto

**Props**:
- `isOpen`: Boolean controlando visibilidade
- `onClose()`: Callback para fechar
- `title`: Título do modal
- `maxWidth`: Largura máxima (padrão: 600px)
- `children`: Conteúdo interno

---

### Select.jsx
**Propósito**: Dropdown/select com label

```jsx
<Select
  label="Categoria"
  options={[
    { value: '', label: 'Selecione...' },
    { value: '1', label: 'Categoria 1' },
    { value: '2', label: 'Categoria 2' }
  ]}
  value={categoria}
  onChange={(e) => setCategoria(e.target.value)}
  required
/>
```

**Props**:
- `label`: Texto do label
- `options`: Array de {value, label}
- `value`: Valor selecionado
- `onChange`: Função de mudança
- `required`: Campo obrigatório
- `disabled`: Desabilitar select
- `className`: Classes CSS adicionais

---

### Sidebar.jsx
**Propósito**: Menu lateral de navegação

```jsx
<Sidebar />
```

**Funcionalidades**:
- Navegação entre páginas
- Indicador de página ativa
- Alternância de tema (claro/escuro)
- Logout
- Informações do usuário logado
- Colapsável em mobile
- Ícones para cada seção

**Navegação**:
- 📊 Dashboard (apenas admin)
- 📦 Produtos
- 🏢 Fornecedores
- ➕ Entrada
- ➖ Saída
- 📜 Histórico

**Ações**:
- 🌓 Alternar Tema
- 🚪 Sair

---

### Table.jsx
**Propósito**: Tabela de dados responsiva

```jsx
<Table
  headers={['Nome', 'Email', 'Ações']}
  data={[
    ['João', 'joao@email.com', <Button>Editar</Button>],
    ['Maria', 'maria@email.com', <Button>Editar</Button>]
  ]}
/>
```

**Props**:
- `headers`: Array de strings (cabeçalhos)
- `data`: Array de arrays (linhas)
- `className`: Classes CSS adicionais

**Funcionalidades**:
- Scroll horizontal em mobile
- Zebra striping (linhas alternadas)
- Hover effect
- Responsiva

---

## 🌐 Contextos

### AuthContext.jsx
**Propósito**: Gerenciar estado de autenticação globalmente

#### Provider
```jsx
import { AuthProvider } from '@/contexts/AuthContext';

<AuthProvider>
  <App />
</AuthProvider>
```

#### Consumer
```jsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isLoading } = useAuth();
  
  return (
    <div>
      {user ? (
        <p>Bem-vindo, {user.nome}!</p>
      ) : (
        <LoginForm onSubmit={login} />
      )}
    </div>
  );
}
```

#### API
- **user**: Objeto do usuário logado (null se deslogado)
  ```javascript
  {
    id: 1,
    nome: 'Admin',
    email: 'admin@stocksync.com',
    role: 'admin'
  }
  ```
- **login(email, password)**: Função de login (async)
- **logout()**: Função de logout
- **isLoading**: Boolean indicando carregamento inicial

#### Funcionalidades
- Persiste token JWT no localStorage
- Valida token ao carregar aplicação
- Auto-refresh de dados do usuário
- Redirect automático para /login se não autenticado

---

### ThemeContext.jsx
**Propósito**: Gerenciar tema claro/escuro

#### Provider
```jsx
import { ThemeProvider } from '@/contexts/ThemeContext';

<ThemeProvider>
  <App />
</ThemeProvider>
```

#### Consumer
```jsx
import { useTheme } from '@/contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

#### API
- **theme**: 'light' | 'dark'
- **toggleTheme()**: Alterna entre temas

#### Funcionalidades
- Persiste tema no localStorage
- Aplica classe no body (light/dark)
- Transição suave entre temas
- Detecta preferência do sistema (prefers-color-scheme)

---

## 📄 Páginas

### /login (app/login/page.jsx)
**Propósito**: Página de autenticação

**Funcionalidades**:
- Formulário de login (email + senha)
- Validação de campos
- Feedback de erros
- Redirect para /dashboard após login
- Já logado? Redirect automático

**Credenciais de Teste**:
```
Admin:
- Email: admin@stocksync.com
- Senha: admin123

Estoquista:
- Email: estoquista@stocksync.com
- Senha: estoque123
```

**Fluxo**:
1. Usuário digita email e senha
2. Click em "Entrar"
3. POST /auth/login
4. Recebe token JWT
5. Salva no localStorage
6. Redirect para /dashboard

---

### /dashboard (app/dashboard/page.jsx)
**Acesso**: Apenas Admin

**Funcionalidades**:
- Cards com estatísticas principais:
  - Total de Produtos
  - Valor Total em Estoque
  - Produtos com Estoque Baixo
  - Total de Fornecedores
- Gráficos (se implementado)
- Atualização em tempo real
- Loading states

**Dados da API**:
- GET /dashboard/stats

**Estrutura de Resposta**:
```json
{
  "totalProdutos": 150,
  "valorTotalEstoque": 125000.50,
  "produtosEstoqueBaixo": 12,
  "totalFornecedores": 25
}
```

---

### /produtos (app/produtos/page.jsx)
**Acesso**: Admin e Estoquista

**Funcionalidades**:
- **Listagem**: Tabela com todos os produtos
- **Busca**: Filtro por nome, categoria, código de barras, fornecedor
- **Scanner**: Buscar produto por código de barras usando câmera
- **Criar**: Modal com formulário de cadastro + scanner
- **Editar**: Modal com formulário pré-preenchido
- **Excluir**: Confirmação antes de excluir

**Campos do Produto**:
- Código de Barras (EAN-13) - único, obrigatório
- Nome - obrigatório
- Descrição - opcional
- Categoria - obrigatório
- Preço - obrigatório, decimal
- Estoque Mínimo - obrigatório, inteiro
- Fornecedor - obrigatório, select
- Estoque Atual - apenas leitura, gerenciado por entradas/saídas

**Categorias Disponíveis**:
- Informática
- Periféricos
- Móveis
- Material de Escritório
- Eletrônicos
- Acessórios

**Endpoints**:
- GET /products - Listar todos
- GET /products/barcode/:barcode - Buscar por código
- POST /products - Criar
- PUT /products/:id - Atualizar
- DELETE /products/:id - Excluir

**Validações**:
- Código de barras único (backend valida)
- Preço > 0
- Estoque mínimo >= 0

---

### /fornecedores (app/fornecedores/page.jsx)
**Acesso**: Admin e Estoquista

**Funcionalidades**:
- **Listagem**: Tabela com todos os fornecedores
- **Busca**: Filtro por nome, CNPJ, email
- **Criar**: Modal com formulário de cadastro
- **Editar**: Modal com formulário pré-preenchido
- **Excluir**: Confirmação antes de excluir (apenas se sem produtos vinculados)

**Campos do Fornecedor**:
- Nome - obrigatório
- CNPJ - obrigatório, formato 00.000.000/0000-00
- Email - obrigatório, validação de email
- Telefone - obrigatório, formato (00) 00000-0000
- Endereço - obrigatório
- Cidade - obrigatório
- Estado - obrigatório, select com UF
- CEP - obrigatório, formato 00000-000

**Endpoints**:
- GET /suppliers - Listar todos
- POST /suppliers - Criar
- PUT /suppliers/:id - Atualizar
- DELETE /suppliers/:id - Excluir

**Validações**:
- CNPJ único (backend valida)
- Email único (backend valida)
- Formato de CNPJ, telefone e CEP

---

### /entrada (app/entrada/page.jsx)
**Acesso**: Admin e Estoquista

**Propósito**: Registrar entrada de produtos no estoque

**Funcionalidades**:
- Selecionar produto (dropdown)
- Informar quantidade
- Informar valor unitário
- Adicionar observações
- Calcular valor total automaticamente
- Visualizar estoque atual antes da entrada
- Confirmação de sucesso

**Fluxo**:
1. Seleciona produto
2. Sistema mostra: estoque atual, preço, fornecedor
3. Informa quantidade e valor unitário
4. Sistema calcula valor total
5. Adiciona observações (opcional)
6. Click em "Registrar Entrada"
7. POST /stock-movements/entry
8. Estoque do produto é atualizado
9. Sucesso: limpa formulário

**Campos**:
- Produto - select, obrigatório
- Quantidade - number, obrigatório, min 1
- Valor Unitário - number, obrigatório, min 0.01
- Observações - textarea, opcional

**Cálculo**:
```
Valor Total = Quantidade × Valor Unitário
```

**Endpoint**:
- POST /stock-movements/entry
```json
{
  "produtoId": 1,
  "quantidade": 50,
  "valorUnitario": 29.90,
  "observacoes": "Nota fiscal 12345"
}
```

---

### /saida (app/saida/page.jsx)
**Acesso**: Admin e Estoquista

**Propósito**: Registrar saída de produtos do estoque

**Funcionalidades**:
- Selecionar produto (dropdown)
- Informar quantidade
- Validação de estoque disponível
- Adicionar observações (motivo da saída)
- Visualizar estoque atual antes da saída
- Bloqueio se quantidade > estoque disponível

**Fluxo**:
1. Seleciona produto
2. Sistema mostra: estoque atual, preço, fornecedor
3. Informa quantidade
4. Sistema valida: quantidade <= estoque disponível
5. Adiciona observações (opcional)
6. Click em "Registrar Saída"
7. POST /stock-movements/exit
8. Estoque do produto é atualizado
9. Sucesso: limpa formulário

**Validações**:
- Quantidade <= Estoque Atual
- Quantidade > 0

**Campos**:
- Produto - select, obrigatório
- Quantidade - number, obrigatório, min 1
- Observações - textarea, opcional (motivo da saída)

**Endpoint**:
- POST /stock-movements/exit
```json
{
  "produtoId": 1,
  "quantidade": 10,
  "observacoes": "Venda ao cliente X"
}
```

---

### /historico (app/historico/page.jsx)
**Acesso**: Admin e Estoquista

**Propósito**: Visualizar histórico de movimentações de estoque

**Funcionalidades**:
- Listagem de todas as movimentações (entrada/saída)
- Filtros:
  - Tipo de movimentação (Todas, Entrada, Saída)
  - Produto (dropdown)
  - Data (range de datas)
- Ordenação por data (mais recente primeiro)
- Paginação
- Informações detalhadas:
  - Data e hora
  - Tipo (Entrada/Saída)
  - Produto
  - Quantidade
  - Valor (apenas entradas)
  - Observações
  - Usuário responsável

**Campos da Tabela**:
- Data/Hora - formato DD/MM/YYYY HH:MM
- Tipo - Badge colorido (verde=entrada, vermelho=saída)
- Produto - Nome do produto
- Quantidade - Com símbolo + ou -
- Valor Unitário - Apenas entradas, formato R$ 0,00
- Valor Total - Quantidade × Valor Unitário
- Observações - Truncado com "..."
- Usuário - Nome de quem registrou

**Endpoint**:
- GET /stock-movements
- GET /stock-movements?type=entry
- GET /stock-movements?type=exit
- GET /stock-movements?produtoId=1

**Resposta da API**:
```json
[
  {
    "id": 1,
    "tipo": "entrada",
    "produtoId": 1,
    "produto": {
      "id": 1,
      "name": "Mouse Logitech",
      "barcode": "7891234567890"
    },
    "quantidade": 50,
    "valorUnitario": 29.90,
    "valorTotal": 1495.00,
    "observacoes": "Nota fiscal 12345",
    "createdAt": "2025-12-02T10:30:00Z",
    "usuario": {
      "id": 1,
      "nome": "Admin"
    }
  }
]
```

---

## 🔌 Serviços e API

### services/api.js

**Propósito**: Cliente HTTP centralizado para comunicação com backend

#### Configuração Base

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
```

#### Função Principal: fetchAPI

```javascript
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição');
  }

  return data;
}
```

#### Helper: getAuthHeaders

```javascript
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
```

---

### API de Autenticação (authAPI)

```javascript
export const authAPI = {
  // Login
  login: async (email, password) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  // Validar token
  validateToken: async () => {
    return fetchAPI('/auth/validate', {
      headers: getAuthHeaders(),
    });
  },
};
```

**Endpoints**:
- POST /auth/login - Login do usuário
- GET /auth/validate - Validar token JWT

---

### API de Fornecedores (suppliersAPI)

```javascript
export const suppliersAPI = {
  // Listar todos
  getAll: async () => {
    return fetchAPI('/suppliers', {
      headers: getAuthHeaders(),
    });
  },
  
  // Criar fornecedor
  create: async (data) => {
    return fetchAPI('/suppliers', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },
  
  // Atualizar fornecedor
  update: async (id, data) => {
    return fetchAPI(`/suppliers/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },
  
  // Excluir fornecedor
  delete: async (id) => {
    return fetchAPI(`/suppliers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};
```

---

### API de Produtos (productsAPI)

```javascript
export const productsAPI = {
  // Listar todos
  getAll: async () => {
    return fetchAPI('/products', {
      headers: getAuthHeaders(),
    });
  },
  
  // Buscar por código de barras
  getByBarcode: async (barcode) => {
    return fetchAPI(`/products/barcode/${barcode}`, {
      headers: getAuthHeaders(),
    });
  },
  
  // Criar produto
  create: async (data) => {
    return fetchAPI('/products', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },
  
  // Atualizar produto
  update: async (id, data) => {
    return fetchAPI(`/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },
  
  // Excluir produto
  delete: async (id) => {
    return fetchAPI(`/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};
```

---

### API de Movimentações (stockMovementsAPI)

```javascript
export const stockMovementsAPI = {
  // Listar todas (com filtros opcionais)
  getAll: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return fetchAPI(`/stock-movements${query ? `?${query}` : ''}`, {
      headers: getAuthHeaders(),
    });
  },
  
  // Registrar entrada
  entry: async (data) => {
    return fetchAPI('/stock-movements/entry', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },
  
  // Registrar saída
  exit: async (data) => {
    return fetchAPI('/stock-movements/exit', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },
};
```

---

### API do Dashboard (dashboardAPI)

```javascript
export const dashboardAPI = {
  // Obter estatísticas
  getStats: async () => {
    return fetchAPI('/dashboard/stats', {
      headers: getAuthHeaders(),
    });
  },
};
```

---

## 🎨 Estilos Globais (app/globals.css)

### Variáveis CSS

#### Tema Claro
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --secondary: #64748b;
  --success: #10b981;
  --error: #ef4444;
  --warning: #f59e0b;
  --info: #3b82f6;
  --border: #e5e7eb;
  --card-bg: #f9fafb;
  --hover: #f3f4f6;
}
```

#### Tema Escuro
```css
.dark {
  --background: #0f172a;
  --foreground: #f1f5f9;
  --primary: #60a5fa;
  --primary-dark: #3b82f6;
  --secondary: #94a3b8;
  --success: #34d399;
  --error: #f87171;
  --warning: #fbbf24;
  --info: #60a5fa;
  --border: #334155;
  --card-bg: #1e293b;
  --hover: #334155;
}
```

### Classes Utilitárias

```css
.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  background: var(--primary);
  color: white;
  transition: all 0.2s;
}

.btn:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: var(--secondary);
}

.btn-danger {
  background: var(--error);
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--background);
  color: var(--foreground);
}
```

---

## 🔐 Autenticação e Autorização

### Fluxo de Autenticação

```
1. Login
   ├─> POST /auth/login (email, password)
   ├─> Recebe JWT token
   ├─> Salva token no localStorage
   └─> Redirect para /dashboard

2. Requisições Autenticadas
   ├─> Lê token do localStorage
   ├─> Adiciona header: Authorization: Bearer {token}
   └─> Backend valida token

3. Logout
   ├─> Remove token do localStorage
   ├─> Limpa contexto de autenticação
   └─> Redirect para /login

4. Validação Automática
   ├─> Ao carregar app, verifica token
   ├─> GET /auth/validate
   ├─> Se válido: mantém usuário logado
   └─> Se inválido: redirect para /login
```

### Proteção de Rotas

**Componente AuthLayout**:
```jsx
const AuthLayout = ({ requiredRoles = [], children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <Loading />;
  if (!user) return null;

  // Verifica roles se especificado
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <div>Acesso negado</div>;
  }

  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
};
```

### Roles e Permissões

| Funcionalidade | Admin | Estoquista |
|----------------|-------|------------|
| Dashboard | ✅ | ❌ |
| Produtos (visualizar) | ✅ | ✅ |
| Produtos (criar/editar/excluir) | ✅ | ✅ |
| Fornecedores (visualizar) | ✅ | ✅ |
| Fornecedores (criar/editar/excluir) | ✅ | ✅ |
| Entrada de Estoque | ✅ | ✅ |
| Saída de Estoque | ✅ | ✅ |
| Histórico | ✅ | ✅ |

**Nota**: Atualmente ambos os roles têm as mesmas permissões, exceto o Dashboard que é exclusivo do Admin.

---

## 📷 Scanner de Código de Barras

### Visão Geral

O sistema possui um scanner integrado que utiliza a câmera do dispositivo para ler códigos de barras. Suporta múltiplos formatos e tem fallback para digitação manual.

### Tecnologias

1. **BarcodeDetector API** (Nativa)
   - Disponível em Chrome 83+, Edge 83+, Samsung Internet 15+
   - Melhor performance
   - Detecção mais rápida

2. **ZXing Library** (Polyfill)
   - Fallback para navegadores sem suporte nativo
   - Compatibilidade com Firefox, Safari, etc.
   - Instalado via npm: `@zxing/library`

### Formatos Suportados

- **EAN-13** - Código de barras de 13 dígitos (padrão Brasil)
- **EAN-8** - Versão curta de 8 dígitos
- **Code 128** - Uso industrial
- **Code 39** - Uso industrial

### Funcionalidades

#### 1. Buscar Produto por Código de Barras

**Localização**: Página /produtos

**Fluxo**:
1. Click em "🔍 Buscar por Código de Barras"
2. Modal abre com câmera ativa
3. Posiciona código de barras na área delimitada
4. Detecção automática
5. Busca produto na API
6. Se encontrado: abre modal de edição
7. Se não encontrado: permite digitação manual

#### 2. Cadastrar Produto com Scanner

**Localização**: Página /produtos → Novo Produto

**Fluxo**:
1. Click em "➕ Novo Produto"
2. No campo "Código de Barras", click em "📷 Escanear"
3. Modal abre com câmera ativa
4. Posiciona código de barras na área delimitada
5. Detecção automática
6. Campo é preenchido automaticamente
7. Fecha câmera
8. Continua cadastro normalmente

### Interface do Scanner

```
┌─────────────────────────────────────┐
│   📷 Escanear Código de Barras      │
├─────────────────────────────────────┤
│                                     │
│         [Vídeo da Câmera]           │
│                                     │
│      ┌─────────────────────┐       │
│      │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ ←─────┐
│      │  Alinhe o código    │       │
│      │  de barras aqui     │   Guia de
│      └─────────────────────┘   Alinhamento
│                                     │
├─────────────────────────────────────┤
│ Posicione o código de barras no    │
│ centro da câmera                    │
│                                     │
│    [Digitar Manualmente]            │
└─────────────────────────────────────┘
```

### Permissões de Câmera

**Primeira vez**:
- Navegador solicita permissão
- Usuário clica em "Permitir"
- Permissão é salva para próximas vezes

**Permissão negada**:
- Mensagem de erro exibida
- Botão "Digitar Manualmente" disponível

**Gerenciar Permissões**:
- Chrome: Ícone de cadeado → Permissões → Câmera
- Firefox: Ícone de escudo → Permissões → Câmera
- Safari: Preferências → Sites → Câmera

### Privacidade

- ✅ Nenhuma imagem é salva ou enviada
- ✅ Processamento 100% local no navegador
- ✅ Câmera desliga automaticamente após uso
- ✅ Câmera desliga ao fechar modal
- ✅ Câmera desliga ao pressionar ESC
- ✅ Sem gravação de vídeo

### Dicas para Melhor Leitura

**✅ FAÇA**:
- Use boa iluminação
- Código limpo e nítido
- Posição paralela à câmera
- Distância de 10-20cm
- Aguarde alguns segundos

**❌ EVITE**:
- Códigos borrados ou danificados
- Reflexo de luz diretamente no código
- Movimentação excessiva
- Ângulos muito inclinados
- Distância muito próxima ou longe

### Troubleshooting

**Problema**: Câmera não abre
- Verificar permissões do navegador
- Fechar outros apps usando a câmera
- Atualizar navegador

**Problema**: Código não é detectado
- Melhorar iluminação
- Limpar lente da câmera
- Ajustar distância
- Tentar ângulos diferentes
- Usar "Digitar Manualmente"

**Problema**: Navegador não suporta
- Atualizar para versão mais recente
- Usar Chrome ou Edge
- Usar "Digitar Manualmente"

---

## 🧪 Testes

### Testes Manuais

Consulte o arquivo `TESTES.md` para procedimentos detalhados de teste manual.

### Checklist Rápido

**Autenticação**:
- [ ] Login com credenciais válidas
- [ ] Login com credenciais inválidas
- [ ] Logout
- [ ] Token expirado redireciona para login
- [ ] Acesso a rota protegida sem login

**Dashboard**:
- [ ] Cards com estatísticas corretas
- [ ] Loading states
- [ ] Acesso negado para estoquista

**Produtos**:
- [ ] Listar produtos
- [ ] Buscar produtos (filtro)
- [ ] Criar produto
- [ ] Editar produto
- [ ] Excluir produto
- [ ] Buscar por código de barras (câmera)
- [ ] Cadastrar com código de barras (câmera)
- [ ] Validação de campos

**Fornecedores**:
- [ ] Listar fornecedores
- [ ] Buscar fornecedores (filtro)
- [ ] Criar fornecedor
- [ ] Editar fornecedor
- [ ] Excluir fornecedor
- [ ] Validação de CNPJ, email, telefone

**Entrada**:
- [ ] Selecionar produto
- [ ] Informar quantidade e valor
- [ ] Cálculo de valor total
- [ ] Registrar entrada
- [ ] Estoque atualizado

**Saída**:
- [ ] Selecionar produto
- [ ] Informar quantidade
- [ ] Validação de estoque disponível
- [ ] Registrar saída
- [ ] Estoque atualizado

**Histórico**:
- [ ] Listar movimentações
- [ ] Filtrar por tipo
- [ ] Filtrar por produto
- [ ] Ordenação por data

**Scanner**:
- [ ] Abrir câmera
- [ ] Detectar código de barras
- [ ] Fechar câmera
- [ ] Alternar para digitação manual
- [ ] Permissões de câmera

**Tema**:
- [ ] Alternar entre claro/escuro
- [ ] Persistência no localStorage
- [ ] Cores e estilos corretos em ambos os temas

**Responsividade**:
- [ ] Desktop (> 1024px)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (< 768px)
- [ ] Sidebar colapsável em mobile

---

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

Isso irá:
1. Compilar TypeScript
2. Otimizar código JavaScript
3. Minificar CSS
4. Gerar arquivos estáticos (se SSG)
5. Criar build otimizado em `.next/`

### Iniciar Servidor de Produção (Local)

```bash
npm run start
```

Servidor rodará em `http://localhost:3000`

### Deploy em Vercel (Recomendado)

#### Via Interface Web

1. Acesse [vercel.com](https://vercel.com)
2. Click em "New Project"
3. Importe o repositório do GitHub
4. Configure variáveis de ambiente:
   ```
   NEXT_PUBLIC_API_URL=https://seu-backend.com
   ```
5. Click em "Deploy"

#### Via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Deploy em Netlify

1. Build settings:
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://seu-backend.com
   ```

3. Adicionar arquivo `netlify.toml`:
   ```toml
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

### Deploy em AWS (EC2)

```bash
# Conectar ao servidor
ssh usuario@seu-servidor.com

# Clonar repositório
git clone https://github.com/joaogianoni23/StockSync-FrontEnd.git
cd StockSync-FrontEnd

# Instalar dependências
npm install

# Configurar variáveis de ambiente
echo "NEXT_PUBLIC_API_URL=https://seu-backend.com" > .env.local

# Build
npm run build

# Instalar PM2 (gerenciador de processos)
npm install -g pm2

# Iniciar aplicação com PM2
pm2 start npm --name "stocksync-frontend" -- start

# Configurar para iniciar com o sistema
pm2 startup
pm2 save
```

### Deploy em Docker

**Dockerfile**:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      args:
        NEXT_PUBLIC_API_URL: http://localhost:4000
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

**Comandos**:
```bash
# Build
docker build -t stocksync-frontend .

# Run
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:4000 stocksync-frontend

# Ou com docker-compose
docker-compose up -d
```

### Configurações de Produção

#### Performance

1. **Habilitar Cache HTTP**:
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/_next/static/:path*',
           headers: [
             {
               key: 'Cache-Control',
               value: 'public, max-age=31536000, immutable',
             },
           ],
         },
       ];
     },
   };
   ```

2. **Otimizar Imagens**:
   ```javascript
   // Use next/image para otimização automática
   import Image from 'next/image';
   ```

3. **Code Splitting**:
   ```javascript
   // Lazy load de componentes pesados
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Loading />,
   });
   ```

#### Segurança

1. **Variáveis de Ambiente**:
   - Nunca commitar `.env.local`
   - Use `NEXT_PUBLIC_` apenas para variáveis públicas
   - Variáveis sensíveis devem ficar no backend

2. **Headers de Segurança**:
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/:path*',
           headers: [
             {
               key: 'X-Frame-Options',
               value: 'DENY',
             },
             {
               key: 'X-Content-Type-Options',
               value: 'nosniff',
             },
             {
               key: 'Referrer-Policy',
               value: 'origin-when-cross-origin',
             },
           ],
         },
       ];
     },
   };
   ```

3. **CSP (Content Security Policy)**:
   ```javascript
   // Configurar no next.config.js ou no servidor
   ```

#### Monitoramento

1. **Error Tracking**: Integrar Sentry
   ```bash
   npm install @sentry/nextjs
   ```

2. **Analytics**: Google Analytics, Plausible, etc.

3. **Logs**: Structured logging em produção

---

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Erro de CORS

**Sintoma**: 
```
Access to fetch at 'http://localhost:4000' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solução**:
- Configurar CORS no backend
- Backend deve permitir origem `http://localhost:3000` (dev) ou domínio de produção

**Backend (Express)**:
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://seu-dominio.com'],
  credentials: true
}));
```

---

#### 2. Token Expirado

**Sintoma**: Usuário é deslogado inesperadamente

**Solução**:
- Implementar refresh token
- Ou aumentar tempo de expiração do JWT no backend
- Ou implementar renovação automática do token

---

#### 3. Câmera Não Funciona

**Sintoma**: Erro ao acessar câmera no scanner

**Soluções**:
1. Verificar permissões do navegador
2. HTTPS obrigatório em produção (MediaDevices só funciona em localhost ou HTTPS)
3. Verificar se outra aplicação está usando a câmera
4. Usar "Digitar Manualmente" como fallback

---

#### 4. Build Falha

**Sintoma**: `npm run build` retorna erro

**Soluções**:
1. Limpar cache:
   ```bash
   rm -rf .next
   rm -rf node_modules
   npm install
   npm run build
   ```

2. Verificar erros de TypeScript:
   ```bash
   npx tsc --noEmit
   ```

3. Verificar variáveis de ambiente:
   - Certifique-se que `.env.local` existe
   - Variáveis com `NEXT_PUBLIC_` devem estar definidas no build time

---

#### 5. Estilos Não Aplicam

**Sintoma**: Componentes sem estilos ou estilos quebrados

**Soluções**:
1. Verificar importação de `globals.css` no layout
2. Limpar cache do Next.js:
   ```bash
   rm -rf .next
   npm run dev
   ```
3. Verificar se variáveis CSS estão definidas em `:root` e `.dark`

---

#### 6. Erro 401 (Unauthorized)

**Sintoma**: Todas as requisições retornam 401

**Soluções**:
1. Verificar se token está no localStorage:
   ```javascript
   console.log(localStorage.getItem('token'));
   ```
2. Verificar se header `Authorization` está sendo enviado
3. Verificar se token não expirou
4. Fazer logout e login novamente

---

#### 7. Modal Não Fecha

**Sintoma**: Modal fica aberto mesmo ao clicar fora

**Solução**:
- Verificar se prop `onClose` está sendo passada
- Verificar se estado `isOpen` está sendo atualizado
- Verificar console do navegador por erros JavaScript

---

#### 8. Dados Desatualizados

**Sintoma**: Após criar/editar/excluir, tabela não atualiza

**Solução**:
- Chamar `loadData()` após operação bem-sucedida
- Verificar se `await loadData()` está sendo chamado
- Verificar console do navegador por erros na requisição

---

### Debug no Navegador

#### Console do Navegador
```javascript
// Ver dados do usuário logado
console.log(JSON.parse(localStorage.getItem('user')));

// Ver token
console.log(localStorage.getItem('token'));

// Testar requisição manual
fetch('http://localhost:4000/products', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(res => res.json())
  .then(console.log);
```

#### React DevTools
1. Instalar extensão React DevTools
2. Inspecionar componentes
3. Ver props e state
4. Ver contextos (AuthContext, ThemeContext)

#### Network Tab
1. Abrir DevTools → Network
2. Filtrar por XHR/Fetch
3. Ver requisições e respostas
4. Verificar headers
5. Verificar status codes

---

## 📞 Suporte e Contribuição

### Reportar Bugs

1. Verificar se já existe issue aberta
2. Criar nova issue no GitHub com:
   - Descrição do problema
   - Steps para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Informações do ambiente (navegador, OS, versão)

### Contribuir

1. Fork do repositório
2. Criar branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m 'feat: adiciona minha feature'`
4. Push: `git push origin feature/minha-feature`
5. Abrir Pull Request

### Convenções de Commit

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação (não afeta código)
refactor: refatoração de código
test: adicionar/modificar testes
chore: tarefas de manutenção
```

---

## 📚 Referências

### Documentação Oficial
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [MDN Web Docs](https://developer.mozilla.org)

### APIs Utilizadas
- [BarcodeDetector API](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector)
- [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Bibliotecas
- [ZXing Library](https://github.com/zxing-js/library)

---

## 📝 Changelog

### v1.0.0 (2025-12-02)
- ✅ Autenticação JWT completa
- ✅ CRUD de Produtos
- ✅ CRUD de Fornecedores
- ✅ Controle de Entrada/Saída de Estoque
- ✅ Dashboard com estatísticas
- ✅ Histórico de movimentações
- ✅ Scanner de código de barras com câmera
- ✅ Tema claro/escuro
- ✅ Interface responsiva
- ✅ Integração completa com backend
- ✅ Documentação completa

---

## 🏆 Créditos

**Desenvolvido por**: Equipe StockSync

**Frontend**: Next.js + React

**Backend**: Node.js + Express + PostgreSQL

**Design**: Custom UI com CSS Variables

---

## 📄 Licença

Este projeto é privado e todos os direitos são reservados.

---

**Última atualização**: 02/12/2025

**Versão da documentação**: 1.0.0
