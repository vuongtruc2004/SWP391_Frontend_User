import { Box } from "@mui/material"

const LoginBanner = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '450px',
            objectFit: 'cover',
            objectPosition: 'center bottom',
            borderRadius: '0 10px 10px 0',
            backgroundImage: 'url(/banner.jpg)'
        }}>
        </Box>
    )
}

export default LoginBanner