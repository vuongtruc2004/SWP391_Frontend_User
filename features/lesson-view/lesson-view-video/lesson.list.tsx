'use client'
import { useEffect, useState } from "react";
import SingleLesson from "./single.lesson";
import { Avatar, Box, CircularProgress, Divider } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getNumberOfDocuments, getNumberOfVideos } from "@/helper/course.details.helper";
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { storageUrl } from "@/utils/url";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { countCompletionOfACourse } from "@/helper/lesson.helper";
import { useSession } from "next-auth/react";

const LessonList = () => {
    const { course, userProgress, currentPlayIndex, lectures, loading } = useCourseView();
    const [lessonsExpand, setLessonsExpand] = useState<number>(course.lessons[0].lessonId);
    const { data: session, status } = useSession();
    const [completionOfACourse, setCompletionOfACourse] = useState(0);

    const avatarSrc = course?.expert?.user?.avatar?.startsWith("http") ? course?.expert?.user?.avatar : `${storageUrl}/avatar/${course?.expert?.user?.avatar}`;

    useEffect(() => {
        const isVideo = "videoUrl" in lectures[currentPlayIndex];
        const idKey = isVideo ? "videoId" : "documentId";

        for (let lesson of course.lessons) {
            const lectureList = isVideo ? lesson.videos : lesson.documents;

            //@ts-ignore
            if (lectureList.some(item => item[idKey] === lectures[currentPlayIndex][idKey])) {
                setLessonsExpand(lesson.lessonId);
                break;
            }
        }
    }, [currentPlayIndex]);

    useEffect(() => {
        if (status === "authenticated") {
            setCompletionOfACourse(countCompletionOfACourse(userProgress, course, session.user.userId));
        }
    }, [session, userProgress]);

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, .05)',
                width: '100%',
                height: '100vh',
                position: 'sticky',
                top: 0,
                right: 0
            }}>
                <CircularProgress />
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
            overflow: 'auto',
            borderLeft: '1px solid #25272c',
        }}>
            <div className="flex-1">
                <div className="p-5">
                    <h1 className="font-semibold text-lg mb-1">Tiến độ của bạn</h1>

                    <div className={`text-sm flex items-center justify-between mb-1.5 text-gray-400`}>
                        <p>Đã hoàn thành {userProgress.length} / {getNumberOfVideos(course) + getNumberOfDocuments(course)} bài giảng</p>
                        <EmojiEventsIcon sx={{ fontSize: '1.2rem' }} className={completionOfACourse >= 99.9 ? "text-[#faaf00]" : ""} />
                    </div>
                    <BorderLinearProgress variant="determinate" value={completionOfACourse} height={4} thumb_color={completionOfACourse >= 99.9 ? "#05df72" : "#dab2ff"} />
                </div>

                <div className="flex flex-col">
                    {course.lessons.map((lesson, index) => {
                        return (
                            <SingleLesson
                                lesson={lesson}
                                index={index}
                                lessonsExpand={lessonsExpand}
                                setLessonsExpand={setLessonsExpand}
                                key={lesson.lessonId + "_" + lesson.title}
                            />
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