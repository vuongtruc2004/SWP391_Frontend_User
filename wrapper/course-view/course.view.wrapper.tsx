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
    const [openProgressBar, setOpenProgressBar] = useState(false);
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

    useEffect(() => {
        const storedData = String(localStorage.getItem('last_open_right_sidebar') || "progress");
        if (storedData === "progress") {
            setOpenProgressBar(true);
        } else if (storedData === "ai") {
            setOpenAI(true);
        }
    }, []);

    useEffect(() => {
        if (openAI) {
            localStorage.setItem('last_open_right_sidebar', 'ai');
        } else if (openProgressBar) {
            localStorage.setItem('last_open_right_sidebar', 'progress');
        }
    }, [openAI, openProgressBar]);

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