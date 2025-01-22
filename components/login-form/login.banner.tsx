'use client'
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ReplyIcon from '@mui/icons-material/Reply';

const LoginBanner = () => {
    const router = useRouter();
    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'blue',
            height: '500px',
            borderBottomLeftRadius: '50px',
            borderTopLeftRadius: '6px',
            backgroundImage: 'url(/login-banner.jpg)',
            backgroundPosition: 'left',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
        }}>
            <Button
                onClick={() => router.push("/home")}
                variant="contained"
                size="small"
                sx={{
                    paddingInline: '20px',
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    borderRadius: '6px'
                }}
                startIcon={<ReplyIcon />}
            >
                Về trang chủ
            </Button>
        </Box>
    )
}

export default LoginBanner