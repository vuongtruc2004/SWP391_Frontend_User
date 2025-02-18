'use client';
import { createTheme } from '@mui/material/styles';
import { Quicksand } from 'next/font/google';

export const quicksand = Quicksand({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-quicksand'
});

const theme = createTheme({
    palette: {
        secondary: {
            main: '#f8f9fa'
        },
        info: {
            main: '#dab2ff'
        },
        warning: {
            main: '#00c951'
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
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#252525',
                },
            },
        },
    },
});

export default theme;
