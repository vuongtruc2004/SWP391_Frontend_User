import CourseExpert from "@/features/course/course.expert";
import CourseSubject from "@/features/course/course.subject";
import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"

const SearchPage = async () => {

    const subjectPageResponse = await sendRequest<ApiResponse<PageDetailsResponse<SubjectResponse[]>>>({
        url: `${apiUrl}/subjects/all`,
    });

    return (
        <CourseSubject subjectList={subjectPageResponse.data.content} />
    )
}

export default SearchPage