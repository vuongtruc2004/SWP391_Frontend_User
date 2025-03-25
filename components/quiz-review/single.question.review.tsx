import { Accordion, AccordionSummary } from "@/features/chapter-view/style"
import { AccordionDetails } from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const SingleQuestionReview = ({ userAnswer, question, index, isCorrect }: { userAnswer: UserAnswerResponse | null, question: QuestionResponse, index: number, isCorrect: boolean }) => {
    return (
        <Accordion>
            <AccordionSummary>
                <div className="w-full pr-5">
                    <div className="flex items-center justify-between gap-x-2 text-sm w-full">
                        <p>Câu hỏi {index + 1}</p>
                        {isCorrect ? (
                            <div className="flex items-center gap-x-1.5">
                                <span className="bg-green-600 w-[16px] h-[16px] rounded-sm flex items-center justify-center gap-x-1.5">
                                    <CheckOutlinedIcon sx={{ fontSize: '0.8rem' }} />
                                </span>
                                <p>Đúng</p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-1.5">
                                <span className="bg-red-600 w-[16px] h-[16px] rounded-sm flex items-center justify-center gap-x-1.5">
                                    <CloseOutlinedIcon sx={{ fontSize: '0.8rem' }} />
                                </span>
                                <p>Sai</p>
                            </div>
                        )}
                    </div>
                    <h1 className="font-semibold text-gray-200">{question.title}</h1>
                </div>
            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0 }}>
                <ul>
                    {question.answers.map(answer => {
                        let isAnswered = userAnswer && userAnswer.answerIds.includes(answer.answerId) ? true : false;
                        return (
                            <li key={answer.answerId} className="border-[#212121] px-8 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-x-3">
                                    {isAnswered ? (
                                        <RadioButtonCheckedIcon sx={{ fontSize: '1rem' }} className="text-gray-300" />
                                    ) : (
                                        <RadioButtonUncheckedIcon sx={{ fontSize: '1rem' }} className="text-gray-300" />
                                    )}
                                    {answer.content}
                                </div>
                                {answer.correct ? (
                                    <CheckOutlinedIcon sx={{ fontSize: '1rem' }} className="text-green-500" />
                                ) : (
                                    <CloseOutlinedIcon sx={{ fontSize: '1rem' }} className="text-red-500" />
                                )}
                            </li>
                        )
                    })}
                </ul>
            </AccordionDetails>
        </Accordion >
    )
}

export default SingleQuestionReview