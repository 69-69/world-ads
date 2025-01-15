'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    colorSchemes: { light: true, dark: true },
    palette: {
        primary: {
            main: '#C40A0A',
        },
        secondary: {
            main: '#FFFFFF',
        },
        info: {
            main: '#24292E',
        },
        background: {
            default: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});

export default theme;