'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import SingleQuizAttempt from "./single.quiz.attempt";
import Link from "next/link";
import { slugifyText } from "@/helper/blog.helper";
import QuizReview from "@/components/quiz-review/quiz.review.dialog";
import ListEmpty from "@/components/empty/list.empty";

const QuizAttemptTable = ({ quiz, course }: { quiz: QuizInfoResponse, course: CourseResponse }) => {
    const { data: session, status } = useSession();
    const [quizAttempts, setQuizAttempts] = useState<QuizAttemptResponse[]>([]);
    const [openQuizReview, setOpenQuizReview] = useState(false);
    const [selectQuizAttempt, setSelectQuizAttempt] = useState<QuizAttemptResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                const response = await sendRequest<ApiResponse<QuizAttemptResponse[]>>({
                    url: `${apiUrl}/quiz-attempts/${quiz.quizId}`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                if (response.status === 200) {
                    setQuizAttempts(response.data);
                }
            }
        }
        fetchData();
    }, [quiz, session]);

    return (
        <>
            {quizAttempts.length > 0 && (
                <>
                    <h1 className="font-semibold text-lg mb-3">Tất cả lần làm bài của bạn</h1>
                    <table className="w-full border border-[#212121]">
                        <thead className="bg-[#212121]">
                            <tr>
                                <td className="text-center p-3">Lần làm thứ</td>
                                <td className="text-center p-3">Trạng thái</td>
                                <td className="text-center p-3">Điểm số / 10</td>
                                <td className="text-center p-3">Số câu đúng</td>
                                <td className="text-center p-3">Hành động</td>
                            </tr>
                        </thead>

                        <tbody>
                            {quizAttempts.map((attempt) => {
                                return (
                                    <SingleQuizAttempt
                                        quizAttempt={attempt}
                                        quiz={quiz}
                                        key={attempt.quizAttemptId}
                                        course={course}
                                        setOpen={setOpenQuizReview}
                                        setSelectQuizAttempt={setSelectQuizAttempt}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )}

            <div className="flex justify-center mt-5">
                <Link href={`${slugifyText(course.courseName + "-" + course.courseId)}/quiz/start/${slugifyText(quiz.title + "-" + quiz.quizId)}`}>
                    <Button variant="outlined" color="secondary">
                        {quizAttempts.length === 0 ? "Làm bài ngay" : quizAttempts.find(attempt => attempt.endTime === null) ? "Tiếp tục làm bài" : "Làm lại"}
                    </Button>
                </Link>
            </div>

            <QuizReview quiz={quiz} quizAttempt={selectQuizAttempt} open={openQuizReview} setOpen={setOpenQuizReview} />
        </>
    )
}

export default QuizAttemptTable