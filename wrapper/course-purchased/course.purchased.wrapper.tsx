'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface ICoursePurchased {
    purchasedCourses: CourseStatusResponse[];
    setPurchasedCourses: React.Dispatch<React.SetStateAction<CourseStatusResponse[]>>;
    loading: boolean;
}

const CoursePurchasedContext = createContext<ICoursePurchased | null>(null);

export const CoursePurchasedWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [purchasedCourses, setPurchasedCourses] = useState<CourseStatusResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchasedCourses = async () => {
            let purchasedCoursesResponse: ApiResponse<CourseStatusResponse[]>;
            if (status === "authenticated") {
                purchasedCoursesResponse = await sendRequest<ApiResponse<CourseStatusResponse[]>>({
                    url: `${apiUrl}/courses/user/purchased`,
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`
                    }
                });
            } else {
                purchasedCoursesResponse = await sendRequest<ApiResponse<CourseStatusResponse[]>>({
                    url: `${apiUrl}/courses/user/purchased`,
                });
            }
            console.log(purchasedCoursesResponse);
            if (purchasedCoursesResponse.status === 200) {
                setPurchasedCourses(purchasedCoursesResponse.data);
            }
            setLoading(false);
        }
        fetchPurchasedCourses();
    }, [session]);

    return (
        <CoursePurchasedContext.Provider value={{ purchasedCourses, setPurchasedCourses, loading }}>
            {children}
        </CoursePurchasedContext.Provider>
    )
}

export const useCoursePurchased = () => {
    const context = useContext(CoursePurchasedContext);
    if (!context) {
        throw new Error('useCoursePurchased must be used within a CoursePurchasedWrapper');
    }
    return context;
}