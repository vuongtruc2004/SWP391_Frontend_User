import { Button, Tooltip } from "@mui/material";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { useState } from "react";

const ChatBox = () => {
    const [userInput, setUserInput] = useState("");

    const handleSubmit = () => {
        console.log(userInput);
    }

    return (
        <div className="p-5">
            <div className="relative h-[96px]">
                <textarea
                    placeholder="Hỏi tôi bất cứ điều gì"
                    rows={3}
                    className="border-0 outline-0 bg-[#303030] p-3 rounded-xl w-full resize-none"
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <Tooltip title="Gửi" arrow placement="top">
                    <Button variant="contained"
                        color="secondary"
                        disabled={userInput === ""}
                        onClick={handleSubmit}
                        sx={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            width: '32px',
                            minWidth: '32px',
                            aspectRatio: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            padding: 0
                        }}>
                        <ArrowUpwardOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                    </Button>
                </Tooltip>
            </div>

            <p className="text-sm text-gray-300 mt-1 px-1">LearnGo AI có thể mắc lỗi, bạn vui lòng kiểm tra lại thông tin quan trọng và không chia sẻ những thông tin nhạy cảm.</p>
        </div>

    )
}

export default ChatBox