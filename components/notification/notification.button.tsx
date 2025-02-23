import { Badge, IconButton, Tooltip } from "@mui/material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Notification from "@/features/notification/notification";
import { usePathname } from "next/navigation";
import { useNotification } from "@/wrapper/notification/notification.wrapper";

const NotificationButton = () => {
    const { numNotification, setAnchorEl } = useNotification();
    const pathname = usePathname();
    return (
        <>
            <Tooltip title="Thông báo" arrow>
                <IconButton color="secondary" onClick={(event) => setAnchorEl(event.currentTarget)}>
                    <Badge color="error" overlap="circular" badgeContent={numNotification}>
                        <NotificationsNoneIcon sx={{ color: pathname === "/notification" ? "#60a5fa" : "#dee2e6" }} />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Notification />
        </>
    )
}

export default NotificationButton
