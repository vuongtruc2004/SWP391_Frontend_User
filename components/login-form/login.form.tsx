'use client'
import { Box, Button, Divider, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    // const { showToast } = useToast();

    // const handleCredentialLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     //@ts-ignore
    //     const username = e.target[0]?.value as string ?? "";
    //     //@ts-ignore
    //     const password = e.target[2]?.value as string ?? "";

    //     if (!username || username.trim() === '') {

    //         return;
    //     }
    //     if (!password || password.trim() === '') {
    //         showToast({
    //             message: "Mật khẩu không được để trống!",
    //             type: 'error'
    //         })
    //         return;
    //     }

    //     const response = await signIn("credentials", {
    //         username: username,
    //         password: password,
    //         redirect: false
    //     });

    //     if (response?.error) {
    //         showToast({
    //             message: response.error,
    //             type: 'error'
    //         })
    //     } else {
    //         router.push("/");
    //     }
    // }

    return (
        <Box sx={{
            width: '100%',
            padding: '20px',
        }}>
            <form>
                <h3 className='font-semibold text-center text-lg'>Đăng Nhập</h3>
                <div className='mb-3'>
                    <p className='text-black mb-1'>Tài khoản:</p>
                    <TextField
                        placeholder='Nhập tên tài khoản'
                        size='small'
                        name='username'
                        autoComplete='username'
                        fullWidth
                    />
                </div>

                <div className='mb-1'>
                    <p className='text-black mb-1'>Mật khẩu:</p>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(prev => !prev)}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility sx={{ fontSize: '1.2rem', color: '#6c757d' }} /> : <VisibilityOff sx={{ fontSize: '1.2rem', color: '#6c757d' }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder='Nhập mật khẩu'
                        autoComplete='password'
                        size='small'
                        name='password'
                        fullWidth
                    />
                </div>

                <Link href={"/password/reset"} className='inline-block transition-all duration-300 text-gray-500 mb-3 text-sm hover:underline hover:text-[#01796F]'>Quên mật khẩu?</Link>

                <Button type='submit' variant='contained' color='primary' fullWidth >Đăng Nhập</Button>
            </form>

            <Divider sx={{ marginBlock: '15px', color: '#6c757d', fontSize: '14px' }}>Hoặc đăng nhập với</Divider>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: '10px',
                    'img': {
                        width: '30px',
                        aspectRatio: 1
                    }
                }}
            >
                <Tooltip title="Github" arrow>
                    <IconButton color='primary' onClick={() => signIn("github")}>
                        <img src={`github.png`} alt="github" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Google" arrow>
                    <IconButton color='primary'>
                        <img src={`google.png`} alt="google" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Facebook" arrow>
                    <IconButton color='primary'>
                        <img src={`facebook.png`} alt="facebook" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default LoginForm