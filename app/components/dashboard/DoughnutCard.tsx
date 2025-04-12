import {Box, Paper, Typography} from '@mui/material';

export default function DoughnutCard({label, value, percentage, count}: {
    label: string;
    value: string;
    percentage: number;
    count: string | number
}) {

    return (
        <Paper elevation={1} component={Box} p={2.5} bgcolor="#fff" borderRadius={2}>
            <Typography variant="body2" color="text.secondary" mb={1}>{label}</Typography>
            <Typography variant="h6" fontWeight="bold">{value}</Typography>
            <Typography variant="body2" color="primary.main" mt={1}>▲ {percentage}%</Typography>
            <Box height={90} bgcolor="#eef4ff" borderRadius="50%" mt={1} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">{count}</Typography>
            </Box>
        </Paper>
    );
}
