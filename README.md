# 📦 StockSync - Sistema de Gestão de Estoque

Sistema profissional de gestão de estoque desenvolvido com Next.js 15, TypeScript e design minimalista.

## 🎨 Design

### Paleta de Cores
- **#AF8762** — Marrom claro (cor principal)
- **#F0E5C9** — Bege claro (fundo e áreas neutras)
- **#000000** — Preto (texto e modo escuro)

### Tipografia
- **Fonte Arimo** — Usada em todo o sistema

### Modos de Tema
- **Modo Claro**: Fundo bege, botões marrom, texto preto
- **Modo Escuro**: Fundo preto, texto bege, destaques marrom claro

## 🚀 Funcionalidades

### Para Admin/Gerente
- ✅ **Tela de Login** - Autenticação segura
- ✅ **Dashboard** - Visão geral com valor total do estoque e alertas
- ✅ **Gestão de Produtos** - CRUD completo (Criar, Ler, Atualizar, Deletar)
- ✅ **Gestão de Fornecedores** - CRUD completo
- ✅ **Histórico de Movimentações** - Registro de entradas e saídas

### Para Estoquista
- ✅ **Registrar Entrada** - Formulário para compras e devoluções
- ✅ **Registrar Saída** - Formulário para vendas e perdas

## 👤 Usuários de Teste

### Administrador
- **Email**: admin@stocksync.com
- **Senha**: admin123

### Gerente
- **Email**: gerente@stocksync.com
- **Senha**: gerente123

### Estoquista
- **Email**: estoquista@stocksync.com
- **Senha**: estoquista123

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **React Context API** - Gerenciamento de estado
- **CSS Custom Properties** - Temas dinâmicos
- **Font Arimo** - Tipografia profissional

## 📦 Instalação e Execução

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
nome-do-projeto/
├── app/
│   ├── dashboard/        # Dashboard admin
│   ├── produtos/         # Gestão de produtos
│   ├── fornecedores/     # Gestão de fornecedores
│   ├── historico/        # Histórico de movimentações
│   ├── entrada/          # Registro de entrada
│   ├── saida/            # Registro de saída
│   ├── login/            # Tela de login
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página inicial (redireciona)
│   └── globals.css       # Estilos globais
├── components/
│   ├── Alert.tsx         # Componente de alerta
│   ├── AuthLayout.tsx    # Layout autenticado
│   ├── Button.tsx        # Componente de botão
│   ├── Card.tsx          # Componente de card
│   ├── Input.tsx         # Componente de input
│   ├── Modal.tsx         # Componente de modal
│   ├── Select.tsx        # Componente de select
│   ├── Sidebar.tsx       # Barra lateral de navegação
│   └── Table.tsx         # Componente de tabela
└── contexts/
    ├── AuthContext.tsx   # Contexto de autenticação
    └── ThemeContext.tsx  # Contexto de tema
```

## 🎯 Rotas

- `/` - Redireciona para login ou dashboard
- `/login` - Tela de login
- `/dashboard` - Dashboard (Admin/Gerente)
- `/produtos` - Gestão de produtos (Admin/Gerente)
- `/fornecedores` - Gestão de fornecedores (Admin/Gerente)
- `/historico` - Histórico de movimentações (Admin/Gerente)
- `/entrada` - Registrar entrada (Estoquista)
- `/saida` - Registrar saída (Estoquista)

## 🔒 Controle de Acesso

O sistema possui controle de acesso baseado em roles:

- **Admin/Gerente**: Acesso completo a todas as funcionalidades
- **Estoquista**: Acesso apenas aos formulários de entrada e saída

## 🌓 Modo Escuro/Claro

O sistema possui alternância entre modo claro e escuro:
- Use o botão na barra lateral para alternar
- A preferência é salva no localStorage

## 📱 Responsividade

O sistema é totalmente responsivo e funciona bem em:
- 💻 Desktop
- 📱 Tablets