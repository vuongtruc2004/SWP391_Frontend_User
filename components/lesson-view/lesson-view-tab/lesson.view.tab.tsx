'use client'
import Box from '@mui/material/Box';
import { useState } from 'react';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { Avatar, Button } from '@mui/material';
import { storageUrl } from '@/utils/url';
import { formatCreateDate } from '@/helper/blog.helper';
import CourseDetails from './course.details';
import CourseRating from './course.rating';

const LessonViewTab = ({ course }: { course: CourseDetailsResponse }) => {
    const avatarSrc = course?.expert?.user?.avatar?.startsWith("http") ? course?.expert?.user?.avatar : `${storageUrl}/avatar/${course?.expert?.user?.avatar}`;
    const [currentTab, setCurrentTab] = useState(1);

    return (
        <Box sx={{ width: '100%', padding: '20px' }}>

            <h1 className="text-2xl font-semibold">{course.courseName}</h1>
            <p className='text-sm flex items-center gap-x-2 text-gray-300'>Cập nhật lần cuối {formatCreateDate(course.updatedAt)}</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2 mt-3 mb-2">
                    <Avatar src={avatarSrc} sx={{
                        width: '40px',
                        height: '40px',
                    }}>
                        {course?.expert?.user?.fullname.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="font-semibold text-sm">
                        <p>{course?.expert?.user?.fullname}</p>
                        <p className="text-gray-400">{course?.expert?.job}</p>
                    </div>
                </div>
                <ul className="text-sm flex items-center gap-x-3">
                    <Button variant='outlined' color='secondary' sx={{
                        borderRadius: '30px',
                        textTransform: 'none',
                        pointerEvents: 'none'
                    }}
                        startIcon={<SchoolIcon />}>
                        {course?.expert?.totalStudents} học sinh
                    </Button>
                    <Button variant='outlined' color='secondary' sx={{
                        borderRadius: '30px',
                        textTransform: 'none',
                        pointerEvents: 'none'
                    }}
                        startIcon={<SmartDisplayIcon />}>
                        {course?.expert?.totalCourses} khóa học
                    </Button>
                    <Button variant='outlined' color='secondary' sx={{
                        borderRadius: '30px',
                        textTransform: 'none',
                        pointerEvents: 'none'
                    }}
                        startIcon={<WorkHistoryIcon />}>
                        {course?.expert?.yearOfExperience} năm kinh nghiệm
                    </Button>
                </ul>
            </div>

            <div className='flex items-center gap-x-5 mt-5'>
                <Button variant='outlined' color={currentTab === 1 ? 'info' : 'secondary'} sx={{ borderRadius: '30px' }} onClick={() => setCurrentTab(1)}>
                    Tổng quan về khóa học
                </Button>
                <Button variant='outlined' color={currentTab === 2 ? 'info' : 'secondary'} sx={{ borderRadius: '30px' }} onClick={() => setCurrentTab(2)}>
                    Đánh giá về khóa học
                </Button>
                <Button variant='outlined' color={currentTab === 3 ? 'info' : 'secondary'} sx={{ borderRadius: '30px' }} onClick={() => setCurrentTab(3)}>
                    Hỏi đáp
                </Button>
            </div>

            <div>
                {currentTab === 1 && (
                    <CourseDetails course={course} />
                )}
                {currentTab === 2 && (
                    <CourseRating course={course} />
                )}
                {currentTab === 3 && (
                    <p>
                        Hỏi đáp
                    </p>
                )}
            </div>
        </Box>
    );
}

export default LessonViewTab;
