'use client'
import Box from "@mui/material/Box";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SwiperRef } from 'swiper/react';

const SliderNavigation = ({ swiperRef }: { swiperRef: React.RefObject<SwiperRef | null> }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1280px',
            position: 'absolute',
            zIndex: 1,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            'span': {
                color: '#60a5fa',
                cursor: 'pointer',
                '&:hover': {
                    color: '#0353a4'
                }
            }
        }}>
            <span onClick={() => swiperRef.current?.swiper.slidePrev()}>
                <ChevronLeftIcon sx={{ fontSize: '2.5rem' }} />
            </span>
            <span onClick={() => swiperRef.current?.swiper.slideNext()}>
                <ChevronRightIcon sx={{ fontSize: '2.5rem' }} />
            </span>
        </Box>
    )
}

export default SliderNavigation