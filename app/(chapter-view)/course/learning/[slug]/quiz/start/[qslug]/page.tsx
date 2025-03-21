import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DoQuestion from "@/features/quiz/do.question";
import QuestionButton from "@/features/quiz/question.button";
import { getQuizByQuizId } from "@/helper/quiz.helper";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { DoQuizWrapper } from "@/wrapper/do-quiz/do.quiz.wrapper";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export async function generateMetadata({ params }: { params: Promise<{ qslug: string }> }): Promise<Metadata> {
    const slug = (await params).qslug
    const id = slug.split("-").pop() || "";
    const quiz = await getQuizByQuizId(id);
    return {
        title: quiz.title,
    }
}

const QuizStartPage = async ({ params }: { params: Promise<{ qslug: string }> }) => {
    const session = await getServerSession(authOptions);
    const slug = (await params).qslug;
    const id = slug.split("-").pop() || "";
    const quiz = await getQuizByQuizId(id);

    if (!session) return null;

    const quizAttemptResponse = await sendRequest<ApiResponse<QuizAttemptResponse>>({
        url: `${apiUrl}/quiz-attempts/${quiz.quizId}`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    });
    if (quizAttemptResponse.status !== 201) {
        return null;
    }

    return (
        <DoQuizWrapper quiz={quiz} quizAttempt={quizAttemptResponse.data}>
            <div className="bg-black flex items-start">
                <QuestionButton />
                <DoQuestion />
            </div>
        </DoQuizWrapper>
    )
}

export default QuizStartPage