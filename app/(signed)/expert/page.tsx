import ListEmpty from '@/components/empty/list.empty'
import ExpertSort from '@/components/expert/expert.sort'
import ExpertList from '@/features/expert/expert.list'
import { sendRequest } from '@/utils/fetch.api'
import { apiUrl } from '@/utils/url'
import { Box } from '@mui/material'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Đội ngũ chuyên gia'
}


const ExpersPage = async (props: {
    searchParams: Promise<{
        keyword?: string;
        page?: string;
    }>
}) => {

    const searchParams = await props.searchParams;
    const page = searchParams.page || 1;
    const keyword = searchParams.keyword || "";
    let filter = `(description ~ '${keyword}' or achievement ~ '${keyword}' or user.fullname ~ '${keyword}')`;

    const queryParams: Record<string, any> = {
        page: page,
        size: 5,
        filter: filter,
    };

    const expertListResponse = await sendRequest<ApiResponse<PageDetailsResponse<ExpertDetailsResponse[]>>>({
        url: `${apiUrl}/experts`,
        queryParams: queryParams
    })

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            // minHeight: '100vh',
            bgcolor: '#101010',
            color: 'white',
            paddingTop: '90px',
            gap: '20px'
        }}>
            <ExpertSort
                totalElements={expertListResponse.data?.totalElements || 0}
            />

            {(!expertListResponse.data?.content.length || expertListResponse.data.content.length === 0) ? (
                <ListEmpty text="Không có chuyên gia nào để hiển thị" />
            ) : (
                <ExpertList expertList={expertListResponse.data} />
            )}
        </Box>
    )
}

export default ExpersPage