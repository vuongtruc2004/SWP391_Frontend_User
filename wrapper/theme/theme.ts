'use client';
import { createTheme } from '@mui/material/styles';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-quicksand'
});

const theme = createTheme({
    palette: {
        secondary: {
            main: '#f8f9fa'
        }
    },
    typography: {
        fontFamily: `${quicksand.style.fontFamily}, sans-serif`,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { severity: 'info' },
                            style: {
                                backgroundColor: '#60a5fa',
                            },
                        },
                    ],
                },
            },
        },
    },
});

export default theme;
