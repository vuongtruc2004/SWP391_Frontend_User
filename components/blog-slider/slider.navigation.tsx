'use client'
import { Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react'
import { SwiperRef } from 'swiper/react';

interface IProps {
    swiperRef: React.RefObject<SwiperRef | null>;
}
const SliderNavigation = (props: IProps) => {
    const { swiperRef } = props;

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1280px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '3',
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