# 💙 Marketplace Analyzer - Dashboard (Frontend)

> Interface analítica moderna para visualização de métricas de inteligência competitiva e extração de insights de produtos e-commerce.

## 🚀 Tecnologias e Stack

* **Biblioteca Core:** React 18
* **Linguagem:** TypeScript (Strict Mode)
* **Build Tool:** Vite
* **UI/UX Framework:** Material-UI (MUI v6)
* **Ícones:** Lucide React / MUI Icons

## 🧠 Decisões Arquiteturais e de Engenharia

O frontend foi estruturado visando separação de responsabilidades (SoC), performance de renderização e manutenibilidade a longo prazo:

1. **Desacoplamento com Custom Hooks (`useProducts`):**
   * **O Problema:** Misturar lógica de *fetch* (HTTP), gerenciamento de estados (`loading`, `error`) e interface de usuário no mesmo arquivo (ex: `App.tsx`) cria componentes inflados (Spaghetti Code).
   * **A Solução:** Toda a regra de negócio e chamadas de rede foram isoladas no hook customizado `useProducts`. O componente visual agora apenas consome dados formatados, facilitando a criação de testes unitários no futuro.

2. **Adoção do Padrão MUI v6 (Modern Layout):**
   * Migração de padrões legados do Material-UI. O projeto já utiliza a nova API unificada de `<Grid size={{ xs: 12, sm: 6 }}>`, garantindo compatibilidade com versões futuras e layout responsivo seguro.

3. **Otimização de Renderização (`useMemo`):**
   * A contagem de sentimentos e o cálculo da porcentagem de aprovação no `ProductCard` foram envelopados em `useMemo`. Isso previne cálculos desnecessários e recálculos pesados caso ocorram re-renderizações por mudanças de estados paralelos.

4. **Tipagem Estrita e Type-Safety:**
   * Abandono de antipadrões como `React.FC` e `React.FormEvent`. O projeto utiliza tipagem forte (Interfaces `Product`, `Rating`) desde a camada de serviço HTTP até as props dos componentes, garantindo previsibilidade total dos dados fornecidos pelo backend Java.

## ⚙️ Como Executar Localmente

### Pré-requisitos
* Node.js (v18+)
* npm ou yarn
* Backend Spring Boot rodando na porta `8080`

### Configuração
1. Acesse a pasta do frontend:
   ```bash
   cd marketplace-analyzer/frontend
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento via Vite:
   ```bash
   npm run dev
   ```
   Acesse o Dashboard no navegador através de `http://localhost:5173`.