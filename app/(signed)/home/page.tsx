import Banner from '@/components/banner/banner';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';

const HomePage = async () => {
    const subjectResponse = await sendRequest<ApiResponse<PageDetailsResponse<SubjectResponse[]>>>({
        url: `${apiUrl}/subjects`,
        queryParams: {
            page: 1,
            size: 20
        }
    });
    return (
        <Banner subjectList={subjectResponse.data.content} />
    )
}

export default HomePage