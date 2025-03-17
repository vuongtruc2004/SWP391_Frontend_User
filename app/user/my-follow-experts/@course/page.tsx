import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FollowingExpertCourses from "@/features/follow-experts/following.expert.courses";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { getServerSession } from "next-auth";

const CoursePage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return null;
    }

    const response = await sendRequest<ApiResponse<CourseResponse[]>>({
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
            <h1 className='text-center font-bold uppercase text-xl text-white my-8'>Khóa học mới nhất</h1>
            <FollowingExpertCourses courses={response.data} />
        </>
    )
}

export default CoursePage