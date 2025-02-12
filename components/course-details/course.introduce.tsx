import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import { getNumberOfDocuments, getNumberOfVideos } from "@/helper/course.details.helper";
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Image from "next/image";
import { storageUrl } from "@/utils/url";
import Link from "next/link";

const CourseIntroduce = ({ course }: { course: CourseResponse }) => {
    console.log(course.expert.user.avatar);
    return (
        <Box sx={{
            borderRadius: '6px'
        }}>
            <Box sx={{
                height: '250px',
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

            <div className="p-5">
                <h1 className="text-2xl font-semibold mb-2">{course.courseName}</h1>
                <p className="text-gray-300">{course.description}</p>
                <h2 className="text-xl font-semibold mt-5 mb-1">Mục tiêu của khóa học</h2>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '20px',
                    'p': {
                        color: '#d1d5dc'
                    }
                }}>
                    {course?.objectives.map((item, index) => {
                        return (
                            <div className="flex items-center gap-x-3" key={index + "_" + item}>
                                <CheckIcon sx={{ color: '#05df72' }} />
                                <p>{item}</p>
                            </div>
                        )
                    })}
                </Box>

                <h2 className="text-xl font-semibold mt-5 mb-1">Nội dung khóa học</h2>

                <div className="flex items-center justify-between text-gray-300">
                    <div className="flex items-center gap-x-2">
                        <p>{course?.lessons.length} chương</p>
                        <p className="text-white">•</p>
                        <p>{getNumberOfVideos(course)} bài giảng</p>
                        <p className="text-white">•</p>
                        <p>{getNumberOfDocuments(course)} bài đọc</p>
                        <p className="text-white">•</p>
                        <p>{0} bài kiểm tra</p>
                    </div>
                    <p className="text-blue-500 hover:text-blue-400 cursor-pointer">
                        Mở rộng tất cả
                    </p>
                </div>
            </div>
        </Box>
    )
}

export default CourseIntroduce