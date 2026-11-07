import type { ProductSortOption } from '../types/product';
import { productService } from '../services/productService';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { filterProducts, type SentimentFilter } from '../utils/products';

const PAGE_SIZE = 12;
const service = productService();

export function useProducts() {
  const [sortOption, setSort] = useState<ProductSortOption>('NAME_ASC');
  const [page, setPage] = useState(0);
  const [search, setSearchValue] = useState('');
  const [sentiment, setSentimentValue] = useState<SentimentFilter>('');
  const { data, isPending, isFetching, error, refetch, dataUpdatedAt } =
    useQuery({
      queryKey: ['products'],
      queryFn: async ({ signal }) => {
        const first = await service.getAll(0, 100, 'NAME_ASC', signal);
        const products = [...first.content];
        for (let page = 1; page < first.totalPages; page += 1) {
          const result = await service.getAll(page, 100, 'NAME_ASC', signal);
          products.push(...result.content);
        }
        return products;
      },
      staleTime: 30000,
      refetchOnWindowFocus: true,
      refetchInterval: 60000,
    });
  const filteredProducts = useMemo(
    () => filterProducts(data ?? [], search, sentiment, sortOption),
    [data, search, sentiment, sortOption],
  );
  const ratings = useMemo(
    () => filteredProducts.flatMap((product) => product.ratings ?? []),
    [filteredProducts],
  );
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(0, totalPages - 1));
  return {
    products: filteredProducts.slice(
      currentPage * PAGE_SIZE,
      (currentPage + 1) * PAGE_SIZE,
    ),
    ratings,
    totalProducts: filteredProducts.length,
    allProductsCount: data?.length ?? 0,
    hasData: data !== undefined,
    totalPages,
    loading: isPending && isFetching,
    refreshing: isFetching,
    error: error instanceof Error ? error.message : null,
    refresh: () => {
      void refetch();
    },
    updatedAt: dataUpdatedAt,
    sortOption,
    setSortOption: (value: ProductSortOption) => {
      setSort(value);
      setPage(0);
    },
    sentiment,
    setSentiment: (value: SentimentFilter) => {
      setSentimentValue(value);
      setPage(0);
    },
    search,
    setSearch: (value: string) => {
      setSearchValue(value);
      setPage(0);
    },
    resetFilters: () => {
      setSearchValue('');
      setSentimentValue('');
      setSort('NAME_ASC');
      setPage(0);
    },
    page: currentPage,
    setPage,
  };
}
