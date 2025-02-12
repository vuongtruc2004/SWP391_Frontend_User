import { storageUrl } from "@/utils/url";
import Box from "@mui/material/Box";
import Image from "next/image";
import { displayPrice, formatPrice, getOriginalPrice } from "@/helper/course.list.helper";
import { Divider } from "@mui/material";
import Link from "next/link";
import { formatCreateDate } from "@/helper/blog.helper";

const CoursePurchase = ({ course }: { course: CourseResponse }) => {
    return (
        <Box sx={{
            bgcolor: 'black',
            height: 'max-content',
            borderRadius: '6px'
        }}>


            <div className="mt-5 p-5 text-sm">
                {displayPrice(course, 'not buy')}

                <Divider sx={{ marginBlock: '12px 10px' }} />

                <div className="flex items-center justify-between gap-x-2 text-blue-500">
                    <p className="text-green-400">Giảng viên:</p>
                    <Link href={"/home"} className="hover:underline">{course.expert.user.fullname}</Link>
                </div>
                <div className='flex items-center justify-between gap-x-2'>
                    <p className='text-gray-300'>Cập nhật lần cuối:</p>
                    <p className='text-purple-300'>{formatCreateDate(course.updatedAt ?? course.createdAt)}</p>
                </div>

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
        </Box>
    )
}

export default CoursePurchase