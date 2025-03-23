'use client'
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from 'next/link'
import { storageUrl } from '@/utils/url';
import Image from 'next/image';
import { displayProgressbar } from '@/helper/course.list.helper';
import { formatDate, slugifyText } from '@/helper/blog.helper';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserProgress } from "@/wrapper/user-progress/user.progress.wrapper";
import { countCompletedPercentOfACourse } from "@/helper/lesson.helper";
import { useCoursePurchased } from "@/wrapper/course-purchased/course.purchased.wrapper";
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CourseTooltip from "./course.tooltip";
import { BootstrapTooltip } from "../course-content/style";
import DisplayCourseStatus from "./display.course.status";

const SingleCourseSlider = ({ course }: { course: CourseResponse }) => {
    const { userProgresses, loading } = useUserProgress();
    const { purchasedCourseIds } = useCoursePurchased();
    const [completionOfACourse, setCompletionOfACourse] = useState(-1);

    useEffect(() => {
        if (purchasedCourseIds.find(id => id === course.courseId)) {
            setCompletionOfACourse(countCompletedPercentOfACourse(course, userProgresses));
        }
    }, [userProgresses, purchasedCourseIds]);

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
        <BootstrapTooltip title={completionOfACourse < 0 ? <CourseTooltip course={course} /> : ""} placement="right">
            <Box sx={{
                borderRadius: '6px',
                bgcolor: 'black',
                color: 'white',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                height: 'max-content'
            }}>
                <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} style={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '2/1.1',
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
                    <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} className='transition-all duration-150 text-xl font-semibold hover:underline hover:text-blue-500'>{course.courseName}</Link>

                    {displayProgressbar(completionOfACourse, course)}

                    <p className='text-gray-300 mt-1 mb-2 line-clamp-3'>
                        {course.description}
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic commodi enim facere ullam corrupti nisi tenetur doloremque aliquam ratione quod.
                    </p>

                    <div className="flex items-center gap-x-2">
                        <p className="flex items-center gap-x-1.5">
                            <SchoolOutlinedIcon className="text-gray-400" sx={{ fontSize: '1.25rem' }} />
                            <span className="text-gray-300 text-nowrap">Giảng viên:</span>
                        </p>
                        <p className="text-green-500 line-clamp-1">{course.expert.user.fullname}</p>
                    </div>

                    <div className='flex items-center gap-x-2'>
                        <p className='flex items-center gap-x-1.5'>
                            <UpdateOutlinedIcon className="text-gray-400" sx={{ fontSize: '1.25rem' }} />
                            <span className="text-gray-300 "> Cập nhật lần cuối:</span>
                        </p>
                        <p className='text-purple-300'>{formatDate(course.updatedAt ?? course.createdAt)}</p>
                    </div>

                    <Divider sx={{ marginBlock: '10px' }} />

                    <DisplayCourseStatus course={course} status={completionOfACourse} />
                </div >
            </Box >
        </BootstrapTooltip>
    )
}

export default SingleCourseSlider