import { formatPrice } from "@/helper/course.list.helper";
import { storageUrl } from "@/utils/url";
import { useCart } from "@/wrapper/course-cart/course.cart.wrapper";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import slugify from "slugify";

const SingleCartCourse = ({ course }: { course: CartCourse }) => {

    const { setCart, setChange } = useCart();

    const handleDeleteItem = (courseId: number) => {
        let cartFromStorage: CartCourse[] = JSON.parse(localStorage.getItem('cart') || "[]");
        const newCart = cartFromStorage.filter(item => item.courseId !== courseId);

        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
        setChange(prev => prev + 1);
    }

    const handleBuyLaterItem = (courseId: number) => {
        let cartFromStorage: CartCourse[] = JSON.parse(localStorage.getItem('cart') || "[]");
        const newCart = cartFromStorage.map(item => item.courseId === courseId ? { ...item, buyLater: !item.buyLater } : item);

        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    };

    return (
        <>
            <div className="flex items-center justify-between gap-x-10 py-5">
                <div className="flex items-center gap-x-3">
                    <Link href={`/course/${slugify(course.courseName + "-" + course.courseId)}`} style={{
                        display: 'block',
                        width: '180px',
                        height: `90px`,
                        position: 'relative',
                    }}>
                        <Image src={`${storageUrl}/course/${course.thumbnail}`} alt="course image" fill sizes="(max-width: 1000px) 100vw" priority={true} style={{
                            objectFit: 'cover',
                            borderRadius: '6px',
                            objectPosition: 'center',
                            cursor: 'pointer'
                        }} />
                    </Link>

                    <div>
                        <Link href={`/course/${slugify(course.courseName + "-" + course.courseId)}`} className='transition-all duration-150 line-clamp-1 text-lg font-semibold hover:underline hover:text-blue-500'>{course.courseName}</Link>
                        <p className="text-gray-300 font-semibold text-sm">Bởi {course.author}</p>

                        <div className="flex items-center gap-x-1 text-sm text-gray-200">
                            <p className="text-amber-600 font-semibold">{course.averageRating.toFixed(1)}</p>
                            <Rating name="read-only" value={course.averageRating} readOnly size="small" precision={0.1} />
                            <p>(<span className="text-green-500 font-semibold">{course.totalRating}</span> xếp hạng)</p>
                        </div>

                        <div className="flex items-center gap-x-1.5 text-sm text-gray-200">
                            <p>Tổng số {course.totalTime}</p>
                            <p className="text-gray-100 font-bold">•</p>
                            <p>{course.totalChapters} chương</p>
                            <p className="text-gray-100 font-bold">•</p>
                            <p>{course.totalPurchased} người đăng kí</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <p className="font-semibold text-lg">{formatPrice(course.price)}₫</p>
                    <Button
                        color="warning"
                        size="small"
                        variant="text"
                        startIcon={course.buyLater ? <AddOutlinedIcon /> : <WatchLaterOutlinedIcon />}
                        onClick={() => handleBuyLaterItem(course.courseId)}
                    >
                        {course.buyLater ? "Thêm vào giỏ hàng" : "Lưu để mua sau"}
                    </Button>

                    <Button color="info" variant="text" size="small" startIcon={<CloseIcon />} onClick={() => handleDeleteItem(course.courseId)}>
                        Xóa khỏi giỏ hàng
                    </Button>
                </div>
            </div >
            <Divider />
        </>
    )
}

export default SingleCartCourse