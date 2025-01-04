// app/components/OrSeparator.tsx
//
import {Box, Divider, Typography} from '@mui/material';

const OrSeparator = ({text = 'OR', className = '', sx = {}}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                my: 2, // margin top and bottom
                ...sx, // Allow for additional customization via sx prop
            }}
            className={className}
        >
            <Divider sx={{flexGrow: 1, borderColor: 'gray'}}/>
            <Typography
                variant="body2"
                sx={{
                    mx: 2, // margin on the left and right of the text
                    color: 'text.secondary',
                    fontWeight: 'bold',
                }}
            >
                {text}
            </Typography>
            <Divider sx={{flexGrow: 1, borderColor: 'gray'}}/>
        </Box>
    );
};

export default OrSeparator;
