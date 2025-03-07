'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface ICourseView {
    openAI: boolean;
    setOpenAI: Dispatch<SetStateAction<boolean>>;
    currentPlayIndex: number;
    setCurrentPlayIndex: Dispatch<SetStateAction<number>>;
    course: CourseDetailsResponse;
    lessons: LessonResponse[];
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    openProgressBar: boolean;
    setOpenProgressBar: Dispatch<SetStateAction<boolean>>;
}
const CourseViewContext = createContext<ICourseView | null>(null);

export const CourseViewWrapper = ({ children, course }: { children: React.ReactNode, course: CourseDetailsResponse }) => {
    const [currentPlayIndex, setCurrentPlayIndex] = useState(0);
    const [openProgressBar, setOpenProgressBar] = useState(true);
    const [openAI, setOpenAI] = useState(false);
    const [loading, setLoading] = useState(true);

    const lessons = course.chapters.flatMap(chapter => [...chapter.lessons]);

    useEffect(() => {
        const storedData = localStorage.getItem('last_play') || "{}";
        try {
            const lastPlay = JSON.parse(storedData);
            setCurrentPlayIndex(lastPlay[course.courseId] || 0);
        } catch (error) {
            localStorage.setItem('last_play', '{}');
            throw new Error("last_play trong localStorage của bạn đã bị chỉnh sửa, vui lòng click vào nút 'Try Again'");
        }
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('last_play') || "{}";
        try {
            const lastPlay = JSON.parse(storedData);
            if (lastPlay[course.courseId] !== currentPlayIndex) {
                lastPlay[course.courseId] = currentPlayIndex;
                localStorage.setItem('last_play', JSON.stringify(lastPlay));
            }
        } catch (error) {
            localStorage.setItem('last_play', '{}');
            throw new Error("last_play trong localStorage của bạn đã bị chỉnh sửa, vui lòng click vào nút 'Try Again'");
        }
    }, [currentPlayIndex]);

    return (
        <CourseViewContext.Provider value={{
            openAI,
            setOpenAI,
            currentPlayIndex,
            setCurrentPlayIndex,
            course,
            lessons,
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