import { Accordion, AccordionSummary } from "./style";
import { AccordionDetails, Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import { convertSecondToTime } from "@/helper/course.details.helper";
import { calculateReadingTime } from "@/helper/blog.helper";

const SingleLessonDetails = ({ lesson, index, lessonsExpand, toggleLesson }: {
    lesson: LessonResponse,
    index: number,
    lessonsExpand: Set<number>,
    toggleLesson: (id: number) => void
}) => {

    return (
        <Accordion
            expanded={lessonsExpand.has(lesson.lessonId)}
            onChange={() => toggleLesson(lesson.lessonId)}
            slotProps={{ transition: { unmountOnExit: true } }}
        >
            <AccordionSummary>
                <div className="flex items-center justify-between w-full">
                    <p>Chương {index + 1}: {lesson.title}</p>
                    <p className="text-purple-300 text-sm">{lesson.videos.length + lesson.documents.length + 0} bài giảng</p>
                </div>
            </AccordionSummary>

            <AccordionDetails sx={{
                padding: 0
            }}>
                {lesson?.videos.map((video, index) => {
                    return (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            columnGap: '50px',
                            padding: '15px 20px',
                        }} key={video.videoId + "_" + video.title}>
                            <div className="flex items-center">
                                <PlayArrowIcon sx={{ fontSize: '1.2rem' }} className="mr-5 text-blue-300" />
                                <p>{index + 1}. {video.title}</p>
                            </div>
                            <p className="text-gray-300 text-sm">{convertSecondToTime(video.duration)}</p>
                        </Box>
                    )
                })}
                {lesson?.documents.map((document, index) => {
                    return (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            columnGap: '50px',
                            padding: '15px 20px',
                        }} key={document.documentId + "_" + document.title}>
                            <div className="flex items-center">
                                <DescriptionIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                                <p>{index + 1 + lesson.videos.length}. {document.title}</p>
                            </div>
                            <p className="text-gray-300 text-sm">{calculateReadingTime(document.content)} phút đọc</p>
                        </Box>
                    )
                })}
            </AccordionDetails>
        </Accordion >
    )
}

export default SingleLessonDetails