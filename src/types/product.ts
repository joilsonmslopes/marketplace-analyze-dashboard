import type { Rating } from "./rating";

export interface Product {
    id?: number;
    name: string;
    currentPrice: number;
    originalLink: string;
    ratings?: Rating[];
}