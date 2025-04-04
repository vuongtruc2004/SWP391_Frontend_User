import { Button } from "@mui/material"
import Link from "next/link";

const CourseSubject = ({ course }: { course: CourseDetailsResponse }) => {
    return (
        <>
            <h1 className="text-xl font-semibold mt-5 mb-2 flex items-center gap-x-1">Lĩnh vực trong khóa học bao gồm</h1>
            <div className="flex flex-wrap gap-3">
                {course?.subjects.map(subject => {
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