import { BootstrapTooltip } from "@/components/course/course-content/style"
import CourseTooltip from "@/components/course/course-slider/course.tooltip"
import { slugifyText } from "@/helper/blog.helper"
import { storageUrl } from "@/utils/url"
import Image from "next/image"
import Link from "next/link"
import DisplayCoursePrice from "../course/display/display.course.price"

const SingleCourseSuggest = ({ course }: { course: CourseResponse }) => {
    return (
        <BootstrapTooltip title={<CourseTooltip course={course} />} placement="right">
            <div>
                <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} style={{
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
                <Link href={`/course/${slugifyText(course.courseName + "-" + course.courseId)}`} className="transition-all duration-150 font-semibold line-clamp-1 hover:underline hover:text-blue-500 mt-2">{course.courseName}</Link>
                <p className="text-gray-300 text-sm mb-0.5">Bởi {course.expert.user.fullname}</p>
                <DisplayCoursePrice course={course} fontSize="small" />
            </div>
        </BootstrapTooltip>
    )
}

export default SingleCourseSuggest