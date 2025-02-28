import { useEffect, useState, useRef, useCallback } from "react";
import SingleCourseRating from "@/components/course/course-details/single.course.rating";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl, storageUrl } from "@/utils/url";
import { CircularProgress, MenuItem, Rating, Select } from "@mui/material";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";

const ChapterCourseRate = () => {
    const { course } = useCourseView();

    const [rateList, setRateList] = useState<RateResponse[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [direction, setDirection] = useState<string>("desc");

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
                url: `${apiUrl}/rates?page=${page}&size=2&filter=course.courseId:${course.courseId}&sort=createdAt,${direction}&sort=rateId,asc`,
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
    }, [page, hasMore, direction]);

    return (
        <div className="mt-8">
            <h1 className="font-semibold text-lg">Đánh giá về khóa học</h1>

            <div className="flex items-center justify-between mb-3">
                <div className="text-gray-300 flex items-center gap-x-2 font-semibold">
                    <p><span className="text-green-500">{course.totalRating}</span> bình luận</p>
                    <p>•</p>
                    <div className="flex items-center gap-x-1">
                        <p className="text-amber-600">{course.averageRating.toFixed(1)}</p>
                        <Rating name="read-only" value={course.averageRating} readOnly size="small" precision={0.1} />
                    </div>
                </div>

                <Select value={direction} onChange={(e) => setDirection(e.target.value)} sx={{ height: '36px' }}>
                    <MenuItem value={"desc"}>Mới nhất</MenuItem>
                    <MenuItem value={"asc"}>Cũ nhất</MenuItem>
                </Select>
            </div>

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

export default ChapterCourseRate;
