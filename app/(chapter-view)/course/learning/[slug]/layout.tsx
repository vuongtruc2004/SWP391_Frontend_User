import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCourseById } from "@/helper/course.details.helper";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { CourseRateWrapper } from "@/wrapper/course-rate/course.rate.wrapper";
import { CourseViewWrapper } from "@/wrapper/course-view/course.view.wrapper";
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

const CourseLearningLayout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }) => {
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
            <CourseRateWrapper course={courseResponse.data}>
                {children}
            </CourseRateWrapper>
        </CourseViewWrapper>
    )
}

export default CourseLearningLayout
