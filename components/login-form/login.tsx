import { Box } from '@mui/material'
import LoginForm from './login.form'
import LoginBanner from './login.banner'

const Login = () => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '60% 40%',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '900px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
            borderRadius: '10px',
        }}>
            <LoginForm />
            <LoginBanner />
        </Box>
    )
}

export default Login