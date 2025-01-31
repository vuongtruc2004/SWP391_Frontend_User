'use client'
import { Box, Divider } from '@mui/material'
import Link from 'next/link'
import { storageUrl } from '@/utils/url';
import Image from 'next/image';
import { displayPrice, displayProgressbar } from '@/helper/course.helper';
import { formatCreateDate } from '@/helper/blog.helper';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useState } from 'react';

interface IProps {
    course: CourseResponse;
}
const SingleCourseSlider = (props: IProps) => {
    const { course } = props;
    const [status, setStatus] = useState<'not buy' | 'not start' | 'studying' | 'completed'>('not buy');

    return (
        <Box sx={{
            borderRadius: '4px',
            bgcolor: 'black',
            color: 'white',
        }}>
            <Link href={`/course/${course.courseId}`} style={{
                display: 'block',
                width: '100%',
                height: `220px`,
                position: 'relative',
            }}>
                <Image src={`${storageUrl}/course/${course.thumbnail}`} alt={course.courseName} fill sizes="(max-width: 1000px) 100vw" style={{
                    objectFit: 'cover',
                    borderRadius: '4px',
                    objectPosition: 'center',
                    cursor: 'pointer',
                }} />
                <div className='bg-black absolute top-0 right-0 w-[100px] h-[50px] rounded-sm rounded-bl-[30px]' />
                <div className='bg-green-800 absolute top-0 right-0 w-[95px] h-[45px] rounded-sm rounded-bl-[26px] flex items-center justify-center gap-x-1'>
                    <HowToRegIcon sx={{ fontSize: '1.25rem' }} />
                    10{course.totalPurchased}
                </div>
            </Link>

            <div className='p-5'>
                <h1 className='text-xl font-semibold'>{course.courseName}</h1>
                {displayProgressbar(status)}
                <p
                    className='text-gray-400 my-1'
                    style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4,
                    }}
                >
                    {course.description}
                </p>

                <div className='text-[15px]'>
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