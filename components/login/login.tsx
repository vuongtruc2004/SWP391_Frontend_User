'use client'
import { Box, Button } from '@mui/material';
import LoginForm from './login.form'
import LoginBanner from './login.banner'
import { useRouter } from 'next/navigation'

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
                gridTemplateColumns: '60% 40%',
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
                }}>
                    <div className='w-full'>
                        <LoginForm />
                        <Button variant='outlined' onClick={() => router.push("/home")} sx={{ marginTop: '20px' }}>Về trang chủ</Button>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

export default Login