'use client'
import { storageUrl } from "@/utils/url";
import { Avatar, Box, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { LabelStyled, SearchIconWrapperStyled, SearchInputStyled } from "./style";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ConstructionIcon from '@mui/icons-material/Construction';
import PublicIcon from '@mui/icons-material/Public';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
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
        <Box sx={{
            height: '50vh',
            minHeight: '450px',
            // backgroundImage: `url(${storageUrl}/background.jpg)`,
            backgroundPosition: 'left bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            bgcolor: 'black',
            position: 'relative',
            color: 'white'
        }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    columnGap: '20px',
                    width: '100%',
                    padding: '10px 20px',
                    'img': {
                        width: '60px',
                        aspectRatio: 1,
                        objectFit: 'cover',
                        borderRadius: '50%'
                    },
                    'a:hover, a.active': {
                        textDecoration: 'underline'
                    }
                }}>
                <div className="flex items-center justify-center gap-x-6">
                    <div onClick={() => router.push("/home")} className="items-center flex justify-center cursor-pointer gap-x-2 mr-3">
                        <img src={`${storageUrl}/logo/app.png`} alt="app logo" />
                        <p className="font-bold text-xl uppercase tracking-wider">E-Learning</p>
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

            <Box sx={{
                width: '550px',
                '.mui-lxrpex-MuiButtonBase-root-MuiButton-root': {
                    fontSize: '14px',
                    textTransform: 'capitalize',
                    padding: '5px 30px'
                },
                position: 'absolute',
                top: '50%',
                left: '50px',
                transform: 'translateY(-50%)'
            }}>
                <p className="text-3xl font-bold">HỌC. THỰC HÀNH. THÀNH CÔNG.</p>
                <p className="mb-6 mt-2">
                    Học lập trình dễ dàng với các khóa học chất lượng, lộ trình rõ ràng, bài bản cùng với các dự án thực tế.
                    Học mọi lúc, mọi nơi, nâng cao kỹ năng ngay hôm nay!
                    Chinh phục công nghệ và mở ra cơ hội nghề nghiệp mới cùng chúng tôi.
                </p>
                <Button color="primary" variant="contained">Bắt Đầu</Button>
            </Box>

            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translate(-50%, 50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '20px',
                'div': {
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '20px',
                    width: '280px',
                    bgcolor: 'white',
                    borderRadius: '5px',
                    boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
                    padding: '20px',
                    color: '#343a40',
                }
            }}>
                <div>
                    <PublicIcon sx={{ fontSize: '2.5rem' }} />
                    <p>Khám phá 100+ khóa học khác nhau với đa dạng đề tài.</p>
                </div>
                <div>
                    <EmojiEventsIcon sx={{ fontSize: '2.5rem' }} />
                    <p>Đội ngũ giảng dạy chuyên nghiệp, dày dặn kinh nghiệm.</p>
                </div>
                <div>
                    <ConstructionIcon sx={{ fontSize: '2.5rem' }} />
                    <p>Xây dựng dự án thực tế, làm bài kiểm tra trong các khóa học.</p>
                </div>
                <div>
                    <ShutterSpeedIcon sx={{ fontSize: '2.5rem' }} />
                    <p>Tiết kiệm thời gian với các video thời lượng ngắn.</p>
                </div>
            </Box>
        </Box >
    )
}

export default Header