'use client';
import { quicksand } from '@/app/layout';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#f8f9fa'
        },
        info: {
            main: '#dab2ff'
        },
        mode: 'dark'
    },
    typography: {
        fontFamily: quicksand.style.fontFamily
    },
    components: {

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                },
            },
        },
    },
});

export default theme;
