'use client'
import { Button, Divider, Skeleton } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LoopIcon from '@mui/icons-material/Loop';
import { countTotalTimeForACourse } from "@/helper/course.details.helper";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import StayCurrentPortraitOutlinedIcon from '@mui/icons-material/StayCurrentPortraitOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { useEffect, useState } from "react";
import PaymentInstruction from "../../course-purchase/payment.instruction";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useUserProgress } from "@/wrapper/user-progress/user.progress.wrapper";
import { countCompletedPercentOfACourse } from "@/helper/lesson.helper";
import { useCoursePurchased } from "@/wrapper/course-purchased/course.purchased.wrapper";
import CourseCartButton from "./course.cart.button";
import DisplayCoursePrice from "@/components/course/display/display.course.price";
import DisplayCoursePurchaseButton from "@/components/course/display/display.course.purchase.button";
import { formatDate } from "@/utils/format";

const CoursePurchase = ({ course }: { course: CourseDetailsResponse }) => {
    const { userProgresses, loading } = useUserProgress();
    const { purchasedCourseIds } = useCoursePurchased();
    const [completionOfACourse, setCompletionOfACourse] = useState(-1);
    const [openInstruction, setOpenInstruction] = useState(false);

    const { status } = useSession();
    const { push } = useRouter();
    const pathname = usePathname();

    const handleOpenInstruction = () => {
        if (status !== "authenticated") {
            sessionStorage.setItem('prevUrl', pathname);
            push("/login");
        } else {
            setOpenInstruction(true);
        }
    }

    useEffect(() => {
        if (purchasedCourseIds.find(id => id === course.courseId)) {
            setCompletionOfACourse(countCompletedPercentOfACourse(course, userProgresses));
        }
    }, [userProgresses, purchasedCourseIds]);

    if (loading) {
        return (
            <Skeleton width={"100%"} height={300} animation="wave" variant="rounded" />
        )
    }

    return (
        <div className="bg-black rounded-md p-5" style={{
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        }}>
            {completionOfACourse < 0 && (
                <>
                    <DisplayCoursePrice course={course} fontSize="large" displayEndTime={true} />
                    <Divider sx={{ marginBlock: '10px' }} />
                </>
            )}

            <h2 className="font-semibold text-lg">Về khóa học</h2>
            <ul className="text-sm">
                <li className="flex items-center gap-x-2 py-1.5">
                    <HowToRegOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                    <p>Số người đăng kí học: <span className="font-semibold text-blue-400">{course.totalPurchased}</span></p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <StayCurrentPortraitOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                    <p>Truy cập trên thiết bị di động và TV</p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <AccessTimeIcon sx={{ fontSize: '1.2rem' }} />
                    <p>Tổng thời lượng: <span className="font-semibold text-green-500">{countTotalTimeForACourse(course)}</span></p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <AllInclusiveOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                    <p>Quyền truy cập đầy đủ suốt đời</p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <LoopIcon sx={{ fontSize: '1.2rem' }} />
                    <p>Cập nhật lần cuối: <span className="font-semibold text-purple-300">{formatDate(course.updatedAt)}</span></p>
                </li>
            </ul>

            {completionOfACourse < 0 ? (
                <div className="flex flex-col gap-y-3 mt-3">
                    <CourseCartButton course={course} />
                    <Button variant="contained" color="primary" fullWidth startIcon={<LocalMallOutlinedIcon />} onClick={handleOpenInstruction}>
                        Mua ngay
                    </Button>
                    <PaymentInstruction open={openInstruction} setOpen={setOpenInstruction} courses={[course]} />
                </div>
            ) : (
                <>
                    <Divider sx={{ marginTop: '12px' }} />
                    <DisplayCoursePurchaseButton course={course} completionOfACourse={completionOfACourse} />
                </>
            )}
        </div >
    )
}

export default CoursePurchase