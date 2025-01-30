import SubjectList from "@/components/subject-list/subject.list"
import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"

const SubjectPage = async () => {
    const subjectResponse = await sendRequest<ApiResponse<PageDetailsResponse<SubjectResponse[]>>>({
        url: `${apiUrl}/subjects`,
        queryParams: {
            page: 1,
            size: 20
        }
    });
    return (
        <SubjectList subjectList={subjectResponse.data.content} />
    )
}

export default SubjectPage