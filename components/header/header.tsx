'use client'
import { Avatar, Box, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { LabelStyled, SearchIconWrapperStyled, SearchInputStyled } from "./style";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AccountMenu from "./account.menu";
import { useSession } from "next-auth/react";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { data: session } = useSession();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
                'a': {
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
                zIndex: 10
            }}>
            <div className="flex items-center justify-center gap-x-6">
                <div onClick={() => router.push("/home")} className="items-center flex justify-center cursor-pointer gap-x-2 mr-3">
                    <img src={`/logo.jpg`} alt="app logo" />
                    <p className="font-bold text-xl tracking-wide">LearnGo</p>
                </div>

                <ul className="flex items-center gap-x-6">
                    <li>
                        <Link href={"/home"} className={pathname === "/home" ? "active" : ""}>Trang chủ</Link>
                    </li>
                    <li>
                        <Link href={"/course"} className={pathname === "/course" ? "active" : ""}>Khóa học</Link>
                    </li>
                    <li>
                        <Link href={"/blog"} className={pathname === "/blog" ? "active" : ""}>Bài viết</Link>
                    </li>
                </ul>

                <form action="">
                    <LabelStyled>
                        <SearchIconWrapperStyled>
                            <SearchIcon />
                        </SearchIconWrapperStyled>
                        <SearchInputStyled placeholder='Tìm kiếm khóa học' name='keyword' />
                    </LabelStyled>
                </form>
            </div>

            {session ? (
                <>
                    <Avatar onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ cursor: 'pointer' }}>
                        N
                    </Avatar>
                    <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </>
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
                    <Button variant="outlined" color="secondary">Đăng Nhập</Button>
                    <Button variant="contained">Đăng Kí</Button>
                </Box>
            )}
        </Box>
    )
}

export default Header