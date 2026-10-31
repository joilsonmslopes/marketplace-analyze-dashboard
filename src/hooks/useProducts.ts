import { useCallback, useEffect, useState } from "react";
import { type Product } from "../types/product";
import { productService } from "../services/productService";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [scraping, setScraping] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { getAll, scrapeUrl: productServiceScrapeUrl } = productService();

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAll();
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar produtos.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])

    const scrapeUrl = async (url: string) => {
        try {
            setScraping(true);
            setError(null);
            const newProduct = await productServiceScrapeUrl(url);
            setProducts((prev) => [newProduct, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Falha ao analisar o link informado.');
            throw err;
        } finally {
            setScraping(false);
        }
    };

    return {
        products,
        loading,
        scraping,
        error,
        scrapeUrl,
        refetch: fetchProducts
    };
}