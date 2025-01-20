import {Box, Divider, Typography} from '@mui/material';

const OrSeparator = ({text = 'OR', className = '', sx = {}, sxd = {}}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                my: 2,
                ...sx, // Allow for additional customization via sx prop
            }}
            className={className}
        >
            <Divider sx={{flexGrow: 1, borderColor: 'gray', ...sxd}}/>
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
            <Divider sx={{flexGrow: 1, borderColor: 'gray', ...sxd}}/>
        </Box>
    );
};

export default OrSeparator;
