import { Button, Dialog, DialogContent, Divider } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { apiUrl, storageUrl } from "@/utils/url";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { sendRequest } from "@/utils/fetch.api";
import { countDiscountValue } from "@/helper/coupon.helper";
import CourseInOrder from "./course.in.order";
import CouponListDialog from "./coupon.list.dialog";
import { formatCouponSalePrice, formatPrice } from "@/utils/format";
import { useCampaign } from "@/wrapper/course-campaign/course.campaign.wrapper";

const PaymentInstruction = ({ open, setOpen, courses }: {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    courses: CourseDetailsResponse[] | CourseResponse[] | CartCourse[];
}) => {
    const { data: session, status } = useSession();

    const { campaigns } = useCampaign();
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openCouponList, setOpenCouponList] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<CouponResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreateOrder = async () => {
        if (status === "authenticated") {
            setLoading(true);
            const orderRequest: OrderRequest = {
                couponId: selectedCoupon?.couponId || null,
                courseIds: courses.map(course => course.courseId)
            }

            const purchaseResponse = await sendRequest<ApiResponse<string>>({
                url: `${apiUrl}/purchase`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: orderRequest
            });

            if (purchaseResponse.status === 201) {
                window.open(purchaseResponse.data, '_blank');
                setErrorMessage("");
                setOpen(false);
                setSelectedCoupon(null);
            } else {
                setErrorMessage(purchaseResponse.message.toString());
            }
            setLoading(false);
        }
    }

    const handleClosePaymentInstruction = () => {
        setSelectedCoupon(null);
        setErrorMessage("");
        setOpen(false);
    }

    useEffect(() => {
        let totalPrice = 0;
        courses.forEach(course => {
            const applyCampaign = campaigns.find(campaign => campaign.courses.some(item => item.courseId === course.courseId));
            if (applyCampaign) {
                totalPrice += course.price - course.price * applyCampaign.discountPercentage / 100;
            } else {
                totalPrice += course.price;
            }
        });
        setTotalPrice(totalPrice);
        setSelectedCoupon(null);
    }, [campaigns, courses]);

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
                <h1 className="text-2xl font-semibold text-center">Thông tin đơn hàng</h1>
                <p className="text-gray-300 text-center">Cảm ơn bạn đã lựa chọn LearnGo!</p>

                <h2 className="text-lg font-semibold my-3">Thông tin đơn hàng ({courses.length} khóa học)</h2>

                <CourseInOrder courses={courses} />

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

                    {selectedCoupon ? (
                        <div className="flex items-center gap-x-1 cursor-pointer" onClick={() => setOpenCouponList(true)}>
                            <div className="o3ut9x">
                                <span>Giảm ₫{formatCouponSalePrice(countDiscountValue(selectedCoupon, totalPrice))}</span>
                            </div>
                            <ChevronRightIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-1 text-gray-300 cursor-pointer hover:text-purple-300" onClick={() => setOpenCouponList(true)}>
                            <p className="text-sm">Chọn hoặc nhập mã</p>
                            <ChevronRightIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-gray-300"><span className="font-semibold text-white text-lg">Tổng tiền</span> ({courses.length} khóa học):</p>
                    {selectedCoupon ? (
                        <div className="flex items-end gap-x-3">
                            <p className="font-semibold text-lg">{formatPrice(Math.max(totalPrice - countDiscountValue(selectedCoupon, totalPrice), 0))}₫</p>
                            <p className="text-gray-300 line-through">{formatPrice(totalPrice)}₫</p>
                        </div>
                    ) : (
                        <p className="font-semibold text-lg">{formatPrice(totalPrice)}₫</p>
                    )}
                </div>

                <div className="flex items-center justify-end gap-x-3 mt-3">
                    <Button variant="outlined" color="secondary" startIcon={<CloseIcon />} onClick={handleClosePaymentInstruction}>
                        Hủy
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleCreateOrder} loading={loading}>
                        Tạo hóa đơn
                    </Button>
                </div>

                {errorMessage !== "" && (
                    <span className="flex items-center gap-x-1 text-sm text-red-500 font-semibold mt-1 pr-5">
                        <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                        {errorMessage}
                    </span>
                )}

                <CouponListDialog open={openCouponList} setOpen={setOpenCouponList} totalPrice={totalPrice} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon} />
            </DialogContent >
        </Dialog>
    )
}

export default PaymentInstruction