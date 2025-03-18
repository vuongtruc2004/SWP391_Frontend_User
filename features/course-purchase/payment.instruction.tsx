import { Box, Button, Dialog, DialogContent, Divider } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { apiUrl, storageUrl } from "@/utils/url";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { sendRequest } from "@/utils/fetch.api";
import CouponList from "./coupon.list";
import { countDiscountValue } from "@/helper/coupon.helper";
import { formatSalePrice } from "@/helper/course.list.helper";
import CachedIcon from '@mui/icons-material/Cached';

const PaymentInstruction = ({ open, setOpen, courses }: {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    courses: CourseDetailsResponse[] | CourseResponse[] | CartCourse[];
}) => {
    const { data: session, status } = useSession();

    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openCouponList, setOpenCouponList] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<CouponResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreateOrder = async () => {
        if (status === "authenticated") {
            setLoading(true);
            const purchaseRequest: PurchaseRequest = {
                courseIds: courses.map(course => course.courseId),
                totalPrice: courses.reduce((sum, course) => sum + course.price, 0)
            }

            const purchaseResponse = await sendRequest<ApiResponse<PurchaseResponse>>({
                url: `${apiUrl}/purchase`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: purchaseRequest
            });

            if (purchaseResponse.status === 200) {
                window.open(purchaseResponse.data.redirectUrl, "_blank");
                setErrorMessage("");
                setOpen(false);
            } else {
                setErrorMessage(purchaseResponse.message.toString());
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        if (status === "authenticated") {
            setTotalPrice(courses.reduce((sum, course) => sum + course.price, 0));
        }
    }, [session, courses]);

    return (
        <Dialog aria-hidden={false} open={open} sx={{
            '.mui-16bx961-MuiPaper-root-MuiDialog-paper': {
                width: '650px',
                maxWidth: '650px',
                boxShadow: 'none',
                backgroundImage: 'none'
            }
        }}>
            <DialogContent sx={{
                padding: '20px',
                bgcolor: '#101010',
                borderRadius: '6px',
                position: 'relative',
                'img': {
                    objectFit: 'cover',
                    objectPosition: 'center'
                }
            }}>
                <h1 className="text-2xl font-semibold text-center">Thanh toán</h1>
                <p className="text-gray-300 text-center">Cảm ơn bạn đã lựa chọn LearnGo!</p>

                <h2 className="text-lg font-semibold my-3">Thông tin đơn hàng ({courses.length} khóa học)</h2>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px',
                    overflow: 'auto',
                    maxHeight: '209px',
                    paddingRight: '20px',
                    '&::-webkit-scrollbar': {
                        display: 'block',
                        width: '2px',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#495057',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#60a5fa',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1976D2',
                    }
                }}>
                    {courses.map(course => {
                        return (
                            <div key={course.courseId + "_" + course.courseName} className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-x-3">
                                    <Image
                                        src={`${storageUrl}/course/${course.thumbnail}`}
                                        width={100} height={60}
                                        alt="course thumbnail"
                                        sizes="(max-width: 1000px) 100vw"
                                        priority={true}
                                        className="rounded-sm"
                                    />
                                    <div className="max-w-[250px]">
                                        <p className="line-clamp-1">{course.courseName}</p>
                                        <p className="text-sm text-gray-300">{"author" in course ? course.author : course.expert.user.fullname}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">{course.price.toLocaleString('vi-VN')}₫</p>
                            </div>
                        )
                    })}
                </Box>

                <Divider sx={{ marginBlock: '20px' }} />

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-x-1">
                        <Image
                            src={`${storageUrl}/icon/voucher.png`}
                            width={30} height={22} alt="voucher icon"
                            sizes="(max-width: 1000px) 100vw"
                            priority={true}
                        />
                        <p>Mã giảm giá từ LearnGo:</p>
                    </div>

                    <div className="flex items-center gap-x-1 text-gray-300 cursor-pointer" onClick={() => setOpenCouponList(true)}>
                        {selectedCoupon ? (
                            <p>Đã áp dụng mã <span className="font-semibold">{selectedCoupon.couponCode}</span>, giảm <span className="text-green-500 font-semibold text-lg">₫{formatSalePrice(countDiscountValue(selectedCoupon, totalPrice))}</span></p>
                        ) : (
                            <>
                                <p className="text-sm hover:text-purple-300">Chọn hoặc nhập mã</p>
                                <ChevronRightIcon sx={{ fontSize: '1rem' }} className="hover:text-purple-300" />
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-300"><span className="font-semibold text-white text-lg">Tổng tiền</span> ({courses.length} khóa học):</p>
                        <p className="font-semibold text-lg">{totalPrice.toLocaleString('vi-VN')}₫</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-x-3 mt-3">
                    <Button variant="outlined" color="secondary" startIcon={<CloseIcon />} onClick={() => setOpen(false)}>
                        Hủy
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleCreateOrder} loading={loading}>
                        Tiếp tục
                    </Button>
                </div>

                {errorMessage !== "" && (
                    <span className="flex items-center gap-x-1 text-sm text-red-500 font-semibold">
                        <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                        {errorMessage}
                    </span>
                )}

                <CouponList open={openCouponList} setOpen={setOpenCouponList} totalPrice={totalPrice} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon} />
            </DialogContent >
        </Dialog>
    )
}

export default PaymentInstruction