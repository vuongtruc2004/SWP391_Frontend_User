'use client'
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AccountMenu from "./account.menu";
import { useSession } from "next-auth/react";
import { motion } from 'framer-motion';
import Image from "next/image";
import CartButton from "@/features/cart/cart.button";
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import NotificationButton from "../notification/notification.button";

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { avatarSrc } = useUserAvatar();

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


    const handleSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const keyword = formData.get('keyword')?.toString() || "";
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('keyword', keyword);
        newSearchParams.set('page', '1');

        e.currentTarget.reset();
        if (pathname.startsWith("/course")) {
            router.replace(`${pathname}?${newSearchParams}`);
        } else {
            router.push(`/course?${newSearchParams}`);
        }
    }

    const handleSavePrevUrl = (linkTo: string) => {
        if (!window.location.pathname.includes(linkTo)) {
            sessionStorage.setItem("prevUrl", window.location.pathname);
        }
    }

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
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: '20px',
            width: '100%',
            paddingInline: '20px',
            'img': {
                objectFit: 'cover',
                borderRadius: '50%',
                bgcolor: 'black'
            },
            bgcolor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(25px)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 15
        }}>
            <div className="flex items-center justify-center gap-x-6">
                <Link href={"/home"} className="items-center flex justify-center cursor-pointer gap-x-2 mr-3">
                    <Image src={`/logo.webp`} alt="app logo" width={40} height={40} />
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

                <form onSubmit={handleSubmitKeyword}>
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

            <div className="flex items-center gap-x-3">
                <CartButton />

                {session ? (
                    <>
                        <NotificationButton />

                        <Avatar alt="avatar" onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ cursor: 'pointer' }} src={avatarSrc}>
                            {session?.user.fullname?.charAt(0).toUpperCase()}
                        </Avatar>
                        <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                    </>
                ) : (
                    <>
                        <Link href={"/login"} onClick={() => handleSavePrevUrl("/login")}>
                            <Button sx={{ width: '110px' }} variant="outlined" color="secondary">Đăng Nhập</Button>
                        </Link>

                        <Link href={"/register"} onClick={() => handleSavePrevUrl("/register")}>
                            <Button sx={{ width: '110px' }} variant="contained" color="primary">Đăng Kí</Button>
                        </Link>
                    </>
                )}
            </div>
        </Box>
    )
}

export default Header