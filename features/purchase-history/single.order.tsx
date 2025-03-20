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
import { displayOrderStatus } from "@/helper/purchase.history.helper"
import PaymentInstruction from "../course-purchase/payment.instruction"
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCart';
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon


const SingleOrder = ({ order, orderList }: { order: OrderResponse, orderList: OrderResponse[] }) => {
    const pathname = usePathname();
    const { status } = useSession();
    const { push } = useRouter();
    const [openShare, setOpenShare] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<CourseResponse | null>(null);
    const [openInstruction, setOpenInstruction] = useState(false);

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

                        {displayOrderStatus(order)}
                    </ul>
                </AccordionSummary>

                <AccordionDetails sx={{ padding: 0 }}>
                    <div className="flex items-center justify-center py-5 px-10">
                        <div className={`border rounded-md py-2 px-4 flex items-center justify-between flex-1 
    ${order.orderStatus === 'COMPLETED' ? 'border-green-500'
                                : order.orderStatus === 'PENDING' ? 'border-orange-500'
                                    : 'border-red-500'}`}>
                            {order.orderStatus === 'COMPLETED' ? (
                                <p>Bạn đã thanh toán hóa đơn này lúc: {formatDateTime(order.updatedAt)}</p>
                            ) :
                                <p>Bạn chưa thanh toán hóa đơn này</p>
                            }
                            <div>
                                {order.orderStatus !== 'COMPLETED' && (
                                    <Button
                                        color="info"
                                        variant="outlined"
                                        startIcon={<ShoppingCartCheckoutOutlinedIcon />}
                                        onClick={() => setOpenInstruction(true)}
                                        className="!mr-2"
                                    >
                                        Mua lại
                                    </Button>
                                )}

                                {order.orderStatus === 'COMPLETED' ? (
                                    <DoneAllIcon
                                        sx={{
                                            fontSize: '1.2rem',
                                            color: 'green'
                                        }}
                                    />
                                ) : (
                                    <CloseIcon
                                        sx={{
                                            fontSize: '1.2rem',
                                            color: order.orderStatus === 'PENDING' ? 'orange' : 'red'
                                        }}
                                    />
                                )}

                            </div>

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

            <PaymentInstruction
                open={openInstruction}
                setOpen={setOpenInstruction}
                courses={order.orderDetails.map(detail => detail.course)}
            />

        </>

    )

}

export default SingleOrder