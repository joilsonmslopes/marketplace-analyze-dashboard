import { type ProductSortOption } from "../types/product";
import { productService } from "../services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useProducts() {
    const queryClient = useQueryClient();
    const [sortOption, setSortOption] = useState<ProductSortOption>('NAME_ASC');
    const { getAll, scrapeUrl } = productService();

    const {
        data: products = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['products', sortOption],
        queryFn: () => getAll(sortOption)
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
        products,
        loading: isLoading,
        scraping,
        error: error instanceof Error ? error.message : null,
        scrapeUrlMutate,
        refetch,
        sortOption,
        setSortOption
    };
}