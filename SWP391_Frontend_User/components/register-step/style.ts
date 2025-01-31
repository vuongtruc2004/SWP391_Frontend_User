'use client'
import { styled } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, #ade8f4 0%, #90e0ef 50%, #60a5fa 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, #ade8f4 0%, #90e0ef 50%, #60a5fa 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#ced4da',
        borderRadius: 1,
    },
}));

export const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean, error?: boolean };
}>(({ theme }) => ({
    backgroundColor: '#adb5bd',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundColor: '#60a5fa',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundColor: '#60a5fa',
            },
        },
        {
            props: ({ ownerState }) => ownerState.error,
            style: {
                backgroundColor: '#ef233c'
            }
        }
    ],
}));