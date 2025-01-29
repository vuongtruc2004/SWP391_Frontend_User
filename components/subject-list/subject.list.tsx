'use client'
import { Box } from '@mui/material'
import { useRef } from 'react'
import SubjectListMotion from './subject.list.motion'
import { useInView } from 'framer-motion';
import * as motion from "motion/react-client"

const SubjectList = () => {
    const h3Ref = useRef(null);
    const isInView = useInView(h3Ref, { margin: "-200px", once: true });

    const subjects = ["java", "javascript", "python", "c++", "typescript", "css"];
    return (
        <>
            <h3 ref={h3Ref} className='text-center font-bold uppercase text-2xl text-white mt-10'>Danh mục được quan tâm nhất</h3>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                width: '95%',
                maxWidth: '1200px',
                margin: '40px auto 0',
                'div:has(div)': {
                    background: 'black',
                    color: 'white',
                    transition: 'all .3s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        zIndex: '10',
                    },
                    zIndex: 2
                },
                position: 'relative'
            }}>
                <SubjectListMotion isInView={isInView} />
                {subjects.map((item, index) => {
                    return (
                        <motion.div
                            className='flex items-center gap-x-3 rounded-md p-3 cursor-pointer'
                            key={index}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.6 }}
                            transition={{
                                duration: 0.1,
                                ease: "easeOut",
                            }}
                        >
                            <div className='bg-blue-300 text-blue-500 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                                <p className='text-sm font-semibold uppercase'>{item}</p>
                            </div>
                            <div>
                                <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                                <p className='text-gray-500 text-sm'>100+ {item} course</p>
                            </div>
                        </motion.div>
                    )
                })}
            </Box>
        </>
    )
}

export default SubjectList