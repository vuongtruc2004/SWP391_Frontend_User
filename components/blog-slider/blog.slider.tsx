'use client'
import React, { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Box } from '@mui/material';
import SingleBlogSlider from './single.blog.slider';
import SliderNavigation from './slider.navigation';

const BlogSlider = () => {
    // Tạo ref cho Swiper
    const swiperRef = useRef<SwiperRef | null>(null);

    return (
        <Box
            sx={{
                marginTop: '100px',
                '.swiper': {
                    width: '95%',
                    maxWidth: '1200px',
                    paddingTop: '40px',
                    paddingBottom: '50px',
                },
                '.swiper-slide': {
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    width: '800px',
                    height: '350px',
                },
                '.swiper-pagination-bullet': {
                    width: '18px',
                    height: '6px',
                    borderRadius: '20px',
                    transition: 'all .3s',
                },
                '.swiper-pagination-bullet-active': {
                    width: '25px',
                },
                position: 'relative'
            }}
        >
            <h3 className='text-center font-bold uppercase text-2xl text-blue-950'>Bài viết nổi bật</h3>
            <Swiper
                ref={swiperRef}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: true
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: true,
                    waitForTransition: true
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                loop={true}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <SingleBlogSlider />
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderNavigation swiperRef={swiperRef} />
        </Box>
    );
};

export default BlogSlider;
