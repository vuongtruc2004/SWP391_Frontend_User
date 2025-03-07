'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface IAiMessage {
    messages: MessageResponse[];
    setMessages: Dispatch<SetStateAction<MessageResponse[]>>;
    latestChat: ChatResponse | null;
    setLatestChat: Dispatch<SetStateAction<ChatResponse | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const MessageContext = createContext<IAiMessage | null>(null);

export const AiMessageWrapper = ({ children, chat }: { children: React.ReactNode, chat: ChatResponse | null }) => {
    const [latestChat, setLatestChat] = useState<ChatResponse | null>(chat);
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (chat && chat.messages.length) {
            setMessages(chat.messages);
        }
    }, [chat]);

    return (
        <MessageContext.Provider value={{ messages, setMessages, latestChat, setLatestChat, loading, setLoading }}>
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