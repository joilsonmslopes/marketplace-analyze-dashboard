import { AppBar, Container, Toolbar, Typography } from '@mui/material';
export function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ gap: 2, flexWrap: 'wrap', py: 1 }}
        >
          <Typography
            component="h1"
            variant="h6"
            sx={{ fontWeight: 700, flex: 1 }}
          >
            Analisador ML
          </Typography>
          <Typography variant="caption">Mercado Livre + Gemini</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
