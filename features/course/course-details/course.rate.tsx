'use client'
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { apiUrl, storageUrl } from "@/utils/url";
import StarIcon from '@mui/icons-material/Star';
import { sendRequest } from "@/utils/fetch.api";
import SingleCourseRating from "@/components/course/course-details/single.course.rating";
import ListEmpty from "@/components/empty/list.empty";

const CourseRate = ({ course }: { course: CourseDetailsResponse }) => {
    const [rateList, setRateList] = useState<RateResponse[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [starsFilter, setStarsFilter] = useState<number>(0);
    const [ratingCounts, setRatingCounts] = useState<Record<number, number>>({});

    const handleStarsFilter = (stars: number) => {
        setStarsFilter(stars);
        setPage(1);
    }

    useEffect(() => {
        const fetchRatingCounts = async () => {
            const ratingCountsResponse = await sendRequest<ApiResponse<Record<number, number>>>({
                url: `${apiUrl}/rates/levels`,
                queryParams: {
                    courseId: course.courseId
                }
            });
            if (ratingCountsResponse.status === 200) {
                setRatingCounts(ratingCountsResponse.data);
            }
        }
        fetchRatingCounts();
    }, []);

    useEffect(() => {
        const fetchRatePage = async () => {
            const ratePageResponse = await sendRequest<ApiResponse<PageDetailsResponse<RateResponse[]>>>({
                url: `${apiUrl}/rates`,
                queryParams: {
                    page: page,
                    size: 5,
                    sort: 'stars,desc',
                    filter: `${starsFilter !== 0 ? `stars : ${starsFilter} and ` : ""}course.courseId : ${course.courseId}`
                }
            });

            if (ratePageResponse.status === 200) {
                setRateList(ratePageResponse.data.content);
                setPage(ratePageResponse.data.currentPage);
                setTotalPages(ratePageResponse.data.totalPages);
            }
        }
        fetchRatePage();
    }, [page, starsFilter]);

    return (
        <div className="p-5">
            <h1 className="text-xl font-semibold flex items-center gap-x-1">Đánh giá về khóa học</h1>
            <div className="text-gray-300 mb-2 mt-1 text-sm flex items-center gap-x-1">
                <strong className="text-white flex items-center gap-x-1">
                    <StarIcon sx={{ fontSize: '1.2rem', color: '#faaf00' }} />
                    {course.averageRating.toFixed(1)}
                </strong>
                <span>xếp hạng khóa học •</span>
                <strong className="text-white">
                    {course.totalRating}
                </strong>
                <span>đánh giá</span>
            </div>

            <div className="flex items-center gap-x-3 mb-4">
                <Button variant="contained" color='info' onClick={() => handleStarsFilter(0)}>Tất cả</Button>
                {Array.from({ length: 5 }).map((_, index) => {
                    const star = 5 - index;
                    const count = ratingCounts[star] || 0;
                    return (
                        <Button
                            variant="outlined"
                            color={starsFilter === star ? "primary" : "secondary"}
                            key={star}
                            onClick={() => handleStarsFilter(star)}
                        >
                            {star} sao ({count})
                        </Button>
                    );
                })}
            </div>

            {rateList.length ? (
                <>
                    {rateList.map((rate, index) => {
                        const avatarSrc = rate?.user?.avatar?.startsWith("http") ?
                            rate?.user?.avatar :
                            `${storageUrl}/avatar/${rate?.user?.avatar}`;
                        return (
                            <SingleCourseRating key={rate.rateId + "_" + rate.user.userId} rate={rate} index={index} avatarSrc={avatarSrc} />
                        )
                    })}
                    <Pagination
                        count={totalPages}
                        page={page}
                        shape="rounded"
                        showFirstButton
                        showLastButton
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '20px',
                        }}
                        onChange={(event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
                    />
                </>
            ) : (
                <ListEmpty text="Không có đánh giá" />
            )}
        </div>
    )
}

export default CourseRate