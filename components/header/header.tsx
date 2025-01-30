'use client'
import { Avatar, Badge, Box, Button, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AccountMenu from "./account.menu";
import { useSession } from "next-auth/react";
import { storageUrl } from "@/utils/url";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { data: session } = useSession();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const avatarSrc = session?.user.accountType === "CREDENTIALS" ?
        `${storageUrl}/avatar/${session.user.avatar}` : session?.user.avatar;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                columnGap: '20px',
                width: '100%',
                padding: '15px 20px',
                'img': {
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '50%'
                },
                'ul li a': {
                    position: 'relative',
                    transition: 'all .3s',
                    '&:hover, &.active': {
                        color: '#60a5fa',
                        '&::after': {
                            content: '""',
                            width: '100%',
                            height: '3px',
                            borderRadius: '6px',
                            bgcolor: '#60a5fa',
                            position: 'absolute',
                            left: 0,
                            bottom: '-25px'
                        }
                    },
                },
                bgcolor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(20px)',
                color: 'white',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 15
            }}>
            <div className="flex items-center justify-center gap-x-6">
                <Link href={"/home"} className="items-center flex justify-center cursor-pointer gap-x-2 mr-3">
                    <img src={`/logo.jpg`} alt="app logo" />
                    <p className="font-bold text-xl tracking-wide">LearnGo</p>
                </Link>

                <ul className="flex items-center gap-x-6">
                    <li>
                        <Link href={"/home"} className={pathname === "/home" ? "active" : ""}>Trang chủ</Link>
                    </li>
                    <li>
                        <Link href={"/course"} className={pathname === "/course" ? "active" : ""}>Khóa học</Link>
                    </li>
                    <li>
                        <Link href={"/blog"} className={pathname.startsWith("/blog") ? "active" : ""}>Bài viết</Link>
                    </li>
                </ul>

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
                            transition: 'all .3s',
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
                    <Button variant="outlined" color="secondary" onClick={() => router.push("/login")}>Đăng Nhập</Button>
                    <Button variant="contained" onClick={() => router.push("/register")}>Đăng Kí</Button>
                </Box>
            )}
        </Box>
    )
}

export default Header