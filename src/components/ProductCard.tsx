import { useMemo } from "react";
import type { Product } from "../types/product";
import { Box, Button, Card, CardContent, Chip, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import LaunchIcon from '@mui/icons-material/Launch';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const metrics = useMemo(() => {
        if (!product.ratings) {
            return { positive: 0, negative: 0, netrual: 0, total: 0, approvalRate: 0 };
        }

        const positive = product.ratings.filter((rating) => rating.sentiment === 'POSITIVO' || rating.sentiment === 'Positivo').length;
        const negative = product.ratings.filter((rating) => rating.sentiment === 'NEGATIVO' || rating.sentiment === 'Negativo').length;
        const neutral = product.ratings.filter((rating) => rating.sentiment === 'NEUTRO' || rating.sentiment === 'Neutro').length;
        const total = positive + negative + neutral;
        const approvalRate = total > 0 ? Math.round((positive / total) * 100) : 0;

        return {
            positive,
            negative,
            neutral,
            total,
            approvalRate
        }
    }, [product.ratings]);

    return (
        <Card
            elevation={1}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                }
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        mb: 1,
                        minHeight: '2.8em',
                        display: '-webkit-box',
                        WebkitLineClamp: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {product.name}
                </Typography>

                <Typography variant="h5" color="success.main" sx={{ fontWeight: 700, mb: 2 }}>
                    R$ {product.currentPrice ? product.currentPrice.toFixed(2) : '0.00'}
                </Typography>

                <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 2, mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
                        Análise da IA ({metrics.total} avaliações)
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        <Stack direction="row" sx={{ mb: 0.5, justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                            Aprovação dos Compradores
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main' }}>
                            {metrics.approvalRate}%
                        </Typography>
                        </Stack>
                        <LinearProgress
                        variant="determinate"
                        value={metrics.approvalRate}
                        color="success"
                        sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.300' }}
                        />
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
                        <Chip
                        icon={<ThumbUpIcon fontSize="small" />}
                        label={metrics.positive}
                        color="success"
                        variant="outlined"
                        size="small"
                        />
                        <Chip
                        icon={<ThumbDownIcon fontSize="small" />}
                        label={metrics.negative}
                        color="error"
                        variant="outlined"
                        size="small"
                        />
                        <Chip
                        icon={<RemoveCircleOutlineIcon fontSize="small" />}
                        label={metrics.neutral}
                        color="default"
                        variant="outlined"
                        size="small"
                        />
                    </Stack>
                </Box>
            </CardContent>

            <Box sx={{ px: 2, pb: 2 }}>
            <Divider sx={{ mb: 1.5 }} />
            <Button
                fullWidth
                component="a"
                href={product.originalLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="text"
                color="primary"
                endIcon={<LaunchIcon />}
                sx={{ fontWeight: 600 }}
            >
            Ver no Mercado Livre
            </Button>
        </Box>
        </Card>
    );
}