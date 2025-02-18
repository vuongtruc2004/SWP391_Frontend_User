import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useCartContext } from "@/wrapper/course-cart/course.cart.wrapper"
import { Box, Button, IconButton, Skeleton } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import SingleCourseSuggest from "./single.course.suggest";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import 'swiper/css';

const SuggestCourse = () => {
    const { cart } = useCartContext();
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState<CourseDetailsResponse[]>([]);
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    useEffect(() => {
        const fetchSuggestCourses = async () => {
            setLoading(true);
            const courseIds = cart.map(item => item.courseId);
            const coursesResponse = await sendRequest<ApiResponse<CourseDetailsResponse[]>>({
                url: `${apiUrl}/courses/suggestion`,
                queryParams: {
                    courseIds: courseIds.join(',')
                }
            });
            if (coursesResponse.status === 200) {
                setCourses(coursesResponse.data);
            }
            setLoading(false);
        }
        fetchSuggestCourses();
    }, [cart]);

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
            },
            '.swiper-button-disabled': {
                opacity: 0.3,
                pointerEvents: 'none',
            }
        }}>
            <h1 className="text-lg font-semibold mb-5">Có thể bạn cũng thích</h1>
            <Swiper
                slidesPerView={5}
                spaceBetween={15}
                grabCursor={true}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                    //@ts-ignore
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    //@ts-ignore
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
            >
                {courses.map(course => {
                    return (
                        <SwiperSlide key={course.courseId}>
                            <SingleCourseSuggest course={course} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <Button ref={navigationPrevRef} variant="contained" color="primary" className="left-0">
                <ChevronLeftIcon />
            </Button>
            <Button ref={navigationNextRef} variant="contained" color="primary" className="right-0">
                <ChevronRightIcon />
            </Button>
        </Box>
    )
}

export default SuggestCourse