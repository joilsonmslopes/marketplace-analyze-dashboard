import type { SentimentType } from "./sentimentType";

export interface Rating {
    id?: number;
    originalText: string;
    sentiment: SentimentType;
    productId: number;
}