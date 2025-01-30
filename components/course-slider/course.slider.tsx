'use client'
import { Box } from '@mui/material';
import SingleCourseSlider from './single.course.slider'

interface IProps {
    courseList: CourseResponse[];
}
const CourseSlider = (props: IProps) => {
    const { courseList } = props;

    return (
        <>
            <h3 className='text-center font-bold uppercase text-2xl text-white mt-10'>Khóa học phổ biến</h3>
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