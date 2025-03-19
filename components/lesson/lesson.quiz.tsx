import { slugifyText } from "@/helper/blog.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper"
import { Button, Divider } from "@mui/material";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { formatDurationWithTail } from "@/helper/course.details.helper";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

const LessonQuiz = () => {
    const { lessons, currentPlayIndex } = useCourseView();

    const [showDescription, setShowDescription] = useState(false);

    const quiz = lessons[currentPlayIndex];

    if (!("quizId" in quiz)) {
        return null;
    }
    const { data: session } = useSession();

    const handleOpenQuiz = async () => {
        const response = await sendRequest<ApiResponse<QuizAttemptResponse>>({
            url: `${apiUrl}/quizzes-attempt/save`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json"
            },
            body: {
                userId: session?.user.userId,
                quizId: quiz.quizId,
                userAnswers: []
            }
        });

        if (response.data) {
            localStorage.setItem("quizAttemptId", response.data.quizAttemptId.toString());
        }
    };

    return (
        <>
            <Divider sx={{ marginBottom: '20px' }} />

            <ul className="flex flex-col gap-y-2 my-5">
                <li className="flex items-center text-sm">
                    <p className="flex items-center gap-x-2 w-[180px]">
                        <TimelapseIcon sx={{ fontSize: '1rem' }} />
                        <span>Thời gian làm bài</span>
                    </p>
                    <p className="text-green-500 font-semibold">{formatDurationWithTail(quiz.duration)}</p>
                </li>
                <li className="flex items-center text-sm">
                    <p className="flex items-center gap-x-2 w-[180px]">
                        <QuestionMarkIcon sx={{ fontSize: '1rem' }} />
                        <span>Số câu hỏi</span>
                    </p>
                    <p className="text-blue-500 font-semibold">{quiz.totalQuestions}</p>
                </li>
            </ul>
            <h2 className="font-semibold text-lg">Mô tả:</h2>
            <p className={`${!showDescription && 'line-clamp-5'} text-sm cursor-pointer`} onClick={() => setShowDescription(prev => !prev)}>
                {quiz.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolorum nisi eos et illum! Expedita minus impedit eaque minima nam odit aspernatur nesciunt veritatis sit libero neque dolorum molestiae fuga, ea incidunt suscipit mollitia, veniam hic explicabo ratione! Natus incidunt iure vel dolore tempora. Alias id nam cupiditate amet numquam at provident doloremque, deserunt totam maiores modi? Impedit aliquid repellat similique! Architecto animi, totam odio hic ex, repellendus cum esse ratione ut a voluptatum quas ullam adipisci quidem consequatur doloribus dolor accusantium exercitationem dicta nam harum, fuga laborum? Debitis laborum nam fuga tempora soluta architecto assumenda unde porro cum eaque! Minima quos quaerat mollitia. Optio, amet nesciunt est incidunt repellat ad tenetur, maiores similique ab quae fugit, quibusdam molestias. Inventore in nisi odit ex soluta nam fuga facere libero nemo veniam iusto adipisci eaque quae cupiditate, eius vitae dolorum exercitationem quos assumenda laboriosam non iste laborum modi? Quis quae, exercitationem ab quod numquam fugit non eos doloremque, quaerat earum animi amet nisi excepturi eum necessitatibus nulla fuga accusantium quam minus minima natus nam. Repellendus nam cum omnis animi explicabo laborum culpa quam dolores consequatur nulla tenetur corrupti, sequi dicta quasi necessitatibus in consequuntur ullam deserunt deleniti odit sapiente. Ducimus, excepturi!
            </p>

            <Divider sx={{ marginBlock: '20px' }} />

            <p className="text-center">...</p>

            <div className="flex justify-center mt-5">
                <Link href={`/quiz/start/${slugifyText(quiz.title + "-" + quiz.quizId)}`}>
                    <Button onClick={handleOpenQuiz} variant="outlined" color="secondary">
                        Làm bài ngay
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default LessonQuiz