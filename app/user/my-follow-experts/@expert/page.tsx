import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListEmpty from "@/components/empty/list.empty";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { Button } from "@mui/material";
import { getServerSession } from "next-auth";
import Link from "next/link";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FollowingExpertSlider from "@/features/follow-experts/following.expert.slider";

const ExpertPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return null;
    }

    const response = await sendRequest<ApiResponse<ExpertDetailsResponse[]>>({
        url: `${apiUrl}/users/following-experts`,
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response || !response.data.length) {
        return (
            <div className='flex items-center justify-center h-full'>
                <div>
                    <ListEmpty text="Bạn chưa theo dõi chuyên gia nào!" height={110} />
                    <Link href={'/expert'} className='flex items-center justify-center'>
                        <Button sx={{ borderRadius: '30px' }} variant='outlined' startIcon={<PersonAddAltIcon />}>Theo dõi ngay!</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <FollowingExpertSlider followingExperts={response.data} />
    )
}

export default ExpertPage