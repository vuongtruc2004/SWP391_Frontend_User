import CourseIntroduce from "@/components/course/course-details/course.introduce";
import CourseContent from "@/components/course/course-content/course.content";
import { getCourseById } from "@/helper/course.details.helper";
import Box from "@mui/material/Box";
import { Metadata } from "next";
import CourseVideoIntro from "@/components/course/course-details/course.intro.video";
import CourseSubject from "@/components/course/course-details/course.subject";
import CourseExpert from "@/components/course/course-details/course.expert";
import CoursePurchase from "@/features/course/course-details/course.purchase";
import CourseRate from "@/features/course/course-details/course.rate";
import CourseTabs from "@/features/course/course-details/course.tabs";

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
            gridTemplateColumns: '2fr 1fr',
        }}>
            <div className="mr-12">
                <CourseVideoIntro course={courseResponse.data} />
                <div className="px-5">
                    <CourseIntroduce course={courseResponse.data} />
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