import { formatDateTimeFull } from "@/utils/format"
import { Dialog, DialogContent, Divider } from "@mui/material";
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import { Dispatch, SetStateAction } from "react";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SingleQuestionReview from "./single.question.review";
import { checkCorrectOfQuestion } from "@/helper/quiz.helper";

const QuizReview = ({ quizAttempt, quiz, open, setOpen }: { quizAttempt: QuizAttemptResponse | null, quiz: QuizInfoResponse, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {

    if (!quizAttempt || !quizAttempt.endTime) {
        return null;
    }
    return (
        <Dialog open={open} sx={{
            '.mui-16bx961-MuiPaper-root-MuiDialog-paper': {
                maxWidth: '900px'
            }
        }}>
            <DialogContent sx={{ bgcolor: '#171717', width: '900px' }}>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">{quiz.title}</h1>
                    <CloseOutlinedIcon onClick={() => setOpen(false)} className="duration-200 transition-all hover:text-gray-300 cursor-pointer" />
                </div>

                <Divider sx={{ marginBlock: '12px' }} />

                <div className="flex items-start justify-between">
                    <div className="max-w-[450px]">
                        <h2 className="font-semibold">Lần làm thứ: {quizAttempt.attemptNumber}</h2>
                        <div className="flex items-center gap-x-1.5 text-sm text-gray-300">
                            <p>Hoàn thành lúc {formatDateTimeFull(quizAttempt.endTime)}</p>
                            <p>•</p>
                            <p className="flex items-center gap-x-1.5"><HelpCenterOutlinedIcon fontSize="small" />{quiz.questions.length} câu hỏi</p>
                        </div>
                    </div>

                    <ul className="flex items-center gap-x-5">
                        <li className="flex flex-col items-start">
                            <p className="text-sm text-gray-300">Điểm số</p>
                            <p>{(quizAttempt.numberOfCorrects / quiz.questions.length * 10).toFixed(2)}</p>
                        </li>
                        <li className="flex flex-col items-start">
                            <p className="text-sm text-gray-300">Số câu đúng</p>
                            <p>{quizAttempt.numberOfCorrects}/{quiz.questions.length}</p>
                        </li>
                    </ul>
                </div>

                <ul className="grid grid-cols-10 gap-2 mt-3">
                    {quiz.questions.map((question, index) => {
                        const answeredQuestion = quizAttempt.userAnswers.find(u => u.questionId === question.questionId);
                        const isCorrect = checkCorrectOfQuestion(answeredQuestion, question);
                        return (
                            <li key={question.questionId} className="bg-[#212121] rounded-sm flex items-center justify-center py-2 cursor-pointer relative">
                                {index + 1}
                                {isCorrect ? (
                                    <span className="bg-green-600 w-[22px] h-[18px] rounded-sm absolute top-0 right-0 flex items-center justify-center">
                                        <CheckOutlinedIcon sx={{ fontSize: '1rem' }} />
                                    </span>
                                ) : (
                                    <span className="bg-red-600 w-[22px] h-[18px] rounded-sm absolute top-0 right-0 flex items-center justify-center">
                                        <CloseOutlinedIcon sx={{ fontSize: '1rem' }} />
                                    </span>
                                )}
                            </li>
                        )
                    })}
                </ul>

                <ul className="flex flex-col gap-y-2 mt-5">
                    {quiz.questions.map((question, index) => {
                        const answeredQuestion = quizAttempt.userAnswers.find(u => u.questionId === question.questionId);
                        const isCorrect = checkCorrectOfQuestion(answeredQuestion, question);
                        return (
                            <SingleQuestionReview isCorrect={isCorrect} question={question} userAnswer={answeredQuestion || null} key={question.questionId} index={index} />
                        )
                    })}
                </ul>
            </DialogContent>
        </Dialog>
    )
}

export default QuizReview