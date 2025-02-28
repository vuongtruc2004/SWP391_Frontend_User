import { AccordionDetails, Box, Checkbox } from "@mui/material";
import { Accordion, AccordionSummary, FacebookCircularProgress } from "../style";
import { countCompletionOfAChapter, countTotalTimeInAChapter } from "@/helper/lesson.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { SetStateAction, useEffect, useState } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import { convertSecondToTime } from "@/helper/course.details.helper";

const SingleChapter = ({ chapter, index, chapterExpand, setChapterExpand }: {
    chapter: ChapterResponse,
    index: number,
    chapterExpand: number,
    setChapterExpand: React.Dispatch<SetStateAction<number>>;
}) => {
    const { data: session, status } = useSession();
    const { currentPlayIndex, setCurrentPlayIndex, userProgress, course, setUserProgress, lessons } = useCourseView();

    const [completionOfChapter, setCompletionOfChapter] = useState(0);
    const [playingChapter, setPlayingChapter] = useState<number | null>(null);
    const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());

    const handleChangeStatus = async (lessonId: number) => {
        if (status === "authenticated") {
            const request: UserProgressRequest = {
                courseId: course.courseId,
                chapterId: chapter.chapterId,
                lessonId: lessonId,
            }
            const userProgressResponse = await sendRequest<ApiResponse<UserProgressResponse>>({
                url: `${apiUrl}/progress`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: request
            });
            if (userProgressResponse.status === 200) {
                setUserProgress(prev => [...prev, userProgressResponse.data]);
            }
        }
    }

    const handleChangeCurrentPlayIndex = (clickedLessonId: number) => {
        const index = lessons.findIndex(lesson => lesson.lessonId === clickedLessonId);
        setCurrentPlayIndex(index);
    }

    useEffect(() => {
        if (userProgress.length) {
            const set = new Set<number>();
            userProgress.forEach(progress => {
                set.add(progress.lessonId);
            });
            setCompletedItems(set);
        }
        setCompletionOfChapter(countCompletionOfAChapter(chapter, userProgress));
    }, [userProgress]);

    useEffect(() => {
        for (let chapter of course.chapters) {
            if (chapter.lessons.find(lesson => lesson.lessonId === lessons[currentPlayIndex].lessonId)) {
                setChapterExpand(chapter.chapterId);
                setPlayingChapter(chapter.chapterId);
            }
        }
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
                                {playingChapter === chapter.chapterId ? <FlagIcon sx={{ fontSize: '1rem' }} /> : `${index + 1}`}
                            </p>
                        )}
                    />

                    <div className="flex flex-col">
                        <p className="text-wrap line-clamp-1">{chapter.title}</p>
                        <div className="text-gray-300 text-sm flex items-center gap-x-2">
                            <p>{chapter.lessons.length} bài giảng</p>
                            <p>•</p>
                            <p>{countTotalTimeInAChapter(chapter)}</p>
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
                            onClick={() => handleChangeCurrentPlayIndex(lesson.lessonId)}
                        >
                            {lesson.lessonType === "VIDEO" ? (
                                <div className="flex items-center">
                                    <SmartDisplayOutlinedIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                                    <div className="max-w-[200px]">
                                        <p className={`${lessons[currentPlayIndex].lessonId === lesson.lessonId ? "text-purple-300" : ""} text-wrap line-clamp-1`}>{lesson.title}</p>
                                        <p className="text-gray-300 text-sm flex items-center gap-x-1">
                                            <span>Video</span>
                                            <span>•</span>
                                            <span>{convertSecondToTime(lesson.duration)}</span>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <AutoStoriesOutlinedIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                                    <div className="max-w-[200px]">
                                        <p className={`${lessons[currentPlayIndex].lessonId === lesson.lessonId ? "text-purple-300" : ""} text-wrap line-clamp-1`}>{lesson.title}</p>
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
                                onChange={() => handleChangeStatus(lesson.lessonId)}
                                disabled={completedItems.has(lesson.lessonId)}
                            />
                        </Box>
                    )
                })}
            </AccordionDetails>
        </Accordion >
    )
}

export default SingleChapter