import Sidebar from "@/components/lesson-view/lesson-view-sidebar/sidebar";
import LessonViewTab from "@/components/lesson-view/lesson-view-tab/lesson.view.tab";
import LessonVideo from "@/components/lesson-view/lesson-view-video/lesson.video";
import LessonList from "@/features/lesson-view/lesson-view-video/lesson.list";
import { getCourseById } from "@/helper/course.details.helper";
import { CourseViewWrapper } from "@/wrapper/course-view/course.view.wrapper";
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
        <CourseViewWrapper course={courseResponse.data}>
            <Box sx={{
                bgcolor: '#101010',
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                position: 'relative'
            }}>
                <Sidebar />
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '2.8fr 1fr',
                }}>
                    <div className="px-10 py-8">
                        <LessonVideo />
                        <LessonViewTab />
                    </div>
                    <LessonList />
                </Box>
            </Box>
        </CourseViewWrapper>
    )
}

export default CourseLearningPage