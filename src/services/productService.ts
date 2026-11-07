import type { PageResponse } from '../types/pageResponse';
import type { Product, ProductSortOption } from '../types/product';
import { extractErrorMessage } from '../utils/extractErrorMessage';

const BASE_URL = `${(import.meta.env.VITE_API_URL || 'https://analisador-api-agjp.onrender.com/api').replace(/\/$/, '')}/products`;

export function productService() {
  async function getAll(
    page: number = 0,
    size: number = 9,
    sort: ProductSortOption = 'NAME_ASC',
    signal?: AbortSignal,
  ): Promise<PageResponse<Product>> {
    const timeout = AbortSignal.timeout(55000);
    let response: Response;
    try {
      response = await fetch(
        `${BASE_URL}/all?page=${page}&size=${size}&sort=${sort}`,
        {
          signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
        },
      );
    } catch (error) {
      if (signal?.aborted) throw error;
      throw new Error(
        timeout.aborted
          ? 'O servidor demorou a responder. Tente atualizar novamente.'
          : 'Não foi possível acessar a API. Verifique sua conexão.',
      );
    }

    if (!response.ok) {
      const errorMessage = await extractErrorMessage(
        response,
        'Falha ao buscar produtos do servidor.',
      );
      throw new Error(errorMessage);
    }

    const result = await response.json();
    if (
      !Array.isArray(result.content) ||
      !Number.isInteger(result.totalPages)
    ) {
      throw new Error('Resposta de produtos incompatível com a API.');
    }
    return result;
  }

  return { getAll };
}
