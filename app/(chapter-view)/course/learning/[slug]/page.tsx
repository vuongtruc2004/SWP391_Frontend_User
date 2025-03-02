import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "@/components/chapter-view/chapter-view-sidebar/sidebar";
import PlayingLesson from "@/components/lesson/playing.lesson";
import ChaptersList from "@/features/chapter-view/chapter-view-video/chapters.list";
import { getCourseById } from "@/helper/course.details.helper";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { CourseViewWrapper } from "@/wrapper/course-view/course.view.wrapper";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug;
    const id = slug.split("-").pop() || "";
    const courseResponse = await getCourseById(id);
    return {
        title: courseResponse.data.courseName,
    }
}

const CourseLearningPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug;
    const id = slug.split("-").pop() || "";
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
                    <div className="p-5 w-full">
                        <PlayingLesson />
                    </div>
                    <ChaptersList />
                </div>
            </Box>
        </CourseViewWrapper>
    )
}

export default CourseLearningPage