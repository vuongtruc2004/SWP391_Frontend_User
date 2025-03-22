import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { Box, Skeleton } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import SingleCourseSuggest from "./single.course.suggest";
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import { useSession } from "next-auth/react";
import { useCart } from "@/wrapper/course-cart/course.cart.wrapper";
import SliderNavigation from "@/components/blog/blog-slider/slider.navigation";
import 'swiper/css';
import 'swiper/css/pagination';

const SuggestCourse = () => {
    const { cart } = useCart();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState<CourseResponse[]>([]);

    const swiperRef = useRef<SwiperRef>(null);

    useEffect(() => {
        const fetchSuggestCourses = async () => {
            setLoading(true);
            const courseIds = cart.map(item => item.courseId);
            let coursesResponse: ApiResponse<CourseResponse[]>;

            if (status === "authenticated") {
                coursesResponse = await sendRequest<ApiResponse<CourseResponse[]>>({
                    url: `${apiUrl}/courses/suggestion`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    },
                    queryParams: {
                        courseIds: courseIds.join(',')
                    }
                });
            } else {
                coursesResponse = await sendRequest<ApiResponse<CourseResponse[]>>({
                    url: `${apiUrl}/courses/suggestion`,
                    queryParams: {
                        courseIds: courseIds.join(',')
                    }
                });
            }

            if (coursesResponse.status === 200 && coursesResponse.data.length) {
                setCourses(coursesResponse.data);
            }
            setLoading(false);
        }
        fetchSuggestCourses();
    }, [cart, session]);

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

    if (!courses.length) {
        return null;
    }

    return (
        <Box sx={{
            bgcolor: 'black',
            width: '100%',
            maxWidth: '1200px',
            borderRadius: '6px',
            padding: '20px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            marginTop: '20px',
            position: 'relative',
            '.swiper': { width: '95%', maxWidth: '1200px', paddingBottom: '50px' },
            '.swiper-pagination-bullet': { width: '18px', height: '6px', borderRadius: '20px', transition: 'all .3s', background: '#adb5bd' },
            '.swiper-pagination-bullet-active': { width: '25px', background: '#60a5fa' },
        }}>
            <h1 className="text-lg font-semibold mb-5">Có thể bạn cũng thích</h1>

            <Swiper
                ref={swiperRef}
                slidesPerView={5}
                spaceBetween={15}
                grabCursor={true}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                loop={true}
            >
                {courses.map(course => {
                    return (
                        <SwiperSlide key={course.courseId}>
                            <SingleCourseSuggest course={course} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <SliderNavigation swiperRef={swiperRef} />
        </Box>
    )
}

export default SuggestCourse