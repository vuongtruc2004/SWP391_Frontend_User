import Banner from '@/components/banner/banner';
import SubjectSlider from '@/components/subject/subject-slider/subject.slider';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';

const HomePage = async () => {
    const subjectResponse = await sendRequest<ApiResponse<PageDetailsResponse<SubjectResponse[]>>>({
        url: `${apiUrl}/subjects/courses`,
        queryParams: {
            page: 1,
            size: 30
        }
    });
    return (
        <div className='relative'>
            <Banner />
            <SubjectSlider subjectList={subjectResponse.data.content} />
        </div>
    )
}

export default HomePage