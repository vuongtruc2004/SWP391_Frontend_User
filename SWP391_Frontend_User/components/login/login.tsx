'use client'
import { Box, IconButton, Tooltip } from '@mui/material';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from 'next/navigation';
import LoginForm from '@/features/login/login.form';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#101010'
        }}
        >
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
                borderRadius: '6px'
            }}>
                <div className='w-full'>
                    <LoginForm />
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
            </Box>
        </Box>
    )
}

export default Login