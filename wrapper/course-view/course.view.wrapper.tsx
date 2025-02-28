'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface ICourseView {
    currentPlayIndex: number;
    setCurrentPlayIndex: Dispatch<SetStateAction<number>>;
    course: CourseDetailsResponse;
    lessons: LessonResponse[];
    userProgress: UserProgressResponse[];
    setUserProgress: Dispatch<SetStateAction<UserProgressResponse[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    openProgressBar: boolean;
    setOpenProgressBar: Dispatch<SetStateAction<boolean>>;
}
const CourseViewContext = createContext<ICourseView | null>(null);

export const CourseViewWrapper = ({ children, course }: { children: React.ReactNode, course: CourseDetailsResponse }) => {
    const { data: session, status } = useSession();

    const [userProgress, setUserProgress] = useState<UserProgressResponse[]>([]);
    const [currentPlayIndex, setCurrentPlayIndex] = useState<number>(0);
    const [openProgressBar, setOpenProgressBar] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    const lessons = course.chapters.flatMap(chapter => [...chapter.lessons]);

    useEffect(() => {
        const fetchData = async () => {
            if (status === "authenticated") {
                const userProgressResponse = await sendRequest<ApiResponse<UserProgressResponse[]>>({
                    url: `${apiUrl}/progress?courseId=${course.courseId}`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                if (userProgressResponse.status === 200) {
                    setUserProgress(userProgressResponse.data);
                }
            }
            setLoading(false);
        }
        fetchData();
    }, [session]);

    return (
        <CourseViewContext.Provider value={{
            currentPlayIndex,
            setCurrentPlayIndex,
            course,
            lessons,
            userProgress,
            setUserProgress,
            loading,
            setLoading,
            openProgressBar,
            setOpenProgressBar
        }}>
            {children}
        </CourseViewContext.Provider>
    )
}

export const useCourseView = () => {
    const context = useContext(CourseViewContext);
    if (!context) {
        throw new Error("Loi");
    }
    return context;
}