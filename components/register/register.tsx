'use client'
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import RegisterStepper from './register.stepper';
import SelectJob from '@/features/register-step/select.job';
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import UserInfoForm from '@/features/register-step/user.info.form';

const Register = () => {
    const [step, setStep] = useState(1);
    const [userRequest, setUserRequest] = useState<UserRequest>({});

    return (
        <Box sx={{
            bgcolor: '#101010',
            minHeight: '100vh',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: '600px',
                bgcolor: 'black',
                padding: '40px 20px 30px',
                position: 'relative',
                borderRadius: '6px',
                borderTopLeftRadius: '0'
            }}>
                <RegisterStepper step={step} setStep={setStep} />
                <div className='px-10 pt-10'>
                    {step === 1 && (
                        <SelectJob setStep={setStep} userRequest={userRequest} setUserRequest={setUserRequest} />
                    )}
                    {step === 2 && (
                        <UserInfoForm setStep={setStep} userRequest={userRequest} setUserRequest={setUserRequest} />
                    )}
                </div>

                <div className='bg-black absolute left-0 -top-[44px] px-6 py-3 rounded-tl-md rounded-tr-md flex-shrink-0'>
                    <Link href={"/home"} className='text-sm text-blue-500 hover:underline flex items-center gap-x-1'>
                        <HomeOutlinedIcon sx={{ fontSize: '1.25rem' }} />
                        Về trang chủ
                    </Link>
                </div>

            </Box>

            {/* Nút điều hướng */}
            <Box sx={{ display: 'flex', gap: 2, marginTop: 4 }}>
                <Button
                    variant='contained'
                    onClick={() => setStep(prev => prev - 1)}
                    disabled={step === 1} // Vô hiệu hóa nút "Prev" khi ở bước 1
                >
                    Prev
                </Button>
                <Button
                    variant='contained'
                    onClick={() => setStep(prev => prev + 1)}
                    disabled={step === 4} // Vô hiệu hóa nút "Next" khi ở bước cuối
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}

export default Register;