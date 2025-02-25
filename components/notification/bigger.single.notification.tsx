import { apiUrl, storageUrl } from "@/utils/url"
import { Avatar, Box, Button, Divider, IconButton, Popover } from "@mui/material"
import { useState } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { useSession } from "next-auth/react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import PestControlIcon from '@mui/icons-material/PestControl';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import dayjs from "dayjs"
import { useNotification } from "@/wrapper/notification/notification.wrapper";

dayjs.locale("vi");
dayjs.extend(relativeTime);

const NotificationBigger = ({ notification }: {
    notification: UserNotificationResponse
}) => {
    const [showAllContent, setShowAllContent] = useState(false);
    const { data: session, status } = useSession();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { setNotifications, notifications } = useNotification();

    const handleRead = async () => {
        if (status === "authenticated") {
            await sendRequest<ApiResponse<String>>({
                url: `${apiUrl}/notifications/${notification.notification.notificationId}`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                }
            });
        }
    }

    const handleDelete = async () => {
        if (status === "authenticated") {
            const deleteRes = await sendRequest<ApiResponse<UserNotificationResponse>>({
                url: `${apiUrl}/notifications/${notification.notification.notificationId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                }
            });
            console.log(deleteRes);

            if (deleteRes.status === 200) {
                const newNotifications = notifications.filter(notification => notification.userNotificationId != deleteRes.data.userNotificationId);
                setNotifications(newNotifications);
            }
        }
    }

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <Box className="flex items-center justify-between gap-x-5">
                <div className="flex items-center gap-x-5">
                    <Avatar alt="LearnGo" src={`${storageUrl}/avatar/truc.jpg`} sx={{
                        width: '50px',
                        height: '50px'
                    }} />
                    <div className="w-full max-w-[500px]">
                        <div className="flex gap-x-3 items-center">
                            <h1 className="font-semibold line-clamp-1">LearnGo: {notification.notification?.title}</h1>
                            {!notification.isRead && (
                                <FiberManualRecordIcon sx={{ fontSize: '1rem' }} className="text-blue-400" />
                            )}
                        </div>

                        <p className={`${showAllContent ? "" : "line-clamp-2"} cursor-pointer text-gray-300`} onClick={() => {
                            setShowAllContent(prev => !prev);
                            handleRead()
                        }}>{notification.notification?.content}</p>

                        <p className="text-sm text-blue-400 font-semibold">{dayjs(notification.notification?.createdAt).fromNow()}</p>
                    </div>
                </div>

                <div>
                    <IconButton onClick={handleOpenPopover}>
                        <MoreVertIcon />
                    </IconButton>

                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <div className="flex flex-col items-start p-2 bg-[#101010] max-w-[250px]">
                            <Button startIcon={<CheckIcon />} color="secondary" variant="text" fullWidth sx={{
                                justifyContent: 'flex-start'
                            }} onClick={handleRead}>
                                Đánh dấu là đã đọc
                            </Button>
                            <Button startIcon={<CancelPresentationIcon />} color="secondary" variant="text" fullWidth sx={{
                                justifyContent: 'flex-start'
                            }} onClick={handleDelete}>
                                Xóa thông báo này
                            </Button>
                            <Button startIcon={<PestControlIcon />} color="secondary" variant="text" sx={{
                                textAlign: 'left',
                            }} fullWidth>
                                Báo cáo sự cố cho đội ngũ phụ trách thông báo
                            </Button>
                        </div>

                    </Popover>
                </div>
            </Box>
            <Divider sx={{
                marginBlock: '10px'
            }} />
        </>
    )
}

export default NotificationBigger
