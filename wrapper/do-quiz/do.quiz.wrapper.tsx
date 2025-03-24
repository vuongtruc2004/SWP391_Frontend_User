'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IDoQuiz {
    currentQuestionIndex: number,
    setCurrentQuestionIndex: Dispatch<SetStateAction<number>>,
    quiz: QuizResponse,
    userAnswers: UserAnswerRequest[],
    setUserAnswers: Dispatch<SetStateAction<UserAnswerRequest[]>>,
    quizAttempt: QuizAttemptResponse,
    markQuestionIds: number[],
    setMarkQuestionIds: Dispatch<SetStateAction<number[]>>,
}
const DoQuizContext = createContext<IDoQuiz | null>(null);

export const DoQuizWrapper = ({ children, quiz, quizAttempt }: { children: React.ReactNode, quiz: QuizResponse, quizAttempt: QuizAttemptResponse }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswerRequest[]>([]);
    const [markQuestionIds, setMarkQuestionIds] = useState<number[]>([]);

    useEffect(() => {
        if (quizAttempt.userAnswers && quizAttempt.userAnswers.length) {
            setUserAnswers(quizAttempt.userAnswers);
        }
    }, [quizAttempt]);

    useEffect(() => {
        const storedMarkQuestionIds: number[] = JSON.parse(localStorage.getItem('mark_question_ids') || '[]');
        setMarkQuestionIds(storedMarkQuestionIds);
    }, []);

    return (
        <DoQuizContext.Provider value={{
            currentQuestionIndex,
            setCurrentQuestionIndex,
            quiz,
            userAnswers,
            setUserAnswers,
            quizAttempt,
            markQuestionIds,
            setMarkQuestionIds
        }}>
            {children}
        </DoQuizContext.Provider>
    )
}

export const useDoQuiz = () => {
    const context = useContext(DoQuizContext);
    if (!context) {
        throw new Error('Bạn phải bọc children bằng DoQuizWrapper')
    }
    return context;
}