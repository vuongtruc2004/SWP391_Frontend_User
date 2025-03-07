import { Box, Drawer, IconButton, Tooltip } from "@mui/material"
import { useState } from "react";
import AiIcon from "./ai.icon";
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AddIcon from '@mui/icons-material/Add';
import Image from "next/image";
import Link from "next/link";
import ChatSmallScreen from "./chat.small.screen";

const AiDrawerButton = ({ placement }: {
    placement?: "top" | "right" | "bottom" | "left" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Tooltip title="Chat với LearnGo AI" arrow placement={placement}>
                <div onClick={() => setOpen(true)} className="cursor-pointer">
                    <AiIcon width={36} height={36} />
                </div>
            </Tooltip>

            <Drawer open={open} anchor="right" onClose={() => setOpen(false)} sx={{
                '.mui-1qsmooj-MuiPaper-root-MuiDrawer-paper': {
                    width: '30%',
                    maxWidth: '550px',
                    minWidth: '420px'
                }
            }}>
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
                                <IconButton color="secondary" onClick={() => setOpen(false)} size="small">
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </div>

                    </div>
                    <ChatSmallScreen />
                </Box>
            </Drawer>
        </>

    )
}

export default AiDrawerButton
