'use client'
import Box from "@mui/material/Box";
import Link from "next/link"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";
import PersonIcon from '@mui/icons-material/Person';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';

const UserSidebar = () => {
    const pathname = usePathname();
    const [position, setPosition] = useState({
        top: 0,
        height: 0,
        opacity: 0
    });

    const links = [
        {
            key: 'profile',
            link: '/user/profile',
            name: 'Tài khoản của tôi',
            icon: <PersonIcon />
        },
        {
            key: 'my-course',
            link: '/user/my-course',
            name: 'Khóa học của tôi',
            icon: <AutoStoriesIcon />
        },
        {
            key: 'my-follow-experts',
            link: '/user/my-follow-experts',
            name: 'Danh sách chuyên gia đang theo dõi',
            icon: <GroupIcon />
        },
        {
            key: 'history-purchased',
            link: '/user/history-purchased',
            name: 'Lịch sử mua hàng',
            icon: <HistoryIcon />
        },
        {
            key: 'notification',
            link: '/user/notification',
            name: 'Thông báo',
            icon: <NotificationsIcon />
        },
        {
            key: 'settings',
            link: '/user/settings',
            name: 'Cài đặt',
            icon: <SettingsIcon />
        }
    ]

    useEffect(() => {
        const activeLink = links.find(item => pathname.startsWith(item.link));
        if (activeLink) {
            const ref = document.querySelector(`a[data-key="${activeLink.key}"]`) as HTMLAnchorElement;
            if (ref) {
                const { height } = ref.getBoundingClientRect();
                setPosition({
                    top: ref.offsetTop,
                    height: height,
                    opacity: 1
                });
            }
        } else {
            setPosition({
                top: 0,
                height: 0,
                opacity: 0
            });
        }
    }, [pathname]);

    return (
        <Box sx={{
            padding: '20px',
            borderRadius: '6px',
            bgcolor: 'black',
            color: 'white',
            height: 'max-content',
            position: 'sticky',
            top: '90px',
            left: 0,
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',
                position: 'relative',
                'a': {
                    padding: '10px 20px',
                    borderRadius: '6px',
                    transition: 'all .3s',
                    '&.active': {
                        bgcolor: '#2f3742',
                    }
                }
            }} className="flex flex-col gap-y-5 relative">
                {links.map(item => {
                    return (
                        <Link
                            href={item.link}
                            className={`flex items-center gap-x-5 hover:bg-[#2f3742] ${pathname.startsWith(item.link) ? "active" : ""}`}
                            key={item.key}
                            data-key={item.key}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    )
                })}

                <motion.div
                    animate={position}
                    className="absolute left-0 w-[5px] rounded-tr-md rounded-br-md bg-blue-500"
                />
            </Box>
        </Box>
    )
}

export default UserSidebar