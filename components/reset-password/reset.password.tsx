'use client'
import EmailForm from "@/features/reset-password-step/email.form";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { motion } from 'framer-motion';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect, useState } from "react";
import Link from "next/link";
import OtpForm from "@/features/reset-password-step/otp.form";
import SetPassword from "@/features/reset-password-step/set.password";
import CompleteResetPassword from "./complete.reset.password";

const ResetPassword = () => {
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1);
    const [stepWidth, setStepWidth] = useState(125);

    useEffect(() => {
        switch (step) {
            case 1:
                setStepWidth(125);
                break;
            case 2:
                setStepWidth(125 * 2);
                break;
            case 3:
                setStepWidth(125 * 3);
                break;
            case 4:
                setStepWidth(125 * 4);
                break;
            default:
                setStepWidth(125);
        }
    }, [step]);

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
                maxWidth: '500px',
                bgcolor: 'black',
                padding: '40px 20px',
                position: 'relative'
            }}>
                <div className='flex items-center justify-between mb-1'>
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
                    <Tooltip title="Đăng kí tài khoản mới" arrow placement='top'>
                        <Link href={"/register"}>
                            <IconButton sx={{
                                '&:hover': {
                                    color: '#60a5fa'
                                }
                            }}
                            >
                                <PersonAddOutlinedIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </div>
                {step === 1 && (
                    <EmailForm setStep={setStep} setEmail={setEmail} />
                )}
                {step === 2 && (
                    <OtpForm setStep={setStep} setCode={setCode} email={email} />
                )}
                {step === 3 && (
                    <SetPassword setStep={setStep} code={code} />
                )}
                {step === 4 && (
                    <CompleteResetPassword />
                )}

                <Link href={"/login"} className="mt-5 flex justify-center">
                    <Button
                        variant="text"
                        color="primary"
                        startIcon={<KeyboardBackspaceIcon />}
                        sx={{
                            textTransform: 'none',
                        }}
                    >
                        Về trang đăng nhập
                    </Button>
                </Link>

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
    );
};

export default ResetPassword;