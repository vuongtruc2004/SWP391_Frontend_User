import { Box } from "@mui/material";

interface IProps {
    radius: number;
}
const LoginBanner = (props: IProps) => {
    const { radius } = props;
    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'blue',
            borderBottomLeftRadius: `${radius}px`,
            borderTopLeftRadius: `${radius}px`,
            backgroundImage: 'url(/login-banner.jpg)',
            backgroundPosition: 'left',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
        }} />
    )
}

export default LoginBanner