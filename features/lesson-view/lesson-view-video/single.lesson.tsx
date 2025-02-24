import { AccordionDetails, Box, Checkbox } from "@mui/material";
import { Accordion, AccordionSummary } from "./style";
import { FacebookCircularProgress } from "@/components/lesson-view/style";
import { countCompletionOfALesson, countTotalTimeInALesson } from "@/helper/lesson.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { SetStateAction, useEffect, useState } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import FlagIcon from '@mui/icons-material/Flag';

const SingleLesson = ({ lesson, index, lessonsExpand, setLessonsExpand }: {
    lesson: LessonResponse,
    index: number,
    lessonsExpand: number,
    setLessonsExpand: React.Dispatch<SetStateAction<number>>;
}) => {
    const { data: session, status } = useSession();
    const { currentPlayIndex, setCurrentPlayIndex, userProgress, course, setUserProgress, lectures } = useCourseView();
    const completionOfLesson = countCompletionOfALesson(lesson, userProgress);

    const [currentLesson, setCurrentLesson] = useState<number | null>(null);
    const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

    const handleChangeStatus = async (type: "video" | "document", id: number) => {
        if (status === "authenticated") {
            const request: UserProgressRequest = {
                courseId: course.courseId,
                lessonId: lesson.lessonId,
                documentId: type === "document" ? id : null,
                videoId: type === "video" ? id : null
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

    const handleChangeCurrentPlayIndex = (item: VideoResponse | DocumentResponse) => {
        const index = lectures.findIndex(lecture =>
            ("videoUrl" in item && "videoUrl" in lecture && lecture.videoId === item.videoId) ||
            ("plainContent" in item && "plainContent" in lecture && lecture.documentId === item.documentId)
        );
        setCurrentPlayIndex(index);
    }

    useEffect(() => {
        if (userProgress.length) {
            const set = new Set<string>();
            userProgress.forEach(progress => {
                set.add(progress.documentId ? `document-${progress.documentId}` : `video-${progress.videoId}`);
            });
            setCompletedItems(set);
        }
    }, [userProgress]);

    useEffect(() => {
        const isVideo = "videoUrl" in lectures[currentPlayIndex];
        const idKey = isVideo ? "videoId" : "documentId";

        for (let lesson of course.lessons) {
            const lectureList = isVideo ? lesson.videos : lesson.documents;

            //@ts-ignore
            if (lectureList.some(item => item[idKey] === lectures[currentPlayIndex][idKey])) {
                setLessonsExpand(lesson.lessonId);
                setCurrentLesson(lesson.lessonId);
                break;
            }
        }
    }, [currentPlayIndex]);

    return (
        <Accordion
            expanded={lessonsExpand === lesson.lessonId}
            onChange={() => setLessonsExpand(lesson.lessonId)}
            slotProps={{ transition: { unmountOnExit: true } }}
        >
            <AccordionSummary>
                <div className="flex items-center gap-x-3">
                    <FacebookCircularProgress
                        variant="determinate"
                        thumb_color={completionOfLesson === 100 ? "#05df72" : ""}
                        value={completionOfLesson}
                        percentage={(
                            <p className={`text-sm ${completionOfLesson === 100 ? "text-green-400" : (completionOfLesson === 0 ? "text-gray-300" : "text-purple-300")}`}>
                                {currentLesson === lesson.lessonId ? <FlagIcon sx={{ fontSize: '1rem' }} /> : `${index + 1}`}
                            </p>
                        )}
                    />

                    <div className="flex flex-col">
                        <p className="text-wrap line-clamp-1">{lesson.title}</p>
                        <div className="text-gray-300 text-sm flex items-center gap-x-2">
                            <p>{lesson.videos.length + lesson.documents.length + 0} bài giảng</p>
                            <p>•</p>
                            <p>{countTotalTimeInALesson(lesson)}</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0 }}>
                {lesson?.videos.map((video) => {
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
                            key={video.videoId + "_" + video.title}
                            onClick={() => handleChangeCurrentPlayIndex(video)}
                        >
                            <div className="flex items-center">
                                <PlayArrowIcon sx={{ fontSize: '1.2rem' }} className="mr-5 text-blue-300" />
                                <p className={`${"videoUrl" in lectures[currentPlayIndex] && lectures[currentPlayIndex].videoId === video.videoId ? "text-purple-300" : ""} text-wrap line-clamp-1`}>{video.title}</p>
                            </div>
                            <Checkbox
                                size="small"
                                checked={completedItems.has(`video-${video.videoId}`)}
                                onChange={() => handleChangeStatus('video', video.videoId)}
                                disabled={completedItems.has(`video-${video.videoId}`)}
                            />
                        </Box>
                    )
                })}
                {lesson?.documents.map((document) => {
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
                            key={document.documentId + "_" + document.title}
                            onClick={() => handleChangeCurrentPlayIndex(document)}
                        >
                            <div className="flex items-center">
                                <DescriptionIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                                <p className={`${"plainContent" in lectures[currentPlayIndex] && lectures[currentPlayIndex].documentId === document.documentId ? "text-purple-300" : ""} text-wrap line-clamp-1`}>{document.title}</p>
                            </div>
                            <Checkbox
                                size="small"
                                checked={completedItems.has(`document-${document.documentId}`)}
                                onChange={() => handleChangeStatus('document', document.documentId)}
                                disabled={completedItems.has(`document-${document.documentId}`)}
                            />
                        </Box>
                    )
                })}
            </AccordionDetails>
        </Accordion >
    )
}

export default SingleLesson