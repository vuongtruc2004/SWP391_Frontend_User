'use client'
import SingleCourseSlider from "@/components/course/course-slider/single.course.slider";
import { Box, useMediaQuery } from "@mui/material"

const FollowingExpertCourses = ({ courses }: { courses: CourseResponse[] }) => {
    const isSmallScreen = useMediaQuery('(max-width:1480px)');

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${isSmallScreen ? 2 : 3}, 1fr)`,
            gap: '20px',
        }}>
            {courses.map((course) => (
                <SingleCourseSlider key={course.courseId} course={course} />
            ))}
        </Box>
    )
}

export default FollowingExpertCourses