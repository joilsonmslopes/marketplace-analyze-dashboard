import { useId, useState } from 'react';
import type { Product } from '../types/product';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { money, safeProductLink, sentimentMetrics } from '../utils/products';
import { SentimentBadge } from './SentimentBadge';
import { SentimentChart } from './SentimentChart';

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const metrics = sentimentMetrics(product.ratings);
  const link = safeProductLink(product.originalLink);
  return (
    <>
      <Card
        variant="outlined"
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={{
            height: 150,
            bgcolor: '#eef3f8',
            display: 'grid',
            placeItems: 'center',
            p: 2,
          }}
        >
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Imagem indisponível
          </Typography>
        </Box>
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{ fontWeight: 700, mb: 1, overflowWrap: 'anywhere' }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: 'success.main', fontWeight: 700, mb: 2 }}
          >
            {money(product.currentPrice)}
          </Typography>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}
          >
            <SentimentBadge value={metrics.dominant} />
            <Typography
              variant="caption"
              color="text.secondary"
            >
              {metrics.total} avaliações
            </Typography>
          </Stack>
          <SentimentChart ratings={product.ratings} />
        </CardContent>
        <Stack
          sx={{ px: 2, pb: 2 }}
          spacing={1}
        >
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            Ver detalhes e comentários
          </Button>
          {link && (
            <Button
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver no Mercado Livre ↗
            </Button>
          )}
        </Stack>
      </Card>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        aria-labelledby={titleId}
      >
        <DialogTitle id={titleId}>{product.name}</DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="h5"
            sx={{ mb: 2 }}
          >
            {money(product.currentPrice)}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Análise de sentimentos · Gemini
          </Typography>
          <SentimentChart ratings={product.ratings} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ my: 2 }}
          >
            Classificações retornadas pelo backend para os comentários
            coletados. O sentimento do produto corresponde à maioria; empates
            são exibidos como mistos.
          </Typography>
          <Divider />
          {(product.ratings ?? []).map((rating, index) => (
            <Box
              key={rating.id ?? index}
              sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider' }}
            >
              <SentimentBadge value={rating.sentiment} />
              <Typography
                sx={{ mt: 1, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
              >
                {rating.originalText}
              </Typography>
            </Box>
          ))}
          {!product.ratings?.length && (
            <Typography sx={{ py: 2 }}>
              Este produto ainda não possui comentários analisados.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {link && (
            <Button
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir anúncio ↗
            </Button>
          )}
          <Button onClick={() => setOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
