'use client'
import { useWebSocket } from "@/hooks/use.websocket";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface ICoursePurchased {
    purchasedCourses: CourseStatusResponse[];
    setPurchasedCourses: React.Dispatch<React.SetStateAction<CourseStatusResponse[]>>;
    loading: boolean;
    getPercentage: (courseId: number) => number;
}

const CoursePurchasedContext = createContext<ICoursePurchased | null>(null);

export const CoursePurchasedWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [purchasedCourses, setPurchasedCourses] = useState<CourseStatusResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPurchasedCourses = async () => {
        if (status === "authenticated") {
            const purchasedCoursesResponse = await sendRequest<ApiResponse<CourseStatusResponse[]>>({
                url: `${apiUrl}/courses/user/purchased`,
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            });
            if (purchasedCoursesResponse.status === 200) {
                setPurchasedCourses(purchasedCoursesResponse.data);
            }
        } else {
            setPurchasedCourses([]);
        }
        setLoading(false);
    }

    const getPercentage = (courseId: number): number => {
        const percentage = purchasedCourses.find(course => course.courseId === courseId)?.completionPercentage;
        if (percentage === undefined) {
            return -1;
        }
        return percentage;
    };

    useEffect(() => {
        fetchPurchasedCourses();
    }, [session]);

    useWebSocket((message) => {
        if (message === "PURCHASED") {
            fetchPurchasedCourses();
        }
    });

    return (
        <CoursePurchasedContext.Provider value={{ purchasedCourses, setPurchasedCourses, loading, getPercentage }}>
            {children}
        </CoursePurchasedContext.Provider>
    );
};

export const useCoursePurchased = () => {
    const context = useContext(CoursePurchasedContext);
    if (!context) {
        throw new Error('useCoursePurchased must be used within a CoursePurchasedWrapper');
    }
    return context;
};
