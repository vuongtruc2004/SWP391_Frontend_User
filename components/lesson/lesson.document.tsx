import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { useUserProgress } from "@/wrapper/user-progress/user.progress.wrapper";
import { Button, Divider } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const LessonDocument = () => {
    const { lessons, currentPlayIndex, setCurrentPlayIndex, course } = useCourseView();
    const { userProgresses, handleChangeStatus } = useUserProgress();

    const currentLesson = lessons[currentPlayIndex];

    if (!("lessonId" in currentLesson) || !currentLesson.documentContent) {
        return null;
    }

    return (
        <>
            <Divider sx={{ marginBottom: '20px' }} />

            <div className="mb-5" dangerouslySetInnerHTML={{ __html: currentLesson.documentContent }} />

            {userProgresses.find(progress => progress.lessonId === currentLesson.lessonId) ? (
                <div className="flex items-center gap-x-3">
                    {currentPlayIndex < lessons.length - 1 ? (
                        <Button color="primary" variant="contained" onClick={() => setCurrentPlayIndex(prev => prev + 1)}>
                            Bài tiếp theo
                        </Button>
                    ) : (
                        <Button color="primary" variant="contained" onClick={() => setCurrentPlayIndex(prev => prev - 1)}>
                            Về bài trước
                        </Button>
                    )}
                    <p className="flex items-center gap-x-1">
                        <CheckIcon sx={{ fontSize: '1.2rem' }} className="text-green-500" />
                        <span className="text-gray-300 text-sm">Đã hoàn thành</span>
                    </p>
                </div>
            ) : (
                <Button color="primary" variant="contained" onClick={() => handleChangeStatus(
                    course.courseId,
                    currentLesson.chapterId,
                    currentLesson.lessonId,
                    null
                )}>
                    Đánh dấu đã hoàn thành
                </Button>
            )}
        </>
    )
}

export default LessonDocument