import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { formatCouponSalePrice } from "@/utils/format";

export const countDiscountValue = (coupon: CouponResponse, totalPrice: number): number => {
    if (coupon.discountType === 'FIXED') return parseFloat(coupon.discountAmount.toFixed(3));

    const discountAmount = (coupon.discountPercent * totalPrice) / 100;
    const finalDiscount = coupon.maxDiscountAmount ? Math.min(coupon.maxDiscountAmount, discountAmount) : discountAmount;

    return parseFloat(finalDiscount.toFixed(3));
};

export const optimizeDisplayCoupons = (coupons: CouponResponse[], totalPrice: number): { coupons: CouponResponse[], totalAvailable: number } => {
    const availableCoupons: CouponResponse[] = [];
    const notAvailableCoupons: CouponResponse[] = [];

    coupons.forEach(coupon => {
        if ((!coupon.minOrderValue || coupon.minOrderValue <= totalPrice) && !dayjs(coupon.startTime).isAfter(dayjs())) {
            availableCoupons.push(coupon);
        } else {
            notAvailableCoupons.push(coupon);
        }
    });

    availableCoupons.sort((c1, c2) => countDiscountValue(c2, totalPrice) - countDiscountValue(c1, totalPrice));
    notAvailableCoupons.sort((c1, c2) => countDiscountValue(c2, totalPrice) - countDiscountValue(c1, totalPrice));

    return {
        coupons: [...availableCoupons, ...notAvailableCoupons],
        totalAvailable: availableCoupons.length
    };
};

export const getCouponStatus = (coupon: CouponResponse, totalPrice: number): "ok" | "not start" | "order price not enough" => {
    if (dayjs(coupon.startTime).isAfter(dayjs())) {
        return "not start";
    } else if (coupon.minOrderValue !== null && coupon.minOrderValue > totalPrice) {
        return "order price not enough";
    } else {
        return "ok";
    }
}

export const displayCouponNotOKStatus = (coupon: CouponResponse, totalPrice: number, status: "ok" | "not start" | "order price not enough") => {
    if (status === 'ok') {
        return null;
    } else if (status === 'not start') {
        return (
            <div className="flex items-center gap-x-1 mt-1.5 ml-2">
                <ErrorOutlineIcon sx={{ fontSize: '1rem' }} />
                <p className="text-gray-300 text-sm">Mã giảm giá này sẽ có hiệu lực sau <span className="font-semibold">{dayjs(coupon.startTime).fromNow()}</span></p>
            </div>
        )
    } else {
        return (
            <div className="flex items-center gap-x-1 mt-1.5 ml-2">
                <ErrorOutlineIcon sx={{ fontSize: '1rem' }} />
                <p className="text-gray-300 text-sm">Bạn hãy mua thêm ít nhất <span className="font-semibold">₫{formatCouponSalePrice(coupon.minOrderValue - totalPrice)}</span> để có thể sử dụng hóa đơn này nhé!</p>
            </div>
        )
    }
}