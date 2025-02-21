'use client'
import Image from "next/image";
import Link from "next/link";
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Box, Divider, InputAdornment, TextField } from "@mui/material";
import AccountMenu from "../../header/account.menu";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter, useSearchParams } from "next/navigation";
import LessonViewCompletion from "./course.completion";

const Header = ({ course }: { course: CourseDetailsResponse }) => {
    const { data: session } = useSession();
    const { avatarSrc } = useUserAvatar();
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const handleSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const keyword = formData.get('keyword')?.toString() || "";
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('keyword', keyword);
        newSearchParams.set('page', '1');

        e.currentTarget.reset();
        push(`/course?${newSearchParams}`);
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: '20px',
            width: '100%',
            height: '70px',
            paddingInline: '20px',
            'img': {
                objectFit: 'cover',
                borderRadius: '50%',
                bgcolor: 'black'
            },
            bgcolor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(25px)',
            position: 'sticky',
            top: 0,
            left: 0,
            zIndex: 15,
        }}>
            <div className="flex items-center gap-x-5">
                <Link href={"/home"} className="items-center flex justify-center cursor-pointer gap-x-2 mr-3">
                    <Image src={`/logo.webp`} alt="app logo" width={40} height={40} />
                    <p className="font-semibold text-2xl tracking-wide">LearnGo</p>
                </Link>
                <Divider orientation="vertical" sx={{ height: '26px' }} />
                <Link href={`/course/${course.courseId}`} className="text-lg hover:text-blue-500 transition-all duration-150 line-clamp-1 max-w-[200px]">{course.courseName}</Link>
            </div>

            <div className="flex items-center gap-x-5">
                <div className="flex items-center gap-x-3 cursor-pointer text-sm hover:text-blue-500 transition-all duration-150">
                    <StarIcon sx={{ color: '#6c757d' }} />
                    <p>Đánh giá khóa học</p>
                </div>

                <LessonViewCompletion course={course} />

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
                        placeholder='Tìm kiếm khóa học'
                        name='keyword'
                        sx={{
                            width: '250px',
                            '.mui-x5tvri-MuiInputBase-root-MuiOutlinedInput-root': {
                                borderRadius: '30px',
                                height: '36px'
                            },
                            '& input': {
                                fontSize: '14px',
                                '&::placeholder': {
                                    fontSize: '14px'
                                }
                            }
                        }}
                    />
                </form>

                <Avatar alt="avatar" onClick={(event) => setMenuAnchorEl(event.currentTarget)} sx={{ cursor: 'pointer' }} src={avatarSrc}>
                    {session?.user.fullname?.charAt(0).toUpperCase()}
                </Avatar>
                <AccountMenu anchorEl={menuAnchorEl} setAnchorEl={setMenuAnchorEl} />
            </div>
        </Box>
    )
}

export default Header