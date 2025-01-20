import { Box } from '@mui/material'
import React from 'react'

const SubjectList = () => {
    return (
        <>
            <h3 className='text-center font-bold uppercase text-2xl text-blue-950 mt-10'>Danh mục được quan tâm nhất</h3>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                width: '95%',
                margin: '40px auto 0',
            }}>
                <div className='flex items-center gap-x-3 rounded-md shadow-md p-3 cursor-pointer'>
                    <div className='bg-sky-200 text-blue-500 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm'>JAVA</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md shadow-md p-3 cursor-pointer'>
                    <div className='bg-orange-200 text-orange-500 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm'>JAVASCRIPT</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md shadow-md p-3 cursor-pointer'>
                    <div className='bg-green-200 text-green-500 flex items-center justify-center w-28 h-28 rounded-md grow-0 shrink-0'>
                        <p className='text-sm'>PYTHON</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md shadow-md p-3 cursor-pointer'>
                    <div className='bg-purple-200 text-purple-600 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm'>C++</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md shadow-md p-3 cursor-pointer'>
                    <div className='bg-teal-200 text-teal-600 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm'>TYPESCRIPT</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='text-gray-500 text-sm'>100+ Java course</p>
                    </div>
                </div>

                <div className='flex items-center gap-x-3 rounded-md shadow-md p-3 cursor-pointer'>
                    <div className='bg-red-200 text-red-500 flex items-center justify-center w-28 h-28 rounded-md flex-none'>
                        <p className='text-sm'>CSS</p>
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