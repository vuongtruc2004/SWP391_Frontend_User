import { formatDate } from "@/helper/blog.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { Button, Divider } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers/icons';

const LessonDocument = () => {
    const { lessons, currentPlayIndex, setCurrentPlayIndex } = useCourseView();

    const currentLesson = lessons[currentPlayIndex];

    if (!("lessonId" in currentLesson) || !currentLesson.documentContent) {
        return null;
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">{currentLesson.title}</h1>
                    <p className="text-gray-300 text-sm">Cập nhật lần cuối: <span className="text-purple-300 font-semibold">{formatDate(currentLesson.updatedAt)}</span></p>
                </div>

                <ul className='flex items-center'>
                    <li className={`flex items-center gap-x-1 rounded-tl-full rounded-bl-full py-1 px-3 cursor-pointer hover:text-blue-400 ${currentPlayIndex === 0 && "pointer-events-none text-gray-400"}`}
                        onClick={() => setCurrentPlayIndex(prev => prev - 1)}
                    >
                        <ArrowLeftIcon sx={{ fontSize: '1.2rem' }} />
                        <p>
                            Trước
                        </p>
                    </li>
                    <Divider orientation='vertical' sx={{ height: '20px' }} />
                    <li className={`flex items-center gap-x-1 rounded-tr-full rounded-br-full py-1 px-3 cursor-pointer hover:text-blue-400 ${currentPlayIndex === lessons.length - 1 && "pointer-events-none text-gray-400"}`}
                        onClick={() => setCurrentPlayIndex(prev => prev + 1)}
                    >
                        <p>
                            Tiếp
                        </p>
                        <ArrowRightIcon sx={{ fontSize: '1.2rem' }} />
                    </li>
                </ul>
            </div>

            <Divider sx={{ marginBlock: '10px' }} />

            <div className="mb-5" dangerouslySetInnerHTML={{ __html: currentLesson.documentContent }} />

            <Button color="primary" variant="contained">
                Đánh dấu đã hoàn thành
            </Button>
        </>
    )
}

export default LessonDocument