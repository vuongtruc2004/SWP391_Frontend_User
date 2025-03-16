import PersonIcon from '@mui/icons-material/Person';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';

export const topLinks = [
    {
        key: 'profile',
        link: '/user/profile',
        name: 'Tài khoản của tôi',
        icon: <PersonIcon sx={{ fontSize: '1.2rem' }} />
    },
    {
        key: 'my-course',
        link: '/user/my-course',
        name: 'Khóa học của tôi',
        icon: <AutoStoriesIcon sx={{ fontSize: '1.2rem' }} />
    },
    {
        key: 'my-follow-experts',
        link: '/user/my-follow-experts',
        name: 'Danh sách chuyên gia đang theo dõi',
        icon: <GroupIcon sx={{ fontSize: '1.2rem' }} />
    },
    {
        key: 'history-purchased',
        link: '/user/history-purchased',
        name: 'Lịch sử mua hàng',
        icon: <HistoryIcon sx={{ fontSize: '1.2rem' }} />
    }
]

export const bottomLinks = [
    {
        key: 'notification',
        link: '/user/notification',
        name: 'Thông báo',
        icon: <NotificationsIcon sx={{ fontSize: '1.2rem' }} />
    },
    {
        key: 'settings',
        link: '/user/settings',
        name: 'Cài đặt',
        icon: <SettingsIcon sx={{ fontSize: '1.2rem' }} />
    }
]