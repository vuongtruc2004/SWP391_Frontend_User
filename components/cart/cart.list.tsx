import { storageUrl } from "@/utils/url";
import { useCartContext } from "@/wrapper/course-cart/course.cart.wrapper"
import { Box, Button, Divider, IconButton, Popover, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { formatPrice, getSalePercent } from "@/helper/course.list.helper";
import CloseIcon from '@mui/icons-material/Close';

const CartList = () => {
    const { cart, setCart } = useCartContext();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
        setAnchorEl(null);
    }

    const handleDeleteItem = (courseId: number) => {
        let cartFromStorage: CartCourse[] = JSON.parse(localStorage.getItem('cart') || "[]");
        const newCart = cartFromStorage.filter(item => item.courseId !== courseId);

        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    return (
        <Box sx={{
            bgcolor: 'black',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '6px',
        }}>
            <div className="flex items-center justify-between mb-5 pr-5">
                <div>
                    <h1 className="text-2xl font-semibold">Giỏ hàng</h1>
                    <p className="text-sm text-gray-400 mb-1 font-semibold">Có {cart?.length || 0} khóa học trong giỏ hàng</p>
                </div>
                <IconButton color="info" onClick={(event) => setAnchorEl(event.currentTarget)} size="small">
                    <DeleteOutlineIcon />
                </IconButton>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    sx={{
                        '.mui-vhqfcu-MuiPaper-root-MuiPopover-paper': {
                            backgroundImage: 'none'
                        }
                    }}
                >
                    <div className="bg-[#101010] p-3 rounded-md">
                        <h3 className="font-semibold text-white"><ErrorOutlineIcon className="text-red-500" sx={{ fontSize: '1.35rem' }} /> Xóa giỏ hàng</h3>
                        <p className="text-sm text-gray-300 font-semibold ml-5">Bạn có muốn xóa toàn bộ giỏ hàng không?</p>
                        <div className="flex justify-end gap-x-2 mt-3">
                            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>Hủy</Button>
                            <Button size="small" variant="contained" color="error" onClick={handleDeleteCart}>Xóa</Button>
                        </div>
                    </div>
                </Popover>
            </div>

            <Box sx={{
                marginBottom: '20px',
                'img': {
                    objectFit: 'contain'
                }
            }}>
                {cart.map((item, index) => {
                    return (
                        <Fragment key={item.courseId}>
                            <div className={`flex items-center justify-between gap-x-10 ${index === 0 ? 'pb-5' : 'py-5'}`}>
                                <div className="flex items-center gap-x-2">
                                    <Link href={`/course/${item.courseId}`} style={{
                                        display: 'block',
                                        width: '180px',
                                        height: `90px`,
                                        position: 'relative',
                                    }}>
                                        <Image src={`${storageUrl}/course/${item.thumbnail}`} alt="course image" fill sizes="(max-width: 1000px) 100vw" priority={true} style={{
                                            objectFit: 'cover',
                                            borderRadius: '6px',
                                            objectPosition: 'center',
                                            cursor: 'pointer'
                                        }} />
                                    </Link>

                                    <div>
                                        <Link href={`/course/${item.courseId}`} className='transition-all duration-150 line-clamp-1 text-lg font-semibold hover:underline hover:text-blue-500'>{item.courseName}</Link>
                                        <p className="text-gray-300 font-semibold text-sm">Bởi {item.author}</p>

                                        <div className="flex items-center gap-x-1 text-sm text-gray-200">
                                            <p className="text-amber-600 font-semibold">{item.averageRating.toFixed(1)}</p>
                                            <Rating name="read-only" value={item.averageRating} readOnly size="small" precision={0.1} />
                                            <p>(<span className="text-green-500 font-semibold">{item.totalRating}</span> xếp hạng)</p>
                                        </div>

                                        <div className="flex items-center gap-x-1.5 text-sm text-gray-200">
                                            <p>Tổng số {item.totalTime}</p>
                                            <p className="text-gray-100 font-bold">•</p>
                                            <p>{item.totalLessons} chương</p>
                                            <p className="text-gray-100 font-bold">•</p>
                                            <p>{item.totalPurchased} người đăng kí</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col items-end mb-1">
                                        <p className="font-semibold text-lg">{formatPrice(item.salePrice)}₫</p>
                                        {item.salePrice < item.originalPrice && (
                                            <div className="flex items-center gap-x-2">
                                                <p className="line-through font-semibold text-gray-400">{formatPrice(item.originalPrice)}₫</p>
                                                <p className="px-3 mt-0.5 text-sm text-green-600 border-green-800 border rounded-md">-{getSalePercent(item.originalPrice, item.salePrice)}%</p>
                                            </div>
                                        )}
                                    </div>
                                    <Button color="error" size="small" startIcon={<CloseIcon />} onClick={() => handleDeleteItem(item.courseId)}>
                                        Xóa khỏi giỏ hàng
                                    </Button>
                                </div>
                            </div>
                            <Divider />
                        </Fragment>
                    )
                })}
            </Box>
        </Box >
    )
}

export default CartList