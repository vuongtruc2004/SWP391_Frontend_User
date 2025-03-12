import { Accordion, AccordionSummary } from "./style";
import { AccordionDetails } from "@mui/material";
import { formatDuration, formatDurationWithTail } from "@/helper/course.details.helper";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

const SingleChapterDetails = ({ chapter, index, chaptersExpand, toggleChapter }: {
    chapter: ChapterResponse,
    index: number,
    chaptersExpand: Set<number>,
    toggleChapter: (id: number) => void
}) => {

    return (
        <Accordion
            expanded={chaptersExpand.has(chapter.chapterId)}
            onChange={() => toggleChapter(chapter.chapterId)}
            slotProps={{ transition: { unmountOnExit: true } }}
        >
            <AccordionSummary>
                <div className="flex items-center justify-between w-full">
                    <p>Chương {index + 1}: {chapter.title}</p>
                    <div className="flex items-center gap-x-1.5">
                        <p className="text-purple-300 text-sm">{chapter.lessons.length} bài giảng</p>
                        {chapter.quizInfo && (
                            <>
                                <span className="text-purple-300 text-sm">&</span>
                                <p className="text-purple-300 text-sm">1 bài kiểm tra</p>
                            </>
                        )}
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0 }}>
                {chapter.lessons.map(lesson => {
                    return (
                        <div className="flex items-center justify-between py-3.5 px-5" key={lesson.lessonId + "_" + lesson.title}>
                            {lesson.lessonType === "VIDEO" ? (
                                <>
                                    <div className="flex items-center">
                                        <SmartDisplayOutlinedIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                                        <div className="max-w-[540px]">
                                            <p>{lesson.title}</p>
                                            <p className="text-gray-300 text-sm">Video</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm">{formatDuration(lesson.duration)}</p>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center">
                                        <AutoStoriesOutlinedIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                                        <div className="max-w-[540px]">
                                            <p>{lesson.title}</p>
                                            <p className="text-gray-300 text-sm">Tài liệu đọc thêm</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm">{Math.ceil(lesson.duration / 60)} phút đọc</p>
                                </>
                            )}
                        </div>
                    )
                })}

                {chapter.quizInfo && (
                    <div className="flex items-center justify-between py-3.5 px-5" key={chapter.quizInfo.quizId + "_" + chapter.quizInfo.title}>
                        <div className="flex items-center">
                            <QuizOutlinedIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                            <div className="max-w-[540px]">
                                <p>{chapter.quizInfo.title}</p>
                                <p className="text-gray-300 text-sm">Bài kiểm tra</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm">{formatDurationWithTail(chapter.quizInfo.duration)}</p>
                    </div>
                )}
            </AccordionDetails>
        </Accordion >
    )
}

export default SingleChapterDetails