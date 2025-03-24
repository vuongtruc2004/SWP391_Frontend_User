'use client'

import { sendRequest } from "@/utils/fetch.api";
import { formatDateTimeFull } from "@/utils/format";
import { apiUrl } from "@/utils/url";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"

const QuizAttemptTable = ({ quiz }: { quiz: QuizInfoResponse }) => {
    const { data: session, status } = useSession();
    const [quizAttempts, setQuizAttempts] = useState<QuizAttemptResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                setLoading(true);
                const response = await sendRequest<ApiResponse<QuizAttemptResponse[]>>({
                    url: `${apiUrl}/quiz-attempts/${quiz.quizId}`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                if (response.status === 200) {
                    setQuizAttempts(response.data);
                }
                setLoading(false);
            }
        }
        fetchData();
    }, [quiz, session]);

    if (loading) {
        <div className="flex items-center justify-center w-full h-screen shrink-0">
            <CircularProgress />
        </div>
    }

    return (
        <table className="w-full">
            <thead className="bg-[#212121]">
                <tr>
                    <td className="text-center p-3">Lần làm thứ</td>
                    <td className="text-center p-3">Trạng thái</td>
                    <td className="text-center p-3">Điểm số</td>
                    <td className="text-center p-3">Số câu đúng</td>
                    <td className="text-center p-3">Hành động</td>
                </tr>
            </thead>

            <tbody>
                {quizAttempts.map((attempt, index) => {
                    return (
                        <tr key={attempt.quizAttemptId} className="border-b border-[#212121]">
                            <td className="text-center p-3">{index + 1}</td>
                            <td className="p-3">
                                <p>{attempt.endTime ? "Đã hoàn thành" : "Chưa hoàn thành"}</p>
                                {attempt.endTime && (
                                    <p>{formatDateTimeFull(attempt.endTime)}</p>
                                )}
                            </td>
                            <td className="text-center p-3">{attempt.endTime ? attempt.numberOfCorrects / quiz.totalQuestions * 10 : 0}</td>
                            <td className="text-center p-3">{attempt.endTime ? `${attempt.numberOfCorrects}/${quiz.totalQuestions}` : 0}</td>
                            <td className="text-center p-3">
                                {attempt.endTime && quiz.allowSeeAnswers && (
                                    <p>Xem đáp án</p>
                                )}
                                {!attempt.endTime && (
                                    <p>Tiếp tục làm bài</p>
                                )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default QuizAttemptTable