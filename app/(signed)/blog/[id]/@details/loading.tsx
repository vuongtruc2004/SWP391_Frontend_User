import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingDetails = () => {
    return (
        <Box>
            <Skeleton variant="text" sx={{ fontSize: '20px' }} width={'60%'} />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '25px 2fr 1fr 1fr',
                alignItems: 'center',
                gap: '20px',
                width: '80%',
                marginBottom: '10px'
            }}>
                <Skeleton variant="circular" width={'100%'} height={25} />
                <Skeleton variant="text" sx={{ fontSize: '14px' }} width={'100%'} />
                <Skeleton variant="text" sx={{ fontSize: '14px' }} width={'100%'} />
                <Skeleton variant="text" sx={{ fontSize: '14px' }} width={'100%'} />
            </Box>
            <Skeleton variant="rounded" width={'100%'} height={250} animation='wave' />
            <Skeleton variant="text" sx={{ fontSize: '16px' }} width={'100%'} />
            <Skeleton variant="text" sx={{ fontSize: '16px' }} width={'80%%'} />
        </Box>
    )
}

export default LoadingDetails