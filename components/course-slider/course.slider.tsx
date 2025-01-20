import { Box } from '@mui/material'
import React from 'react'
import SingleCourseSlider from './single.course.slider'

const CourseSlider = () => {
    return (
        <>
            <h3 className='text-center font-bold uppercase text-2xl text-blue-950 mt-10'>Khóa học phổ biến</h3>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                width: '95%',
                maxWidth: '1260px',
                margin: '40px auto 0',
            }}>
                {Array.from({ length: 6 }).map((_, index) => {
                    return (
                        <SingleCourseSlider key={index} index={index} />
                    )
                })}
            </Box>
        </>
    )
}

export default CourseSlider