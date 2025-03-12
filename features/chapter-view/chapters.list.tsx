'use client'
import { useEffect, useState } from "react";
import { CircularProgress, Divider, IconButton, Tooltip } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import SingleChapter from "./single.chapter";
import { useUserProgress } from "@/wrapper/user-progress/user.progress.wrapper";
import { countCompletedLessonsOfACourse, countCompletedPercentOfACourse } from "@/helper/lesson.helper";
import CloseIcon from '@mui/icons-material/Close';

const ChaptersList = () => {
    const { course, setOpenProgressBar } = useCourseView();
    const { userProgresses, loading } = useUserProgress();

    const [chapterExpand, setChapterExpand] = useState<number>(course.chapters[0].chapterId);
    const [completionOfACourse, setCompletionOfACourse] = useState(0);

    useEffect(() => {
        if (userProgresses.length) {
            setCompletionOfACourse(countCompletedPercentOfACourse(course, userProgresses));
        }
    }, [userProgresses]);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen shrink-0">
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between p-5">
                <h1 className="font-semibold text-lg">Tiến độ khóa học</h1>
                <Tooltip title="Đóng tiến độ khóa học" arrow>
                    <IconButton color="secondary" onClick={() => setOpenProgressBar(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <Divider />

            <div className="px-5 py-5">
                <div className={`text-sm flex items-center justify-between mb-1.5 text-gray-400`}>
                    <p>Đã hoàn thành {countCompletedLessonsOfACourse(course, userProgresses)} / {course.totalLessons + course.totalQuizzes}</p>
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