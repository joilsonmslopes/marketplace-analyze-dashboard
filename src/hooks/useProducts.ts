import { type ProductSortOption } from "../types/product";
import { productService } from "../services/productService";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useProducts() {
    const queryClient = useQueryClient();
    const [sortOption, setSortOption] = useState<ProductSortOption>('NAME_ASC');
    const [page, setPage] = useState<number>(0)
    const { getAll, scrapeUrl } = productService();

    const {
        data: paginatedData,
        isLoading,
        isPlaceholderData,
        error,
        refetch
    } = useQuery({
        queryKey: ['products', sortOption, page],
        queryFn: () => getAll(page, 9, sortOption),
        placeholderData: keepPreviousData
    });

    const {
        mutateAsync: scrapeUrlMutate,
        isPending: scraping
    } = useMutation({
        mutationFn: scrapeUrl,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    })

    return {
        products: paginatedData?.content || [],
        totalPages: paginatedData?.totalPages || 0,
        isFetchingPage: isPlaceholderData,
        loading: isLoading,
        scraping,
        error: error instanceof Error ? error.message : null,
        scrapeUrlMutate,
        refetch,
        sortOption,
        setSortOption,
        page,
        setPage
    };
}