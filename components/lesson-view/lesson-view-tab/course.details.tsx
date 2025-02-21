import StarIcon from '@mui/icons-material/Star';
import { countTotalTime } from "@/helper/course.details.helper";
import CourseObjectives from "@/components/course/course-details/course.objectives";
import CourseSubject from "@/components/course/course-details/course.subject";

const CourseDetails = ({ course }: { course: CourseDetailsResponse }) => {
    return (
        <div className="mt-5">
            <h2 className="text-xl font-semibold mb-1 flex items-center gap-x-1">Mô tả khóa học</h2>
            <p className="text-gray-300 mb-3">{course.description}</p>

            <ul className="flex items-start gap-x-8 mb-5">
                <li className="flex flex-col items-start">
                    <p className="font-semibold flex items-center gap-x-1 text-orange-400">{course.averageRating.toFixed(1)}<StarIcon sx={{ fontSize: '1.2rem', color: '#faaf00' }} /></p>
                    <p className="text-sm text-gray-300">{course.totalRating} đánh giá</p>
                </li>
                <li className="flex flex-col items-start">
                    <p className="font-semibold">{course.totalPurchased}</p>
                    <p className="text-sm text-gray-300">Học viên</p>
                </li>
                <li className="flex flex-col items-start">
                    <p className="font-semibold">{countTotalTime(course)}</p>
                    <p className="text-sm text-gray-300">Tổng thời lượng</p>
                </li>
            </ul>

            <h2 className="text-xl font-semibold mb-1 flex items-center gap-x-1">Mục tiêu khóa học</h2>
            <CourseObjectives course={course} removeHeader />

            <CourseSubject course={course} removeHeader />
        </div>
    )
}

export default CourseDetails