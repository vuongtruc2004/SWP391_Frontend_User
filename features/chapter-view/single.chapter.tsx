import { AccordionDetails, Box, Checkbox } from "@mui/material";
import { Accordion, AccordionSummary, FacebookCircularProgress } from "./style";
import { countCompletionOfAChapter, countTotalTimeOfAChapter } from "@/helper/lesson.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import { formatDuration, formatDurationWithTail } from "@/helper/course.details.helper";
import { useUserProgress } from "@/wrapper/user-progress/user.progress.wrapper";
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

const SingleChapter = ({ chapter, index, chapterExpand, setChapterExpand }: {
    chapter: ChapterResponse,
    index: number,
    chapterExpand: number,
    setChapterExpand: React.Dispatch<SetStateAction<number>>;
}) => {
    const { data: session, status } = useSession();
    const { currentPlayIndex, setCurrentPlayIndex, course, lessons } = useCourseView();
    const { userProgresses, setUserProgresses } = useUserProgress();

    const [completionOfChapter, setCompletionOfChapter] = useState(0);
    const [playingChapter, setPlayingChapter] = useState<number | null>(null);
    const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());

    const handleChangeCurrentPlayIndex = (clickID: number, type: "lessonId" | "quizId") => {
        //@ts-ignore
        const index = lessons.findIndex(lesson => lesson[type] === clickID);
        setCurrentPlayIndex(index);
    };


    useEffect(() => {
        if (userProgresses.length) {
            const set = new Set<number>();
            userProgresses.forEach(progress => {
                set.add(progress.lessonId);
            });
            setCompletedItems(set);
        }
        setCompletionOfChapter(countCompletionOfAChapter(chapter, userProgresses));
    }, [userProgresses]);

    useEffect(() => {
        const chapterId = lessons[currentPlayIndex].chapterId;
        setChapterExpand(chapterId);
        setPlayingChapter(chapterId);
    }, [currentPlayIndex]);

    return (
        <Accordion
            expanded={chapterExpand === chapter.chapterId}
            onChange={() => setChapterExpand(chapter.chapterId)}
            slotProps={{ transition: { unmountOnExit: true } }}
        >
            <AccordionSummary>
                <div className="flex items-center gap-x-3">
                    <FacebookCircularProgress
                        variant="determinate"
                        thumb_color={completionOfChapter >= 99.9 ? "#05df72" : ""}
                        value={completionOfChapter}
                        percentage={(
                            <p className={`text-sm ${completionOfChapter >= 99.9 ? "text-green-400" : (completionOfChapter === 0 ? "text-gray-300" : "text-purple-300")}`}>
                                {index + 1}
                            </p>
                        )}
                    />

                    <div className="flex flex-col max-w-[260px]">
                        <p className={`text-wrap line-clamp-1 ${playingChapter === chapter.chapterId && 'text-purple-300'}`}>{chapter.title}</p>
                        <div className="text-gray-300 text-sm flex items-center gap-x-2">
                            <p>{chapter.lessons.length} bài giảng</p>
                            <p>•</p>
                            {chapter.quizInfo && (
                                <>
                                    <p>1 bài kiểm tra</p>
                                    <p>•</p>
                                </>
                            )}
                            <p>{countTotalTimeOfAChapter(chapter)}</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0 }}>
                {chapter.lessons.map(lesson => {
                    return (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            columnGap: '50px',
                            padding: '15px 20px',
                            bgcolor: '#101010',
                            cursor: 'pointer'
                        }}
                            key={lesson.lessonId + "_" + lesson.title}
                            onClick={() => handleChangeCurrentPlayIndex(lesson.lessonId, "lessonId")}
                        >
                            {lesson.lessonType === "VIDEO" ? (
                                <div className="flex items-center">
                                    <SmartDisplayOutlinedIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                                    <div className="max-w-[200px]">
                                        <p className={`${"lessonId" in lessons[currentPlayIndex] && lessons[currentPlayIndex].lessonId === lesson.lessonId ? "text-purple-300" : ""} text-wrap line-clamp-1`}>{lesson.title}</p>
                                        <p className="text-gray-300 text-sm flex items-center gap-x-1">
                                            <span>Video</span>
                                            <span>•</span>
                                            <span>{formatDuration(lesson.duration)}</span>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <AutoStoriesOutlinedIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                                    <div className="max-w-[200px]">
                                        <p className={`${"lessonId" in lessons[currentPlayIndex] && lessons[currentPlayIndex].lessonId === lesson.lessonId ? "text-purple-300" : ""} text-wrap line-clamp-1`}>{lesson.title}</p>
                                        <p className="text-gray-300 text-sm flex items-center gap-x-1">
                                            <span>Tài liệu đọc thêm</span>
                                            <span>•</span>
                                            <span>{Math.ceil(lesson.duration / 60)} phút đọc</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                            <Checkbox
                                size="small"
                                checked={completedItems.has(lesson.lessonId)}
                                disabled
                            />
                        </Box>
                    )
                })}
                {chapter.quizInfo && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        columnGap: '50px',
                        padding: '15px 20px',
                        bgcolor: '#101010',
                        cursor: 'pointer'
                    }}
                        key={chapter.quizInfo.quizId + "_" + chapter.quizInfo.title}
                        onClick={() => handleChangeCurrentPlayIndex(chapter.quizInfo.quizId, "quizId")}
                    >
                        <div className="flex items-center">
                            <QuizOutlinedIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                            <div>
                                <p className={`${"quizId" in lessons[currentPlayIndex] && lessons[currentPlayIndex].quizId === chapter.quizInfo.quizId ? "text-purple-300" : ""} text-wrap line-clamp-1`}>{chapter.quizInfo.title}</p>
                                <p className="text-gray-300 text-sm flex items-center gap-x-1">
                                    <span>Bài kiểm tra</span>
                                    <span>•</span>
                                    <span>{formatDurationWithTail(chapter.quizInfo.duration)}</span>
                                    <span>•</span>
                                    <span>{chapter.quizInfo.totalQuestions} câu hỏi</span>
                                </p>
                            </div>
                        </div>
                        <Checkbox
                            size="small"
                            checked={completedItems.has(chapter.quizInfo.quizId)}
                            disabled
                        />
                    </Box>
                )}
            </AccordionDetails>
        </Accordion >
    )
}

export default SingleChapter