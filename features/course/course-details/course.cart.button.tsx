import { useCart } from "@/wrapper/course-cart/course.cart.wrapper";
import { Button } from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";

const CourseCartButton = ({ course }: { course: CourseDetailsResponse | CourseResponse }) => {
    const { data: session, status } = useSession();
    const { cart, setCart } = useCart();

    const handleCart = async () => {
        const isExist = cart.some(item => item.courseId === course.courseId);

        if (!isExist) {
            const newItem: CartCourse = {
                courseId: course.courseId,
                courseName: course.courseName,
                thumbnail: course.thumbnail,
                price: course.price,
                author: course.expert.user.fullname,
                buyLater: false
            };
            const newCart = [...cart, newItem];

            if (status === 'authenticated') {
                const request: StorageCourseRequest = {
                    courseId: course.courseId,
                    status: 'NOW'
                }

                await sendRequest<ApiResponse<void>>({
                    url: `${apiUrl}/carts/add`,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: request
                });

            } else {
                localStorage.setItem('cart', JSON.stringify(newCart));
            }
            setCart(newCart);
        }
    };

    return (
        <>
            {cart.some(item => item.courseId === course.courseId) ? (
                <Link href={"/cart"}>
                    <Button variant="outlined" color="info" fullWidth endIcon={<ChevronRightIcon />}>
                        Chuyển đến giỏ hàng
                    </Button>
                </Link>
            ) : (
                <Button variant="outlined" color="secondary" fullWidth startIcon={<AddShoppingCartIcon />} onClick={handleCart}>
                    Thêm vào giỏ hàng
                </Button>
            )}
        </>
    )
}

export default CourseCartButton