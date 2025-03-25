'use client'
import { slugifyText } from "@/helper/blog.helper";
import { formatDateTime } from "@/utils/format";
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
                <h1 className="text-lg font-black ml-3 mb-1">Kết quả bài kiểm tra</h1>
                <p className="text-lg font-medium">Điểm số: <span className="text-green-400 font-light"> {(quiz.questions.length ? quizAttempt.numberOfCorrects / quiz.questions.length * 10 : 0).toFixed(2)} </span></p>
                <p className="text-lg font-medium">Số câu đúng: <span className="text-green-400 font-light"> {quizAttempt.numberOfCorrects}/{quiz.questions.length}</span></p>
                <p className="text-lg font-medium">Bắt đầu: <span className="font-light"> {formatDateTime(quizAttempt.startTime)}</span></p>
                <p className="text-lg font-medium">Kết thúc: <span className="font-light">{formatDateTime(quizAttempt.endTime)}</span></p>

                <div className="mt-3">
                    <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                        <Button variant="outlined" >
                            Đóng
                        </Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SubmitDialog
