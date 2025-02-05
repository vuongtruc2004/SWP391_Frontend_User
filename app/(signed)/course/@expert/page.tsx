import CourseExpert from "@/features/course/course.expert";
import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"

const ExpertPage = async () => {
    const expertPageResponse = await sendRequest<ApiResponse<PageDetailsResponse<ExpertResponse[]>>>({
        url: `${apiUrl}/users/experts`
    });

    return (
        <CourseExpert expertList={expertPageResponse.data.content} />
    )
}

export default ExpertPage