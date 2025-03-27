import { Alert, Snackbar } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { useUserOrder } from "@/wrapper/user-order/user.order.wrapper";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { countDiscountValue } from "@/helper/coupon.helper";
import { formatCouponSalePrice, formatDateTime, formatToMMSS } from "@/utils/format";

const OrderStatusBox = ({ order }: { order: OrderResponse }) => {
    const { data: session, status } = useSession();
    const { setOrderList } = useUserOrder();
    const [open, setOpen] = useState(false);
    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    const handleCancelOrder = async () => {
        if (status === 'authenticated') {
            const response = await sendRequest<ApiResponse<void>>({
                url: `${apiUrl}/purchase/${order.orderId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
            if (response.status === 200) {
                setOrderList(prev => prev.filter(item => item.orderId !== order.orderId));
            }
        }
    }

    const handleContinuePurchase = () => {
        if (!dayjs(order.expiredAt).isAfter(dayjs())) {
            setOpen(true);
        } else if (order.paymentUrl) {
            window.open(order.paymentUrl, '_blank');
        }
    }

    useEffect(() => {
        if (!order.paidAt) {
            const endTime = dayjs(order.expiredAt);
            const timeLeft = endTime.diff(dayjs(), 'second');
            setRemainingTime(timeLeft > 0 ? timeLeft : 0);

            const interval = setInterval(() => {
                const updatedTime = endTime.diff(dayjs(), 'second');
                setRemainingTime(updatedTime > 0 ? updatedTime : 0);

                if (updatedTime <= 0) {
                    clearInterval(interval);
                };
            }, 1000);
            return () => clearInterval(interval);
        }
    }, []);

    return (
        <div className="px-10 pt-5">
            {order.paidAt !== null ? (
                <div className="flex items-center justify-between px-3.5 py-1.5 border border-green-500 rounded-md">
                    <div>
                        <p>Bạn đã thanh toán đơn hàng này lúc: <strong>{formatDateTime(order.paidAt)}</strong></p>
                        {order.coupon && (
                            <p className="flex items-center gap-x-1.5 mt-1"><SellOutlinedIcon className="text-orange-400" sx={{ fontSize: '1rem' }} /> Đã áp dụng mã {order.coupon.couponCode}, giảm <strong>₫{formatCouponSalePrice(countDiscountValue(order.coupon, order.totalPrice))}</strong></p>
                        )}
                    </div>
                    <DoneAllIcon className="text-green-500" sx={{ fontSize: '1.2rem' }} />
                </div>
            ) : (
                <div className="flex items-center justify-between px-3.5 py-1.5 border border-orange-500 rounded-md">
                    <div>
                        {remainingTime && remainingTime > 0 ? (
                            <p>Đơn hàng sẽ hết hạn sau: <strong>{formatToMMSS(remainingTime)}</strong></p>
                        ) : (
                            <p>Đơn</p>
                        )}

                        {order.coupon && (
                            <p className="flex items-center gap-x-1.5 mt-1"><SellOutlinedIcon className="text-orange-400" sx={{ fontSize: '1rem' }} /> Đã áp dụng mã {order.coupon.couponCode}, giảm <strong>₫{formatCouponSalePrice(countDiscountValue(order.coupon, order.totalPrice))}</strong></p>
                        )}
                    </div>

                    <p onClick={handleContinuePurchase} className="text-purple-300 cursor-pointer hover:text-purple-400 transition-all duration-200">Tiếp tục thanh toán</p>
                </div>
            )}

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Alert
                    severity="error"
                    onClose={() => setOpen(false)}
                    sx={{ width: '100%', color: 'white' }}
                    variant="filled"
                >
                    Hóa đơn đã hết hạn thanh toán, vui lòng tải lại trang!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default OrderStatusBox