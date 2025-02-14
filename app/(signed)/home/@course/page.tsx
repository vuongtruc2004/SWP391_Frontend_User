import CourseSlider from "@/components/course/course-slider/course.slider"
import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"

const CoursePage = async () => {
    const coursesResponse = await sendRequest<ApiResponse<PageDetailsResponse<CourseResponse[]>>>({
        url: `${apiUrl}/courses/purchased`,
        queryParams: {
            page: 1,
            size: 6
        }
    });

    return (
        <CourseSlider courseList={coursesResponse.data.content} />
    )
}

export default CoursePage