import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LeftSidebar from "@/components/chapter-view/left.sidebar";
import RightSidebar from "@/components/chapter-view/right.sidebar";
import PlayingLesson from "@/components/lesson/playing.lesson";
import { getCourseById } from "@/helper/course.details.helper";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import AiMessageWrapper from "@/wrapper/ai-message/ai.message.wrapper";
import { CourseRateWrapper } from "@/wrapper/course-rate/course.rate.wrapper";
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
        <CourseRateWrapper course={courseResponse.data}>
            <AiMessageWrapper>
                <CourseViewWrapper course={courseResponse.data}>
                    <Box sx={{
                        bgcolor: '#101010',
                        display: 'grid',
                        gridTemplateColumns: '60px 1fr',
                        position: 'relative',
                        height: '100vh',
                        overflow: 'hidden'
                    }}>
                        <LeftSidebar />
                        <div className="flex">
                            <PlayingLesson />
                            <RightSidebar />
                        </div>
                    </Box>
                </CourseViewWrapper>
            </AiMessageWrapper>
        </CourseRateWrapper>
    )
}

export default CourseLearningPage