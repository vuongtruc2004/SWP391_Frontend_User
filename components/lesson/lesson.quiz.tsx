import { useCourseView } from "@/wrapper/course-view/course.view.wrapper"
import { Divider } from "@mui/material";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { formatToText_HoursMinutes } from "@/utils/format";
import QuizAttemptTable from "@/features/quiz/quiz.attempt.table";

const LessonQuiz = () => {
    const { lessons, currentPlayIndex, course } = useCourseView();
    const quiz = lessons[currentPlayIndex];

    if (!("quizId" in quiz)) {
        return null;
    }
    return (
        <>
            <Divider sx={{ marginBottom: '20px' }} />

            <ul className="flex flex-col gap-y-2 my-5">
                <li className="flex items-center">
                    <p className="flex items-center gap-x-2 w-[180px]">
                        <TimelapseIcon sx={{ fontSize: '1rem' }} />
                        <span>Thời gian làm bài</span>
                    </p>
                    <p className="text-green-500 font-semibold">{formatToText_HoursMinutes(quiz.duration)}</p>
                </li>
                <li className="flex items-center">
                    <p className="flex items-center gap-x-2 w-[180px]">
                        <QuestionMarkIcon sx={{ fontSize: '1rem' }} />
                        <span>Số câu hỏi</span>
                    </p>
                    <p className="text-blue-500 font-semibold">{quiz.questions?.length}</p>
                </li>
            </ul>

            <QuizAttemptTable quiz={quiz} course={course} />
        </>
    )
}

export default LessonQuiz