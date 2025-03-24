import { slugifyText } from "@/helper/blog.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper"
import { Button, Divider } from "@mui/material";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { formatToText_HoursMinutes } from "@/utils/format";
import QuizAttemptTable from "@/features/quiz/quiz.attempt.table";

const LessonQuiz = () => {
    const { lessons, currentPlayIndex, course } = useCourseView();

    const [showDescription, setShowDescription] = useState(false);

    const quiz = lessons[currentPlayIndex];

    if (!("quizId" in quiz)) {
        return null;
    }
    const { data: session } = useSession();

    const handleOpenQuiz = async () => {
        const response = await sendRequest<ApiResponse<QuizAttemptResponse>>({
            url: `${apiUrl}/quizzes-attempt/save`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json"
            },
            body: {
                userId: session?.user.userId,
                quizId: quiz.quizId,
                userAnswers: []
            }
        });

        if (response.data) {
            localStorage.setItem("quizAttemptId", response.data.quizAttemptId.toString());
        }
    };

    return (
        <>
            <Divider sx={{ marginBottom: '20px' }} />

            <ul className="flex flex-col gap-y-2 my-5">
                <li className="flex items-center text-sm">
                    <p className="flex items-center gap-x-2 w-[180px]">
                        <TimelapseIcon sx={{ fontSize: '1rem' }} />
                        <span>Thời gian làm bài</span>
                    </p>
                    <p className="text-green-500 font-semibold">{formatToText_HoursMinutes(quiz.duration)}</p>
                </li>
                <li className="flex items-center text-sm">
                    <p className="flex items-center gap-x-2 w-[180px]">
                        <QuestionMarkIcon sx={{ fontSize: '1rem' }} />
                        <span>Số câu hỏi</span>
                    </p>
                    <p className="text-blue-500 font-semibold">{quiz.totalQuestions}</p>
                </li>
            </ul>
            <h2 className="font-semibold text-lg">Mô tả:</h2>
            <p className={`${!showDescription && 'line-clamp-5'} text-sm cursor-pointer`} onClick={() => setShowDescription(prev => !prev)}>{quiz.description}</p>

            <Divider sx={{ marginBlock: '20px' }} />

            <QuizAttemptTable quiz={quiz} />

            <div className="flex justify-center mt-5">
                <Link href={`${slugifyText(course.courseName + "-" + course.courseId)}/quiz/start/${slugifyText(quiz.title + "-" + quiz.quizId)}`}>
                    <Button onClick={handleOpenQuiz} variant="outlined" color="secondary">
                        Làm bài ngay
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default LessonQuiz