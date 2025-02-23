'use client'
import { useNotification } from "@/wrapper/notification/notification.wrapper"
import { Box, Divider } from "@mui/material";
import ListEmpty from "../empty/list.empty";
import SingleNotification from "./single.notification";
import NotificationBigger from "./bigger.single.notification";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

const NotificationList = () => {
    const { numNotification, notifications } = useNotification();
    const { data: session, status } = useSession();

    const handleReadAllNotification = async () => {
        if (status === "authenticated") {
            const abc = await sendRequest<ApiResponse<String>>({
                url: `${apiUrl}/notifications/all`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                }
            });
        }
    }
    return (
        <Box>
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl">Thông báo ({numNotification})</h1>
                <p className="text-purple-300 hover:underline cursor-pointer font-semibold" onClick={handleReadAllNotification}>Đánh dấu là đã đọc</p>
            </div>
            <Divider sx={{
                marginBlock: '15px'
            }} />
            <Box>
                {(notifications && notifications.length > 0) ? notifications.map((notification) => {
                    return (
                        <NotificationBigger notification={notification} key={notification.userNotificationId} />
                    )
                }) : (
                    <ListEmpty text='Không có thông báo' height={220} />
                )}
            </Box>

        </Box>
    )
}

export default NotificationList
