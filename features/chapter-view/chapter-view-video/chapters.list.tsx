'use client'
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import SingleChapter from "./single.chapter";
import { useUserProgress } from "@/wrapper/user-progress/user.progress.wrapper";
import { countCompletedLessonsOfACourse, countCompletionOfACourse } from "@/helper/lesson.helper";

const ChaptersList = () => {
    const { course, openProgressBar } = useCourseView();
    const { userProgresses, loading } = useUserProgress();

    const [chapterExpand, setChapterExpand] = useState<number>(course.chapters[0].chapterId);
    const [completionOfACourse, setCompletionOfACourse] = useState(0);

    useEffect(() => {
        if (userProgresses.length) {
            setCompletionOfACourse(countCompletionOfACourse(course, userProgresses));
        }
    }, [userProgresses]);

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, .05)',
                height: '100vh',
                position: 'sticky',
                top: 0,
                right: 0,
                flexShrink: 0,
                width: openProgressBar ? '380px' : 0,
            }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{
            bgcolor: 'rgba(255, 255, 255, .05)',
            position: openProgressBar ? 'sticky' : 'fixed',
            top: 0,
            right: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'auto',
            borderLeft: '1px solid #25272c',
            flexShrink: 0,
            transition: 'all .3s',
            width: openProgressBar ? '360px' : 0,
            textWrap: 'nowrap'
        }}>
            <div className="flex-1">
                <div className="p-5">
                    <h1 className="font-semibold text-lg mb-1">Tiến độ của bạn</h1>

                    <div className={`text-sm flex items-center justify-between mb-1.5 text-gray-400`}>
                        <p>Đã hoàn thành {countCompletedLessonsOfACourse(course, userProgresses)} / {course.totalLessons} bài giảng</p>
                        <EmojiEventsIcon sx={{ fontSize: '1.2rem' }} className={completionOfACourse >= 99.9 ? "text-[#faaf00]" : ""} />
                    </div>
                    <BorderLinearProgress variant="determinate" value={completionOfACourse} height={4} thumb_color={completionOfACourse >= 99.9 ? "#05df72" : "#dab2ff"} />
                </div>

                <div className="flex flex-col">
                    {course.chapters.map((chapter, index) => {
                        return (
                            <SingleChapter
                                chapter={chapter}
                                index={index}
                                chapterExpand={chapterExpand}
                                setChapterExpand={setChapterExpand}
                                key={chapter.chapterId + "_" + chapter.title}
                            />
                        )
                    })}
                </div>
            </div>
        </Box>
    )
}

export default ChaptersList