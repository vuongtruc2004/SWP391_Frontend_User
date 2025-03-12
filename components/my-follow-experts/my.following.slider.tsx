'use client'
import { Box, Button } from '@mui/material';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useSession } from 'next-auth/react';
import { storageUrl } from '@/utils/url';
import Image from 'next/image';
import { useCallback, useRef } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import 'swiper/css/pagination';

const MyFollowing = ({ searchParams, keyword, page }: { searchParams: any, keyword: string, page: string | number }) => {
    const { data: session } = useSession();
    const sliderRef = useRef<SwiperRef>(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <>
            <div className='relative flex items-center justify-center mt-5'>
                <h1 className='text-center font-bold uppercase text-2xl text-white'>
                    Bài viết mới nhất
                </h1>
            </div>
            <Box sx={{
                '.swiper-slide': {
                    width: 'max-content'
                },
                position: 'relative',
                '.mui-11ky3cr-MuiButtonBase-root-MuiButton-root': {
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
                <Swiper
                    ref={sliderRef}
                    slidesPerView={'auto'}
                    spaceBetween={20}
                    grabCursor={true}
                    modules={[Navigation]}
                >
                    {[...Array(20)].map((_, index) => (
                        <SwiperSlide key={index}>
                            <div className='relative w-[70px] h-[70px]'>
                                <Image className='rounded-full object-cover'
                                    src={`${storageUrl}/avatar/${session?.user.avatar}`}
                                    alt=""
                                    fill
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Button onClick={handlePrev} variant="contained" color="primary" className="left-0">
                    <ChevronLeftIcon />
                </Button>
                <Button onClick={handleNext} variant="contained" color="primary" className="right-0">
                    <ChevronRightIcon />
                </Button>
            </Box>
        </>
    )
}

export default MyFollowing