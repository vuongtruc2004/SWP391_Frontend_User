import { Accordion, AccordionSummary } from "./style";
import { AccordionDetails, Box } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
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
                                <PlayCircleIcon sx={{ fontSize: '16px', color: '#bbdefb', marginRight: '20px' }} />
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
                                <DescriptionOutlinedIcon sx={{ fontSize: '16px', color: '#adb5bd', marginRight: '20px' }} />
                                <p>{index + 1 + lesson.videos.length}. {document.title}</p>
                            </div>
                            <p className="text-gray-300 text-sm">{calculateReadingTime(document.content)}</p>
                        </Box>
                    )
                })}
            </AccordionDetails>
        </Accordion >
    )
}

export default SingleLessonDetails