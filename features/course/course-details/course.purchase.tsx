'use client'
import { formatPrice, getSalePercent } from "@/helper/course.list.helper";
import { Button, Divider } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { formatCreateDate } from "@/helper/blog.helper";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LoopIcon from '@mui/icons-material/Loop';
import { countTotalTime } from "@/helper/course.details.helper";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import StayCurrentPortraitOutlinedIcon from '@mui/icons-material/StayCurrentPortraitOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { useCartContext } from "@/wrapper/course-cart/course.cart.wrapper";
import Link from "next/link";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CoursePurchase = ({ course }: { course: CourseDetailsResponse }) => {

    const { cart, setCart } = useCartContext();

    const handleCart = () => {
        let cartFromStorage: CartCourse[] = JSON.parse(localStorage.getItem('cart') || "[]");

        const isExist = cartFromStorage.some(item => item.courseId === course.courseId);
        let newCart: CartCourse[] = [];

        if (!isExist) {
            const newItem: CartCourse = {
                courseId: course.courseId,
                courseName: course.courseName,
                thumbnail: course.thumbnail,
                salePrice: course.salePrice,
                originalPrice: course.originalPrice,
                averageRating: course.averageRating,
                totalRating: course.totalRating,
                totalLessons: course.lessons.length,
                totalTime: countTotalTime(course),
                totalPurchased: course.totalPurchased,
                author: course.expert.user.fullname
            };

            newCart = [...cartFromStorage, newItem];
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
        }
    };

    return (
        <div className="bg-black rounded-md p-5" style={{
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        }}>
            <div className="flex items-center justify-between">
                <div className="flex items-end gap-x-2">
                    <h1 className='text-3xl font-semibold'>{formatPrice(course.salePrice)}<span className="text-sm">₫</span></h1>
                    {course.salePrice !== course.originalPrice && (
                        <p className='line-through text-gray-400'>{formatPrice(course.originalPrice)}₫</p>
                    )}
                </div>
                {course.salePrice !== course.originalPrice && (
                    <p className="px-3 py-2 bg-green-700 text-sm rounded-md">-{getSalePercent(course.originalPrice, course.salePrice)}%</p>
                )}
            </div>

            <Divider sx={{ marginBlock: '10px' }} />

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
                    <p>Cập nhật lần cuối: <span className="font-semibold text-purple-300">{formatCreateDate(course.updatedAt)}</span></p>
                </li>
            </ul>

            {cart.some(item => item.courseId === course.courseId) ? (
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
            )}

            <Button variant="contained" color="primary" fullWidth startIcon={<LocalMallOutlinedIcon />}>
                Mua ngay
            </Button>
        </div>
    )
}

export default CoursePurchase