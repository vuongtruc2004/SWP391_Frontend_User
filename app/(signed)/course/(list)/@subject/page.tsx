import CourseSubjectFilter from "@/features/course/course.subject.filter";
import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"

const SubjectPage = async (props: {
    searchParams: Promise<{
        sortSubject: string;
        subjectIds: string;
    }>
}) => {
    const searchParams = await props.searchParams;
    const subjectIds = searchParams.subjectIds || "";
    let sortSubject = searchParams.sortSubject;

    if (!sortSubject || (sortSubject !== "asc" && sortSubject !== "desc")) {
        sortSubject = "asc";
    }

    const subjectPageResponse = await sendRequest<ApiResponse<PageDetailsResponse<SubjectResponse[]>>>({
        url: `${apiUrl}/subjects`,
        queryParams: {
            page: 1,
            size: 50,
            sort: `subjectName,${sortSubject}`
        }
    });

    return (
        <CourseSubjectFilter
            subjectList={subjectPageResponse.data.content}
            subjectIds={subjectIds}
        />
    )
}

export default SubjectPage