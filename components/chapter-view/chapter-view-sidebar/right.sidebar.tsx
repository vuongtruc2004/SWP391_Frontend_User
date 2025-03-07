'use client'
import ChaptersList from "@/features/chapter-view/chapter-view-video/chapters.list"
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper"
import { Box, IconButton, Tooltip } from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import Link from "next/link";
import ChatSmallScreen from "@/components/ai-support/chat.small.screen";

const RightSidebar = () => {
    const { openProgressBar, setOpenProgressBar, openAI, setOpenAI } = useCourseView();

    return (
        <>
            {openProgressBar && (
                <ChaptersList />
            )}
            {openAI && (
                <Box sx={{
                    bgcolor: '#171717',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }}>
                    <div className="flex items-center justify-between pl-5 pr-3 pt-3">

                        <div className="flex items-center gap-x-1">
                            <Image src={`/logo.webp`} alt="app logo" width={32} height={32} />
                            <h1 className="font-semibold text-lg">LearnGo AI</h1>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <Tooltip title="Cửa sổ chat mới" arrow>
                                <IconButton color="secondary" size="small">
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Xem toàn màn hình" arrow>
                                <Link href={"/home"}>
                                    <IconButton color="secondary" size="small">
                                        <FullscreenIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>

                            <Tooltip title="Đóng cửa sổ chat" arrow>
                                <IconButton color="secondary" onClick={() => setOpenAI(false)} size="small">
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </div>

                    </div>
                    <ChatSmallScreen />
                </Box>
            )}
        </>
    )
}

export default RightSidebar