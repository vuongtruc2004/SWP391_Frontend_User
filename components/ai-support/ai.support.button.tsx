import { Box, Tooltip } from "@mui/material"
import Image from "next/image";
import { storageUrl } from "@/utils/url";

const AiSupportButton = ({ placement }: {
    placement?: "top" | "right" | "bottom" | "left" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined
}) => {
    return (
        <Tooltip title="Chat với LearnGo AI" arrow placement={placement}>
            <Box
                sx={{
                    position: "relative",
                    width: "36px",
                    height: "36px",
                    '& img': {
                        bgcolor: 'transparent !important',
                        borderRadius: '50%'
                    },
                    cursor: 'pointer',
                    borderRadius: '50%',
                    bgcolor: 'transparent !important'
                }}
            >
                <Image
                    src={`${storageUrl}/icon/ai.png`}
                    alt="cart"
                    fill sizes="(max-width: 1000px) 100vw" priority={true}
                    style={{ objectFit: "cover" }}
                />
            </Box>
        </Tooltip>
    )
}

export default AiSupportButton
