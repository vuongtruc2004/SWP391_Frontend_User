'use client'
import Image from "next/image";
import Link from "next/link";
import { Avatar, Box, Tooltip } from "@mui/material";
import AccountMenu from "../../header/account.menu";
import { useState } from "react";
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import { usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import AiSupportButton from "@/components/ai-support/ai.support.button";
import StarIcon from '@mui/icons-material/Star';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface ISidebar {
    key: string;
    title: string;
    link: string;
    icon: React.ReactNode;
}
const Sidebar = () => {
    const { course, currentPlayIndex, lessons } = useCourseView();
    const sidebarItems: ISidebar[] = [
        {
            key: 'home',
            title: 'Trang chủ',
            link: '/home',
            icon: <HomeIcon sx={{ fontSize: '1.25rem' }} />
        },
        {
            key: 'course-list',
            title: 'Tất cả khóa học',
            link: `/course`,
            icon: <FormatListBulletedIcon sx={{ fontSize: '1.25rem' }} />
        },
        {
            key: 'course-learning',
            title: `${lessons[currentPlayIndex].title}`,
            link: `/course/learning/${course.courseId}`,
            icon: <LocalLibraryIcon sx={{ fontSize: '1.25rem' }} />
        },
        {
            key: 'course-info',
            title: `${course.courseName}`,
            link: `/course/${course.courseId}`,
            icon: <InfoIcon sx={{ fontSize: '1.25rem' }} />
        }
    ]

    const { setOpenProgressBar, openProgressBar } = useCourseView();
    const { avatarSrc, fullname } = useUserAvatar();
    const pathname = usePathname();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <Box sx={{
            borderRight: '1px solid #25272c',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBlock: '20px 30px',
            position: 'sticky',
            left: 0,
            top: 0
        }}>
            <div className="flex items-center flex-col">
                <Link href={"/home"}>
                    <Image src={`/logo.webp`} alt="app logo" width={40} height={40} />
                </Link>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '20px',
                    'a.active': {
                        position: 'relative',
                        color: '#2b7fff',
                        '&::after': {
                            content: '""',
                            width: '2px',
                            borderRadius: '4px',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bgcolor: '#2b7fff',
                        }
                    }
                }}>
                    {sidebarItems.map(item => {
                        return (
                            <Tooltip title={item.title} key={item.key} arrow placement="right">
                                <Link href={item.link} className={`flex w-full px-5 py-4 text-gray-400 hover:text-blue-500 ${pathname === item.link && "active"}`}>
                                    {item.icon}
                                </Link>
                            </Tooltip>
                        )
                    })}

                    <Tooltip title={"Đánh giá khóa học"} arrow placement="right">
                        <div className="flex w-full px-5 py-4 text-gray-400 hover:text-blue-500 cursor-pointer">
                            <StarIcon sx={{ fontSize: '1.25rem' }} />
                        </div>
                    </Tooltip>

                    <Tooltip title={openProgressBar ? "Ẩn tiến độ khóa học" : "Hiển thị tiến độ khóa học"} arrow placement="right">
                        <div className="flex w-full px-5 py-4 text-gray-400 hover:text-blue-500 cursor-pointer mb-2" onClick={() => setOpenProgressBar(prev => !prev)}>
                            {openProgressBar ? (
                                <VisibilityIcon sx={{ fontSize: '1.25rem' }} />
                            ) : (
                                <VisibilityOffIcon sx={{ fontSize: '1.25rem' }} />
                            )}
                        </div>
                    </Tooltip>

                    <AiSupportButton placement="right" />
                </Box>
            </div >

            <Avatar alt="avatar" onClick={(event) => setMenuAnchorEl(event.currentTarget)} sx={{ cursor: 'pointer' }} src={avatarSrc}>
                {fullname.charAt(0).toUpperCase()}
            </Avatar>
            <AccountMenu
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            />
        </Box >
    )
}

export default Sidebar