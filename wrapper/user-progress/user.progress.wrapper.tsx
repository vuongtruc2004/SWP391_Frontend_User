'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IUserProgress {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    userProgresses: UserProgressResponse[];
    setUserProgresses: Dispatch<SetStateAction<UserProgressResponse[]>>;
    handleChangeStatus: (lessonId?: number, quizId?: number) => Promise<void>;
}
const UserProgressContext = createContext<IUserProgress | null>(null);

export const UserProgressWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [userProgresses, setUserProgresses] = useState<UserProgressResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const handleChangeStatus = async (lessonId?: number, quizId?: number) => {
        if ((lessonId && quizId) || (!lessonId && !quizId)) {
            throw new Error("Chỉ có 1 trong lessonId và quizId được truyền vào!");
        }
        if (status === "authenticated") {
            let body;
            if (quizId) {
                body = {
                    quizId: quizId
                }
            } else {
                body = {
                    lessonId: lessonId
                }
            }
            const userProgressResponse = await sendRequest<ApiResponse<UserProgressResponse>>({
                url: `${apiUrl}/progress`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: body
            });
            if (userProgressResponse.status === 200) {
                setUserProgresses(prev => [...prev, userProgressResponse.data]);
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (status === "authenticated") {
                const userProgressResponse = await sendRequest<ApiResponse<UserProgressResponse[]>>({
                    url: `${apiUrl}/progress`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                if (userProgressResponse.status === 200) {
                    setUserProgresses(userProgressResponse.data);
                }
            }
            setLoading(false);
        }
        fetchData();
    }, [session])
    return (
        <UserProgressContext.Provider value={{ userProgresses, setUserProgresses, loading, setLoading, handleChangeStatus }}>
            {children}
        </UserProgressContext.Provider>
    )
}

export const useUserProgress = () => {
    const context = useContext(UserProgressContext);
    if (!context) {
        throw new Error("useUserProgress must be used within a UserProgressWrapper")
    }
    return context;
}

export default UserProgressWrapper;