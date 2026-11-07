import type { Product, ProductSortOption } from '../types/product';
import type { Rating } from '../types/rating';

export const sentimentLabels = {
  POSITIVO: 'Positivo',
  NEGATIVO: 'Negativo',
  NEUTRO: 'Neutro',
  MISTO: 'Misto',
  SEM_ANALISE: 'Sem análise',
};
export type ProductSentiment = keyof typeof sentimentLabels;
export type SentimentFilter = ProductSentiment | '';
export const sentimentColors = {
  POSITIVO: 'success',
  NEGATIVO: 'error',
  NEUTRO: 'default',
  MISTO: 'warning',
  SEM_ANALISE: 'default',
} as const;
export function sentimentMetrics(ratings: Rating[] = []) {
  const counts = { POSITIVO: 0, NEGATIVO: 0, NEUTRO: 0 };
  for (const rating of ratings ?? []) {
    const key = String(rating.sentiment ?? '').toUpperCase();
    if (Object.hasOwn(counts, key)) counts[key as keyof typeof counts] += 1;
  }
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const maximum = Math.max(...Object.values(counts));
  const winners = (Object.keys(counts) as (keyof typeof counts)[]).filter(
    (key) => counts[key] === maximum,
  );
  const dominant: ProductSentiment = !total
    ? 'SEM_ANALISE'
    : winners.length === 1
      ? winners[0]
      : 'MISTO';
  return { counts, total, dominant };
}
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
export function filterProducts(
  products: Product[],
  search: string,
  sentiment: SentimentFilter,
  sort: ProductSortOption,
) {
  return products
    .filter(
      (product) =>
        normalize(product.name).includes(normalize(search.trim())) &&
        (!sentiment ||
          sentimentMetrics(product.ratings).dominant === sentiment),
    )
    .sort((a, b) =>
      sort === 'PRICE_ASC'
        ? Number(a.currentPrice) - Number(b.currentPrice)
        : sort === 'PRICE_DESC'
          ? Number(b.currentPrice) - Number(a.currentPrice)
          : sort === 'NAME_DESC'
            ? b.name.localeCompare(a.name, 'pt-BR')
            : a.name.localeCompare(b.name, 'pt-BR'),
    );
}
export function safeProductLink(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      (url.hostname === 'mercadolivre.com.br' ||
        url.hostname.endsWith('.mercadolivre.com.br'))
      ? url.href
      : null;
  } catch {
    return null;
  }
}
export const money = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    Number(value) || 0,
  );
