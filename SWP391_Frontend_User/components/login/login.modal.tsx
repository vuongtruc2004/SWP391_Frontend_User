'use client'
import { Box } from "@mui/material"
import { useRouter } from "next/navigation"
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from "@/features/login/login.form";

const LoginModal = () => {
    const router = useRouter();
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: '11',
        }}
            onClick={() => router.back()}
        >
            <div style={{
                width: '95%',
                maxWidth: '500px',
                borderRadius: '6px',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
                className="shadow-md shadow-black/50"
                onClick={(e) => e.stopPropagation()}
            >
                <Box sx={{
                    padding: '40px 25px',
                    background: 'linear-gradient(to bottom right, #000814, #15171c)',
                    position: 'relative',
                    borderRadius: '6px'
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
