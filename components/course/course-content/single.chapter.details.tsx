import { Accordion, AccordionSummary } from "./style";
import { AccordionDetails, Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import { convertSecondToTime } from "@/helper/course.details.helper";

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
                    <p className="text-purple-300 text-sm">{chapter.lessons.length} bài giảng</p>
                </div>
            </AccordionSummary>

            <AccordionDetails sx={{
                padding: 0
            }}>
                {chapter.lessons.map(lesson => {
                    return (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            columnGap: '50px',
                            padding: '15px 20px',
                        }} key={lesson.lessonId + "_" + lesson.title}>
                            {lesson.lessonType === "VIDEO" ? (
                                <>
                                    <div className="flex items-center">
                                        <PlayArrowIcon sx={{ fontSize: '1.2rem' }} className="mr-5 text-blue-300" />
                                        <p>{index + 1}. {lesson.title}</p>
                                    </div>
                                    <p className="text-gray-300 text-sm">{convertSecondToTime(lesson.duration)}</p>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center">
                                        <DescriptionIcon sx={{ fontSize: '1.2rem' }} className="text-blue-300 mr-5" />
                                        <p>{index + 1}. {lesson.title}</p>
                                    </div>
                                    <p className="text-gray-300 text-sm">{Math.ceil(lesson.duration / 60)} phút đọc</p>
                                </>
                            )}
                        </Box>
                    )
                })}
            </AccordionDetails>
        </Accordion >
    )
}

export default SingleChapterDetails