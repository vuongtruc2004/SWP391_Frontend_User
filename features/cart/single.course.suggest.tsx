import { formatPrice } from "@/helper/course.list.helper"
import { storageUrl } from "@/utils/url"
import { Box, Rating } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

const SingleCourseSuggest = ({ course }: { course: CourseDetailsResponse }) => {
    return (
        <Box>
            <Link href={`/course/${course.courseId}`} style={{
                display: 'block',
                width: '100%',
                height: `125px`,
                position: 'relative',
            }}>
                <Image src={`${storageUrl}/course/${course.thumbnail}`} alt="course image" fill sizes="(max-width: 1000px) 100vw" priority={true} style={{
                    objectFit: 'cover',
                    borderRadius: '6px',
                    objectPosition: 'center',
                    cursor: 'pointer'
                }} />
            </Link>
            <Link href={`/course/${course.courseId}`} className="transition-all duration-150 font-semibold line-clamp-1 hover:underline hover:text-blue-500 mt-2">{course.courseName}</Link>
            <p className="text-gray-300 text-sm mb-0.5">Bởi {course.expert.user.fullname}</p>
            <div className="flex items-center gap-x-1 text-sm text-gray-200">
                <p className="text-amber-600 font-semibold">{course.averageRating.toFixed(1)}</p>
                <Rating name="read-only" value={course.averageRating} readOnly size="small" precision={0.1} />
                <p>(<span className="text-green-500 font-semibold">{course.totalRating}</span> xếp hạng)</p>
            </div>
            <div className="flex items-end gap-x-2 font-semibold">
                <p>{formatPrice(course.price)}₫</p>
            </div>
        </Box>
    )
}

export default SingleCourseSuggest