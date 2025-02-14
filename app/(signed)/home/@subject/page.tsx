import SubjectList from "@/components/subject/subject-list/subject.list"
import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"

const SubjectPage = async () => {
    const subjectResponse = await sendRequest<ApiResponse<PageDetailsResponse<SubjectResponse[]>>>({
        url: `${apiUrl}/subjects/courses`,
        queryParams: {
            page: 1,
            size: 6
        }
    });

    return (
        <SubjectList subjectList={subjectResponse.data.content} />
    )
}

export default SubjectPage