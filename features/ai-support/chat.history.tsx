import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useAiMessage } from "@/wrapper/ai-message/ai.message.wrapper";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import ListEmpty from "@/components/empty/list.empty";

const ChatHistory = () => {
    const { data: session, status } = useSession();
    const { openHistory, setOpenHistory, currentChatID } = useAiMessage();

    const [historyChats, setHistoryChats] = useState<ChatHistoryResponse | null>(null);

    useEffect(() => {
        const getHistoryChats = async () => {
            if (status === "authenticated") {
                const response = await sendRequest<ApiResponse<ChatHistoryResponse>>({
                    url: `${apiUrl}/chats/history`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                if (response.status === 200) {
                    setHistoryChats(response.data);
                }
            }
        }
        getHistoryChats();
    }, [session]);

    if (!historyChats) {
        return (
            <ListEmpty text="Lịch sử trống" />
        )
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-between pl-5 pr-3 pt-3">
                <h1>Lịch sử chat</h1>

                <Tooltip title="Đóng" arrow>
                    <IconButton color="secondary" onClick={() => setOpenHistory(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </Tooltip >
            </div>

            <Divider sx={{ marginBlock: '10px' }} />

            <Box sx={{
                padding: '20px',
                paddingTop: '0',
            }}>
                <p className="font-semibold text-gray-300 text-sm p-2">Hôm nay</p>
                <ul>
                    {historyChats.todayChats.map(chat => {
                        return (
                            <li key={chat.chatId + "_" + chat.title} className={`p-2 rounded-md cursor-pointer ${chat.chatId === currentChatID && 'bg-[#2f2f2f]'} hover:bg-[#212121]`}>
                                <p className="text-nowrap overflow-hidden">{chat.title}</p>
                            </li>
                        )
                    })}
                </ul>
            </Box>
        </div>
    )
}

export default ChatHistory