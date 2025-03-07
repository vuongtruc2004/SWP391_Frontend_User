'use client'
import { useEffect, useState } from "react";
import { Box, CircularProgress, Divider, IconButton, Tooltip } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import SingleChapter from "./single.chapter";
import { useUserProgress } from "@/wrapper/user-progress/user.progress.wrapper";
import { countCompletedLessonsOfACourse, countCompletionOfACourse } from "@/helper/lesson.helper";
import CloseIcon from '@mui/icons-material/Close';

const ChaptersList = () => {
    const { course, setOpenProgressBar } = useCourseView();
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
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                flexShrink: 0,
            }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between p-5">
                <h1 className="font-semibold text-lg">Tiến độ khóa học</h1>
                <Tooltip title="Ẩn tiến độ khóa học" arrow>
                    <IconButton color="secondary" onClick={() => setOpenProgressBar(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <Divider />

            <div className="px-5 py-5">
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
    )
}

export default ChaptersList