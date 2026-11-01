import type { Rating } from "./rating";

export type ProductSortOption = 'NAME_ASC' | 'NAME_DESC' | 'PRICE_ASC' | 'PRICE_DESC';

export interface Product {
    id?: number;
    name: string;
    currentPrice: number;
    originalLink: string;
    ratings?: Rating[];
}