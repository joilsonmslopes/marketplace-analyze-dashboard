import type { PageResponse } from "../types/pageResponse";
import type { Product, ProductSortOption } from "../types/product";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const BASE_URL = `${import.meta.env.VITE_API_URL}/products`;

export function productService() {
    async function getAll(
        page: number = 0,
        size: number = 9,
        sort: ProductSortOption = 'NAME_ASC'
    ): Promise<PageResponse<Product>> {
        const response = await fetch(`${BASE_URL}/all?page=${page}&size=${size}&sort=${sort}`);

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