import { Chip } from '@mui/material';
import {
  sentimentColors,
  sentimentLabels,
  type ProductSentiment,
} from '../utils/products';
export function SentimentBadge({ value }: { value: string }) {
  const key = value?.toUpperCase() as ProductSentiment;
  return (
    <Chip
      size="small"
      color={sentimentColors[key] ?? 'default'}
      label={sentimentLabels[key] ?? 'Não classificado'}
    />
  );
}
