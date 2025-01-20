import { Box } from '@mui/material'
import React from 'react'

const SubjectList = () => {
    return (
        <>
            <h3 className='text-center font-bold uppercase text-2xl text-white mt-10'>Danh mục được quan tâm nhất</h3>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                width: '95%',
                maxWidth: '1200px',
                margin: '40px auto 0',
                'div:has(div)': {
                    background: '#15171c',
                    color: 'white',
                    transition: 'all .3s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        zIndex: '10',
                    }
                }
            }}>
                <div className='flex items-center gap-x-3 rounded-md p-3 cursor-pointer'>
                    <div className='bg-blue-300 text-blue-500 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm font-semibold'>JAVA</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md p-3 cursor-pointer'>
                    <div className='bg-orange-200 text-orange-500 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm font-semibold'>JAVASCRIPT</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md p-3 cursor-pointer'>
                    <div className='bg-green-200 text-green-500 flex items-center justify-center w-28 h-28 rounded-md grow-0 shrink-0'>
                        <p className='text-sm font-semibold'>PYTHON</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md p-3 cursor-pointer'>
                    <div className='bg-purple-200 text-purple-600 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm font-semibold'>C++</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md p-3 cursor-pointer'>
                    <div className='bg-teal-200 text-teal-600 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm font-semibold'>TYPESCRIPT</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md p-3 cursor-pointer'>
                    <div className='bg-red-200 text-red-500 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm font-semibold'>CSS</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default SubjectList