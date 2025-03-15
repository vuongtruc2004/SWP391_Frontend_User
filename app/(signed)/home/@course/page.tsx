import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import CourseSlider from "@/components/course/course-slider/course.slider"
import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"
import { getServerSession } from "next-auth"

const CoursePage = async () => {
    const session = await getServerSession(authOptions);

    let coursesResponse: ApiResponse<PageDetailsResponse<CourseResponse[]>>;
    if (session) {
        coursesResponse = await sendRequest<ApiResponse<PageDetailsResponse<CourseResponse[]>>>({
            url: `${apiUrl}/courses/purchased`,
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            },
            queryParams: {
                page: 1,
                size: 6
            }
        });
    } else {
        coursesResponse = await sendRequest<ApiResponse<PageDetailsResponse<CourseResponse[]>>>({
            url: `${apiUrl}/courses/purchased`,
            queryParams: {
                page: 1,
                size: 6
            }
        });
    }

    return (
        <>
            <h1 className='text-center font-bold uppercase text-2xl text-white mt-10'>Khóa học phổ biến</h1>
            <CourseSlider courseList={coursesResponse.data.content} />
        </>
    )
}

export default CoursePage