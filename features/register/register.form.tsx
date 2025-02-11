import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import { SetStateAction, useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { RegisterFieldResponse, validateRegisterForm } from './action';
import Image from "next/image";

const RegisterForm = ({ setIsBackToStepOne, isBackToStepOne, setStep, registerField, setRegisterField }: {
    setIsBackToStepOne: React.Dispatch<SetStateAction<boolean>>;
    isBackToStepOne: boolean;
    setStep: React.Dispatch<SetStateAction<number>>;
    registerField: RegisterFieldResponse | null;
    setRegisterField: React.Dispatch<SetStateAction<RegisterFieldResponse | null>>;
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [prevUrl, setPrevUrl] = useState("/home");

    const [state, formAction, pending] = useActionState(validateRegisterForm, registerField);

    const socialsLogin = async (provider: LiteralUnion<BuiltInProviderType> | undefined) => {
        await signIn(provider, {
            callbackUrl: prevUrl
        });
    }

    useEffect(() => {
        let storedUrl = sessionStorage.getItem("prevUrl");
        if (storedUrl) {
            setPrevUrl(storedUrl);
        }
    }, []);

    useEffect(() => {
        if (state?.ok && !isBackToStepOne) {
            setStep(prev => prev + 1);
            setRegisterField(state);
        }
        if (isBackToStepOne) {
            setIsBackToStepOne(false);
        }
    }, [state]);

    return (
        <Box sx={{
            width: '100%',
            height: 'max-content',
        }}>
            <h3 className='font-semibold text-center text-lg text-white mb-5'>Đăng Kí</h3>

            <form action={formAction}>
                <div className='mb-3'>
                    <label className="mb-[10px] block text-white"><span className="text-red-500 mr-1">*</span>Họ và tên:</label>
                    <TextField
                        placeholder='Nhập họ và tên'
                        size='small'
                        name='fullname'
                        autoComplete='fullname'
                        fullWidth
                        defaultValue={state?.fullname.value}
                        error={state?.fullname.error}
                        helperText={state?.fullname.error && (
                            <span className="flex items-center gap-x-1">
                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                {state?.fullname.message}
                            </span>
                        )}
                    />
                </div>
                <div className='mb-3'>
                    <label className="mb-[10px] block text-white"><span className="text-red-500 mr-1">*</span>Email:</label>
                    <TextField
                        placeholder='Nhập email'
                        size='small'
                        name='email'
                        autoComplete='email'
                        fullWidth
                        defaultValue={state?.email.value}
                        error={state?.email.error}
                        helperText={state?.email.error && (
                            <span className="flex items-center gap-x-1">
                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                {state?.email.message}
                            </span>
                        )}
                    />
                </div>

                <div className='mb-3'>
                    <label className="mb-[10px] block text-white"><span className="text-red-500 mr-1">*</span>Mật khẩu:</label>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(prev => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility sx={{ fontSize: '1.2rem', color: '#6c757d' }} /> : <VisibilityOff sx={{ fontSize: '1.2rem', color: '#6c757d' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        placeholder='Nhập mật khẩu'
                        autoComplete='password'
                        size='small'
                        name='password'
                        fullWidth
                        defaultValue={state?.password.value}
                        error={state?.password.error}
                        helperText={state?.password.error && (
                            <span className="flex items-center gap-x-1">
                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                {state?.password.message}
                            </span>
                        )}
                    />
                </div>

                <div className='mb-3'>
                    <label className="mb-[10px] block text-white"><span className="text-red-500 mr-1">*</span>Nhập lại mật khẩu:</label>
                    <TextField
                        type={showRePassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowRePassword(prev => !prev)}
                                            edge="end"
                                        >
                                            {showRePassword ? <Visibility sx={{ fontSize: '1.2rem', color: '#6c757d' }} /> : <VisibilityOff sx={{ fontSize: '1.2rem', color: '#6c757d' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        placeholder='Nhập lại mật khẩu'
                        autoComplete='rePassword'
                        size='small'
                        name='rePassword'
                        fullWidth
                        defaultValue={state?.rePassword.value}
                        error={state?.rePassword.error}
                        helperText={state?.rePassword.error && (
                            <span className="flex items-center gap-x-1">
                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                {state.rePassword.message}
                            </span>
                        )}
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={<ArrowRightIcon />}
                    sx={{ textTransform: 'none' }}
                    type='submit'
                    loading={pending}
                >
                    Tiếp tục
                </Button>

                <div className='text-gray-400 text-sm flex items-center mt-2'>
                    <p>Bạn đã có tài khoản?</p>
                    <Link href={"/login"} className='ml-1 text-blue-500 hover:underline'>Đăng nhập</Link>
                </div>
            </form>

            <Divider sx={{ marginBlock: '15px', color: '#ced4da', fontSize: '14px' }}>Hoặc đăng nhập với</Divider>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: '10px',
                    'button': {
                        padding: '8px 25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        columnGap: '10px'
                    }
                }}
            >
                <Button variant='outlined' fullWidth size='small' onClick={() => socialsLogin('google')}>
                    <Image src={"/google-icon.webp"} alt="google icon" width={23} height={23} style={{ objectFit: 'cover', objectPosition: 'center' }} />
                    <p>Google</p>
                </Button>
                <Button variant='outlined' fullWidth size='small' onClick={() => socialsLogin('github')}>
                    <GitHubIcon sx={{ color: 'white' }} />
                    <p>Github</p>
                </Button>
            </Box>
        </Box >
    )
}

export default RegisterForm