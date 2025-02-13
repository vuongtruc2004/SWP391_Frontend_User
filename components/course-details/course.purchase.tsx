import Box from "@mui/material/Box";
import { formatPrice, getSalePercent } from "@/helper/course.list.helper";
import { Divider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { storageUrl } from "@/utils/url";
import { formatCreateDate } from "@/helper/blog.helper";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import HighlightOutlinedIcon from '@mui/icons-material/HighlightOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import LoopIcon from '@mui/icons-material/Loop';
import { countTotalTime } from "@/helper/course.details.helper";

const CoursePurchase = ({ course }: { course: CourseDetailsResponse }) => {
    return (
        <div className="p-5">
            <div className='flex items-center justify-between mt-2 text-sm'>
                <div className='flex items-end gap-x-2'>
                    <h1 className='text-2xl font-semibold'>{formatPrice(course.salePrice)}đ</h1>
                    {course.salePrice !== course.originalPrice && (
                        <p className='line-through text-red-500 italic'>{formatPrice(course.originalPrice)}đ</p>
                    )}
                </div>
                {course.salePrice !== course.originalPrice && (
                    <p>Giảm giá {getSalePercent(course)}%</p>
                )}
            </div>

            <ul className="flex items-center justify-center rounded-md">
                <li className="flex items-center gap-x-1 p-2 rounded-md border border-gray-500">
                    <HowToRegOutlinedIcon sx={{ fontSize: '1.25rem' }} />
                    <div>
                        <p>Số người đăng kí</p>
                        <p>{course.totalPurchased}</p>
                    </div>
                </li>
                <li className="flex items-center gap-x-1 p-2 border border-gray-500">
                    <HowToRegOutlinedIcon sx={{ fontSize: '1.25rem' }} />
                    <div>
                        <p>Số người đăng kí</p>
                        <p>{course.totalPurchased}</p>
                    </div>
                </li>
                <li className="flex items-center gap-x-1 p-2 rounded-md border border-gray-500">
                    <HowToRegOutlinedIcon sx={{ fontSize: '1.25rem' }} />
                    <div>
                        <p>Số người đăng kí</p>
                        <p>{course.totalPurchased}</p>
                    </div>
                </li>
            </ul>

            <Divider sx={{ marginBlock: '10px' }} />

            <ul className="text-sm">
                <li className="flex items-center gap-x-2 py-1">
                    <p>Số người đã đăng kí: <strong>{course.totalPurchased}</strong></p>
                </li>
                <li className="flex items-center gap-x-2 py-1">
                    <HighlightOutlinedIcon sx={{ fontSize: '1.25rem' }} />
                    <p>Giảng viên: <strong>{course.expert.user.fullname}</strong></p>
                </li>
                <li className="flex items-center gap-x-2 py-1">
                    <AccessTimeIcon sx={{ fontSize: '1.25rem' }} />
                    <p>Tổng thời lượng: <strong>{countTotalTime(course)}</strong></p>
                </li>
                <li className="flex items-center gap-x-2 py-1">
                    <ThumbUpOffAltIcon sx={{ fontSize: '1.25rem' }} />
                    <p>Số lượt thích: <strong>{course.totalLikes}</strong></p>
                </li>
                <li className="flex items-center gap-x-2 py-1">
                    <LoopIcon sx={{ fontSize: '1.25rem' }} />
                    <p>Cập nhật lần cuối: <strong>{formatCreateDate(course.updatedAt)}</strong></p>
                </li>
            </ul>

            <Divider sx={{ marginBlock: '12px 10px' }} />

            <p className="mb-3 text-gray-300">Công nghệ sử dụng trong khóa học:</p>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px'
            }}>
                {course?.subjects.map(item => {
                    return (
                        <Link
                            href={`/course?subjectIds=${item.subjectId}`}
                            key={item.subjectId}
                            className="text-gray-300 hover:text-blue-500 flex items-center gap-x-2"
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
                                    height: '20px',
                                }}
                            />
                            <p className={`transition-all duration-200 capitalize font-semibold`}>{item.subjectName}</p>
                        </Link>
                    )
                })}
            </Box>
        </div>
    )
}

export default CoursePurchase