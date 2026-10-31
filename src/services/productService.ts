import type { Product } from "../types/product";

const BASE_URL = 'http://localhost:8080/api/products';

export function productService() {
    async function getAll(): Promise<Product[]> {
        const response = await fetch(`${BASE_URL}/all`);

        if (!response.ok) {
            throw new Error("Falha ao buscar produtos do servidor.")
        }

        return response.json();
    }

    async function scrapeUrl(url: string): Promise<Product> {
        const response = await fetch(`${BASE_URL}/scrape?url=${encodeURIComponent(url)}`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error("Erro ao processar e raspar o produto.");
        }

        return response.json();
    }

    return {
        getAll,
        scrapeUrl
    }
}