import { Box, Button, Popover } from "@mui/material";
import ListEmpty from "@/components/empty/list.empty";
import SingleNotification from "@/components/notification/single.notification";
import { useNotification } from "@/wrapper/notification/notification.wrapper";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from "next/link";

const Notification = () => {
    const { notifications, anchorEl, setAnchorEl, numNotification } = useNotification();
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box sx={{
                width: '388px',
                maxWidth: '388px',
                bgcolor: '#101010',
                padding: '20px'
            }}>
                <h1 className="text-xl font-semibold mb-5">
                    Thông báo ({numNotification})
                </h1>
                <Box sx={{
                    maxHeight: '278px',
                    overflow: 'auto',
                    marginBottom: '20px',
                    '&::-webkit-scrollbar': {
                        display: 'block',
                        width: '2px',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#495057',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#60a5fa',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1976D2',
                    },
                    'img': {
                        objectFit: 'contain'
                    }
                }}>
                    {(notifications && notifications.length > 0) ? notifications.map((notification, index) => {
                        return (
                            <SingleNotification notification={notification} key={notification.userNotificationId} />
                        )
                    }) : (
                        <ListEmpty text='Không có thông báo' height={220} />
                    )}
                </Box>

                {notifications?.length > 3 && (
                    <Link href={"/user/notification"} onClick={handleClose}>
                        <Button endIcon={<ChevronRightIcon />} variant="outlined" fullWidth>Xem thêm</Button>
                    </Link>
                )}
            </Box>
        </Popover>
    )
}

export default Notification;