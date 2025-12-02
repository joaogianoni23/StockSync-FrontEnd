# 🚀 StockSync - Frontend# 📦 StockSync - Sistema de Gestão de Estoque



Sistema de Gestão de Estoque desenvolvido com Next.js e integrado com API REST.Sistema profissional de gestão de estoque desenvolvido com Next.js 15, TypeScript e design minimalista.



## 📋 Sobre o Projeto## 🎨 Design



StockSync é uma aplicação web moderna para gerenciamento de estoque, permitindo controle completo de produtos, fornecedores e movimentações de entrada/saída.### Paleta de Cores

- **#AF8762** — Marrom claro (cor principal)

## ✨ Funcionalidades- **#F0E5C9** — Bege claro (fundo e áreas neutras)

- **#000000** — Preto (texto e modo escuro)

- ✅ **Autenticação de Usuários** - Login com JWT Token

- 📦 **Gestão de Produtos** - CRUD completo de produtos### Tipografia

- 🏭 **Gestão de Fornecedores** - Cadastro e gerenciamento de fornecedores- **Fonte Arimo** — Usada em todo o sistema

- 📥 **Entrada de Estoque** - Registro de entradas com atualização automática

- 📤 **Saída de Estoque** - Registro de saídas com validação de estoque### Modos de Tema

- 📊 **Dashboard** - Visão geral com estatísticas e alertas- **Modo Claro**: Fundo bege, botões marrom, texto preto

- 📋 **Histórico** - Relatório completo de todas as movimentações- **Modo Escuro**: Fundo preto, texto bege, destaques marrom claro

- 🔔 **Alertas** - Notificações de produtos com estoque baixo

## 🚀 Funcionalidades

## 🛠️ Tecnologias Utilizadas

### Para Admin/Gerente

- **Next.js 15** - Framework React- ✅ **Tela de Login** - Autenticação segura

- **React 18** - Biblioteca JavaScript- ✅ **Dashboard** - Visão geral com valor total do estoque e alertas

- **API REST** - Integração com backend Node.js- ✅ **Gestão de Produtos** - CRUD completo (Criar, Ler, Atualizar, Deletar)

- **LocalStorage** - Armazenamento de token e dados do usuário- ✅ **Gestão de Fornecedores** - CRUD completo

- **CSS Modules** - Estilização componentizada- ✅ **Histórico de Movimentações** - Registro de entradas e saídas



## 📦 Instalação### Para Estoquista

- ✅ **Registrar Entrada** - Formulário para compras e devoluções

### Pré-requisitos- ✅ **Registrar Saída** - Formulário para vendas e perdas



- Node.js 18+ instalado## 👤 Usuários de Teste

- Backend da API rodando (http://localhost:4000)

### Administrador

### Passos- **Email**: admin@stocksync.com

- **Senha**: admin123

1. **Clone o repositório**

```bash### Gerente

git clone <url-do-repositorio>- **Email**: gerente@stocksync.com

cd StockSync-FrontEnd- **Senha**: gerente123

```

### Estoquista

2. **Instale as dependências**- **Email**: estoquista@stocksync.com

```bash- **Senha**: estoquista123

npm install

```## 🛠️ Tecnologias Utilizadas



3. **Configure as variáveis de ambiente**- **Next.js 15** - Framework React

- **TypeScript** - Tipagem estática

Crie um arquivo `.env.local` na raiz do projeto:- **React Context API** - Gerenciamento de estado

```env- **CSS Custom Properties** - Temas dinâmicos

NEXT_PUBLIC_API_URL=http://localhost:4000- **Font Arimo** - Tipografia profissional

```

## 📦 Instalação e Execução

4. **Inicie o servidor de desenvolvimento**

```bash1. Instale as dependências:

npm run dev```bash

```npm install

```

5. **Acesse a aplicação**

2. Execute o servidor de desenvolvimento:

Abra seu navegador em [http://localhost:3000](http://localhost:3000)```bash

npm run dev

## 🔐 Usuários de Teste```



A API vem com usuários pré-cadastrados:3. Acesse no navegador:

```

| Email | Senha | Função |http://localhost:3000

|-------|-------|--------|```

| admin@stocksync.com | 123456 | Administrador |

| maria.estoquista@stocksync.com | 123456 | Estoquista |## 📁 Estrutura do Projeto



## 🗂️ Estrutura do Projeto```

nome-do-projeto/

```├── app/

StockSync-FrontEnd/│   ├── dashboard/        # Dashboard admin

├── app/                      # Páginas da aplicação│   ├── produtos/         # Gestão de produtos

│   ├── dashboard/           # Dashboard com estatísticas│   ├── fornecedores/     # Gestão de fornecedores

│   ├── produtos/            # Gestão de produtos│   ├── historico/        # Histórico de movimentações

│   ├── fornecedores/        # Gestão de fornecedores│   ├── entrada/          # Registro de entrada

│   ├── entrada/             # Registro de entradas│   ├── saida/            # Registro de saída

│   ├── saida/               # Registro de saídas│   ├── login/            # Tela de login

│   ├── historico/           # Histórico de movimentações│   ├── layout.tsx        # Layout principal

│   └── login/               # Página de login│   ├── page.tsx          # Página inicial (redireciona)

├── components/              # Componentes reutilizáveis│   └── globals.css       # Estilos globais

│   ├── Alert.jsx           # Alertas e notificações├── components/

│   ├── AuthLayout.jsx      # Layout com autenticação│   ├── Alert.tsx         # Componente de alerta

│   ├── Button.jsx          # Botões│   ├── AuthLayout.tsx    # Layout autenticado

│   ├── Card.jsx            # Cards│   ├── Button.tsx        # Componente de botão

│   ├── Input.jsx           # Inputs│   ├── Card.tsx          # Componente de card

│   ├── Loading.jsx         # Loading spinner│   ├── Input.tsx         # Componente de input

│   ├── Modal.jsx           # Modais│   ├── Modal.tsx         # Componente de modal

│   ├── Select.jsx          # Selects│   ├── Select.tsx        # Componente de select

│   ├── Sidebar.jsx         # Menu lateral│   ├── Sidebar.tsx       # Barra lateral de navegação

│   └── Table.jsx           # Tabelas│   └── Table.tsx         # Componente de tabela

├── contexts/                # Contexts do React└── contexts/

│   ├── AuthContext.jsx     # Context de autenticação    ├── AuthContext.tsx   # Contexto de autenticação

│   └── ThemeContext.jsx    # Context de tema    └── ThemeContext.tsx  # Contexto de tema

├── services/                # Serviços e APIs```

│   └── api.js              # Cliente da API REST

└── .env.local              # Variáveis de ambiente## 🎯 Rotas

```

- `/` - Redireciona para login ou dashboard

## 🔌 Integração com a API- `/login` - Tela de login

- `/dashboard` - Dashboard (Admin/Gerente)

### Configuração- `/produtos` - Gestão de produtos (Admin/Gerente)

- `/fornecedores` - Gestão de fornecedores (Admin/Gerente)

O serviço de API (`services/api.js`) centraliza todas as chamadas HTTP:- `/historico` - Histórico de movimentações (Admin/Gerente)

- `/entrada` - Registrar entrada (Estoquista)

```javascript- `/saida` - Registrar saída (Estoquista)

import { productsAPI, suppliersAPI, stockMovementsAPI } from '@/services/api';

## 🔒 Controle de Acesso

// Exemplo: Listar produtos

const produtos = await productsAPI.getAll();O sistema possui controle de acesso baseado em roles:



// Exemplo: Criar fornecedor- **Admin/Gerente**: Acesso completo a todas as funcionalidades

await suppliersAPI.create({- **Estoquista**: Acesso apenas aos formulários de entrada e saída

  nome: 'Fornecedor Teste',

  cnpj: '12345678/0001-90',## 🌓 Modo Escuro/Claro

  contato: '(11) 98765-4321'

});O sistema possui alternância entre modo claro e escuro:

- Use o botão na barra lateral para alternar

// Exemplo: Registrar entrada- A preferência é salva no localStorage

await stockMovementsAPI.create({

  tipo: 'entrada',## 📱 Responsividade

  quantidade: 10,

  produtoId: 1O sistema é totalmente responsivo e funciona bem em:

});- 💻 Desktop

```- 📱 Tablets

### Endpoints Disponíveis

#### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Registro
- `GET /auth/users` - Listar usuários

#### Fornecedores
- `GET /suppliers` - Listar fornecedores
- `GET /suppliers/:id` - Buscar por ID
- `POST /suppliers` - Criar fornecedor
- `PUT /suppliers/:id` - Atualizar fornecedor
- `DELETE /suppliers/:id` - Excluir fornecedor

#### Produtos
- `GET /products` - Listar produtos
- `GET /products/:id` - Buscar por ID
- `GET /products/barcode/:barcode` - Buscar por código de barras
- `POST /products` - Criar produto
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Excluir produto

#### Movimentações
- `GET /stockmovements` - Listar movimentações
- `GET /stockmovements/:id` - Buscar por ID
- `POST /stockmovements` - Criar movimentação
- `DELETE /stockmovements/:id` - Excluir movimentação

#### Dashboard
- `GET /dashboard` - Obter dados do dashboard

## 🎨 Temas

O sistema suporta tema claro e escuro. O tema é controlado pelo `ThemeContext`.

## 🔒 Permissões

### Admin
- ✅ Todas as funcionalidades
- ✅ Criar/Editar/Excluir produtos
- ✅ Criar/Editar/Excluir fornecedores
- ✅ Registrar entradas/saídas
- ✅ Ver dashboard e histórico

### Estoquista
- ✅ Ver produtos e fornecedores
- ✅ Registrar entradas/saídas
- ✅ Ver dashboard e histórico
- ❌ Criar/Editar/Excluir produtos e fornecedores

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Linting
npm run lint
```

## 🐛 Tratamento de Erros

A aplicação inclui tratamento de erros em todas as chamadas à API:

- **401 Unauthorized** - Redireciona para login
- **403 Forbidden** - Exibe alerta de permissão negada
- **404 Not Found** - Exibe alerta de recurso não encontrado
- **500 Internal Server Error** - Exibe erro genérico

## 🚀 Deploy

### Build de Produção

```bash
npm run build
npm start
```

### Variáveis de Ambiente para Produção

```env
NEXT_PUBLIC_API_URL=https://sua-api.com
```

## 📚 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 👥 Desenvolvedores

- **Alexandra** - Desenvolvimento
- **Gabriela** - Desenvolvimento
- **Pablo** - Desenvolvimento

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento

---

Desenvolvido com ❤️ pela equipe StockSync
