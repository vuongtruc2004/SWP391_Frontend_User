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

const getExpertSort = (expertSort: string): string => {
    if (!expertSort ||
        (expertSort !== "yearOfExperience" &&
            expertSort !== "courses" &&
            expertSort !== "users")
    ) {
        return "yearOfExperience";
    }
    return expertSort;
}

const ExpersPage = async (props: {
    searchParams: Promise<{
        keyword?: string;
        page?: string;
        direction: string;
        expertSort: string;
    }>
}) => {

    const searchParams = await props.searchParams;
    const page = searchParams.page || 1;
    const keyword = searchParams.keyword || "";
    const direction = (!searchParams.direction || (searchParams.direction !== "asc" && searchParams.direction !== "desc")) ? "desc" : searchParams.direction;
    const expertSort = getExpertSort(searchParams.expertSort);
    let filter = `(description ~ '${keyword}' or achievement ~ '${keyword}' or user.fullname ~ '${keyword}')`;

    const queryParams: Record<string, any> = {
        page: page,
        size: 5,
        filter: filter,
    };

    if (["yearOfExperience", "totalStudents", "totalFollowers"].includes(expertSort)) {
        queryParams.sort = `${expertSort},${direction}`;
    } else {
        queryParams.sort = `expertId,${direction}`;
    }

    const expertListResponse = await sendRequest<ApiResponse<PageDetailsResponse<ExpertDetailsResponse[]>>>({
        url: `${apiUrl}/experts`,
        queryParams: queryParams
    })

    console.log("Check", queryParams)
    console.log("Check 22", expertListResponse)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            bgcolor: '#101010',
            color: 'white',
            paddingTop: '90px',
            gap: '20px'
        }}>
            <ExpertSort
                totalElements={expertListResponse.data?.totalElements || 0}
                expertSort={expertSort}
                direction={direction}
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