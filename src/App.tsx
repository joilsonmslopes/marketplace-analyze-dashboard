import './App.css'
import { Alert, Box, CircularProgress, Container, createTheme, ThemeProvider, Typography, Grid, CssBaseline } from '@mui/material'
import { useProducts } from './hooks/useProducts'
import { Header } from './components/Header'
import { ScrapeForm } from './components/ScrapeForm'
import { ProductCard } from './components/ProductCard'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const { products, loading, scraping, error, scrapeUrl } = useProducts();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header />

        <ScrapeForm onScrape={scrapeUrl} isLoading={scraping} />

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography color="text.secondary">Carregando análises salvas...</Typography>
          </Box>
        ) : (
          /* Padrão MUI v6 Grid com propriedade size */
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id || product.originalLink}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App
