'use client'
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from 'next/link'
import { storageUrl } from '@/utils/url';
import Image from 'next/image';
import { displayPrice, displayProgressbar } from '@/helper/course.list.helper';
import { formatCreateDate } from '@/helper/blog.helper';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useState } from 'react';

const SingleCourseSlider = ({ course }: { course: CourseResponse }) => {
    const [status, setStatus] = useState<'not buy' | 'not start' | 'studying' | 'completed'>('not buy');

    return (
        <Box sx={{
            borderRadius: '6px',
            bgcolor: 'black',
            color: 'white',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)'
        }}>
            <Link href={`/course/${course.courseId}`} style={{
                display: 'block',
                width: '100%',
                height: `220px`,
                position: 'relative',
            }}>
                <Image src={`${storageUrl}/course/${course.thumbnail}`} alt={course.courseName} priority fill sizes="(max-width: 1000px) 100vw" style={{
                    objectFit: 'cover',
                    borderRadius: '6px',
                    objectPosition: 'center',
                    cursor: 'pointer',
                }} />
                <div className='bg-black absolute top-0 right-0 w-[100px] h-[50px] rounded-md rounded-bl-[30px]' />
                <div className='bg-green-800 absolute top-0 right-0 w-[95px] h-[45px] rounded-md rounded-bl-[26px] flex items-center justify-center gap-x-1'>
                    <HowToRegIcon sx={{ fontSize: '1.25rem' }} />
                    {course.totalPurchased}
                </div>
            </Link>

            <div className='p-5'>
                <Link href={`/course/${course.courseId}`} className='transition-all duration-150 text-xl font-semibold hover:underline hover:text-blue-500'>{course.courseName}</Link>
                {displayProgressbar(status)}
                <p
                    className='text-gray-400 my-1'
                    style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}
                >
                    {course.description}
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic commodi enim facere ullam corrupti nisi tenetur doloremque aliquam ratione quod.
                </p>

                <div className='text-sm'>
                    <div className="flex items-center gap-x-2 text-blue-500">
                        <p className="text-green-400">Giảng viên:</p>
                        <Link href={"/home"} className="hover:underline">{course.expert.user.fullname}</Link>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-gray-300'>Cập nhật lần cuối:</p>
                        <p className='text-purple-300'>{formatCreateDate(course.updatedAt ?? course.createdAt)}</p>
                    </div>
                </div>

                <Divider sx={{ marginBlock: '10px' }} />

                {displayPrice(course, status)}
            </div>
        </Box >
    )
}

export default SingleCourseSlider