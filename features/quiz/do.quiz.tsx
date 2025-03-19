'use client'
import React, { useState, useEffect } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SaveIcon from '@mui/icons-material/Save';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { formatDate, formatDateTime, slugifyText } from "@/helper/blog.helper";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const DoQuiz = ({ quiz }: { quiz: QuizResponse }) => {
    const router = useRouter();
    const [quizBank, setQuizBank] = useState<QuestionResponse[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[][]>([]);
    const { data: session } = useSession();
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [questionColors, setQuestionColors] = useState<string[]>([]);
    const [timeTaken, setTimeTaken] = useState<string>("");
    const [showResultModal, setShowResultModal] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [countCorrect, SetCountCorrect] = useState<number>(0);
    const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>(() => {
        if (typeof window !== "undefined") {
            const storedBookmarks = localStorage.getItem("bookmarkedQuestions");
            return storedBookmarks ? JSON.parse(storedBookmarks) : [];
        }
        return [];
    });


    const [startTime, SetStartTime] = useState<string>('');
    const [endTime, SetEndTime] = useState<string>('');

    useEffect(() => {
        setQuizBank(quiz.questions);
        setTitle(quiz.title);
        const savedStartTime = localStorage.getItem("quizStartTime");
        const now = Math.floor(Date.now() / 1000);
        const durationSeconds = quiz.duration * 60;
        console.log("duration>>>", quiz.duration);
        let remainingTime;
        if (savedStartTime) {
            const elapsedTime = now - parseInt(savedStartTime, 10);

            if (elapsedTime > durationSeconds) {
                console.log("Quiz đã hết thời gian trước đó, đặt lại thời gian mới.");
                localStorage.setItem("quizStartTime", now.toString());
                remainingTime = durationSeconds;
            } else {
                remainingTime = Math.max(durationSeconds - elapsedTime, 0);
            }
        } else {
            localStorage.setItem("quizStartTime", now.toString());
            remainingTime = durationSeconds;
        }

        console.log("remainingTime sau tính toán:", remainingTime);

        setTimeLeft(remainingTime);
        const selectOption = localStorage.getItem("selectedOptions")
        if (selectOption) {
            setSelectedOptions(JSON.parse(selectOption));
        } else {
            setSelectedOptions(new Array(quiz.questions.length).fill([]));
        }

        const storedColors = localStorage.getItem("questionColors");
        if (storedColors) {
            setQuestionColors(JSON.parse(storedColors));
        } else {
            setQuestionColors(new Array(quiz.questions.length).fill("bg-gray-400"));
        }
    }, [])


    useEffect(() => {
        if (timeLeft <= 0 || quizCompleted) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    handleSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, quizCompleted]);


    useEffect(() => {
        setQuestionColors((prevColors) => {
            return quizBank.map((_, index) =>
                bookmarkedQuestions.includes(index)
                    ? "bg-yellow-400"
                    : prevColors[index] || "bg-gray-400"
            );
        });
    }, [bookmarkedQuestions, quizBank]);


    const handleOptionClick = (answerId: number) => {
        if (!quizCompleted) {
            setSelectedOptions((prev) => {
                const newSelected = [...prev];
                const currentSelections = newSelected[currentQuestionIndex] || [];

                const question = quizBank[currentQuestionIndex];
                const isMultipleChoice = question.answers.filter(answer => answer.correct).length > 1;

                if (isMultipleChoice) {
                    if (currentSelections.includes(answerId.toString())) {
                        newSelected[currentQuestionIndex] = currentSelections.filter(id => id !== answerId.toString());
                    } else {
                        newSelected[currentQuestionIndex] = [...currentSelections, answerId.toString()];
                    }
                } else {
                    newSelected[currentQuestionIndex] = [answerId.toString()];
                }
                return newSelected;
            });
            setQuestionColors((prev) => {
                const newColors = [...prev];
                newColors[currentQuestionIndex] = "bg-blue-600";
                localStorage.setItem("questionColors", JSON.stringify(newColors));
                return newColors;
            });
        }
    };

    const countAnsweredQuestions = () => {
        return selectedOptions.filter(ans => Array.isArray(ans) && ans.length > 0).length;
    };



    const handleSubmit = async () => {


        quizBank.forEach((question, index) => {
            const userAnswers = selectedOptions[index] || [];
            const correctAnswers = question.answers.filter(a => a.correct).map(a => a.answerId.toString());

            if (userAnswers.length === correctAnswers.length && userAnswers.every(ans => correctAnswers.includes(ans))) {
                SetCountCorrect((prev) => prev + 1);
            }
        });
        const quizAttemptId = localStorage.getItem("quizAttemptId");

        if (!quizAttemptId) {
            console.error("Không tìm thấy quizAttemptId, vui lòng mở quiz trước");
            return;
        }

        const quizAttemptRequest: QuizAttemptRequest = {
            quizAttemptId: parseInt(quizAttemptId),
            userId: session?.user.userId,
            quizId: quiz.quizId,
            userAnswers: selectedOptions.map((answers, index) => ({
                questionId: quizBank[index].questionId,
                answerIds: answers.map(id => parseInt(id)),
            }))
        };
        const response = await sendRequest<ApiResponse<QuizAttemptResponse>>({
            url: `${apiUrl}/quizzes-attempt/save?isSubmit=true`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json"
            },
            body: quizAttemptRequest
        });

        if (response.data) {
            SetStartTime(formatDateTime(response.data.startTime));
            SetEndTime(formatDateTime(response.data.endTime));
            setScore(response.data.score);
            setQuizCompleted(true);
            setShowResultModal(true);

            const startTimeObj = new Date(response.data.startTime);
            const endTimeObj = new Date(response.data.endTime);

            const timeDiff = Math.round((endTimeObj.getTime() - startTimeObj.getTime()) / 1000);
            const formattedTime = timeDiff < 60
                ? `${timeDiff} giây`
                : `${Math.floor(timeDiff / 60)} phút ${timeDiff % 60} giây`;
            setTimeTaken(formattedTime);
        }
        localStorage.removeItem("quizAttemptId");
        localStorage.removeItem("selectedOptions");
        localStorage.removeItem("questionColors");
        localStorage.removeItem("bookmarkedQuestions");
        localStorage.removeItem("quizStartTime");
    };

    const isAllQuestionsAnswered = () => {
        return selectedOptions.every(ans => Array.isArray(ans) && ans.length > 0);
    };

    if (quizBank.length === 0) return <p>Loading...</p>;

    const currentQuestion = quizBank[currentQuestionIndex];
    const handleClose = () => {
        setShowResultModal(false);
        setQuizCompleted(false);
        setSelectedOptions(new Array(quizBank.length).fill([]));
        setCurrentQuestionIndex(0);
        setTimeLeft(0);
        setQuestionColors(new Array(quizBank.length).fill("bg-gray-400"));
        setBookmarkedQuestions([]);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };


    const handleBookmark = () => {
        setBookmarkedQuestions((prev) => {
            let newBookmarks;
            if (prev.includes(currentQuestionIndex)) {
                newBookmarks = prev.filter((index) => index !== currentQuestionIndex);
            } else {
                newBookmarks = [...prev, currentQuestionIndex];
            }
            localStorage.setItem("bookmarkedQuestions", JSON.stringify(newBookmarks));

            setQuestionColors((prevColors) => {
                const newColors = [...prevColors];

                newColors[currentQuestionIndex] = newBookmarks.includes(currentQuestionIndex)
                    ? "bg-yellow-400"
                    : selectedOptions[currentQuestionIndex]?.length > 0
                        ? "bg-blue-600"
                        : "bg-gray-400";

                localStorage.setItem("questionColors", JSON.stringify(newColors));
                return newColors;
            });

            return newBookmarks;
        });
    };


    const handleSaveChange = async () => {
        const quizAttemptId = localStorage.getItem("quizAttemptId");

        if (!quizAttemptId) {
            alert("Không tìm thấy bài làm hiện tại!");
            return;
        }

        const quizAttemptRequest = {
            quizAttemptId: parseInt(quizAttemptId),
            userId: session?.user.userId,
            quizId: quiz.quizId,
            userAnswers: selectedOptions.map((answers, index) => ({
                questionId: quizBank[index].questionId,
                answerIds: answers.map(id => parseInt(id)),
            }))
        };

        try {
            const response = await sendRequest<ApiResponse<QuizAttemptResponse>>({
                url: `${apiUrl}/quizzes-attempt/save`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: quizAttemptRequest
            });
            localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
            alert("Tiến trình làm bài đã được lưu!");
        } catch (error) {
            alert("Lưu tiến trình thất bại!");
        }
    };


    return (
        <div className="flex gap-2 h-screen p-4 bg-white">
            {/* Sidebar danh sách câu hỏi */}
            <div className="flex w-1/3 flex-col items-center border-gray-400 p-4 border">

                <div className="text-lg font-semibold text-black mb-5">
                    Số câu đã hoàn thành: {countAnsweredQuestions()}/{quizBank.length}
                </div>
                <div className="text-xl font-semibold text-red-500 mb-5 flex items-center">
                    <span className={`${!quizCompleted ? 'animate-rotate' : ''} mr-2`}>⏳</span> {formatTime(timeLeft)}
                </div>
                {/* Thanh tiến trình */}
                <div className="w-2/3 bg-gray-200 rounded-xs  h-5 mb-5">
                    <div
                        className="bg-green-500 h-5 rounded-xs transition-all duration-300"
                        style={{ width: `${(countAnsweredQuestions() / quizBank.length) * 100}%` }}
                    ></div>
                </div>


                <div className=" h-[1px] bg-gray-500 w-[301px] mb-5 opacity-50"></div>

                <div className="grid grid-cols-5 mb-5 gap-x-0.5 h-[300px] gap-y-0.5 overflow-auto">
                    {quizBank.map((_, index) => {
                        const isBookmarked = bookmarkedQuestions.includes(index);
                        const isAnswered = selectedOptions[index]?.length > 0;
                        const isCurrent = index === currentQuestionIndex;

                        let questionColor = "bg-gray-400";
                        if (isBookmarked) questionColor = "bg-yellow-400";
                        else if (isAnswered) questionColor = "bg-blue-600";

                        return (
                            <button
                                key={index}
                                className={`w-15 h-10 flex items-center justify-center border rounded text-sm 
                    ${questionColor} 
                    ${isCurrent ? "border-2 border-black" : ""}`}
                                onClick={() => setCurrentQuestionIndex(index)}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>

                <div className=" h-[0.5px] bg-gray-500 w-[301px] mb-5 mt-3 opacity-50"></div>


                <div className="flex items-center justify-center w-full">

                    <Button
                        startIcon={<SaveIcon />}
                        disabled={quizCompleted}
                        style={{
                            width: '33%',
                            color: '#155dfc',
                            border: '1px solid #155dfc',
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }}
                        onClick={handleSaveChange}
                    >
                        Lưu bài làm
                    </Button>
                    <Button
                        startIcon={<LibraryAddCheckOutlinedIcon />}
                        style={{
                            width: '33%',
                            border: '1px solid #155dfc',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            color: '#155dfc',
                            cursor: isAllQuestionsAnswered() ? 'pointer' : 'not-allowed',
                            opacity: isAllQuestionsAnswered() ? 1 : 0.5,
                        }} onClick={handleSubmit} disabled={!isAllQuestionsAnswered()}>Nộp bài</Button>


                </div>

                <Modal
                    open={showResultModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                >
                    <Box sx={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2"
                            className=" text-black font-extrabold">Kết quả bài làm
                        </Typography>
                        <Typography id="modal-modal-description" component='div' sx={{ mt: 2 }}>
                            <p className="font-normal text-black"><span className="font-semibold">Bắt đầu: </span> {startTime?.toLocaleString()}</p>
                            <p className="font-normal text-black"><span className="font-semibold">Trạng thái: </span>Hoàn thành</p>
                            <p className="font-normal text-black"><span className="font-semibold">Kết thúc:  </span>{endTime?.toLocaleString()}</p>
                            <p className="font-normal text-black"><span className="font-semibold">Thời gian làm bài:  </span>{timeTaken}</p>
                            <p className="font-normal text-black"><span className="font-semibold">Câu đúng:  </span>{countCorrect}/{quizBank.length}</p>
                            <p className="font-normal text-black"><span className="font-semibold">Điểm: </span>{score.toFixed(2)}/10</p>
                            <Button onClick={() => setShowResultModal(false)} style={{ backgroundColor: 'blue', color: 'white', marginLeft: '150px', width: '10px' }}>Đóng</Button>
                        </Typography>

                    </Box>
                </Modal>
            </div>

            {/* Nội dung câu hỏi */}
            <div className="flex flex-1 flex-col h-[60%] border border-gray-400">
                <div className="w-full p-6 relative">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold text-black flex-1">Câu hỏi {currentQuestionIndex + 1}
                            {currentQuestion.answers.filter(answer => answer.correct).length > 1 ? <span className="font-medium text-sm italic"> &lt;Chọn nhiều đáp án&gt; </span> : <span className="font-medium text-sm italic"> &lt;Chọn một đáp án&gt; </span>}
                        </p>

                        <div className="mb-5">
                            <Button
                                onClick={handleBookmark}
                                startIcon={<StarOutlineIcon className="text-" />}
                                variant="outlined"
                                style={{
                                    color: bookmarkedQuestions.includes(currentQuestionIndex) ? "white" : "#ffb703",
                                    borderColor: bookmarkedQuestions.includes(currentQuestionIndex) ? "white" : "#ffb703",
                                    backgroundColor: bookmarkedQuestions.includes(currentQuestionIndex) ? "#ffb703" : '',
                                    borderRadius: '5px'
                                }}
                            >
                                Đánh dấu
                            </Button>
                        </div>
                    </div>


                    <div className=" absolute left-0 right-0 h-[1px] bg-gray-500 w-full mb-10 opacity-50"></div>

                    <p className="font-normal text-black block mt-5 mb-5">{currentQuestion.title}</p>

                    <div className=" absolute left-0 right-0 h-[0.5px] bg-gray-500 w-full mb-5 opacity-50"></div>

                    <div className=" space-y-3 mt-10">
                        {currentQuestion.answers.map((answer) => {
                            const isSelected = Array.isArray(selectedOptions[currentQuestionIndex])
                                ? selectedOptions[currentQuestionIndex].includes(answer.answerId.toString())
                                : false;

                            return (
                                <label key={answer.answerId} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox" // 
                                        name={`question-${currentQuestionIndex}`}
                                        checked={isSelected}
                                        onChange={() => handleOptionClick(answer.answerId)}
                                        disabled={quizCompleted}
                                        className="hidden"
                                    />
                                    <div
                                        className={`w-3 h-3 border-2 rounded-full flex flex-shrink-0 items-center justify-center transition ${isSelected ? "border-gray-500 bg-gray-500 " : "border-gray-400"}`}
                                    >
                                        {isSelected && <div className="w-0.5 h-0.5 bg-red rounded-full"></div>}
                                    </div>
                                    <span className="text-black break-words">{answer.content}</span>
                                </label>
                            );
                        })}

                    </div>

                    <div className="mt-4 flex justify-between">
                        <Button style={{ marginRight: '20px' }} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)} disabled={currentQuestionIndex === 0}><span className='text-blue-700 font-bold'> &lt;&lt; </span></Button>

                        <Button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} disabled={currentQuestionIndex === quizBank.length - 1}> <span className='text-blue-700 font-bold'> &gt;&gt; </span> </Button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DoQuiz;
