import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default ThemeWrapper