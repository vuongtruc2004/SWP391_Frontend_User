import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "@/components/lesson-view/lesson-view-sidebar/sidebar";
import LessonViewTab from "@/components/lesson-view/lesson-view-tab/lesson.view.tab";
import LessonVideo from "@/components/lesson-view/lesson-view-video/lesson.video";
import LessonList from "@/features/lesson-view/lesson-view-video/lesson.list";
import { getCourseById } from "@/helper/course.details.helper";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { CourseViewWrapper } from "@/wrapper/course-view/course.view.wrapper";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const id = (await params).id
    const courseResponse = await getCourseById(id);
    return {
        title: courseResponse.data.courseName,
    }
}

const CourseLearningPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const courseResponse = await sendRequest<ApiResponse<CourseDetailsResponse>>({
        url: `${apiUrl}/courses/purchased/${id}`,
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    });

    if (courseResponse.status !== 200) {
        throw new Error(courseResponse.message.toString());
    }

    return (
        <CourseViewWrapper course={courseResponse.data}>
            <Box sx={{
                bgcolor: '#101010',
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                position: 'relative'
            }}>
                <Sidebar />
                <div className="flex">
                    <div className="px-10 py-5 w-full">
                        <LessonVideo />
                        <LessonViewTab />
                    </div>
                    <LessonList />
                </div>
            </Box>
        </CourseViewWrapper>
    )
}

export default CourseLearningPage