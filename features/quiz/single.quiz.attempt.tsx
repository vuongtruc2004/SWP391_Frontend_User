import { slugifyText } from "@/helper/blog.helper";
import { formatDateTimeFull, formatToHHMMSS } from "@/utils/format"
import dayjs from "dayjs";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const SingleQuizAttempt = ({ quizAttempt, quiz, course, setOpen, setSelectQuizAttempt }: {
    quizAttempt: QuizAttemptResponse,
    quiz: QuizInfoResponse,
    course: CourseResponse,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setSelectQuizAttempt: Dispatch<SetStateAction<QuizAttemptResponse | null>>
}) => {
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const maxEndTime = dayjs(quizAttempt.startTime).add(quiz.duration, 'second');

    const handleOpenQuizReview = () => {
        setSelectQuizAttempt(quizAttempt);
        setOpen(true);
    }
    useEffect(() => {
        if (!quizAttempt.endTime) {
            const interval = setInterval(() => {
                const updatedTime = maxEndTime.diff(dayjs(), 'second');
                setRemainingTime(updatedTime > 0 ? updatedTime : 0);

                if (updatedTime <= 0) {
                    clearInterval(interval);
                };
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [maxEndTime]);

    return (
        <tr className="border-b border-[#212121]">
            <td className="text-center p-3">{quizAttempt.attemptNumber}</td>
            <td className="p-3">
                {quizAttempt.endTime ? (
                    <>
                        <p className="text-green-500 font-semibold">Đã hoàn thành</p>
                        <p className="text-sm text-gray-300">Nộp bài lúc: {formatDateTimeFull(quizAttempt.endTime)}</p>
                    </>
                ) : (
                    <>
                        <p className="text-orange-500 font-semibold">Chưa hoàn thành</p>
                        <p className="text-sm text-gray-300">
                            {remainingTime !== null ?
                                remainingTime > 0 ?
                                    `Thời gian làm bài còn lại: ${formatToHHMMSS(remainingTime)}` :
                                    "Đã hết thời gian làm bài" :
                                'Đang tải...'}

                        </p>
                    </>
                )}
            </td>
            <td className="text-center p-3">{quizAttempt.endTime ? (quizAttempt.numberOfCorrects / quiz.questions.length * 10).toFixed(2) : "Chưa có kết quả"}</td>
            <td className="text-center p-3">{quizAttempt.endTime ? `${quizAttempt.numberOfCorrects}/${quiz.questions.length}` : "Chưa có kết quả"}</td>
            <td className="text-center p-3">
                {quizAttempt.endTime && quiz.allowSeeAnswers && (
                    <p onClick={handleOpenQuizReview} className="cursor-pointer transition-all duration-200 text-green-500 hover:text-green-300 hover:underline">Xem bài làm</p>
                )}
                {!quizAttempt.endTime && (remainingTime !== null && remainingTime > 0) && (
                    <Link href={`${slugifyText(course.courseName + "-" + course.courseId)}/quiz/start/${slugifyText(quiz.title + "-" + quiz.quizId)}`} className="text-orange-500 transition-all duration-200 hover:underline hover:text-orange-300">
                        Tiếp tục làm bài
                    </Link>
                )}
            </td>
        </tr>
    )
}

export default SingleQuizAttempt