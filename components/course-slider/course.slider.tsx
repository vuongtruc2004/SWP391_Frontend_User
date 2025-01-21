'use client'
import { Box } from '@mui/material';
import SingleCourseSlider from './single.course.slider'
import CourseSliderMotion from './course.slider.motion'
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const CourseSlider = () => {
    const h3Ref = useRef(null);
    const isInView = useInView(h3Ref, { margin: "-200px" });

    return (
        <>
            <div className='relative'>
                <h3 ref={h3Ref} className='text-center font-bold uppercase text-2xl text-white mt-10'>Khóa học phổ biến</h3>
                <CourseSliderMotion isInView={isInView} />
            </div>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                width: '95%',
                maxWidth: '1200px',
                margin: '40px auto 0'
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