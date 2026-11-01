import { type Product } from "../types/product";
import { productService } from "../services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts() {
    const queryClient = useQueryClient();
    const { getAll, scrapeUrl } = productService();

    const {
        data: products = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['products'],
        queryFn: getAll
    });

    const {
        mutateAsync: scrapeUrlMutate,
        isPending: scraping
    } = useMutation({
        mutationFn: scrapeUrl,
        onSuccess: (newProduct) => {
            queryClient.setQueryData<Product[]>(['products'], (old = []) => [newProduct, ...old]);
        }
    })

    return {
        products,
        loading: isLoading,
        scraping,
        error: error instanceof Error ? error.message : null,
        scrapeUrlMutate,
        refetch
    };
}