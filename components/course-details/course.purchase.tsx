import Box from "@mui/material/Box";
import { displayPrice } from "@/helper/course.list.helper";
import { Divider } from "@mui/material";
import Link from "next/link";
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Image from "next/image";
import { storageUrl } from "@/utils/url";
import { formatCreateDate } from "@/helper/blog.helper";

const CoursePurchase = ({ course }: { course: CourseDetailsResponse }) => {
    return (
        <Box sx={{
            bgcolor: 'black',
            height: 'max-content',
            borderRadius: '6px'
        }}>
            <Box sx={{
                height: '220px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '6px',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-100%',
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    transition: 'bottom 0.4s ease-in-out',
                    borderRadius: '6px'
                },
                'img': {
                    height: 'auto',
                    transition: 'all .4s',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,3) 60%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0) 100%)',
                    objectPosition: 'center',
                },
                '&:hover': {
                    '&::after': {
                        bottom: 0,
                    },
                    'img': {
                        filter: 'blur(4px)'
                    },
                    'div': {
                        bottom: '50%',
                        transform: 'translateY(50%)',
                        columnGap: '12px',
                    }
                }
            }}>
                <Image
                    src={`${storageUrl}/course/${course.thumbnail}`}
                    alt={course.courseName}
                    fill
                    sizes="(max-width: 1000px) 100vw"
                    priority={true}
                />

                <div className="transition-all duration-500 flex items-center justify-center gap-x-1 absolute bottom-3 left-1/2 -translate-x-1/2 z-[2] font-semibold">
                    <p className="text-sm">Xem giới thiệu khóa học</p>
                    <ChevronRightOutlinedIcon sx={{ fontSize: '16px' }} />
                </div>
            </Box>
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