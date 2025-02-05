import { Box } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Khóa học",
};

const CourseLayout = ({ course, search }: { course: React.ReactNode, search: React.ReactNode }) => {
    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            bgcolor: '#101010',
            color: 'white',
            paddingTop: '120px'
        }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '20px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                {search}
                {course}
            </Box>
        </Box>
    )
}

export default CourseLayout