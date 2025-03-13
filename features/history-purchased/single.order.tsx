import { AccordionDetails, Button, Divider } from "@mui/material"
import { Accordion, AccordionSummary } from "./style"
import { formatPrice } from "@/helper/course.list.helper"
import Link from "next/link"
import { slugifyText } from "@/helper/blog.helper"
import { storageUrl } from "@/utils/url"
import Image from "next/image"
import { Fragment } from "react"

const SingleOrder = ({ order }: { order: OrderResponse }) => {
    return (
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
                                <li className="flex items-center gap-x-3 p-5">
                                    <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} style={{
                                        display: 'block',
                                        width: '220px',
                                        height: `100px`,
                                        position: 'relative',
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
                                        <p className="text-gray-300">{course.description}</p>

                                        <div className="flex items-center gap-x-3 mt-2">
                                            <Button variant="contained" color="primary">
                                                ok
                                            </Button>

                                            <Button variant="outlined" color="secondary">
                                                ok
                                            </Button>

                                            <Button variant="outlined" color="secondary">
                                                ok
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                                {index < order.orderDetails.length - 1 && (
                                    <Divider sx={{ marginBlock: '10px' }} />
                                )}
                            </Fragment>

                        )
                    })}
                </ul>
            </AccordionDetails>
        </Accordion >
    )
}

export default SingleOrder