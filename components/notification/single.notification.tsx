import { formatCreateDate } from "@/helper/blog.helper"
import { storageUrl } from "@/utils/url"
import { useNotification } from "@/wrapper/notification/notification.wrapper"
import { Avatar, Divider } from "@mui/material"
import Link from "next/link"

const SingleNotification = ({ notification }: {
    notification: UserNotificationResponse,
}) => {
    const { setAnchorEl } = useNotification();
    return (
        <>
            <Link href={`/user/notification`} className="flex items-center gap-x-5" onClick={() => setAnchorEl(null)}>
                <Avatar alt="LearnGo" src={`${storageUrl}/avatar/truc.jpg`} sx={{
                    width: '50px',
                    height: '50px'
                }} />
                <div className="max-w-[220px]">
                    <h1 className="font-semibold line-clamp-1">{notification.notification?.title}</h1>
                    <p>{formatCreateDate(notification.notification?.createdAt)}</p>
                    <p className="line-clamp-1">{notification.notification?.content}</p>
                </div>
            </Link>
            <Divider sx={{
                marginBlock: '10px'
            }} />
        </>
    )
}

export default SingleNotification
