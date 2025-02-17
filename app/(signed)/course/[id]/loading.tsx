import { Box, Skeleton } from "@mui/material"

const LoadingCourseDetails = () => {
    return (
        <div className="pt-[120px]">
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '2.5fr 1fr',
                columnGap: '20px',
            }}>
                <Skeleton variant="rounded" width={"100%"} height={650} />
                <div className="flex flex-col gap-y-5">
                    <Skeleton variant="rounded" width={"100%"} height={300} />
                    <Skeleton variant="rounded" width={"100%"} height={100} />
                    <Skeleton variant="rounded" width={"100%"} height={200} />
                </div>
            </Box>
        </div>
    )
}

export default LoadingCourseDetails