import { Box } from '@mui/material'
import LoginForm from './login.form'
import LoginBanner from './login.banner'

const Login = () => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '60% 40%',
            alignItems: 'center',
            width: '90%',
            minWidth: '1000px',
            maxWidth: '1600px',
            borderRadius: '6px 50px 6px 50px',
        }}>
            <LoginBanner />
            <LoginForm />
        </Box>
    )
}

export default Login