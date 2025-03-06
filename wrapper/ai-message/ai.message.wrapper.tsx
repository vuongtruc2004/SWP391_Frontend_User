'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface IAiMessage {
    messages: MessageResponse[];
    setMessages: Dispatch<SetStateAction<MessageResponse[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const MessageContext = createContext<IAiMessage | null>(null);

export const AiMessageWrapper = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [loading, setLoading] = useState(false);

    return (
        <MessageContext.Provider value={{ messages, setMessages, loading, setLoading }}>
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