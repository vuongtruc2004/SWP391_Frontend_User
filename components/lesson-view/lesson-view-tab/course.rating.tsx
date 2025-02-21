import { useEffect, useState, useRef, useCallback } from "react";
import SingleCourseRating from "@/components/course/course-details/single.course.rating";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl, storageUrl } from "@/utils/url";
import { CircularProgress } from "@mui/material";

const CourseRating = ({ course }: { course: CourseDetailsResponse }) => {
    const [rateList, setRateList] = useState<RateResponse[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastRatingElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || !hasMore) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observerRef.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        const fetchRate = async () => {
            setLoading(true);
            const response = await sendRequest<ApiResponse<PageDetailsResponse<RateResponse[]>>>({
                url: `${apiUrl}/rates?page=${page}&size=5&filter=course.courseId:${course.courseId}&sort=createdAt,desc&sort=rateId,asc`,
            });

            if (response.status === 200) {
                setRateList(prev => [...prev, ...response.data.content]);
                if (page >= response.data.totalPages) {
                    setHasMore(false);
                }
            }
            setLoading(false);
        };

        if (hasMore) {
            fetchRate();
        }
    }, [page, hasMore]);

    return (
        <div className="mt-5">
            {rateList.map((rate, index) => {
                const avatarSrc = rate?.user?.avatar?.startsWith("http")
                    ? rate?.user?.avatar
                    : `${storageUrl}/avatar/${rate?.user?.avatar}`;

                return (
                    <div key={rate.rateId + "_" + rate.user.userId} ref={index === rateList.length - 1 ? lastRatingElementRef : null}>
                        <SingleCourseRating
                            rate={rate}
                            index={index}
                            avatarSrc={avatarSrc}
                        />
                    </div>
                );
            })}
            {loading && (
                <div className="flex justify-center p-5">
                    <CircularProgress />
                </div>
            )}
        </div>
    );
};

export default CourseRating;
