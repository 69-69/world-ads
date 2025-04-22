import {Box, Paper, Typography} from '@mui/material';

export default function ChartCard({label, value, percentage, type}: {
    label: string;
    value: string;
    percentage: number;
    type?: string
}) {
    console.log('ChartCard', label, value, percentage, type);
    return (
        <Paper elevation={1} component={Box} p={2.5} bgcolor="#fff" borderRadius={2}>
            <Typography variant="body2" color="text.secondary" mb={1}>{label}</Typography>
            <Typography variant="h6" fontWeight="bold">{value}</Typography>
            <Typography variant="body2" color="primary.main" mt={1}>▲ {percentage}%</Typography>
            {/* Replace below with actual charts */}
            <Box height={60} bgcolor="#eef4ff" borderRadius={1} mt={1}></Box>
        </Paper>
    );
}
