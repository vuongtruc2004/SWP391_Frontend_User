'use client'
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from 'next/link'
import { storageUrl } from '@/utils/url';
import Image from 'next/image';
import { displayPrice, displayProgressbar } from '@/helper/course.list.helper';
import { formatCreateDate } from '@/helper/blog.helper';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useCoursePurchased } from "@/wrapper/course-purchased/course.purchased.wrapper";
import { Skeleton } from "@mui/material";

const SingleCourseSlider = ({ course }: { course: CourseResponse }) => {
    const { purchasedCourses, loading, getPercentageByCourseId } = useCoursePurchased();

    if (loading) {
        return (
            <div>
                <Skeleton width={"100%"} height={220} animation="wave" variant="rounded" />
                <Skeleton width={"80%"} animation="wave" variant="text" sx={{ fontSize: '20px' }} />
                <Skeleton width={"60%"} animation="wave" variant="text" sx={{ fontSize: '14px' }} />
                <Skeleton width={"60%"} animation="wave" variant="text" sx={{ fontSize: '14px' }} />
            </div>
        )
    }

    return (
        <Box sx={{
            borderRadius: '6px',
            bgcolor: 'black',
            color: 'white',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            height: 'max-content'
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
                {displayProgressbar(getPercentageByCourseId(course.courseId), course.courseId)}
                <p className='text-gray-300 my-1 line-clamp-2'>
                    {course.description}
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic commodi enim facere ullam corrupti nisi tenetur doloremque aliquam ratione quod.
                </p>

                <div className='text-sm'>
                    <div className="flex items-center gap-x-2">
                        <p className="text-gray-300 font-semibold">Giảng viên:</p>
                        <p className="text-green-500">{course.expert.user.fullname}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-gray-300 font-semibold'>Cập nhật lần cuối:</p>
                        <p className='text-purple-300'>{formatCreateDate(course.updatedAt ?? course.createdAt)}</p>
                    </div>
                </div>

                <Divider sx={{ marginBlock: '10px' }} />

                {displayPrice(course, getPercentageByCourseId(course.courseId))}
            </div>
        </Box >
    )
}

export default SingleCourseSlider