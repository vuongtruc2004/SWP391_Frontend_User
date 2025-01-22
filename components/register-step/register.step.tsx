import { Box } from '@mui/material'
import RegisterStepLabel from './register.step.label'
import RegisterStepBody from './registert.step.body'
import RegisterStepButton from './register.step.button'

const RegisterStep = () => {
    return (
        <Box sx={{
            padding: '20px'
        }}>
            <RegisterStepLabel />
            <RegisterStepBody />
            <RegisterStepButton />
        </Box>
    )
}

export default RegisterStep