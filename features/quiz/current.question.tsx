'use client'
import { useDoQuiz } from '@/wrapper/do-quiz/do.quiz.wrapper';
import { Box, Divider } from '@mui/material';

const CurrentQuestion = () => {
    const { quiz, setCurrentQuestionIndex, currentQuestionIndex, userAnswers, markQuestionIds } = useDoQuiz();

    return (
        <>
            <Divider sx={{ marginBlock: '20px' }} />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5,1fr)',
                gap: '12px',
                width: 'max-content',
                maxHeight: '248px',
                overflow: 'auto',
                paddingRight: '20px',
                '&::-webkit-scrollbar': {
                    display: 'block',
                    width: '2px',
                    borderRadius: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#495057',
                    borderRadius: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#60a5fa',
                    borderRadius: '6px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#1976D2',
                },
                'li': {
                    width: '60px',
                    height: '40px',
                    backgroundColor: '#101010',
                    "&:not(.answered):not(.marked):hover": {
                        bgcolor: '#212121'
                    },
                    cursor: 'pointer',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'background-color .3s',
                    '&.answered': {
                        bgcolor: "#0056d2"
                    },
                    '&.marked': {
                        bgcolor: "#ff8904"
                    },
                }
            }}>
                {quiz.questions.map((question, index) => {
                    const isAnswered = userAnswers.some(answer => answer.questionId === question.questionId && answer.answerIds.length > 0);
                    const isMarked = markQuestionIds.includes(question.questionId);
                    return (
                        <li onClick={() => setCurrentQuestionIndex(index)} className={`${currentQuestionIndex === index && 'border border-white'} ${isAnswered && 'answered'} ${isMarked && 'marked'}`} key={question.questionId}>
                            {index + 1}
                        </li>
                    )
                })}
            </Box>
            <Divider sx={{ marginBlock: '20px' }} />
        </>
    )
}

export default CurrentQuestion
