import DoQuiz from "@/features/quiz/do.quiz";
import { getQuizByQuizId } from "@/helper/quiz.helper";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug
    const id = slug.split("-").pop() || "";
    const quiz = await getQuizByQuizId(id);

    return {
        title: quiz.title,
    }
}

const QuizStartPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug;
    const id = slug.split("-").pop() || "";
    const quiz = await getQuizByQuizId(id);

    return (
        <DoQuiz quiz={quiz} />
    )
}

export default QuizStartPage