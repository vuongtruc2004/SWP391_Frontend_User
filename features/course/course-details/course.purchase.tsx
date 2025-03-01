'use client'
import { formatPrice } from "@/helper/course.list.helper";
import { Alert, Button, Divider, Skeleton, Snackbar } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { formatDate } from "@/helper/blog.helper";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LoopIcon from '@mui/icons-material/Loop';
import { countTotalTime, getPurchasedButton } from "@/helper/course.details.helper";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import StayCurrentPortraitOutlinedIcon from '@mui/icons-material/StayCurrentPortraitOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { useCartContext } from "@/wrapper/course-cart/course.cart.wrapper";
import Link from "next/link";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from "react";
import PaymentInstruction from "./payment.instruction";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { SlideTransition } from "@/components/course/course-content/style";
import { useUserProgress } from "@/wrapper/user-progress/user.progress.wrapper";
import { countCompletionOfACourse } from "@/helper/lesson.helper";
import { useCoursePurchased } from "@/wrapper/course-purchased/course.purchased.wrapper";

const CoursePurchase = ({ course }: { course: CourseDetailsResponse }) => {
    const { cart, setCart } = useCartContext();
    const { userProgresses, loading } = useUserProgress();
    const { purchasedCourseIds } = useCoursePurchased();
    const [completionOfACourse, setCompletionOfACourse] = useState(-1);

    const { status } = useSession();
    const { push } = useRouter();
    const pathname = usePathname();

    const [openNotification, setOpenNotification] = useState(false);
    const [openInstruction, setOpenInstruction] = useState(false);

    const handleCart = () => {
        let cartFromStorage: CartCourse[] = JSON.parse(localStorage.getItem('cart') || "[]");

        const isExist = cartFromStorage.some(item => item.courseId === course.courseId);
        if (!isExist) {
            const newItem: CartCourse = {
                courseId: course.courseId,
                courseName: course.courseName,
                thumbnail: course.thumbnail,
                price: course.price,
                averageRating: course.averageRating,
                totalRating: course.totalRating,
                totalChapters: course.chapters.length,
                totalTime: countTotalTime(course),
                totalPurchased: course.totalPurchased,
                author: course.expert.user.fullname
            };

            const newCart = [...cartFromStorage, newItem];
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
            setOpenNotification(true);
        }
    };

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
            if (userProgresses.length) {
                setCompletionOfACourse(countCompletionOfACourse(course, userProgresses));
            }
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
                    <div className="flex items-center justify-between">
                        <h1 className='text-3xl font-semibold'>{formatPrice(course.price)}<span className="text-sm">₫</span></h1>
                    </div>
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
                    <p>Tổng thời lượng: <span className="font-semibold text-green-500">{countTotalTime(course)}</span></p>
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
                cart.some(item => item.courseId === course.courseId) ? (
                    <Link href={"/cart"}>
                        <Button
                            variant="outlined"
                            color="info"
                            fullWidth
                            endIcon={<ChevronRightIcon />}
                            sx={{ marginBlock: '10px 12px' }}
                        >
                            Chuyển đến giỏ hàng
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            startIcon={<AddShoppingCartIcon />}
                            sx={{ marginBlock: '10px 12px' }}
                            onClick={handleCart}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                        <Snackbar
                            open={openNotification}
                            autoHideDuration={3000}
                            onClose={() => setOpenNotification(false)}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center'
                            }}
                            TransitionComponent={SlideTransition}
                            key={SlideTransition.name}
                        >
                            <Alert
                                severity="success"
                                onClose={() => setOpenNotification(false)}
                                sx={{ width: '100%', color: 'white' }}
                                variant="filled"
                            >
                                Khóa học đã được thêm vào giỏ hàng!
                            </Alert>
                        </Snackbar>
                    </>
                )
            ) : (
                <>
                    <Divider />
                    {getPurchasedButton(completionOfACourse, course.courseId)}
                </>
            )}

            {completionOfACourse < 0 && (
                <>
                    <Button variant="contained" color="primary" fullWidth startIcon={<LocalMallOutlinedIcon />} onClick={handleOpenInstruction}>
                        Mua ngay
                    </Button>
                    <PaymentInstruction open={openInstruction} setOpen={setOpenInstruction} courses={[course]} />
                </>
            )}
        </div>
    )
}

export default CoursePurchase