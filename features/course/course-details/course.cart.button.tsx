import { useCart } from "@/wrapper/course-cart/course.cart.wrapper";
import { Button } from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CourseCartButton = ({ course }: { course: CourseDetailsResponse | CourseResponse }) => {
    const { cart, setCart } = useCart();

    const handleCart = () => {
        let cartFromStorage: CartCourse[] = JSON.parse(localStorage.getItem('cart') || "[]");

        const isExist = cartFromStorage.some(item => item.courseId === course.courseId);
        if (!isExist) {
            const newItem: CartCourse = {
                courseId: course.courseId,
                courseName: course.courseName,
                thumbnail: course.thumbnail,
                price: course.price,
                author: course.expert.user.fullname,
                buyLater: false
            };

            const newCart = [...cartFromStorage, newItem];
            localStorage.setItem('cart', JSON.stringify(newCart));
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