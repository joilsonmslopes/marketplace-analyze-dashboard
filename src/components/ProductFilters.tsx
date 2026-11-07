import { Button, MenuItem, Stack, TextField } from '@mui/material';
import type { ProductSortOption } from '../types/product';
import { sentimentLabels, type SentimentFilter } from '../utils/products';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  sentiment: SentimentFilter;
  onSentimentChange: (value: SentimentFilter) => void;
  sort: ProductSortOption;
  onSortChange: (value: ProductSortOption) => void;
  onReset: () => void;
}
export function ProductFilters({
  search,
  onSearchChange,
  sentiment,
  onSentimentChange,
  sort,
  onSortChange,
  onReset,
}: Props) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      sx={{ my: 3 }}
    >
      <TextField
        label="Buscar produto"
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        size="small"
        fullWidth
      />
      <TextField
        select
        label="Sentimento predominante"
        value={sentiment}
        onChange={(event) =>
          onSentimentChange(event.target.value as SentimentFilter)
        }
        size="small"
        fullWidth
      >
        <MenuItem value="">Todos</MenuItem>
        {Object.entries(sentimentLabels).map(([key, label]) => (
          <MenuItem
            key={key}
            value={key}
          >
            {label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Ordenar por"
        value={sort}
        onChange={(event) =>
          onSortChange(event.target.value as ProductSortOption)
        }
        size="small"
        fullWidth
      >
        <MenuItem value="NAME_ASC">Nome (A–Z)</MenuItem>
        <MenuItem value="NAME_DESC">Nome (Z–A)</MenuItem>
        <MenuItem value="PRICE_ASC">Menor preço</MenuItem>
        <MenuItem value="PRICE_DESC">Maior preço</MenuItem>
      </TextField>
      <Button
        onClick={onReset}
        disabled={!search && !sentiment && sort === 'NAME_ASC'}
        sx={{ flexShrink: 0 }}
      >
        Limpar filtros
      </Button>
    </Stack>
  );
}
