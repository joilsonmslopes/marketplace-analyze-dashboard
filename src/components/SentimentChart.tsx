import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import type { Rating } from '../types/rating';
import { sentimentLabels, sentimentMetrics } from '../utils/products';
export function SentimentChart({ ratings }: { ratings?: Rating[] }) {
  const { counts, total } = sentimentMetrics(ratings);
  if (!total)
    return (
      <Typography
        color="text.secondary"
        variant="body2"
      >
        Nenhuma avaliação analisada.
      </Typography>
    );
  return (
    <Stack
      spacing={1}
      role="img"
      aria-label={`Sentimentos: ${counts.POSITIVO} positivos, ${counts.NEGATIVO} negativos e ${counts.NEUTRO} neutros`}
    >
      {(Object.keys(counts) as (keyof typeof counts)[]).map((key) => (
        <Box key={key}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between' }}
          >
            <Typography variant="caption">{sentimentLabels[key]}</Typography>
            <Typography variant="caption">
              {counts[key]} · {Math.round((counts[key] / total) * 100)}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={(counts[key] / total) * 100}
            color={
              key === 'POSITIVO'
                ? 'success'
                : key === 'NEGATIVO'
                  ? 'error'
                  : 'primary'
            }
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      ))}
    </Stack>
  );
}
