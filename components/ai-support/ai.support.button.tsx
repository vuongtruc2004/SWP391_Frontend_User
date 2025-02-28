import { Box, Tooltip } from "@mui/material"
import Image from "next/image";
import { storageUrl } from "@/utils/url";

const AiSupportButton = () => {
    return (
        <Tooltip title="Chat với LearnGo AI" arrow>
            <Box
                sx={{
                    position: "relative",
                    width: "36px",
                    height: "36px",
                    '& img': {
                        bgcolor: 'transparent',
                        borderRadius: '50%'
                    },
                    cursor: 'pointer',
                    borderRadius: '50%'
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
