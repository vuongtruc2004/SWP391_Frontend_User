'use client'
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Pagination, Snackbar, SnackbarContent } from "@mui/material";
import { apiUrl, storageUrl } from "@/utils/url";
import StarIcon from '@mui/icons-material/Star';
import { sendRequest } from "@/utils/fetch.api";
import SingleCourseRating from "@/features/course/course-rating/single.course.rating";
import ListEmpty from "@/components/empty/list.empty";
import CreateCourseRating from "./create.course.rating";
import { useCourseRate } from "@/wrapper/course-rate/course.rate.wrapper";
import { useSession } from "next-auth/react";

const CourseRate = ({ course }: { course: CourseDetailsResponse }) => {
    const { setPage, setStarsFilter, page, starsFilter, rateList, totalPages } = useCourseRate();
    const [ratingCounts, setRatingCounts] = useState<Record<number, number>>({});
    const { data: session } = useSession();
    const [myRating, setMyRating] = useState<RateResponse | null>(null);
    const [myOrder, setMyOrder] = useState<OrderDetailsResponse | null>(null);

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
        const fetchData = async () => {
            if (!session?.accessToken) return;

            const response = await sendRequest<ApiResponse<RateResponse>>({
                url: `${apiUrl}/rates/my-rate/${course?.courseId}`,
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setMyRating(response.data);
            }
        };

        fetchData();
    }, [session?.accessToken, course, rateList]);

    useEffect(() => {
        const fetchData = async () => {

            if (!session?.accessToken || !course?.courseId) return;

            const response = await sendRequest<ApiResponse<OrderDetailsResponse>>({
                url: `${apiUrl}/orderDetails/order_purchased/${course?.courseId}`,
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                setMyOrder(response.data);
            }
        };

        fetchData();
    }, [session?.accessToken, course, rateList]);

    return (
        <>
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

            <div className="flex items-center gap-x-3 mb-5">
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

            {(myRating === null && myOrder !== null) && <CreateCourseRating course={course} />}

            {rateList.length ? (
                <>
                    {rateList.map((rate, index) => {
                        const avatarSrc = rate?.user?.avatar?.startsWith("http") ?
                            rate?.user?.avatar :
                            `${storageUrl}/avatar/${rate?.user?.avatar}`;
                        return (
                            <SingleCourseRating
                                key={rate.rateId + "_" + rate.user?.userId}
                                rate={rate}
                                index={index}
                                avatarSrc={avatarSrc}
                                setMyRating={setMyRating}
                            />
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

            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <SnackbarContent
                    message="Thêm đánh giá thành công!"
                    sx={{ backgroundColor: "#212529", color: "white", fontWeight: "bold" }}
                />
            </Snackbar>
        </>
    )
}

export default CourseRate