'use client'
import Image from "next/image";
import Link from "next/link";
import { Avatar, Box, Tooltip } from "@mui/material";
import AccountMenu from "../../header/account.menu";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import SearchIcon from '@mui/icons-material/Search';
import { usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import SearchSnackbar from "./search.snackbar";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";

interface ISidebar {
    key: string;
    title: string;
    link: string;
    icon: React.ReactNode;
}
const Sidebar = () => {
    const { course } = useCourseView();
    const sidebarItems: ISidebar[] = [
        {
            key: 'home',
            title: 'Trang chủ',
            link: '/home',
            icon: <HomeIcon sx={{ fontSize: '1.25rem' }} />
        },
        {
            key: 'course-list',
            title: 'Danh sách khóa học',
            link: `/course`,
            icon: <LocalLibraryIcon sx={{ fontSize: '1.25rem' }} />
        },
        {
            key: 'course-info',
            title: `Thông tin khóa học ${course.courseName}`,
            link: `/course/${course.courseId}`,
            icon: <InfoIcon sx={{ fontSize: '1.25rem' }} />
        },
        {
            key: 'blog',
            title: 'Bài viết',
            link: '/blog',
            icon: <ArticleIcon sx={{ fontSize: '1.25rem' }} />
        }
    ]

    const { data: session } = useSession();
    const { setOpenProgressBar, openProgressBar } = useCourseView();
    const { avatarSrc } = useUserAvatar();
    const pathname = usePathname();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [openSearchBox, setOpenSearchBox] = useState<boolean>(false);

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
                                <Link href={item.link} className={`flex w-full px-5 py-4 text-gray-400 hover:text-blue-500`}>
                                    {item.icon}
                                </Link>
                            </Tooltip>
                        )
                    })}
                    <Tooltip title="Tìm kiếm khóa học" arrow placement="right">
                        <div className="flex w-full px-5 py-4 text-gray-400 hover:text-blue-500 cursor-pointer" onClick={() => setOpenSearchBox(true)}>
                            <SearchIcon sx={{ fontSize: '1.25rem' }} />
                        </div>
                    </Tooltip>
                    <Tooltip title={openProgressBar ? "Ẩn tiến độ khóa học" : "Hiển thị tiến độ khóa học"} arrow placement="right">
                        <div className="flex w-full px-5 py-4 text-gray-400 hover:text-blue-500 cursor-pointer" onClick={() => setOpenProgressBar(prev => !prev)}>
                            {openProgressBar ? (
                                <VisibilityOffIcon sx={{ fontSize: '1.25rem' }} />
                            ) : (
                                <VisibilityIcon sx={{ fontSize: '1.25rem' }} />
                            )}
                        </div>
                    </Tooltip>
                    <SearchSnackbar open={openSearchBox} setOpen={setOpenSearchBox} />
                </Box>
            </div>

            <Avatar alt="avatar" onClick={(event) => setMenuAnchorEl(event.currentTarget)} sx={{ cursor: 'pointer' }} src={avatarSrc}>
                {session?.user.fullname?.charAt(0).toUpperCase()}
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
        </Box>
    )
}

export default Sidebar