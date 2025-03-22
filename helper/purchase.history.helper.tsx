import { Alert, Button, Snackbar } from "@mui/material";
import { formatDateTime } from "./blog.helper";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { formatSalePrice } from "./course.list.helper";
import { countDiscountValue } from "./coupon.helper";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { useUserOrder } from "@/wrapper/user-order/user.order.wrapper";
import dayjs from "dayjs";
import { useState } from "react";

export const displayOrderStatusEnum = (order: OrderResponse) => {
    return (
        <li className="flex flex-col gap-y-1.5 items-end w-[168px]">
            <p className="text-gray-400 font-semibold">Trạng thái</p>
            {order.paidAt !== null ? (
                <p className="text-green-500">Đã thanh toán</p>
            ) : (
                <p className="text-orange-500">Chưa thanh toán</p>
            )}
        </li>
    )
}

export const displayOrderStatusBox = (order: OrderResponse) => {
    const { data: session, status } = useSession();
    const { setOrderList } = useUserOrder();
    const [open, setOpen] = useState(false);

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

    return (
        <div className="px-10 pt-5">
            {order.paidAt !== null ? (
                <div className="flex items-center justify-between px-3.5 py-1.5 border border-green-500 rounded-md">
                    <div>
                        <p>Bạn đã thanh toán đơn hàng này lúc: <strong>{formatDateTime(order.paidAt)}</strong></p>
                        {order.coupon && (
                            <p className="flex items-center gap-x-1.5 mt-1"><SellOutlinedIcon className="text-orange-400" sx={{ fontSize: '1rem' }} /> Đã áp dụng mã {order.coupon.couponCode}, giảm <strong>₫{formatSalePrice(countDiscountValue(order.coupon, order.totalPrice))}</strong></p>
                        )}
                    </div>
                    <DoneAllIcon className="text-green-500" sx={{ fontSize: '1.2rem' }} />
                </div>
            ) : (
                <div className="flex items-center justify-between px-3.5 py-1.5 border border-orange-500 rounded-md">
                    <div>
                        <p>Đơn hàng sẽ hết hạn lúc: <strong>{formatDateTime(order.expiredAt)}</strong></p>
                        {order.coupon && (
                            <p className="flex items-center gap-x-1.5 mt-1"><SellOutlinedIcon className="text-orange-400" sx={{ fontSize: '1rem' }} /> Đã áp dụng mã {order.coupon.couponCode}, giảm <strong>₫{formatSalePrice(countDiscountValue(order.coupon, order.totalPrice))}</strong></p>
                        )}
                    </div>

                    <div className="flex items-center gap-x-3 font-semibold">
                        <p onClick={handleContinuePurchase} className="text-purple-300 cursor-pointer hover:text-purple-400 transition-all duration-200">Tiếp tục thanh toán</p>
                        <span>|</span>
                        <p onClick={handleCancelOrder} className="text-gray-300 hover:text-gray-400 transition-all duration-200 cursor-pointer">Hủy</p>
                    </div>
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