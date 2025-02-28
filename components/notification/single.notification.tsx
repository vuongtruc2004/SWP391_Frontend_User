import { storageUrl } from "@/utils/url"
import { useNotification } from "@/wrapper/notification/notification.wrapper"
import { Avatar, Divider } from "@mui/material"
import Link from "next/link"
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import dayjs from "dayjs"

dayjs.locale("vi");
dayjs.extend(relativeTime);

const SingleNotification = ({ notification }: { notification: UserNotificationResponse }) => {
    const { setAnchorEl } = useNotification();

    return (
        <>
            <Link href={`/user/notification`} className="flex items-center gap-x-5" onClick={() => setAnchorEl(null)}>
                <Avatar alt="LearnGo" src="/logo.webp" sx={{ width: '50px', height: '50px' }} />
                <div className="max-w-[220px]">
                    <h1 className="font-semibold line-clamp-1">{notification.notification?.title}</h1>
                    <p className="line-clamp-1 text-gray-300">{notification.notification?.content}</p>
                    <p className="text-sm text-blue-400 font-semibold">{dayjs(notification.notification?.createdAt).fromNow()}</p>
                </div>
            </Link>
            <Divider sx={{ marginBlock: '10px' }} />
        </>
    )
}

export default SingleNotification
