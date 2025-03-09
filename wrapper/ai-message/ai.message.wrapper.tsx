'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface IAiMessage {
    historyChats: ChatHistoryResponse | null;
    setHistoryChats: Dispatch<SetStateAction<ChatHistoryResponse | null>>;
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

export const AiMessageWrapper = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [historyChats, setHistoryChats] = useState<ChatHistoryResponse | null>(null);
    const [currentChatID, setCurrentChatID] = useState<number | null>(null);
    const [openHistory, setOpenHistory] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <MessageContext.Provider value={{
            historyChats,
            setHistoryChats,
            messages,
            setMessages,
            currentChatID,
            setCurrentChatID,
            loading,
            setLoading,
            openHistory,
            setOpenHistory
        }}>
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