import Box from "@mui/material/Box";
import SingleCourseSlider from './single.course.slider'

const CourseSlider = ({ courseList }: { courseList: CourseResponse[]; }) => {
    return (
        <>
            <h1 className='text-center font-bold uppercase text-2xl text-white mt-10'>Khóa học phổ biến</h1>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                width: '95%',
                maxWidth: '1200px',
                margin: '40px auto 0'
            }}>
                {courseList?.map((item) => {
                    return (
                        <SingleCourseSlider key={item.courseId} course={item} />
                    )
                })}
            </Box>
        </>
    )
}

export default CourseSlider