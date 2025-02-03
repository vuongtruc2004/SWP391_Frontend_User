'use client'
import { Avatar, Badge, Box, Button, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AccountMenu from "./account.menu";
import { useSession } from "next-auth/react";
import { storageUrl } from "@/utils/url";
import { motion } from 'framer-motion';

const Header = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const avatarSrc = session?.user.accountType === "CREDENTIALS" ?
        `${storageUrl}/avatar/${session.user.avatar}` : session?.user.avatar;

    const links = [
        {
            key: 'home',
            link: '/home',
            name: 'Trang chủ',
        },
        {
            key: 'course',
            link: '/course',
            name: 'Khóa học',
        },
        {
            key: 'blog',
            link: '/blog',
            name: 'Bài viết',
        }
    ]
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0
    });

    useEffect(() => {
        const activeLink = links.find(item => pathname.startsWith(item.link));
        if (activeLink) {
            const ref = document.querySelector(`a[data-key="${activeLink.key}"]`) as HTMLAnchorElement;
            if (ref) {
                const { width } = ref.getBoundingClientRect();
                setPosition({
                    width,
                    left: ref.offsetLeft,
                    opacity: 1
                });
            }
        } else {
            setPosition({
                width: 0,
                left: 0,
                opacity: 0
            });
        }
    }, [pathname]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                columnGap: '20px',
                width: '100%',
                paddingInline: '20px',
                'img': {
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '50%'
                },
                bgcolor: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(30px)',
                color: 'white',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 15
            }}>
            <div className="flex items-center justify-center gap-x-6">
                <Link href={"/home"} className="items-center flex justify-center cursor-pointer gap-x-2 mr-3">
                    <img src={`/logo.jpg`} alt="app logo" />
                    <p className="font-semibold text-2xl tracking-wide">LearnGo</p>
                </Link>

                <div className="flex items-center gap-x-6 relative h-[70px]">
                    {links.map(item => {
                        return (
                            <Link
                                href={item.link}
                                className={`flex items-center h-full transition-all duration-200 hover:text-blue-500 ${pathname.startsWith(item.link) ? "text-blue-500" : ""}`}
                                key={item.key}
                                data-key={item.key}
                            >
                                {item.name}
                            </Link>
                        )
                    })}

                    <motion.div
                        animate={position}
                        className="absolute bottom-0 h-1 rounded-sm bg-blue-500"
                    />
                </div>

                <form action="">
                    <TextField
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        size='small'
                        placeholder='Tìm kiếm khóa học'
                        name='keyword'
                        sx={{
                            width: '280px',
                            transition: 'all .5s',
                            '&:focus-within': {
                                width: '350px'
                            }
                        }}
                    />
                </form>
            </div>

            {session ? (
                <div className="flex items-center gap-x-5">
                    <Tooltip title="Thông báo" arrow>
                        <Link href={"/notification"}>
                            <IconButton color="secondary">
                                <Badge color="error" overlap="circular" badgeContent={5}>
                                    <NotificationsNoneIcon sx={{ color: pathname === "/notification" ? "#60a5fa" : "#dee2e6" }} />
                                </Badge>
                            </IconButton></Link>
                    </Tooltip>

                    <Avatar onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ cursor: 'pointer' }} src={avatarSrc}>
                        {session?.user.fullname?.charAt(0).toUpperCase()}
                    </Avatar>
                    <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </div>
            ) : (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '20px',
                    'button': {
                        textTransform: 'capitalize',
                        width: '120px'
                    }
                }}>
                    <Link href={"/login"} onClick={() => {
                        if (!window.location.pathname.includes("/login")) {
                            sessionStorage.setItem("prevUrl", window.location.pathname);
                        }
                    }}>
                        <Button variant="outlined" color="secondary">Đăng Nhập</Button>
                    </Link>

                    <Link href={"/register"}>
                        <Button variant="contained" color="primary">Đăng Kí</Button>
                    </Link>
                </Box>
            )}
        </Box>
    )
}

export default Header