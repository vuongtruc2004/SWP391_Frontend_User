'use client'
import { Box, IconButton } from '@mui/material';
import LoginForm from './login.form'
import LoginBanner from './login.banner'
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: '55% 45%',
                width: '100%',
                height: '100vh'
            }}
            >
                <LoginBanner radius={0} />
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 25px',
                    background: 'linear-gradient(to bottom right, #000814, #15171c)',
                    position: 'relative'
                }}>
                    <div className='w-full'>
                        <LoginForm />
                    </div>
                    <IconButton sx={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        '&:hover': {
                            color: '#60a5fa'
                        }
                    }}
                        onClick={() => router.back()}
                    >
                        <FirstPageOutlinedIcon />
                    </IconButton>
                </Box>
            </div>
        </Box>
    )
}

export default Login