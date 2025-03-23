import Link from "next/link";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Box } from "@mui/material";
import { slugifyText } from "@/helper/blog.helper";

const DisplayCourseProgress = ({ course, completionOfACourse }: { completionOfACourse: number, course: CourseResponse }) => {
    if (completionOfACourse < 0) {
        return null;
    }
    else if (completionOfACourse === 0) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBlock: '8px',
                columnGap: '25px'
            }}>
                <div className='flex items-center gap-x-2 w-full'>
                    <BorderLinearProgress variant="determinate" value={0} sx={{ flex: 1 }} />
                    <p className='text-gray-300 font-semibold'>{0}%</p>
                </div>
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`} className='text-nowrap inline-flex items-center gap-x-1 transition-all duration-200 cursor-pointer text-gray-300 hover:text-purple-500'>
                    <PlayArrowIcon />
                    <p>Bắt đầu</p>
                </Link>
            </Box>
        )
    } else if (completionOfACourse > 0 && completionOfACourse < 100) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBlock: '8px',
                columnGap: '25px'
            }}>
                <div className='flex items-center gap-x-2 w-full'>
                    <BorderLinearProgress variant="determinate" value={completionOfACourse} sx={{ flex: 1 }} />
                    <p className='text-purple-500 font-semibold'>{completionOfACourse.toFixed(1)}%</p>
                </div>
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`} className='text-nowrap inline-flex items-center gap-x-1 transition-all duration-200 cursor-pointer text-purple-400 hover:text-green-500'>
                    <PlayArrowIcon />
                    <p>Tiếp tục</p>
                </Link>
            </Box>
        )
    } else if (completionOfACourse === 100) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBlock: '8px',
                columnGap: '25px',
            }}>
                <BorderLinearProgress variant="determinate" value={100} sx={{ width: '100%' }} thumb_color="#00c951" />
                <div className='text-sm text-nowrap inline-flex items-center gap-x-1 text-green-500'>
                    <DoneAllIcon />
                    <p>Đã hoàn thành</p>
                </div>
            </Box>
        )
    } else {
        return null;
    }
}

export default DisplayCourseProgress