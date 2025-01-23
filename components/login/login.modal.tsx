'use client'
import { Box } from "@mui/material"
import { useRouter } from "next/navigation"
import LoginBanner from "./login.banner"
import LoginForm from "./login.form";
import CloseIcon from '@mui/icons-material/Close';

const LoginModal = () => {
    const router = useRouter();
    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            bgcolor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '11',
        }}
            onClick={() => router.back()}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: '60% 40%',
                width: '95%',
                minWidth: '1200px',
                maxWidth: '1600px',
                borderRadius: '6px'
            }}
                className="shadow-md shadow-black/50"
                onClick={(e) => e.stopPropagation()}
            >
                <LoginBanner radius={6} />
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 25px',
                    background: 'linear-gradient(to bottom right, #000814, #15171c)',
                    position: 'relative',
                    borderRadius: '0 6px 6px 0'
                }}>
                    <LoginForm />
                    <span
                        className="absolute top-[15px] right-[15px] cursor-pointer text-white hover:text-blue-500"
                        onClick={() => router.back()}
                    >
                        <CloseIcon />
                    </span>
                </Box>
            </div>
        </Box>
    )
}

export default LoginModal
