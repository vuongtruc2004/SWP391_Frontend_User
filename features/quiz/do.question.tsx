'use client'
import { useDoQuiz } from "@/wrapper/do-quiz/do.quiz.wrapper"
import { Button, Checkbox, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { ChangeEvent, useEffect, useState } from "react";

const DoQuestion = () => {
    const { currentQuestionIndex, quiz, setUserAnswers, setCurrentQuestionIndex, userAnswers, setMarkQuestionIds, markQuestionIds } = useDoQuiz();

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const numberOfCorrectAnswers = currentQuestion.answers.filter(answer => answer.correct).length;
    const gridCols = currentQuestion.answers.find(answer => answer.content.length > 20) ? 1 : 2;
    const [userAnswer, setUserAnswer] = useState<UserAnswerRequest | null>(null);

    const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>, answerId: number) => {
        setUserAnswers(prev => {
            const existingAnswer = prev.find(userAnswer => userAnswer.questionId === currentQuestion.questionId);

            if (existingAnswer) {
                const updatedAnswerIds = e.target.checked
                    ? [...existingAnswer.answerIds, answerId]
                    : existingAnswer.answerIds.filter(a => a !== answerId);

                return prev.map(userAnswer =>
                    userAnswer.questionId === currentQuestion.questionId
                        ? { ...userAnswer, answerIds: updatedAnswerIds }
                        : userAnswer
                );
            } else {
                return [...prev, { questionId: currentQuestion.questionId, answerIds: e.target.checked ? [answerId] : [] }];
            }
        });
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const answerId = Number((event.target as HTMLInputElement).value);

        const existingAnswer = userAnswers.find(userAnswer => userAnswer.questionId === currentQuestion.questionId);
        if (existingAnswer) {
            setUserAnswers(prev => prev.map(u => u.questionId === currentQuestion.questionId ? { ...u, answerIds: [answerId] } : u));
        } else {
            setUserAnswers(prev => [...prev, { questionId: currentQuestion.questionId, answerIds: [answerId] }]);
        }
    }

    const handleMarkQuestion = () => {
        if (markQuestionIds.includes(currentQuestion.questionId)) {
            setMarkQuestionIds(prev => prev.filter(id => id !== currentQuestion.questionId));
        } else {
            setMarkQuestionIds(prev => [...prev, currentQuestion.questionId]);
        }
    }

    useEffect(() => {
        setUserAnswer(userAnswers.find(u => u.questionId === currentQuestion.questionId) || null);
    }, [userAnswers, currentQuestion]);

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center p-5">
                <h1 className="font-semibold text-lg uppercase">Câu hỏi {currentQuestionIndex + 1} (Chọn {numberOfCorrectAnswers} đáp án)</h1>
                <Button
                    onClick={handleMarkQuestion}
                    startIcon={<StarOutlineIcon />}
                    variant={markQuestionIds.includes(currentQuestion.questionId) ? "contained" : "outlined"}
                    color="error"
                >
                    Đánh dấu
                </Button>
            </div>

            <Divider />

            <h2 className="font-semibold p-5">{currentQuestion.title}</h2>

            <Divider />

            {numberOfCorrectAnswers > 1 ? (
                <ul className={`grid grid-cols-${gridCols} gap-3 p-5`}>
                    {currentQuestion.answers.map(answer => {
                        const checked = userAnswer ? userAnswer.answerIds.includes(answer.answerId) : false;
                        return (
                            <FormControlLabel
                                sx={{ width: 'max-content' }}
                                key={answer.answerId}
                                control={
                                    <Checkbox
                                        onChange={(e) => handleCheckBoxChange(e, answer.answerId)}
                                        size="small"
                                        icon={<CircleOutlinedIcon />}
                                        checkedIcon={<RadioButtonCheckedOutlinedIcon />}
                                        checked={checked}
                                    />
                                }
                                label={answer.content} />
                        )
                    })}
                </ul>
            ) : (
                <RadioGroup
                    value={userAnswer?.answerIds[0] || ""}
                    onChange={handleRadioChange}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                        gap: '12px',
                        padding: '20px'
                    }}>
                    {currentQuestion.answers.map(answer => {
                        return (
                            <FormControlLabel
                                sx={{ width: 'max-content' }}
                                value={answer.answerId}
                                key={answer.answerId}
                                control={<Radio size="small" />}
                                label={answer.content}
                            />
                        )
                    })}
                </RadioGroup>
            )}

            <Divider />
            <div className="flex justify-between p-5">
                <Button disabled={currentQuestionIndex === 0} variant="outlined" color="secondary" startIcon={<ChevronLeftOutlinedIcon />} onClick={() => setCurrentQuestionIndex(prev => prev - 1)}>
                    Câu trước
                </Button>
                <Button disabled={currentQuestionIndex === quiz.questions.length - 1} variant="outlined" color="secondary" endIcon={<ChevronRightOutlinedIcon />} onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
                    Câu sau
                </Button>
            </div>
        </div>
    )
}

export default DoQuestion
