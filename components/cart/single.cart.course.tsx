import { formatPrice } from "@/helper/course.list.helper";
import { storageUrl } from "@/utils/url";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const SingleCartCourse = ({ course, setCart, index }: {
    course: CartCourse,
    setCart: React.Dispatch<React.SetStateAction<CartCourse[]>>,
    index: number
}) => {

    const handleDeleteItem = (courseId: number) => {
        let cartFromStorage: CartCourse[] = JSON.parse(localStorage.getItem('cart') || "[]");
        const newCart = cartFromStorage.filter(item => item.courseId !== courseId);

        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    return (
        <>
            <div className={`flex items-center justify-between gap-x-10 ${index === 0 ? 'pb-5' : 'py-5'}`}>
                <div className="flex items-center gap-x-2">
                    <Link href={`/course/${course.courseId}`} style={{
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
                        <Link href={`/course/${course.courseId}`} className='transition-all duration-150 line-clamp-1 text-lg font-semibold hover:underline hover:text-blue-500'>{course.courseName}</Link>
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

                <div>
                    <div className="flex flex-col items-end mb-1">
                        <p className="font-semibold text-lg">{formatPrice(course.price)}₫</p>
                    </div>
                    <Button color="error" size="small" startIcon={<CloseIcon />} onClick={() => handleDeleteItem(course.courseId)}>
                        Xóa khỏi giỏ hàng
                    </Button>
                </div>
            </div>
            <Divider />
        </>
    )
}

export default SingleCartCourse