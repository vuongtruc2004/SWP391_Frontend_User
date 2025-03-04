import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { Box, Button, Skeleton } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react";
import SingleCourseSuggest from "./single.course.suggest";
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSession } from "next-auth/react";
import 'swiper/css';
import { useCart } from "@/wrapper/course-cart/course.cart.wrapper";

const SuggestCourse = () => {
    const { cart, change } = useCart();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState<CourseDetailsResponse[]>([]);

    const sliderRef = useRef<SwiperRef>(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    useEffect(() => {
        const fetchSuggestCourses = async () => {
            setLoading(true);
            const courseIds = cart.map(item => item.courseId);
            let coursesResponse: ApiResponse<CourseDetailsResponse[]>;

            if (status === "authenticated") {
                coursesResponse = await sendRequest<ApiResponse<CourseDetailsResponse[]>>({
                    url: `${apiUrl}/courses/suggestion`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    },
                    queryParams: {
                        courseIds: courseIds.join(',')
                    }
                });
            } else {
                coursesResponse = await sendRequest<ApiResponse<CourseDetailsResponse[]>>({
                    url: `${apiUrl}/courses/suggestion`,
                    queryParams: {
                        courseIds: courseIds.join(',')
                    }
                });
            }

            if (coursesResponse.status === 200 && coursesResponse.data.length) {
                console.log(coursesResponse.data);
                setCourses(coursesResponse.data);
            }
            setLoading(false);
        }
        fetchSuggestCourses();
    }, [change, session]);

    if (loading) {
        return (
            <Box sx={{
                width: '100%',
                maxWidth: '1200px',
                marginTop: '20px',
            }}>
                <Skeleton variant="text" sx={{ fontSize: '1.25rem', marginBottom: '20px' }} width={100} />
                <div className="grid grid-cols-5 gap-x-3">
                    {Array.from({ length: 5 }).map((_, index) => {
                        return (
                            <Skeleton key={index} animation="wave" variant="rounded" width={"100%"} height={180} />
                        )
                    })}
                </div>
            </Box>
        )
    }

    return (
        <>
            {courses.length !== 0 && (
                <Box sx={{
                    bgcolor: 'black',
                    width: '100%',
                    maxWidth: '1200px',
                    borderRadius: '6px',
                    padding: '20px',
                    boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                    marginTop: '20px',
                    position: 'relative',
                    '.mui-1yv1d02-MuiButtonBase-root-MuiButton-root': {
                        boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                        borderRadius: '50%',
                        minWidth: '40px',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: '8',
                    }
                }}>
                    <h1 className="text-lg font-semibold mb-5">Có thể bạn cũng thích</h1>
                    <Swiper
                        ref={sliderRef}
                        slidesPerView={5}
                        spaceBetween={15}
                        grabCursor={true}
                        modules={[Navigation]}
                    >
                        {courses.map(course => {
                            return (
                                <SwiperSlide key={course.courseId}>
                                    <SingleCourseSuggest course={course} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <Button onClick={handlePrev} variant="contained" color="primary" className="left-0">
                        <ChevronLeftIcon />
                    </Button>
                    <Button onClick={handleNext} variant="contained" color="primary" className="right-0">
                        <ChevronRightIcon />
                    </Button>
                </Box>
            )}
        </>
    )
}

export default SuggestCourse