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

export const formatDurationToMinuteAndSecond = (second: number): string => {
    const minute = Math.floor(second / 60);
    const seconds = second - minute * 60;

    return [minute, seconds].map(unit => unit.toString().padStart(2, '0')).join(':');
};

export const formatDurationToDayHoursMinuteAndSecond = (totalSeconds: number) => {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = totalSeconds % 60;

    const timeString = [
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0")
    ].join(":");

    return days > 0 ? `${days} ngày ${timeString}` : timeString;
};

