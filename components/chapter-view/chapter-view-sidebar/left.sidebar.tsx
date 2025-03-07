'use client'
import Image from "next/image";
import Link from "next/link";
import { Avatar, Box, Tooltip } from "@mui/material";
import AccountMenu from "../../header/account.menu";
import { useState } from "react";
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import StarIcon from '@mui/icons-material/Star';
import AiIcon from "@/components/ai-support/ai.icon";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const LeftSidebar = () => {
    const { setOpenProgressBar, setOpenAI, openProgressBar, openAI } = useCourseView();
    const { avatarSrc, fullname } = useUserAvatar();
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
                    rowGap: '12px',
                    '.active': {
                        bgcolor: '#212121'
                    }
                }}>
                    <Tooltip title={"Đánh giá khóa học"} arrow placement="right">
                        <div className={`flex items-center justify-center p-1.5 rounded-md text-gray-200 cursor-pointer`}>
                            <span className="w-8 h-8 flex items-center justify-center"><StarIcon sx={{ fontSize: '1.25rem' }} /></span>
                        </div>
                    </Tooltip>

                    <Tooltip title="Hiển thị tiến độ khóa học" arrow placement="right">
                        <div className={`flex items-center justify-center p-1.5 rounded-md text-gray-200 cursor-pointer mb-2 ${openProgressBar && 'active'}`} onClick={() => {
                            setOpenAI(false);
                            setOpenProgressBar(true);
                        }}>
                            <span className="w-8 h-8 flex items-center justify-center"><MenuOpenIcon sx={{ fontSize: '1.25rem' }} /></span>
                        </div>
                    </Tooltip>

                    <Tooltip title="Chat với LearnGo AI" arrow placement="right">
                        <div className={`cursor-pointer p-1.5 rounded-md ${openAI && 'active'}`} onClick={() => {
                            setOpenAI(true);
                            setOpenProgressBar(false);
                        }}>
                            <AiIcon width={32} height={32} />
                        </div>
                    </Tooltip>
                </Box>
            </div>

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

export default LeftSidebar;