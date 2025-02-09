'use client'
import { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import Box from "@mui/material/Box";
import SingleBlogSlider from './single.blog.slider';
import SliderNavigation from './slider.navigation';

const BlogSlider = ({ blogList }: { blogList: BlogResponse[]; }) => {
    const swiperRef = useRef<SwiperRef | null>(null);

    return (
        <Box
            sx={{
                marginTop: '40px',
                '.swiper': { width: '95%', maxWidth: '1200px', paddingTop: '40px', paddingBottom: '50px' },
                '.swiper-slide': {
                    width: 'max-content',
                    borderRadius: '6px'
                },
                '.swiper-pagination-bullet': { width: '18px', height: '6px', borderRadius: '20px', transition: 'all .3s', background: '#adb5bd' },
                '.swiper-pagination-bullet-active': { width: '25px', background: '#60a5fa' },
                position: 'relative'
            }}
        >
            <div className='relative flex items-center justify-center'>
                <h1 className='text-center font-bold uppercase text-2xl text-white'>
                    Bài viết mới nhất
                </h1>
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
                {blogList?.map((blog) => (
                    <SwiperSlide key={blog.blogId}>
                        <SingleBlogSlider blog={blog} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderNavigation swiperRef={swiperRef} />
        </Box>
    );
};

export default BlogSlider;
