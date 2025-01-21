'use client'
import React, { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useInView } from "framer-motion";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Box } from '@mui/material';
import SingleBlogSlider from './single.blog.slider';
import SliderNavigation from './slider.navigation';
import BlogSliderMotion from './blog.slider.motion';

const BlogSlider = () => {
    const swiperRef = useRef<SwiperRef | null>(null);
    const h3Ref = useRef(null);
    const isInView = useInView(h3Ref, { margin: "-200px" });

    return (
        <Box
            sx={{
                marginTop: '100px',
                '.swiper': { width: '95%', maxWidth: '1200px', paddingTop: '40px', paddingBottom: '50px' },
                '.swiper-slide': { backgroundPosition: 'center', backgroundSize: 'cover', width: '800px', height: '350px' },
                '.swiper-pagination-bullet': { width: '18px', height: '6px', borderRadius: '20px', transition: 'all .3s', background: '#adb5bd' },
                '.swiper-pagination-bullet-active': { width: '25px', background: '#60a5fa' },
                position: 'relative'
            }}
        >
            <div className='relative flex items-center justify-center'>
                <BlogSliderMotion isInView={isInView} />
                <h3 ref={h3Ref} className='text-center font-bold uppercase text-2xl text-white'>
                    Bài viết nổi bật
                </h3>
            </div>

            <Swiper
                ref={swiperRef}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{ rotate: 30, stretch: 0, depth: 150, modifier: 1, slideShadows: false }}
                autoplay={{ delay: 3500, disableOnInteraction: true, waitForTransition: true }}
                pagination={{ clickable: true }}
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
