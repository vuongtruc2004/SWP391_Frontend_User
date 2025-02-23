'use client'
import { useState } from "react";
import SingleLesson from "./single.lesson";
import { Avatar, Box, Divider, Skeleton } from "@mui/material";
import { useCoursePurchased } from "@/wrapper/course-purchased/course.purchased.wrapper";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getNumberOfDocuments, getNumberOfVideos } from "@/helper/course.details.helper";
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { storageUrl } from "@/utils/url";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";

const LessonList = () => {
    const { loading, getPercentage } = useCoursePurchased();
    const { course, userProgress } = useCourseView();
    const [lessonsExpand, setLessonsExpand] = useState<Set<number>>(new Set());

    const avatarSrc = course?.expert?.user?.avatar?.startsWith("http") ? course?.expert?.user?.avatar : `${storageUrl}/avatar/${course?.expert?.user?.avatar}`;

    const toggleLesson = (id: number) => {
        setLessonsExpand(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                bgcolor: 'rgba(255, 255, 255, .05)',
                width: '100%',
                padding: '20px',
                height: '100vh',
                position: 'sticky',
                top: 0,
                right: 0
            }}>
                <div>
                    <Skeleton variant="text" width={"80%"} sx={{ fontSize: '20px' }} animation="wave" />
                    <Skeleton variant="text" width={"60%"} sx={{ fontSize: '14px' }} animation="wave" />
                    <Skeleton variant="text" width={"100%"} sx={{ fontSize: '14px' }} animation="wave" />
                    <Skeleton variant="rounded" width={"100%"} height={300} animation="wave" />
                </div>
                <div>
                    <div className="flex items-center gap-x-3 mb-3">
                        <Skeleton variant="circular" width={50} height={50} animation="wave" />
                        <div>
                            <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} animation="wave" />
                            <Skeleton variant="text" width={100} sx={{ fontSize: '14px' }} animation="wave" />
                        </div>
                    </div>
                    <Skeleton variant="text" width={250} sx={{ fontSize: '14px' }} animation="wave" />
                    <Skeleton variant="text" width={220} sx={{ fontSize: '14px' }} animation="wave" />
                    <Skeleton variant="text" width={200} sx={{ fontSize: '14px' }} animation="wave" />
                    <Skeleton variant="text" width={200} sx={{ fontSize: '14px' }} animation="wave" />
                </div>
            </Box>
        )
    }

    return (
        <Box sx={{
            bgcolor: 'rgba(255, 255, 255, .05)',
            position: 'sticky',
            top: 0,
            right: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'auto'
        }}>
            <div className="flex-1">
                <div className="p-5">
                    <h1 className="font-semibold text-lg mb-1">Tiến độ của bạn</h1>

                    <div className={`text-sm flex items-center justify-between mb-1.5 text-gray-400`}>
                        <p>Đã hoàn thành {userProgress.length} / {getNumberOfVideos(course) + getNumberOfDocuments(course)} bài giảng</p>
                        <EmojiEventsIcon sx={{ fontSize: '1.2rem' }} className={getPercentage(course.courseId) === 100 ? "text-[#faaf00]" : ""} />
                    </div>
                    <BorderLinearProgress variant="determinate" value={getPercentage(course.courseId)} height={4} thumb_color={getPercentage(course.courseId) === 100 ? "#05df72" : "#dab2ff"} />
                </div>

                <div className="flex flex-col">
                    {course.lessons.map((lesson, index) => {
                        return (
                            <SingleLesson lesson={lesson} index={index} lessonsExpand={lessonsExpand} toggleLesson={toggleLesson} key={lesson.lessonId + "_" + lesson.title} />
                        )
                    })}
                </div>
            </div>

            <Divider sx={{ marginBlock: '0 20px', borderColor: '#25272c' }} />

            <div className="px-5 pb-5">
                <h1 className="font-semibold text-xl">Giảng viên</h1>
                <div className="flex items-center gap-x-2 mt-3 mb-2">
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

                <ul className="text-sm">
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
        </Box>
    )
}

export default LessonList