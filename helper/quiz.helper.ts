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