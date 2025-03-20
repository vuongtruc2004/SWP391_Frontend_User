'use client'
import { storageUrl } from "@/utils/url";
import Box from "@mui/material/Box";
import { keyframes } from '@emotion/react';
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import SingleCampaignSlider from "@/components/campaign/single.campaign.slider";
import SliderNavigation from "@/components/blog/blog-slider/slider.navigation";

const SubjectSlider = ({ subjectList, campaign }: { subjectList: SubjectResponse[], campaign: CampaignResponse[] }) => {

    const swiperRef = useRef<SwiperRef | null>(null);
    const [open, setOpen] = useState<boolean>(false)

    const itemWidth = 200;
    const itemHeight = 80;
    const animationTime = 65;
    const autoRun = keyframes`
                    to {
                        left: -${itemWidth}px;
                    }
                    `;

    useEffect(() => {
        const hasClosedDialog = sessionStorage.getItem("hasClosedDialog");

        if (!hasClosedDialog) {
            setOpen(true); // 🔹 Chỉ mở modal nếu chưa đóng trong session hiện tại
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        sessionStorage.setItem("hasClosedDialog", "true"); // 🔹 Chỉ lưu trong session hiện tại
    };

    return (
        <>
            <Box sx={{
                width: '100%',
                mask: 'linear-gradient(to right, transparent, #000 20% 80%, transparent)',
                overflow: 'hidden',
                marginTop: '6px',
                'div': {
                    display: 'flex',
                    alignItems: 'center',
                    width: `${subjectList.length * itemWidth}px`,
                    position: 'relative',
                    columnGap: '6px',
                    height: `${itemHeight}px`,
                    'a': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        columnGap: '15px',
                        textTransform: 'uppercase',
                        width: `${itemWidth}px`,
                        height: `${itemHeight}px`,
                        position: 'absolute',
                        top: 0,
                        left: '100%',
                        animation: `${autoRun} ${animationTime}s linear infinite`,
                    }
                },
                '&:hover div a': {
                    animationPlayState: 'paused !important'
                },
                position: 'absolute',
                left: 0,
                bottom: 0
            }}>
                <div>
                    {subjectList?.map((item, index) => {
                        return (
                            <Link
                                href={`/course?subjectIds=${item.subjectId}`}
                                key={item.subjectId}
                                style={{
                                    animationDelay: `${animationTime / subjectList.length * (subjectList.length - index - 1) * -1}s`
                                }}
                                className="text-gray-300 hover:text-blue-500"
                            >
                                <Image
                                    src={`${storageUrl}/subject/${item.thumbnail}`}
                                    alt={item.subjectName + " logo"}
                                    width={0}
                                    height={0}
                                    sizes="(max-width: 1000px) 100vw"
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: 'auto',
                                        height: '28px',
                                    }}
                                />
                                <p className={`transition-all duration-200 capitalize font-semibold`}>{item.subjectName}</p>
                            </Link>
                        )
                    })}
                </div>
            </Box>

            {campaign.length > 0 && (
                <Dialog open={open} onClose={handleClose}>
                    <div className="relative w-[500px] bg-[#010101a1] p-5 rounded-md">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 z-50 bg-blue-300 text-white rounded-full p-1 hover:bg-black transition-all duration-200"
                        >
                            <CloseIcon className="w-5 h-5" />
                        </button>

                        <div className="w-full">
                            <Swiper
                                ref={swiperRef}
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={1}
                                coverflowEffect={{ rotate: 30, stretch: 0, depth: 150, modifier: 1, slideShadows: false }}
                                autoplay={{ delay: 3500, disableOnInteraction: true, waitForTransition: true }}
                                pagination={{ clickable: true }}
                                modules={[EffectCoverflow, Pagination, Autoplay]}
                                loop={true}
                                className="w-full h-auto"
                            >
                                {campaign?.map((campaign) => (
                                    <SwiperSlide key={campaign.campaignId} className="w-full relative">
                                        <SingleCampaignSlider campaign={campaign} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <SliderNavigation swiperRef={swiperRef} />
                    </div>
                </Dialog>
            )}

        </>
    )
}

export default SubjectSlider