import { AccordionDetails, Button, Divider, Typography } from "@mui/material"
import { Accordion, AccordionSummary } from "./style"
import { formatPrice } from "@/helper/course.list.helper"
import Link from "next/link"
import { slugifyText } from "@/helper/blog.helper"
import { storageUrl } from "@/utils/url"
import Image from "next/image"
import React, { Fragment, useEffect, useRef, useState } from "react"
import HandleShare from "./handle.share"
import MyCourseRating from "./my.rating"

const SingleOrder = ({ order }: { order: OrderResponse }) => {

    const textRef = useRef<HTMLParagraphElement | null>(null);
    const [openShare, setOpenShare] = React.useState(false);
    const [openRating, setOpenRating] = React.useState(false);
    const [currentCourse, setCurrentCourse] = useState<OrderDetailsResponse>()
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
            const maxHeight = lineHeight * 2;
            setIsOverflowing(textRef.current.scrollHeight > maxHeight);
        }
    }, [textRef.current]);

    const toggleExpand = (id: number) => {
        setExpandedMap(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
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
        <>
            <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
                <AccordionSummary>
                    <ul className="flex items-center justify-between w-full rounded-tl-md rounded-tr-md">
                        <li className="flex flex-col gap-y-1.5 items-start w-[230px] shrink-0">
                            <p className="text-gray-400 font-semibold">Mã hóa đơn</p>
                            <p className="text-white">{order.orderCode}</p>
                        </li>
                        <li className="flex flex-col gap-y-1.5 items-start">
                            <p className="text-gray-400 font-semibold">Ngày tạo đơn</p>
                            <p className="text-white">{order.createdAt}</p>
                        </li>
                        <li className="flex flex-col gap-y-1.5 items-start">
                            <p className="text-gray-400 font-semibold">Tổng tiền</p>
                            <p className="text-white">{formatPrice(order.totalAmount)}₫</p>
                        </li>
                        <li className="flex flex-col gap-y-1.5 items-start">
                            <p className="text-gray-400 font-semibold">Trạng thái</p>
                            {order.orderStatus === 'COMPLETED' ? (
                                <p className="text-green-500">Đã thanh toán</p>
                            ) : (order.orderStatus === 'PENDING') ? (
                                <p className="text-orange-500">Đang chờ thanh toán</p>
                            ) : (order.orderStatus === 'CANCELLED') ? (
                                <p className="text-red-500">Đã hủy</p>
                            ) : (
                                <p className="text-red-500">Đã quá hạn</p>
                            )}
                        </li>
                    </ul>
                </AccordionSummary>

                <AccordionDetails sx={{ padding: 0 }}>
                    <ul>
                        {order.orderDetails && order.orderDetails.map((orderDetails, index) => {
                            const course = orderDetails.course;
                            return (
                                <Fragment key={orderDetails.orderDetailsId} >
                                    <li className="flex items-center gap-x-10 p-5 pl-10">
                                        <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} style={{
                                            display: 'block',
                                            width: '220px',
                                            height: `125px`,
                                            position: 'relative',
                                            flexShrink: 0
                                        }}>
                                            <Image src={`${storageUrl}/course/${course.thumbnail}`} alt="course image" fill sizes="(max-width: 1000px) 100vw" priority={true} style={{
                                                objectFit: 'cover',
                                                borderRadius: '6px',
                                                objectPosition: 'center',
                                                cursor: 'pointer'
                                            }} />
                                        </Link>

                                        <div>
                                            <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} className="transition-all duration-150 font-semibold line-clamp-1 hover:underline hover:text-blue-500 mt-2">{course.courseName}</Link>
                                            <Typography
                                                ref={textRef}
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    overflow: "hidden",
                                                    display: "-webkit-box",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: expandedMap[orderDetails.orderDetailsId] ? "unset" : 2,
                                                }}
                                            >
                                                <span className="text-gray-300 text-justify">
                                                    {course.description}
                                                </span>
                                            </Typography>

                                            {isOverflowing && (
                                                <Button onClick={() => toggleExpand(orderDetails.orderDetailsId)} size="small">
                                                    {expandedMap[orderDetails.orderDetailsId] ? "Thu gọn" : "Xem thêm"}
                                                </Button>
                                            )}


                                            <p className="text-gray-300"><span className="font-bold">Giá: </span>{formatPrice(orderDetails?.course.price)}₫</p>
                                            <div className="flex items-center gap-x-5 mt-2">
                                                <Button
                                                    onClick={() => openShareModal(orderDetails)}
                                                    variant="contained"
                                                >
                                                    Chia sẻ khóa học
                                                </Button>

                                                <Button
                                                    onClick={() => openMyCourseRatingModal(orderDetails)}
                                                    variant="outlined">
                                                    Đánh giá khóa học của tôi
                                                </Button>

                                            </div>
                                        </div>



                                    </li>

                                    {
                                        index < order.orderDetails.length - 1 && (
                                            <Divider sx={{ marginBlock: '10px' }} />
                                        )
                                    }
                                </Fragment>

                            )
                        })}
                    </ul>
                </AccordionDetails>
            </Accordion >

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

        </>

    )

}

export default SingleOrder