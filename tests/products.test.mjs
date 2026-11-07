import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProducts, safeProductLink, sentimentMetrics, money } from '../src/utils/products.ts';

const products = [
  { id: 1, name: 'Câmera B', currentPrice: 200, ratings: [{ sentiment: 'POSITIVO' }, { sentiment: 'Positivo' }, { sentiment: 'NEGATIVO' }] },
  { id: 2, name: 'Câmera A', currentPrice: 90, ratings: [{ sentiment: 'POSITIVO' }, { sentiment: 'NEGATIVO' }] },
  { id: 3, name: 'Mouse', currentPrice: 30, ratings: [] },
];
test('empates e ausência de avaliações têm filtros distintos', () => {
  assert.equal(sentimentMetrics(products[1].ratings).dominant, 'MISTO');
  assert.equal(sentimentMetrics(products[2].ratings).dominant, 'SEM_ANALISE');
  assert.equal(sentimentMetrics([{ sentiment: 'DESCONHECIDO' }]).total, 0);
});
test('busca ignora acentos, caixa e espaços e combina com sentimento', () => {
  const result = filterProducts(products, ' CAMERA ', 'POSITIVO', 'PRICE_ASC');
  assert.deepEqual(result.map(product => product.id), [1]);
  assert.deepEqual(filterProducts(products, '', 'MISTO', 'NAME_ASC').map(product => product.id), [2]);
  assert.deepEqual(filterProducts(products, '', 'SEM_ANALISE', 'NAME_ASC').map(product => product.id), [3]);
});
test('ordena numericamente por preço sem alterar os dados armazenados', () => {
  assert.deepEqual(filterProducts(products, '', '', 'PRICE_ASC').map(product => product.id), [3, 2, 1]);
  assert.deepEqual(filterProducts(products, '', '', 'PRICE_DESC').map(product => product.id), [1, 2, 3]);
  assert.deepEqual(products.map(product => product.id), [1, 2, 3]);
});
test('indicadores abrangem todos os resultados filtrados', () => {
  const filtered = filterProducts(products, 'camera', '', 'NAME_ASC');
  assert.equal(sentimentMetrics(filtered.flatMap(product => product.ratings)).total, 5);
  assert.equal(filterProducts(products, 'inexistente', '', 'NAME_ASC').length, 0);
});
test('links não permitem protocolos executáveis ou domínios semelhantes', () => {
  for (const value of ['javascript:alert(1)', 'https://mercadolivre.com.br.exemplo.com', 'https://example.com', 'não é URL']) assert.equal(safeProductLink(value), null);
  assert.ok(safeProductLink('https://produto.mercadolivre.com.br/MLB-123'));
});
test('preço usa moeda brasileira e centavos', () => {
  assert.match(money(1234.5), /1\.234,50/);
});
