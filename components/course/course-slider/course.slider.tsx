'use client'
import Box from "@mui/material/Box";
import SingleCourseSlider from './single.course.slider'

const CourseSlider = ({ courseList }: { courseList: CourseResponse[] }) => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(3, 1fr)`,
            gap: '20px',
            width: '95%',
            maxWidth: '1200px',
            margin: '40px auto 0'
        }}>
            {courseList.map((course) => (
                <SingleCourseSlider key={course.courseId} course={course} />
            ))}
        </Box>
    )
}

export default CourseSlider