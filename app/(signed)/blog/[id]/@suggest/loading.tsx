import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingSuggest = () => {
    return (
        <Box>
            <Skeleton variant="rounded" width={'100%'} height={250} animation='wave' sx={{ marginBottom: '20px' }} />
            <Skeleton variant="rounded" width={'100%'} height={363} animation='wave' />
        </Box>
    )
}

export default LoadingSuggest