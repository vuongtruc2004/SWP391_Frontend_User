'use client'
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Fragment, useEffect, useState } from "react";
import { Avatar, Divider, Pagination, Popover, Rating } from "@mui/material";
import { apiUrl, storageUrl } from "@/utils/url";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagIcon from '@mui/icons-material/Flag';
import StarIcon from '@mui/icons-material/Star';
import { formatCreateDate } from "@/helper/blog.helper";
import { sendRequest } from "@/utils/fetch.api";

const CourseRate = ({ course }: { course: CourseDetailsResponse }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [rateList, setRateList] = useState<RateResponse[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [starsFilter, setStarsFilter] = useState<number>(0);
    const [ratingCounts, setRatingCounts] = useState<Record<number, number>>({});

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

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
                    size: 3,
                    courseId: course.courseId,
                    sort: 'stars,desc',
                    filter: starsFilter !== 0 ? `stars : ${starsFilter}` : ""
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
            <h1 className="text-xl font-semibold flex items-center gap-x-1">IV. Đánh giá về khóa học</h1>
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

            {rateList.map((rate, index) => {
                const avatarSrc = rate?.user?.avatar?.startsWith("http") ?
                    rate?.user?.avatar :
                    `${storageUrl}/avatar/${rate?.user?.avatar}`;

                return (
                    <Fragment key={rate.rateId + "_" + rate.user.userId}>
                        <div className={index === 0 ? "pb-5" : "py-5"}>
                            <div className="flex items-center gap-x-3 justify-between pr-3">
                                <div className="flex items-center gap-x-3">
                                    <Avatar alt="user avatar" src={avatarSrc} sx={{
                                        width: '40px',
                                        height: '40px'
                                    }}>
                                        {rate?.user?.fullname.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold line-clamp-1 text-sm">{rate?.user?.fullname}</p>
                                        <p className="text-sm text-gray-300">{formatCreateDate(rate.updatedAt)}</p>
                                    </div>
                                </div>

                                <IconButton onClick={handleOpenPopover}>
                                    <MoreVertIcon />
                                </IconButton>

                                <Popover
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={() => setAnchorEl(null)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <Button startIcon={<FlagIcon />} color="secondary" variant="text">
                                        Báo Cáo
                                    </Button>
                                </Popover>

                            </div>
                            <p className="text-gray-100 mt-3 line-clamp-3">{rate.content}</p>
                            <p className="flex items-center gap-x-1 mt-1 ml-1 text-sm text-gray-300">Đã đánh giá<Rating name="read-only" value={rate.stars} readOnly size="small" /></p>
                        </div>
                        <Divider />
                    </Fragment>
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
        </div>
    )
}

export default CourseRate