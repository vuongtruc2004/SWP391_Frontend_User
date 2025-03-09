import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import ListEmpty from "@/components/empty/list.empty";
import ChatHistoryHeader from "./chat.history.header";
import SingleChatHistoryList from "./single.chat.history.list";
import { CircularProgress, Divider } from "@mui/material";
import { useAiMessage } from "@/wrapper/ai-message/ai.message.wrapper";

const ChatHistory = () => {
    const { data: session, status } = useSession();
    const { historyChats, setHistoryChats } = useAiMessage();

    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            }
        }
        getHistoryChats();
    }, [session]);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen shrink-0">
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen">
            <ChatHistoryHeader />

            <Divider sx={{ marginBlock: '10px' }} />

            {historyChats && (historyChats.todayChats.length || historyChats.yesterdayChats.length || historyChats.weekAgoChats.length) ? (
                <div className="flex-1 overflow-y-auto pb-5">
                    {historyChats.todayChats.length > 0 && (
                        <SingleChatHistoryList chatList={historyChats.todayChats} time="today" />
                    )}

                    {historyChats.yesterdayChats.length > 0 && (
                        <SingleChatHistoryList chatList={historyChats.yesterdayChats} time="yesterday" />
                    )}

                    {historyChats.weekAgoChats.length > 0 && (
                        <SingleChatHistoryList chatList={historyChats.weekAgoChats} time="week" />
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center flex-1">
                    <ListEmpty text="Lịch sử trống" />
                </div>
            )}
        </div>
    )
}

export default ChatHistory