'use client'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { LiteralUnion, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BuiltInProviderType } from 'next-auth/providers/index';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { validateLoginForm } from './action';
import Image from "next/image";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null | undefined>(null);
    const prevUrl = typeof window !== "undefined" ? sessionStorage.getItem("prevUrl") || "/home" : "/home";

    const [state, formAction, pending] = useActionState(validateLoginForm, null);
    const router = useRouter();

    const socialsLogin = async (provider: LiteralUnion<BuiltInProviderType> | undefined) => {
        await signIn(provider, {
            callbackUrl: prevUrl
        });
    }

    useEffect(() => {
        const credentialsLogin = async () => {
            if (state) {
                if (!state.email?.error && !state.password?.error) {
                    const response = await signIn("credentials", {
                        email: state.email?.value,
                        password: state.password?.value,
                        redirect: false
                    });

                    if (!response || !response.ok) {
                        setError(response?.error);
                    } else {
                        router.push(prevUrl);
                    }
                } else {
                    setError(null);
                }
            }
        }
        credentialsLogin();
    }, [state]);

    return (
        <Box sx={{
            width: '100%',
            height: 'max-content',
        }}>
            <h3 className='font-semibold text-center text-lg text-white mb-5'>Đăng Nhập</h3>
            <form action={formAction}>
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

                <div className='mb-1'>
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

                <div className='flex justify-end mb-2'>
                    <Link
                        href={"/forgot/password"}
                        className='text-blue-500 hover:underline text-sm'>
                        Quên mật khẩu?
                    </Link>
                </div>

                <Button type='submit' variant='contained' color='primary' fullWidth loading={pending}>
                    Đăng Nhập
                </Button>

                {error && (
                    <p className='text-red-500 text-sm mt-2 flex items-center gap-x-1'>
                        <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                        {error}
                    </p>
                )}

                <div className='text-gray-400 text-sm flex items-center mt-2'>
                    <p>Bạn chưa có tài khoản?</p>
                    <Link href={"/register"} className='ml-1 text-blue-500 hover:underline'>Đăng kí</Link>
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

export default LoginForm