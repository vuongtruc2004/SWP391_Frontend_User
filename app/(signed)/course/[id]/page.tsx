import CourseIntroduce from "@/components/course-details/course.introduce";
import CoursePurchase from "@/components/course-details/course.purchase";
import CourseContent from "@/components/course-tabs/course.content";
import CourseTabs from "@/components/course-tabs/course.tabs";
import { getCourseById } from "@/helper/course.details.helper";
import Box from "@mui/material/Box";
import { Metadata } from "next";

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

    console.log(courseResponse);
    return (
        <Box sx={{
            paddingTop: '120px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            color: 'white',
            display: 'grid',
            gridTemplateColumns: '5fr 3fr',
            gap: '20px',
        }}>
            <div>
                <CourseIntroduce course={courseResponse.data} />
                <CourseContent course={courseResponse.data} />
            </div>
            <CoursePurchase course={courseResponse.data} />
        </Box>
    )
}

export default CourseDetails