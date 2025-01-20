import { ThemeProvider } from '@mui/material'
import React from 'react'
import theme from './theme'

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default ThemeWrapper