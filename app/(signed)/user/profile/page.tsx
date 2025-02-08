import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileAvatar from "@/features/profile-form/profile.avatar";
import ProfileForm from "@/features/profile-form/profile.form";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
    title: "Tài khoản của tôi",
};

const UserProfilePage = async () => {
    const session = await getServerSession(authOptions);
    const userResponse = await sendRequest<ApiResponse<UserResponse>>({
        url: `${apiUrl}/users/profile`,
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    });

    return (
        <>
            <h1 className="text-xl font-semibold">Tài khoản của tôi</h1>
            <Divider sx={{ marginBlock: '15px' }} />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '60% 30%',
                justifyContent: 'space-between',
                gap: '20px'
            }}>
                <ProfileForm user={userResponse.data} />
                <ProfileAvatar avatar={userResponse.data.avatar} />
            </Box>
        </>
    )
}

export default UserProfilePage