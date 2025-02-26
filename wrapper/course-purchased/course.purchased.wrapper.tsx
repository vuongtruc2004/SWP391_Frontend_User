'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface ICoursePurchased {
    purchasedCourses: CourseStatusResponse[];
    setPurchasedCourses: React.Dispatch<React.SetStateAction<CourseStatusResponse[]>>;
    loading: boolean;
    getPercentageByCourseId: (courseId: number) => number;
}

const CoursePurchasedContext = createContext<ICoursePurchased | null>(null);

export const CoursePurchasedWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [purchasedCourses, setPurchasedCourses] = useState<CourseStatusResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const getPercentageByCourseId = useCallback((courseId: number) => {
        const completionPercentage = purchasedCourses.find(course => course.courseId === courseId)?.completionPercentage;
        if (completionPercentage === undefined) {
            return -1;
        }
        return completionPercentage;
    }, [purchasedCourses]);

    useEffect(() => {
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
        fetchPurchasedCourses();
    }, [session]);

    return (
        <CoursePurchasedContext.Provider value={{
            purchasedCourses,
            setPurchasedCourses,
            getPercentageByCourseId,
            loading
        }}>
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
