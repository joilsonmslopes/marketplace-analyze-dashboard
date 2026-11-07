import { Paper, TextField } from '@mui/material';

interface ScrapeFormProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export function ScrapeForm({ search, onSearchChange }: ScrapeFormProps) {
    return (
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <TextField
                fullWidth
                type="search"
                label="Buscar produtos"
                placeholder="Digite o nome do produto"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                helperText="Os produtos são coletados pela extensão do Chrome."
            />
        </Paper>
    );
}
