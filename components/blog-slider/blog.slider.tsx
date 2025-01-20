'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Box } from '@mui/material';
import SingleBlogSlider from './single.blog.slider';

const BlogSlider = () => {
    return (
        <Box sx={{
            marginTop: '100px',
            '.swiper': {
                width: '95%',
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
                transition: 'all .3s'
            },
            '.swiper-pagination-bullet-active': {
                width: '25px'
            }
        }}>
            <h3 className='text-center font-bold uppercase text-2xl text-blue-950'>Bài viết nổi bật</h3>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: false
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination]}
                loop={true}
            >
                {Array.from({ length: 10 }).map((_, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <SingleBlogSlider />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    )
}

export default BlogSlider;
