import { useAiMessage } from '@/wrapper/ai-message/ai.message.wrapper';
import { useCourseView } from '@/wrapper/course-view/course.view.wrapper';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import { IconButton, Tooltip } from '@mui/material';
import Image from "next/image";

const AiHeader = () => {
    const { setOpenAI } = useCourseView();
    const { messages, setMessages, setCurrentChatID, setOpenHistory } = useAiMessage();

    const handleCreateNewChat = async () => {
        if (!messages.length) return;
        setMessages([]);
        setCurrentChatID(null);
    }

    return (
        <div className="flex items-center justify-between pl-5 pr-3 pt-3">
            <div className="flex items-center gap-x-1">
                <Image src={`/logo.webp`} alt="app logo" width={32} height={32} />
                <h1 className="font-semibold text-lg">LearnGo AI</h1>
            </div>

            <div className="flex items-center gap-x-3">
                <Tooltip title="Đoạn chat mới" arrow>
                    <IconButton color="secondary" size="small" onClick={handleCreateNewChat}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Xem lịch sử chat" arrow>
                    <IconButton color="secondary" size="small" onClick={() => setOpenHistory(true)}>
                        <HistoryIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Đóng cửa sổ chat" arrow>
                    <IconButton color="secondary" onClick={() => setOpenAI(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default AiHeader