import CourseContent from "@/components/course/course-content/course.content";
import { getCourseById } from "@/helper/course.details.helper";
import Box from "@mui/material/Box";
import { Metadata } from "next";
import CourseSubject from "@/components/course/course-details/course.subject";
import CourseExpert from "@/components/course/course-details/course.expert";
import CoursePurchase from "@/features/course/course-details/course.purchase";
import CourseRate from "@/features/course/course-details/course.rate";
import CourseObjectives from "@/components/course/course-details/course.objectives";
import CourseIntroduction from "@/features/course/course-introduction/course.introduction";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const id = (await params).id
    const courseResponse = await getCourseById(id);
    return {
        title: courseResponse.data.courseName,
    }
}

const CourseDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    const courseResponse = await getCourseById(id);

    return (
        <Box sx={{
            paddingTop: '120px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            color: 'white',
            display: 'grid',
            gridTemplateColumns: '2.25fr 1fr',
        }}>
            <div className="mr-10">
                <CourseIntroduction course={courseResponse.data} />
                <div className="px-5">
                    <CourseObjectives course={courseResponse.data} />
                    <CourseSubject course={courseResponse.data} />
                    <CourseContent course={courseResponse.data} />
                </div>
                <CourseRate course={courseResponse.data} />
            </div>
            <div>
                <CoursePurchase course={courseResponse.data} />
                <CourseExpert course={courseResponse.data} />
            </div>
        </Box>
    )
}

export default CourseDetails