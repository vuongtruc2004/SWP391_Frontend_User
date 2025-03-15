import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CourseSlider from "@/components/course/course-slider/course.slider";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { getServerSession } from "next-auth";

const CoursePage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return null;
    }

    const response = await sendRequest<ApiResponse<CourseDetailsResponse[]>>({
        url: `${apiUrl}/courses/latest-courses`,
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response || !response.data.length) {
        return null;
    }

    return (
        <>
            <h1 className='text-center font-bold uppercase text-xl text-white mt-10'>Khóa học mới nhất</h1>
            <CourseSlider courseList={response.data} />
        </>
    )
}

export default CoursePage