import { slugifyText } from "@/helper/blog.helper";
import { Button } from "@mui/material";
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DisplayCoursePrice from "./display.course.price";

const DisplayCourseBottomButton = ({ course, completionOfACourse }: { course: CourseResponse, completionOfACourse: number }) => {
    if (completionOfACourse < 0) {
        return (
            <>
                <DisplayCoursePrice course={course} fontSize="base" displayEndTime={true} />
                <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} className="block mt-2" color="secondary">
                    <Button variant="outlined" startIcon={<ShoppingCartIcon />} fullWidth>
                        Mua ngay
                    </Button>
                </Link>
            </>
        )

    } else if (completionOfACourse === 0) {
        return (
            <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                <Button variant='outlined' fullWidth startIcon={<PlayArrowIcon />}>
                    Bắt đầu học
                </Button>
            </Link>
        )

    } else if (completionOfACourse > 0 && completionOfACourse < 100) {
        return (
            <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                <Button variant='outlined' fullWidth startIcon={<PlayArrowIcon />}>
                    Tiếp tục học
                </Button>
            </Link>
        )
    }
    else if (completionOfACourse === 100) {
        return (
            <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                <Button variant='outlined' fullWidth startIcon={<ReplayIcon />}>
                    Xem lại khóa học
                </Button>
            </Link>
        )
    } else {
        return null;
    }
}

export default DisplayCourseBottomButton;