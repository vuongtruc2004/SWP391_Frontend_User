import { Drawer, Tooltip } from "@mui/material"
import { useState } from "react";
import AiIcon from "./ai.icon";
import ChatDrawer from "./chat.drawer";

const AiSupportButton = ({ placement }: {
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
                <ChatDrawer setOpen={setOpen} />
            </Drawer>
        </>

    )
}

export default AiSupportButton
