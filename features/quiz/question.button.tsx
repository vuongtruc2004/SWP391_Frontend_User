'use client'
import { BorderLinearProgress } from '@/components/course/course-slider/custom.progress'
import { Alert, Button, Popover, Snackbar, Typography } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useDoQuiz } from '@/wrapper/do-quiz/do.quiz.wrapper';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';
import { useSession } from 'next-auth/react';
import CurrentQuestion from './current.question';
import SubmitDialog from './submit.dialog';
import { countCompletionPercent } from '@/helper/quiz.helper';
import { formatToMMSS } from '@/utils/format';
import { useUserProgress } from '@/wrapper/user-progress/user.progress.wrapper';
import { useCourseView } from '@/wrapper/course-view/course.view.wrapper';
import { useWebSocket } from '@/hooks/use.websocket';

const QuestionButton = () => {
    const { data: session, status } = useSession();
    const { course, lessons, currentPlayIndex } = useCourseView();
    const { handleChangeStatus, userProgresses } = useUserProgress();
    const { quiz, userAnswers, quizAttempt, setMarkQuestionIds } = useDoQuiz();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [result, setResult] = useState<QuizAttemptResponse | null>(null);
    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    const maxEndTime = dayjs(quizAttempt.startTime).add(quiz.duration, 'second');

    const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
    const handleSaveQuizAttempt = async (hiddenMessage: boolean) => {
        if (status === 'authenticated') {
            const request: QuizAttemptRequest = {
                quizAttemptId: quizAttempt.quizAttemptId,
                userAnswers: userAnswers.filter(u => u.answerIds.length !== 0)
            }

            const quizAttemptResponse = await sendRequest<ApiResponse<QuizAttemptResponse>>({
                url: `${apiUrl}/quiz-attempts/save`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: request
            });

            if (quizAttemptResponse.status === 201) {
                if (!hiddenMessage) {
                    setOpenSnackbar(true);
                }
            }
        }
    }

    const handleSubmit = async () => {
        if (status === 'authenticated') {
            const request: QuizAttemptRequest = {
                quizAttemptId: quizAttempt.quizAttemptId,
                userAnswers: userAnswers.filter(u => u.answerIds.length !== 0)
            }

            const quizAttemptResponse = await sendRequest<ApiResponse<QuizAttemptResponse>>({
                url: `${apiUrl}/quiz-attempts/submit`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: request
            });

            if (quizAttemptResponse.status === 200) {
                if (!userProgresses.find(progress => progress.quizId === quiz.quizId)) {
                    handleChangeStatus(course.courseId, lessons[currentPlayIndex].chapterId, null, quiz.quizId);
                }
                setResult(quizAttemptResponse.data);
                setMarkQuestionIds([]);
                setOpenDialog(true);
            }
        }
    }



    useEffect(() => {
        const timeLeft = maxEndTime.diff(dayjs(), 'second');
        setRemainingTime(timeLeft > 0 ? timeLeft : 0);

        const interval = setInterval(() => {
            if (result != null) {
                clearInterval(interval);
            } else {
                const updatedTime = maxEndTime.diff(dayjs(), 'second');
                setRemainingTime(updatedTime > 0 ? updatedTime : 0);

                if (updatedTime > 0 && updatedTime % 30 === 0) {
                    handleSaveQuizAttempt(true);
                }

                if (updatedTime <= 0) {
                    handleSubmit();
                    clearInterval(interval);
                };
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [maxEndTime]);

    return (
        <div className='p-10 h-screen sticky top-0 left-0 w-max border-r border-[#25272c]'>
            <div className='w-[369.6px]'>
                <BorderLinearProgress thumb_color={countCompletionPercent(quiz, userAnswers) >= 99.9 ? '#00c951' : '#0056d2'} value={countCompletionPercent(quiz, userAnswers)} variant='determinate' sx={{ borderRadius: '4px', height: '20px' }} />

                <h2 className='font-semibold text-lg'>Thời gian còn lại</h2>
                {remainingTime ? (
                    <p className='text-gray-300'>{formatToMMSS(remainingTime)}</p>
                ) : (
                    <p className='text-gray-300'>00:00</p>
                )}

                <CurrentQuestion />

                <div className='flex items-center gap-x-3'>
                    <Button onClick={() => handleSaveQuizAttempt(false)} startIcon={<SaveOutlinedIcon />} variant='outlined' color='secondary' fullWidth>
                        Lưu bài làm
                    </Button>
                    <Button onClick={(event) => setPopoverAnchor(event.currentTarget)} variant='contained' fullWidth>
                        Nộp bài
                    </Button>
                </div>
            </div>
            <Popover
                open={Boolean(popoverAnchor)}
                anchorEl={popoverAnchor}
                onClose={() => setPopoverAnchor(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className='p-5'>
                    <p className='text-lg font-semibold'> Xác nhận nộp bài</p>
                    <p className=''>Bạn có chắc chắn muốn nộp bài ?</p>
                    <p className='font-extralight ml-2'>(Số câu đã hoàn thành <span className='text-green-500'>{userAnswers.filter(answer => answer.answerIds.length > 0).length}/{quiz.questions.length})</span></p>
                    <div className='flex justify-end gap-x-2 mt-2'>
                        <Button
                            onClick={() => setPopoverAnchor(null)}
                            variant='outlined'
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={() => {
                                handleSubmit();
                                setPopoverAnchor(null);
                            }}
                            variant='contained'
                            color='primary'
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </Popover>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Alert
                    severity="success"
                    onClose={() => setOpenSnackbar(false)}
                    sx={{ width: '100%', color: 'white' }}
                    variant="filled"
                >
                    Lưu bài làm thành công
                </Alert>
            </Snackbar>

            {result && (
                <SubmitDialog open={openDialog} setOpen={setOpenDialog} quizAttempt={result} />
            )}
        </div>
    )
}

export default QuestionButton
