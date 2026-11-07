import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Pagination,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useProducts } from './hooks/useProducts';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductFilters } from './components/ProductFilters';
import { SentimentChart } from './components/SentimentChart';
import { sentimentMetrics } from './utils/products';
import { theme } from './theme';

function App() {
  const data = useProducts();
  const metrics = sentimentMetrics(data.ratings);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: { xs: 3, md: 4 } }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700 }}
        >
          Inteligência sobre suas compras
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 3 }}
        >
          Explore os produtos salvos e o sentimento dos compradores.
        </Typography>
        <Stack
          direction="row"
          sx={{ gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 2 }}
        >
          <Button
            variant="outlined"
            onClick={data.refresh}
            disabled={data.refreshing}
          >
            {data.refreshing ? 'Atualizando…' : 'Atualizar produtos'}
          </Button>
          {!!data.updatedAt && (
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Atualizado às{' '}
              {new Date(data.updatedAt).toLocaleTimeString('pt-BR')}
            </Typography>
          )}
        </Stack>
        <Alert
          severity="info"
          sx={{ mb: 3 }}
        >
          Para coletar, abra um anúncio do Mercado Livre e use o painel lateral
          da extensão. Esta lista é atualizada a cada minuto enquanto a página
          estiver aberta.
        </Alert>
        {data.error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
              <Button
                color="inherit"
                onClick={data.refresh}
                disabled={data.refreshing}
              >
                Tentar novamente
              </Button>
            }
          >
            {data.error}
            {data.hasData && ' Os últimos dados carregados foram mantidos.'}
          </Alert>
        )}
        {data.hasData && data.allProductsCount > 0 && (
          <Paper
            variant="outlined"
            sx={{ p: 3, mb: 3 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={4}
            >
              <Box sx={{ minWidth: 170 }}>
                <Typography color="text.secondary">
                  Produtos filtrados
                </Typography>
                <Typography variant="h3">{data.totalProducts}</Typography>
                <Typography color="text.secondary">
                  de {data.allProductsCount} produtos salvos
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {metrics.total} avaliações analisadas
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Distribuição dos sentimentos
                </Typography>
                <SentimentChart ratings={data.ratings} />
              </Box>
            </Stack>
          </Paper>
        )}
        <ProductFilters
          search={data.search}
          onSearchChange={data.setSearch}
          sentiment={data.sentiment}
          onSentimentChange={data.setSentiment}
          sort={data.sortOption}
          onSortChange={data.setSortOption}
          onReset={data.resetFilters}
        />
        {data.loading && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', py: 4 }}
            role="status"
          >
            <CircularProgress size={24} />
            <Typography>Consultando produtos no backend…</Typography>
          </Stack>
        )}
        {data.refreshing && !data.loading && (
          <Typography
            role="status"
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Atualizando produtos…
          </Typography>
        )}
        {data.hasData && data.totalProducts === 0 && (
          <Alert severity="info">
            {data.allProductsCount
              ? 'Nenhum produto corresponde aos filtros.'
              : 'Nenhum produto salvo. Abra um anúncio e inicie uma coleta pelo painel lateral da extensão.'}
          </Alert>
        )}
        <Box
          aria-busy={data.refreshing}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {data.products.map((product) => (
            <ProductCard
              key={product.id ?? product.originalLink}
              product={product}
            />
          ))}
        </Box>
        {data.totalPages > 1 && (
          <Pagination
            count={data.totalPages}
            page={data.page + 1}
            onChange={(_, value) => data.setPage(value - 1)}
            color="primary"
            size="small"
            sx={{ my: 3, display: 'flex', justifyContent: 'center' }}
          />
        )}
        <Typography
          variant="caption"
          color="text.secondary"
          component="p"
          sx={{ mt: 3 }}
        >
          Dados e análises fornecidos pela API Spring Boot. A API atual não
          disponibiliza imagens dos produtos.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
export default App;
