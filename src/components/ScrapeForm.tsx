import { Box, Button, CircularProgress, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState, type SyntheticEvent } from "react";
import type { Product } from "../types/product";

interface ScrapeFormProps {
    onScrape: (url: string) => Promise<Product> | void;
    isLoading: boolean;
}

export function ScrapeForm({
    onScrape,
    isLoading
}: ScrapeFormProps) {
    const [url, setUrl] = useState<string>("");

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (!url.trim()) return;

        onScrape(url);
        setUrl('');
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                    aligntItems: 'center'
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
                    startIcon={
                        isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />
                    }
                    sx={{
                        minWidth: { sm: '200px '},
                        height: '56px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                    }}
                >
                    {isLoading ? 'Analisando ...' : 'Analisar Anúncio'}
                </Button>
            </Box>
        </Paper>
    )
}