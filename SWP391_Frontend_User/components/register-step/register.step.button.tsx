'use client'
import { useRegisterStep } from '@/wrapper/register-step/register.step.wrapper';
import { Box, Button } from '@mui/material';

const RegisterStepButton = () => {
    const { activeStep, setActiveStep } = useRegisterStep();

    const handlePosStep = () => {
        setActiveStep(Math.min(activeStep + 1, 3));
    };
    const handlePreStep = () => {
        setActiveStep(Math.max(activeStep - 1, 0));
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }}>
            <Button
                variant='contained'
                onClick={handlePreStep}
                disabled={activeStep === 0 ? true : false}
            >
                Trở lại
            </Button>

            <Button
                variant='contained'
                onClick={handlePosStep}
                disabled={activeStep === 3 ? true : false}
            >
                Tiếp theo
            </Button>
        </Box>
    );
};

export default RegisterStepButton;
