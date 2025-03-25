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
    handleChangeStatus: (courseId: number, chapterId: number, lessonId: number | null, quizId: number | null) => Promise<void>;
}
const UserProgressContext = createContext<IUserProgress | null>(null);

export const UserProgressWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [userProgresses, setUserProgresses] = useState<UserProgressResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const handleChangeStatus = async (courseId: number, chapterId: number, lessonId: number | null, quizId: number | null) => {
        if ((lessonId && quizId) || (!lessonId && !quizId)) {
            throw new Error("Bạn chỉ được truyền 1 trong hai tham số lessonId hoặc quizId!");
        }
        if (status === "authenticated") {
            const userProgressResponse = await sendRequest<ApiResponse<UserProgressResponse>>({
                url: `${apiUrl}/progresses`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    courseId: courseId,
                    chapterId: chapterId,
                    lessonId: lessonId ? lessonId : null,
                    quizId: quizId ? quizId : null
                }
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
                    url: `${apiUrl}/progresses`,
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