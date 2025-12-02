# 📷 Scanner de Código de Barras - Guia de Uso

## 🎯 Funcionalidades

O sistema StockSync agora possui scanner de código de barras integrado para facilitar:
1. **Busca de produtos** - Escanear para encontrar produtos rapidamente
2. **Cadastro de produtos** - Escanear ao criar novos produtos

## 🔍 Como Usar - Busca de Produtos

### Passo a Passo:

1. **Acesse a página de Produtos**
2. **Clique no botão** "🔍 Buscar por Código de Barras"
3. **Permita o acesso à câmera** quando o navegador solicitar
4. **Posicione o código de barras** dentro da área delimitada na tela
5. O sistema irá:
   - Detectar o código automaticamente
   - Buscar o produto no banco de dados
   - Abrir o modal de edição se encontrado
   - Mostrar erro se não encontrado

### Alternativas:
- Se a câmera não funcionar, clique em **"Digitar Manualmente"**
- Digite o código de barras e clique em **"🔍 Buscar"**

## ➕ Como Usar - Cadastro de Produtos

### Passo a Passo:

1. **Acesse a página de Produtos**
2. **Clique no botão** "➕ Novo Produto"
3. **No campo "Código de Barras"**, clique no botão **"📷 Escanear"**
4. **Permita o acesso à câmera** quando o navegador solicitar
5. **Posicione o código de barras** dentro da área delimitada
6. O código será automaticamente preenchido no formulário
7. Continue preenchendo os demais campos
8. Clique em **"Cadastrar"** para salvar

### Alternativas:
- Você pode digitar o código de barras manualmente no campo

## 🌐 Compatibilidade de Navegadores

### ✅ Suporte Nativo (Melhor Performance):
- **Google Chrome** 83+ (Desktop e Mobile)
- **Microsoft Edge** 83+
- **Samsung Internet** 15+
- **Chrome Android** 83+

### 🔧 Suporte com Polyfill (Performance Moderada):
- **Firefox** (todas as versões recentes)
- **Safari** (Desktop e iOS)
- **Opera**
- Outros navegadores modernos

## 📋 Formatos de Código de Barras Suportados

- **EAN-13** (padrão para produtos de varejo)
- **EAN-8** (versão curta)
- **Code 128** (uso industrial)
- **Code 39** (uso industrial)

## 🔒 Privacidade e Permissões

### Permissão de Câmera:
- O sistema solicita acesso à câmera apenas quando você clica em um botão de scanner
- A câmera é automaticamente desligada após a leitura ou fechamento do modal
- **Nenhuma imagem ou vídeo é gravado ou enviado para servidores**
- Todo o processamento acontece localmente no seu navegador

### Como Permitir Acesso à Câmera:

**Chrome/Edge:**
1. Quando solicitado, clique em "Permitir"
2. Se bloqueado anteriormente:
   - Clique no ícone de cadeado na barra de endereços
   - Encontre "Câmera" e selecione "Permitir"
   - Recarregue a página

**Firefox:**
1. Clique em "Permitir" quando solicitado
2. Se bloqueado:
   - Clique no ícone de escudo/cadeado
   - Gerencie permissões > Câmera > Permitir

**Safari:**
1. Vá em Safari > Preferências > Sites > Câmera
2. Encontre o site e selecione "Permitir"

## 💡 Dicas para Melhor Leitura

### ✅ FAÇA:
- Use boa iluminação
- Mantenha o código de barras limpo e nítido
- Posicione paralelamente à câmera (não em ângulo)
- Mantenha distância de 10-20cm da câmera
- Aguarde alguns segundos para detecção automática

### ❌ EVITE:
- Códigos borrados ou danificados
- Reflexo de luz diretamente no código
- Movimentação excessiva
- Ângulos muito inclinados
- Distância muito próxima ou muito longe

## 🐛 Solução de Problemas

### Problema: "Não foi possível acessar a câmera"
**Soluções:**
1. Verifique se você permitiu o acesso à câmera
2. Feche outros aplicativos/abas usando a câmera
3. Verifique se seu dispositivo possui câmera
4. Use "Digitar Manualmente" como alternativa

### Problema: "Código não está sendo detectado"
**Soluções:**
1. Melhore a iluminação do ambiente
2. Limpe a lente da câmera
3. Aproxime ou afaste o código de barras
4. Tente posicionar em ângulos diferentes
5. Use "Digitar Manualmente" se persistir

### Problema: "Seu navegador não suporta leitura de códigos"
**Soluções:**
1. Atualize seu navegador para a versão mais recente
2. Use Chrome, Edge ou Samsung Internet para melhor compatibilidade
3. Use "Digitar Manualmente" como alternativa

## 📱 Uso em Dispositivos Móveis

### Melhor Experiência:
- **Chrome Android** ou **Safari iOS**
- Permite usar a câmera traseira automaticamente
- Ideal para escanear produtos físicos

### Dicas Mobile:
- Segure o dispositivo firme
- Use ambas as mãos se necessário
- A câmera traseira geralmente tem melhor qualidade
- Funciona bem em tablets também

## 🔧 Modo Manual (Fallback)

Se o scanner não funcionar no seu dispositivo ou navegador:

### Busca Manual:
1. Clique em "🔍 Buscar por Código de Barras"
2. Clique em "Digitar Manualmente"
3. Digite o código de barras completo
4. Pressione Enter ou clique em "🔍 Buscar"

### Cadastro Manual:
1. Clique em "➕ Novo Produto"
2. Digite o código de barras no campo
3. Continue preenchendo o formulário normalmente

## 📊 Códigos de Barras EAN-13

O formato principal usado no sistema é **EAN-13**:
- 13 dígitos numéricos
- Exemplo: `7891234567890`
- Usado globalmente para produtos de varejo
- Primeiros 3 dígitos = país (789 = Brasil)
- Próximos dígitos = fabricante e produto
- Último dígito = verificador

## 🎓 FAQ

**P: O scanner funciona offline?**
R: Sim! O scanner funciona localmente no navegador. Apenas a busca/cadastro no banco requer internet.

**P: Posso usar em computador sem câmera?**
R: Não, mas você pode usar "Digitar Manualmente".

**P: O scanner funciona com QR Code?**
R: Não, apenas códigos de barras lineares (EAN, Code128, etc).

**P: Quantos produtos posso escanear?**
R: Ilimitado! Não há limite de escaneamentos.

**P: O scanner salva fotos?**
R: Não! Nenhuma imagem é salva ou transmitida. Apenas o código detectado é usado.

## 🆘 Suporte

Se encontrar problemas:
1. Verifique este guia primeiro
2. Tente usar "Digitar Manualmente"
3. Atualize seu navegador
4. Entre em contato com o suporte técnico
