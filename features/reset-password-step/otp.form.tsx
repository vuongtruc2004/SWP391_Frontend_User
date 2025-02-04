import React, { SetStateAction, useEffect, useState } from 'react';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button } from "@mui/material";
import { MuiOtpInput } from 'mui-one-time-password-input';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';

const OtpForm = (props: {
    setStep: React.Dispatch<SetStateAction<number>>,
    setCode: React.Dispatch<SetStateAction<string>>,
    email: string
}) => {
    const { setStep, setCode, email } = props;
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
        if (countdown > 0) return;
        setCountdown(60);
        await sendRequest<ApiResponse<void>>({
            url: `${apiUrl}/users/request_change_password`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: { email }
        });
    };

    const handleSubmit = async () => {
        const checkOtpResponse = await sendRequest<ApiResponse<void>>({
            url: `${apiUrl}/otp`,
            queryParams: { code: otp }
        });

        if (checkOtpResponse.status === 200) {
            setStep(prev => prev + 1);
            setCode(otp);
        } else {
            setErrorMessage(checkOtpResponse.message.toString());
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
