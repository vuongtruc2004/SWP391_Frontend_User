import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { storageUrl } from "@/utils/url";
import StarIcon from '@mui/icons-material/Star';
import { countTotalTime } from "@/helper/course.details.helper";
import CourseObjectives from "@/components/course/course-details/course.objectives";
import CourseSubject from "@/components/course/course-details/course.subject";
import { useCourseView } from '@/wrapper/course-view/course.view.wrapper';
import { Avatar, Box } from '@mui/material';
import { useState } from 'react';

const CourseDetails = () => {
    const { course } = useCourseView();
    const avatarSrc = course?.expert?.user?.avatar?.startsWith("http") ? course?.expert?.user?.avatar : `${storageUrl}/avatar/${course?.expert?.user?.avatar}`;

    const [expandDescription, setExpandDescription] = useState(false);

    return (
        <Box>
            <h2 className="text-xl font-semibold flex items-center gap-x-1">{course.courseName}</h2>
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

            <div className='max-w-[650px] mt-5'>
                <h1 className="font-semibold text-xl">Giảng viên</h1>
                <div className="flex items-center gap-x-2 my-2">
                    <Avatar src={avatarSrc} sx={{
                        width: '50px',
                        height: '50px',
                    }}>
                        {course?.expert?.user?.fullname.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                        <p className="font-semibold">{course?.expert?.user?.fullname}</p>
                        <p className="text-sm text-gray-400 font-semibold">{course?.expert?.job}</p>
                    </div>
                </div>

                <p className={`text-gray-300 ${expandDescription ? "" : "line-clamp-3"} mb-0.5 cursor-pointer`}
                    onClick={() => setExpandDescription(prev => !prev)}>
                    {course?.expert?.description}
                </p>

                <ul className="text-sm grid grid-cols-2">
                    <li className="flex items-center gap-x-2 py-1.5">
                        <WorkspacePremiumIcon sx={{ fontSize: '1.2rem' }} />
                        <p>{course?.expert?.achievement}</p>
                    </li>
                    <li className="flex items-center gap-x-2 py-1.5">
                        <WorkHistoryIcon sx={{ fontSize: '1.2rem' }} />
                        <p><span className="font-semibold text-green-500">{course?.expert?.yearOfExperience}</span> năm kinh nghiệm</p>
                    </li>
                    <li className="flex items-center gap-x-2 py-1.5">
                        <SchoolIcon sx={{ fontSize: '1.2rem' }} />
                        <p>{course?.expert?.totalStudents} học sinh</p>
                    </li>
                    <li className="flex items-center gap-x-2 py-1.5">
                        <SmartDisplayIcon sx={{ fontSize: '1.2rem' }} />
                        <p><span className="font-semibold text-purple-300">{course?.expert?.totalCourses}</span> khóa học</p>
                    </li>
                </ul>
            </div>
        </Box >
    )
}

export default CourseDetails