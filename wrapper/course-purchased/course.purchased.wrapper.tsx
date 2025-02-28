'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface ICoursePurchased {
    purchasedCourseIds: number[];
    setPurchasedCourseIds: React.Dispatch<React.SetStateAction<number[]>>;
    loading: boolean;
}

const CoursePurchasedContext = createContext<ICoursePurchased | null>(null);

export const CoursePurchasedWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [purchasedCourseIds, setPurchasedCourseIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchasedCourseIds = async () => {
            if (status === "authenticated") {
                const purchasedCourseIdsResponse = await sendRequest<ApiResponse<number[]>>({
                    url: `${apiUrl}/courses/user/purchased`,
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`
                    }
                });
                if (purchasedCourseIdsResponse.status === 200) {
                    setPurchasedCourseIds(purchasedCourseIdsResponse.data);
                }
            } else {
                setPurchasedCourseIds([]);
            }
            setLoading(false);
        }
        fetchPurchasedCourseIds();
    }, [session]);

    return (
        <CoursePurchasedContext.Provider value={{
            purchasedCourseIds,
            setPurchasedCourseIds,
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
