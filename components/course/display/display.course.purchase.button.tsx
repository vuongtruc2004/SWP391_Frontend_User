import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import ReplayIcon from '@mui/icons-material/Replay';
import Link from "next/link";
import { slugifyText } from "@/helper/blog.helper";

const DisplayCoursePurchaseButton = ({ course, completionOfACourse }: { course: CourseResponse, completionOfACourse: number }) => {
    if (completionOfACourse === 0) {
        return (
            <>
                <div className='flex items-center gap-x-2 w-full my-2'>
                    <BorderLinearProgress variant="determinate" value={0} sx={{ flex: 1 }} />
                    <p className='text-gray-300 font-semibold'>{0}%</p>
                </div>
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                    <Button variant="outlined" color="primary" fullWidth startIcon={<PlayArrowIcon />}>
                        Bắt đầu học
                    </Button>
                </Link>
            </>
        )
    } else if (completionOfACourse > 0 && completionOfACourse < 100) {
        return (
            <>
                <div className='flex items-center gap-x-2 w-full my-2'>
                    <BorderLinearProgress variant="determinate" value={completionOfACourse} sx={{ flex: 1 }} />
                    <p className='text-purple-300 font-semibold'>{completionOfACourse.toFixed(1)}%</p>
                </div>
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                    <Button variant="outlined" color="primary" fullWidth startIcon={<PlayArrowIcon />}>
                        Tiếp tục học
                    </Button>
                </Link>
            </>
        )
    } else if (completionOfACourse === 100) {
        return (
            <>
                <div className='flex items-center gap-x-2 w-full my-2'>
                    <BorderLinearProgress variant="determinate" value={100} sx={{ flex: 1 }} thumb_color="#00c951" />
                    <p className='text-green-500 font-semibold'>{100}%</p>
                </div>
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                    <Button variant="outlined" color="primary" fullWidth startIcon={<ReplayIcon />}>
                        Xem lại khóa học
                    </Button>
                </Link>
            </>
        )
    } else {
        return null;
    }
}

export default DisplayCoursePurchaseButton