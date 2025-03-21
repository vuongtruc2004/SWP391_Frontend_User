'use client'
import { formatDateTime, slugifyText } from "@/helper/blog.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { useDoQuiz } from "@/wrapper/do-quiz/do.quiz.wrapper";
import { Button, Dialog, DialogContent } from "@mui/material"
import Link from "next/link";
import { Dispatch, SetStateAction } from "react"

const SubmitDialog = ({ open, setOpen, quizAttempt }: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    quizAttempt: QuizAttemptResponse
}) => {
    const { quiz } = useDoQuiz();
    const { course } = useCourseView();

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <h1>Kết quả bài kiểm tra</h1>
                <p>Điểm số: {(quiz.questions.length ? quizAttempt.numberOfCorrects / quiz.questions.length * 10 : 0).toFixed(2)}</p>
                <p>Số câu đúng: {quizAttempt.numberOfCorrects}/{quiz.questions.length}</p>
                <p>Bắt đầu: {formatDateTime(quizAttempt.startTime)}</p>
                <p>Kết thúc: {formatDateTime(quizAttempt.endTime)}</p>

                <div>
                    <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                        <Button>
                            Đóng
                        </Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SubmitDialog
