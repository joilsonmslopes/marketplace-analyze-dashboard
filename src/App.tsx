import './App.css'
import { 
  Alert, 
  Box, 
  CircularProgress, 
  Container, 
  createTheme, 
  ThemeProvider, 
  Typography,
  Grid, 
  CssBaseline, 
  type SelectChangeEvent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
} from '@mui/material'
import { Sort as SortIcon } from '@mui/icons-material';
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
  const { products, loading, scraping, error, scrapeUrlMutate, sortOption, setSortOption } = useProducts();

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as any);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header />

        <ScrapeForm onScrape={scrapeUrlMutate} isLoading={scraping} />

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
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                Produtos Analisados ({products.length})
              </Typography>

              <FormControl size="small" sx={{ minWidth: 220, bgcolor: 'background.paper' }}>
                <InputLabel id="sort-select-label">Ordenar por</InputLabel>
                <Select
                  labelId="sort-select-label"
                  value={sortOption}
                  label="Ordenar por"
                  onChange={handleSortChange}
                  startAdornment={<SortIcon sx={{ ml: 1, mr: 1, color: 'text.secondary' }} />}
                >
                  <MenuItem value="NAME_ASC">Nome (A-Z)</MenuItem>
                  <MenuItem value="NAME_DESC">Nome (Z-A)</MenuItem>
                  <MenuItem value="PRICE_ASC">Menor Preço</MenuItem>
                  <MenuItem value="PRICE_DESC">Maior Preço</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id || product.originalLink}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App
