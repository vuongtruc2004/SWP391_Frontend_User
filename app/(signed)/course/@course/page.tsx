import CourseList from "@/features/course/course.list";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

const CoursePage = async () => {
    const fakeResponse = await sendRequest<ApiResponse<PageDetailsResponse<CourseResponse[]>>>({
        url: `${apiUrl}/courses/purchased`,
        queryParams: {
            page: 1,
            size: 6
        }
    });

    console.log(">>> check res: ", fakeResponse);
    return (
        <>
            <CourseList coursePage={fakeResponse.data} />
        </>
    )
}

export default CoursePage