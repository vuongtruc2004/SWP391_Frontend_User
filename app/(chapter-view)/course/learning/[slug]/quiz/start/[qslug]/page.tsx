import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DoQuestion from "@/features/quiz/do.question";
import QuestionButton from "@/features/quiz/question.button";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { DoQuizWrapper } from "@/wrapper/do-quiz/do.quiz.wrapper";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export async function generateMetadata({ params }: { params: Promise<{ qslug: string }> }): Promise<Metadata> {
    const session = await getServerSession(authOptions);
    const slug = (await params).qslug;
    const id = slug.split("-").pop() || "";
    const quizResponse = await sendRequest<ApiResponse<QuizResponse>>({
        url: `${apiUrl}/quizzes/${id}`,
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    });

    return {
        title: quizResponse.status === 200 ? quizResponse.data.title : "",
    }
}

const QuizStartPage = async ({ params }: { params: Promise<{ qslug: string }> }) => {
    const session = await getServerSession(authOptions);
    const slug = (await params).qslug;
    const id = slug.split("-").pop() || "";

    if (!session) return null;

    const quizResponse = await sendRequest<ApiResponse<QuizResponse>>({
        url: `${apiUrl}/quizzes/${id}`,
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    });

    const quizAttemptResponse = await sendRequest<ApiResponse<QuizAttemptResponse>>({
        url: `${apiUrl}/quiz-attempts/${quizResponse.data.quizId}`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    });

    console.log(quizAttemptResponse);

    if (quizAttemptResponse.status !== 201) {
        throw new Error("Bạn chưa thể truy cập bài kiểm tra này!");
    }

    return (
        <DoQuizWrapper quiz={quizResponse.data} quizAttempt={quizAttemptResponse.data}>
            <div className="bg-black flex items-start">
                <QuestionButton />
                <DoQuestion />
            </div>
        </DoQuizWrapper>
    )
}

export default QuizStartPage