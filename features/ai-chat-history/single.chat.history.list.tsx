import { useAiMessage } from '@/wrapper/ai-message/ai.message.wrapper';
import { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Popover } from '@mui/material';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';
import { useSession } from 'next-auth/react';

const SingleChatHistoryList = ({ chatList, time }: {
    chatList: { chatId: number; title: string; }[];
    time: "today" | "yesterday" | "week";
}) => {
    const { data: session, status } = useSession();
    const { currentChatID, setCurrentChatID, setOpenHistory, setMessages, setHistoryChats, historyChats, setLoading } = useAiMessage();

    const [chatAnchorEl, setChatAnchorEl] = useState<HTMLElement | null>(null);
    const [deletedChatID, setDeletedChatID] = useState<number | null>(null);

    const handleDeleteAChat = async () => {
        if (status === "authenticated") {
            await sendRequest<void>({
                url: `${apiUrl}/chats/${deletedChatID}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            });

            if (deletedChatID === currentChatID) {
                setCurrentChatID(null);
                setMessages([]);
            }

            if (historyChats) {
                const updatedChats = { ...historyChats };

                if (time === "today") {
                    updatedChats.todayChats = historyChats.todayChats.filter(chat => chat.chatId !== deletedChatID);
                } else if (time === "yesterday") {
                    updatedChats.yesterdayChats = historyChats.yesterdayChats.filter(chat => chat.chatId !== deletedChatID);
                } else if (time === "week") {
                    updatedChats.weekAgoChats = historyChats.weekAgoChats.filter(chat => chat.chatId !== deletedChatID);
                }

                setHistoryChats(updatedChats);
            }
        }
        setChatAnchorEl(null);
        setDeletedChatID(null);
    }

    const handleChangeChat = async (chatID: number) => {
        if (status === "authenticated") {
            setLoading(true);
            const chatResponse = await sendRequest<ApiResponse<ChatResponse>>({
                url: `${apiUrl}/chats/${chatID}`,
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
            if (chatResponse.status === 200) {
                setMessages(chatResponse.data.messages);
                setCurrentChatID(chatID);
            }
            setOpenHistory(false);
            setLoading(false);
        }
    }

    return (
        <Box sx={{
            padding: '20px',
            paddingTop: '0',
            'li': {
                transition: 'all .3s',
                cursor: 'pointer',
                borderRadius: '6px',
                '& p': {
                    mask: 'linear-gradient(90deg, #000, #000 84%, transparent 89%, transparent)',
                }
            },
        }}>
            <p className="font-semibold text-gray-300 text-sm p-2">
                {time === "today" ? "Hôm nay" : (time === "yesterday" ? "Hôm qua" : "7 ngày trước")}
            </p>
            <ul>
                {chatList.map(chat => {
                    return (
                        <li key={chat.chatId + "_" + chat.title}
                            className={`pr-4 group relative ${chat.chatId === currentChatID && 'bg-[#2f2f2f]'} hover:bg-[#212121] ${deletedChatID === chat.chatId ? 'bg-[#212121]' : ''}`}
                        >
                            <p className="text-nowrap overflow-hidden py-2 pl-4"
                                onClick={() => handleChangeChat(chat.chatId)}
                            >
                                {chat.title}
                            </p>
                            <span className={`opacity-0 group-hover:opacity-100 ${deletedChatID === chat.chatId ? 'opacity-100' : ''} cursor-pointer p-1.5 hover:text-gray-300 absolute right-0 top-1/2 -translate-y-1/2`}
                                onClick={(e) => {
                                    setDeletedChatID(chat.chatId);
                                    setChatAnchorEl(e.currentTarget);
                                }}
                            >
                                <MoreHorizIcon sx={{ fontSize: '1.2rem' }} />
                            </span>
                        </li>
                    )
                })}
                <Popover
                    aria-hidden={false}
                    open={Boolean(chatAnchorEl)}
                    anchorEl={chatAnchorEl}
                    onClose={() => {
                        setChatAnchorEl(null);
                        setDeletedChatID(null);
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Button color="error" startIcon={<DeleteOutlineIcon />} sx={{ paddingInline: '16px' }} onClick={handleDeleteAChat}>
                        Xóa
                    </Button>
                </Popover>
            </ul>
        </Box>
    )
}

export default SingleChatHistoryList