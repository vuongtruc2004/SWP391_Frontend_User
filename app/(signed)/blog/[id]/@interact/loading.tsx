import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingInteract = () => {
    return (
        <Box>
            <Skeleton variant="rounded" width={'100%'} height={250} animation='wave' />
        </Box>
    )
}

export default LoadingInteract