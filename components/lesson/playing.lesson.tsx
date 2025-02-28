'use client'
import { Box } from "@mui/material"
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import LessonVideo from './lesson.video';
import LessonDocument from './lesson.document';

const PlayingLesson = () => {
    const { currentPlayIndex, lessons } = useCourseView();

    return (
        <Box sx={{
            'iframe, video': {
                width: '100%',
                height: '100%',
                borderRadius: '4px',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                aspectRatio: 16 / 9,
            }
        }}>
            {lessons[currentPlayIndex].lessonType === "VIDEO" && (
                <LessonVideo />
            )}

            {lessons[currentPlayIndex].lessonType === "DOCUMENT" && (
                <LessonDocument />
            )}
        </Box>
    )
}

export default PlayingLesson