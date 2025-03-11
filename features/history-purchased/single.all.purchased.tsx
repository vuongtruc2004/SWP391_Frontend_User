'use client'
import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Button, Divider, Tooltip, Typography } from '@mui/material';
import { storageUrl } from '@/utils/url';
import Image from 'next/image';
import HandleShare from './handle.share';
import { slugifyText } from '@/helper/blog.helper';
import MyCourseRating from './my.rating';


const SingleAllPurchased = (props: { course: CourseDetailsResponse }) => {

    const textRef = useRef<HTMLParagraphElement | null>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { course } = props;
    const [showDetails, setShowDetails] = useState(false);
    const [openShare, setOpenShare] = React.useState(false);
    const [openRating, setOpenRating] = React.useState(false);
    const [currentCourse, setCurrentCourse] = useState<OrderDetailsResponse>()

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
            const maxHeight = lineHeight * 2;
            setIsOverflowing(textRef.current.scrollHeight > maxHeight);
        }
    }, [textRef.current]);

    const formatVND = (number: number) => {
        return new Intl.NumberFormat("vi-VN").format(number);
    };

    const openShareModal = (currentCourse: OrderDetailsResponse) => {
        setOpenShare(true);
        setCurrentCourse(currentCourse);
    }

    const openMyCourseRatingModal = (currentCourse: OrderDetailsResponse) => {
        setOpenRating(true);
        setCurrentCourse(currentCourse);
    }
    const closeShareModal = () => setOpenShare(false);
    const closeRatingModal = () => setOpenRating(false);

    return (
        <Box>
            <div className='gap-7 p-7 bg-[#000814] rounded-[20px] mb-5'>
                <div className='flex justify-start gap-7 align-middle'>
                    <div className='w-[200px] h-[200px]'>
                        {course.orderStatus === "COMPLETED"
                            ? <Image src={`/check_mark.webp`} alt="Ảnh thành công" width={150} height={150} className='ml-[17px]' />
                            : course.orderStatus === "PENDING"
                                ? <Image src={`/pending.webp`} alt="Ảnh đang chờ" width={180} height={180} />
                                : course.orderStatus === "CANCELLED"
                                    ? <Image src={`/cancelled.webp`} alt="Ảnh đã hủy" width={150} height={150} className='ml-[17px]' />
                                    : "Ảnh không xác định"}

                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='flex gap-7'>
                            <div className=''>
                                <p className='text-blue-400'>Trạng thái mua hàng</p>
                                {course.orderStatus === "COMPLETED"
                                    ? "Thành công"
                                    : course.orderStatus === "PENDING"
                                        ? "Đang chờ thanh toán"
                                        : course.orderStatus === "CANCELLED"
                                            ? "Đã hủy"
                                            : "Trạng thái không xác định"}
                            </div>
                            <div>
                                <p className='text-blue-400'>Ngày mua hàng</p>
                                <p>{course.createdAt}</p>
                            </div>
                            <div>
                                <p className='text-blue-400'>Tổng số tiền</p>
                                <div className='flex'>
                                    <p>{formatVND(course.totalAmount)}</p>
                                    <span style={{ fontSize: "16px", verticalAlign: "super", marginLeft: '5px' }} className='text-blue-300'>₫</span>
                                </div>

                            </div>
                        </div>
                        <Divider sx={{ bgcolor: "white", marginTop: '20px' }} />
                        <Button
                            className='!mt-5'
                            variant="contained"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? "Ẩn chi tiết hóa đơn" : "Chi tiết hóa đơn"}
                        </Button>
                    </div>

                </div>

                {showDetails && course.orderDetails.map((detail, index: number) => (
                    <div key={index} className='mb-5 ml-[80px] bg-[#021127] rounded-[20px] p-5'>
                        <Grid container spacing={2} alignItems="center">
                            <Grid size={3}>
                                <Link href={`/course/${slugifyText(detail?.course?.courseName + "-" + detail?.courseId)}`}>
                                    <img
                                        src={`${storageUrl}/course/${detail.course?.thumbnail}`}
                                        alt={detail.course?.courseName}
                                        width={150}
                                        height={180}
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '6px',
                                            objectPosition: 'center',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Link>
                            </Grid>

                            <Grid size={6}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    {detail.course?.courseName}
                                </Typography>

                                <Typography
                                    ref={textRef}
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: expanded ? "unset" : 2,
                                    }}
                                >
                                    <span className='font-bold'>Mô tả:</span> {detail.course?.description}
                                </Typography>

                                {isOverflowing && (
                                    <Button onClick={() => setExpanded(!expanded)} size="small">
                                        {expanded ? "Thu gọn" : "Xem thêm"}
                                    </Button>
                                )}
                            </Grid>

                            <Grid size={3}>
                                <Typography variant="body2" color="text.secondary" className='text-center'>
                                    <span>Giá gốc: </span>
                                    <span className='text-blue-300'>{formatVND(detail.course?.price)}</span>
                                    <span style={{ fontSize: "16px", verticalAlign: "super", marginLeft: '5px' }} className='text-blue-300'>₫</span>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ bgcolor: "white", marginTop: '50px' }} />
                        <Grid container spacing={2} alignItems="center">
                            <Grid size={12}>
                                <div className='mt-5 flex justify-between gap-5'>
                                    <Typography variant="body2" color="text.secondary" className='text-end flex items-center'>
                                        <span className='text-sx text-white font-semibold'>Trạng thái: </span>
                                        <span className="text-sx text-blue-300 ml-2 mr-2">
                                            {course.orderStatus === "COMPLETED"
                                                ? "Mua hàng thành công"
                                                : course.orderStatus === "PENDING"
                                                    ? "Đang chờ thanh toán"
                                                    : course.orderStatus === "CANCELLED"
                                                        ? "Đã hủy"
                                                        : "Trạng thái không xác định"}
                                        </span>
                                        <span className='text-blue-300'>
                                            <Tooltip title={<div>Cập nhật mới nhất <br /> 2025-03-02 22:39:59</div>}>
                                                <HelpOutlineIcon />
                                            </Tooltip>
                                        </span>
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" className='text-end flex items-center'>
                                        <span className='text-sx text-white font-semibold'>Thành tiền: </span>
                                        <span className='text-2xl text-blue-300 ml-2'>{formatVND(detail.course?.price)}</span>
                                        <span
                                            style={{ fontSize: "22px", verticalAlign: "middle", marginLeft: '5px' }}
                                            className='text-blue-300'
                                        >
                                            ₫
                                        </span>
                                    </Typography>
                                </div>


                            </Grid>
                            <Grid size={12}>
                                <div className='flex gap-5 justify-end mt-5'>
                                    <Button onClick={() => openShareModal(detail)} variant="contained" >Chia sẻ khóa học</Button>
                                    <Button onClick={() => openMyCourseRatingModal(detail)} variant="outlined">Xem đánh giá khóa học</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                ))}
            </div>

            <HandleShare
                open={openShare}
                closeShareModal={closeShareModal}
                //@ts-ignore
                currentCourse={currentCourse}
            />

            <MyCourseRating
                open={openRating}
                closeRatingModal={closeRatingModal}
                //@ts-ignore
                currentCourse={currentCourse}
            />

        </Box >
    )
}

export default SingleAllPurchased