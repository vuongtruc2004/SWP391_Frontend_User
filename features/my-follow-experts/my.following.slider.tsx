'use client'
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import Image from 'next/image';
import { useCallback, useRef } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { storageUrl } from '@/utils/url';
import Link from 'next/link';

const MyFollowingSlider = ({ followingExperts }: { followingExperts: ExpertDetailsResponse[] }) => {
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
            <h1 className='text-center font-bold uppercase text-xl text-white mb-10'>Danh sách chuyên gia đang theo dõi</h1>
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
                <div className="w-[90%] mx-auto flex justify-center">
                    <Swiper
                        ref={sliderRef}
                        slidesPerView={'auto'}
                        spaceBetween={20}
                        grabCursor={true}
                        modules={[Navigation]}
                    >
                        {followingExperts.map((expert, index) => (
                            <SwiperSlide key={index}>
                                <Tooltip
                                    title={
                                        <div>
                                            <Typography variant="body1" color="inherit">
                                                {expert.user.fullname}
                                            </Typography>
                                            <Typography variant="inherit" color="inherit">
                                                {expert.user.email}
                                                <span className="ml-2 mr-2">•</span>
                                                {expert.totalFollowers ?? 0} người theo dõi
                                            </Typography>
                                            <Typography variant="inherit" color="inherit">
                                                {expert.achievement}
                                            </Typography>
                                        </div>
                                    }
                                    arrow
                                >
                                    <Link href={`/course?page=1&expertIds=${expert.expertId}`} className="block relative w-[70px] h-[70px]">
                                        <Image
                                            className="rounded-full object-cover"
                                            src={`${storageUrl}/avatar/${expert.user.avatar}`}
                                            alt="Your expert's image"
                                            fill
                                        />
                                    </Link>
                                </Tooltip>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <Button onClick={handlePrev} variant="contained" color="primary" className="left-0">
                    <ChevronLeftIcon />
                </Button>
                <Button onClick={handleNext} variant="contained" color="primary" className="right-0">
                    <ChevronRightIcon />
                </Button>
            </Box >
        </>
    )
}

export default MyFollowingSlider