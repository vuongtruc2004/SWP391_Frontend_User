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


    const campaignResponse = await sendRequest<ApiResponse<CampaignResponse[]>>({
        url: `${apiUrl}/campaigns/all`
    });

    return (
        <div className='relative'>
            <Banner />
            <SubjectSlider
                subjectList={subjectResponse.data.content}
                campaign={campaignResponse.data}
            />
        </div>
    )
}

export default HomePage