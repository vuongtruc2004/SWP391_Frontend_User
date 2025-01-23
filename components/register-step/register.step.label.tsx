'use client'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import WorkIcon from '@mui/icons-material/Work';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { ColorlibConnector, ColorlibStepIconRoot } from './style';
import { useRegisterStep } from '@/wrapper/register-step/register.step.wrapper';
import { Box } from '@mui/material';

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, error } = props;
    const icons: { [index: string]: React.ReactElement<unknown> } = {
        1: <WorkIcon />,
        2: <InfoIcon />,
        3: <PersonIcon />,
        4: <DoneAllIcon />
    };
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active, error }} sx={{ cursor: 'pointer' }}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const RegisterStepLabel = () => {
    const { activeStep, setActiveStep } = useRegisterStep();
    const steps = ['Thông tin cá nhân', 'Thông tin Liên hệ', 'Thông tin tài khoản', 'Xác thực email'];

    const handleChangeStep = (index: number) => {
        if (
            activeStep > index ||
            activeStep === index - 1
        ) {
            setActiveStep(index);
        }
    }
    return (
        <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            sx={{
                position: 'relative',
                top: '20%',
                '.mui-1t6afu0-MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
                    marginTop: '10px'
                },
                '.mui-1t6afu0-MuiStepLabel-label.Mui-active': {
                    color: 'black'
                }
            }}
        >
            {steps.map((label, index) => {
                const labelProps: {
                    error?: boolean;
                } = {};
                // if (index === 1) {
                //     labelProps.error = true;
                // }
                return (
                    <Step key={label}>
                        <StepLabel
                            {...labelProps}
                            slots={{
                                stepIcon: ColorlibStepIcon
                            }}
                            onClick={() => handleChangeStep(index)}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                )
            })}
        </Stepper>
    )
}

export default RegisterStepLabel