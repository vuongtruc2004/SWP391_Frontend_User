'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, SetStateAction, useContext, useEffect, useState } from "react"

interface ICourseView {
    currentPlayIndex: number;
    setCurrentPlayIndex: React.Dispatch<SetStateAction<number>>;
    course: CourseDetailsResponse;
    userProgress: UserProgressResponse[];
    setUserProgress: React.Dispatch<SetStateAction<UserProgressResponse[]>>;
    loading: boolean;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    lectures: (VideoResponse | DocumentResponse)[];
}
const CourseViewContext = createContext<ICourseView | null>(null);

export const CourseViewWrapper = ({ children, course }: { children: React.ReactNode, course: CourseDetailsResponse }) => {
    const { data: session, status } = useSession();

    const [currentPlayIndex, setCurrentPlayIndex] = useState<number>(0);
    const [userProgress, setUserProgress] = useState<UserProgressResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const lectures: (VideoResponse | DocumentResponse)[] = course.lessons.flatMap(lesson => [...lesson.videos, ...lesson.documents]);

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
        <CourseViewContext.Provider value={{ currentPlayIndex, setCurrentPlayIndex, course, userProgress, setUserProgress, loading, setLoading, lectures }}>
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