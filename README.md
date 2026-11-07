# Analisador ML — Dashboard web

Interface React 19 + TypeScript + Material-UI 9 + Emotion, com Vite 8 e TanStack Query. O visual e as funcionalidades de exibição acompanham o Dashboard de `analisador-extensao`, mantendo repositórios e builds independentes.

## Funcionalidades

- Cards com título, preço em reais, sentimento predominante e distribuição das avaliações.
- Busca por nome sem distinção de acentos ou caixa.
- Filtros por positivo, negativo, neutro, misto e sem análise.
- Ordenação por nome e preço, botão para limpar filtros e paginação de 12 produtos.
- Indicadores e gráficos sobre todos os produtos filtrados, incluindo os que estão em outras páginas da interface.
- Modal com detalhes, comentários originais e classificações retornadas pela análise Gemini.
- Links HTTPS validados para anúncios do Mercado Livre.
- Atualização manual, a cada minuto com a página visível, e ao retornar à janela quando os dados estão desatualizados.
- Carregamento, erros com nova tentativa e estados vazios; erros de atualização preservam os últimos dados carregados.
- Layout responsivo, Roboto local e tema azul equivalente ao da extensão.

O sentimento predominante corresponde à maior contagem de classificações reconhecidas. Empates são “Misto”; ausência de classificações é “Sem análise”.

## Executar

Use Node.js 24 e npm. Não há dependências novas para esta modernização.

```powershell
cd C:\www\analisador-mercado\marketplace-dashboard
npm.cmd ci
npm.cmd run dev
```

Configure `VITE_API_URL` no `.env` com a URL pública do backend, incluindo `/api`, por exemplo `http://localhost:8080/api`. Sem configuração, o serviço usa `https://analisador-api-agjp.onrender.com/api`. Autorize a origem do frontend no CORS do Spring Boot quando usar outra origem. Não coloque credenciais privadas em variáveis `VITE_*`.

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

O build gera `dist/`. O comando de teste usa o suporte nativo do Node 24 para TypeScript, sem instalar outro runner.

## Organização

- `src/theme.ts`: tema Material-UI.
- `src/components/ProductCard.tsx`: card e diálogo de detalhes.
- `src/components/ProductFilters.tsx`: busca, sentimento e ordenação.
- `src/components/SentimentBadge.tsx` e `SentimentChart.tsx`: apresentação de sentimentos compartilhada entre cards e detalhes; o gráfico também aparece no resumo.
- `src/utils/products.ts`: métricas, filtros, ordenação, moeda e validação de links.
- `src/hooks/useProducts.ts`: cache, atualização, consulta de todas as páginas e paginação visual.
- `src/services/productService.ts`: cliente HTTP com cancelamento e timeout de 55 segundos por página.

O serviço usa exclusivamente `GET /api/products/all?page=…&size=100&sort=NAME_ASC`. As páginas são carregadas sequencialmente e armazenadas no cache; busca e ordenação não provocam novas consultas. O backend continua responsável pela persistência e análise. Não há mocks no aplicativo nem acesso direto ao Supabase ou Gemini.

## Limites e validação

A API atual não retorna imagens. As imagens locais da extensão não são acessíveis ao site; por isso os cards exibem “Imagem indisponível”. A atualização do site consulta a API periodicamente, sem depender de mensagens `chrome.*` ou do build da extensão. Grandes bases podem exigir filtros no servidor futuramente.

Para conferir manualmente: colete um anúncio pela extensão, abra o site e atualize os produtos. Combine busca e sentimento, alterne a ordem dos preços e navegue entre páginas. Confira os comentários pelo botão de detalhes, o anúncio original, filtros sem resultados e uma consulta com o backend indisponível.

Validação automatizada: seis testes de sentimentos, filtros combinados, preços, totais filtrados e links seguros aprovados. TypeScript e build Vite aprovados; há aviso de bundle maior que 500 kB. O servidor local respondeu HTTP 200. A inspeção visual automatizada não foi possível porque o host de acesso ao navegador está indisponível.
