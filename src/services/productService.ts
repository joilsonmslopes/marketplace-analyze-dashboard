import type { Product } from "../types/product";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const BASE_URL = 'http://localhost:8080/api/products';

export function productService() {
    async function getAll(): Promise<Product[]> {
        const response = await fetch(`${BASE_URL}/all`);

        if (!response.ok) {
            const errorMessage = await extractErrorMessage(response, "Falha ao buscar produtos do servidor.")
            throw new Error(errorMessage)
        }

        return response.json();
    }

    async function scrapeUrl(url: string): Promise<Product> {
        const response = await fetch(`${BASE_URL}/scrape?url=${encodeURIComponent(url)}`, {
            method: 'POST'
        });

        if (!response.ok) {
            const errorMessage = await extractErrorMessage(response, "Erro ao processar e raspar o produto.")
            throw new Error(errorMessage);
        }

        return response.json();
    }

    return {
        getAll,
        scrapeUrl
    }
}