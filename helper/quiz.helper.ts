import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"

export const getQuizByQuizId = async (id: number | string): Promise<QuizResponse> => {
    const quizResponse = await sendRequest<ApiResponse<QuizResponse>>({
        url: `${apiUrl}/quizzes/${id}`
    });
    if (quizResponse.status !== 200) {
        throw new Error(quizResponse.message.toString());
    }
    return quizResponse.data;
}

export const countCompletionPercent = (quiz: QuizResponse, userAnswers: UserAnswerRequest[]) => {
    const completeQuestions = quiz.questions.filter(q => {
        const userAnswer = userAnswers.find(u => u.questionId === q.questionId);
        return userAnswer && userAnswer.answerIds.length > 0;
    });
    if (quiz.questions.length === 0) return 100;
    return completeQuestions.length / quiz.questions.length * 100;
}

export const checkCorrectOfQuestion = (answeredQuestion: UserAnswerResponse | undefined, question: QuestionResponse): boolean => {
    let isCorrect = true;
    const correctAnswerIds = question.answers.filter(a => a.correct).map(a => a.answerId);

    if (answeredQuestion) {
        if (correctAnswerIds.length !== answeredQuestion.answerIds.length) {
            isCorrect = false;
        } else {
            for (let id of answeredQuestion.answerIds) {
                if (!correctAnswerIds.includes(id)) {
                    isCorrect = false;
                    break;
                }
            }
        }
    } else {
        isCorrect = false;
    }
    return isCorrect;
}