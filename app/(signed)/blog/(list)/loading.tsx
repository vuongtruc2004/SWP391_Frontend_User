import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingBlog = () => {
    return (
        <Box sx={{
            padding: '20px',
            paddingTop: '120px'
        }}>

            <Skeleton variant="rounded" width={'100%'} height={40} animation='wave' />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '5fr 1fr 1fr',
                gap: '20px',
                marginTop: '20px'
            }}>
                <Skeleton variant="rounded" width={'100%'} height={40} animation='wave' />
                <Skeleton variant="rounded" width={'100%'} height={40} animation='wave' />
                <Skeleton variant="rounded" width={'100%'} height={40} animation='wave' />
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginTop: '20px'
            }}>
                {Array.from({ length: 6 }).map((_, index) => {
                    return (
                        <Box key={index}>
                            <Skeleton variant="rounded" width={'100%'} height={220} animation='wave' />
                            <Skeleton variant="text" sx={{ fontSize: '20px' }} width={'80%'} />
                            <Skeleton variant="text" sx={{ fontSize: '16px' }} width={'60%'} />
                            <Skeleton variant="text" sx={{ fontSize: '14px' }} width={'50%'} />
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default LoadingBlog