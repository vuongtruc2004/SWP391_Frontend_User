'use client'
import { Box, Button, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { validateLoginForm, FieldResponse } from './login.action';
import { useRouter } from 'next/navigation';

const initState: FieldResponse | null = null;
const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null | undefined>(null);

    const [state, formAction, pending] = useActionState(validateLoginForm, initState);
    const router = useRouter();

    useEffect(() => {
        const credentialsLogin = async () => {
            if (state) {
                if (!state.username?.error && !state.password?.error) {
                    const response = await signIn("credentials", {
                        username: state.username?.value,
                        password: state.password?.value,
                        redirect: false
                    });

                    if (!response || !response.ok) {
                        setError(response?.error);
                    } else {
                        router.back();
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
                    <label className="mb-[10px] block text-white"><span className="text-red-500 mr-1">*</span>Tên tài khoản:</label>
                    <TextField
                        placeholder='Nhập tên tài khoản'
                        size='small'
                        name='username'
                        autoComplete='username'
                        fullWidth
                        defaultValue={state?.username?.value}
                        error={state?.username?.error}
                        helperText={state?.username?.error && state?.username?.message}
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
                        defaultValue={state?.password?.value
                        }
                        error={state?.password?.error}
                        helperText={state?.password?.error && state?.password?.message}
                    />
                </div>

                <div className='flex justify-end mb-2'>
                    <Link
                        href={"/password/reset"}
                        className='text-gray-400 text-sm hover:underline hover:text-blue-500'>
                        Quên mật khẩu?
                    </Link>
                </div>

                <Button type='submit' variant='contained' color='primary' fullWidth disabled={pending} >Đăng Nhập</Button>

                <p className='text-red-500 text-sm mt-2'>{error}</p>

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
                        'img': {
                            width: '24px',
                            aspectRatio: 1,
                            objectFit: 'cover'
                        },
                        padding: '6px 25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        columnGap: '10px'
                    }
                }}
            >
                <Button variant='outlined' fullWidth size='small' onClick={() => signIn('google')}>
                    <img src={"http://localhost:3000/google-icon.png"} alt="" />
                    <p>Google</p>
                </Button>
                <Button variant='outlined' fullWidth size='small' onClick={() => signIn('github')}>
                    <GitHubIcon sx={{ color: 'white' }} />
                    <p>Github</p>
                </Button>
            </Box>
        </Box >
    )
}

export default LoginForm