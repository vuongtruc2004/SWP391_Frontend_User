import { Button } from "@mui/material"
import Link from "next/link";

const CourseSubject = ({ course, removeHeader }: { course: CourseDetailsResponse, removeHeader?: boolean }) => {
    return (
        <>
            <h1 className="text-xl font-semibold mt-5 mb-2 flex items-center gap-x-1">{removeHeader ? "" : "II. "}Công nghệ sử dụng trong khóa học</h1>
            <div className="flex flex-wrap gap-3">
                {course?.subjects.map((subject, index) => {
                    return (
                        <Link href={`/course?subjectIds=${subject.subjectId}`} key={subject.subjectId + "_" + subject.subjectName} className="flex items-center gap-x-1">
                            <Button color="secondary" variant="outlined">
                                {subject.subjectName}
                            </Button>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default CourseSubject