import CourseSubject from "@/features/course/course.subject";
import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"

const SubjectPage = async (props: {
    searchParams: Promise<{
        sortSubject?: string;
    }>
}) => {
    const searchParams = await props.searchParams;
    let sortSubject = searchParams.sortSubject;

    if (!sortSubject || (sortSubject !== "asc" && sortSubject !== "desc")) {
        sortSubject = "asc";
    }

    const subjectPageResponse = await sendRequest<ApiResponse<PageDetailsResponse<SubjectResponse[]>>>({
        url: `${apiUrl}/subjects`,
        queryParams: {
            page: 1,
            size: 100,
            sort: `subjectName,${sortSubject}`
        }
    });

    return (
        <CourseSubject subjectList={subjectPageResponse.data.content} />
    )
}

export default SubjectPage