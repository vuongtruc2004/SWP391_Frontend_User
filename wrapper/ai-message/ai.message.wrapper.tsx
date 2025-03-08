'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface IAiMessage {
    messages: MessageResponse[];
    setMessages: Dispatch<SetStateAction<MessageResponse[]>>;
    currentChatID: number | null;
    setCurrentChatID: Dispatch<SetStateAction<number | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    openHistory: boolean;
    setOpenHistory: Dispatch<SetStateAction<boolean>>;
}

const MessageContext = createContext<IAiMessage | null>(null);

export const AiMessageWrapper = ({ children, chat }: { children: React.ReactNode, chat: ChatResponse | null }) => {
    const [currentChatID, setCurrentChatID] = useState<number | null>(null);
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [openHistory, setOpenHistory] = useState(true);

    useEffect(() => {
        if (chat) {
            setMessages(chat.messages);
            setCurrentChatID(chat.chatId);
        }
    }, [chat]);

    return (
        <MessageContext.Provider value={{ messages, setMessages, currentChatID, setCurrentChatID, loading, setLoading, openHistory, setOpenHistory }}>
            {children}
        </MessageContext.Provider>
    )
}

export const useAiMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("Loi");
    }
    return context;
}

export default AiMessageWrapper