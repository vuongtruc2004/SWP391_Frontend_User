import MyCourse from "@/components/course/my-course/my.course";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Khóa học của tôi",
};
const MyCoursePage = () => {
    return (
        <MyCourse />
    )
}

export default MyCoursePage