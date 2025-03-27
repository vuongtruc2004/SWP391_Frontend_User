import Link from "next/link"
import { slugifyText } from "@/helper/blog.helper"
import { storageUrl } from "@/utils/url"
import Image from "next/image"
import { useState } from "react"
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ShareIcon from '@mui/icons-material/Share';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ShareCourseDialog from "./share.course.dialog";
import { Button } from "@mui/material"
import { formatDate, formatPrice } from "@/utils/format"

const SingleCourseInOrder = ({ orderDetails }: { orderDetails: OrderDetailsResponse }) => {
    const [openShare, setOpenShare] = useState(false);
    const course = orderDetails.course;

    return (
        <>
            <li className="flex items-center gap-x-10 py-5 px-10">
                <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} style={{
                    display: 'block',
                    width: '280px',
                    height: `170px`,
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

                    <p className="text-gray-300 line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-x-2 my-2">
                        <p className="flex items-center gap-x-1.5">
                            <SchoolOutlinedIcon className="text-gray-400" sx={{ fontSize: '1.1rem' }} />
                            <span className="text-gray-300 text-nowrap">Giảng viên:</span>
                        </p>
                        <p className="text-green-500 line-clamp-1">{course.expert.user.fullname}</p>
                    </div>

                    <div className='flex items-center gap-x-2 mb-2'>
                        <p className='flex items-center gap-x-1.5'>
                            <UpdateOutlinedIcon className="text-gray-400" sx={{ fontSize: '1.1rem' }} />
                            <span className="text-gray-300 "> Cập nhật lần cuối:</span>
                        </p>
                        <p className='text-purple-300'>{formatDate(course.updatedAt ?? course.createdAt)}</p>
                    </div>

                    <div className="flex items-center gap-x-2 mb-3">
                        <p className="flex items-center gap-x-1.5">
                            <AttachMoneyOutlinedIcon className="text-gray-400" sx={{ fontSize: '1.1rem' }} />
                            <span className="text-gray-300 text-nowrap">Giá ở thời điểm mua:</span>
                        </p>
                        <p className="text-blue-500 font-semibold">{formatPrice(orderDetails.priceAtTimeOfPurchase)}₫</p>
                    </div>

                    <div className="flex items-center gap-x-5 mt-2">
                        <Button onClick={() => setOpenShare(true)} variant="contained" startIcon={<ShareIcon />}>
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

            <ShareCourseDialog open={openShare} setOpen={setOpenShare} course={course} />
        </>
    )
}

export default SingleCourseInOrder