import { AccordionDetails, Button, Divider } from "@mui/material"
import { Accordion, AccordionSummary } from "./style"
import { formatPrice } from "@/helper/course.list.helper"
import Link from "next/link"
import { formatDate, formatDateTime, slugifyText } from "@/helper/blog.helper"
import { storageUrl } from "@/utils/url"
import Image from "next/image"
import { Fragment, useState } from "react"
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ShareCourseDialog from "./share.course.dialog";
import DoneAllIcon from '@mui/icons-material/DoneAll';

const SingleOrder = ({ order }: { order: OrderResponse }) => {
    const [openShare, setOpenShare] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<CourseResponse | null>(null);

    const openShareModal = (currentCourse: CourseResponse) => {
        setOpenShare(true);
        setCurrentCourse(currentCourse);
    }

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
                            <p className="text-white">{formatDateTime(order.createdAt)}</p>
                        </li>

                        <li className="flex flex-col gap-y-1.5 items-start">
                            <p className="text-gray-400 font-semibold">Tổng tiền</p>
                            <p className="text-white">{formatPrice(order.totalAmount)}₫</p>
                        </li>
                    </ul>
                </AccordionSummary>

                <AccordionDetails sx={{ padding: 0 }}>
                    <div className="flex items-center justify-center py-5 px-10">
                        <div className="border rounded-md border-green-500 py-2 px-4 flex items-center justify-between flex-1">
                            <p>Bạn đã thanh toán hóa đơn này lúc: {formatDateTime(order.updatedAt)}</p>
                            <DoneAllIcon sx={{ fontSize: '1.2rem' }} className="text-green-500" />
                        </div>
                    </div>

                    <ul>
                        {order.orderDetails && order.orderDetails.map((orderDetails, index) => {
                            const course = orderDetails.course;
                            return (
                                <Fragment key={orderDetails.orderDetailsId} >
                                    <li className="flex items-center gap-x-10 py-5 px-10">
                                        <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} style={{
                                            display: 'block',
                                            width: '250px',
                                            height: `150px`,
                                            position: 'relative',
                                            flexShrink: 0,
                                            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                                            borderRadius: '6px'
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

                                            <p className="text-gray-300 mb-2 line-clamp-2">{course.description}</p>

                                            <div className="flex items-center gap-x-2">
                                                <p className="flex items-center gap-x-1.5">
                                                    <SchoolOutlinedIcon className="text-gray-400" sx={{ fontSize: '1.25rem' }} />
                                                    <span className="text-gray-300 text-nowrap">Giảng viên:</span>
                                                </p>
                                                <p className="text-green-500 line-clamp-1">{course.expert.user.fullname}</p>
                                            </div>

                                            <div className='flex items-center gap-x-2'>
                                                <p className='flex items-center gap-x-1.5'>
                                                    <UpdateOutlinedIcon className="text-gray-400" sx={{ fontSize: '1.25rem' }} />
                                                    <span className="text-gray-300 "> Cập nhật lần cuối:</span>
                                                </p>
                                                <p className='text-purple-300'>{formatDate(course.updatedAt ?? course.createdAt)}</p>
                                            </div>

                                            <div className="flex items-center gap-x-5 mt-2">
                                                <Button onClick={() => openShareModal(course)} variant="contained" startIcon={<ShareIcon />}>
                                                    Chia sẻ khóa học
                                                </Button>

                                                <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                                                    <Button variant="outlined">
                                                        Xem chi tiết khóa học
                                                    </Button>
                                                </Link>
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

            <ShareCourseDialog
                open={openShare}
                setOpen={setOpenShare}
                course={currentCourse}
            />
        </>

    )

}

export default SingleOrder