import CourseExpert from "@/features/course/course.expert";
import { sendRequest } from "@/utils/fetch.api"
import { apiUrl } from "@/utils/url"

const ExpertPage = async (props: {
    searchParams: Promise<{
        sortExpert: string;
        priceFrom: string;
        priceTo: string;
        expertIds: string;
    }>
}) => {
    const searchParams = await props.searchParams;
    const priceFrom = searchParams.priceFrom || "";
    const priceTo = searchParams.priceTo || "";
    const expertIds = searchParams.expertIds || "";

    let sortExpert = searchParams.sortExpert;
    if (!sortExpert || (sortExpert !== "asc" && sortExpert !== "desc")) {
        sortExpert = "asc";
    }

    const expertPageResponse = await sendRequest<ApiResponse<PageDetailsResponse<ExpertResponse[]>>>({
        url: `${apiUrl}/users/experts`,
        queryParams: {
            page: 1,
            size: 100,
            sort: `user.fullname,${sortExpert}`
        }
    });

    return (
        <CourseExpert
            expertList={expertPageResponse.data.content}
            priceFrom={priceFrom}
            priceTo={priceTo}
            expertIds={expertIds}
        />
    )
}

export default ExpertPage