import { calculateCourseSalePrice } from "@/helper/course.list.helper"
import { storageUrl } from "@/utils/url"
import { Box } from "@mui/material"
import Image from "next/image"

const CourseInOrder = ({ courses }: { courses: CourseDetailsResponse[] | CourseResponse[] | CartCourse[] }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
            overflow: 'auto',
            maxHeight: '209px',
            paddingRight: '20px',
            '&::-webkit-scrollbar': {
                display: 'block',
                width: '2px',
                borderRadius: '6px',
            },
            '&::-webkit-scrollbar-track': {
                background: '#495057',
                borderRadius: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#60a5fa',
                borderRadius: '6px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: '#1976D2',
            }
        }}>
            {courses.map(course => {
                return (
                    <div key={course.courseId + "_" + course.courseName} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-x-3">
                            <Image
                                src={`${storageUrl}/course/${course.thumbnail}`}
                                width={100} height={60}
                                alt="course thumbnail"
                                sizes="(max-width: 1000px) 100vw"
                                priority={true}
                                className="rounded-sm"
                            />
                            <div className="max-w-[250px]">
                                <p className="line-clamp-1">{course.courseName}</p>
                                <p className="text-sm text-gray-300">{"author" in course ? course.author : course.expert.user.fullname}</p>
                            </div>
                        </div>
                        <div>
                            {/* {calculateCourseSalePrice(course) !== 0} */}
                            <p className="font-semibold">{course.price.toLocaleString('vi-VN')}₫</p>

                        </div>
                    </div>
                )
            })}
        </Box>
    )
}

export default CourseInOrder