import { RegisterStepWrapper } from '@/wrapper/register-step/register.step.wrapper'
import { Box } from '@mui/material'
import RegisterBanner from './register.banner'
import RegisterStep from '../register-step/register.step'

const Register = () => {
    return (
        <RegisterStepWrapper>
            <Box sx={{
                bgcolor: 'white',
                color: 'black',
                width: '100%',
                maxWidth: '1200px',
                display: 'grid',
                gridTemplateColumns: '55% 45%',
                alignItems: 'center',
                ".mui-eayzbu-MuiInputBase-root-MuiOutlinedInput-root": {
                    height: '40px'
                },
                marginBlock: '50px',
                zIndex: 10,
                position: 'relative',
                border: '2px solid #60a5fa',

            }}>
                <RegisterBanner />
                <RegisterStep />
            </Box>
        </RegisterStepWrapper>
    )
}

export default Register