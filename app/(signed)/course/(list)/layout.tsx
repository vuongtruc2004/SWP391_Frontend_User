import CourseListWrapper from "@/wrapper/course-list/course.list.wrapper";
import Box from "@mui/material/Box";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Khóa học",
};

const CourseLayout = ({ course, subject, expert }: { course: React.ReactNode, subject: React.ReactNode, expert: React.ReactNode }) => {
    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            bgcolor: '#101010',
            color: 'white',
            paddingBlock: '90px 40px'
        }}>
            <CourseListWrapper>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2.5fr',
                    gap: '20px',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        width: '100%'
                    }}>
                        {subject}
                        {expert}
                    </Box>
                    {course}
                </Box>
            </CourseListWrapper>
        </Box>
    )
}

export default CourseLayout