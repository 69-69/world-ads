import {Box, Paper, Typography} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function StatCard({ label, value, sub, percentage, up = false }: { label: string; value: string | number; sub: string; percentage: number; up?: boolean }) {
    return (
        <Paper elevation={1} component={Box} p={2.5} bgcolor="#fff" borderRadius={2}>
            <Typography variant="body2" color="text.secondary" mb={1}>{label}</Typography>
            <Typography variant="h6" fontWeight="bold">{value}</Typography>
            <Typography variant="body2" color="text.secondary">{sub}</Typography>
            <Box display="flex" alignItems="center" mt={1}>
                {up ? <ArrowUpwardIcon fontSize="small" color="primary" /> : <ArrowDownwardIcon fontSize="small" color="error" />}
                <Typography variant="body2" color={up ? 'primary.main' : 'error'} ml={0.5}>
                    {percentage}%
                </Typography>
            </Box>
        </Paper>
    );
}
