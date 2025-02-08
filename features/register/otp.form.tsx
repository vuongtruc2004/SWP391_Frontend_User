import React, { SetStateAction, useEffect, useState } from 'react';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from "@mui/material/Button";
import { MuiOtpInput } from 'mui-one-time-password-input';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';
import { RegisterFieldResponse } from './action';

const OtpForm = ({ setIsBackToStepOne, registerField, setStep }: {
    setIsBackToStepOne: React.Dispatch<SetStateAction<boolean>>,
    registerField: RegisterFieldResponse | null,
    setStep: React.Dispatch<SetStateAction<number>>
}) => {
    const [otp, setOtp] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(0);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const handleChange = (newValue: string) => {
        setOtp(newValue);
    };

    const handleResendEmail = async () => {
        if (countdown > 0 || !registerField) return;
        setCountdown(60);

        const registerRequest: RegisterRequest = {
            fullname: registerField?.fullname.value,
            email: registerField?.email.value,
            password: registerField?.password.value
        };

        await sendRequest<ApiResponse<void>>({
            url: `${apiUrl}/users/request_register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: registerRequest
        });
    };

    const handleSubmit = async () => {
        const activeResponse = await sendRequest<ApiResponse<void>>({
            url: `${apiUrl}/users/active`,
            queryParams: {
                code: otp
            }
        });

        if (activeResponse.status === 200) {
            setStep(prev => prev + 1);
        } else {
            setErrorMessage(activeResponse.message.toString());
        }
    };

    return (
        <>
            <div className="flex justify-center mb-2">
                <span className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-[15px] border border-gray-500">
                    <DraftsOutlinedIcon sx={{ fontSize: '2.25rem' }} />
                </span>
            </div>

            <h1 className="text-2xl text-center font-semibold">Nhập mã OTP</h1>
            <p className="text-center text-gray-300 mb-5">
                Vui lòng nhập mã OTP đã được gửi đến email của bạn.
            </p>

            <div className="mb-3">
                {React.createElement(MuiOtpInput as any, {
                    value: otp,
                    onChange: handleChange,
                    length: 6,
                    autoFocus: true,
                    sx: { gap: '8px' }
                })}
            </div>

            {errorMessage && (
                <p className='text-red-500 text-sm mb-3 ml-2 flex items-center gap-x-1'>
                    <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                    {errorMessage}
                </p>
            )}

            <div className='flex items-center justify-between gap-x-5'>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<ArrowLeftIcon />}
                    sx={{ textTransform: 'none' }}
                    onClick={() => {
                        setIsBackToStepOne(true);
                        setStep(prev => prev - 1);
                    }}
                >
                    Trở lại
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={<ArrowRightIcon />}
                    sx={{ textTransform: 'none' }}
                    onClick={handleSubmit}
                    disabled={otp.length < 6}
                >
                    Tiếp tục
                </Button>
            </div>

            <div className='flex items-center justify-center gap-x-1 text-sm mt-2'>
                <p className='text-gray-300'>Không nhận được mã OTP?</p>
                <Button
                    onClick={handleResendEmail}
                    size='small'
                    sx={{ textTransform: 'none' }}
                    disabled={countdown > 0}
                >
                    {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi lại"}
                </Button>
            </div>
        </>
    );
};

export default OtpForm;
