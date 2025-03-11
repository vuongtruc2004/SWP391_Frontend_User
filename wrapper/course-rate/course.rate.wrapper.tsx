'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface ICourseRate {
    rateList: RateResponse[];
    setRateList: Dispatch<SetStateAction<RateResponse[]>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    starsFilter: number;
    setStarsFilter: Dispatch<SetStateAction<number>>;
    totalPages: number;
    setTotalPages: Dispatch<SetStateAction<number>>;
    fetchRatePage: () => Promise<void>;
}

const CourseRateContext = createContext<ICourseRate | null>(null);

export const CourseRateWrapper = ({ course, children }: { course: CourseDetailsResponse, children: React.ReactNode }) => {
    const [rateList, setRateList] = useState<RateResponse[]>([]);
    const [page, setPage] = useState(1);
    const [starsFilter, setStarsFilter] = useState<number>(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchRatePage = async () => {
        const ratePageResponse = await sendRequest<ApiResponse<PageDetailsResponse<RateResponse[]>>>({
            url: `${apiUrl}/rates`,
            queryParams: {
                page: page,
                size: 5,
                sort: 'updatedAt,desc',
                filter: `${starsFilter !== 0 ? `stars : ${starsFilter} and ` : ""}course.courseId : ${course.courseId}`
            }
        });

        if (ratePageResponse.status === 200) {
            setRateList(ratePageResponse.data.content);
            setPage(ratePageResponse.data.currentPage);
            setTotalPages(ratePageResponse.data.totalPages);
        }
    }

    useEffect(() => {
        fetchRatePage();
    }, [page, starsFilter]);

    return (
        <CourseRateContext.Provider value={{
            rateList,
            setRateList,
            page,
            setPage,
            starsFilter,
            setStarsFilter,
            totalPages,
            setTotalPages,
            fetchRatePage
        }}>
            {children}
        </CourseRateContext.Provider>
    )
}

export const useCourseRate = () => {
    const context = useContext(CourseRateContext);
    if (!context) {
        throw new Error("Loi");
    }
    return context;
}