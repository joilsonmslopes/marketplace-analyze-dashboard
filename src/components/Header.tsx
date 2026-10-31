import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import PsychologyIcon from '@mui/icons-material/Psychology';

export function Header() {
    return (
        <AppBar position="static" color="primary" elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ py: 1, px: 2 }}>
                    <PsychologyIcon sx={{ py: 1, px: 2 }} />
                    <Box>
                        <Typography variant="h5" component="h1" sx={{ fontWright: 700, lineHeight: 1.2 }}>
                            Marketplace Analyzer
                        </Typography>
                        <Typography variant="subtitle2" sx={{ opacity: 0.9, fontWeight: 400 }}>
                            Inteligência Competitiva e Análise de Sentimento com IA
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}