'use client'
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from 'next/link';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RegisterForm from '@/features/register/register.form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OtpForm from '@/features/register/otp.form';
import { motion } from 'framer-motion';
import CompleteRegister from './complete.register';
import { RegisterFieldResponse } from '@/features/register/action';

const Register = () => {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [stepWidth, setStepWidth] = useState(500 / 3);
    const [isBackToStepOne, setIsBackToStepOne] = useState(false);
    const [registerField, setRegisterField] = useState<RegisterFieldResponse | null>(null);

    useEffect(() => {
        switch (step) {
            case 1:
                setStepWidth(500 / 3);
                break;
            case 2:
                setStepWidth(500 / 3 * 2);
                break;
            case 3:
                setStepWidth(500 / 3 * 3);
                break;
            default:
                setStepWidth(500 / 3);
        }
    }, [step]);

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#101010',
            color: 'white',
            paddingBlock: '20px'
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: '500px',
                height: 'max-content',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '65px 25px 40px',
                bgcolor: 'black',
                position: 'relative',
                borderRadius: '6px 6px 0 0'
            }}>
                <div className='w-full'>
                    {step === 1 && (
                        <RegisterForm setIsBackToStepOne={setIsBackToStepOne} isBackToStepOne={isBackToStepOne} setStep={setStep} registerField={registerField} setRegisterField={setRegisterField} />
                    )}
                    {step === 2 && (
                        <OtpForm setIsBackToStepOne={setIsBackToStepOne} setStep={setStep} registerField={registerField} />
                    )}
                    {step === 3 && (
                        <CompleteRegister />
                    )}
                </div>

                <div className='flex items-center justify-between absolute top-[12px] w-full px-5'>
                    <Tooltip title="Về trang trước" arrow placement='top'>
                        <IconButton sx={{
                            '&:hover': {
                                color: '#60a5fa'
                            }
                        }}
                            onClick={() => router.back()}
                        >
                            <FirstPageOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Về trang chủ" arrow placement='top'>
                        <Link href={"/home"}>
                            <IconButton sx={{
                                '&:hover': {
                                    color: '#60a5fa'
                                }
                            }}>
                                <HomeOutlinedIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </div>

                <Box sx={{
                    position: 'absolute',
                    left: 0,
                    bottom: '0',
                    width: '100%',
                    backgroundColor: '#6c757d ',
                    height: '5px'
                }}>
                    <motion.div
                        animate={{
                            width: stepWidth
                        }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className="absolute bottom-0 h-[5px] bg-blue-500"
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Register;