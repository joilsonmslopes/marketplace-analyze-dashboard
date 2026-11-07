import { type ProductSortOption } from '../types/product';
import { productService } from '../services/productService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const PAGE_SIZE = 9;
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');

export function useProducts() {
    const [sortOption, setSortOption] = useState<ProductSortOption>('NAME_ASC');
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const { getAll } = productService();

    const { data, isLoading, error } = useQuery({
        queryKey: ['products', sortOption],
        queryFn: async () => {
            const firstPage = await getAll(0, 100, sortOption);
            const remainingPages = await Promise.all(
                Array.from({ length: Math.max(0, firstPage.totalPages - 1) }, (_, index) =>
                    getAll(index + 1, 100, sortOption)
                )
            );
            return firstPage.content.concat(...remainingPages.map((result) => result.content));
        },
    });

    const filteredProducts = (data ?? []).filter((product) =>
        normalize(product.name).includes(normalize(search.trim()))
    );
    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
    const currentPage = Math.min(page, Math.max(0, totalPages - 1));

    return {
        products: filteredProducts.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE),
        totalProducts: filteredProducts.length,
        totalPages,
        loading: isLoading,
        error: error instanceof Error ? error.message : null,
        sortOption,
        setSortOption: (value: ProductSortOption) => {
            setSortOption(value);
            setPage(0);
        },
        search,
        setSearch: (value: string) => {
            setSearch(value);
            setPage(0);
        },
        page: currentPage,
        setPage,
    };
}
