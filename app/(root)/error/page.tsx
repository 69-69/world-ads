'use client';

import {Box, Typography, Button} from '@mui/material';
import {useRouter} from 'next/navigation';

interface ErrorProps {
    error?: Error;
    reset?: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({error, reset}) => {
    const router = useRouter();
    console.log('ErrorPage: error: ', error?.message);

    const handleReload = () => {
        router.push('/');
        if (reset) {
            reset();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f3f3f3',
                padding: 2,
            }}
        >
            <Typography variant="h4" color="error">
                Something went wrong!
            </Typography>
            <Typography variant="body1" sx={{marginBottom: 2}}>
                {'An unexpected error occurred.'}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleReload}>
                Try Again
            </Button>
        </Box>
    );
};

export default ErrorPage;
