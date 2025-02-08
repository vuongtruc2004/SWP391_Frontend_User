'use client'
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import { ChangeEvent, useRef } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl, storageUrl } from "@/utils/url";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProfileAvatar = ({ avatar }: {
    avatar: string;
}) => {
    const { data: session, update } = useSession();
    const avatarSrc = avatar.startsWith("http") ? avatar : `${storageUrl}/avatar/${avatar}`

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.set('file', e.target.files[0]);
            formData.set('folder', 'avatar');

            const imageResponse = await sendRequest<ApiResponse<UserResponse>>({
                url: `${apiUrl}/users/avatar`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`
                },
                body: formData
            });

            if (imageResponse.status === 200) {
                await update({
                    user: {
                        ...session?.user,
                        avatar: imageResponse.data.avatar
                    }
                });
                router.refresh();
            }
        }
    }

    return (
        <Box sx={{
            width: '100%',
        }}>
            <h1>Ảnh đại diện</h1>
            <div className="relative w-max">
                <Avatar
                    sx={{
                        width: '200px',
                        height: 'auto',
                        aspectRatio: 1,
                        marginTop: '20px',
                        fontSize: '3rem',
                    }}
                    src={session ? avatarSrc : ""}
                    alt="avatar"
                >
                    {session?.user.fullname.charAt(0).toUpperCase() || 'N'}
                </Avatar>

                <Button startIcon={<EditIcon />} variant="contained" onClick={() => {
                    if (inputRef.current) {
                        inputRef.current.click();
                    }
                }} color="secondary" size="small" sx={{
                    position: 'absolute',
                    left: '-15px',
                    bottom: '20px',
                }}>
                    Chỉnh sửa
                </Button>

                <input
                    type="file"
                    onChange={handleUploadFile}
                    ref={inputRef}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        whiteSpace: 'nowrap',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                    }}
                />
            </div>
        </Box >
    )
}

export default ProfileAvatar