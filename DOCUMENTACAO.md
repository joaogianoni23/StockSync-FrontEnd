# 📚 Documentação Resumida — StockSync Frontend

## Visão Geral
StockSync é um frontend em Next.js 15 + React 18 para gerenciamento de estoque com autenticação JWT, CRUD de produtos/fornecedores, controle de entradas/saídas, dashboard e scanner de código de barras. Responsivo e com tema claro/escuro.

## Tecnologias
- Next.js 15, React 18
- TypeScript, ESLint
- BarcodeDetector API + @zxing/library (polyfill)
- Variável: NEXT_PUBLIC_API_URL

## Estrutura (principal)
- app/ (rotas: login, dashboard, produtos, fornecedores, entrada, saida, historico)
- components/ (Alert, AuthLayout, BarcodeScanner, Button, Card, Input, Modal, Select, Sidebar, Table)
- contexts/ (AuthContext, ThemeContext)
- services/api.js (clients: authAPI, productsAPI, suppliersAPI, stockMovementsAPI, dashboardAPI)

## Instalação Rápida
1. git clone ... && cd StockSync-FrontEnd
2. npm install
3. echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
4. npm run dev
Acesse: http://localhost:3000

## Fluxo de Autenticação
- POST /auth/login → recebe JWT → salva em localStorage → headers Authorization
- Validação: GET /auth/validate
- AuthLayout protege rotas e verifica roles (admin / estoquista)

## Principais Páginas
- /login: autenticação
- /dashboard: estatísticas (admin)
- /produtos: listagem, busca, CRUD, scanner (EAN-13, EAN-8, Code128, Code39)
- /fornecedores: CRUD
- /entrada e /saida: registrar movimentações
- /historico: listar e filtrar movimentações

## APIs principais (via services/api.js)
- authAPI: /auth/login, /auth/validate
- productsAPI: /products, /products/barcode/:barcode
- suppliersAPI: /suppliers
- stockMovementsAPI: /stock-movements, /entry, /exit
- dashboardAPI: /dashboard/stats

## Scanner de Código de Barras
- Usa BarcodeDetector nativo ou ZXing como fallback
- Funcionalidades: leitura por câmera, fallback para digitação manual, preferencialmente câmera traseira, processamento local (sem upload)

## Deploy (resumo)
- npm run build && npm run start
- Recomendado: Vercel (configurar NEXT_PUBLIC_API_URL)
- Docker disponível (Dockerfile + docker-compose)

## Troubleshooting Rápido
- CORS: configurar backend para permitir origem
- Token expirado: implementar refresh token
- Câmera: HTTPS em produção ou permitir permissão no navegador
- Build falha: limpar .next e node_modules; checar TypeScript

## Contato e Contribuição
- Reportar issues no GitHub com steps e ambiente
- Fork → branch → PR
- Convenção de commits: feat/fix/docs/test/chore

Última atualização: 02/12/2025 — Versão 1.0.0
