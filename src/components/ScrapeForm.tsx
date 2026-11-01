import { Alert, Box, Button, Paper, Snackbar, TextField } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import type { Product } from "../types/product";

interface ScrapeFormProps {
    onScrape: (url: string) => Promise<Product> | void;
    isLoading: boolean;
}

export function ScrapeForm({ onScrape, isLoading }: ScrapeFormProps) {
    const [url, setUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      if (!url.trim()) return;
  
      try {
        await onScrape(url);
        setUrl('');
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Erro ao processar a URL.');
      }
    };
  
    const handleCloseSnackbar = (_: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setErrorMessage(null);
    };
  
    return (
      <>
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="URL do produto no Mercado Livre"
              placeholder="https://produto.mercadolivre.com.br/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading || !url.trim()}
              sx={{
                minWidth: { sm: '220px' },
                height: '56px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {isLoading ? 'Analisando...' : 'Analisar Anúncio'}
            </Button>
          </Box>
        </Paper>
  
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: '100%', fontWeight: 500 }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }