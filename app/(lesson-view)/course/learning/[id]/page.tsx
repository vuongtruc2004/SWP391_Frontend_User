import Header from "@/components/lesson-view/lesson-view-header/header";
import LessonViewTab from "@/components/lesson-view/lesson-view-tab/lesson.view.tab";
import LessonVideo from "@/components/lesson-view/lesson-view-video/lesson.video";
import LessonList from "@/features/lesson-view/lesson-view-video/lesson.list";
import { getCourseById } from "@/helper/course.details.helper";
import { Box } from "@mui/material";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const id = (await params).id
    const courseResponse = await getCourseById(id);
    return {
        title: courseResponse.data.courseName,
    }
}

const CourseLearningPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    const courseResponse = await getCourseById(id);

    return (
        <Box sx={{
            bgcolor: '#101010',
        }}>
            <Header course={courseResponse.data} />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '2.5fr 1fr',
                gap: '20px',
                padding: '20px'
            }}>
                <div>
                    <LessonVideo />
                    <LessonViewTab course={courseResponse.data} />
                </div>
                <LessonList course={courseResponse.data} />
            </Box>
        </Box>
    )
}

export default CourseLearningPage