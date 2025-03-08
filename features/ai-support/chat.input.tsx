import { Button, Tooltip } from "@mui/material";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { useState } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { useAiMessage } from "@/wrapper/ai-message/ai.message.wrapper";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";

const ChatInput = () => {
    const { data: session, status } = useSession();
    const { currentChatID, messages, setMessages, loading, setLoading, setCurrentChatID } = useAiMessage();
    const [userInput, setUserInput] = useState("");

    const handleSubmit = async () => {
        if (!userInput.trim()) return;
        setLoading(true);
        setMessages(prev => [...prev, { role: 'USER', content: userInput }]);

        const response = await sendRequest<ApiResponse<string>>({
            url: '/api/chat',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                prompt: userInput,
                messages: messages
            }
        });

        if (response.status === 200) {
            setMessages(prev => [...prev, { role: "MODEL", content: response.data }]);
            setUserInput("");
            handleSaveChat(response.data);
        }
        setLoading(false);
    };

    const handleSaveChat = async (result: string) => {
        if (status === "authenticated") {
            const messagesRequest: CreateMessageRequest = {
                chatId: currentChatID,
                messages: [{ content: userInput, role: 'USER' }, { content: result, role: 'MODEL' }]
            }

            const chatResponse = await sendRequest<ApiResponse<ChatResponse>>({
                url: `${apiUrl}/chats`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.accessToken}`
                },
                body: messagesRequest
            });

            if (chatResponse.status === 201) {
                setCurrentChatID(chatResponse.data.chatId);
            }
        }
    }

    return (
        <div className="p-5">
            <div className="relative h-[96px]">
                <textarea
                    placeholder="Hỏi tôi bất cứ điều gì"
                    rows={3}
                    value={userInput}
                    className="border-0 outline-0 bg-[#303030] p-3 rounded-xl w-full resize-none"
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <Tooltip title="Gửi" arrow placement="top">
                    <Button variant="contained"
                        color="secondary"
                        disabled={userInput.trim() === ""}
                        loading={loading}
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

            <p className="text-sm text-gray-300 mt-2 px-1">LearnGo AI có thể mắc lỗi. Hãy kiểm tra lại những thông tin quan trọng và không chia sẻ những thông tin nhạy cảm!</p>
        </div>

    )
}

export default ChatInput